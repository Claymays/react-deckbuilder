import {useState} from "react";

function Card(props) {
    const [quantity, setQuantity] = useState(props.quantity);

    const CustomButton = (props) => {
        return (
            <div className={"buttonContainer"}>
                <button className={"quantityControlButtons"} onClick={(e) => {
                    setQuantity(prevState => {
                        return prevState + 1;
                    });
                    props.onPlus();
                }}>+</button>
                <input type={"number"} value={quantity.toString()} onChange={(e) => {
                    if (e.target.value > quantity) {
                        setQuantity(e.target.value);
                        props.onPlus();
                    } else if (e.target.value < quantity) {
                        setQuantity(e.target.value);
                        props.onMinus();
                    }

                }}/>
                <button className={"quantityControlButtons"} onClick={() => {
                    setQuantity(prevState => {
                        return prevState - 1;
                    })
                    props.onMinus();
                }}>-</button>
            </div>
        )
    }

    return (
        <div className={"cardContainer"}>
            <img style={{zIndex: 1}} src={props.src} alt={props.alt} key={props.key}/>
            <CustomButton onPlus={() => {props.onAdd(props.key, quantity)}} onMinus={() => {props.onMinus(props.key, quantity)}}/>
        </div>
    );
}

export default Card;