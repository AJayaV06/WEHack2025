import React, { useState } from 'react';
import './index.css'; // Import the CSS file

const API_Calls = {
  accounts: 'http://api.nessieisreal.com/enterprise/accounts',
  merchants: 'http://api.nessieisreal.com/merchants',
  atms: 'http://api.nessieisreal.com/atms',
  branches: 'http://api.nessieisreal.com/branches',
  bills: 'http://api.nessieisreal.com/enterprise/bills',
  customers: 'http://api.nessieisreal.com/enterprise/customers',
  deposits: 'http://api.nessieisreal.com/enterprise/deposits',
  transfers: 'http://api.nessieisreal.com/enterprise/transfers',
  withdrawals: 'http://api.nessieisreal.com/enterprise/withdrawals',
};

const API_KEY = 'c5eb4a06f8734937be14b151243890db';

const Docs = () => {
  const [fileContent, setFileContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (type) => {
    setLoading(true);
    setError(null);
    setShowModal(false);
    try {
      const url = `${API_Calls[type]}?key=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const textData = JSON.stringify(data, null, 2);
      setFileContent(textData);
      setShowModal(true);
    } catch (err) {
      setError(err.message);
      console.error(`Error fetching ${type}:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background">
      <h2 className="center-title">Fetch & View API Data</h2>
      <div className="buttonContainer">
        <button className="button" onClick={() => fetchData('accounts')} disabled={loading}>Accounts</button>
        <button className="button" onClick={() => fetchData('merchants')} disabled={loading}>Merchants</button>
        <button className="button" onClick={() => fetchData('atms')} disabled={loading}>ATMs</button>
        <button className="button" onClick={() => fetchData('branches')} disabled={loading}>Branches</button>
        <button className="button" onClick={() => fetchData('bills')} disabled={loading}>Bills</button>
        <button className="button" onClick={() => fetchData('customers')} disabled={loading}>Customers</button>
        <button className="button" onClick={() => fetchData('deposits')} disabled={loading}>Deposits</button>
        <button className="button" onClick={() => fetchData('transfers')} disabled={loading}>Transfers</button>
        <button className="button" onClick={() => fetchData('withdrawals')} disabled={loading}>Withdrawals</button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      {showModal && (
        <div className="overlay">
          <div className="modal">
            <button className="closeBtn" onClick={() => setShowModal(false)}>✖</button>
            <h3>API Data as .txt</h3>
            <pre className="pre">{fileContent}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Docs;