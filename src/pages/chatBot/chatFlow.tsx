import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  useEdgesState,
  useNodesState,
  MiniMap,
  applyEdgeChanges,
  applyNodeChanges,
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
import { useNavigate } from "react-router-dom";
import Modal from "@/components/ui/modal";
const defaultEdgeOptions = {
  type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed },
  pathOptions: { offset: 5 },
};
export function ChatFlow({
  initialNodesProp = [],
  initialEdgesProp = [],
}: {
  initialNodesProp?: any[];
  initialEdgesProp?: any[];
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
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodesProp.length ? initialNodesProp : initialNodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialEdgesProp.length ? initialEdgesProp : initialEdges
  );
  const [nodeOrEdgeChanged, setNodeOrEdgeChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { state, dispatch } = useNodeStore();
  const onConnectCustom = (params) => {
    setEdges((prevEdges) => [
      ...prevEdges,
      {
        id: `e${params.source}-${params.target}`,
        source: params.source,
        sourceHandle: params.sourceHandle, // Include sourceHandle for branching
        target: params.target,
        type: "smoothstep",
      },
    ]);
  };
  
  const handleToggleDrawer = () => {
    dispatch({ type: "SET_SIDEBAR_OPEN", payload: true });
  };

  useEffect(() => {
    if (initialEdgesProp || initialNodesProp) {
      setIsInitialLoad(false); // Fresh flow starts here
    }
  }, [initialEdgesProp, initialNodesProp]);
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
  const handleNodesChange = (changes: any[]) => {
    const updatedNodes = applyNodeChanges(changes, nodes);
    setNodes(updatedNodes);

    if (!isInitialLoad) {
      setNodeOrEdgeChanged(true);
    }
  };

  // Handle edge changes
  const handleEdgesChange = (changes: any[]) => {
    const updatedEdges = applyEdgeChanges(changes, edges);
    setEdges(updatedEdges);

    if (!isInitialLoad) {
      setNodeOrEdgeChanged(true);
    }
  };

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (nodeOrEdgeChanged) {
      event.preventDefault();
      event.returnValue = ""; // Necessary for browser confirmation
    }
  };
  const handlePopState = (event: PopStateEvent) => {
    event.preventDefault();
    if (nodeOrEdgeChanged) {
      setIsModalOpen(true);
    } else {
      navigate("/myBots");
    }
  };
  useEffect(() => {
    if (isModalOpen === true) {
      window.history.forward();
    }
  }, [isModalOpen]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [nodeOrEdgeChanged]);

  const handleDiscardChanges = () => {
    setNodes(initialNodesProp);
    setEdges(initialEdgesProp);
    setNodeOrEdgeChanged(false);
    setIsModalOpen(false);
    navigate(-1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
              onConnect={onConnectCustom}
              nodes={nodes}
              edges={edges}
              onNodesChange={handleNodesChange}
              onEdgesChange={handleEdgesChange}
              onInit={handleInit}
              nodesConnectable={true}
              connectionLineComponent={CustomConnectionLine}
              onDrop={onDrop}
              onDragOver={onDragOver}
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
            {isModalOpen && (
              <Modal open={isModalOpen} onClose={handleCancel}>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">Confirm</h2>
                  <p className="mb-4">
                    You will lose unsaved changes. Are you sure you want to
                    continue?
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
              </Modal>
            )}
          </div>

          <Sidebar />
        </div>
      </div>
    </div>
  );
}
