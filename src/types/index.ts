import {type Icons } from "@/components/ui/Icons";
export * from './node'

export interface NavItem {
    title?: string;
    bgColor?:string;
    logoColor?:string;
    textColor?:string;
    type?: "card" | "icon";
    href?: string;
    id?:string
    component?:any,
    targetId?: string;
    description?:string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label: string;
 
  }
  
  export interface TypesIcon {
    value: keyof typeof Icons;
    label: string;
  }
  
 
  
  export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[];
  }
 
  
  export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[];
  }

  export interface ISidebarNavigation {
    label: string;
    type: string;
    children: NavItem[];
    className: string;
  }

  export interface NodeData {
    label: string;
    mode:string;
    disabled?: boolean;
    background: string;
  
 
  }


export enum NodeType {
  START="start",
  EMAIL = "email",
  EMPTY="empty",
  SMS = "sms",
  // PUSH = "push",
  MESSAGE="message",
  BUTTONS = "buttons",
  CARD= "card",
 

}

export enum ENodeType {
  START="start",
  EMAIL = "email",
  EMPTY="empty",
  SMS = "sms",
  // PUSH = "push",
  INSERT_NODE="insertNode",
  WEBHOOK = "webhook",
  UPDATE_PROFILE = "updateProfileProperty",
  NOTIFICATION = "notification",
  CONDITION = "conditionalSplit",
  TIME_DELAY = "timeDelay",
  EXIT = "EXIT",

}
  
export interface BaseNodeData {
  label: string;
  icon: keyof typeof Icons;
  description?: string;
}


export const EdgeTypes = {
  bridge: "bridge", //only icon
  custom: "custom", //with label and icon
  default:"default"
}
  export enum EdgeType {
    DEFAULT = "default",
    CUSTOM = "custom",
    BRIDGE= "bridge", //only icon
 
  }
  