import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header-container">
      <div>
        <h1 className= 'header-text'>FinDocs</h1>
      </div>
      <ul className="tabs-container">
        <li className= 'tab-text'><Link to="/">Home</Link></li>
        <li className= 'tab-text'><Link to="/analytics">Analytics</Link></li>
        <li className= 'tab-text'><Link to="/docs">Docs</Link></li>
        <div className = 'si-card'>
        <li className= 'tab-text'><Link to="/signin">Sign In</Link></li>
        </div>
      </ul>
    </header>
  );
}

export default Header;
