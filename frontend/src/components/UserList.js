import { Stack } from "@mui/material";
import React from "react";
import ProfileBar from "./ProfileBar";

function UserList(props)
{  
    
    if (props.data === "Following")
    {
        return (
            <Stack direction="column" spacing={2}>
                    {props.following.map(user => {
                        return <ProfileBar username={user} fullname="First Last" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"/>
                    })}
            </Stack>
        );
    }
    else
    {
        return (
            <Stack direction="column" spacing={2}>
                    {props.followers.map(user => {
                        return <ProfileBar username={user} fullname="First Last" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2019/12/pokemon-charmander-change.jpg"/>
                    })}
            </Stack>
        );
    }
}

export default UserList;