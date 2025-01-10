import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useGlobalStore } from '@/store';
import { useNodeStore } from '@/store';
import { Icons } from '@/assets/Icons';
import Modal from '../ui/modal';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import api from '@/configs/api';
import { convertBase64ToFile } from '@/helpers';
export const FlowBotHeader = () => {
  const { state } = useNodeStore();
  const { dispatch } = useGlobalStore();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const chatId = searchParams.get('chatId'); // Extract chatId from the route
  const botName = searchParams.get('botName') || ""; 
  
  const [chatBotName, setChatBotName] = useState(botName);

  const onTestBotClick = () => {
    dispatch({ type: 'SET_BUBBLE_OPEN', payload: true });
  };

  const downloadFlow = () => {
    if (!state.reactFlowInstance) {
      toast.error('Flow instance not initialized');
      return;
    }
  
    const nodes = state.reactFlowInstance.getNodes();
    const edges = state.reactFlowInstance.getEdges();
  
    // Format the JSON payload as required
    const data = {
      chatBotName: chatBotName || 'flow', // Use provided name or default
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type || 'default',
        data: node.data,
        position: {
          x: node.position.x,
          y: node.position.y,
        },
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type || 'default',
      })),
    };
  
    const json = JSON.stringify(data, null, 2); // Prettify JSON for download
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chatBotName || 'flow'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  

  const saveFlow = async () => {
    if (!state.reactFlowInstance) {
      console.warn("ReactFlow instance not initialized");
      return;
    }
  
    const nodes = state.reactFlowInstance.getNodes();
    const edges = state.reactFlowInstance.getEdges();
  

    const uploadFile = async (file: { data: string; name: string }) => {
      try {
        const base64Data = file.data.split(",")[1]; // Extract the base64 part after "data:<type>;base64,"
        const mimeType = file.data.match(/data:(.*);base64/)?.[1] || "application/octet-stream"; // Extract MIME type
    
        // Decode base64 to binary using Uint8Array
        const binaryData = atob(base64Data); // Decode base64 to binary string
        const arrayBuffer = new Uint8Array(binaryData.length);
    
        for (let i = 0; i < binaryData.length; i++) {
          arrayBuffer[i] = binaryData.charCodeAt(i);
        }
    
        // Convert Uint8Array to a File
        const fileToUpload = new File([arrayBuffer], file.name, { type: mimeType });
    
        const formData = new FormData();
        formData.append("file", fileToUpload);
    
        const response = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
    
        return response.data.fileUrl; // Return the uploaded file URL
      } catch (error) {
        console.error("File upload failed:", error);
        throw new Error("File upload failed");
      }
    };
    
    const updatedNodes = await Promise.all(
      nodes.map(async (node) => {
        // Check if the node has files in `message_data`
        if (node.data?.message_data?.messages) {
          const updatedMessages = await Promise.all(
            node.data.message_data.messages.map(async (message: any) => {
              if (
                message.type === "image" ||
                message.type === "video" ||
                message.type === "audio" ||
                message.type === "document"
              ) {
                if (typeof message.message === "object" && message.message.url?.startsWith("data:")) {
                  const uploadedUrl = await uploadFile({
                    data: message.message.url,
                    name: message.message.name,
                  });
                  return {
                    ...message,
                    message: {
                      ...message.message,
                      url: uploadedUrl, // Replace base64 with the uploaded file URL
                    },
                  };
                }
              }
              return message;
            })
          );
  
          // Return the updated node
          return {
            ...node,
            data: {
              ...node.data,
              message_data: {
                ...node.data.message_data,
                messages: updatedMessages,
              },
            },
          };
        }
        return node; // If no files, return the original node
      })
    );
  
    const payload: {
      chatBotName: string;
      chatbotId?: string;
      nodes: typeof updatedNodes;
      edges: typeof edges;
    } = {
      chatBotName,
      nodes: updatedNodes,
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle || null,
        type: edge.type || "default",
      })),
    };
  
    // Call the API for save or update
    if (chatId) {
      // Update operation
      try {
        const response = await api.put(`/nodes/chatflow/${chatId}`, payload);
        toast.success("Chatbot updated successfully");
        console.log("Update Response:", response.data);
      } catch (error) {
        console.error("Update Error:", error);
        toast.error("Failed to update chatbot");
      }
    } else {
      // Create operation
      try {
        const response = await api.post("/nodes/chatflow", payload);
        toast.success("Chatbot created successfully");
        console.log("Create Response:", response.data);
        setModalOpen(false);
      } catch (error) {
        console.error("Create Error:", error);
        toast.error("Failed to create chatbot");
      }
    }
  };
  
  return (
    <div className="flex justify-between items-center bg-white px-40 py-3 shadow-md">
      <div className="flex items-center">
        <Icons.arrowLeft onClick={()=>navigate("/myBots")}/>
        <h1 className="ml-2 text-xl font-semibold text-gray-900">{chatBotName}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant={'link'}
          className="text-green-500 hover:bg-sky-200 focus:outline-none"
          onClick={onTestBotClick}
        >
          Test this bot
        </Button>
        <Button
          variant={'outline'}
          className="bg-green-500 text-white hover:bg-sky-200 border focus:outline-none"
          onClick={() => {
            navigate('/');
          }}
        >
          Add new
        </Button>
        <Button
          variant={'outline'}
          className="text-green-500 hover:bg-sky-200 border-green-500 focus:outline-none"
          onClick={() => {
            if (chatId) {
              saveFlow(); // Update directly if chatId exists
            } else {
              setModalOpen(true); // Open modal for create operation
            }
          }}
        >
          Save
        </Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Save Chatbot</h2>
            <input
              type="text"
              placeholder="Enter Chatbot Name"
              value={chatBotName}
              onChange={(e) => setChatBotName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={saveFlow}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </Modal>
        <button onClick={downloadFlow}><Icons.download stroke="#0e9f6e" /></button>
      </div>
    </div>
  );
};
