import axios from 'axios'
import Cookies from 'js-cookie'

// const API_URL = 'https://localhost:7043/api/auth'
const API_URL = 'https://minhnhat27.id.vn/api/auth'
// const API_URL = 'https://fff3a8e6a10ca3.lhr.life/api/auth'

const login = async (data) =>
  await axios.post(API_URL + '/login', data).then((res) => {
    const exp = 7 * 24 * 60 * 60 * 1000
    const in7Days = new Date(new Date().getTime() + exp)

    Cookies.set('user_data', JSON.stringify(res.data), { expires: in7Days })
    Cookies.set('access_token', res.data?.access_token, { expires: 5 * 60 * 1000 })
    return res
  })

const getCurrentUser = () => {
  const user = Cookies.get('user_data')
  return user ? JSON.parse(user) : user
}

const setUserToken = (access_token) =>
  Cookies.set('access_token', access_token, { expires: 5 * 60 * 1000 })

const logout = () => {
  Cookies.remove('user_data')
  Cookies.remove('access_token')
}

const refreshToken = async (data) => await axios.post(API_URL + '/refresh-token', data)

const authService = {
  login,
  logout,
  getCurrentUser,
  refreshToken,
  setUserToken,
}
export default authService
