import { useNodeStore } from '@/store/node-data';
import { NodeType } from '@/types';
import MessageForm from '../form/message-form';
import ButtonsForm from '../form/buttons-form';
import CardForm from '../form/card-form';

export const RenderSwitch = () => {
  const { state, dispatch } = useNodeStore();
  switch (state.selectedNode?.type) {
    case NodeType.MESSAGE:
      return <MessageForm />;
    case NodeType.BUTTONS:
      return <ButtonsForm />;
    case NodeType.CARD:
      return <CardForm />;
  }
};
