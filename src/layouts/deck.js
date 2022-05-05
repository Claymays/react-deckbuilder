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
    let [cardCount, setCardCount] = useState([]);
    let count = 0;

    let deck = JSON.parse(get('deck'));

    useEffect(() => {
        deck.cardsInDeck.map((card) => {
            if (cardCount.some(e => {
                return e.name === card.name;
            })) {
                setCardCount(prevState => {
                    let oldCard = cardCount.find((e) => {return e.name === card.name;});
                    let newCard = [{name: card.name, quantity: oldCard.quantity + 1}]
                    let index = cardCount.findIndex(object => {
                        return object.name === card.name;
                    });
                    let newCount = prevState.slice(index, index);
                    newCount.push(newCard);
                    return newCount;
                })
            } else {
            setCardCount(prevState => {
                return ([...prevState,
                    { name: card.name, quantity: 1}]);
            });
            console.log(card.name);
            let cardContainer = <img src={card.pngUri} alt={card.name}/>;

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
            console.log(count);
            console.log(cardCount[count]);
            count += 1;
            }})
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
                    <Planeswalkers planeswalkers={planeswalkers}/>
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

function Planeswalkers(props) {
    return (
        <>
            {props.planeswalkers}
        </>
    )
}
export default Deck