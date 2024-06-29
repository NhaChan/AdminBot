import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import userService from '../../service/userService'

const columns = [
  {
    title: 'Name',
    dataIndex: 'fullname',
    sorter: (a, b) => a.fullname.length - b.fullname.length,
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
]

const Users = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    userService
      .GetAllUser()
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return <Table columns={columns} dataSource={data} rowKey={(record) => record.email} />
}

export default Users
