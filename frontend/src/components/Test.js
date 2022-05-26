import React, {useState, useEffect} from "react";
import FollowPopup from "./FollowPopup";
import axios from "axios";

function Test()
{
    const [user, setUser] = useState('');

    useEffect(() => {
        console.log('AAAAAAAAAAA' + Math.random());
    }, []);

    // axios.get('http://localhost:8000/users/?user=amusedCheese1')
    // .then(res => console.log(res.data));

    console.log("hello world " + Math.random());

    let followers = ['amusedCheese1', 'amusedCheese2', 'amusedCheese3', 'amusedCheese4', 'amusedCheese5'];
    return <div>
        <FollowPopup username='amusedCheese1' title='Followers' data={followers}/>
        <br/>
        <FollowPopup username='amusedCheese1' title='Following' data={followers}/>
    </div>;
}

export default Test;