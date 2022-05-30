import React from 'react'
import css from '../styles/Account.module.scss';
import { useState } from "react"
import { Paper, Button, Typography, TextField } from "@mui/material"
import axios, { Axios } from "axios";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate } from "react-router-dom"

function Account() {

    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const HandleBackNavigation = async (event) => {
        event.preventDefault();
        navigate("/");
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        if (user === "" || password === "" || firstName === "" || lastName === "") {
            alert("Not all fields were completed!");
            return;
        }


        let userData = {
            "username": user,
            "password": password,
            "first_name": firstName,
            "last_name": lastName,
        };

        let profileData = {
            "username": user,
        }

        let existing = null;
        axios.get(`http://localhost:8000/users/?user=${user}`)
            .then((response) => {
                existing = response.data;
                console.log(existing);
                alert("This username already exists!");
                return;
            }).catch(() => {
                console.log("This user doesn't exist!");
            })

        if (existing === null) {
            try {
                const response = await axios.post('http://localhost:8000/users/', userData, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    withCredentials: true
                });

                const profileResponse = await axios.post('http://localhost:8000/profiles/', profileData, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    withCredentials: true
                });
                setUser("");
                setPassword("");
                setFirstName("");
                setLastName("");
                console.log(response);
                console.log(profileResponse);
                console.log("It works!")
                navigate("/");
            } catch (err) {
                console.log("boo");
            }
        }
    }

    return (
        <div className="">
            <Paper elevation={10} className={css.signInForm}>
                <Button variant="contained" startIcon={<ArrowBack />} onClick={HandleBackNavigation} />
                <Typography className={css.formTitle} variant="h4">Create an Account!</Typography>
                <TextField className={css.input} label="Username" placeholder='Enter your username!' value={user}
                    onChange={(e) => setUser(e.target.value)} fullWidth required />
                <TextField className={css.input} label="Password" placeholder='Enter your password!' type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
                <TextField className={css.input} label="First Name" placeholder='Enter your first name!'
                    value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth required />
                <TextField className={css.input} label="Last Name" placeholder='Enter your last name!'
                    value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth required />
                <Button onClick={handleOnSubmit}>Create</Button>


            </Paper>
        </div>
    )
}

export default Account