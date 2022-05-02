import './App.css';
import Home from './components/Home'
import StyledEngineProvider from "@mui/material/StyledEngineProvider"

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <Home />
      </StyledEngineProvider>
    </div>
  );
}

export default App;
