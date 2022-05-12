import React from 'react';
import { useState } from 'react';
import css from "../styles/Post.module.scss";

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

// function will at some point need to have a Post class passed in containing data
function Post () {
    return (
        <Card className={css.card} variant="outlined" elevation="24" sx={{ minWidth: "50vw", maxWidth: "80vw", borderRadius: 2 }}>
            <CardHeader 
            classes={css.cardHeader}
            action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            title="User Name"
            subheader="Time Stamp"
            avatar={<Avatar {...stringAvatar('Deez Notes')} />}
            />
            <Typography variant="body2" color="text.secondary">
            Something something deez notes go hard.
            </Typography>
        {/* Maybe have song embed here? https://mui.com/material-ui/react-card/#ui-controls
        https://www.npmjs.com/package/react-spotify-embed */}
        </Card>
    )

}

export default Post