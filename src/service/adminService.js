import axios from 'axios'
import authHeader from './authHeader'

const API_URL = 'https://localhost:7043/api/admin/signal/add'
// const API_URL = 'https://minhnhat27.id.vn/api/admin/signal/add'
// const API_URL = 'https://fff3a8e6a10ca3.lhr.life/api/admin/signal/add'

const adminPost = async (data) => await axios.post(API_URL, data, { headers: authHeader() })

const adminService = {
  adminPost,
}
export default adminService
