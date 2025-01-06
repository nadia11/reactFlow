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

export const FlowBotHeader = () => {
  const { state } = useNodeStore();
  const { dispatch } = useGlobalStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [chatBotName, setChatBotName] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const chatId = searchParams.get('chatId'); // Extract chatId from the route

  const generateChatbotId = () => uuidv4();

  const onTestBotClick = () => {
    dispatch({ type: 'SET_BUBBLE_OPEN', payload: true });
  };

  const saveFlow = async () => {
    if (!state.reactFlowInstance) {
      console.warn('ReactFlow instance not initialized');
      return;
    }

    const nodes = state.reactFlowInstance.getNodes();
    const edges = state.reactFlowInstance.getEdges();

    const payload: {
      chatBotName: string;
      chatbotId?: string; // Optional chatbotId
      nodes: {
        id: string;
        type: string | undefined;
        data: any;
        position: { x: number; y: number };
      }[];
      edges: {
        id: string;
        source: string;
        target: string;
        type: string;
      }[];
    }  = {
      chatBotName,
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type,
        data: node.data,
        position: node.position,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type || 'default',
      })),
    };

    if (chatId) {
      // Update operation
      try {
        const response = await api.put(`/nodes/chatflow/${chatId}`, payload);
        toast.success('Chatbot updated successfully');
        console.log('Update Response:', response.data);
      } catch (error) {
        console.error('Update Error:', error);
        toast.error('Failed to update chatbot');
      }
    } else {
      // Create operation
      const chatbotId = generateChatbotId();
      payload.chatBotName = chatBotName;
      payload.chatbotId = chatbotId;

      try {
        const response = await api.post('/nodes/chatflow', payload);
        toast.success('Chatbot created successfully');
        console.log('Create Response:', response.data);
        setModalOpen(false);
      } catch (error) {
        console.error('Create Error:', error);
        toast.error('Failed to create chatbot');
      }
    }
  };

  return (
    <div className="flex justify-between items-center bg-white px-40 py-3 shadow-md">
      <div className="flex items-center">
        <Icons.arrowLeft />
        <h1 className="ml-2 text-xl font-semibold text-gray-900">Demo Bot</h1>
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
        <Icons.download stroke="#0e9f6e" />
      </div>
    </div>
  );
};
