import './Login.css'
import { useState } from "react";
import { findUser } from "./PseudoDatabase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

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

        //Checks against database, assumes no duplicate users
        const user = findUser(email, password);
        if(user !== undefined){
            setError(false);
        } else {
            setError(true);
        }
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