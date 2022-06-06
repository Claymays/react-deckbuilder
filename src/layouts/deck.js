import SearchBar from "../components/SearchBar";
import {get} from "../Shared";
import "../App.css";
import {useEffect, useState} from "react";
import {testPaths} from "../Routes";
import Card from "../components/Card";
import {Link} from "react-router-dom";

function Deck(props) {
    const [planeswalkers, setPlaneswalkers] = useState([]);
    const [creatures, setCreatures] = useState([]);
    const [enchantments, setEnchantments] = useState([]);
    const [artifacts, setArtifacts] = useState([]);
    const [sorceries, setSorceries] = useState([]);
    const [instants, setInstants] = useState([]);
    const [lands, setLands] = useState([]);
    const [countState, setCountState] = useState([]);

    const [deck, setDeck] = useState(props.deck);

    useEffect(() => {
        setCountState(prevState => {
            return prevState.map(card => {
                return {name: card.name, quantity: 0}
            });
        })

        deck.cardsInDeck.forEach((card) => {
            setCountState(prevState => {
                let cardCount = [...prevState];
                if (cardCount.some(e => {
                    return e.name === card.name;
                })) {
                    let oldCard = cardCount.find((e) => {
                        return e.name === card.name;
                    });
                    let newCard = {name: card.name, quantity: oldCard.quantity + 1};
                    let index = cardCount.findIndex(e => {
                        return e.name === card.name;
                    });

                    cardCount.splice(index, 1, newCard);

                    return cardCount;
                } else {
                    cardCount.push({name: card.name, quantity: 1});

                    sortCardByType(card);

                    return cardCount;
                }
            })
        })
    }, [deck]);

    function sortCardByType(card) {
        if (card.typeLine.includes("Creature")) {
            setCreatures(prevState => {
                return [...prevState, card]
            });
        } else if (card.typeLine.includes("Planeswalker")) {
            setPlaneswalkers(prevState => {
                return [...prevState, card]
            });
        } else if (card.typeLine.includes("Sorcery")) {
            setSorceries(prevState => {
                return [...prevState, card]
            });
        } else if (card.typeLine.includes("Land")) {
            setLands(prevState => {
                return [...prevState, card]
            });
        } else if (card.typeLine.includes("Artifact")) {
            setArtifacts(prevState => {
                return [...prevState, card]
            });
        } else if (card.typeLine.includes("Enchantment")) {
            setEnchantments(prevState => {
                return [...prevState, card]
            });
        } else if (card.typeLine.includes("Instant")) {
            setInstants(prevState => {
                return [...prevState, card]
            });
        }
    }

    const CardTypeContainer = ( props ) => {
        return (
            props.cards.map(card => {
                try {
                    let quantity = countState.find((e) => {
                        return e.name === card.name;
                    }).quantity;
                    return <Card
                        key={card.name}
                        name={card.name}
                        quantity={quantity}
                        alt={card.name}
                        src={card.pngUri}
                        update={addCardToDeck}/>

                } catch (e) {

                    console.log(card.name + " " + e);
                    return <></>}
            })
        )
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

    const addCardToDeck = (cardName, quantity) => {
        let params = {
            cardName: cardName,
            deckId: deck.id,
            quantity: quantity
        };

        fetch(testPaths.deckUpdate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer' + get('token'),
                'Access-Control-Allow-Credentials': true,
            }, body: JSON.stringify(params)
        })
            .then((response) => {
                return response.json();
            }).then((deck) => {
                setDeck(deck);
                console.log(deck);
        })
    }

    return (
        <>
            <SearchBar deck={props.deck.id} addCard={addCardToDeck}/>
            <button onClick={() => {deleteDeck()}}>
                Delete Deck
            </button>
            <button onClick={() => {
                window.location.replace("/arena");
            }}>Arena</button>

            <div className={"flexContainer"}>

                <div className={"typeContainer"}>
                    <h2>Creatures:</h2>
                    <CardTypeContainer cards={creatures}/>
                </div>
                <div className={"typeContainer"}>
                    <h2>Planeswalkers:</h2>
                    <CardTypeContainer cards={planeswalkers}/>
                </div>
                <div className={"typeContainer"}>
                    <h2>Instants:</h2>
                    <CardTypeContainer cards={instants}/>
                </div>
                <div className={"typeContainer"}>
                    <h2>Sorceries:</h2>
                    <CardTypeContainer cards={sorceries}/>
                </div>
                <div className={"typeContainer"}>
                    <h2>Lands:</h2>
                    <CardTypeContainer cards={lands}/>
                </div>
                <div className={"typeContainer"}>
                    <h2>Enchantments:</h2>
                    <CardTypeContainer cards={enchantments}/>
                </div>
                <div className={"typeContainer"}>
                    <h2>Artifacts:</h2>
                    <CardTypeContainer cards={artifacts}/>
                </div>
            </div>
        </>
    );
}

export default Deck