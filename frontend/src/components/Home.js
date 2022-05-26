import React from 'react'
import { Button, Grid, FormControl, Paper, TextField, Typography } from "@mui/material";
import css from '../styles/Home.module.scss';
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { axios } from 'axios';

function Home() {

    const navigate = useNavigate();

    const HandleSubmit = async (event) => {
        event.preventDefault();

        if (user === "" || password === "") {
            alert("No input was provided!");
            return;
        }

        let userData = {
            username: user,
            password: password,
        }

        try {
            const response = await axios.post('http://localhost:8000/auth/token', userData, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                withCredentials: true
            });
            console.log(response);
            setUser("");
            setPassword("");
        } catch (err) {
            console.log("boo");
        }

        localStorage.setItem('userData', JSON.stringify(userData));
        // navigate("/feed", {
        //     state: {
        //         username: user
        //     }
        // });
    }

    const HandleAccountNavigate = (event) => {
        event.preventDefault();
        navigate("/account");
    }

    const HandleFeedNavigate = (event) => {
        event.preventDefault();
        navigate("/feed");
    }

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");


    return (


        <div id={css.Home}>
            <div id="logo-container">
                <img src="dn.svg" alt="" width="220vw" />
            </div>
            <Typography variant="h3">Deez Notes</Typography>
            <div className={css.signInContainer}>
                <Paper elevation={10} className={css.signInForm}>
                    <FormControl>
                        <Typography className={css.formTitle} variant="h4">Sign in here!</Typography>
                        <TextField className={css.input} label="Username" placeholder='Enter your username!' value={user}
                            onChange={(e) => setUser(e.target.value)} fullWidth required />
                        <TextField className={css.input} label="Password" placeholder='Enter your password!' type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
                        <Button type='submit' color='primary' onClick={HandleSubmit}>Sign In</Button>
                        <Button onClick={HandleAccountNavigate} color='primary'>Create Account </Button>
                    </FormControl>
                </Paper>
            </div>
        </div >
    )
}

export default Home