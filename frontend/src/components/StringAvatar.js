import React from 'react';

import Avatar from '@mui/material/Avatar';

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

function StringAvatar(props) {
  const name = String(props.name);
return (
    <Avatar
        sx={{bgcolor: stringToColor(name),}}
        children= {name[0]+name[name.length-1]}
    />
);
}

export default StringAvatar