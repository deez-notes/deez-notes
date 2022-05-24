import React from 'react'
import css from '../styles/Account.module.scss';
import { useState } from "react"
import { Paper, Typography, TextField } from "@mui/material"

function Account() {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");

    return (
        <div className="">
            <Paper elevation={10} className={css.signInForm}>
                <Typography className={css.formTitle} variant="h4">Create an Account!</Typography>
                <TextField className={css.input} label="Username" placeholder='Enter your username!' value={user}
                    onChange={(e) => setUser(e.target.value)} fullWidth required />
                <TextField className={css.input} label="Password" placeholder='Enter your password!' type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
                <TextField className={css.input} label="First Name" placeholder='Enter your password!' type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
                <TextField className={css.input} label="Last Name" placeholder='Enter your password!' type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
            </Paper>
        </div>
    )
}

export default Account