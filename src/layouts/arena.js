import {get, set} from "../Shared";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
import {useEffect, useState} from "react";
import Card from "../components/Card";

function Arena(props) {
    let [library, setLibrary] = useState({})
    let [hand, setHand] = useState({});
    let graveyard = new Map();
    let battlefield = new Map();
    let exile = new Map();
    let stack = new Map();
    let commandZone = new Map();

    useEffect(() => {
        props.deck.cardsInDeck.map((card, index) => {
            console.log(card);
            setLibrary(prevState => {
                return [...prevState, {key: index, card: card}]
            });
        });
        for (let i = 0; i < 7; i++) {
            let card = library.get(Math.floor(Math.random() * library.size))
            console.log(card);
            // setHand(prevState => {return [...prevState, card]});
        }

    }, [])

    return (
        <>
            <SearchBar/>
            <Game>
                {/*{hand.map((card) => {*/}
                {/*    return (<Card*/}
                {/*        qunatity={1}*/}
                {/*        src={card.src}*/}
                {/*        key={card.name}*/}
                {/*        update={() => {}}*/}
                {/*        alt={card.name}*/}
                {/*        name={card.name}*/}
                {/*    />)*/}
                {/*})}*/}
                <p>HELLO</p>
            </Game>
        </>
    );
}


const Game = styled.div`
    width: 100%;
    height: 90%;
    min-height: 90%;
    background-color: beige;
    display: flex;
`

export default Arena