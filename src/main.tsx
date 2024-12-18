import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ReactFlowProvider } from 'reactflow';
import { NodeStoreProvider } from './store/node-data.tsx';
import { GlobalStoreProvider } from './store/global-store.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <NodeStoreProvider>
        <GlobalStoreProvider>
          <App />
        </GlobalStoreProvider>
      </NodeStoreProvider>
    </ReactFlowProvider>
  </React.StrictMode>
);
