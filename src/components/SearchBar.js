import {useState} from "react";
import {get} from "../Shared.js";
import {testPaths} from "../Routes.js";
import {set} from "../Shared";
import "../App.css"

function SearchBar(props) {
    const [cardName, setCardName] = useState("");
    const [cardSrc, setCardSrc] = useState("");

    function cardSearch() {
        fetch(testPaths.card + "?name=" + cardName, {
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

    function addCardToDeck() {
        let params = {
            cardName: cardName,
            deckId: props.deck,
        };

        fetch(testPaths.card, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer' + get('token'),
                'Access-Control-Allow-Credentials': true,
            }, body: JSON.stringify(params)
        })
            .then((response) => {
                return response.json();
            }).then((card) => {
                let deck = JSON.parse(get('deck'));
                deck.cardsInDeck.push(card);
                set('deck', JSON.stringify(deck));
                console.log(card);
                props.addCard(card);
        })
    }

    if (cardSrc === "") {
        return (
            <div className={"searchHeader"}>
                <input id={'searchBar'} type="text" onChange={e => setCardName(e.target.value)} value={cardName}/>
                <button type={"submit"} onClick={cardSearch}>Search</button>
                <img src={cardSrc} style={{display: "none"}} alt={""}/>
            </div>
        );
    } else  if (props.deck !== undefined) {
        return (
            <div className={"searchHeader"}>
                <input id={'searchBar'} type="text" onChange={e => setCardName(e.target.value)} value={cardName}/>
                <button type={"submit"} onClick={cardSearch}>Search</button>
                <img src={cardSrc} alt={cardName}/>
                <button type={"submit"} onClick={addCardToDeck}>+</button>
            </div>
        );
    } else {
        return (
            <div className={"searchHeader"}>
                <input id={'searchBar'} type="text" onChange={e => setCardName(e.target.value)} value={cardName}/>
                <button type={"submit"} onClick={cardSearch}>Search</button>
                <img src={cardSrc} alt={cardName}/>
            </div>
        )
    }
}

export default SearchBar;