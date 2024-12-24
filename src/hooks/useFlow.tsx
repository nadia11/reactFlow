import { nanoid } from 'nanoid';
import { DragEvent, useCallback, useMemo, useRef, useState } from 'react';
import {
  Edge,
  EdgeUpdatable,
  Node,
  ReactFlowInstance,
  addEdge,
  useReactFlow,
} from 'reactflow';

import { EdgeType, ISelectNode, NodeType } from '@/types';
import { CardNode, MessageNode, StartNode } from '@/components/nodes';
import { lowerCase } from 'lodash';
import { ButtonsNode } from '@/components/nodes/button-node';

const initialNodes: Node[] = [
  {
    id: 'start_1',
    type: NodeType.START,
    data: {
      icon: 'flag',
      label: 'Starting Point',
      description: 'where you bot begins',
    },
    position: { x: 350, y: 200 },
  },
];
const initialEdges: Edge<EdgeUpdatable>[] = [];

export const useFlow = () => {
  const { getNodes, getEdges, setEdges, setNodes } = useReactFlow();

  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const [edgeStyleType, setEdgeStyleType] = useState<string>("smoothstep");

  const nodeTypes = useMemo(() => {
    return {
      start: StartNode,
      message: MessageNode,
      buttons: ButtonsNode,
      card: CardNode,
    };
  }, []);

  const nodes = getNodes();
  const edges = getEdges();

  function constructEdge(id: any, source: any, target: any, newColor: any, type: any, sourceHandle: any, targetHandle: any) {
    const edge = {
      id,
      type,
      source,
      target,
      sourceHandle,
      targetHandle,
      style: { stroke: newColor, strokeWidth: '4px' },
      data: { label: '' },
    };
    return edge;
  }
  const onConnect = useCallback(
    (params: any) => {
      const newColor = '#b1b1b7'; // Ensure the color is set here
      const type = 'smoothstep';
      const newEdge: Edge = constructEdge(
        nanoid(),
        params.source,
        params.target,
        newColor,
        type,
        params.sourceHandle,
        null
      );
   
      setEdges((eds: Edge[]) => addEdge(newEdge, eds));
    },
    []
  );
 

  const addNodeClick = (item: any, currentId: string, handleId?: string) => {
    const filteredNode: any = nodes.find(node => node.id === currentId);
    const newNodeId = nanoid();
    let newColor = '#b1b1b7';
    const newNode: any = {
      id: newNodeId,
      data: { label: item.label, icon: item.icon },
      position: {
        x: filteredNode?.position?.x + 400,
        y: filteredNode?.position?.y,
      },
      type: lowerCase(item.label),
    };
    const type = 'smoothstep';
    const newEdge: Edge = constructEdge(
      nanoid(),
      currentId,
      newNodeId,
      newColor,
      type,
      handleId,
      null // target handle can be set here if needed
    );

    setNodes(prev => prev.concat(newNode));
    setEdges(prev => prev.concat(newEdge as Edge));
  };



  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const reactFlowBounds: any =
        reactFlowWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow/type');
      const label = event.dataTransfer.getData('application/reactflow/label');
      const icon = event.dataTransfer.getData('application/reactflow/icon');
      const description = event.dataTransfer.getData('application/reactflow/description');
      if (typeof type === 'undefined' || !type || !reactFlowBounds) return;

      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      if (!position) return;

      const newNode = {
        id: nanoid(),
        type,
        position,
        data: { label, icon, description },
      };

      setNodes((nds: Node[]) => nds.concat(newNode));
    },
    [reactFlowInstance, setEdges, setNodes]
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeDeleteClick = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  const onNodeDuplicate = (nodeId: string) => {
    const nodeToDuplicate = nodes.find((node) => node.id === nodeId);
    if (!nodeToDuplicate) return;

    const newNodeId = nanoid();
    const newNode:ISelectNode = {
      ...nodeToDuplicate,
      id: newNodeId,
      data: { ...nodeToDuplicate.data, }, // Deep copy of data to ensure independence
      position: {
        x: nodeToDuplicate.position.x + 50,
        y: nodeToDuplicate.position.y + 50,
      },
      selected:false
    };

    setNodes((nds) => nds.concat(newNode));

    // const connectedEdges = edges.filter((edge) => edge.source === nodeId || edge.target === nodeId);
    // const newEdges = connectedEdges.map((edge) => ({
    //   ...edge,
    //   id: nanoid(),
    //   source: edge.source === nodeId ? newNodeId : edge.source,
    //   target: edge.target === nodeId ? newNodeId : edge.target,
    // }));

    // setEdges((eds) => eds.concat(newEdges));
  };

  return {
    nodeTypes,
    reactFlowWrapper,
    edgeStyleType,
    setNodes,
    setEdges,
    onConnect,
    initialEdges,
    initialNodes,
    setEdgeStyleType,
    addNodeClick,
    onDrop,
    onDragOver,
    setReactFlowInstance,
    onNodeDeleteClick,
    onNodeDuplicate,
  };
};