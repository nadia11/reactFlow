import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChatFlow } from './chatFlow';
import { ISelectNode } from '@/types';
import api from '@/configs/api'; // Your API interceptor
import toast from 'react-hot-toast';

const TestBot: React.FC = () => {
  const [nodesData, setNodesData] = useState<ISelectNode[]>([]);
  const [edgesData, setEdgesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          id: node.nodeId, // Ensure node.nodeId aligns with edges
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

        setNodesData(processedNodes);
        setEdgesData(processedEdges);
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

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">{error}</div>;
  }

  return (
    <div className="h-screen w-full">
      {/* Pass nodesData and edgesData dynamically */}
      <ChatFlow initialNodesProp={nodesData} initialEdgesProp={edgesData} />
    </div>
  );
};

export default TestBot;
