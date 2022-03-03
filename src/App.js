import React from "react";
import './App.css';
import {paths} from './Routes.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }


    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    signUp() {
        if (this.validateForm()) {
        let params = {
            username: this.state.username,
            password: this.state.password
        }

        fetch(paths.user, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(params),
        })
            .then(response => {
                return response.json()
            })
            .then((json) => {if (json != null) {alert('Success')}})
        }
    }

    userAuth() {
        if (this.validateForm()) {
            let params = {
                username: this.state.username,
                password: this.state.password
            }

            let searchUrl = 'http://localhost:8080/api/user/login';
            fetch(searchUrl, {
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
                    if (json != null) {alert('Success!');}
                })
        }
    }


    render() {
        return (
            <div className={'login-form'}>
                <input type={'text'} onChange={(e) => this.setState({username: e.target.value})}/>
                <input type={'password'} onChange={(e) => this.setState({password: e.target.value})}/>
                <button type={'submit'} onClick={() => this.userAuth()}>Login</button>
                <button type={'submit'} onClick={() => this.signUp()}>Sign Up</button>
            </div>
        );
    }
}

export default App;
