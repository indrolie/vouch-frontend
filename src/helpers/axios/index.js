import axios from 'axios'

const request = axios.create({
  baseURL: 'https://vouch-backend-production.up.railway.app',
  timeout: 5000
})

export default request
