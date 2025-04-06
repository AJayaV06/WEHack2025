import React, { useState } from 'react';
import './Chatbot.css';

function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const newUserMessage = { text: inputValue, sender: 'user' };
            setMessages(prevMessages => [...prevMessages, newUserMessage]);

            // Simulate bot typing
            setMessages(prevMessages => [...prevMessages, { text: '...', sender: 'bot', isTyping: true }]);

            // Replace this with your actual chatbot logic (e.g., API call to Gemini)
            setTimeout(() => {
                // Remove typing indicator
                setMessages(prevMessages => prevMessages.filter(msg => !msg.isTyping));

                let botResponseText = '';
                const userMessageLower = inputValue.toLowerCase();

                // Simple example of more conversational responses
                if (userMessageLower.includes('hello') || userMessageLower.includes('hi')) {
                    botResponseText = Math.random() < 0.5 ? 'Hello there!' : 'Hi! How can I help you today?';
                } else if (userMessageLower.includes('financial advice')) {
                    botResponseText = "Okay, I understand you're asking for financial advice. While I can provide general information, I'm not a certified financial advisor. What specific area are you interested in today?";
                } else if (userMessageLower.includes('data') && userMessageLower.includes('suggest')) {
                    botResponseText = "Thanks for providing the data. To give you the best suggestions, could you tell me a bit more about what the data represents and what your goals are?";
                } else {
                    botResponseText = `That's an interesting question. Let me think... (Real answer based on your logic will go here for: "${inputValue}")`;
                }

                const botResponse = { text: botResponseText, sender: 'bot' };
                setMessages(prevMessages => [...prevMessages, botResponse]);
            }, 1000); // Simulate processing time
            setInputValue('');
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender} ${msg.isTyping ? 'typing' : ''}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chatbot-input">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Ask a question or enter data..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chatbot;
