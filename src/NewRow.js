import React, { useEffect, useState } from "react";
import "./NewRow.css";
const NewRow = (props) => {

    const [itemName, setItemName] = useState(props.name);
    const [itemDesc, setItemDesc] = useState(props.desc);
    const [itemQnt, setItemQnt] = useState(props.qty);
    const [itemPrice, setItemPrice] = useState(props.price);

    useEffect(() => {
        if (props.isClicked) {
            onFormSubmit();
        }
    }, [props.isClicked]);

    const onFormSubmit = () => {
        console.log("ooooof");
        props.onsubmit(itemName, itemDesc, itemQnt, itemPrice);
        setItemName("");
        setItemDesc("");
        setItemQnt("");
        setItemPrice("");
    }

    return (

        <div className="container" key={props.index}>
            <div className="col more-space">
                <label>Item</label>
                <input className="more-space" placeholder="Item Name" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)}></input>
                <input className="more-space" placeholder="Item Descreption" type="text" value={itemDesc} onChange={(e) => setItemDesc(e.target.value)}></input>
            </div>
            <div className="col">
                <label>QTY</label>
                <input type="number" placeholder="Item Quantity" value={itemQnt} onChange={(e) => setItemQnt(e.target.value)}></input>
            </div>
            <div className="col">
                <label>Price/Rate</label>
                <input type="text" placeholder="Item Price" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)}></input>
            </div>
            <div className="col">
                <label>Action</label>
                <h5>delete</h5>
            </div>
        </div>

    );
}

export default NewRow;