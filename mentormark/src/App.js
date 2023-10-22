<<<<<<< HEAD
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="top-bar">
          <div className="buttons">
            <button
              className="sign-up-button"
              onClick={() => console.log("Refer to Sign up page.")}
            >
              Sign Up
            </button>
            <div className="log-in-button-frame">
              <button
                className="log-in-button"
                onClick={() => console.log("Refer to Log In page.")}
              >
                Log In
              </button>
            </div>
          </div>
          <p className="app-name">Mentor Mark</p>
        </div>
      </header>
    </div>
=======
import SignUpForm from "./SignUpForm";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="Content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route exact path="/signup" element={<SignUpForm />}></Route>
            <Route exact path="/login" element={"Log In Page"}></Route>
          </Routes>
          <header></header>
        </div>
      </div>
    </Router>
>>>>>>> origin/D2-FrontEnd-Buttons
  );
}

export default App;
