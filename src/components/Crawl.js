import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DirectionsIcon from '@mui/icons-material/Directions';
import {Container} from '@mui/material';

export default function Crawl() {
  return (
    <Container fluid="true" sx={{marginTop: '20px'}}>
      <Paper
        component="form"
        sx={{p: '4px 4px', display: 'flex', alignItems: 'center'}}
      >
        <InputBase
          sx={{ml: 1, flex: 1}}
          placeholder="Enter URL"
          inputProps={{'aria-label': 'enter URL'}}
        />
        <Divider sx={{height: 28, m: 0.5}} orientation="vertical" />
        <IconButton color="primary" sx={{p: '10px'}} aria-label="directions">
          <DirectionsIcon />
        </IconButton>
      </Paper>
    </Container>
  );
}
