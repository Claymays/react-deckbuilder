import SearchBar from "../components/SearchBar";
import {get} from "../Shared";
import "../App.css";
import {useEffect, useState} from "react";

function Deck(props) {
    let [planeswalkers, setPlaneswalkers] = useState([]);
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
            <SearchBar deck={deck.id} addCard={(card) => loadCard(card)}/>
            <div className={"flexContainer"}>

                <div className={"typeContainer"}>
                    Creatures:
                    {creatures}
                </div>
                <div  className={"typeContainer"}>
                    Planeswalkers:
                    {planeswalkers}
                </div>
                <div  className={"typeContainer"}>
                    Instants:
                    {instants}
                </div>
                <div  className={"typeContainer"}>
                    Sorceries:
                    {sorceries}
                </div>
                <div  className={"typeContainer"}>
                    Lands:
                    {lands}
                </div>
                <div  className={"typeContainer"}>
                    Enchantments:
                    {enchantments}
                </div>
                <div  className={"typeContainer"}>
                    Artifacts:
                    {artifacts}
                </div>
            </div>
        </>
    );
}

export default Deck