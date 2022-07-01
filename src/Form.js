import React,{useState} from "react";
import "./Form.css";


const Form = () => {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");

    const onFormSubmit = (event) => {
        event.preventDefault();
        console.log("term",name,address,contact);
        let val = localStorage.getItem("names");
        if(val == null) {
            localStorage.setItem("names",JSON.stringify([name]));
        } else {
            let names =JSON.parse(localStorage.getItem("names"));
            let arr = [...names,name];
            localStorage.setItem("names",JSON.stringify(arr));
        }

        alert("submitted");
    }

    return(
        <div className="main-div">
            <label>Client Information Form</label>
            <form onSubmit={onFormSubmit} className="form">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address"/>
                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact"/>
                <button className="submit">Submit</button>
            </form>
            
        </div>
    );

}

export default Form;