import React from "react";
import { useNavigate } from "react-router-dom"

import css from '../styles/Error.module.scss';
import Image1 from '../STOPITGIANG.jpg' 
import Box from '@mui/material/Box';

import StripBar from "./StripBar"
import NavBar from "./NavBar"

function Error()
{
    document.body.style = 'background: white;';

    return (
        <>
        <StripBar />
            
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