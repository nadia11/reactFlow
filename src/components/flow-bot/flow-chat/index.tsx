import { Icons } from '@/assets/Icons';
import { Input } from '@/components/ui/input';
import Loader from '@/components/ui/loader';
import { cn } from '@/lib/utils';
import { useGlobalStore } from '@/store';
import { ISelectNode } from '@/types';
import { Carousel } from 'flowbite-react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useReactFlow } from 'reactflow';

interface Message {
  nodeId: string; // Add nodeId to each message
  node_type: string;
  type: 'user' | 'bot';
  content: {
    header?: string;
    body?: string;
    footer?:string;
    type?: 'text' | 'image';
    message?: any;
    description?: string;
    image?: string;
  };
  buttons?: { label: string; id: string,idx?:number }[];
  cards?: {
    title: string;
    description: string;
    image?: string;
    buttons: { label: string; id: string; link?: string; type: string }[];
  }[];
  timestamp?: number; // Add timestamp to each message
}

const FlowChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [botLoading, setBotLoading] = useState(false); // Add botLoading state
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null); // Add reference for scrolling
  const { dispatch } = useGlobalStore();
  const { getNodes, getEdges } = useReactFlow();
  const nodes = getNodes() as ISelectNode[];
  const edges = getEdges();
  const withoutStartNode = nodes.filter(node => node.id !== 'start_1');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      if (withoutStartNode.length > 0 && messages.length === 0) {
        displayNodeData(withoutStartNode[0]);
        setCurrentNodeId(withoutStartNode[0].id);
      }
      setIsLoading(false); // Set loading to false after delay
    }, 2000);

    return () => clearTimeout(timer);
  }, [withoutStartNode.length, messages]);

  useEffect(() => {
    // Scroll to the last message when messages change
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleCloseClick = () => {
    dispatch({ type: 'SET_BUBBLE_OPEN', payload: false });
  };

  function isObjectWithUrl(message: string | { name: string; url: string }): message is { name: string; url: string } {
    return typeof message === 'object' && 'url' in message;
  }
  const displayNodeData = async (node: ISelectNode) => {
    const newMessages: Message[] = [];

    if (node.data.message_data) {
      node.data.message_data.messages.forEach((msg) => {
        let content:any;
    
        switch (msg.type) {
          case 'text':
            content = { type: 'text', message: msg.message };
            break;
    
          case 'image':
            if (isObjectWithUrl(msg.message)) {
              content = { type: 'image', message: msg.message.url };
            } else {
              content = { type: 'image', message: msg.message };
            }
            break;
    
          case 'video':
            if (isObjectWithUrl(msg.message)) {
              content = { type: 'video', message: msg.message.url };
            } else {
              content = { type: 'video', message: msg.message };
            }
            break;
    
          case 'audio':
            if (isObjectWithUrl(msg.message)) {
              content = { type: 'audio', message: msg.message.url };
            } else {
              content = { type: 'audio', message: msg.message };
            }
            break;
    
          case 'document':
            if (isObjectWithUrl(msg.message)) {
              content = {
                type: 'document',
                message: {
                  url: msg.message.url,
                  name: msg.message.name || 'Document',
                },
              };
            } else {
              content = {
                type: 'document',
                message: {
                  url: msg.message,
                  name: 'Document',
                },
              };
            }
            break;
    
          default:
            console.warn(`Unsupported message type: ${msg.type}`);
            content = null;
        }
    
        if (content) {
          newMessages.push({
            nodeId: node.id, // Include nodeId
            node_type: node.type as string,
            type: 'bot',
            content,
            timestamp: Date.now(), // Add timestamp
          });
        }
      });
    }
  
    
    if (node.data.card_data?.cards) {
      const cards = node.data.card_data.cards.map(card => ({
        title: card.title,
        description: card.description || '',
        image: card.image,
        buttons: card.buttons.map(button => ({
          label: button.name,
          id: node.id,
          link: button.link,
          type: button.type,
        })),
      }));

      newMessages.push({
        nodeId: node.id, // Include nodeId
        node_type: node.type as string,
        type: 'bot',
        cards,
        content: {
          type: 'text',
          message: '',
          description: undefined,
          image: undefined,
        },
        buttons: cards.flatMap(card => card.buttons),
        timestamp: Date.now(), // Add timestamp
      });
    }

    if (node.data.buttons_data?.buttons) {
      newMessages.push({
        nodeId: node.id, // Include nodeId
        node_type: node.type as string,
        type: 'bot',
        content: {
          header: node.data?.buttons_data?.headerText || "", // Include header text
          body: node.data?.buttons_data?.bodyText || "", // Include body text
          footer: node.data?.buttons_data?.footerText || "", // Include footer text
        },
        buttons: node.data.buttons_data.buttons.map((button, index) => ({
          label: button.button,
          id: node.id,
          idx: index,
        })),
        timestamp: Date.now(), // Add timestamp
      });
    }
    

    // Prepare data to be posted
    const postData = {
      chat_id: "d290f1ee-6c54-4b01-90e6-d701748f0851", // Ensure chat_id is included
      node_id: node.id, // Ensure node_id is included
      data: node.data,
      id: node.id // Ensure id is included
    };

    // Post the node data to your server
    try {
      const response = await fetch('http://localhost:5000/nodes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Node data posted successfully');
    } catch (error) {
      console.error('Error posting node data:', error);
    }

    setMessages(prevMessages => {
      // Check if a message with the same nodeId already exists
      const prevNodeIds = prevMessages.map(msg => msg.nodeId);
      const uniqueNewMessages = newMessages.filter(
          msg => !prevNodeIds.includes(msg.nodeId)
      );
      return [...prevMessages, ...uniqueNewMessages];
    });
  };



  const findNextNode = (currentNodeId: string, index?: number) => {
    const sourceId = index !== undefined ? `source_${index}` : undefined;

    const outgoingEdges = edges.filter(
      edge =>
        edge.source === currentNodeId &&
        (!sourceId || edge.sourceHandle === sourceId)
    );

    if (outgoingEdges.length > 0) {
      const nextNodeId = outgoingEdges[0].target; // Use the first matching edge
      return nodes.find(node => node.id === nextNodeId);
    }
    return null;
  };

  const findCurrentNode = (nodeId: string) => {
    return nodes.find(node => node.id === nodeId);
  };

  const handleButtonClick = (buttonLabel: string, nodeId: string, index?: number) => {
    const nextNode = findNextNode(nodeId, index);
  
    // Add the user message
    setMessages(prevMessages => [
      ...prevMessages,
      {
        nodeId: 'user', // Set nodeId for user messages
        node_type: 'user',
        type: 'user',
        content: { type: 'text', message: buttonLabel },
        timestamp: Date.now(), // Add timestamp
      },
    ]);
  
    setBotLoading(true); // Set botLoading to true
  
    // Simulate delay for bot response
    setTimeout(() => {
      // Display the next node's data
      if (nextNode) {
        displayNodeData(nextNode);
        setCurrentNodeId(nextNode.id);
      }
  
      setBotLoading(false); // Set botLoading to false
    }, 1000); // Adjust delay as needed
  
    // Remove the clicked button from the current bot message
    setMessages(prevMessages =>
      prevMessages.map(msg => {
        return msg.buttons
          ? {
              ...msg,
              buttons: msg.buttons.filter(button => button.label !== buttonLabel),
            }
          : msg;
      })
    );
  };
  

  const renderButtons = (
    buttons: { label: string; id: string; idx?: number }[],
    headerText?: string,
    bodyText?: string,
    footerText?: string
  ) => {
    return (
      <div className="flex flex-col items-center gap-4">
        {/* Header */}
        {headerText && (
          <div className="text-gray-900 text-lg font-semibold bg-white w-full p-3 rounded-md text-center">
            {headerText}
          </div>
        )}
  
        {/* Body */}
        {bodyText && (
          <div className="text-gray-700 bg-white w-full p-3 rounded-md text-center">
            {bodyText}
          </div>
        )}
  
        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() =>
                handleButtonClick(button.label, button.id, button.idx)
              }
              className="bg-slate-300 py-3 px-6 rounded-lg hover:bg-slate-400"
            >
              {button.label}
            </button>
          ))}
        </div>
  
        {/* Footer */}
        {footerText && (
          <div className="text-gray-500 text-sm bg-white w-full p-3 rounded-md text-center">
            {footerText}
          </div>
        )}
      </div>
    );
  };
  

  const renderMessageContent = (message: Message) => {
    if (message.node_type === 'card') {
      if (message.cards && message.cards.length > 1) {
        return (
          <div className="w-[200px] h-[300px]">
            <Carousel
              leftControl={
                <ChevronLeft className="size-7 -mt-14 text-gray-300 hover:p-2 hover:bg-sky-500 rounded-full transition duration-150" />
              }
              rightControl={
                <ChevronRight className="size-7 -mt-14 text-gray-300 hover:p-2 hover:bg-sky-500 rounded-full transition duration-150" />
              }
            >
              {message.cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md w-[200px]"
                >
                  <div className="flex flex-col w-full">
                    {card.image && (
                      <img
                        src={card.image}
                        alt="card image"
                        className="object-cover w-full h-[100px]"
                      />
                    )}
                    <div className="flex flex-col px-3 pt-3 pb-0 w-full">
                      <h1 className="text-gray-900">{card.title}</h1>
                      {card.description && (
                        <p className="text-gray-600">{card.description}</p>
                      )}
                      <div className="flex flex-col mt-4">
                        {card.buttons.map((button, btnIndex) => (
                          <React.Fragment key={btnIndex}>
                            {button.type === 'action' ? (
                              <button
                                onClick={() =>
                                  handleButtonClick(
                                    button.label,
                                    button.id,
                                    btnIndex
                                  )
                                }
                                className="bg-sky-500 text-white py-3 px-5 rounded-lg w-full mb-2"
                              >
                                {button.label}
                              </button>
                            ) : (
                              <a
                                href={button.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-sky-500 text-white py-3 px-5 rounded-lg w-full mb-2"
                              >
                                {button.label}
                              </a>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        );
      } else if (message.cards && message.cards.length === 1) {
        const card = message.cards[0];
        return (
          <div key={0} className="bg-white rounded-lg shadow-md w-[200px]">
            <div className="flex flex-col w-full">
              {card.image && (
                <img
                  src={card.image}
                  alt="card image"
                  className="w-full object-cover h-[100px]"
                />
              )}
              <div className="flex flex-col px-3 pt-3 pb-0 w-full">
                <h1 className="text-gray-900">{card.title}</h1>
                {card.description && (
                  <p className="text-gray-600">{card.description}</p>
                )}
                <div className="flex flex-col mt-4">
                  {card.buttons.map((button, btnIndex) => (
                    <React.Fragment key={btnIndex}>
                      {button.type === 'action' ? (
                        <button
                          onClick={() =>
                            handleButtonClick(button.label, button.id, btnIndex)
                          }
                          className="bg-sky-500 text-white py-3 px-5 rounded-lg w-full mb-2"
                        >
                          {button.label}
                        </button>
                      ) : (
                        <a
                          href={button.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-sky-500 text-white py-3 px-5 rounded-lg w-full mb-2"
                        >
                          {button.label}
                        </a>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return null;
      }
    } else if (message.node_type === 'buttons') {
      return (
        <div className={cn('max-w-xs py-3 px-5 rounded-lg flex gap-2')}>
          <div
            className={cn(
              'py-3 px-4 rounded-lg',
              message.type === 'user'
                ? 'self-end bg-green-500 text-white'
                : 'self-start bg-white text-gray-900'
            )}
          >
            {message.content.type === 'text' && message.content.message}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-1">
          {message.content.type === 'text' ? (
            <div className="flex gap-0.5">
              <div
                className={cn(
                  'max-w-xs py-2 px-5 rounded-lg mb-2',
                  message.type === 'user'
                    ? 'self-end bg-green-500 text-white'
                    : 'self-start bg-white rounded-lg text-gray-900'
                )}
              >
                {message.content.message}
              </div>
            </div>
          ) : message.content.type === 'image' ? (
            <div className="flex pb-5">
              <img
                src={message.content.message}
                alt="image"
                className="rounded-lg object-cover w-[200px] h-[100px]"
              />
            </div>
          ) : message.content.type === 'video' ? (
            <div className="flex pb-5">
              <video controls className="rounded-lg object-cover w-[200px] h-[100px]">
                <source src={message.content.message} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : message.content.type === 'audio' ? (
            <div className="flex pb-5">
              <audio controls className="w-full">
                <source src={message.content.message} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            </div>
          ) : message.content.type === 'document' ? (
            <div className="flex pb-5">
              <a
                href={message.content.message.url}
                download={message.content.message.name}
                className="text-blue-500 underline"
              >
                Download {message.content.message.name}
              </a>
            </div>
          ) : null}
        </div>
      );
    }
  };
  
  return (
    <div className='relative'>
      {isLoading ? ( // Show spinner while loading
        <div className='flex justify-center items-center h-[400px]'>
          <Icons.spinner
            className='mr-2 size-8 animate-spin'
            aria-hidden='true'
          />
        </div>
      ) : (
        <>
          <div className='flex justify-end items-center rounded-t-xl px-4 py-4 bg-gray-200 border-gray-300'>
            <button onClick={handleCloseClick}>
              <Icons.close className='size-5' />
            </button>
          </div>

          <div
            className='flex flex-col h-[500px] overflow-y-auto  pb-8 relative'
            ref={chatBoxRef}
          >
            <div className='bg-white text-gray-900 py-3  px-12 w-full flex flex-col sticky top-0 left-0'>
              <h4 className='font-bold text-xl text-gray-900'>Flow Chat</h4>
              <p className='text-lg text-gray-500 '>Start the conversation</p>
            </div>

            <div className='px-10 flex flex-col mt-5'>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={` ${
                    message.type === 'user' ? 'self-end' : 'self-start'
                  }`}
                >
                  {renderMessageContent(message)}
                  <div className="flex flex-col items-center gap-4">
  {/* Header */}
  {message.content?.header && (
    <div className="text-lg font-semibold w-full py-1 rounded-md">
      {message.content.header}
    </div>
  )}

  {/* Body */}
  {message.content?.body && (
    <div className="w-full rounded-md">
      {message.content.body}
    </div>
  )}

  {/* Buttons */}
  {message.node_type !== "message" && message.buttons && (
    <div className="flex flex-wrap justify-center gap-3">
      {renderButtons(message.buttons)}
    </div>
  )}

  {/* Footer */}
  {message.content?.footer && (
    <div className="text-md  w-full pb-1 rounded-md">
      {message.content.footer}
    </div>
  )}
</div>

                </div>
              ))}
              {botLoading && ( // Show loading indicator if bot is loading
                <div className='self-start flex items-center gap-2 text-gray-500'>
                  <Loader />
                </div>
              )}
              <div ref={messageEndRef} /> {/* Reference for scrolling */}
            </div>

            <div className='px-10 '>
              {currentNodeId &&
                !botLoading &&
                findNextNode(currentNodeId) &&
                findCurrentNode(currentNodeId)?.type === 'message' && (
                  <button
                    onClick={() => handleButtonClick('Next', currentNodeId)}
                    className='bg-sky-500 text-white py-3 px-5 rounded-lg w-[120px] mb-2'
                  >
                    Next
                  </button>
                )}
            </div>
          </div>
        </>
      )}

      <div className='sticky bottom-0 left-0 px-3 py-2 '>
        <div className='relative'>
          <Input className='w-full ' placeholder='Type a message...' />
          <Send className='size-5 absolute right-3 top-3 text-gray-300' />
        </div>
      </div>
    </div>
  );
};

export default FlowChat;
