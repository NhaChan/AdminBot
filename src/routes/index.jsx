import { Fragment } from 'react'
import DefaultLayout from '../components/Layout/DefaultLayout'
import { Navigate, Route } from 'react-router-dom'
import {
  PieChartOutlined,
  UserOutlined,
  FileZipOutlined,
  MoneyCollectOutlined,
  QqOutlined,
} from '@ant-design/icons'
import Admin from '../pages/Admin'
import Users from '../pages/Users'
import File from '../pages/File'
import Profit from '../pages/Profit'
import PriceBot from '../pages/PriceBot'
import Login from '../pages/Login'
import Expense from '../pages/Expense'
import Bot from '../pages/Bot'

export const navigateItems = [
  { key: '/home', icon: <PieChartOutlined />, label: 'Home' },
  { key: '/users', icon: <UserOutlined />, label: 'Users' },
  { key: '/price-bot', icon: <QqOutlined />, label: 'Price Bot' },
  { key: '/expenes', icon: <MoneyCollectOutlined />, label: 'Chi tiêu' },
  { key: '/bot', icon: <MoneyCollectOutlined />, label: 'Bot' },
  { key: '/profit', icon: <MoneyCollectOutlined />, label: 'Profit' },
  { key: '/file', icon: <FileZipOutlined />, label: 'File' },
]

const publicRoutes = [{ path: '/', component: Login, layout: null }]

export const privateRoutes = [
  { path: '/home', component: Admin },
  { path: '/users', component: Users },
  { path: '/price-bot', component: PriceBot },
  { path: '/expenes', component: Expense },
  { path: '/bot', component: Bot },
  { path: '/profit', component: Profit },
  { path: '/file', component: File },
]

export const generatePublicRoutes = (isAuthenticated) => {
  return publicRoutes.map((route, index) => {
    const Page = route.component
    let Layout = DefaultLayout

    if (route.layout) {
      Layout = route.layout
    } else if (route.layout === null) {
      Layout = Fragment
    }
    if (isAuthenticated && route.path === '/') {
      return <Route key={index} path={route.path} element={<Navigate to="/home" />} />
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

export const generatePrivateRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return privateRoutes.map((route, index) => {
      const Page = route.component
      let Layout = DefaultLayout

      if (route.layout) {
        Layout = route.layout
      } else if (route.layout === null) {
        Layout = Fragment
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
  } else {
    return privateRoutes.map((route, index) => (
      <Route key={index} path={route.path} element={<Navigate to="/" />} />
    ))
  }
}
