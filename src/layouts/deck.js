import SearchBar from "../components/SearchBar";
import {get} from "../Shared";
import "../App.css";
import {useEffect, useState} from "react";

function Deck(props) {
    let [planeswalkers, setPlaneswalkers] = useState([]);
    let [creatures, setCreatures] = useState([]);
    let [enchantments, setEnchantments] = useState([]);
    let [artifacts, setArtifacts] = useState([]);
    let [sorceries, setSorceries] = useState([]);
    let [instants, setInstants] = useState([]);
    let [lands, setLands] = useState([]);
    let cardContainer;

    let deck = JSON.parse(get('deck'));

    useEffect(() => {
        deck.cardsInDeck.map((card) => {
            cardContainer = <img src={card.pngUri} alt={card.name}/>

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
            })
    }, []);

    function loadCard(card) {
        cardContainer = <img src={card.pngUri} alt={card.name}/>

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