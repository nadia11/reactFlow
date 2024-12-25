import { Handle, Position } from 'reactflow';

import { ISelectNode } from 'src/types';
import { BaseLayout } from './base';
import { HandleClickMenu } from '../flow-bot/handle-cllick-menu';
import React from 'react';
import { NodeSourceHandle } from '../flow-bot/node-handle';

export const ButtonsNode = (node: ISelectNode) => {
  
  return (
    <div className='relative'>
      <BaseLayout {...{ node }}>
        <div className='flex flex-col items-center justify-center gap-2 bg-gray-200  px-2 py-5 '>
          {node.data?.buttons_data?.messages ? (
            node.data?.buttons_data?.messages?.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === 'text' ? (
                  <div className='bg-white w-full  p-3 rounded-md'>
                    <h3 className='text-wrap w-[90%]'>eee</h3>
                  </div>
                ) : (
                  <div className='bg-white   p-3 rounded-md w-[240px]'>
                    <img
                      src={item.message}
                      alt='message'
                      className='w-full h-[150px]'
                    />
                  </div>
                )}
              </React.Fragment>
            ))
          ) : (
            <div className='bg-white w-full  p-3 rounded-md'>
              <h3>Click to edit</h3>
            </div>
          )}

          {node.data?.buttons_data?.buttons?.map((item, index) => (
            <div
              className='bg-sky-500 pl-3 py-5  w-full  rounded-md text-white relative'
              key={index}
            >
              <h3>{item.button}</h3>
               <NodeSourceHandle data={node.data} id={node.id} handleId={`source_${index}`} handleClassName='-right-1'/>
            </div>
          ))}
        </div>
      </BaseLayout>
      <Handle type='target' position={Position.Left} id='a' isConnectable />
     
    </div>
  );
};
