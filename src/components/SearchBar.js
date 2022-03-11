import {useState} from "react";
import {get} from "../Shared.js";
import {paths} from "../Routes.js";

function SearchBar() {
    const [cardName, setCardName] = useState("");
    const [cardSrc, setCardSrc] = useState("");

    function cardSearch() {
        fetch(paths.card + "?name=" + cardName, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer' + get('token'),
                'Access-Control-Allow-Credentials': true,
            }
        })
            .then(response => {return response.json()})
            .then(card => {setCardSrc(card.pngUri)})
    }

    return (
        <div>
            <input id={'searchBar'} type="text" onChange={e => setCardName(e.target.value)} value={cardName}/>
            <button type={"submit"} onClick={cardSearch}>Search</button>
            <img src={cardSrc} style={{display: "none"}} alt={""}/>
        </div>
    );
}

export default SearchBar;