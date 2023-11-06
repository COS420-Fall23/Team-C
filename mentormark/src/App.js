import SignUpForm from "./SignUpForm";
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";


function App() {
  const [logged, setLogged] = useState(false);

  return (
    <Router>
      <div className="App">
        <div className="Content">
          <Routes>
            <Route exact path="/" element={(<Home context={{logged, setLogged}}/>)}></Route>
            <Route exact path="/signup" element={<SignUpForm />}></Route>
            <Route exact path="/login" element={(<Login context={{logged, setLogged}}/>)}></Route>
          </Routes>
          <header></header>
        </div>
      </div>
    </Router>
  );
}


export default App;
