import React, {useState} from "react";
import {paths, testPaths} from '../Routes';
import {$, set} from '../Shared';
import {Link} from "react-router-dom";
import SearchBar from "../components/SearchBar";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    return (
        <div>
            <SearchBar/>
            <input id={"username"} onChange={e => setUsername(e.target.value)} type={"text"} value={username}/>
            <input id={"password"} onChange={e => setPassword(e.target.value)} type={"password"} value={password}/>
            <button onClick={() => Auth()}>Login</button>
            <button onClick={() => SignUp()}>Sign Up</button>
        </div>
    );
}

async function Auth() {
    let params = {
        username: $('username').value,
        password: $('password').value
    }


    await fetch(testPaths.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    })
        .then(response => {
            return response.json();
        })
        .then(json => {
            if (json != null) {set('token', json); window.location.href = '/profile'}

        })
}

async function SignUp() {
    let params = {
        username: $('username').value,
        password: $('password').value
    }

    await fetch(testPaths.user_create, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params),
    })
        .then(response => {
            return response.json()
        })
        .then((json) => {if (json != null) {set('token', json); window.location.href = '/profile'}})
}

export default Login;