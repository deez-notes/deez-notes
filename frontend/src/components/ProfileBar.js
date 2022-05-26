import React from "react";
import Avatar from '@mui/material/Avatar';
import { Stack, Typography } from "@mui/material";

// To be used when viewing followers/following
function ProfileBar(props)
{
    /* props:
        profilePic (a url?? not sure)
        username (straight forward)
    */
    return <div>
        <Stack direction="row" spacing={1}>
            {/* <Avatar src={props.src}/> */}
            <Stack direction="column" spacing={-0.5}>
                <Typography variant="body1">{props.username}</Typography>
                {/* <Typography variant="caption">{props.fullname}</Typography> */}
            </Stack>
            
        </Stack>
    </div>
}

export default ProfileBar;