import SearchBar from "../components/SearchBar";
import {get} from "../Shared";

function Deck(props) {
    let planeswalkers = [];
    let creatures = [];
    let enchantments = [];
    let artifacts = [];
    let sorceries = [];
    let instants = [];
    let lands = [];

    let deck = JSON.parse(get('deck'));

    deck.cardsInDeck.map((card) => (
       loadCard(card)
    ));

    function loadCard(card) {
        let cardContainer = <img src={card.pngUri} alt={card.name}/>
        if (card.typeLine.includes("Creature")) {
            creatures.push(cardContainer);
        } else if (card.typeLine.includes("Planeswalker")) {
            planeswalkers.push(cardContainer);
        } else if (card.typeLine.includes("Sorcery")) {
            sorceries.push(cardContainer);
        } else if (card.typeLine.includes("Land")) {
            lands.push(cardContainer);
        } else if (card.typeLine.includes("Artifact")) {
            artifacts.push(cardContainer);
        } else if (card.typeLine.includes("Enchantment")) {
            enchantments.push(cardContainer);
        } else if (card.typeLine.includes("Instant")) {
            instants.push(cardContainer);
        }
    }


    return (
        <>
            <SearchBar deck={deck.id}/>
            <div style={{fontSize: "large"}}>
                Creatures:
                {creatures}
            </div>
            <div style={{fontSize: "large"}}>
                Planeswalkers:
                {planeswalkers}
            </div>
            <div style={{fontSize: "large"}}>
                Instants:
                {instants}
            </div>
            <div style={{fontSize: "large"}}>
                Sorceries:
                {sorceries}
            </div>
            <div style={{fontSize: "large"}}>
                Lands:
                {lands}
            </div>
            <div style={{fontSize: "large"}}>
                Enchantments:
                {enchantments}
            </div>
            <div style={{fontSize: "large"}}>
                Artifacts:
                {artifacts}
            </div>
        </>
    );
}

export default Deck