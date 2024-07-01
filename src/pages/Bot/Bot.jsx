import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Spin, Table, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useLoading } from '../../App'
import botService from '../../service/botService'

const columns = (onEdit, setBotId, setIsModalOpen) => [
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
  {
    title: 'Action',
    render: (_, record) => (
      <>
        <Button
          className="mr-2 border-0"
          icon={<EditOutlined />}
          onClick={() => {
            onEdit(record)
            setBotId(record.id)
          }}
        />
        <Button
          className="text-red-600 border-0"
          icon={<DeleteOutlined />}
          onClick={() => {
            setIsModalOpen(true)
            setBotId(record.id)
          }}
        />
      </>
    ),
  },
]

const Bot = () => {
  const { setIsLoading } = useLoading()
  const [data, setData] = useState([])
  const [form] = Form.useForm()
  const [loadingupdated, setLoadingupdated] = useState(false)
  const [loadingAdd, setLoadingAdd] = useState(false)
  const [editingRecord, setEditingRecord] = useState(false)
  const [botId, setBotId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    botService
      .getAllBot()
      .then((res) => {
        // console.log(res.data)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }, [setIsLoading, editingRecord])

  const onEdit = (record) => {
    form.setFieldsValue(record)
  }

  const handleUpdate = () => {
    setLoadingupdated(true)
    console.log(form.getFieldsValue())
    const formData = form.getFieldsValue()
    botService
      .updateBot(botId, formData)
      .then((res) => {
        console.log(res)
        message.success('Cập nhật thành công!')
        setEditingRecord(!editingRecord)
        form.resetFields()
        setBotId('')
      })
      .catch((err) => {
        console.log(err)
        message.error('Lỗi cập nhật.')
      })
      .finally(() => setLoadingupdated(false))
  }

  const handleAdd = () => {
    setLoadingAdd(true)
    botService
      .addBot(form.getFieldsValue())
      .then((res) => {
        console.log(res)
        message.success('Thêm bot thành công.')
        setEditingRecord(!editingRecord)
        form.resetFields()
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingAdd(false))
  }

  const handleOk = () => {
    botService
      .deleteBot(botId)
      .then((res) => {
        // console.log(res)
        const newData = data.filter((item) => !(item.id === botId))
        setData(newData)
        message.success('Xóa thành công.')
      })
      .catch((err) => message.error('Xóa lỗi'))
      .finally(() => setIsModalOpen(false))
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="h-fit md:col-span-2 bg-white rounded-lg drop-shadow">
          <Table
            className="overflow-x-auto"
            columns={columns(onEdit, setBotId, setIsModalOpen)}
            dataSource={data}
            rowKey={(record) => record.id}
          />
        </div>
        <div className="h-fit bg-white rounded-lg drop-shadow">
          <div className="text-xl text-center p-4">Bot</div>
          <Form form={form} className="px-4 grid grid-cols-3 gap-2">
            <label htmlFor="name">Name Bot:</label>
            <Form.Item name="name" className="col-span-2">
              <Input />
            </Form.Item>
            <label htmlFor="interestRate">InterestRate:</label>
            <Form.Item name="interestRate" className="col-span-2">
              <Input />
            </Form.Item>
            <label htmlFor="profit">Profit:</label>
            <Form.Item name="profit" className="col-span-2">
              <Input />
            </Form.Item>
            <label htmlFor="commandNumber">CommandNumber:</label>
            <Form.Item name="commandNumber" className="col-span-2">
              <Input />
            </Form.Item>
            <label htmlFor="winRate">WinRate:</label>
            <Form.Item name="winRate" className="col-span-2">
              <Input />
            </Form.Item>
            <div className="col-span-3 flex justify-center items-center space-x-2 mb-2">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className=""
                onClick={handleUpdate}
              >
                {loadingupdated ? <Spin /> : 'Cập nhật'}
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className=" "
                onClick={handleAdd}
              >
                {loadingAdd ? <Spin /> : 'Thêm'}
              </Button>
            </div>
          </Form>
        </div>
        <Modal title="Xóa gói" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Bạn có chắc chắn xóa gói của Bot này?</p>
        </Modal>
      </div>
    </>
  )
}

export default Bot
