import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Search() {
  const [url, setUrl] = React.useState(' ');

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <Container fluid="true" sx={{marginTop: '20px'}}>
      <Paper
        component="form"
        sx={{p: '4px 4px', display: 'flex', alignItems: 'center'}}
      >
        <Select sx={{width: '30%'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={url}
          label="Select URL"
          onChange={handleChange}
        >
          <MenuItem value=' ' disabled><em>Select URL</em></MenuItem>
          <MenuItem value={10}>https://forums.elderscrollsonline.com/en/discussion/616021/pc-eu-hardware-update-august-2022</MenuItem>
          <MenuItem value={20}>https://forums.elderscrollsonline.com/en/discussion/394909/fashion-megathread</MenuItem>
          <MenuItem value={30}>https://forums.elderscrollsonline.com/en/discussion/595442/eso-pvp-update-updated-june-2022</MenuItem>
        </Select>
        <InputBase
          sx={{ml: 1, flex: 1}}
          placeholder="Enter Keyword"
          inputProps={{'aria-label': 'enter URL to crawl'}}
        />
        <Divider sx={{height: 28, m: 0.5}} orientation="vertical" />
        <IconButton color="primary" sx={{p: '10px'}} aria-label="directions">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Container>
  );
}