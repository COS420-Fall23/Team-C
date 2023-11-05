import './Home.css';
import { Link } from "react-router-dom";


function Home() {
    return (
        <div className="Home">
            <header className="Home-header">
                <div className="top-bar">
                <div className="buttons">
                    <button
                    className="sign-up-button"
                    onClick={() => console.log("Refer to Sign up page.")}
                    >
                    <Link to="/signup"><h3>Sign Up</h3></Link>
                    </button>
                    <div className="log-in-button-frame">
                    <button
                        className="log-in-button"
                        onClick={() => console.log("Refer to Log In page.")}
                    >
                        <Link to="/login"><h3>Log In</h3></Link>
                    </button>
                    </div>
                </div>
                <button className="app-name">
                    <a href="/azure.jpg">Mentor Mark</a>
                </button>
                </div>
            </header>
        </div>
    );
  }

export default Home;