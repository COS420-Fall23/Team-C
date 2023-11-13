import './Home.css';
import { Link, useNavigate } from "react-router-dom";
import MentorMarkLogo from "./logo/MentorMarkLogoFinals-12.png";
import { auth } from './firebaseConfig';

function Home() {

    const history = useNavigate();

    const handleLogin = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
      
        auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User logged in:", user);
            history("/mainpage")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error:", errorCode, errorMessage);
            // Handle errors - show message or perform actions based on the error
            alert("Incorrect email or password. Please try again.");
        });
      };

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
                            onClick={handleLogin}
                            >
                            <h3>Log In</h3>
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