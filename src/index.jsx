import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Make sure the path to your App component is correct
import './index.css'; // If you have a global CSS file
import Analytics from './components/Analytics.jsx';
import Docs from './components/Docs.jsx';
import SignIn from './components/SignIn.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} /> {/* Define the root path to render App */}
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
