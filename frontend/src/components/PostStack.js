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
        console.log("this.props.tag === " + this.props.tag);
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
        console.log("this.state.show === " + this.state.show);
        let geturl='http://localhost:8000/posts/';
        if (this.state.show === "feed")
        {
            const loggedInUser = localStorage.getItem('userData');
            const usr = await axios.get('http://localhost:8000/users/?user='+loggedInUser);
            // console.log(usr.data);
            geturl += '?quser='+loggedInUser; // show own posts
            for (let i=0; i<usr.data.following.length; i++)
                geturl+= '&quser='+usr.data.following[i]
        }
        else if (this.state.show === "user")
            geturl += '?user='+this.state.user;
        else if (this.state.show === "tag")
        {
            console.log("YEEEEEEEEEHAWWWWWWWWWW");
            geturl += this.state.tag;
        }   
        else if (this.state.show === "all")
            geturl += '';
        console.log("URL: "+ geturl);
        const res = await axios.get(geturl);
        // console.log(res.data);
        this.setState({posts: res.data});
    }

    componentDidMount()
    {
        console.log("1) componentDidMount inside PostStack");
        if (this.state.show === "tag")
        {
            console.log(window.location.href);
            let urlArray = window.location.href.split('/');
            let tagString = urlArray[urlArray.length-1];
            axios.get('http://localhost:8000/posts/?' + tagString).then((res) => {
                this.setState({posts: res.data});
            });
        }
        
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
                if (j+i < Math.min(this.state.posts.length,this.state.numPosts))
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
    numPosts: 24,
    // show: "feed", // "feed" (following, uses logged in user), "user", "tag", "all"
    user: "",
    tag: "",

  }

export default PostStack