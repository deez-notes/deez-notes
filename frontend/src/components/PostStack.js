import React, {Component} from 'react';
import axios from 'axios';

import Post from './Post';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material'
class PostStack extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            posts: [],
            numCols: this.props.numCols,
            numPosts: this.props.numPosts,
            show: this.props.show,
            user: this.props.user,
            tag: this.props.tag,
        };
        this.getPosts();
    }

    async getPosts() // fetch posts from backend based on type
    {
        let geturl='http://localhost:8000/posts/';
        if (this.state.show === "feed")
        {
            ;
            // geturl += '?user='+this.state.user;
        }
        else if (this.state.show === "user")
            geturl += '?user='+this.state.user;
        else if (this.state.show === "tag")
            geturl += '?q='+this.state.tag;
        const res = await axios.get(geturl);
        // console.log(res.data);
        this.setState({posts: res.data});
    }

    render() {
        console.log(this.state.posts)
        // console.log();
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
    user: "",
    tag: "",

  }

export default PostStack