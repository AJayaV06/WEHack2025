import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Make sure the path to your App component is correct
import './index.css'; // If you have a global CSS file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);