import React, {Component} from 'react';

import Post from './Post';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material'



const p1 = {
    'username': "Rick Astley",
    'profilelink': "#",
    'timestamp': "4/20/2022",
    'caption': "Something something deez notes go hard",
    'tags': ["rickroll", "Rick Astley", "meme"],
    'spotifylink': "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=be4a59344f8f4188",
    'userrating': null,
    'ratingscore': "4.2",
    'comments':[{'username':'Ricky Rick','profilelink':'#','comment':"We're no strangers to love"},
                {'username':'Ast Ly','profilelink':'#','comment':"You know the rules and so do I"},],
}

const p2 = {
    'username': "Smash Mouth",
    'profilelink': "#",
    'timestamp': "6/9/2022",
    'caption': "Somebody once told me the world is gonna roll me",
    'tags': ["somebody", "once", "told", "me", "the", "world", "is", "gonna", "roll", "me"],
    'spotifylink': "https://open.spotify.com/track/3cfOd4CMv2snFaKAnMdnvK?si=0e989885727b4aff",
    'userrating': 4,
    'ratingscore': "5.0",
    'comments':[]
}

const pp = [p1,p2,p1,p1,p2,p2];

class PostStack extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            posts: this.getPosts(),
            numCols: this.props.numCols,
            numPosts: this.props.numPosts,
            show: this.props.show,
        };
        
    }

    getPosts() // fetch posts from backend based on type
    {
        // test
        return pp;
    }

    render() {
        let stackContent = [];
        for (let i=0; i<this.state.numCols; i++)
        {
            let postContent = [];
            for (let j=0; j<this.state.posts.length; j+=this.state.numCols)
            {
                if (j+i < this.state.posts.length)
                    postContent.push(<Post post={this.state.posts[j+i]} />);
            }
            stackContent.push(<Stack spacing={2} mb={2}> {postContent} </Stack>);
        }
        return (
            <Box sx={{ width: '100%', display:"flex", justifyContent:"center", alignItems:"center" }}>
                <Stack direction="row" spacing={2} mt={2}>
                    {stackContent}
                </Stack>
            </Box>
        )
    }
}

PostStack.defaultProps = {
    numCols: 3,
    numPosts: 12,
    show: "feed", // "feed" (following), "user", "tag"
  }

export default PostStack