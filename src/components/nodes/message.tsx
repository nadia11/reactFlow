import { Handle, Position } from 'reactflow';
import { ISelectNode } from 'src/types';
import { BaseLayout } from './base';
import React from 'react';
import { NodeSourceHandle } from '../flow-bot/node-handle';

export const MessageNode = (node: ISelectNode) => {
  const renderMessageContent = (item: any) => {
    switch (item.type) {
      case 'text':
        return (
          <div className="bg-white w-full p-3 rounded-md">
            <h3 className="text-wrap w-[90%]">{item.message}</h3>
          </div>
        );
      case 'image':
        return (
          <div className="bg-white p-3 rounded-md w-[240px]">
            <img
              src={item.message.url || item.message}
              alt="message"
              className="w-full h-[150px] rounded-md object-cover"
            />
          </div>
        );
      case 'video':
        return (
          <div className="bg-white p-3 rounded-md w-[240px]">
            <video controls className="w-full h-[150px] rounded-md">
              <source src={item.message.url || item.message} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'audio':
        return (
          <div className="bg-white p-3 rounded-md w-[240px]">
            <audio controls className="w-full">
              <source src={item.message.url || item.message} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      case 'document':
        const isPDF = (item.message.name || item.message).endsWith('.pdf');
        return (
          <div className="bg-white p-3 rounded-md w-[240px]">
            {isPDF ? (
              <embed
                src={item.message.url || item.message}
                type="application/pdf"
                className="w-full h-[150px]"
              />
            ) : (
              <a
                href={item.message.url || item.message}
                download={item.message.name || 'document'}
                className="text-blue-500 underline"
              >
                Download {item.message.name || 'document'}
              </a>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <BaseLayout {...{ node }}>
        <div className="flex flex-col items-center justify-center gap-2 bg-gray-200 py-3 px-2">
          {node.data?.message_data?.messages ? (
            node.data?.message_data?.messages.map((item, index) => (
              <React.Fragment key={index}>
                {renderMessageContent(item)}
              </React.Fragment>
            ))
          ) : (
            <div className="bg-white w-full p-3 rounded-md">
              <h3>Click to edit</h3>
            </div>
          )}
        </div>
      </BaseLayout>
      <Handle type="target" position={Position.Left} id="a" isConnectable />
      <NodeSourceHandle
        data={node.data}
        id={node.id}
        handleId={`source`}
        handleClassName="-right-1"
      />
    </div>
  );
};
