import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.REACT_APP_BASE_URL + "/api/auth"

const login = async (data) => await axios.post(API_URL + '/login', data).then((res) => {
    const exp = 1 * 24 * 60 * 60 * 1000
    const in1Days = new Date(new Date().getTime() + exp)

    Cookies.set('user_data', JSON.stringify(res.data), { expires: in1Days })
    Cookies.set('access_token', res.data?.access_token, { expires: 5 * 60 * 1000 })
    return res
  })


const getCurrentUser = () => {
  const user = Cookies.get('user_data')
  return user ? JSON.parse(user) : user
}

const setUserToken = (access_token) =>
  Cookies.set('access_token', access_token, { expires: 5 * 60 * 1000 })

// const logout = async () => await axios.post(API_URL + '/logout')

const logout = async () => {
  // const data = { refresh_token: getCurrentUser()?.refresh_token }
  // await axios.post(API_URL + '/logout', data).then(() => {
  Cookies.remove('user_data')
  Cookies.remove('access_token')
  // })
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
