import React, { useState } from "react";

export function Login() {
    const [logged, setLogged] = useState(false);
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const [attempt, setAttempt] = useState(false);

    //Placeholder for database
    const information = [["Test1", "Test2"]];

    const emailSet = e => {
        setText(e.target.value);
    }

    const passwordSet = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setText("");
        setPassword("");
        if(information.includes([text, password])){
            //Can be changed to redirect to main page
            setLogged(!logged);
        } else {
            setAttempt(true);
        }
    }

    return (<div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" value={text} onChange={emailSet} placeholder="Email"/>
            <input type="text" name="password" value={password} onChange={passwordSet} placeholder="Password"/>
            <input type="submit" value="Log In"/>
        </form>
        {attempt && <span>Invalid Username or Password</span>}
    </div>
    );
}