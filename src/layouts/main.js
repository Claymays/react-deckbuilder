import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import React, {useState} from "react";
import Login from "./login";
import Profile from "./profile";
import Deck from "./deck";
import Arena from "./arena";

function Main() {
    const [deck, setDeck] = useState();


    const Routing = () => {
        return (
            <Router>
                <Routes >
                    <Route path="/" element={<Login/>}/>
                    <Route path="profile" element={<Profile update={setDeck}/>}/>
                    <Route path="deck" element={<Deck deck={deck} update={setDeck}/>}>

                        <Route path={`*`} element={<Deck/>} />
                    </Route>
                    <Route path="arena" element={<Arena/>}/>
                </Routes>
            </Router>
        )
    }
    return (
        <div>
            <Routing />
        </div>
    );
}

export default Main;