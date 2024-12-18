import { ISidebarNavigation } from '@/types';
import { camelCase, flatMap, pick } from 'lodash';
import { NodeTypes } from 'reactflow';

export const sidebarNavigation: ISidebarNavigation[] = [
  {
    label: 'Most used',
    type: 'action',
    children: [
      {
        label: 'Message',
        icon: 'message',
        
      },

      {
        label: 'Buttons',
        icon: 'button',
      },
      {
        label: 'Card',
        icon: 'card',
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
