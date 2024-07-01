import axios from 'axios'
import authHeader from './authHeader'

// const API_URL = 'https://localhost:7043/api/user'
const API_URL = process.env.REACT_APP_BASE_URL + '/api/user'

const getAllUser = async () => await axios.get(API_URL + '/getAll', { headers: authHeader() })
const lockout = async (data) =>
  await axios.post(API_URL + '/lockout', data, { headers: authHeader() })
const unlock = async (data) =>
  await axios.post(API_URL + '/unlock', data, { headers: authHeader() })

const userService = {
  getAllUser,
  lockout,
  unlock,
}

export default userService
