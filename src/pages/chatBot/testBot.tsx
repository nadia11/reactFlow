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
            "id": "5",
            "data": {
                "label": "message",
                "icon": "card",
                "message_data": {
                    "messages": [
                        {
                            "type": MessageType.TEXT,
                            "message": "Hello there!"
                        },
                        {
                            "type": MessageType.IMAGE,
                            "message": {
                                "name": "Nadia1.jpg",
                                "url": "data:image/jpeg;base64,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"}
                        },
                        {
                            "type": MessageType.VIDEO,
                            "message": {
                                "name": "SAT_TEST.mp4",
                                "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                                }
                        },
                        {
                            "type": MessageType.AUDIO,
                            "message": {
                                "name": "sample-3s (1).mp3",
                                "url": "https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"}
                                
                        },
                        {
                            "type": MessageType.DOCUMENT,
                            "message": {
                                "name": "sample.pdf",
                                "url": "https://pdfobject.com/pdf/sample.pdf"}
                                
                        }
                    ]
                }
            },
            "position": {
                "x": 750,
                "y": 200
            },
            "type": "message",
            "positionAbsolute": {
                "x": 750,
                "y": 200
            },
            "width": 258,
            "height": 576,
            "selected": false,
            "dragging": false
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
        icon: 'search',
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
    { id: 'e4-5', source: '4', target: '5' },
  ];

  return (
    <div className="h-screen w-full">
      {/* Pass nodesData and edgesData as props */}
      <ChatFlow initialNodesProp={nodesData} initialEdgesProp={edgesData} />
    </div>
  );
};

export default TestBot;
