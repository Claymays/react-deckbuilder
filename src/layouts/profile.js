import {paths} from '../Routes'
import {get} from '../Shared'
import SearchBar from "../components/SearchBar";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";


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



function Profile() {
    const [Loading, setLoading] = useState(true);
    const [Decks, setDecks] = useState([]);
    // const deck = [
    //     {id: 1, deckName: "burn"},
    //     {id: 2, deckName: "tempo"}
    // ];

    useEffect(() => {
        let isMounted = true;
        fetch(paths.user, {
            headers: {
                'Authorization': 'bearer' + get('token')
            }, method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                if (isMounted) setDecks(data.decks);
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
            </>
        );
    }
}
export default Profile;