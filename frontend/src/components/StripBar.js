import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import logo from "../dnlogo_w.png"
import css from '../styles/NavBar.module.scss';

export default function StripBar() {
    return (
        <AppBar position='sticky' className={css.appbar} sx={{ textAlign: 'center', paddingTop: '.25em', paddingBottom: '.25em', alignItems: 'center' }}>
        <Toolbar>
          <IconButton size='small' color='inherit' aria-label='logo' href="http://localhost:3000/">
            <img src={logo} height="42em"  />
          </IconButton>
        </Toolbar>
        </AppBar>
    )
}