import {useState} from "react";
import {get, set, $} from "../Shared.js";
import {paths} from "../Routes.js";

function SearchBar() {
    const [cardName, setCardName] = useState("");
    function cardSearch() {
        fetch(paths.card + "?name=" + {cardName}, {
            method: 'GET',
            headers: {
                'Authorization': get('token')
            }
        })
            .then(response => {return response.json()})
            .then()
    }

    return (
        <input id={'searchBar'} type="text" onChange={e => setCardName(e.target.value)}/>
    )
}

export default SearchBar;