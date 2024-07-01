import axios from 'axios'
import authHeader from './authHeader'

// const API_URL = 'https://localhost:7043/api/botTrading'
const API_URL = 'https://minhnhat27.id.vn/api/botTrading'

const getAllBot = async () => await axios.get(API_URL + '/getAll', { headers: authHeader() })

const botService = {
  getAllBot,
}

export default botService
