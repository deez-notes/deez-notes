import React from 'react'
import { Button, Grid, Paper, TextField, ThemeProvider, Typography } from "@mui/material"
import css from '../styles/Home.module.scss'

function Home() {
    return (
        <div id='Home'>
            <div id="logo-container">
                <img src="musical-note.webp" />
            </div>
            <Typography variant="h3">Deez Notes</Typography>
            <div className={css.signInContainer}>
                <Paper elevation={10} className={css.signInForm}>
                    <Typography variant="h4">Sign in here!</Typography>
                    <TextField label="Username" placeholder='Enter your username!' fullWidth required className={css.input} />
                    <TextField label="Password" placeholder='Enter your password!' type="password" fullWidth required className={css.input} />

                    <Button type='submit' color='primary'>Sign In</Button>
                </Paper>
            </div>
        </div >
    )
}

export default Home