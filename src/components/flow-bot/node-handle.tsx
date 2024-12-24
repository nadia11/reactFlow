import { ISelectNode, NodeType } from '@/types';
import { memo, useState } from 'react';
import { Handle, Position, useNodeId } from 'reactflow';
import { HandleClickMenu } from './handle-cllick-menu';
import { Icons } from '../../assets/Icons';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { sidebarNavigation } from '@/configs/sideNavOptions';
import { useFlow } from '@/hooks/useFlow';

type NodeHandleProps = {
  handleId: string;
  handleClassName?: string;
  nodeSelectorClassName?: string;
} & Pick<ISelectNode, 'id' | 'data'>;

export const NodeSourceHandle = memo(
  ({ handleId, handleClassName }: NodeHandleProps) => {
    const [open, setOpen] = useState(false);
    const nodeId = useNodeId();
    const { addNodeClick } = useFlow();
    const handleSidebarClick = (item: any, nodeId: string) => {
      addNodeClick(item, nodeId, handleId);
      setOpen(false); // Close the Popover after clicking an item
    };
    return (
      <>
        <Handle
          id={handleId}
          type='source'
          position={Position.Right}
          className={`
          !w-2 !h-2 mr-3  !bg-transparent hover:scale-125  -right-3 after:hover:shadow-md !rounded-none !outline-none !border-none
          after:absolute after:w-6 after:h-6  after:z-[20] after:hover:scale-125  after:-top-0 after:-right-2 after:bg-purple-500 after:rounded-full
           transition-all
           after:opacity-0
          flex items-center justify-center
          
          ${handleClassName}
        `}
          isConnectable={true}
          onClick={e => {
            e.stopPropagation(); // Prevents triggering other click events
            setOpen(!open);
          }}
         
        >
          <Icons.plus className='size-6 z-50' />
          <div className={cn('flex justify-between items-center gap-2 ml-2')}>
            <Popover
              open={open}
              onOpenChange={setOpen}
            >
              <PopoverTrigger asChild className='!z-10'>
                <button
                  className='bg-green-500 transition flex items-center z-[999] justify-center duration-200 rounded-full text-white w-7 h-7 cursor-pointer '
                  onClick={e => {
                    e.stopPropagation(); // Prevents triggering other click events
                    setOpen(!open);
                  }}
                >
                  <Icons.plus className='size-6' />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className={cn('w-64 ml-10 -mt-12 bg-gray-800 border-none')}
                align='start'
              >
                <div className='flex flex-col gap-2'>
                  <h2 className='text-xl text-white'>Type to Search</h2>
                  <div className='relative'>
                    <Input
                      className='w-full p-2 placeholder:text-gray-600'
                      placeholder='Type the name of feature'
                    />
                    <Icons.search className='absolute top-2 right-2 text-gray-600' />
                  </div>
                  <div className='flex flex-col gap-4 items-start justify-start mt-3 h-[270px] overflow-y-auto'>
                    {sidebarNavigation.map((item, index) => (
                      <div key={index} className='w-full'>
                        <h3 className='text-lg text-gray-600 font-bold'>
                          {item.label}
                        </h3>
                        <div className='flex flex-col gap-2 w-full'>
                          {item.children.map((childItem, childIndex) => {
                            const Icon = Icons[childItem.icon ?? 'chevronLeft'];
                            return (
                              <div
                                key={childIndex}
                                className='mt-1 px-2 py-3 flex items-center justify-between hover:bg-gray-700 gap-4 w-full hover:shadow-md transition-all duration-300 cursor-grab'
                                onClick={() =>
                                  handleSidebarClick(
                                    childItem,
                                    nodeId as string
                                  )
                                }
                              >
                                <div className='flex items-center gap-4 w-full'>
                                  <div
                                    className={cn(
                                      'px-1.5 py-1 rounded-md border'
                                    )}
                                  >
                                    <Icon className='text-gray-500 size-4' />
                                  </div>
                                  <h6 className='text-white text-lg'>
                                    {childItem.label}
                                  </h6>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </Handle>
      </>
    );
  }
);
NodeSourceHandle.displayName = 'NodeSourceHandle';
