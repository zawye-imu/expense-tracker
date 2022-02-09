import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// For alerts
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate}>
    <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

