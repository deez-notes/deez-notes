import React from 'react'
import { Typography, Button } from "@mui/material"
import NavBar from "./NavBar"
import { useState } from 'react'
import css from "../styles/Profile.module.scss"

function Profile() {


    const HandleProfileChange = () => {

    }

    return (
        <div id={css.Profile}>
            <NavBar />
            <img src="tempProfile.jpg" />
            <Typography>Name</Typography>
            <Typography>Biography</Typography>
            <Button onClick={HandleProfileChange}>Edit Profile</Button>
            <Typography>Following</Typography>
            <Typography>Followers</Typography>
        </div>
    )
}

export default Profile