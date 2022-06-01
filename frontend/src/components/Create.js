// Create a post page
import React, {useRef, useState} from "react";
import {Button, Chip, Paper, Stack, TextField, Typography} from "@mui/material";
import { Box } from "@mui/system";
import css from '../styles/Create.module.scss';
import SendIcon from "@mui/icons-material/Send";
import { Cancel } from "@mui/icons-material";
import axios from "axios";

import NavBar from './NavBar'

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
        // WE GOTTA CHECK IF THE USER EVEN PUT ANYTHING
        if (titleRef.current.value === '' || artistRef.current.value === '' || linkRef.current.value === '' || descRef.current.value === '')
        {
            window.alert("FILL OUT ALL FIELDS!");
            return;
        }
        if (!/^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/.test(linkRef.current.value))
        {
            window.alert("INVALID SPOTIFY LINK");
            return;
        }
        // send stuff to the backend
        console.log("Title: " + titleRef.current.value);
        console.log("Artist: " + artistRef.current.value);
        console.log("Link: " + linkRef.current.value);
        console.log("Desc: " + descRef.current.value);
        console.log(tags);
        let date = new Date();
        let pst = date.toLocaleString('en-US', {
            timeZone: 'America/Los_Angeles',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });

        // let time = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0') + ":" +  date.getSeconds().toString().padStart(2, '0');
        console.log(pst);

        let postData = {
            "title" : titleRef.current.value,
            "artist" : artistRef.current.value,
            "link" : linkRef.current.value,
            "rating" : 69.69,
            "desc" : descRef.current.value,
            "tags" : tags,
            "user" : localStorage.getItem('userData'),
            // "date" : pst,
            "comments" : [["", ""], ["",""], ["",""]]
            

            /*
            title: str = Field(...)
            artist: str = Field(...)
            link: str = Field(...)
            rating: float = Field()
            desc: str = Field(...)
            tags: List = Field(...)
            comments: List = Field()
            user: str = Field(...)
            timestamp: str
            */
        };

        console.log(postData);
        axios.post('http://localhost:8000/posts/createpost', postData)
      .then(res => {
        window.alert("Post created!");
        titleRef.current.value = "";
        artistRef.current.value = "";
        linkRef.current.value = "";
        descRef.current.value = "";
        setTags([]);
      });
        // reset form?
    };

    return <div>
        <NavBar />
        {/* still need to add dynamically changing text */}
        <Box sx={{ width: '100%', display:"flex", justifyContent:"center", alignItems:"center" }}>
        <Paper rounded elevation={10} sx={{width:'50%', mt:2}}>
            <br/>
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
        </Box>
    </div>
}

export default Create;
