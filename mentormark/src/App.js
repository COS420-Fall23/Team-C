import logo from './logo.svg';
import './App.css';
import SignUpForm  from "./SignUpForm";
import Home from "./Home"
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";

function App() {
  return (
<<<<<<< Updated upstream
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Mentor Mark
        </p>
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
=======
    <Router>
      <div className="App">
        <div className="Content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route exact path="/signup" element={<SignUpForm />}></Route >
          </Routes>
          <header>
            
          </header>
        </div>
      </div>
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;
