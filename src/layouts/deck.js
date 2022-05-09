import SearchBar from "../components/SearchBar";
import {get} from "../Shared";
import "../App.css";
import {useEffect, useState} from "react";
import {testPaths} from "../Routes";

function Deck(props) {
    let [planeswalkers, setPlaneswalkers] = useState([]);
    let [creatures, setCreatures] = useState([]);
    let [enchantments, setEnchantments] = useState([]);
    let [artifacts, setArtifacts] = useState([]);
    let [sorceries, setSorceries] = useState([]);
    let [instants, setInstants] = useState([]);
    let [lands, setLands] = useState([]);
    let cardCount = [];

    let deck = JSON.parse(get('deck'));

    useEffect(() => {
        deck.cardsInDeck.map((card) => {
            if (cardCount.some(e => {
                return e.name === card.name;
            })) {
                let oldCard = cardCount.find((e) => {return e.name === card.name;});
                let newCard = {name: card.name, quantity: oldCard.quantity + 1};
                let index = cardCount.findIndex(e => {
                    return e.name === card.name;
                });
                if (cardCount.length === 1) {
                    cardCount.pop();
                } else {
                    cardCount.splice(index, index);
                }
                cardCount.push(newCard);
            } else {
            cardCount.push({name: card.name, quantity: 1})
            let cardContainer = <img key={card.name} src={card.pngUri} alt={card.name}/>;

            if (card.typeLine.includes("Creature")) {
                setCreatures(prevState => { return [...prevState, cardContainer]} );
            } else if (card.typeLine.includes("Planeswalker")) {
                setPlaneswalkers(prevState => { return [...prevState, cardContainer]} );
            } else if (card.typeLine.includes("Sorcery")) {
                setSorceries(prevState => { return [...prevState, cardContainer]} );
            } else if (card.typeLine.includes("Land")) {
                setLands(prevState => { return [...prevState, cardContainer]} );
            } else if (card.typeLine.includes("Artifact")) {
                setArtifacts(prevState => { return [...prevState, cardContainer]} );
            } else if (card.typeLine.includes("Enchantment")) {
                setEnchantments(prevState => { return [...prevState, cardContainer]} );
            } else if (card.typeLine.includes("Instant")) {
                setInstants(prevState => { return [...prevState, cardContainer]} );
            }
            }})
        console.log(cardCount);
    }, []);

    function loadCard(card) {
        let cardContainer = <img key={card.name} src={card.pngUri} alt={card.name}/>

        if (card.typeLine.includes("Creature")) {
            setCreatures(prevState => {
                let newState = [...prevState];
                newState.push(cardContainer);
                return newState;
            });
        } else if (card.typeLine.includes("Planeswalker")) {
            console.log(card.name);
            setPlaneswalkers(prevState => {
                let newState = [...prevState];
                newState.push(cardContainer);
                return newState;
            });
        } else if (card.typeLine.includes("Sorcery")) {
            setSorceries(prevState => {
                let newState = [...prevState];
                newState.push(cardContainer);
                return newState;
            });
        } else if (card.typeLine.includes("Land")) {
            setLands(prevState => {
                let newState = [...prevState];
                newState.push(cardContainer);
                return newState;
            });
        } else if (card.typeLine.includes("Artifact")) {
            setArtifacts(prevState => {
                let newState = [...prevState];
                newState.push(cardContainer);
                return newState;
            });
        } else if (card.typeLine.includes("Enchantment")) {
            setEnchantments(prevState => {
                let newState = [...prevState];
                newState.push(cardContainer);
                return newState;
            });
        } else if (card.typeLine.includes("Instant")) {
            setInstants(prevState => {
                let newState = [...prevState];
                newState.push(cardContainer);
                return newState;
            });
        }
    }

    function deleteDeck() {
        fetch(testPaths.deck + deck.id, {
            headers: {
                Authorization: 'bearer' + get('token'),
            }, method: 'DELETE',
        })
            .then(() => {
                window.location.href = "/profile";
            })
            .catch(e => {
                console.log(e);
        })

    }

    return (
        <>
            <SearchBar deck={deck.id} addCard={(card) => loadCard(card)}/>
            <button onClick={() => {deleteDeck()}}>Delete Deck</button>
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