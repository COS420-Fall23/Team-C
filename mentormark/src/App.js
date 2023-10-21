import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Mentor Mark
        </p>
        <div>
                <button onClick={() => console.log("Refer to Sign up page.")}>
                    Sign Up
                </button>
                <button onClick={() => console.log("Refer to Log In page.")}>
                    Log In
                </button>
            </div>{" "}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
