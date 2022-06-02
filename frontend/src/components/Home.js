import React from 'react'
import { Button, Grid, FormControl, Paper, TextField, Typography } from "@mui/material";
import css from '../styles/Home.module.scss';
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from 'axios';
import StripBar from "./StripBar"

function Home() {

    const navigate = useNavigate();


    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = () => {
        if ((localStorage.getItem('userData') !== 'null')) {
            navigate("/feed");
        }
    }

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
            const response = await axios.post('http://localhost:8000/auth/login', userData, {
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                withCredentials: true
            });
            console.log(response);
            setUser("");
            setPassword("");
            localStorage.setItem('userData', user);
            navigate("/feed", {
                state: {
                    username: user
                }
            });
        } catch (err) {
            console.log("failure to login");
            alert("Invalid username or password!");
        }


        // const response = await axios.post('http://localhost:8000/auth/login', userData, {
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Accept": "application/json"
        //     },
        //     withCredentials: true
        // });
        // console.log(response);
    }

    const HandleAccountNavigate = (event) => {
        event.preventDefault();
        navigate("/account");
    }

    const HandleFeedNavigate = (event) => {
        event.preventDefault();
        navigate("/feed");
    }

    return (
        <div id={css.Home}>
            <StripBar />
            <br />
            <div>
                <img src="dnlogo.png" alt="" width="160vw" height="160vw" />
            </div>
            <Typography variant="h3" id={css.title}>Deez Notes</Typography>
            <div className={css.landingContainer}>
                <div className={css.description}>

                </div>
                <div className={css.imageContainer}>
                    <Typography variant="h4">Share your taste of music. </Typography>
                    <Typography variant="h5">One note can say a thousand words.</Typography>
                    <img className={css.landingImage} src="landing.png"></img>
                </div>
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

            </div>
        </div >
    )
}

export default Home