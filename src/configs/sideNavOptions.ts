import { ISidebarNavigation } from '@/types';
import { camelCase, flatMap, pick } from 'lodash';
import { NodeTypes } from 'reactflow';
import { messageCardColor, questionCardColor, conditionCardColor } from '@/constants/colors';
export const sidebarNavigation: ISidebarNavigation[] = [
  {
    label: '',
    type: 'action',
    className: "grid-rows-3 gap-2",
    children: [
      {
        label:"card",
        title: 'Send a message',
        icon: 'message',
        description: 'With no response required from visitor',
        bgColor: messageCardColor,
        logoColor: "text-green-500",
        textColor: "white",
        type: "card"
        
      },

      {
        label:"buttons",
        title: 'Ask a question',
        icon: 'button',
        description: 'Ask question and store user input in variable',
        bgColor: questionCardColor,
        logoColor: "white",
        textColor: "white",
        type: "card"
      },
      {
        label:'message',
        title: 'Set a condition',
        icon: 'card',
        description: 'Send message(s) based on logical condition(s)',
        bgColor: conditionCardColor,
        logoColor: "white",
        textColor: "white",
        type: "card"
      },
    ],
  },
  {
    label: 'Operations',
    type: 'action',
    className: "grid-cols-2 gap-2",
    children: [
      {
        title: 'Subscribe',
        type: 'icon',
        label: 'Subscribe',
        icon: 'message',
        bgColor: "bg-red-300",
      },
      {
        title: 'Unsubscribe',
        type: 'icon',
        label: 'Unsubscribe',
        icon: 'button',
      },
      {
        title: 'Update Attribute',
        type: 'icon',
        label: 'Update Attribute',
        icon: 'card',
      },
      {
        title: 'Set tags',
        type: 'icon',
        label: 'Set tags',
        icon: 'card',
      },
      {
        title: 'Assign Team',
        type: 'icon',
        label: 'Assign Team',
        icon: 'card',
      },
      {
        title: 'Assign User',
        type: 'icon',
        label: 'Assign User',
        icon: 'card',
      },
      {
        title: 'Trigger Chatbot',
        type: 'icon',
        label: 'Trigger Chatbot',
        icon: 'card',
      },
      {
        title: 'Update Chat Status',
        type: 'icon',
        label: 'Update Chat Status',
        icon: 'card',
      },
      {
        title: 'Template',
        type: 'icon',
        label: 'Template',
        icon: 'card',
      },
      {
        title: 'Time Delay',
        type: 'icon',
        label: 'Time Delay',
        icon: 'card',
      },
    ]  
  },
  {
    label: 'Integrations',
    type: 'action',
    className: "grid-cols-2 gap-2",
    children: [
      {
        title:"Webhook",
        type: 'icon',
        label: 'Webhook',
        icon: 'message',
        
      },

      {
        title:"Google Spreadsheet",
        type: 'icon',
        label: 'Google Spreadsheet',
        icon: 'button',
      },
    ],
  },
];

export const sidebarNavigationAlternatives: ISidebarNavigation[] = [
  {
    label: '',
    type: 'action',
    className: "grid-rows-3 gap-2",
    children: [
      {
        title:"Questions",
        label: '',
        icon: 'message',
        description: 'Ask anything to the user',
        bgColor: messageCardColor,
        logoColor: "text-green-500",
        textColor: "white",
        type: "card"
        
      },

      {
        title: 'Buttons',
        label:"",
        icon: 'button',
        description: 'Choices based on buttons (Maximum of 3 choices)',
        bgColor: questionCardColor,
        logoColor: "white",
        textColor: "white",
        type: "card"
      },
      {
        title: 'Lists',
        label:"",
        icon: 'card',
        description: 'Choices based on buttons (Maximum of 10 choices)',
        bgColor: conditionCardColor,
        logoColor: "white",
        textColor: "white",
        type: "card"
      },
    ],
  },
];


export const generatedNodeTypes: NodeTypes = Object.assign(
  {},
  ...flatMap(sidebarNavigation, item =>
    flatMap(item.children, child => {
      return pick(child, ['label', 'icon', 'id', 'component']);
    })
  ).map(node => ({
    [camelCase(node.label)!]: node.component,
  }))
);
