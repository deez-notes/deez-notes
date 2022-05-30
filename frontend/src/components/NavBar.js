import { React, useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import { Search, Close } from "@material-ui/icons";
import TestData from '../TestData.json';
import css from '../styles/NavBar.module.scss';
import { useNavigate } from "react-router-dom"
import axios from "axios";
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
    navigate("/profile/" + localStorage.getItem('userData'));
  }

  const HandleLogOut = (event) => {
    event.preventDefault();
    localStorage.setItem('userData', null);
    navigate("/");
  }
  const [theData, changeTheData ] = useState([]);
  const [once, setOnce ] = useState(true);
  
  if (once)
  {
    axios.get("http://localhost:8000/users/"). then(res => {
    changeTheData(res.data);
    setOnce(false);
  })
  }

  
  

  
  return (
    <AppBar position='sticky' sx={{ textAlign: 'center', paddingTop: '.25em', paddingBottom: '.25em', alignItems: 'center' }}>
      <Toolbar>
        <IconButton size='small' color='inherit' aria-label='logo'>
          <img src="dnlogo_w.png" height="42em" onClick={HandleHomeNavigate} />
        </IconButton>

        <div id={css.searchSpacing}>
          <SearchBar placeholder="Search..." data={theData} /> 
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
  console.log(data);
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
              <a className={css.dataItem} href={String("http://localhost:3000/profile/") + value.username} target="_blank">
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