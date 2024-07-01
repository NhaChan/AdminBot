import React, { useEffect, useState } from 'react'
import { Table, Switch } from 'antd'
import userService from '../../service/userService'

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

  useEffect(() => {
    setIsLoading(true)
    userService
      .getAllUser()
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleLockOut = (isChecked, userId) => {
    const data = { userId: userId }
    isChecked ? userService.lockout(data) : userService.unlock(data)
  }

  return (
    <Table
      loading={isLoading}
      columns={columns(handleLockOut)}
      dataSource={data}
      rowKey={(record) => record.email}
    />
  )
}

export default Users
