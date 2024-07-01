import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import botService from '../../service/botService'

const Bot = () => {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      //   sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'name',
      dataIndex: 'name',
      //   sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'InterestRate',
      dataIndex: 'interestRate',
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
    },
    {
      title: 'CommandNumber',
      dataIndex: 'commandNumber',
    },
    {
      title: 'WinRate',
      dataIndex: 'winRate',
    },
  ]

  const [data, setData] = useState([])

  useEffect(() => {
    botService
      .getAllBot ()
      .then((res) => { 
        console.log(res.data)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return <Table columns={columns} dataSource={data} rowKey={(record) => record.id} />
}

export default Bot
