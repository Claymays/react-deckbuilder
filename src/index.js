import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './layouts/main';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./layouts/login";
import Profile from "./layouts/profile";
import Deck from "./layouts/deck";



const Routing = () => {
    return (
        <Router>
            <Routes >
                <Route path="/" element={<Main/>}/>
                <Route path="login" element={<Login/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="deck" element={<Deck/>}>
                    <Route path={`*`} element={<Deck/>}/>
                </Route>
            </Routes>
        </Router>
    )
}
ReactDOM.render(
    <Routing />,
    document.getElementById('root')
);