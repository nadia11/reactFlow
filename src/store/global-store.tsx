import { ISelectNode } from '@/types';
import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import { Node } from 'reactflow';

// Define the shape of the state
interface GlobalStoreState {
  bubble_open: boolean;

}

// Define the actions
type Action =
  | { type: 'SET_BUBBLE_OPEN'; payload: boolean }


// Initialize the default state
const initialState: GlobalStoreState = {
   bubble_open:false
};

// Create the context
const GlobalStoreContext = createContext<{
  state: GlobalStoreState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

// Define the reducer function
const GlobalStoreReducer = (state: GlobalStoreState, action: Action): GlobalStoreState => {
  switch (action.type) {
    case 'SET_BUBBLE_OPEN':
      return { ...state, bubble_open: action.payload };
    
    default:
      // No change needed here
      throw new Error(`Unhandled action type: ${(action as Action).type}`);
  }
};

// Create the provider component
export const GlobalStoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(GlobalStoreReducer, initialState);
  return (
    <GlobalStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

// Custom hook to use the GlobalStore context
export const useGlobalStore = () => {
  const context = useContext(GlobalStoreContext);
  if (context === undefined) {
    throw new Error('useGlobalStore must be used within a GlobalStoreProvider');
  }
  return context;
};