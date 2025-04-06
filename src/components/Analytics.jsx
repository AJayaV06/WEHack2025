import React from 'react';
import Chatbot from './Chatbot';
import Header from './Header.jsx';
import './Analytics.css'; // Import the CSS for this component

function Analytics() {
    return (
        <div className="analytics-container">
            <Header></Header>
            <h1>Analytics</h1>
            <p>This is the analytics page. You can analyze your financial data and get insights here.</p>
            <div className="chatbot-wrapper">
                <h2>Financial Chatbot</h2>
                <Chatbot />
            </div>
            {/* You can add other analytics-related components or content here later */}
        </div>
    );
}

export default Analytics;
