import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { findUser } from "./PseudoDatabase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const errorMessage = (e) => {
        return <div style= {{display: error ? '' : "none"}}>
            Invalid Username or Password
        </div>
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Checks against database, assumes no duplicate users
        const x = findUser(email, password);
        if(x !== undefined){

            setError(false);
            //redirects back to homepage, can be changed
            window.location.href = '/';
        } else {
            setError(true);
        }

    }

    return (
    <div className="form">
        <button>
            <Link to="/"><h3>Back</h3></Link>
        </button>
        <form>
            <input onChange={handleEmail} type="text" placeholder="email"/>
            <input onChange={handlePassword} type="text" placeholder="password"/>
            <button onClick={handleSubmit} type="submit">Log In</button>
        </form>
        <div>
            {errorMessage()}
        </div>
    </div>
    );
}