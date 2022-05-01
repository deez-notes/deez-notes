import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Stack, Button, InputBase } from "@mui/material"
import { MusicNote, Search} from "@material-ui/icons";
import '../styles/NavBar.css'


function NavBar() {
    return (
        <AppBar position='static' style={{textAlign: 'left', paddingTop: '.5em', paddingBottom: '.5em'}}>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <MusicNote />
                </IconButton>

                <Typography variant='h6' component='div' sx={{ flexGrow:1}}>
                    Deez-Notes
                </Typography>
                <SearchBox/>
                

                <Stack direction='row' spacing = {2}>
                    <Button color='inherit'>Message</Button>
                    <Button color='inherit'>Create</Button>
                    <Button color='inherit'>Favorites</Button>
                    <Button color='inherit'>Profile</Button>
                </Stack>

            </Toolbar>
        </AppBar>
    )
}


function SearchBox() {
    return (
        <>
            <div class="searchBar">
            <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" value="" />
            <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
            </button>
            </div>
        
        </>



    )


}

export default NavBar