import React from 'react'
import css from '../styles/Account.module.scss';
import { useState } from "react"
import { Paper, Button, Typography, TextField } from "@mui/material"
import axios, { Axios } from "axios";

function Account() {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");


    const handleOnSubmit = async (event) => {
        event.preventDefault();

        let userData = {
            "username": user,
            "password": password,
        };

        let existing = null;
        axios.get(`http://localhost:8000/users/?user=${user}`)
            .then((response) => {
                existing = response.data;
                console.log(existing);
                alert("This username already exists!");
                return;
            }).catch(() => {
                console.log("ERROR");
            })

        if (existing === null) {
            try {
                const response = await axios.post('http://localhost:8000/users', userData, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    withCredentials: true
                });
                console.log(response);
                console.log("It works!")
                setUser("");
                setPassword("");
            } catch (err) {
                console.log("boo");
            }
        }
    }

    return (
        <div className="">
            <Paper elevation={10} className={css.signInForm}>
                <Typography className={css.formTitle} variant="h4">Create an Account!</Typography>
                <TextField className={css.input} label="Username" placeholder='Enter your username!' value={user}
                    onChange={(e) => setUser(e.target.value)} fullWidth required />
                <TextField className={css.input} label="Password" placeholder='Enter your password!' type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
                {/* <TextField className={css.input} label="First Name" placeholder='Enter your password!'
                    value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
                <TextField className={css.input} label="Last Name" placeholder='Enter your password!'
                    value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required /> */}
                <Button onClick={handleOnSubmit}>Create</Button>
            </Paper>
        </div>
    )
}

export default Account