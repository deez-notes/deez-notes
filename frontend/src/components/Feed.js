import React from 'react';
import css from "../styles/Feed.module.scss";

import Post from './Post';
import NavBar from "./NavBar";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const u1 = {
    'username': "Rick Astley",
    'profilelink': "#",
    'timestamp': "4/20/2022",
    'caption': "Something something deez notes go hard",
    'tags': ["rickroll","Rick Astley","meme"],
    'spotifylink': "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=be4a59344f8f4188",
    'userrating': null,
    'ratingscore': "4.2"}

const u2 = {
    'username': "Smash Mouth",
    'profilelink': "#",
    'timestamp': "6/9/2022",
    'caption': "Somebody once told me the world is gonna roll me",
    'tags': ["somebody","once","told","me","the","world","is","gonna","roll","me"],
    'spotifylink': "https://open.spotify.com/track/3cfOd4CMv2snFaKAnMdnvK?si=0e989885727b4aff",
    'userrating': 4,
    'ratingscore': "5.0"}

function Feed () {
    return (
        <div id={css.Profile}>
            <NavBar /> {/* REMOVE, for testing only*/}
            <Box sx={{ width: '100%', display:"flex", justifyContent:"center", alignItems:"center" }}>
                <Stack direction="row" spacing={2} mt={2}>
                    <Stack spacing={2} mb={2}>
                        <Post post={u1} />
                        <Post post={u1}/>
                    </Stack>
                    <Stack spacing={2} mb={2}>
                        <Post post={u2} />
                        <Post post={u2}/>
                    </Stack>
                    <Stack spacing={2} mb={2}>
                        <Post post={u1} />
                        <Post post={u2}/>
                    </Stack>
                </Stack>
            </Box>
        </div> 
    )
}

export default Feed