import {paths, testPaths} from '../Routes'
import {get, fetchUserDetails} from '../Shared'
import SearchBar from "../components/SearchBar";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {set} from "../Shared";


function Profile() {
    let isMounted = true;
    const [Loading, setLoading] = useState(true);
    const [decks, setDecks] = useState([]);

    function createDeck() {
        const deckName = prompt() || "default";
        const content = prompt();
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
            .then((data) => {
                if (isMounted && data.decks !== []) setDecks(data.decks);
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
                    <Link to="/deck" replace={true} id={deck.id} onClick={() => set('deck', JSON.stringify(deck))}>
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