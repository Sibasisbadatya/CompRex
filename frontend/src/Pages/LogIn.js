
import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "./LogIn.css";
// import loader from "../Images/loader";
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    if (window.localStorage.getItem("pic-token"))
        window.location.href = "./image";
    const toastOptions = {
        position: "bottom-right",
        autoClose: "5000",
        pauseOnHover: true,
        theme: "dark",
        draggable: true
    }
    const [user, setUser] = useState({
        email: "", password: ""
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        console.log(user);
    }

    const postRegistration = async (e) => {
        console.log("hello");
        e.preventDefault();
        const { name, email, password } = user;
        if (!email || !password) {
            toast.error("Enter Details Properly", toastOptions);
        }
        else if (email && password) {
            const res = await fetch("https://comprex.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })
            console.log(res.status);
            const data = await res.json();
            window.localStorage.setItem("pic-token", data.token);
            console.log(data);
            if (data.message === "sign in succesfully") {
                toast.success("Logged In Succesfully", toastOptions);
                window.localStorage.setItem("resemail", email);
                window.location.href = "./image";
            }
            else if (data.message === "Invalid Credenials")
                toast.error("Invalid Credentials", toastOptions);
        }
        else {
            toast.error("Some Error Occured", toastOptions)
        }
    }
    return (
        <>
            <div className='LogIn'>
                <div className="login-wrapper">
                    <div className="inputl">
                        <label htmlFor="text">Enter Your Email</label>
                        <input type="email" name='email' value={user.email} onChange={handleInput} placeholder='Email' />
                    </div>
                    <div className="inputl">
                        <label htmlFor="text">Enter Your Password</label>
                        <input type="text" placeholder='Password' onChange={handleInput} value={user.password} name='password' />
                    </div>
                    <button className='sbtn' onClick={postRegistration}>Login</button>
                    <button className='sbtn' onClick={() => {
                        window.location.href = "./register"
                    }}>Register</button>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Login
