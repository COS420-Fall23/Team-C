import './Home.css';
import { Link } from "react-router-dom";
import MentorMarkLogo from "./logo/MentorMarkLogoFinals-12.png";
import { displayIcon, users } from './PseudoDatabase.js';

function Home() {
    return (
        <div className="Home">
            <header className="Home-header">
               <div className="left-section">
                <div className="branding">
                    <img src={MentorMarkLogo} alt="MentorMark Logo" className="logo" />
                    <div className="big-text">entorMark</div>
                    <div className="small-text">Imposter no more!</div>
                </div>
                <div className="signup-login-section">
                    <div className="input-container">
                    <label className="label" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className="input"
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                    />
                    </div>
                    <div className="input-container">
                    <label className="label" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="input"
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                    />
                    </div>
                    <button
                    className="log-in-button"
                    onClick={() => console.log("Refer to Log In page.")}
                    >
                    <Link to="/login"><h3>Log In</h3></Link>
                    </button>
                    <button
                    className="sign-up-button"
                    onClick={() => console.log("Refer to Sign up page.")}
                    >
                    <Link to="/signup"><h3>Sign Up</h3></Link>
                    </button>
                </div>
            </div>
            </header>
        </div>
      </header>
    </div>
  );
}

export default Home;