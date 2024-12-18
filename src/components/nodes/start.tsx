import { Handle, Position } from 'reactflow';

import { ISelectNode } from 'src/types';
import { BaseLayout } from './base';
import { HandleClickMenu } from '../flow-bot/handle-cllick-menu';
import { NodeSourceHandle } from '../flow-bot/node-handle';

export const StartNode = (node: ISelectNode) => {
  return (
    <div className='relative'>
      <BaseLayout {...{ node }}>
      
      <NodeSourceHandle data={node.data} id={node.id} handleId={`source`} handleClassName='-right-3'/>
      </BaseLayout>
      
    </div>
  );
};
