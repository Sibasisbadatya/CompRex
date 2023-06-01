import React from 'react';
import "./Other.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
const Other = () => {
    const toastOptions = {
        position: "bottom-right",
        autoClose: "5000",
        pauseOnHover: true,
        theme: "dark",
        draggable: true
    }
    const [image, setImage] = useState([]);
    // const [msg, setMsg] = useState([]);
    const userEmail = window.localStorage.getItem("resemail");
    const userName = window.localStorage.getItem("resname");

    if (!window.localStorage.getItem("pic-token"))
        window.location.href = "./";
    const postSubmit = async (value, email, name) => {
        console.log(name);
        const res = await fetch("https://comprex.onrender.com/addreply", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: userEmail,
                to: email,
                msg: value,
                name: name
            })
        })
        const data = await res.json();
        console.log(data);
        if (data == "Reply Sended") {
            toast.success("Reply Sent", toastOptions);
            window.location.href = './other';
        }
    };

    const handleInputChange = (index, value) => {
        const updatedDivs = image.map((div, i) =>
            i === index ? { ...div, value } : div
        );
        setImage(updatedDivs);
        // console.log(image[index].value);
    };
    const getImage = async () => {
        const res = await fetch("https://comprex.onrender.com/getimage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userEmail
            })
        })
        const data = await res.json();
        console.log("data", data);
        if (data.length > 1)
            setImage(data);
        else
            setImage([data]);
    }
    // addreply

    useEffect(() => {
        getImage()
    }, [])

    return (
        <>
            <div className='other'>
                <div className="other-wrapper">
                    {
                        image.map((elem, index) => {
                            return (
                                <>
                                    <div className='otherpic'>
                                        <span className='other-name'>{elem.email} --- {elem.name}</span>
                                        <img src={`https://comprex.onrender.com/images/${elem.photo}`} alt={elem.photo} />
                                        <input className='oinput' type="text" name='msg' onChange={(e) => {
                                            handleInputChange(index, e.target.value)
                                        }} value={elem.value} placeholder='Reply To This Post' />
                                        <button className='obtn' onClick={() => { postSubmit(elem.value, elem.email, elem.name) }}>Submit</button>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Other
