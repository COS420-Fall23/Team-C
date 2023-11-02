import './Home.css';
import { Link } from "react-router-dom";
import "./PseudoDatabase.js";
import displayIcon from './PseudoDatabase.js';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <div className="top-bar">

          <div className="buttons">
            <button className="sign-up-button">
              <Link to="/signup"><h3>Sign Up</h3></Link>
            </button>
            <div className="log-in-button-frame">
            <button className="log-in-button">
              <Link to="/login"><h3>Log In</h3></Link>
            </button>
            </div>
          </div>
          <p className="app-name">Mentor Mark</p>
        </div>
        
      </header>
    </div>
  );
}

export default Home;