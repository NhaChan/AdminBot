import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { generatePrivateRoutes, generatePublicRoutes } from './routes'
import NotFound from './components/NotFound'
import { createContext, useContext, useEffect, useState, useReducer } from 'react'
import { initialState, reducer } from './service/authReducer'
import authService from './service/authService'
import { Spin } from 'antd'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

const LoadingContext = createContext()
export const useLoading = () => useContext(LoadingContext)

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (state.isAuthenticated) {
      const user = authService.getCurrentUser()
      const data = { refresh_token: user.refresh_token }
      authService.refreshToken(data).then((res) => authService.setUserToken(res.data?.access_token))
      setInterval(
        () =>
          authService
            .refreshToken(data)
            .then((res) => authService.setUserToken(res.data?.access_token)),
        300000,
      )
    }
  }, [state.isAuthenticated])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <AuthContext.Provider value={{ state, dispatch }}>
        <Spin spinning={isLoading} fullscreen />
        <Router>
          <Routes>
            {generatePublicRoutes(state.isAuthenticated)}
            {state.roles?.includes("Admin") && generatePrivateRoutes(state.isAuthenticated)}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </LoadingContext.Provider>
  )
}

export default App
