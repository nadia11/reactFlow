import { cn } from '@/lib/utils';
import { useNodeStore } from '@/store/node-data';

import { Icons } from '../ui/Icons';
import { Input } from '../ui/input';
import { sidebarNavigation } from '@/configs';
import { DragEvent } from 'react';
import { BaseNodeData } from '@/types';
import { camelCase } from 'lodash';

export const Canvasidebar = () => {
  const { state, dispatch } = useNodeStore();

  const handleToggleDrawer = () => {
    dispatch({ type: 'SET_SIDEBAR_OPEN', payload: !state.sidebarOpen });
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>, data: BaseNodeData) => {
    e.dataTransfer.setData(`application/reactflow/label`, data.label);
    e.dataTransfer.setData(`application/reactflow/type`, camelCase(data.label));
    e.dataTransfer.setData(`application/reactflow/icon`, camelCase(data.icon));
    e.dataTransfer.setData(
      `application/reactflow/description`,
      camelCase(data.description)
    );
  };

  return (
    <div
      className={cn(
        "bg-[#eef0f7] border rounded-md transition-['width'] duration-300 h-screen flex flex-col pb-6  z-30",
        state.sidebarOpen ? 'w-[500px] opacity-100' : 'w-0 hidden'
      )}
    >
      <div className='flex justify-between items-center px-4 py-4 border-b-2 w-full'>
        <div className='flex items-center gap-3'></div>
        <button onClick={handleToggleDrawer}>
          <Icons.close className='start-7' />
        </button>
      </div>

      <div className='flex flex-col gap-2 px-4 mt-10'>
        <h2 className='text-xl text-gray-700'>Type to Search</h2>
        <div className='relative'>
          <Input
            className='w-full p-2 placeholder:text-gray-600 focus:outline-none focus:ring-0 focus:border-none ring-0 focus-visible:ring-0'
            placeholder='Type the name of feature'
          />
          <Icons.search className='absolute top-2 right-2 text-gray-600' />
        </div>

        <div className='flex flex-col gap-4 items-start justify-start  mt-3 h-[270px] overflow-y-auto'>
          {sidebarNavigation.map((item, index) => (
            <div key={index} className='w-full'>
              <h3 className='text-lg text-gray-600 font-bold'>{item.label}</h3>
              <div className='grid grid-cols-3 gap-2 w-full'>
                {item.children.map((item, index) => {
                  const Icon = Icons[item.icon ?? 'chevronLeft'];
                  return (
                    <div
                      key={index}
                      className='mt-1 px-2 py-3  flex flex-col items-center justify-between bg-white hover:bg-gray-400 gap-4 w-full hover:shadow-md transition-all duration-300 cursor-grab'
                      draggable
                      onDragStart={event =>
                        onDragStart(event, {
                          label: item.label,
                          icon: item.icon as any,
                          // description:item.
                        })
                      }
                    >
                      <div className=' flex flex-col items-center gap-1 w-full'>
                        <div className={cn('px-1.5 py-1 rounded-md border')}>
                          <Icon className='text-gray-500 size-4' />
                        </div>
                        <h6 className='text-gray-600 text-lg'>{item.label}</h6>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
