import React, { useState } from "react";

export function Login() {
    const [logged, setLogged] = useState(false);
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");

    function logIn() {
        setLogged(!logged);
    }

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
        
    }

    return (<div>
        <button onClick={logIn}>Log In</button>
        {!logged && <form onSubmit={handleSubmit}>
            <input type="text" name="email" value={text} onChange={emailSet} placeholder="Email"/>
            <input type="text" name="password" value={password} onChange={passwordSet} placeholder="Password"/>
            <input type="submit" value="Enter"/>
        </form>}
    </div>
    );
}