import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DirectionsIcon from '@mui/icons-material/Directions';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Button, Container, Grid} from '@mui/material';
import CrawlService from '../services/CrawlService';

export default function Crawl() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [crawlResult, setCrawlResult] = useState(null);

  async function startCrawl() {
    if (url === '') {
      setMessage("Enter a URL to start the crawler");
      return;
    }

    setMessage("Checking for existing crawl result");
    let service = new CrawlService();
    let result = await service.getCrawlResult(url);
    if (result == null) {
      setMessage("Starting new crawl");
      let response = await service.addCrawlResult(url);
      if (response.success) {
        setCrawlResult({
          url,
          last_updated: new Date(),
          comment_count: 0,
          link_count: 0
        });
      }
      setMessage("Crawl started successfully, please refresh to check the status of the crawler");
    }
    else {
      setMessage("found existing crawl");
      setCrawlResult(result);
    }
  }

  function reset() {
    setMessage('');
    setCrawlResult(null);
    setUrl('');
  }

  async function refresh() {
    setMessage("Refreshing crawl data");
    let service = new CrawlService();
    let result = await service.getCrawlResult(url);
    setCrawlResult(result);
    setMessage("");
  }

  let margin = crawlResult ? '20px' : '25%';
  return (
    <Container fluid="true" sx={{marginTop: margin}}>
      <Paper
        component="form"
        sx={{p: '4px 4px', display: 'flex', alignItems: 'center'}}
      >
        <InputBase
          sx={{ml: 1, flex: 1}}
          placeholder="Enter URL"
          inputProps={{'aria-label': 'enter URL'}}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Divider sx={{height: 28, m: 0.5}} orientation="vertical" />
        <IconButton color="primary" sx={{p: '10px'}} aria-label="directions"
          onClick={() => startCrawl()}>
          <DirectionsIcon />
        </IconButton>
      </Paper>
      <Typography variant="h6" component="div" color='primary'>{message}</Typography>
      {crawlResult &&
        <div>
          <Typography sx={{marginTop: '20px'}} variant="h6" color="primary">URL: {crawlResult.url}</Typography>
          <Grid container sx={{marginTop: '20px'}} spacing={2}>
            <Grid item md={6} xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h4" color="primary">{crawlResult.status}</Typography>
                  <Typography variant="caption">Status</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h4" color="primary">{new Date(crawlResult.last_updated).toLocaleString()}</Typography>
                  <Typography variant="caption">Last Updated</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h1" color="primary">{crawlResult.link_count}</Typography>
                  <Typography variant="caption">Links Found</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h1" color="primary">{crawlResult.comment_count}</Typography>
                  <Typography variant="caption">Total Comments</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <div style={{marginTop: '20px'}}>
            <Button color='primary' onClick={() => reset()}>Reset</Button>
            <Button color='primary' onClick={() => refresh()}>Refresh</Button>
            <Button color='primary' disabled>Recrawl</Button>
          </div>
        </div>
      }
    </Container>
  );
}
