import React from "react";
import css from '../styles/Error.module.scss';

function Error()
{
    
    return (
        <>
        <div id={css.title}>Uh Oh! This Page Doesn't Exist!</div>
    <div className={css.circles}>
      <p>404<br/>
       <small>PAGE NOT FOUND</small>
      </p>
      <span className={css.circleBig}></span>
      <span className={css.circleMed}></span>
      <span className={css.circleSmall}></span>
    </div>
    </>
    )
}

export default Error;