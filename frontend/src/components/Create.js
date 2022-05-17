// Create a post page
import React from "react";
import {TextField, Typography} from "@mui/material";
import TagBox from "./TagBox";
import css from '../styles/Create.module.scss';
function Create()
{
    return <div>
        <br></br>
        {/* still need to add dynamically changing text */}
        <Typography>Create a Post</Typography>
        
        <div className={css.song}>
            <TextField fullWidth id="song-title" label="Song Title" variant="outlined"/>
            <TextField fullWidth id="song-title" label="Artist" variant="outlined"/>
        </div>
        <div className={css.descriptionBox}>
            <TextField fullWidth multiline id="description" label="Post Description" variant="outlined"/>
        </div>
        {/* Tags */}
        <div className={css.tagbox}>
            <TagBox></TagBox>
        </div>
    </div>
}

export default Create;
