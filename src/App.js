import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Header from "./components/Header";
import A700 from '@mui/material/colors/green';
import './App.css';
import Crawl from "./components/Crawl";
import Search from "./components/Search";

const theme = createTheme({
  palette: {
    primary: A700,
    default: 'white',
    mode: 'dark',
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Routes>
            <Route path="/search" element={<Search />} />
            <Route path="/" element={<Crawl />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
