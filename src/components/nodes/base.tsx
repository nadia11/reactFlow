import { PropsWithChildren, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Icons } from '../ui/Icons';
import { ISelectNode } from '@/types';
import { useNodeStore } from '@/store/node-data';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CopyIcon, Ellipsis, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFlow } from '@/hooks/useFlow';

interface BaseLayoutProps extends PropsWithChildren {
  node: ISelectNode;
}

export const BaseLayout = ({ children, node }: BaseLayoutProps) => {
  const { selected } = node;
  const Icon = Icons[node?.data.icon];
  const { dispatch, state } = useNodeStore();

  const [isOpen, setIsOpen] = useState(false);
  console.log({ type: node });
  const handleToggleDrawer = () => {
    if (node.data) {
      dispatch({ type: 'SET_SELECTED_NODE', payload: null });
    }

    if (node.type !== 'start') {
      dispatch({ type: 'SET_DRAWER_OPEN', payload: true });
    }

    dispatch({ type: 'SET_SELECTED_NODE', payload: node });
  };

  const { onNodeDeleteClick, onNodeDuplicate } = useFlow();

  const handleDuplicate = () => {
    if (node) {
      onNodeDuplicate(node.id);
      setIsOpen(false);
    }
  };

  return (
    <Card
      className={`flex flex-col    rounded-md shadow-md bg-white min-w-64 max-w-72  relative hover:ring-4
     hover:ring-sky-500 ${selected && 'ring-4 ring-sky-500'}`}
      onClick={handleToggleDrawer}
    >
      <CardContent className='pb-0 px-0'>
        <div
          className={cn(
            'flex items-center py-3  gap-8 px-3',
            node.type !== 'start' && 'justify-around'
          )}
        >
          {/* icon */}
          <Icon className='size-6' />
          <div className='flex flex-col'>
            <h3 className='text-lg text-gray-900 font-bold'>
              {node?.data?.label}
            </h3>
            {node?.data?.description && (
              <p className='text-gray-600 text-lg w-[120px] text-wrap'>
                {node?.data?.description}
              </p>
            )}
          </div>
          {node.type !== 'start' && (
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild onClick={e => e.stopPropagation()}>
                <button>
                  <Ellipsis className='size-5' />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align='start'
                className='w-56 ml-12 -mt-8 z-40 flex flex-col gap-4 px-3'
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={handleDuplicate}
                  className='flex items-center gap-2'
                >
                  <CopyIcon className='size-5' />
                  <span> Duplicate node</span>
                </button>
                <button onClick={() => onNodeDeleteClick(node.id)}
                  className='flex items-center gap-2 text-red-500'
                  >
                  <Trash2 className='size-5' />
                  <span>Delete node</span>
                </button>
              </PopoverContent>
            </Popover>
          )}
        </div>
        {children && (
          <>
            <div className='w-full'>{children}</div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
