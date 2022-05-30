import React from 'react';
import css from "../styles/Feed.module.scss";

import NavBar from "./NavBar";
import PostStack from "./PostStack"

function Feed(props) {
    return (
        <div id={css.Profile}>
            <NavBar />
            <PostStack  show="feed" 
                        user=""
                        numCols={3} />
            <div style={{height:15}} />
        </div>
    )
}
export default Feed
