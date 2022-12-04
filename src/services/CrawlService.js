export default class CrawlService {
  constructor() {
    this.baseUrl = 'https://url-crawler-api.azurewebsites.net'
  }
  async getCrawlResult(url) {
    const response = await fetch(this.baseUrl + "/crawl?url=" + url)
    const result = await response.json();

    return result;
  }

  async addCrawlResult(url) {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({url})
    };
    const response = await fetch(this.baseUrl + "/crawl", requestOptions)
    const result = await response.json();

    return result;
  }
}