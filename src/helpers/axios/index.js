import axios from 'axios'

const request = axios.create({
  baseURL: 'vouch-backend-production.up.railway.app:8080',
  timeout: 5000
})

export default request
