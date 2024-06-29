import axios from 'axios'
import authHeader from './authHeader'

const API_URL = 'https://minhnhat27.id.vn/api/expense'
// const API_URL = 'https://0f09705989af6b.lhr.life/api/admin/upload'
// const API_URL = 'https://localhost:7043/api/expense'

const getExpense = async () => await axios.get(API_URL + `/getAll`, { headers: authHeader() })

const addExpense = async (data) =>
  await axios.post(API_URL + `/add`, data, { headers: authHeader() })

const deleteExpense = async (id, data) =>
  await axios.delete(API_URL + `/delete/${id}`, data, { headers: authHeader() })

const expenseService = {
  getExpense,
  addExpense,
  deleteExpense,
}

export default expenseService
