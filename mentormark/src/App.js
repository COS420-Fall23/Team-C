import SignUpForm  from "./SignUpForm";
import Home from "./Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="Content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route exact path="/signup" element={<SignUpForm />}></Route >
            <Route exact path="/login" element={"Log In Page"}></Route>
          </Routes>
          <header>
            
          </header>
        </div>
      </div>
    </Router>
  );
}

export default App;
