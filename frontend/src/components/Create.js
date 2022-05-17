// Create a post page
import React, {useRef, useState} from "react";
import {Button, Chip, Paper, Stack, TextField, Typography} from "@mui/material";
import { Box } from "@mui/system";
import css from '../styles/Create.module.scss';
import SendIcon from "@mui/icons-material/Send";
import { Cancel } from "@mui/icons-material";
function Create()
{

    const titleRef = useRef();
    const artistRef = useRef();
    const linkRef = useRef();
    const descRef = useRef();

    const [tags, setTags] = useState([]);
    const tagRef = useRef();
    

    const handleTagSubmit = (e) => {
        e.preventDefault();
        if (tags.length < 11)
        {
            setTags([...tags, tagRef.current.value]);
            tagRef.current.value = "";
        }
    };

    const handleTagDelete = (value) => {
        const newTags = tags.filter((val) => val !== value);
        setTags(newTags);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // send stuff to the backend
        console.log("Title: " + titleRef.current.value);
        console.log("Artist: " + artistRef.current.value);
        console.log("Link: " + linkRef.current.value);
        console.log("Desc: " + descRef.current.value);
        console.log(tags);

        // reset form?
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
                <TextField inputRef={titleRef} fullWidth id="song-title" label="Song Title" variant="outlined"/>
                <TextField inputRef={artistRef} fullWidth id="song-artist" label="Artist" variant="outlined"/>
            </div>
            <div className={css.descriptionBox}>
                <TextField inputRef={linkRef} fullWidth multiline id="link" label="Spotify Link" variant="outlined"/>
            </div>
            <div className={css.descriptionBox}>
                <TextField inputRef={descRef} fullWidth multiline id="description" label="Post Description" variant="outlined"/>
            </div>
            {/* Tags */}
            <div className={css.tagbox}>
                <Stack direction="row" spacing={2} className={css.tags}>
                    {tags.map((data, index) => {
                        return <Chip label={data} onDelete={() => {handleTagDelete(data)}}/>
                    })}
                </Stack>
                <Box className={css.box}>
                    <form className={css.descriptionBox} onSubmit={handleTagSubmit}>
                        <TextField inputRef={tagRef} fullWidth variant="standard" className={css.textbox} placeholder="Enter tags here!"></TextField>
                    </form>
                </Box>
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
