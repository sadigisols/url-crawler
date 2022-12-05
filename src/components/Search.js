import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CrawlService from '../services/CrawlService';
import CommentService from '../services/CommentService';
import {List, ListItem, ListItemText} from '@mui/material';

export default function Search() {
  const [keyword, setKeyWord] = React.useState('');
  const [crawlId, setCrawlId] = React.useState(' ');
  const [message, setMessage] = React.useState('');
  const [crawls, setCrawls] = React.useState(null);
  const [comments, setComments] = React.useState(null);
  const [searchResult, setSearchResult] = React.useState(null);


  React.useEffect(() => {
    async function getCrawls() {
      if (crawls != null) {
        return;
      }
      let service = new CrawlService();
      let cs = await service.getCrawls();
      setCrawls(cs);
      setMessage("Select a URL to perform keywork search");
    }
    getCrawls();
  })

  const handleCrawlerChange = async (event) => {
    let crawlId = event.target.value;
    setCrawlId(crawlId)
    let service = new CommentService();
    let comments = await service.getComments(crawlId);
    setComments(comments);
    setSearchResult(comments);
    let count = comments.length;
    setMessage("Total comments found: " + count);
  };

  const handleSearch = () => {
    if (comments == null) {
      setMessage("Select a crawl URL before performing search");
    }
    if (keyword == null) {
      setSearchResult(comments);
      return;
    }
    let searchResult = [];
    comments.forEach(comment => {
      if (comment.comment.indexOf(keyword) !== -1) {
        let parts = comment.comment.split(new RegExp(`(${keyword})`, 'gi'));
        comment.commentinparts = parts;
        searchResult.push(comment)
      }
    });
    setSearchResult(searchResult);
    setMessage("Total comments found with the keyword " + keyword + ": " + searchResult.length);
  }

  return (
    <Container fluid="true" sx={{marginTop: '20px'}}>
      <Paper
        component="form"
        sx={{p: '4px 4px', display: 'flex', alignItems: 'center'}}
      >
        <Select sx={{width: '30%'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={crawlId}
          color="primary"
          onChange={handleCrawlerChange}
        >
          <MenuItem value=' ' disabled><em>Select URL</em></MenuItem>
          {crawls && crawls.map(crawl => {
            return (<MenuItem key={crawl.id} value={crawl.id}>{crawl.url}</MenuItem>)
          })}
        </Select>
        <InputBase
          sx={{ml: 1, flex: 1}}
          placeholder="Enter Keyword"
          inputProps={{'aria-label': 'enter URL to crawl'}}
          value={keyword}
          onChange={e => setKeyWord(e.target.value)}
        />
        <Divider sx={{height: 28, m: 0.5}} orientation="vertical" />
        <IconButton color="primary" sx={{p: '10px'}} aria-label="directions"
          onClick={() => handleSearch()}>
          <SearchIcon />
        </IconButton>
      </Paper>
      <Typography variant="h6" component="div" color='primary'>{message}</Typography>
      <List>
        {searchResult && searchResult.map(s => {
          return (
            <ListItem alignItems='flex-start' key={s.id}>
              <ListItemText primary={s.title} secondary={
                <React.Fragment>
                  <Typography variant="caption" color="primary" sx={{display: 'inline'}}>{new Date(s.comment_time).toLocaleString()} </Typography>
                  {s.commentinparts ? s.commentinparts.map((part, i) => {
                    return (
                      <span key={i} className={part === keyword ? "highlightedText" : ""}>
                        {part}
                      </span>
                    )
                  }) : s.comment}
                  <br />
                  <a href={s.url} rel="noreferrer" target="_blank">{s.url}</a>
                </React.Fragment>} />
            </ListItem>
          )
        })}
      </List>
    </Container>
  );
}