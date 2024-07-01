import { Avatar, Flex, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import { LogoutOutlined } from '@ant-design/icons'
import { useAuth } from '../../../App'
import authService from '../../../service/authService'
import authActions from '../../../service/authAction'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { state, dispatch } = useAuth()
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const user = authService.getCurrentUser()
    user ? setUsername(user.name) : setUsername('')
  }, [state.isAuthenticated])

  const handleLogout = () => {
    dispatch(authActions.LOGOUT)
    authService.logout()
    navigate('/')
  }

  return (
    <>
      <Flex className="bg-white p-3 text-center justify-end sticky top-0 z-30 border-b h-20">
        <Flex align="center" className="space-x-4 text-blue-600">
          {state.isAuthenticated && (
            <span className="text-xl text-slate-700">Hello {username}!</span>
          )}
          <Popconfirm title="Bạn có chắc muốn đăng xuất?" onConfirm={handleLogout}>
            <Avatar
              icon={<LogoutOutlined />}
              style={{ backgroundColor: '#87d068' }}
              className="cursor-pointer"
            />
          </Popconfirm>
        </Flex>
      </Flex>
    </>
  )
}

export default Header
