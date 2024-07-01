import axios from 'axios'
import authHeader from './authHeader'

// const API_URL = 'https://localhost:7043/api/user'
const API_URL = 'https://minhnhat27.id.vn/api/user'

const GetAllUser = async () => await axios.get(API_URL + '/getAll', { headers: authHeader() })

const userService = {
  GetAllUser,
}

export default userService
