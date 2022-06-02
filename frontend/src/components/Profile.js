import * as React from 'react';
import { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image1 from '../STOPITGIANG.jpg' 
import NavBar from "./NavBar"
import PostStack from "./PostStack.js"
import Spotify from 'react-spotify-embed';
import axios from "axios";
import css from '../styles/Profile.module.scss';
import '../styles/scrollBar.css'
import PostPopper from './PostPopper.js'
import FollowersDialog from './FollowersDialog.js'
import Error from './Error.js'
import { NotAccessibleSharp } from '@mui/icons-material';




export default function Profile() {
    
  
    // other
    //var str = "localhost:3000/profile/";
    //var pos = str.search() + 
    
    const pageUser = String(window.location.href).substring(30);
    // Data
    const show = "SHOW POSTS";
    const hide = "HIDE POSTS";
    const [countMeter, updateCountMeter ] = useState(0);
    const [realUser, updateRealUser ] = useState(true);
    const [isOwner, updateIsOwner ] = useState(false);
    const [showPost, updateShow ] = useState(true);
    const [TempFName, changeTempFName ] = useState('');
    const [TempLName, changeTempLName ] = useState('');
    const [TempUser, changeTempUser] = useState('');
    const [TempPass, changeTempPass] = useState('');
    const [TempBio, changeTempBio ] = useState('');
    const [TempSong, changeTempSong] = useState('');
    const [TempFollowing, changeTempFollowing ] = useState([]);
    const [TempFollowers, changeTempFollowers ] = useState([]);


    const [EditProfile, SetEditProfile] = useState(false);
    const [FName, changeFName ] = useState('');
    const [LName, changeLName ] = useState('');
    const [User, changeUser] = useState('');
    const [Pass, changePass] = useState('');
    const [Bio, changeBio ] = useState('');
    //const [Song, changeSong] = useState('https://open.spotify.com/track/5ihDGnhQgMA0F0tk9fNLlA?si=4472348a63dd4f83');
    const [Song, changeSong] = useState('');
    const [Following, changeFollowing ] = useState([]);
    const [Followers, changeFollowers ] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);

    
    

    const UpdateProfile= (e) => {
        
      e.preventDefault();
        axios.get("http://localhost:8000/users/?user=" + String(TempUser)).then(res => {
          if (String(TempUser) !== String(localStorage.getItem('userData')))
          {
            alert("This username already exists!");
            return;
            
          }
        });  
        
        changeFName(TempFName);
        changeLName(TempLName);
        changeBio(TempBio);
        changeUser(TempUser);
        changePass(TempPass);
        changeSong(TempSong);
        changeFollowers(TempFollowers);
        changeFollowing(TempFollowing);
        

        axios.put("http://localhost:8000/users/?user=" + String(localStorage.getItem('userData')),
        {first_name : TempFName,
         last_name  : TempLName,
         username   : TempUser,
         password   : TempPass,
         following  : TempFollowing,
         followers  : TempFollowers
        })
        axios.put("http://localhost:8000/profiles/?user=" + String(localStorage.getItem('userData')),
        {bio : TempBio,
         favorite_song : TempSong
        })

        localStorage.setItem('userData', TempUser);

        SetEditProfile(false);
    };
    
    const updateShowPost =() => {
      // console.log(pageUser);
      updateShow(!showPost);
    }
    const HandleProfileChange = () => {
        changeTempFName(FName);
        changeTempLName(LName);
        changeTempBio(Bio);
        changeTempUser(User);
        changeTempPass(Pass);
        changeTempSong(Song)
        changeTempFollowers(Followers);
        changeTempFollowing(Following);
        SetEditProfile(true);



    };

    const handleFollow = () => {
      axios.put("http://localhost:8000/users/follow?current_username=" + localStorage.getItem('userData') + "&to_follow=" + pageUser).then(res => {
        console.log("unfollowing " + pageUser);
        window.location.reload();
      });
    };
    
    const handleUnfollow = () => {
      // http://localhost:8000/users/unfollow?current_username=amusedCheese1&to_unfollow=amusedGnu3
      axios.put("http://localhost:8000/users/unfollow?current_username=" + localStorage.getItem('userData') + "&to_unfollow=" + pageUser).then(res => {
        console.log("unfollowing " + pageUser);
        window.location.reload();
      });
    };

  useEffect(() => {
    // console.log("useEffect activated")
    // axios.get("http://localhost:8000/users/?user=" + String(localStorage.getItem('userData'))).then(res => {
      axios.get("http://localhost:8000/users/?user=" + pageUser).then(res => {
      changeFName(res.data.first_name);
      changeLName(res.data.last_name);
      changeUser(res.data.username)
      changePass(res.data.password);
      changeFollowing(res.data.following);
      changeFollowers(res.data.followers);
      // console.log("useEffect activated2")
      
      
    });
    axios.get("http://localhost:8000/profiles/?user=" + pageUser).then(res => {
      changeBio(res.data.bio);
      changeSong(res.data.favorite_song);
    });
   
    updateCountMeter(countMeter+1);
    axios.get("http://localhost:8000/users/?user=" + pageUser).then(res => {
      updateRealUser(true);
      // console.log("useEffect activated2")
    }).catch(
      function (error) {
        updateRealUser(false);
        return Promise.reject(error)
      }
    )
    if (pageUser === String(localStorage.getItem('userData')))
    {
        updateIsOwner(true);
    }
    else
    {
      // check if logged in user is following the user we are at
      axios.get("http://localhost:8000/users/?user=" + localStorage.getItem('userData')).then(res => {
        let following = res.data.following;
        for (let i=0; i<following.length; i++)
        {
          if (following[i] === pageUser)
          {
            setIsFollowing(true);
            break;
          }
        }
      })
    }
    
  }, []);
  return (
    <div>
      
       { realUser? (<div> 
      <NavBar />
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
        >
        <Grid item md={9} ml={13}  elevation = {6} square>
        <Box className = "scrollbar-hidden"
            sx={{
              my: 10, // 10
              mx: 30,
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          > 
            <Button className= "button" variant="outlined"  onClick={updateShowPost}
            sx={{
              width: '20em',
              // borderColor: '#f3f7f9',
              // color: '#f3f7f9',
              borderWidth: '3px',
              
            }}
            >
              {showPost? hide : show}
            </Button>
            <br/>
            <br/>

            
            <Box className = "scrollbar-hidden"
              sx={{
                
                height: '100%',
                overflowY: 'auto',
            }}
            
            >
              {
              showPost ? (
                <div class="style fade-in">
                  <PostStack numCols={2} numPosts={8} show="user" user={pageUser}/>
                </div>
                ) : (
                  <div class="style fade-out">
                    <PostStack numCols={2} numPosts={8} show="user" user={pageUser}/>
                  </div>
                )
                }

            </Box>
           
          </Box>
          <Box sx={{
            
            marginTop: '17em',
            
          }}>
          {/* <Button className= "button" variant="outlined"
          sx={{
            width: '13em',
            borderColor: '#f3f7f9',
            color: '#f3f7f9',
            borderWidth: '3px',
            display: 'inline',
            margin: '4em',
            
          }}
          > Hi </Button> */}

          </Box>
        </Grid>
        
        </Grid>
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
            <Avatar sx={{ mb: 6, bgcolor: 'primary.main' }}>
              <LibraryMusicIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              {User}'s Profile
            </Typography>


            {!EditProfile ? (
            <div>
            <Box component="span" color="#9E9E9E">
            {/* <br/> */}
            <Typography margin="normal" sx={{ color:"#222222", fontWeight: 'normal', fontSize: 26, mt:3}} component="h1">
              {/* First Name: <Box sx={{ color:"#BCBCBC", fontWeight: 'light'}} display='inline'>{FName}</Box> */}
              {FName} {LName}
            </Typography>
            <br/>

            {isOwner ? (<p></p>) : (isFollowing ? 
            (
              <Button variant="outlined" sx={{
                color: "white",
                background: "#d32f2f",
                border: "red",
                '&:hover': {
                  background: "#d32f2f",
                  border: "red"

                }
              }} onClick={handleUnfollow}>UNFOLLOW</Button>
            ) : 
              (
                <Button variant="contained" sx={{
                  color: "white",
                  background: "green",
                  border: "green",
                  '&:hover': {
                    background: "green",
                    border: "green"
                  }
                }} onClick={handleFollow}>FOLLOW</Button>
              )
             
              )
            }

            {/* <Typography sx={{fontSize: 35,color:"#222222", mt:1, mb:1}}>&#10165;</Typography> */}
            
            {/* <Typography margin="normal" sx={{ color:"#222222", fontWeight: 'bold', fontSize: 26}} component="h1">
              Last Name: <Box sx={{ color:"#BCBCBC", fontWeight: 'light'}} display='inline'>{LName}</Box>
            </Typography> */}

            <Typography sx={{fontSize: 35, color:"#222222", mt:1, mb:1}}>&#10165;</Typography>


            {/* <Typography margin="normal" sx={{ color:"#222222", fontWeight: 'bold', fontSize: 21, mb:7}} component="h1"> */}
              {/* Username: <Box sx={{ color:"#BCBCBC", fontWeight: 'light'}} display='inline'>{User}</Box> */}
              {/* {User} */}
            {/* </Typography> */}

          <FollowersDialog/>
             <br/> 
            
            {String(Song) === '' ?
            (
              <div> 
                <Typography margin="normal" sx={{ color:"#222222", fontWeight: 'bold', fontSize: 26, mb:7}} component="h1">
              Favorite Song: <Box sx={{ color:"#BCBCBC", fontWeight: 'light'}} display='inline'>None</Box>
            </Typography>

              </div>
            )

            :
            (
              <div>
              <Typography margin="normal" sx={{ color:"#222222", fontWeight: 'bold', fontSize: 26, mb:3}} component="h1">
              Favorite Song
              </Typography>
              <Spotify link={Song} />
              </div>
            )
          
            }
            
            <TextField
                sx={{mt:6}}
                margin="normal"
                fullWidth
                defaultValue={Bio}
                multiline
                rows={5}
                helperText='Biography'
                disabled={true}
                
              />

            </Box>

            {
              (pageUser === String(localStorage.getItem('userData'))) ?
              (<div>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
                onClick={HandleProfileChange}
                disabled = {!isOwner}
              >
                Edit
              </Button>
                </div>)
                :
                (<div>  </div>)
            }
            
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


                label="**********"
                helperText='Password'
                onChange={event => {changeTempPass(event.target.value)}}

              />

                <TextField
                margin="normal"
                fullWidth
                label={Song}
                helperText='Song Link'
                onChange={event => {changeTempSong(event.target.value)}}
      
              />
              <TextField 
                margin="normal"
                fullWidth
                defaultValue={Bio}
                multiline
                rows={5}
                helperText='Biography'
                onChange={event => {changeTempBio(event.target.value)}}
                
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
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
        
      </div> ) : (<div>
        
        <Error/>
        {/* <Typography> Error 404 : {String(realUser)} user {pageUser} </Typography> */}
         </div>) }



            
  </div>);

  
}