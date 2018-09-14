import request from '../../helpers/axios'

const showTickets = () => {
  return new Promise((resolve, reject) => {
    request
      .get('/tickets')
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

export default showTickets
