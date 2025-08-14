import axios from 'axios'

const baseURL = '/api/notes'
// const baseURL = 'https://notes-api-express.onrender.com/api/notes'

let token = null

const setToken = (newtoken) => {
  token = `Bearer ${newtoken}`
}

const getAllNote = async () => {
  const { data } = await axios.get(baseURL)
  return data
}

const createNote = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const { data } = await axios.post(baseURL, newObject, config)
  return data
}

const updateNote = async (id, newObject) => {
  const { data } = await axios.put(`${baseURL}/${id}`, newObject)
  return data
}

export default {
  setToken,
  getAllNote,
  createNote,
  updateNote
}

// export const getAll = () => {
//   return axios.get(baseURL).then((res) => {
//     const { data } = res
//     return data
//   })
// }

// export const create = (newObject) => {
//   return axios.post(baseURL, newObject).then((res) => {
//     const { data } = res
//     return data
//   })
// }

// export const update = (id, newObject) => {
//   return axios.put(`${baseURL}/${id}`, newObject).then((res) => {
//     const { data } = res
//     return data
//   })
// }
