import { Node } from "reactflow";
import { BaseNodeData } from ".";
import { Icons } from "@/assets/Icons";

export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  DOCUMENT = "document",
}
interface MessgeData {
  type:MessageType
  message:string
}


export interface MessageNodeData extends BaseNodeData{
 messages:MessgeData[]
};
export interface ButtonNodeData{
  type:MessageType
  message:string

}

export interface IButtons extends BaseNodeData {
  messages: ButtonNodeData[];
  buttons?:{
    button:string
    type:string
  }[];
  headerText?: string; // Add header text
  footerText?: string; // Add footer text
  bodyText?: string;
  mediaHeader?: string | boolean; // Add media header
}
export interface ICard{
  title: string
  background?: string;
  description?:string;
  // images:string[]
  image:string
  buttons:{
    name:string
    type: "action" | "url"
    link:""
  }[]
}
export type NodeDataType = {
  background?: string;
  type?: string;
  label: string;
  icon: keyof typeof Icons;
  description?: string;
  message_data?: MessageNodeData;
  buttons_data?: IButtons
  card_data?:{
    cards:ICard[]
  }
};
export interface ISelectNode extends Node {
  data: NodeDataType 
}