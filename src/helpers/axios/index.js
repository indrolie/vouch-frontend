import axios from 'axios'

const request = axios.create({
  baseURL: 'https://indrolie-vouch.herokuapp.com',
  timeout: 5000
})

export default request
