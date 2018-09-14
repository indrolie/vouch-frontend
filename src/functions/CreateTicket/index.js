import request from '../../helpers/axios'

const createTicket = data => {
  return new Promise((resolve, reject) => {
    request
      .post('/tickets/create', data)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error.response)
      })
  })
    .then(response => {
      return (response)
    })
    .catch(response => {
      return (response)
    })
}

export default createTicket
