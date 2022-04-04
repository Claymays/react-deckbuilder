import SearchBar from "../components/SearchBar";

function Deck(props) {
    let planeswalkers = document.createElement("div");
    let creatures = document.createElement("div");
    let enchantments = document.createElement("div");
    let artifacts = document.createElement("div");
    let sorceries = document.createElement("div");
    let instants = document.createElement("div");
    let lands = document.createElement("div");

    planeswalkers.style.display = "none";
    creatures.style.display = "none";
    instants.style.display = "none";
    sorceries.style.display = "none";
    artifacts.style.display = "none";
    enchantments.style.display = "none";
    lands.style.display = "none";

    function loadCard(card) {
        if (card.typeLine.includes("Creature")) {
            let cardContainer = document.createElement("img");
            cardContainer.src = card.pngUri;
            creatures.append(cardContainer);
            creatures.style.display = "inline";
        } else if (card.typeLine.includes("Planeswalker")) {
            let cardContainer = document.createElement("img");
            cardContainer.src = card.pngUri;
            planeswalkers.append(cardContainer);
            planeswalkers.style.display = "inline";
        } else if (card.typeLine.includes("Sorcery")) {
            let cardContainer = document.createElement("img");
            cardContainer.src = card.pngUri;
            sorceries.append(cardContainer);
            sorceries.style.display = "inline";
        } else if (card.typeLine.includes("Land")) {
            let cardContainer = document.createElement("img");
            cardContainer.src = card.pngUri;
            lands.append(cardContainer);
            lands.style.display = "inline";
        } else if (card.typeLine.includes("Artifact")) {
            let cardContainer = document.createElement("img");
            cardContainer.src = card.pngUri;
            artifacts.append(cardContainer);
            artifacts.style.display = "inline";
        } else if (card.typeLine.includes("Enchantment")) {
            let cardContainer = document.createElement("img");
            cardContainer.src = card.pngUri;
            enchantments.append(cardContainer);
            enchantments.style.display = "inline";
        } else if (card.typeLine.includes("Instant")) {
            let cardContainer = document.createElement("img");
            cardContainer.src = card.pngUri;
            instants.append(cardContainer);
            instants.style.display = "inline";
        }
    }

    return (
        <>
            <SearchBar/>

        </>
    )
}

export default Deck