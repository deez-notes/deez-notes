// import React from 'react'
// import css from '../styles/Account.module.scss';
// import { useState } from "react"
// import { Paper, Button, Typography, TextField } from "@mui/material"
// import axios, { Axios } from "axios";
// import { ArrowBack } from "@material-ui/icons";
// import { useNavigate } from "react-router-dom"

// function Account() {

//     const navigate = useNavigate();

//     const [user, setUser] = useState("");
//     const [password, setPassword] = useState("");
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");

//     const HandleBackNavigation = async (event) => {
//         event.preventDefault();
//         navigate("/");
//     }

//     const handleOnSubmit = async (event) => {
//         event.preventDefault();

//         if (user === "" || password === "" || firstName === "" || lastName === "") {
//             alert("Not all fields were completed!");
//             return;
//         }


//         let userData = {
//             "username": user,
//             "password": password,
//             "first_name": firstName,
//             "last_name": lastName,
//         };

//         let profileData = {
//             "username": user,
//         }

//         let existing = null;
//         axios.get(`http://localhost:8000/users/?user=${user}`)
//             .then((response) => {
//                 existing = response.data;
//                 console.log(existing);
//                 alert("This username already exists!");
//                 return;
//             }).catch(() => {
//                 console.log("This user doesn't exist!");
//             })

//         if (existing === null) {
//             try {
//                 const response = await axios.post('http://localhost:8000/users/', userData, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Accept": "application/json"
//                     },
//                     withCredentials: true
//                 });

//                 const profileResponse = await axios.post('http://localhost:8000/profiles/', profileData, {
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Accept": "application/json"
//                     },
//                     withCredentials: true
//                 });
//                 setUser("");
//                 setPassword("");
//                 setFirstName("");
//                 setLastName("");
//                 console.log(response);
//                 console.log(profileResponse);
//                 console.log("It works!")
//                 navigate("/");
//             } catch (err) {
//                 console.log("boo");
//             }
//         }
//     }

//     return (
//         <div className="">
//             <Paper elevation={10} className={css.signInForm}>
//                 <Button variant="contained" startIcon={<ArrowBack />} onClick={HandleBackNavigation} />
//                 <Typography className={css.formTitle} variant="h4">Create an Account!</Typography>
//                 <TextField className={css.input} label="Username" placeholder='Enter your username!' value={user}
//                     onChange={(e) => setUser(e.target.value)} fullWidth required />
//                 <TextField className={css.input} label="Password" placeholder='Enter your password!' type="password"
//                     value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
//                 <TextField className={css.input} label="First Name" placeholder='Enter your first name!'
//                     value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth required />
//                 <TextField className={css.input} label="Last Name" placeholder='Enter your last name!'
//                     value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth required />
//                 <Button onClick={handleOnSubmit}>Create</Button>


//             </Paper>
//         </div>
//     )
// }

// export default Account









import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import css from '../styles/Account.module.scss';
import { useState } from "react"
import { Paper } from "@mui/material"
import axios, { Axios } from "axios";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate } from "react-router-dom"

import StripBar from "./StripBar"

const theme = createTheme();

export default function Account() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const HandleBackNavigation = async (event) => {
    event.preventDefault();
    navigate("/");
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (user === "" || password === "" || firstName === "" || lastName === "") {
      alert("Not all fields were completed!");
      return;
    }


    let userData = {
      "username": user,
      "password": password,
      "first_name": firstName,
      "last_name": lastName,
    };

    let profileData = {
      "username": user,
    }

    let existing = null;
    axios.get(`http://localhost:8000/users/?user=${user}`)
      .then((response) => {
        existing = response.data;
        console.log(existing);
        alert("This username already exists!");
        return;
      }).catch(() => {
        console.log("This user doesn't exist!");
      })

    if (existing === null) {
      try {
        const response = await axios.post('http://localhost:8000/users/', userData, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          withCredentials: true
        });

        const profileResponse = await axios.post('http://localhost:8000/profiles/', profileData, {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          withCredentials: true
        });
        setUser("");
        setPassword("");
        setFirstName("");
        setLastName("");
        console.log(response);
        console.log(profileResponse);
        console.log("It works!")
        navigate("/");
      } catch (err) {
        console.log("boo");
      }
    }
  }
  document.body.style = 'background: white;';

  return (

    <>
      <StripBar />

      <div className={css.color}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
            <div className={css.fadeText}>
              <Typography variant="h3">
                Create an Account
              </Typography>
            </div>
            <Box component="form" noValidate onSubmit={handleOnSubmit} sx={{ mt: 6 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={firstName} onChange={(e) => setFirstName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName} onChange={(e) => setLastName(e.target.value)}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Username"
                    name="email"
                    autoComplete="email"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="http://localhost:3000/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}