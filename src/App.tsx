import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  useEdgesState,
  useNodesState,
    MiniMap
} from 'reactflow';
import { cn } from './lib/utils';
import { useFlow } from './hooks/useFlow';
import 'reactflow/dist/style.css';
import { BubbleChatBox, Canvasidebar } from './components/flow-bot';
import { Icons } from './components/ui/Icons';
import { useNodeStore } from './store/node-data';
import Sidebar from './components/flow-bot/sidebar';
import { FlowBotHeader } from './components/flow-bot/flow-bot-header';
import  CustomConnectionLine from './components/flow-bot/connection-line';
import { useGlobalStore } from './store';
import FlowChat from './components/flow-bot/flow-chat';

const proOptions = { hideAttribution: true };
const defaultEdgeOptions = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.ArrowClosed },
  pathOptions: { offset: 5 },
};
function App() {
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
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  const { state, dispatch } = useNodeStore();

  const handleToggleDrawer = () => {
    dispatch({ type: 'SET_SIDEBAR_OPEN', payload: true });
  };


  const handleDrawerClose = () => {
    dispatch({ type: 'SET_DRAWER_OPEN', payload: false });

  };

   const {state:globalState}=useGlobalStore()
  return (
    <div className='h-screen overflow-hidden relative'>
    {globalState.bubble_open && (
      <BubbleChatBox>
        <FlowChat/>
      </BubbleChatBox>
    )}
    
    <div className='w-full bg-white  '>
       
      <FlowBotHeader/>
      <div className='relative flex h-[calc(100vh-64px)] '>
        <button
          className='bg-sky-500 h-14 w-14 rounded-full absolute top-5 left-5 flex justify-center items-center text-white z-20'
          onClick={handleToggleDrawer}
        >
          <Icons.plus className='size-8' />
        </button>
        <Canvasidebar />
        <div
          className={cn(
            'h-[calc(100vh-64px)]  duration-300 w-full bg-white flex-1',
            state.sidebarOpen ? 'w-[70%]' : 'w-full'
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
            defaultNodes={initialNodes}
            defaultEdges={initialEdges}
            onInit={setReactFlowInstance}
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
            className='border rounded-md'
            id='canvas'
          >
            <Background
              id='1'
              gap={170}
              color='#c3c2c2'
              className='opacity-40'
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

export default App;
