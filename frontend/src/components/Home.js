import React from 'react'
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import css from '../styles/Home.module.scss';

function Home() {
    return (
        <div id='Home'>
            <div id="logo-container">
                <img src="musical-note.webp" alt="" />
            </div>
            <Typography variant="h3">Deez Notes</Typography>
            <div className={css.signInContainer}>
                <Paper elevation={10} className={css.signInForm}>
                    <Typography className={css.formTitle} variant="h4">Sign in here!</Typography>
                    <TextField className={css.input} label="Username" placeholder='Enter your username!' fullWidth required />
                    <TextField className={css.input} label="Password" placeholder='Enter your password!' type="password" fullWidth required />

                    <Button type='submit' color='primary'>Sign In</Button>
                </Paper>
            </div>
        </div >
    )
}

export default Home