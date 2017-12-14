import {get} from 'lodash'
const NYTIMES_API_KEY = '8f26c796076748e0bf0344f3314a5147'

export default class NYTimesService {
  constructor () {
    this.url = `http://api.nytimes.com/svc/books/v3/lists/hardcover-fiction?response-format=json&api-key=${NYTIMES_API_KEY}`
  }

  invokeApi (userInput) {
    return fetch(this.url)
      .then((response) => response.json())
      .then((rjson) => rjson.results.books)
      .catch((error) => error)
  }
}
