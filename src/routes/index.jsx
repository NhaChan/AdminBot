import { Fragment } from 'react'
import DefaultLayout from '../components/Layout/DefaultLayout'
import { Navigate, Route } from 'react-router-dom'
import {
  PieChartOutlined,
  UserOutlined
} from '@ant-design/icons'
import Admin from '../pages/Admin'
import Users from '../pages/Users'

export const navigateItems = [
  { key: '/home', icon: <PieChartOutlined />, label: 'Home' },
  { key: '/users', icon: <UserOutlined />, label: 'Users' },
]

export const publicRoutes = [
  // { path: '/', component: Login, Layout: null },
  { path: '/home', component: Admin },
  { path: '/users', component: Users },
]

const generateRoutes = (isAuthenticated) => {
  if(isAuthenticated){
    return publicRoutes.map((route, index) => {
      const Page = route.component
      let Layout = DefaultLayout
  
      if (route.Layout) {
        Layout = route.Layout
      } else if (route.Layout === null) {
        Layout = Fragment
      }
      
      if(isAuthenticated && route.path === '/') {
        return <Route key={index} path={route.path} element={<Navigate to='/home'/>} />
      }
  
      return (
        <Route
          key={index}
          path={route.path}
          element={
            <Layout>
              <Page />
            </Layout>
          }
        />
      )
    })
  }
  else {
    return publicRoutes.map((route, index) => <Route key={index} path={route.path} element={<Navigate to='/'/>} />
    )
  }
}

export default generateRoutes
