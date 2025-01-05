import { Handle, Position } from 'reactflow';
import { ISelectNode } from 'src/types';
import { BaseLayout } from './base';
import React from 'react';
import { NodeSourceHandle } from '../flow-bot/node-handle';

export const ButtonsNode = (node: ISelectNode) => {
  const { buttons_data } = node.data || {};
  const { headerText, footerText, bodyText, mediaHeader, messages, buttons } = buttons_data || {};

  return (
    <div className="relative">
      <BaseLayout {...{ node }}>
        <div className="flex flex-col items-center justify-center gap-4 bg-gray-200 px-4 py-5 rounded-lg">
          {/* Header */}
          {headerText && (
            <div className="text-lg font-semibold w-full py-1 rounded-md">
              {headerText}
            </div>
          )}

          {/* Media Header */}
          {mediaHeader && typeof mediaHeader === "string" && (
            <div className="bg-white p-3 rounded-md w-full">
              <img
                src={mediaHeader}
                alt="Media Header"
                className="w-full h-auto rounded-md"
              />
            </div>
          )}

          {/* Body Messages */}
          {messages && messages?.length > 0 &&
            messages.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === "text" ? (
                  <div className="bg-white w-full p-3 rounded-md">
                    <p className="text-gray-900">{item.message}</p>
                  </div>
                ) : item.type === "image" ? (
                  <div className="bg-white p-3 rounded-md w-[240px]">
                    <img
                      src={item.message}
                      alt="Message Media"
                      className="w-full h-[150px] rounded-md"
                    />
                  </div>
                ) : item.type === "video" ? (
                  <div className="bg-white p-3 rounded-md w-full">
                    <video
                      controls
                      className="w-full h-auto rounded-md"
                      src={item.message}
                    />
                  </div>
                ) : item.type === "audio" ? (
                  <div className="bg-white p-3 rounded-md w-full">
                    <audio controls className="w-full">
                      <source src={item.message} type="audio/mpeg" />
                    </audio>
                  </div>
                ) : item.type === "document" ? (
                  <div className="bg-white p-3 rounded-md w-full">
                    <a
                      href={item.message}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Document
                    </a>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
 {bodyText && (
            <div className="text-md font-semibold w-full rounded-md">
              {bodyText}
            </div>
          )}
          {/* Footer */}
          {footerText && (
            <div className="text-md w-full rounded-md">
              {footerText}
            </div>
          )}

          {/* Buttons */}
          {buttons?.map((button, index) => (
            <div  
              className="bg-slate-300 pl-3 py-2 w-full rounded-md text-black relative"
              key={index}
            >
              <h3>{button.button}</h3>
              <NodeSourceHandle
                data={node.data}
                id={node.id}
                handleId={`source_${index}`}
                handleClassName="-right-1"
              />
            </div>
          ))}
        </div>
      </BaseLayout>
      <Handle type="target" position={Position.Left} id="a" isConnectable />
    </div>
  );
};
