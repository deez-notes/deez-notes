import React from 'react';
import css from "../styles/Feed.module.scss";

import Post from './Post';
import NavBar from "./NavBar";

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

function Feed () {
    return (
        <div id={css.Profile}>
            <NavBar /> {/* REMOVE, for testing only*/}
            <Box sx={{ width: '100%', display:"flex", justifyContent:"center", alignItems:"center" }}>
                <Stack spacing={2} mt={2} mb={2}>
                    <Post />
                    <Post />
                    <Post />
                    {/* Figure out how display dynamic number of posts */}
                </Stack>
            </Box>
        </div> 
    )
}

export default Feed