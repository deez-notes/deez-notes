// Create a post page
import React, {useState} from "react";
import {Button, Paper, TextField, Typography} from "@mui/material";
import TagBox from "./TagBox";
import css from '../styles/Create.module.scss';
import SendIcon from "@mui/icons-material/Send";
import { Cancel } from "@mui/icons-material";
function Create()
{

    const [songTitle, setSongTitle] = useState('');
    const [songArtist, setSongArtist] = useState('');
    const [link, setLink] = useState('');
    const [postDesc, setPostDesc] = useState('');

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // send stuff to the backend
        console.log("Title: " + songTitle);
        console.log("Artist: " + songArtist);
        console.log("Link: " + link);
        console.log("Desc: " + postDesc);
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
                <TextField value={songTitle} onChange={(e) => {setSongTitle(e.target.value)}} fullWidth id="song-title" label="Song Title" variant="outlined"/>
                <TextField value={songArtist} onChange={(e) => {setSongArtist(e.target.value)}} fullWidth id="song-title" label="Artist" variant="outlined"/>
            </div>
            <div className={css.descriptionBox}>
                <TextField value={link} onChange={(e) => {setLink(e.target.value)}} fullWidth multiline id="link" label="Spotify Link" variant="outlined"/>
            </div>
            <div className={css.descriptionBox}>
                <TextField value={postDesc} onChange={(e) => {setPostDesc(e.target.value)}} fullWidth multiline id="description" label="Post Description" variant="outlined"/>
            </div>
            {/* Tags */}
            <div className={css.tagbox}>
                <TagBox></TagBox>
            </div>
            <br/>
            <br/>
            <Button onClick={handleOnSubmit} variant="contained" className={css.postbutton} endIcon={<SendIcon fontSize="larger"/>}>Post</Button>
            <br/>
            <br/>

        </Paper>
    </div>
}

export default Create;
