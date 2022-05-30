import React from "react";
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Create from './components/Create';
import Error from './components/Error';
import Profile from './components/Profile';
import Feed from './components/Feed';
import Account from './components/Account'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const b2 = "'Baloo 2'";
const ns = "Noto Sans"
const theme = createTheme({
  typography: {
    h1: { fontFamily: b2 },
    h2: { fontFamily: b2 },
    h3: { fontFamily: b2 },
    h4: { fontFamily: b2 },
    h5: { fontFamily: b2 },
    h6: { fontFamily: b2, fontSize: '1.1rem', lineHeight: 1.5, },
    subtitle1: { fontFamily: ns },
    subtitle2: { fontFamily: ns },
    body1: { fontFamily: ns },
    body2: { fontFamily: ns },
    button: { fontFamily: b2 },
    caption: { fontFamily: ns },
    overline: { fontFamily: ns },
  },
});

function App() {
  return (

    <div className="App">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/profile/:userName" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
