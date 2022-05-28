import React from 'react';
import {useRef, useState} from 'react';
import css from "../styles/Post.module.scss";

import Avatar from '@mui/material/Avatar';
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

import MoreVertIcon from '@material-ui/icons/MoreVert';
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

// Helper Functions to generate String Avatars
// from https://mui.com/material-ui/react-avatar/
function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
function stringAvatar(name) {
return {
    sx: {
    bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
};
}

// Helper Functions to generate Rating System
// https://mui.com/material-ui/react-rating/

// Helper Functions to expand Comment Section
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

// List to show comments
// https://mui.com/material-ui/react-list/#align-list-items

// function will at some point need to have a Post class passed in containing data
function Post(props) {
  // rating
  const [value, setValue] = React.useState(Number(props.post.userrating));
  const [hover, setHover] = React.useState(-1);
  // comment section expand
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // comments
  const commentRef = useRef();
  const [comments,setComments] = React.useState(props.post.comments);
  const handleCommentEnter = (e) => {
    e.preventDefault();
    if (commentRef.current.value.length > 0)
    {
      console.log("Comment: " + commentRef.current.value);
      setComments([...comments, {'username':"TEST COMMENT",'profilelink':'#','comment':commentRef.current.value}]);
      commentRef.current.value = "";
      // send to backend
    }
  };

    return (
        <Card className={css.card} variant="outlined" elevation="24" sx={{borderRadius: 2 }}>
            <CardHeader 
            className={css.cardHeader}
            avatar={<IconButton href={props.post.profilelink} size="small"> <Avatar {...stringAvatar(props.post.username)} /></IconButton>}
            action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            title={<Link href={props.post.profilelink} underline="none" color="inherit">
            {props.post.username}
          </Link>}
            titleTypographyProps={{variant:'h6'}}
            subheader={props.post.timestamp}
            />
            <CardContent className={css.cardContent}>
              <Typography variant="body2" color="text.secondary">
              {props.post.caption}
              </Typography>
            </CardContent>
            <CardContent className={css.cardTagsContent}>
              {props.post.tags.map(function(t,i){
                return (<Chip label={t} 
                              variant="outlined" 
                              component="a" 
                              href=""
                              size="small"
                              sx={{ mr: 0.3, mb: 0.5 }}
                              clickable />)
              })}
            </CardContent>
            <CardMedia>
              <Spotify wide link={props.post.spotifylink} />
            </CardMedia>
            <CardActions className={css.cardActions}>
              <Rating
                name="hover-feedback"
                value={value}
                max={5}
                precision={1}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {/* {<Box sx={{ ml: 2, mr: 1 }}>{labels[hover !== -1 ? hover : value]}</Box>
              } */}
              {<Chip sx={{ml:1}} label={props.post.ratingscore} variant="outlined" />}
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
                {comments.map(function({username,profilelink,comment},i){
                  return (
                  <React.Fragment>
                    {i>0 && <Divider variant="inset" component="li" />}
                    <ListItem alignItems="center" sx={{padding: 0}}>
                      <ListItemAvatar>
                        {<IconButton href={profilelink} size="small"> <Avatar {...stringAvatar(username)} /></IconButton>}
                      </ListItemAvatar>
                      <ListItemText
                        secondary={
                          <React.Fragment>
                            {<Link sx={{ display: 'inline', mr: 1 }} href={profilelink} underline="none" color="inherit" variant="h6">
                              {username}
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
                              label="Enter your comment bro." 
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