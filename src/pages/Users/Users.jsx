import React, { useEffect, useState } from 'react'
import { Table, Switch } from 'antd'
import userService from '../../service/userService'
import { useMessage } from '../../App'

const columns = (handleLockOut) => [
  {
    title: 'Name',
    dataIndex: 'fullname',
    sorter: (a, b) => a.fullname.localeCompare(b),
  },
  {
    title: 'PhoneNumber',
    dataIndex: 'userName',
    sorter: (a, b) => a.userName - b.userName,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Lockout',
    dataIndex: 'lockoutEnable',
    render: (value, record) => (
      <Switch onClick={(value) => handleLockOut(value, record.userId)} defaultValue={value} />
    ),
  },
]

const Users = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const { antMessage } = useMessage()

  useEffect(() => {
    setIsLoading(true)
    userService
      .getAllUser()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  const handleLockOut = (isChecked, userId) => {
    const data = { userId: userId }
    try {
      if (isChecked) {
        userService.lockout(data).then(() => antMessage.success('Đã khóa tài khoản'))
      } else {
        userService.unlock(data).then(() => antMessage.success('Đã mở khóa tài khoản'))
      }
    } catch (err) {
      antMessage.error(err.message)
    }
  }

  return (
    <Table
      loading={isLoading}
      columns={columns(handleLockOut)}
      dataSource={data}
      className="overflow-x-auto"
      rowKey={(record) => record.userId}
    />
  )
}

export default Users
