import Header from './components/Header.jsx';

function App() {
  return (
    <div className='background'>
      <Header></Header>
      <div>
                <h1 className='center-heading'>
                  FinDocs
                </h1>

                <h2 className='center-title'>
                  About me
                </h2>
                <div className='align'>
                  <div className='card'>
                    <p className='position-text'>
                      Got a confusing financial document? We've got your back! Our
                      website makes it easy to analyze your files and spot any
                      potential risks—no finance degree required. 💸🔍
                    </p>
                    <p className='position-text'>
                      You can save your documents in your account to keep everything
                      in one place, or just analyze them once without signing
                      in—we'll automatically delete them after, no strings attached!
                    </p>
                    <p className='position-text'>
                      Not sure what something means? Just ask our chatbot! It's
                      always ready to explain anything you don't understand. 🤖💬
                    </p>
                    <p className='position-text'>
                      Simple, smart, and stress-free—your financial clarity starts
                      here!
                    </p>
                  </div>
                </div>
              </div>
              
    </div>
  );
}

export default App;
