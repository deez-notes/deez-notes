import React from 'react';
import { useState } from 'react';
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

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarIcon from '@material-ui/icons/Star';


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
const labels = {  null: '🔈', 1: '🔇',  2: '🔈',  3: '🔉',  4: '🔊',};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

// function will at some point need to have a Post class passed in containing data
function Post(props) {
  // rating
  const [value, setValue] = React.useState(Number(props.post.userrating));
  const [hover, setHover] = React.useState(-1);
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
                max={4}
                precision={1}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {<Box sx={{ ml: 2, mr: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
              }{
                <Typography variant="body2" color="text.secondary" >
                 | &nbsp; Rating
                </Typography>
              }{
                <Chip label={props.post.ratingscore} variant="outlined" />
              }
            </CardActions>
        </Card>
    )

}

export default Post