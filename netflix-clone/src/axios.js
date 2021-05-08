import axios from 'axios'

//To make axios requests to movie database
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

//If it is a default import we don't need {} to call it, we can use any alias name
//There can be only one default export in a file
export default instance
