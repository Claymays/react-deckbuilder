import {get, set} from "../Shared";

function Arena(props) {
    let library = new Map();
    let hand = new Map();
    let graveyard = new Map();
    let battlefield = new Map();
    let exile = new Map();
    let stack = new Map();
    let commandZone = new Map();

    function startGame() {
        JSON.parse(get('deck')).cardsInDeck.map((card, index) => {
            library.set(index, card);
        });

    }
}