import './Home.css';
import { Link, useNavigate } from "react-router-dom";
import MentorMarkLogo from "./logo/MentorMarkLogoFinals-12.png";
import { auth } from './firebaseConfig';
import Login from './Login';

function Home() {

    const history = useNavigate();

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
                            <Login/>
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