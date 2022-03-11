import {Link} from "react-router-dom";
import React from "react";
import SearchBar from "../components/SearchBar";

function Main() {
    return (
        <div>
            <SearchBar/>
            <Link to="/login">Log in</Link>
        </div>
    );
}

export default Main;