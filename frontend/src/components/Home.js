import React from 'react'
import { Button, Grid, Paper, TextField, Typography } from "@mui/material"
import '../styles/Home.css'

function Home() {
    return (
        <div id='Home'>
            <div id="logo-container">
                <img src="musical-note.webp" alt="" />
            </div>
            <Typography variant="h3">Deez Notes</Typography>
            <div id="signIn-form-container">
                <Grid>
                    <Paper elevation={10} style={{ width: "50vh", height: "50vh" }} id="signIn-form">
                        <Typography variant="h4">Sign in here!</Typography>
                        <TextField label="Username" placeholder='Enter your username!' fullWidth required />
                        <TextField label="Password" placeholder='Enter your password!' type="password" fullWidth required />

                        <Button type='submit' color='primary'>Sign In</Button>
                    </Paper>
                </Grid>
            </div>
        </div >
    )
}

export default Home