import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Header from "./components/Header";
import A700 from '@mui/material/colors/green';
import './App.css';
import Crawl from "./components/Crawl";
import Search from "./components/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Crawl />,
  },
  {
    path: "/search",
    element: <Search />,
  },
]);

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
        <Header />
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
