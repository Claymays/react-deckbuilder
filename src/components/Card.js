import { useLayoutEffect, useRef, useState } from "react";

function Card(props) {
    const [quantity, setQuantity] = useState(props.quantity);

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        } else {
            props.update(props.name, quantity);
        }
    }, [quantity])

    return (
        <div className={"cardContainer"}>
            <img style={{zIndex: 1}} src={ props.src } alt={ props.alt } key={props.name}/>
            <div className={"buttonContainer"}>
                <button className={"quantityControlButtons"} onClick={() => {
                    setQuantity(quantity + 1);
                }}>+</button>
                <div style={{
                    width: "10%",
                    background: "lightgray"
                }}>{ quantity }</div>
                <button className={"quantityControlButtons"} onClick={() => {
                    setQuantity(quantity - 1);
                }}>-</button>
            </div>
        </div>
    );
}

export default Card;