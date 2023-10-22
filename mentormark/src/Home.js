import logo from './logo.svg';
import './Home.css';
import { Link } from "react-router-dom";


function Home() {
    return (
        <div className="Home">
          <header className="Home-header">
            <img src={logo} className="Home-logo" alt="logo" />
            <p>
              Mentor Mark
            </p>
            <button>
                <Link to="/signup"><h3>Sign Up</h3></Link>
            </button>
            <button>
                <Link to="/login"><h3>Log In</h3></Link>
            </button>
          </header>
        </div>
    );
  }

export default Home;