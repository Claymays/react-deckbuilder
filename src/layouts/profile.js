import {paths, testPaths} from '../Routes'
import {get} from '../Shared'
import SearchBar from "../components/SearchBar";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";


function Profile() {
    const [Loading, setLoading] = useState(true);
    const [decks, setDecks] = useState([]);

    function createDeck() {
        const deckName = prompt() || "default";
        const content = prompt();
        console.log(content);
        const body = {
            'userId': 1,
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
            .catch(e => {
                console.log(e);
            });
    }

    useEffect(() => {
        let isMounted = true;
        fetch(testPaths.user, {
            headers: {
                'Authorization': 'bearer' + get('token')
            }, method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                if (isMounted && data.decks !== []) setDecks(data.decks);
            });
        setLoading(false);
        return () => { isMounted = false};
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
                    <Deck decks={decks}/>
                    <button onClick={() => createDeck()}>Create Deck</button>
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
                    <Link to="/deck" replace={true} id={deck.id}>
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