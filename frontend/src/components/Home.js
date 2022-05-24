import React from 'react'
import { Button, Grid, FormControl, Paper, TextField, Typography } from "@mui/material";
import css from '../styles/Home.module.scss';
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

function Home() {

    const navigate = useNavigate();

    const HandleSubmit = async (event) => {
        event.preventDefault();

        if (user === "" || password === "") {
            alert("No input was provided!");
            return;
        }

        let data = {
            username: user,
            password: password,
        }

        fetch(`http://localhost:8000/users/?users=${user}`, {
            method: "POST",
            body: JSON.stringify(data),
            header: {
                "Content-type": "application/json"
            },
        })

        // try {
        //     const config = {
        //         headers: {
        //             "Content-type": "application/json"
        //         }
        //     }


        //     const { data } =
        //         await fetch(`http://localhost:8000/`, {
        //             username: user,
        //             password: password
        //         })
        // }

        localStorage.setItem('userData', JSON.stringify(data));
        navigate("/feed", {
            state: {
                username: user
            }
        });
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

    const fetchUser = (id) => {
        console.log("yay");
        console.log({ user });
        console.log({ password });
        fetch(`http://localhost:8000/627d613737bbc64a60d62568`)
            .then(res => res.json())
            .then(data => console.log(data))
        // fetch(`http://localhost:8000/users/${id}`)
        //     .then(res => res.json())
        //     .then(data => console.log(data))
    };


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
            </div><Button onClick={() => {
                fetchUser("fun");
            }}
            >Hi</Button>
        </div >
    )
}

export default Home