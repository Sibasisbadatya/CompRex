import React, { useRef } from 'react';
import "./Main.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { host } from "../URL/Url";
const File = () => {
    const scrollRef = useRef(null);
    const [spic, setSpic] = useState([]);
    const [reply, setReply] = useState([]);
    const [userComment, setUserComment] = useState("");
    const [replytoast, setReplyToast] = useState(false);
    const toastOptions = {
        position: "bottom-right",
        autoClose: "8000",
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
    const getProfile = async () => {
        const res = await fetch(`${host}/getprofile`, {
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
    }

    useEffect(() => {
        getProfile()
    }, [])

    // getting comments on clickong the photo
    const getComments = async (e) => {
        e.preventDefault();
        setUserComment(e.target.value);
        const res = await fetch(`${host}/getreply`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userComment
            })
        })
        const data = await res.json();
        console.log(data);
        setReply(data);
        if (!replytoast) {
            toast.warning("click again", toastOptions);
            setReplyToast(true);
        }
        else
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    // 
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newUser.photo);
        formData.append('name', newUser.name);
        formData.append('email', userEmail);
        if (!formData.photo || !formData.name) {
            toast.error("Enter all the details", toastOptions);
            return;
        }
        axios.post(`${host}/photo`, formData)
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
                        <div className="name"> <span>Hii {userName} </span> <span>Your Pictures</span><button className='logout-btn' onClick={() => {
                            window.localStorage.clear();
                            window.location.href = "./"
                        }}>Logout</button> </div>
                        <div className="profile">
                            {
                                spic.map((elem, index) => {
                                    return (
                                        <>
                                            <div className='ind-pic' key={index}>
                                                <img className='ppic' src={`${host}/images/${elem.photo}`} alt="{elem.name}" />
                                                <span className='pname'>{elem.name}</span>
                                                <button className='see-cmt' value={elem.name} onClick={getComments}>comments on this photo</button>
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
                                style={{ display: "flex", flexDirection: "column" }}
                            />
                            <input
                                type="text"
                                placeholder="Enter pic name you want to give"
                                name="name"
                                value={newUser.name}
                                onChange={handleChange}
                            />
                            <input style={{ backgroundColor: "aquamarine" }}
                                type="submit"
                            />
                        </form>
                    </div>
                    <div className="right" ref={scrollRef}>
                        <div className="comment">Comments to Your Photos</div>
                        {reply.length ? (
                            <div className="reply-div">
                                {
                                    reply.map((elem, index) => {
                                        return (
                                            <>
                                                <div className='ind-reply-div' key={index}>
                                                    <span>{elem.from} commented "{elem.msg}" on {elem.name}</span>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>) : (
                            <div className="reply-div">
                                <div className='ind-reply-div' style={{ backgroundColor: "#FC427B" }}>
                                    <span>No Comments</span>
                                </div>
                            </div>
                        )
                        }
                        <div className="other-page-btn" onClick={() => { window.location.href = "./other" }}>See Others Photos</div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default File;