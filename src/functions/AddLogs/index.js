import request from '../../helpers/axios'

const addLogs = data => {
  return new Promise((resolve, reject) => {
    request
      .post('/logs/add', data)
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

export default addLogs
