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
    .then(response => {
      return (response)
    })
    .catch(response => {
      return (response)
    })
}

export default showTickets
