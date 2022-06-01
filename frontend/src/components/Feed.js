import React, {useEffect, useState} from 'react';
import css from "../styles/Feed.module.scss";

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"

import NavBar from "./NavBar";
import PostStack from "./PostStack"
import { TagFacesTwoTone } from '@material-ui/icons';

function Feed(props) {
    const [tags, setTags] = useState('feed');
    useEffect(() => {
        // if (props.)
        let currentUrl = window.location.href.split('/');
        let tagString = '?' + currentUrl[currentUrl.length-1];
        setTags(tagString);
        console.log("tag string: " + tagString);
    }, []);
    if (tags === "?feed")
    {
        console.log("FEEEEEEED");
        return <div id={css.Profile}>
        <NavBar />
        <Box sx={{width:'100%', mt:2}}>
            <Typography variant="h4">
                Feed
            </Typography>
        </Box>
        <PostStack  show={props.show} 
                    user=""
                    numCols={3} />
        <div style={{height:15}} />
        </div>
    }
    else
    {
        console.log("TAGS");
        return <div id={css.Profile}>
        <NavBar/>
        <Box sx={{width:'100%', mt:2}}>
            <Typography variant="h4">
                Search
            </Typography>
            <Chip   label={tags.substring(tags.indexOf("=")+1)} 
                    variant="outlined"
                    />
        </Box>
        <PostStack show={props.show}
                   tag={tags} />
        <div style={{height:15}} />
        </div>
    }
        
}
export default Feed
