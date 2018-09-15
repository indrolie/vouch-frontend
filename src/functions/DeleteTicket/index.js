import request from '../../helpers/axios'

const deleteTicket = (URL) => {
  return new Promise((resolve, reject) => {
    request
      .delete(`/tickets${URL}`)
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

export default deleteTicket
