import React from 'react';
import {useRef, useState} from 'react';
import axios from 'axios'

import StringAvatar from './StringAvatar'
import css from "../styles/Post.module.scss";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';

import StarIcon from '@material-ui/icons/Star';

import { styled } from '@mui/material/styles';
import { IconButtonProps } from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import TextField from '@mui/material/TextField';
import Send from '@material-ui/icons/Send';

import Spotify from 'react-spotify-embed';

import PostDialog from './PostDialog'

// Helper Function to generate Rating System
// https://mui.com/material-ui/react-rating/

// Helper Function to expand Comment Section
// https://mui.com/material-ui/react-card/#complex-interaction
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


// function will at some point need to have a Post class passed in containing data
function Post(props) {
  // console.log(props.post)
  const loggedInUser = localStorage.getItem('userData');
  // rating
  // const [value, setValue] = React.useState(Number(props.post.userrating));
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [rScore, setRSCore] = React.useState(props.post.score);
  const [rLikes, setRLikes] = React.useState(props.post.likes);
  // get users past rating
  axios.get('http://localhost:8000/posts/user_ratings/?username='+loggedInUser+
            '&postID='+props.post._id)
    .then(res => setValue(res.data.rating?res.data.rating:0))
    .catch(err => setValue(0));
  // comment section expand
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // comments
  const commentRef = useRef();
  const [comments,setComments] = React.useState(props.post.comments);
  // handle Comment Enter
  const handleCommentEnter = (e) => {
    e.preventDefault();
    if (commentRef.current.value.length > 0)
    {
      // console.log("Comment: " + commentRef.current.value);
      setComments([...comments, [loggedInUser,commentRef.current.value]]);
      // send to backend
      axios.put('http://localhost:8000/posts/comment/'+props.post._id+
                  '?current_user='+loggedInUser+
                  '&comment='+commentRef.current.value)
        .then(res => console.log(res));
      commentRef.current.value = "";
    }
  };

  // Date
  const postDate = new Date(props.post.date);
  let timestamp = postDate.toString();
  timestamp = timestamp.substring(0,timestamp.lastIndexOf(':'));
    return (
        <Card className={css.card} variant="outlined" sx={{borderRadius: 2 }}>
            <CardHeader 
            className={css.cardHeader}
            avatar={<IconButton href={"/profile/"+props.post.user} size="small"> <StringAvatar name={props.post.user}/></IconButton>}
            action={
                <PostDialog post_op={props.post.user} post_id={props.post._id} />
              }
            title={<Link href={"/profile/"+props.post.user} underline="none" color="inherit">
            {props.post.user}
          </Link>}
            titleTypographyProps={{variant:'h6'}}
            subheader={timestamp}
            />
            <CardContent className={css.cardContent}>
              <Typography variant="body2" color="text.secondary">
              {props.post.desc}
              </Typography>
            </CardContent>
            <CardContent className={css.cardTagsContent}>
              {props.post.tags.map(function(t,i){
                return (<Chip label={t} 
                              variant="outlined" 
                              component="a" 
                              href={"/feed/qtag="+t}
                              size="small"
                              sx={{ mr: 0.3, mb: 0.5 }}
                              clickable />)
              })}
            </CardContent>
            <CardMedia>
              <Spotify wide link={props.post.link} />
            </CardMedia>
            <CardActions className={css.cardActions}>
              <Rating
                name="hover-feedback"
                value={value}
                max={5}
                precision={1}
                onChange={(event, newValue) => {
                  if (newValue == null)
                  {
                    setRSCore(rScore-value);
                    setRLikes(rLikes-1);
                  }
                  else
                  {
                    setRSCore(rScore+newValue);
                    setRLikes(rLikes+1);
                  }
                  setValue(newValue);
                  // send to backend
                  axios.put('http://localhost:8000/posts/rate/'+props.post._id+
                            '?current_user='+loggedInUser+
                            '&score='+(newValue?newValue:0))
                  .then(res => console.log(res));
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {/* {<Box sx={{ ml: 2, mr: 1 }}>{labels[hover !== -1 ? hover : value]}</Box>
              } */}
              {<Chip sx={{ml:1}} label={(rScore/rLikes)?(rScore/rLikes).toFixed(1):'0.0'} variant="outlined" />}
              {<ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ChatBubbleOutline />
              </ExpandMore>}
            </CardActions>
            {/* Comments Section */}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <Divider sx={{mb:1}} component="li" />
                {/* for loop the comments */}
                {comments.map(function([user,comment],i){
                  return (
                  <React.Fragment>
                    {i>0 && <Divider variant="inset" component="li" />}
                    <ListItem alignItems="center" sx={{padding: 0}} key={user+comment}>
                      <ListItemAvatar>
                        {<IconButton href={"/profile/"+user} size="small"> <StringAvatar name={user} /></IconButton>}
                      </ListItemAvatar>
                      <ListItemText
                        secondary={
                          <React.Fragment>
                            {<Link sx={{ display: 'inline', mr: 1 }} href={"/profile/"+user}  underline="none" color="inherit" variant="h6">
                              {user}
                            </Link>}
                            {comment}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                );})}
                {/*  */}
                {props.post.comments.length > 0 && <Divider sx={{mt:1, mb:0.5}} component="li" />}
                <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                  <TextField  inputRef={commentRef}
                              id="input-comment" 
                              label="Enter your comment." 
                              size="small" 
                              variant="standard"
                              defaultValue=""
                              fullWidth
                              InputProps={{fontVariant: "caption"}}
                               />
                  <IconButton onClick={handleCommentEnter} aria-label="send-comment" size="small" sx={{ml: 1}}>
                      <Send />
                  </IconButton>
                </Box>
              </List>
            </Collapse>
        </Card>
    )

}

export default Post