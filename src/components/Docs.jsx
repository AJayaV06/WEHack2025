// src/components/Docs.jsx
import React, { useState, useEffect } from 'react';
import '../index.css';
import './Docs.css';

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

const ITEMS_PER_PAGE = 10; // Initial limit for accounts (for the "Show All" button)
const DATA_LIMIT = 15; // Reduced maximum number of items to initially display

const Docs = () => {
    const [allParsedData, setAllParsedData] = useState(null);
    const [displayedData, setDisplayedData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentDataType, setCurrentDataType] = useState(null);
    const [showAll, setShowAll] = useState(false);

    const fetchData = async (type) => {
        if (loading) {
            return;
        }
        setLoading(true);
        setError(null);
        setShowModal(true);
        setAllParsedData(null);
        setDisplayedData([]);
        setShowAll(false);
        setCurrentDataType(type);
        try {
            const url = `${API_Calls[type]}?key=${API_KEY}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const results = data.results || data.data || data;
            setAllParsedData(results);
            setDisplayedData(results ? results.slice(0, DATA_LIMIT) : []);

        } catch (err) {
            setError(err.message);
            console.error(`Error fetching ${type}:`, err);
            setAllParsedData(null);
            setDisplayedData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (allParsedData && currentDataType === 'accounts') {
            if (showAll) {
                setDisplayedData(allParsedData);
            } else {
                setDisplayedData(allParsedData.slice(0, ITEMS_PER_PAGE));
            }
        } else if (allParsedData && currentDataType !== 'accounts') {
            setDisplayedData(allParsedData);
        }
    }, [allParsedData, showAll, currentDataType]);

    const closeModal = () => {
        setShowModal(false);
        setAllParsedData(null);
        setDisplayedData([]);
        setCurrentDataType(null);
        setShowAll(false);
    };

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const renderParsedData = () => {
        if (!displayedData) {
            return <p>{loading ? 'Loading data...' : 'No data to display.'}</p>;
        }

        if (currentDataType === 'accounts' && Array.isArray(displayedData)) {
            return (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nickname</th>
                                <th>Type</th>
                                <th>Balance</th>
                                <th>Rewards</th>
                                <th>Customer ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map(account => (
                                <tr key={account._id}>
                                    <td>{account._id}</td>
                                    <td>{account.nickname}</td>
                                    <td>{account.type}</td>
                                    <td>{account.balance}</td>
                                    <td>{account.rewards}</td>
                                    <td>{account.customer_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {allParsedData && allParsedData.length > ITEMS_PER_PAGE && (
                        <button className="load-more-button" onClick={toggleShowAll}>
                            {showAll ? 'Show Less' : `Show All ${allParsedData.length} Items`}
                        </button>
                    )}
                </>
            );
        }

        if (currentDataType === 'merchants' && Array.isArray(displayedData)) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map(merchant => (
                            <tr key={merchant._id}>
                                <td>{merchant._id}</td>
                                <td>{merchant.name}</td>
                                <td>
                                    {Array.isArray(merchant.category)
                                        ? merchant.category.join(', ')
                                        : merchant.category // Display as is if not an array
                                    }
                                </td>
                                <td>{merchant.geocode?.lat}</td>
                                <td>{merchant.geocode?.lng}</td>
                                <td>
                                    {merchant.address?.street_number}{' '}
                                    {merchant.address?.street_name},{' '}
                                    {merchant.address?.city},{' '}
                                    {merchant.address?.state} {merchant.address?.zip}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        if (currentDataType === 'atms' && Array.isArray(displayedData)) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Accessibility</th>
                            <th>Hours</th>
                            <th>State</th>
                            <th>Zip</th>
                            <th>City</th>
                            <th>Street Name</th>
                            <th>Street Number</th>
                            <th>Languages</th>
                            <th>Amount Left</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map(atm => (
                            <tr key={atm._id}>
                                <td>{atm._id}</td>
                                <td>{atm.name}</td>
                                <td>{atm.geocode?.lat}</td>
                                <td>{atm.geocode?.lng}</td>
                                <td>{atm.accessibility ? 'Yes' : 'No'}</td>
                                <td>{atm.hours?.join(', ')}</td>
                                <td>{atm.address?.state}</td>
                                <td>{atm.address?.zip}</td>
                                <td>{atm.address?.city}</td>
                                <td>{atm.address?.street_name}</td>
                                <td>{atm.address?.street_number}</td>
                                <td>{atm.language_list?.join(', ')}</td>
                                <td>{atm.amount_left}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        if (currentDataType === 'branches' && Array.isArray(displayedData)) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Hours</th>
                            <th>Notes</th>
                            <th>Street Number</th>
                            <th>Street Name</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map(branch => (
                            <tr key={branch._id}>
                                <td>{branch._id}</td>
                                <td>{branch.name}</td>
                                <td>{branch.phone_number}</td>
                                <td>{branch.hours?.join(', ')}</td>
                                <td>{branch.notes?.join(', ')}</td>
                                <td>{branch.address?.street_number}</td>
                                <td>{branch.address?.street_name}</td>
                                <td>{branch.address?.city}</td>
                                <td>{branch.address?.state}</td>
                                <td>{branch.address?.zip}</td>
                                <td>{branch.geocode?.lat}</td>
                                <td>{branch.geocode?.lng}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        if (currentDataType === 'bills' && Array.isArray(displayedData)) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map(bill => (
                            <tr key={bill._id}>
                                <td>{bill._id}</td>
                                <td>{bill.first_name}</td>
                                <td>{bill.last_name}</td>
                                <td>
                                    {bill.address?.street_number}{' '}
                                    {bill.address?.street_name},{' '}
                                    {bill.address?.city},{' '}
                                    {bill.address?.state} {bill.address?.zip}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        if (currentDataType === 'customers' && Array.isArray(displayedData)) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map(customer => (
                            <tr key={customer._id}>
                                <td>{customer._id}</td>
                                <td>{customer.first_name}</td>
                                <td>{customer.last_name}</td>
                                <td>
                                    {customer.address?.street_number}{' '}
                                    {customer.address?.street_name},{' '}
                                    {customer.address?.city},{' '}
                                    {customer.address?.state} {customer.address?.zip}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        if (currentDataType === 'deposits' && Array.isArray(displayedData)) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Medium</th>
                            <th>Payee ID</th>
                            <th>Status</th>
                            <th>Transaction Date</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map(deposit => (
                            <tr key={deposit._id}>
                                <td>{deposit._id}</td>
                                <td>{deposit.amount}</td>
                                <td>{deposit.description}</td>
                                <td>{deposit.medium}</td>
                                <td>{deposit.payee_id}</td>
                                <td>{deposit.status}</td>
                                <td>{deposit.transaction_date}</td>
                                <td>{deposit.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        if (currentDataType === 'transfers' && Array.isArray(displayedData)) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Medium</th>
                            <th>Payee ID</th>
                            <th>Payer ID</th>
                            <th>Status</th>
                            <th>Transaction Date</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map(transfer => (
                            <tr key={transfer._id}>
                                <td>{transfer._id}</td>
                                <td>{transfer.amount}</td>
                                <td>{transfer.description}</td>
                                <td>{transfer.medium}</td>
                                <td>{transfer.payee_id}</td>
                                <td>{transfer.payer_id}</td>
                                <td>{transfer.status}</td>
                                <td>{transfer.transaction_date}</td>
                                <td>{transfer.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        if (currentDataType === 'withdrawals' && Array.isArray(displayedData)) {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Medium</th>
                            <th>Payer ID</th>
                            <th>Status</th>
                            <th>Transaction Date</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map(withdrawal => (
                            <tr key={withdrawal._id}>
                                <td>{withdrawal._id}</td>
                                <td>{withdrawal.amount}</td>
                                <td>{withdrawal.description}</td>
                                <td>{withdrawal.medium}</td>
                                <td>{withdrawal.payer_id}</td>
                                <td>{withdrawal.status}</td>
                                <td>{withdrawal.transaction_date}</td>
                                <td>{withdrawal.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        // Fallback to raw JSON for unhandled data types
        return <pre className="pre">{JSON.stringify(displayedData, null, 2)}</pre>;
    };

    return (
        <div className="docs-container">
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

            {error && <div className="error-message">Error: {error}</div>}

            {showModal && (
                <div className="overlay">
                    <div className="modal">
                        <button className="closeBtn" onClick={closeModal}>✖</button>
                        <h3>API Data</h3>
                        <div className="parsed-data-container">
                            {renderParsedData()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Docs;