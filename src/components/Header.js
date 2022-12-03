import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Header() {
  return (
    <Box sx={{display: 'flex'}}>
      <AppBar position="static" component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" color='primary'>
            URL Crawler
          </Typography>
          <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
            <Button color="primary" href="/">Crawl</Button>
            <Button color="primary" href="/search">Search</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;