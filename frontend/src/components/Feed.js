import React from 'react';
import css from "../styles/Feed.module.scss";

import NavBar from "./NavBar";
import PostStack from "./PostStack"

function Feed(props) {
    return (
        <div id={css.Profile}>
            <NavBar />
            <PostStack />
        </div>
    )
}
export default Feed
