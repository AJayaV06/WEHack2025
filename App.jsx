import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Analytics from './Analytics.jsx';
import Docs from './Docs.jsx';
import SignIn from './SignIn.jsx';

function App() {
  return (
    <div className= 'background'>
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1 className='center-heading'>
                FinDocs
              </h1>

              <h2 className= 'center-title'>
                About me
              </h2>
              <div className= 'align'>
              <div className = 'card'>
                <p className= 'position-text'>
                  Got a confusing financial document? We've got your back! Our
                  website makes it easy to analyze your files and spot any
                  potential risks—no finance degree required. 💸🔍
                </p>
                <p className= 'position-text'>
                  You can save your documents in your account to keep everything
                  in one place, or just analyze them once without signing
                  in—we'll automatically delete them after, no strings attached!
                </p>
                <p className='position-text'>
                  Not sure what something means? Just ask our chatbot! It's
                  always ready to explain anything you don't understand. 🤖💬
                </p>
                <p className= 'position-text'>
                  Simple, smart, and stress-free—your financial clarity starts
                  here!
                </p>
              </div>
              </div>
            </div>
          }
        />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
