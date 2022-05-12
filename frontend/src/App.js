import React from "react";
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Create from './components/Create';
import Error from './components/Error';
import Profile from './components/Profile';
import Feed from './components/Feed';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StyledEngineProvider from "@mui/material/StyledEngineProvider"


function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
