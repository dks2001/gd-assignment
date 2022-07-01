import React, { useEffect, useState } from "react";
import Select from 'react-select';
import NewRow from "./NewRow";
import "./NewRow.css";

const Invoice = () => {

    const [data, setData] = useState(null);
    const [username, setUSername] = useState("");
    const [clicked, setClicked] = useState(false);
    const [total, setTotal] = useState(0);

    let arr = [];




    let options = JSON.parse(localStorage.getItem("names"));

    if (options !== null) {
        for (let i = 0; i < options.length; i++) {
            arr.push({ label: options[i], value: options[i] });
        }
    }


    const handleChange = (opt) => {
        let val = opt['value'];
        console.log("val", val);
        setUSername(val);

        let data2 = JSON.parse(localStorage.getItem("data"));
        let renderData = data2[val];
        if (data2) {
            let ttl=Number(0);
            for(let i=0;i<renderData.length;i++) {
                ttl += Number(renderData[i].price) * Number(renderData[i].qty);
            }
            setTotal(ttl);
            console.log("Kkkkkkkkkkk", renderData);
            setData(renderData);
            rows(renderData);
        }
    };

    const renderData = () => {
        let data2 = JSON.parse(localStorage.getItem("data"));
        if (data2) {
            let renderData = data2[username];

            let ttl=Number(0);
            for(let i=0;i<renderData.length;i++) {
                ttl += Number(renderData[i].price) * Number(renderData[i].qty);
            }

            setTotal(ttl);

            console.log("00000000000", renderData);
            setData(renderData);
            rows(renderData);
        }
    };

    const onItemAdd = (name, desc, qty, price) => {
        console.log("triggered", username);
        let sData = JSON.parse(localStorage.getItem("data"));
        if (sData) {
            if (username in sData) {
                console.log("sData");
                for (var key of Object.keys(sData)) {
                    if (key === username) {
                        let kVal = sData[key];
                        console.log(kVal, sData, key);
                        let val = [...kVal, { name: name, desc: desc, qty: qty, price, price }];
                        sData[username] = val;
                        localStorage.setItem("data", JSON.stringify(sData));
                    }
                }
            } else {
                sData[username] = [{ name: name, desc: desc, qty: qty, price, price }];
                localStorage.setItem("data", JSON.stringify(sData));
            }



        } else {
            let data = { [username]: [{ name: name, desc: desc, qty: qty, price, price }] };
            localStorage.setItem("data", JSON.stringify(data));
        }
        renderData();
        setClicked(false);


    }

    const rows = () => {
        return (
            <div>
                {
                    data ?
                        <>
                            {
                                data.map((item, index) => (
                                    <NewRow key={index} name={item.name} desc={item.desc} qty={item.qty} price={item.price} />

                                ))

                            }
                        </> :
                        <>
                        </>
                }
            </div>
        );
    }


    return (
        <div>
            <div className="invoice">
                <label>Please Refresh the page before proceed.</label>
                <div className="invoice-input">
                    <input className="mr" type="text" placeholder="Date" ></input>
                    <input className="mr" type="text" placeholder="Due Date" ></input>
                    <Select
                        className="singleselect"
                        options={arr}
                        onChange={handleChange}
                    />
                </div>
                {rows()}

                <NewRow isClicked={clicked} onsubmit={onItemAdd} />
                <button className="submit" onClick={() => { setClicked(true); }}>Add Item</button>
                <div className="invoice-bill">
                    <div className="invoice-bill-final">
                        subtotal : $ {total}
                    </div>
                    <div className="invoice-bill-final">
                        Discount : $ (0%)0.0 
                    </div>
                    <div className="invoice-bill-final"> 
                        Tax : $ (0%)0.0
                    </div>
                    <div className="invoice-bill-final">
                        Total : $ {total}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Invoice;