import { Handle, Position } from 'reactflow';

import { ISelectNode } from 'src/types';
import { BaseLayout } from './base';

import { NodeSourceHandle } from '../flow-bot/node-handle';
import React from 'react';

export const CardNode = (node: ISelectNode) => {
  const  cardData = node.data.card_data?.cards[0]
  return (
    <div className='relative'>
      <BaseLayout {...{ node }}>
        <div className='relative w-full'>
          <div className='flex  w-full  '>
            {node.data.card_data?.cards ? (
            
                <div
                 
                  className={`w-full flex-shrink-0  transition-transform  transform `}
                >
                  <div className='w-full rounded  shadow-lg '>
                    {cardData?.image && (
                      <img
                        className='w-full h-[150px] object-cover'
                        src={cardData?.image}
                        alt={cardData?.title || 'Card image'}
                      />
                    )}
                    <div className='px-3 py-4 '>
                      {cardData?.title && (
                        <div className='font-bold w-[90%] text-xl mb-2 text-wrap'>
                          {cardData?.title}
                        </div>
                      )}
                      {cardData?.description && (
                        <p className='text-gray-700 w-[90%] text-base text-wrap'>
                          {cardData?.description}
                        </p>
                      )}
                    </div>
                    <div className='px-1 pt-4 pb-2 flex-col gap-2 justify-center w-full  '>
                      {cardData?.buttons &&
                        cardData.buttons.map((button, idx) => (
                          <React.Fragment key={idx}>
                            <button
                              key={idx}
                              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 w-full relative'
                            >
                              {button.name}
                              <NodeSourceHandle
                                data={node.data}
                                id={node.id}
                                handleId={`source_${idx}`}
                                handleClassName='-right-1'
                              />
                            </button>
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                </div>
              
            ) : (
              <div className='bg-gray-200 py-5 px-2 w-full'>

              
              <div className='bg-white w-full  p-3 rounded-md'>
              <h3>Click to edit</h3>
            </div>
            </div>
            )}
          </div>
        </div>
      </BaseLayout>
      <Handle type='target' position={Position.Left} id='a' isConnectable />
    </div>
  );
};
