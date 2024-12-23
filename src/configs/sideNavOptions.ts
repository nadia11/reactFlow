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
        logoColor: "text-blue-500",
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
        label: 'Subscribe',
        icon: 'message',
        
      },

      {
        label: 'Unsubscribe',
        icon: 'button',
      },
      {
        label: 'Update Attribute',
        icon: 'card',
      },
      {
        label: 'Set tags',
        icon: 'card',
      },
      {
        label: 'Assign Team',
        icon: 'card',
      },
      {
        label: 'Assign User',
        icon: 'card',
      },
      {
        label: 'Trigger Chatbot',
        icon: 'card',
      },
      {
        label: 'Update Chat Status',
        icon: 'card',
      },
      {
        label: 'Template',
        icon: 'card',
      },
      {
        label: 'Time Delay',
        icon: 'card',
      }
      
    ],
  },
  {
    label: 'Integrations',
    type: 'action',
    className: "grid-cols-2 gap-2",
    children: [
      {
        label: 'Webhook',
        icon: 'message',
        
      },

      {
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
        label: 'Questions',
        icon: 'message',
        description: 'Ask anything to the user',
        bgColor: messageCardColor,
        logoColor: "text-blue-500",
        textColor: "white",
        type: "card"
        
      },

      {
        label: 'Buttons',
        icon: 'button',
        description: 'Choices based on buttons (Maximum of 3 choices)',
        bgColor: questionCardColor,
        logoColor: "white",
        textColor: "white",
        type: "card"
      },
      {
        label: 'Lists',
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
