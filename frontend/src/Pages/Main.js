import React from 'react';
import "./Main.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const File = () => {

    const toastOptions = {
        position: "bottom-right",
        autoClose: "5000",
        pauseOnHover: true,
        theme: "dark",
        draggable: true
    }

    const userEmail = window.localStorage.getItem("resemail");
    const userName = window.localStorage.getItem("resname");

    if (!window.localStorage.getItem("pic-token"))
        window.location.href = "./";
    const [newUser, setNewUser] = useState(
        {
            name: '',
            photo: '',
            email: userEmail
        }
    );
    const [spic, setSpic] = useState([]);
    const [reply, setReply] = useState([]);
    const getReply = async () => {
        // e.preventDefault();
        const res = await fetch("http://localhost:8000/getreply", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userEmail
            })
        })
        const data = await res.json();
        setReply(data.data);
    }
    const getProfile = async () => {
        const res = await fetch("http://localhost:8000/getprofile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userEmail
            })
        })
        const data = await res.json();
        setSpic(data);
        // console.log(data);
    }

    useEffect(() => {
        getProfile()
    }, [])
    useEffect(() => {
        getReply()
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newUser.photo);
        formData.append('name', newUser.name);
        formData.append('email', userEmail);
        axios.post('http://localhost:8000/photo', formData)
            .then(res => {
                console.log(res);
                if (res.data === "User Added") {
                    toast.success("Photo Added", toastOptions);
                    window.location.href = "./image";
                }
                else if (res.data.msg === "This Name is Already Used")
                    toast.error("This Name is Already Used", toastOptions);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    const handlePhoto = (e) => {
        setNewUser({ ...newUser, photo: e.target.files[0] });
    }

    return (
        <>
            <div className='main-bg'>
                <div className="main-wrapper">
                    <div className="left">
                        <div className="name">{userName}</div>
                        <div className="profile">
                            {
                                spic.map((elem, index) => {
                                    return (
                                        <>
                                            <div className='ind-pic' key={index}>
                                                <img className='ppic' src={`http://localhost:8000/images/${elem.photo}`} alt="" />
                                                <span className='pname'>{elem.name}</span>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <form onSubmit={handleSubmit} className='user-form' encType='multipart/form-data'>
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                name="photo"
                                onChange={handlePhoto}
                            />
                            <input
                                type="text"
                                placeholder="name"
                                name="name"
                                value={newUser.name}
                                onChange={handleChange}
                            />
                            <input
                                type="submit"
                            />
                        </form>
                    </div>
                    <div className="right">
                        {
                            reply.map((elem, index) => {
                                return (
                                    <>
                                        <div className='reply-div'>
                                            <span>{elem.from} Commented "{elem.msg}" on {elem.name}</span>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default File;