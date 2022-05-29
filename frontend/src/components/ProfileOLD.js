import React from 'react'
import { Typography, Button } from "@mui/material"
import NavBar from "./NavBar"
import { useState } from 'react'
import css from "../styles/Profile.module.scss"
import TestData from '../TestData.json'; 
import { renderMatches } from 'react-router-dom'

// READ ME: 
// So, you have to enter in a VALID USERNAME (look at the TestData.json file for a list)
// Then, pg will reload to match that user. 
// If you want to change anything, you click the Editprofile option.
// You edit what u want, and once u click Submit, it is Saved to the page.
// NOTE: IT cannot ALTER the actual json file itself yet, i think only backend stuff can do that. 


function Profile() {


    const [TempName, changeTempName ] = useState('defalt');
    const [TempBio, changeTempBio ] = useState('defalt');
    const [TempFollowing, changeTempFollowing ] = useState([]);
    const [TempFollowers, changeTempFollowers ] = useState([]);


    const [EditProfile, SetEditProfile] = useState(false);
    const [Name, changeName ] = useState('defalt');
    const [Bio, changeBio ] = useState('defalt');
    const [Following, changeFollowing ] = useState([]);
    const [Followers, changeFollowers ] = useState([]);




    const [Username, changeUsername] = useState('enter in valid usr');

    const TempLogin = event => {
        event.preventDefault();
        var stringThing = JSON.stringify(Username);
        for (var i = 0; i < TestData.length; i++)
        {
            var user = TestData[i];
            if (JSON.stringify(user.username) === stringThing)
            {
                alert('This is valid bro');
                changeName(user.name);
                changeBio(user.bio);
                changeFollowing(user.following.join(' '));
                changeFollowers(user.followers.join(' '));
                return;
            }
        }
        alert('This is invalid bro');


    };

    const handleUserChange = event => {
        changeUsername(event.target.value)
    };

    const HandleProfileChange = () => {
        changeTempName(Name);
        changeTempBio(Bio);
        changeTempFollowers(Followers);
        changeTempFollowing(Following);
        SetEditProfile(true);


    };

    const UpdateProfile= () => {
        changeName(TempName);
        changeBio(TempBio);
        changeFollowers(TempFollowers);
        changeFollowing(TempFollowing);
        SetEditProfile(false);
    };


    
        return (
            <div id={css.Profile}>
                <NavBar />
                

                
                
                <div>
                    {!EditProfile ? (
                    <div>
                        <div className={css.tempLogin}>
                            <form onSubmit={TempLogin}>
                                <label>
                                    Temp Login 
                                </label>
                                <input type="text" value={Username} onChange={handleUserChange}/>
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                        <div>
                            <img src="tempProfile.jpg" />
                            <Typography>Name: {Name}</Typography>
                            <Typography>Bio: {Bio}</Typography>
                            <Button onClick={HandleProfileChange}>Edit Profile</Button>
                            <Typography>Following: {Following}</Typography>
                            <Typography>Followers: {Followers}</Typography>
                        </div>
                    </div>
                    ) : (
                    <div>
                        
                        <form className = {css.updateProfile} onSubmit={UpdateProfile}>
                        <label> Name </label>
                        <input type="text" value={TempName} onChange={event => {changeTempName(event.target.value)}} defaultValue={TempName} />
                        <br/> <br/>
                        <label> Bio </label>
                        <input type="textarea" value={TempBio} onChange={event => {changeTempBio(event.target.value)}} defaultValue={TempBio} />
                        <br/> <br/>
                        <label> Followers </label>
                        <input type="text" value={TempFollowers} onChange={event => {changeTempFollowers(event.target.value)}} defaultValue={TempFollowers} />
                        <br/> <br/>
                        <label> Following </label>
                        <input type="text" value={TempFollowing} onChange={event => {changeTempFollowing(event.target.value)}} defaultValue={TempFollowing} />
                        <br/> <br/>
                        <button type="submit">Submit</button>
                        </form>
                    </div>
                    )}
                </div>
            </div>
            )
    
}

export default Profile