import { React, useState} from 'react';
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material";
import { MusicNote, Search, Close } from "@material-ui/icons";
import TestData from '../TestData.json';
import css from '../styles/NavBar.module.scss';


function NavBar() {
    return (
        <AppBar position='static' style={{textAlign: 'left', paddingTop: '.5em', paddingBottom: '.5em'}}>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <MusicNote />
                </IconButton>

                <Typography variant='h6' component='div'>
                    Deez-Notes
                </Typography>
                
                <div id={css.searchSpacing}>
                    <SearchBar placeholder="Search..." data={TestData}/>
                </div>
                
                

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