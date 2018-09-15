import request from '../../helpers/axios'

const showTickets = (URL) => {
  return new Promise((resolve, reject) => {
    request
      .get(`/tickets${URL}`)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error.response)
      })
  })
}

export default showTickets
