import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import userBotService from '../../service/userBotService'

const UserBot = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: 'BotTrading ID',
      dataIndex: 'botTradingId',
      sorter: (a, b) => a.botTradingId - b.botTradingId,
    },
  ]

  useEffect(() => {
    setIsLoading(true)
    userBotService
      .getAllUserBot()
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={data}
      className="overflow-x-auto"
      rowKey={(record) => record.userId + record.botTradingId}
    />
  )
}

export default UserBot
