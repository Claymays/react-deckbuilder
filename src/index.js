import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './layouts/main';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./layouts/login";
import Profile from "./layouts/profile";
import Deck from "./layouts/deck";

const Routes = require("react-router-dom").Routes;

const routing = (
    <Router>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="deck" element={<Deck />}/>
        </Routes>
    </Router>
)
ReactDOM.render(
    routing,
    document.getElementById('root')
);