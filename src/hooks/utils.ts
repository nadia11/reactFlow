
import { nanoid } from "nanoid";
import { Position } from "reactflow";
export const addNewNode = (data:any, propsItem:any) => {
  const position = {
    x: propsItem?.xPos,
    y: propsItem?.yPos + 280,
  };
  let newFlowId = nanoid();
  let newNode = {
    id: newFlowId,

    type: data.type,
    position,
    data: {
      type: data.type,
    },
  };
  return newNode;
};

export const generateNewNode = ({ data, position, zIndex, ...rest }:any) => {
  return {
    id: nanoid() || `${Date.now()}`,
    type: "action",
    data,
    position,
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,

    ...rest,
  };
};

