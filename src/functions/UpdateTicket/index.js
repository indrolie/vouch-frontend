import request from '../../helpers/axios'

const updateTicket = (URL, data) => {
  return new Promise((resolve, reject) => {
    request
      .put(`/tickets${URL}`, data)
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

export default updateTicket
