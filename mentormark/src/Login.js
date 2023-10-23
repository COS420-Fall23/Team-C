import { useState } from "react";
import { Link } from 'react-router-dom';

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

        //Placeholder for checking against the database
        if(email && password === "Test1"){
            setError(false)
            //redirects back to homepage, can be changed
            window.location.href = '/';
        } else {
            setError(true);
        }

    }

    return (<div className="form">
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