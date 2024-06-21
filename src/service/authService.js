import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = 'https://localhost:7043/api/auth'

const login = async (data) =>
  await axios.post(API_URL + '/login', data).then((res) => {
    const exp = 7 * 24 * 60 * 60 * 1000
    const in7Days = new Date(new Date().getTime() + exp)

    Cookies.set('user_data', JSON.stringify(res.data), { expires: in7Days })
    return res
  })

const getCurrentUser = () => {
  const user = Cookies.get('user_data')
  return user ? JSON.parse(user) : user
}

const logout = () => Cookies.remove('user_data')

const register = async (data) => await axios.post(API_URL + '/register', data)

const sendPassword = async (email) => await axios.post(API_URL + '/send-code', email)

const confirmCode = async (data) => await axios.post(API_URL + '/confirm-code', data)

const resetPassword = async (data) => await axios.post(API_URL + '/reset-password', data)

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  sendPassword,
  confirmCode,
  resetPassword,
}
export default authService
