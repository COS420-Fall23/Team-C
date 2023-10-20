import logo from './logo.svg';
import './App.css';
import './components/Login.js';
import { Login } from './components/Login.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1>
          Mentor Mark
        </h1>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Login></Login>
      </header>
    </div>
  );
}

export default App;
