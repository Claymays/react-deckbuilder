import {useEffect, useState} from "react";

function Card(props) {
    const [quantity, setQuantity] = useState(props.quantity);

    useEffect(() => {
        props.update(props.name, quantity);
    }, [quantity]);

    return (
        <div className={"cardContainer"}>
            <img style={{zIndex: 1}} src={props.src} alt={props.alt} key={props.name}/>
            <div className={"buttonContainer"}>
                <button className={"quantityControlButtons"} onClick={() => {
                    setQuantity(quantity + 1);
                }}>+</button>
                <input type={"number"} value={quantity} onChange={(e) => {
                    setQuantity(e.target.value);
                }}/>
                <button className={"quantityControlButtons"} onClick={() => {
                    setQuantity(quantity - 1);
                }}>-</button>
            </div>
        </div>
    );
}

export default Card;