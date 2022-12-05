export default class CommentService {
  constructor() {
    this.baseUrl = 'https://url-crawler-api.azurewebsites.net'
  }

  async getComments(id) {
    const response = await fetch(this.baseUrl + "/search/" + id)
    const result = await response.json();

    return result;
  }
}