import request from '../../helpers/axios'

const getTicketLogs = (URL) => {
  return new Promise((resolve, reject) => {
    request
      .get(`/logs${URL}`)
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

export default getTicketLogs
