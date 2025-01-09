import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  useEdgesState,
  useNodesState,
  MiniMap,
} from "reactflow";
import { cn } from "../../lib/utils";
import { useFlow } from "../../hooks/useFlow";
import "reactflow/dist/style.css";
import { BubbleChatBox, Canvasidebar } from "../../components/flow-bot";
import { Icons } from "../../assets/Icons";
import { useNodeStore } from "../../store/node-data";
import Sidebar from "../../components/flow-bot/sidebar";
import { FlowBotHeader } from "../../components/flow-bot/flow-bot-header";
import CustomConnectionLine from "../../components/flow-bot/connection-line";
import { ReactFlowInstance } from "reactflow";
import { useGlobalStore } from "../../store";
import FlowChat from "../../components/flow-bot/flow-chat";
const proOptions = { hideAttribution: true };
import { useEffect, useState } from "react";
const defaultEdgeOptions = {
  type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed },
  pathOptions: { offset: 5 },
};
export function ChatFlow({
  initialNodesProp = [],
  initialEdgesProp = [],
  onNodesChange: parentOnNodesChange,
  onEdgesChange: parentOnEdgesChange,
}: {
  initialNodesProp?: any[];
  initialEdgesProp?: any[];
  onNodesChange?: (nodes: any[]) => void;
  onEdgesChange?: (edges: any[]) => void;
}) {
  const {
    nodeTypes,
    reactFlowWrapper,
    addNodeClick,
    onDrop,
    onDragOver,
    onConnect,
    setReactFlowInstance,
    initialEdges,
    initialNodes,
  } = useFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodesProp.length ? initialNodesProp : initialNodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdgesProp.length ? initialEdgesProp : initialEdges
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { state, dispatch } = useNodeStore();

  const handleToggleDrawer = () => {
    dispatch({ type: "SET_SIDEBAR_OPEN", payload: true });
  };
  const handleNodesChange = (changes: any[]) => {
    const updatedNodes = onNodesChange(changes); // Update nodes state
    if (!isInitialLoad && parentOnNodesChange)
      parentOnNodesChange(updatedNodes); // Send changes to the parent
  };

  const handleEdgesChange = (changes: any[]) => {
    const updatedEdges = onEdgesChange(changes); // Update edges state
    if (!isInitialLoad && parentOnEdgesChange)
      parentOnEdgesChange(updatedEdges); // Send changes to the parent
  };
  useEffect(() => {
    if (isInitialLoad && nodes.length && edges.length) {
      setIsInitialLoad(false);
    }
  }, [isInitialLoad, nodes, edges]);
  const handleDrawerClose = () => {
    dispatch({ type: "SET_DRAWER_OPEN", payload: false });
  };
  const handleInit = (instance: ReactFlowInstance) => {
    // Store the instance in the NodeStore
    dispatch({ type: "SET_REACT_FLOW_INSTANCE", payload: instance });

    // Call the existing setReactFlowInstance logic if required
    setReactFlowInstance(instance); // Ensure this is called if already defined
  };
  const { state: globalState } = useGlobalStore();

  return (
    <div className="h-screen overflow-hidden relative w-full">
      {globalState.bubble_open && (
        <BubbleChatBox>
          <FlowChat />
        </BubbleChatBox>
      )}

      <div className="w-full bg-white">
        <FlowBotHeader />
        <div className="relative flex h-[calc(100vh-64px)] ">
          <button
            className="bg-green-500 h-14 w-14 rounded-full absolute top-5 left-5 flex justify-center items-center text-white z-20"
            onClick={handleToggleDrawer}
          >
            <Icons.plus className="size-8" />
          </button>
          <Canvasidebar />
          <div
            className={cn(
              "h-[calc(100vh-64px)]  duration-300 w-full bg-white flex-1",
              state.sidebarOpen ? "w-[70%]" : "w-full"
            )}
            ref={reactFlowWrapper}
          >
            <ReactFlow
              {...{
                proOptions,
                nodes,
                edges,
                onConnect,
                onDrop,
                onDragOver,
              }}
              nodeTypes={nodeTypes as any}
              nodes={nodes}
              edges={edges}
              onNodesChange={handleNodesChange}
              onEdgesChange={handleEdgesChange}
              onInit={handleInit}
              nodesConnectable={true}
              connectionLineComponent={CustomConnectionLine}
              maxZoom={2}
              minZoom={0.3}
              onPaneClick={handleDrawerClose}
              // deleteKeyCode={`Delete`}
              onNodeClick={() => addNodeClick}
              selectionOnDrag
              nodeOrigin={[0.5, 0.5]}
              defaultEdgeOptions={defaultEdgeOptions}
              fitViewOptions={{ maxZoom: 0.8 }}
              className="border rounded-md"
              id="canvas"
            >
              <Background
                id="1"
                gap={170}
                color="#c3c2c2"
                className="opacity-40"
                variant={BackgroundVariant.Lines}
              />
              <MiniMap />
              <Controls />
            </ReactFlow>
          </div>

          <Sidebar />
        </div>
      </div>
    </div>
  );
}
