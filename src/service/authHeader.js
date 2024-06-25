import authService from './authService'

const authHeader = () => {
  const user = authService.getCurrentUser()
  if (user && user.access_token) {
    return {
      Authorization: 'Bearer ' + user.access_token,
    }
  } else return {}
}

export default authHeader
