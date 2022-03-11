import { paths } from '../Routes'
import { get } from '../Shared'
import SearchBar from "../components/SearchBar";
import {Link} from "react-router-dom";


function Profile() {
    fetch(paths.user, {
        headers: {
            'Authorization': 'bearer' + get('token')
        }, method: 'POST'
    })
        .then(response => {return response.json()})
        .then(user => {
            return (
                <div>
                    {
                        user.decks.map((deck) => (
                            <Link to={"/deck"} replace={true}>
                                <button id={deck.id}>{deck.id}</button>
                            </Link>
                        ))
                    }
                </div>
            );
        }
    );
}

export default Profile;