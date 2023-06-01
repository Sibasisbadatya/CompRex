import React from 'react';
import "./SignUp.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
// import loader from "../Images/loader";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const toastOptions = {
        position: "bottom-right",
        autoClose: "5000",
        pauseOnHover: true,
        theme: "dark",
        draggable: true
    }
    const [user, setUser] = useState({
        name: "", email: "", password: "", cpassword: ""
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
        console.log(user);
    }

    const postRegistration = async (e) => {
        console.log("hello");
        e.preventDefault();
        const { name, email, password, cpassword } = user;
        if (password != cpassword) {
            console.log("error in form2");
            toast.error("Enter your Password Properly", toastOptions)
        }
        else if (name && email && password && cpassword) {
            const res = await fetch("https://comprex.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password, cpassword
                })
            })
            console.log(res.status);
            const data = await res.json();
            console.log(data);
            if (data.message === "user registered") {
                window.localStorage.setItem("resname", name);
                window.localStorage.setItem("resemail", email);
                toast.success("User Registered", toastOptions);
                window.location.href = "./";
            }
            if (data.message === "Failed to register")
                toast.warning("Failed to register", toastOptions)
            if (data.message === "Email already exist")
                toast.warning("Email already exist", toastOptions)
        }
        else {
            console.log("error in form");
            toast.error("Plzz fill all the details", toastOptions)
        }
    }


    return (
        <>
            <div className='signUp'>
                <div className="signUp-wrapper">
                    <div className="inputs">
                        <label htmlFor="text">Enter Your Name</label>
                        <input type="text" name='name' value={user.name} onChange={handleInput} placeholder='Name' />
                    </div>
                    <div className="inputs">
                        <label htmlFor="text">Enter Your Email</label>
                        <input type="email" name='email' value={user.email} onChange={handleInput} placeholder='Email' />
                    </div>
                    <div className="inputs">
                        <label htmlFor="text">Enter Your Password</label>
                        <input type="text" placeholder='Password' onChange={handleInput} value={user.password} name='password' />
                    </div>
                    <div className="inputs">
                        <label htmlFor="text">Confirm Password</label>
                        <input type="text" placeholder='Confirm Password' onChange={handleInput} name='cpassword' value={user.cpassword} />
                    </div>
                    <button className='sbtn' onClick={postRegistration}>Register</button>
                    <button className='sbtn' onClick={() => {
                        window.location.href = "./"
                    }}>LogIn</button>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default SignUp
