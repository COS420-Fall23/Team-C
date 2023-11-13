import './Home.css';
import { Link } from "react-router-dom";
import Login from './Login.js';
import MentorMarkLogo from "./logo/MentorMarkLogoFinals-12.png";
import PostListView from './PostList.js';

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
                    <Login/>
                    <button
                    className="sign-up-button"
                    onClick={() => console.log("Refer to Sign up page.")}
                    >
                    <Link to="/signup"><h3>Sign Up</h3></Link>
                    </button>
                </div>
            </div>
            <PostListView/>
            </header>
        </div>
  );
}

export default Home;