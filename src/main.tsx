import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';
import { NodeStoreProvider } from './store/node-data.tsx';
import { GlobalStoreProvider } from './store/global-store.tsx';
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Router>
    <ReactFlowProvider>
      <NodeStoreProvider>
        <GlobalStoreProvider>
          <App />
        </GlobalStoreProvider>
      </NodeStoreProvider>
    </ReactFlowProvider>
    </Router>
  </React.StrictMode>
);
