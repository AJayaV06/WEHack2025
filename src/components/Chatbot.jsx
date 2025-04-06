import React, { useState } from 'react';
import './Docs.css'; // Make sure this CSS file exists

const Docs = () => {
    const [geminiMessages, setGeminiMessages] = useState([]);
    const [geminiInputText, setGeminiInputText] = useState('');
    const [geminiLoading, setGeminiLoading] = useState(false);
    const [contextText, setContextText] = useState('');

    const handleGeminiInputChange = (event) => {
        setGeminiInputText(event.target.value);
    };

    const handleContextChange = (event) => {
        setContextText(event.target.value);
    };

    const handleGeminiSendMessage = async () => {
        if (!geminiInputText.trim()) return;

        const newMessage = { text: geminiInputText, sender: 'user' };
        setGeminiMessages([...geminiMessages, newMessage]);
        setGeminiInputText('');
        setGeminiLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/gemini-finance', { // Adjust URL if needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: geminiInputText, context: contextText }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const botMessage = { text: data.response, sender: 'gemini' };
            setGeminiMessages([...geminiMessages, botMessage]);
        } catch (error) {
            console.error('Error fetching Gemini response:', error);
            setGeminiMessages([...geminiMessages, { text: 'Error getting response from Gemini.', sender: 'gemini', error: true }]);
        } finally {
            setGeminiLoading(false);
        }
    };

    return (
        <div className="docs-container">
            <h2 className="center-title">Finance Question Chatbot</h2>

            <div className="chat-display">
                {geminiMessages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <strong>{msg.sender === 'user' ? 'You:' : 'Gemini:'}</strong> {msg.text}
                        {msg.error && <span className="error">(Error)</span>}
                    </div>
                ))}
                {geminiLoading && <div className="message bot"><strong>Gemini:</strong> Thinking...</div>}
            </div>
            <div className="input-area">
                <textarea
                    placeholder="Enter finance question for Gemini"
                    value={geminiInputText}
                    onChange={handleGeminiInputChange}
                />
                <textarea
                    placeholder="Optional context text for Gemini to use"
                    value={contextText}
                    onChange={handleContextChange}
                    className="context-input"
                />
                <button onClick={handleGeminiSendMessage} disabled={geminiLoading}>Send to Gemini</button>
            </div>
        </div>
    );
};

export default Docs;