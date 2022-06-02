import {paths, testPaths} from '../Routes'
import {get, fetchUserDetails} from '../Shared'
import SearchBar from "../components/SearchBar";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Import} from "./deckImportForm";


function Profile(props) {
    let isMounted = true;
    const [Loading, setLoading] = useState(true);
    const [decks, setDecks] = useState([]);

    const createDeck = (deckName, content) => {
        console.log(content);
        const body = {
            'deckName': deckName,
            'deckContent': content
        };

        fetch(testPaths.deck, {
            headers: {
                'Authorization': 'bearer' + get('token'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then(response => {return response.json()})
            .then((json) => {
                fetchUserDetails();
                setDecks(prevState => {return [...prevState, json]})
            })
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        fetchUserDetails()
            .then((user) => {
                if (isMounted && user.decks !== []) setDecks(user.decks);
            });
        setLoading(false);
        return () => {isMounted = false};
    }, []);

    if (Loading) {
        return (
            <>
                <SearchBar/>
                <p>Loading...</p>
            </>
        );
    } else {
        if (decks === []) {
            return (
                <>
                    <SearchBar/>
                    <button onClick={() => createDeck()}>Create Deck</button>
                </>
            );
        } else {
            return (
                <>
                    <SearchBar/>
                    <Import createDeck={createDeck}/>
                    <Deck decks={decks} selectDeck={props.update}/>

                </>
            );
        }
    }
}

function Deck(props) {
    return (
        <>
            {props.decks.map((deck) => (
                <li key={deck.id}>
                    <Link to={`/deck/${deck.id}`} replace={true} id={deck.id} onClick={() => props.selectDeck(deck)}>
                        {deck.deckName}
                    </Link>
                </li>
                )
            )
            }
        </>
    );
}

export default Profile;