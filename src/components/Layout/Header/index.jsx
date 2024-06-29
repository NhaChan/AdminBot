import { Avatar, Flex, Modal, Tooltip } from 'antd'
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
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const user = authService.getCurrentUser()
    user ? setUsername(user.name) : setUsername('')
  }, [state.isAuthenticated])

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    dispatch(authActions.LOGOUT)
    authService.logout()
    navigate('/')
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Flex className="bg-white p-3 text-center justify-end sticky top-0 z-30 border-b h-20">
        <Flex className=" items-center space-x-3  text-blue-600">
          <div>
            {state.isAuthenticated ? (
              <span className="p-4 text-xl text-slate-700">Hello {username}!</span>
            ) : (
              <div></div>
            )}
            <Tooltip placement="bottomLeft" title="Logout">
              <Avatar
                onClick={showModal}
                icon={<LogoutOutlined />}
                style={{ backgroundColor: '#87d068' }}
              />
            </Tooltip>
          </div>
        </Flex>
      </Flex>
      <Modal title="Đăng xuất" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn có chắc muốn đăng xuất?</p>
      </Modal>
    </>
  )
}

export default Header
