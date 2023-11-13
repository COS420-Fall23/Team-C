import SignUpForm from "./SignUpForm";

import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./Mainpage";
import PostCreation from "./PostCreation";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Home />}></Route>
        <Route exact path="/signup" element={<SignUpForm />}></Route >
        <Route exact path="/mainpage" element={<Mainpage />}></Route>
        <Route exact path="/create-post" element={<PostCreation />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
