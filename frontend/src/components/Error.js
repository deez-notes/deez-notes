import React from "react";
import { useNavigate } from "react-router-dom"

import css from '../styles/Error.module.scss';
import Image1 from '../STOPITGIANG.jpg' 
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import logo from "../dnlogo_w.png"

import NavBar from "./NavBar"

function Error()
{
    document.body.style = 'background: white;';

    return (
        <>
        {/* <NavBar/> */}
        <AppBar position='sticky' className={css.appbar} sx={{ textAlign: 'center', paddingTop: '.25em', paddingBottom: '.25em', alignItems: 'center' }}>
        <Toolbar>
          <IconButton size='small' color='inherit' aria-label='logo' href="http://localhost:3000/">
            <img src={logo} height="42em"  />
          </IconButton>
        </Toolbar>
        </AppBar>
            
        <br/>
        <div id={css.title}>Uh Oh! This Page Doesn't Exist!</div>
        <Box 
        sx={{
            backgroundImage: `url(${Image1})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginBottom: '-170px'
          }}
        >
    <div className={css.circles}>
      <p>404<br/>
       <small>PAGE NOT FOUND</small>
      </p>
      <span className={css.circleBig}></span>
      <span className={css.circleMed}></span>
      <span className={css.circleSmall}></span>
    </div>
    </Box>
    {/* <div id={css.title}>Try a Different Page.</div> */}
    <br/> <br/> <br/>
    </>
    
    )
}

export default Error;