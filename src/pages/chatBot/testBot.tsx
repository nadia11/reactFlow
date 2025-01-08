// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { ChatFlow } from './chatFlow';
// import { ISelectNode } from '@/types';
// import api from '@/configs/api'; // Your API interceptor
// import toast from 'react-hot-toast';
// import { useNodeStore } from '@/store';


// const TestBot: React.FC = () => {
  
//   const { state } = useNodeStore();
//   const nodes = state?.reactFlowInstance?.getNodes();
//   const edges = state?.reactFlowInstance?.getEdges();
//   const [initialNodesData, setInitialNodesData] = useState<ISelectNode[]>([]);
//   const [initialEdgesData, setInitialEdgesData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchParams] = useSearchParams();
//   const chatId = searchParams.get('chatId'); // Get chatId from query params

//   useEffect(() => {
//     if (!chatId) {
//       setError('No chatId provided');
//       setLoading(false);
//       return;
//     }

//     const fetchChatFlowData = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get(`/nodes/chatbot/${chatId}`); // Fetch nodes and edges data
//         const { nodes, edges } = response.data;

//         // Process nodes
//         const processedNodes: ISelectNode[] = nodes.map((node: any) => ({
//           id: node.nodeId, // Ensure node.nodeId aligns with edges
//           type: node.type || 'default',
//           position: { x: node.positionX, y: node.positionY },
//           data: {
//             ...node.data,
//           },
//         }));

//         // Map edges to use the nodeId property
//         const processedEdges = edges.map((edge: any) => ({
//           id: `e${edge.sourceId}-${edge.targetId}`,
//           source: nodes.find((node: any) => node.id === edge.sourceId)?.nodeId,
//           target: nodes.find((node: any) => node.id === edge.targetId)?.nodeId,
//           animated: edge.animated || false,
//         }));

//         setInitialNodesData(processedNodes);
//         setInitialEdgesData(processedEdges);
//       } catch (err: unknown) {
//         console.error('Error fetching chat flow data:', err);
//         toast.error('Failed to fetch chat flow data');
//         setError('Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatFlowData();
//   }, [chatId]);

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen">{error}</div>;
//   }

//   return (
//     <div className="h-screen w-full">
//       {/* Pass nodesData and edgesData dynamically */}
//       <ChatFlow initialNodesProp={initialNodesData} initialEdgesProp={initialEdgesData} />
//     </div>
//   );
// };

// export default TestBot;
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChatFlow } from './chatFlow';
import { ISelectNode } from '@/types';
import api from '@/configs/api'; // Your API interceptor
import toast from 'react-hot-toast';
import { useNodeStore } from '@/store';
import Modal from '@/components/ui/modal';
import _ from 'lodash'; // Import lodash for deep comparison

const TestBot: React.FC = () => {
  const { state, dispatch } = useNodeStore();
  const navigate = useNavigate();

  const nodes = state?.reactFlowInstance?.getNodes();
  const edges = state?.reactFlowInstance?.getEdges();
  const [initialNodesData, setInitialNodesData] = useState<ISelectNode[]>([]);
  const [initialEdgesData, setInitialEdgesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldNavigateBack, setShouldNavigateBack] = useState(false); // Track if navigation is allowed
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get('chatId'); // Get chatId from query params

  useEffect(() => {
    if (!chatId) {
      setError('No chatId provided');
      setLoading(false);
      return;
    }

    const fetchChatFlowData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/nodes/chatbot/${chatId}`); // Fetch nodes and edges data
        const { nodes, edges } = response.data;

        // Process nodes
        const processedNodes: ISelectNode[] = nodes.map((node: any) => ({
          id: node.nodeId,
          type: node.type || 'default',
          position: { x: node.positionX, y: node.positionY },
          data: {
            ...node.data,
          },
        }));

        // Map edges to use the nodeId property
        const processedEdges = edges.map((edge: any) => ({
          id: `e${edge.sourceId}-${edge.targetId}`,
          source: nodes.find((node: any) => node.id === edge.sourceId)?.nodeId,
          target: nodes.find((node: any) => node.id === edge.targetId)?.nodeId,
          animated: edge.animated || false,
        }));

        setInitialNodesData(processedNodes);
        setInitialEdgesData(processedEdges);
      } catch (err: unknown) {
        console.error('Error fetching chat flow data:', err);
        toast.error('Failed to fetch chat flow data');
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchChatFlowData();
  }, [chatId]);
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (
      !_.isEqual(initialNodesData, nodes) || // Compare nodes deeply
      !_.isEqual(initialEdgesData, edges)   // Compare edges deeply
    ) {
      event.preventDefault();
      event.returnValue = ''; // Necessary for the browser prompt
    }
  };
  const handlePopState = () => {
    if ( !shouldNavigateBack && ((!_.isEqual(initialNodesData, nodes) || !_.isEqual(initialEdgesData, edges)))) {
      setIsModalOpen(true);
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      window.history.pushState(null, '', window.location.href);
    }
  }, [isModalOpen]);
  
  useEffect(() => {
   

  

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleDiscardChanges = () => {
    setIsModalOpen(false);
    dispatch({ type: 'SET_SELECTED_NODE', payload: null }); // Clear nodes and edges
    dispatch({ type: 'SET_REACT_FLOW_INSTANCE', payload: null });
    setShouldNavigateBack(true);
    window.history.back();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  return (
    <div className="h-screen w-full">
      {/* Pass nodesData and edgesData dynamically */}
      <ChatFlow initialNodesProp={initialNodesData} initialEdgesProp={initialEdgesData} />
     {isModalOpen && <Modal open={isModalOpen} onClose={handleCancel}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Confirm</h2>
          <p className="mb-4">
            You will lose unsaved changes. Are you sure you want to continue?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="border px-4 py-2 rounded hover:bg-gray-200"
            >
              Go Back
            </button>
            <button
              onClick={handleDiscardChanges}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Discard Changes
            </button>
          </div>
        </div>
      </Modal>} 
    </div>
  );
};

export default TestBot;