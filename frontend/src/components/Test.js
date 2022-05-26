import React from "react";
import FollowPopup from "./FollowPopup";

function Test()
{
    let followers = ['amusedCheese1', 'amusedCheese2', 'amusedCheese3', 'amusedCheese4', 'amusedCheese5'];
    return <div>
        <FollowPopup title='Followers' data={followers}/>
        <br/>
        <FollowPopup title='Following' data={followers}/>
    </div>;
}

export default Test;