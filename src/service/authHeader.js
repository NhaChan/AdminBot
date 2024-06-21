import authService from './authService'

const authHeader = () => {
  const user = authService.getCurrentUser()
  if (user && user.jwt) {
    return {
      Authorization: 'Bearer ' + user.jwt,
    }
  } else return {}
}

export default authHeader
