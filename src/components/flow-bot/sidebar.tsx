import { cn } from '@/lib/utils';
import { useNodeStore } from '@/store/node-data';
import { Icons } from '../ui/Icons';
import { RenderSwitch } from './renderSwitch';

const Sidebar = () => {
  const { state, dispatch } = useNodeStore();

  const handleToggleDrawer = () => {
    dispatch({ type: 'SET_DRAWER_OPEN', payload: !state.drawerOpen });
    dispatch({ type: 'SET_SELECTED_NODE', payload: null });
  };
  const node = state.selectedNode;
  const Icon = Icons[node?.data.icon as keyof typeof Icons];
  return (
    <div
      className={cn(
        "bg-background border rounded-md transition-['width'] duration-300 h-[calc(100vh-64px)] flex flex-col pb-6 absolute right-0 top-0 ",
        state.drawerOpen ? 'w-[500px] opacity-100' : 'w-0 hidden'
      )}
    >
      <div className='flex justify-between items-center px-4 py-4 border-b-2 w-full'>
        <div className='flex items-center gap-3'>
          {node?.data.icon && <Icon className='size-6' />}
          <h2 className='text-lg text-black font-bold'>{node?.data?.label}</h2>
        </div>
        <button onClick={handleToggleDrawer}>
          <Icons.close className='start-7' />
        </button>
      </div>
      <RenderSwitch />
    </div>
  );
};

export default Sidebar;
