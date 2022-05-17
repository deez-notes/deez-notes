// Create a post page
import React from "react";
import {Button, Paper, TextField, Typography} from "@mui/material";
import TagBox from "./TagBox";
import css from '../styles/Create.module.scss';
import SendIcon from "@mui/icons-material/Send";
import { Cancel } from "@mui/icons-material";
function Create()
{
    const handleOnSubmit = (e) => {
        e.preventDefault();
        // send stuff to the backend
    };

    return <div>
        <br></br>
        {/* still need to add dynamically changing text */}
        <Paper rounded elevation={10} className={css.background}>
            <br/>
            <div className={css.exitbuttondiv}>
                {/* Still need to implement routing to the feed */}
                <Cancel className={css.exitbtn}/>
            </div>
            <Typography variant="h3">Create a Post</Typography>
            
            <div className={css.song}>
                <TextField fullWidth id="song-title" label="Song Title" variant="outlined"/>
                <TextField fullWidth id="song-title" label="Artist" variant="outlined"/>
            </div>
            <div className={css.descriptionBox}>
                <TextField fullWidth multiline id="link" label="Spotify Link" variant="outlined"/>
            </div>
            <div className={css.descriptionBox}>
                <TextField fullWidth multiline id="description" label="Post Description" variant="outlined"/>
            </div>
            {/* Tags */}
            <div className={css.tagbox}>
                <TagBox></TagBox>
            </div>
            <br/>
            <br/>
            <Button variant="contained" className={css.postbutton} endIcon={<SendIcon fontSize="larger"/>}>Post</Button>
            <br/>
            <br/>

        </Paper>
    </div>
}

export default Create;
