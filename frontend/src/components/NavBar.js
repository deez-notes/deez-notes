import { React, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import { Search, Close } from "@material-ui/icons";
import TestData from '../TestData.json';
import css from '../styles/NavBar.module.scss';
import { useNavigate } from "react-router-dom"

import StringAvatar from './StringAvatar';

function NavBar() {

  const navigate = useNavigate();

  const HandleHomeNavigate = (event) => {
    event.preventDefault();
    navigate("/feed");
  }

  const HandleCreateNavigate = (event) => {
    event.preventDefault();
    navigate("/create");
  }

  const HandleProfileNavigate = (event) => {
    event.preventDefault();
    navigate("/profile");
  }

  const HandleLogOut = (event) => {
    event.preventDefault();
    localStorage.setItem('userData', null);
    navigate("/");
  }

  return (
    <AppBar position='sticky' className={css.appbar} sx={{ textAlign: 'center', paddingTop: '.25em', paddingBottom: '.25em', alignItems: 'center' }}>
      <Toolbar>
        <IconButton size='small' color='inherit' aria-label='logo'>
          <img src="dnlogo_w.png" height="42em" onClick={HandleHomeNavigate} />
        </IconButton>

        <div id={css.searchSpacing}>
          <SearchBar placeholder="Search..." data={TestData} />
        </div>

        <Stack direction='row' spacing={2}>
          <Button color='inherit' onClick={HandleCreateNavigate}>Create</Button>
          {/* <Button color='inherit'>Favorites</Button> */}
          <Button color='inherit' onClick={HandleProfileNavigate}>Profile</Button>
          <IconButton size='small' edge='start' color='inherit' aria-label='avatar' onClick={HandleProfileNavigate}>
            <StringAvatar name={localStorage.getItem('userData')} />
          </IconButton>
          <Button color='inherit' onClick={HandleLogOut}>Log out</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}


function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.username.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className={css.search}>
      <div className={css.searchInputs}>
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className={css.searchIcon}>
          {filteredData.length === 0 ? (
            <Search />
          ) : (
            <Close id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className={css.dataResult}>
          {filteredData.slice(0, 10).map((value, key) => {
            return (
              <a className={css.dataItem} href={value.link} target="_blank">
                <p>{value.username} </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}




export default NavBar