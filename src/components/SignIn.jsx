// src/components/SignIn.jsx
import React, { useState } from 'react';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';
import '../index.css'; // Ensure you have CSS for styling

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your sign-in logic here (e.g., API call)
        console.log('Sign In submitted:', { email, password });
    };

    const handleClick = () => {
        navigate('/'); 
      };

    return (
        <div className="background">
            <Header></Header>
            <div className="align">
                <div className="card" style={{ width: '400px' }}>
                    <h2 className="center-title">Sign In</h2>
                    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="email" className="position-text" style={{ display: 'block', textAlign: 'left' }}>Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="position-text"
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label htmlFor="password" className="position-text" style={{ display: 'block', textAlign: 'left' }}>Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="position-text"
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="button"
                            style={{ width: '100%', padding: '10px' }}
                            onClick={handleClick}
                        >
                        Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
