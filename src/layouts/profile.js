import {paths, testPaths} from '../Routes'
import {get} from '../Shared'
import SearchBar from "../components/SearchBar";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";


function Profile() {
    const [Loading, setLoading] = useState(true);
    const [Decks, setDecks] = useState([]);

    function createDeck() {
        const deckName = prompt();
        const deckContent = prompt();
        console.log(deckContent);
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
        return (
            <>
                <SearchBar/>
                <Deck decks={Decks}/>
                <button onClick={() => createDeck()}>Create Deck</button>
            </>
        );
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