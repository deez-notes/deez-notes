import * as React from 'react';
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image1 from '../GiangTestImg.jpg'
import TestData from '../TestData.json'; 
import NavBar from "./NavBar"



const theme = createTheme();



export default function SignInSide() {

    // Data
    const [TempFName, changeTempFName ] = useState('default first name');
    const [TempLName, changeTempLName ] = useState('default last name');
    const [TempUser, changeTempUser] = useState('default username');
    const [TempPass, changeTempPass] = useState('default password');
    const [TempBio, changeTempBio ] = useState('default biography');
    const [TempFollowing, changeTempFollowing ] = useState([]);
    const [TempFollowers, changeTempFollowers ] = useState([]);


    const [EditProfile, SetEditProfile] = useState(false);
    const [FName, changeFName ] = useState('default first name');
    const [LName, changeLName ] = useState('default first name');
    const [User, changeUser] = useState('default username');
    const [Pass, changePass] = useState('default password');
    const [Bio, changeBio ] = useState('default biography');
    const [Following, changeFollowing ] = useState([]);
    const [Followers, changeFollowers ] = useState([]);

    const UpdateProfile= () => {
        changeFName(TempFName);
        changeLName(TempLName);
        changeBio(TempBio);
        changeUser(TempUser);
        changePass(TempPass);
        changeFollowers(TempFollowers);
        changeFollowing(TempFollowing);

        SetEditProfile(false);
    };
    

    const HandleProfileChange = () => {
        changeTempFName(FName);
        changeTempLName(LName);
        changeTempBio(Bio);
        changeTempUser(User);
        changeTempPass(Pass);
        changeTempFollowers(Followers);
        changeTempFollowing(Following);
        SetEditProfile(true);
    };

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
                changeFName(user.fname);
                changeLName(user.lname);
                changeUser(user.username);
                changeBio(user.bio);
                changePass(user.password)
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



  return (
      <>
    {/* <NavBar /> */}
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            
            backgroundImage: `url(${Image1})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LibraryMusicIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Your Profile
            </Typography>


            {!EditProfile ? (
            <div>
            <Box component="span" color="#9E9E9E">
            <br/>
            <Typography margin="normal" sx={{ color:"#222222", fontWeight: 'bold', fontSize: 26, mt:3}} component="h1">
              First Name: <Box sx={{ color:"#BCBCBC", fontWeight: 'light'}} display='inline'>{FName}</Box>
            </Typography>

            <Typography sx={{fontSize: 35,color:"#222222", mt:1, mb:1}}>&#10165;</Typography>
            
            <Typography margin="normal" sx={{ color:"#222222", fontWeight: 'bold', fontSize: 26}} component="h1">
              Last Name: <Box sx={{ color:"#BCBCBC", fontWeight: 'light'}} display='inline'>{LName}</Box>
            </Typography>

            <Typography sx={{fontSize: 35, color:"#222222", mt:1, mb:1}}>&#10165;</Typography>

            <Typography margin="normal" sx={{ color:"#222222", fontWeight: 'bold', fontSize: 26}} component="h1">
              Username: <Box sx={{ color:"#BCBCBC", fontWeight: 'light'}} display='inline'>{User}</Box>
            </Typography>

            <Typography sx={{fontSize: 35,color:"#222222", mt:1, mb:1}}>&#10165;</Typography>

            <Typography margin="normal" sx={{ color:"#222222", fontWeight: 'bold', fontSize: 26}} component="h1">
              Password: <Box sx={{ color:"#BCBCBC", fontWeight: 'light'}} display='inline'>{Pass}</Box>
            </Typography>

            <TextField
                sx={{mt:6}}
                margin="normal"
                fullWidth
                defaultValue={Bio}
                multiline
                rows={5}
                maxRows={8}
                helperText='Biography'
                disabled='true'
                
              />

            </Box>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 10, mb: 2 }}
                onClick={HandleProfileChange}
              >
                Edit
              </Button>
            </div>
            ) : (
            <Box component="form" noValidate onSubmit={UpdateProfile} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                label={FName}
                helperText='First Name'
                onChange={event => {changeTempFName(event.target.value)}}
            
              />
              <TextField
                margin="normal"
                fullWidth
                label={LName}
                helperText='Last Name'
                onChange={event => {changeTempLName(event.target.value)}}
              
                
              />
              <TextField
                margin="normal"
                fullWidth
                label={User}
                helperText='Username'
                onChange={event => {changeTempUser(event.target.value)}}
      
              />
              <TextField
                margin="normal"
                fullWidth
                label={Pass}
                helperText='Password'
                onChange={event => {changeTempPass(event.target.value)}}

              />
              <TextField 
                margin="normal"
                fullWidth
                defaultValue={Bio}
                multiline
                rows={5}
                maxRows={8}
                helperText='Biography'
                onChange={event => {changeTempBio(event.target.value)}}
                
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                //onSubmit={UpdateProfile}
              >
                Update
              </Button>
              <Grid container>

              </Grid>
            </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    {/* TO BE REMOVED */}
    <form onSubmit={TempLogin}>
        <input type="text" value={Username} onChange={handleUserChange}/>
        <button type="submit">Temp Login</button>
    </form>
</>
  );
}