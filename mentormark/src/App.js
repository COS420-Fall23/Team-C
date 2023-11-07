import SignUpForm from "./SignUpForm";
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <div className="Content">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/signup" element={<SignUpForm />}></Route >
            <Route exact path="/login" element={"Log In Page"}></Route>
            <Route exact path="/homepage" element={"Homepage"}></Route>
          </Routes>
          <header></header>
        </div>
      </div>
    </Router>
  );
}

export default App;
