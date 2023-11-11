import './Home.css';
import { Link } from "react-router-dom";
import Login from './Login.js';
import MentorMarkLogo from "./logo/MentorMarkLogoFinals-12.png";

function Home() {
    return (
            <div className="Home">
                <header className="Home-header">
                    <div className="Homeleft-section">
                        <div className="Homebranding">
                            <img src={MentorMarkLogo} alt="MentorMark Logo" className="Homelogo" />
                            <div className="Homebig-text">entorMark</div>
                            <div className="Homesmall-text">Imposter no more!</div>
                        </div>
                        <div className="Homesignup-login-section">
                            <div className="Homeinput-container">
                            <label className="Homelabel" htmlFor="email">
                                Email:
                            </label>
                            <input
                                className="Homeinput"
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                            />
                            </div>
                            <div className="Homeinput-container">
                            <label className="Homelabel" htmlFor="password">
                                Password:
                            </label>
                            <input
                                className="Homeinput"
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                            />
                            </div>
                            <button
                            className="Homelog-in-button"
                            onClick={() => console.log("Refer to Log In page.")}
                            >
                            <Link to="/login"><h3>Log In</h3></Link>
                            </button>
                            <button
                            className="Homesign-up-button"
                            onClick={() => console.log("Refer to Sign up page.")}
                            >
                            <Link to="/signup"><h3>Sign Up</h3></Link>
                            </button>
                        </div>
                    </div>
                </header>
            </div>
    );
  }

export default Home;