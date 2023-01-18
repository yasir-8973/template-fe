import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.scss';
import App from './common/Routes'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
