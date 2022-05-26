import SearchBar from "../components/SearchBar";
import {get, set} from "../Shared";
import "../App.css";
import {useEffect, useState} from "react";
import {testPaths} from "../Routes";
import Card from "../components/Card";
import {addCardToDeck} from "../components/SearchBar";

function Deck() {
    let [planeswalkers, setPlaneswalkers] = useState([]);
    let [creatures, setCreatures] = useState([]);
    let [enchantments, setEnchantments] = useState([]);
    let [artifacts, setArtifacts] = useState([]);
    let [sorceries, setSorceries] = useState([]);
    let [instants, setInstants] = useState([]);
    let [lands, setLands] = useState([]);
    let cardCount = [];
    let [countState, setCountState] = useState([]);

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
                cardCount.push({name: card.name, quantity: 1});
                sortCardByType(card);
            }
    })
        setCountState(cardCount);
        console.log(cardCount);
    }, []);

    function loadCard(card) {
        if (countState.some(e => {
            return e.name === card.name;
        })) {
            let oldCard = countState.find((e) => {return e.name === card.name;});
            let newCard = {name: card.name, quantity: oldCard.quantity + 1};
            let index = countState.findIndex(e => {
                return e.name === card.name;
            });

            if (countState.length === 1) {
                countState.pop();
            } else {
                countState.splice(index, index);
            }
            countState.push(newCard);
            console.log(countState);
        } else {
            countState.push({name: card.name, quantity: 1});
            sortCardByType(card);
        }
    }
    
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
                        quantity={quantity}
                        alt={card.name}
                        src={card.pngUri}
                        onAdd={() => {addCardToDeck()}}
                        onMinus={() => {removeCardFromDeck()}}/>

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

    function addCardToDeck(cardName, quantity) {
        let params = {
            cardName: cardName,
            deckId: deck.id,
            quantity: quantity
        };

        fetch(testPaths.card, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer' + get('token'),
                'Access-Control-Allow-Credentials': true,
            }, body: JSON.stringify(params)
        })
            .then((response) => {
                return response.json();
            }).then((card) => {
            let deck = JSON.parse(get('deck'));
            for (let i = 0; i < quantity; i++) {
                deck.cardsInDeck.push(card);
                loadCard(card);
            }
            set('deck', JSON.stringify(deck));
            console.log(card);
        })
    }
    function removeCardFromDeck(cardName, quantity) {
        let params = {
            cardName: cardName,
            deckId: deck.id,
            quantity: quantity
        };

        fetch(testPaths.deck, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer' + get('token'),
                'Access-Control-Allow-Credentials': true,
            }, body: JSON.stringify(params)
        })
            .then((response) => {
                return response.json();
            }).then((newDeck) => {
                deck = newDeck;
            set('deck', JSON.stringify(deck));
            console.log(deck);
        })
    }

    return (
        <>
            <SearchBar deck={deck.id} addCard={(card) => loadCard(card)}/>
            <button onClick={() => {deleteDeck()}}>
                Delete Deck
            </button>

            <div className={"flexContainer"}>

                <div className={"typeContainer"}>
                    Creatures:
                    <CardTypeContainer cards={creatures}/>
                </div>
                <div className={"typeContainer"}>
                    Planeswalkers:
                    <CardTypeContainer cards={planeswalkers}/>
                </div>
                <div className={"typeContainer"}>
                    Instants:
                    <CardTypeContainer cards={instants}/>
                </div>
                <div className={"typeContainer"}>
                    Sorceries:
                    <CardTypeContainer cards={sorceries}/>
                </div>
                <div className={"typeContainer"}>
                    Lands:
                    <CardTypeContainer cards={lands}/>
                </div>
                <div className={"typeContainer"}>
                    Enchantments:
                    <CardTypeContainer cards={enchantments}/>
                </div>
                <div className={"typeContainer"}>
                    Artifacts:
                    <CardTypeContainer cards={artifacts}/>
                </div>
            </div>
        </>
    );
}

export default Deck