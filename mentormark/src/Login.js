import './CSS/Login.css'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const history = useNavigate();

    const errorMessage = e => {
        return <div style= {{display: error ? '' : "none"}}>
            Invalid Username or Password
        </div>
    }

    const handleEmail = e => {
        setEmail(e.target.value);
    }

    const handlePassword = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setError(false);
            const user = userCredential.user;
            console.log(user);
            history("/mainpage")
        })
        .catch((logError) => {
            console.log(logError.code, logError.message);

            setError(true);
        })
    }

    return (
        <>
            <div className="form">
                <form className='input-container'>
                    <label className="label" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className='email-input'
                        onChange={handleEmail}
                        id="email"
                        type="email" 
                        placeholder="Enter your email">
                    </input>
                    <label className="label" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className='password-input'
                        onChange={handlePassword}
                        id="password"
                        type="password"
                        placeholder="Enter your password">
                    </input>
                    <button onClick={handleSubmit} className="log-in-button" type="submit">Log In</button>
                </form>
                <div>
                    {errorMessage()}
                </div>
            </div>
        </>
    );
}