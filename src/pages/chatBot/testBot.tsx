import { ChatFlow } from './chatFlow';
import { ISelectNode, MessageType } from '@/types';

const TestBot = () => {
  // Define the nodes and edges data
  const nodesData: ISelectNode[] = [
    {
      id: '1',
      type: 'start', // Custom node type
      position: { x: 250, y: 0 },
      data: {
        label: 'Start Node',
        icon: 'plus',
        description: 'This is the starting point',
        message_data: {
          messages: [
            { type: MessageType.TEXT, message: 'Welcome to the bot!' },
          ],
        },
      },
    },
    {
      id: '2',
      type: 'buttons',
      position: { x: 100, y: 150 },
      data: {
        label: 'Action Node',
        icon: 'message',
        description: 'Perform an action here',
        buttons_data: {
          messages: [
            { type: MessageType.TEXT, message: 'Choose an action:' },
          ],
          buttons: [
            { button: 'Option 1', type: 'action' },
            { button: 'Option 2', type: 'action' },
          ],
        },
      },
    },
    {
      id: '3',
      type: 'text',
      position: { x: 400, y: 150 },
      data: {
        label: 'Decision Node',
        icon: 'decision',
        description: 'Make a decision here',
        card_data: {
          cards: [
            {
              title: 'Card 1',
              description: 'Description for Card 1',
              image: 'https://via.placeholder.com/150',
              buttons: [
                { name: 'Visit', type: 'url', link: 'https://example.com' },
              ],
            },
          ],
        },
      },
    },
    {
      id: '4',
      type: 'message',
      position: { x: 250, y: 300 },
      data: {
        label: 'End Node',
        icon: 'sun',
        description: 'This is the endpoint',
        message_data: {
          messages: [
            { type: MessageType.TEXT, message: 'Goodbye!' },
          ],
        },
      },
    },
  ];

  const edgesData = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e2-4', source: '2', target: '4' },
    { id: 'e3-4', source: '3', target: '4' },
  ];

  return (
    <div className="h-screen w-full">
      {/* Pass nodesData and edgesData as props */}
      <ChatFlow initialNodesProp={nodesData} initialEdgesProp={edgesData} />
    </div>
  );
};

export default TestBot;
