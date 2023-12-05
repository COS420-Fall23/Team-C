import SignUpForm from "./SignUpForm";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./Mainpage";
import PostCreation from "./PostCreation";
import AccountPage from "./Account";
import COSPage from "./COSPage";
import ECOPage from "./ECOPage";
import BusinessPage from "./BusinessPage";
import FinancePage from "./FinancePage";
import DesignPage from "./DesignPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route exact path="/signup" element={<SignUpForm />}></Route>
        <Route exact path="/mainpage" element={<Mainpage />}></Route>
        <Route path="/cos" element={<COSPage />}></Route>
        <Route path="/eco" element={<ECOPage />}></Route>
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/design" element={<DesignPage />} />
        <Route exact path="/account" element={<AccountPage />}></Route>
        <Route exact path="/create-post" element={<PostCreation />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
