import { Handle, Position } from 'reactflow';

import { ISelectNode } from 'src/types';
import { BaseLayout } from './base';
import { HandleClickMenu } from '../flow-bot/handle-cllick-menu';
import React from 'react';
import { NodeSourceHandle } from '../flow-bot/node-handle';

export const MessageNode = (node: ISelectNode) => {
  return (
    <div className='relative'>
      <BaseLayout {...{ node }}>
        <div className='flex flex-col items-center justify-center gap-2 bg-gray-200 py-3 px-2  '>
          {node.data?.message_data?.messages ? node.data?.message_data?.messages?.map((item, index) => (
            <React.Fragment key={index}>
              {item.type === 'text' ? (
                <div className='bg-white w-full  p-3 rounded-md'>
                  <h3 className='text-wrap w-[90%]'>{item.message}</h3>
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
          )) : (
            <div className='bg-white w-full  p-3 rounded-md'>
                  <h3>Click to edit</h3>
                </div>
          )}
        </div>
      </BaseLayout>
      <Handle type='target' position={Position.Left} id='a' isConnectable />
      <NodeSourceHandle data={node.data} id={node.id} handleId={`source`} handleClassName='-right-1'/>
    </div>
  );
};
