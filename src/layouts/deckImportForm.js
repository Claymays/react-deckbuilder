import React, {useState} from "react";
import styled from 'styled-components';

const Background = styled.div`
    z-index: 1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ImportScreen = styled.div`
    background-color: white;
    margin: 10% auto;
    padding: 20px;
    width: 80%;
    height: 90%
`

export const Import = (props) => {
    const [shouldShow, setShouldShow] = useState(false);
    const [deckName, setDeckName] = useState('');
    const [deckContent, setDeckContent] = useState('');

    return (
        <>
            <button onClick={() => setShouldShow(true)}>Create Deck</button>
            {shouldShow && (
                <Background onClick={() => setShouldShow(false)}>
                    <ImportScreen onClick={(e) => e.stopPropagation()}>
                        <input
                            type={"text"}
                            name={"Deck Name:"}
                            id={"deckName"}
                            style={{width: "100%", marginBottom: "10px"}}
                            onChange={(e) => {
                                setDeckName(e.target.value)
                            }}/>
                        <textarea
                            type={"text"}
                            key={"deckContent"}
                            style={{width: "100%", height: "80%", marginBottom: "10px"}}
                            onChange={(e) => {
                            setDeckContent(e.target.value);
                        }}/>
                        <button onClick={() => {
                            props.createDeck(deckName || "", deckContent)
                            setShouldShow(false);
                        }}>Submit</button>
                    </ImportScreen>
                </Background>
            )}
        </>
    );
}