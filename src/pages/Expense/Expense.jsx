import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Spin, Table, message } from 'antd'
import expenseService from '../../service/expenseService'
import { DeleteOutlined } from '@ant-design/icons'

const Expense = () => {
  const [data, setData] = useState([])
  const [form] = Form.useForm()
  const [loadingAdd, setLoadingAdd] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(false)
  const [isID, setIsID] = useState()

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.fullname.length - b.fullname.length,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.userName - b.userName,
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    // {
    //   title: 'Action',
    //   render: (_, record) => (
    //     <Button
    //       className="text-red-600 border-0"
    //       icon={<DeleteOutlined />}
    //       onClick={() => {
    //         setIsModalOpen(true)
    //         setIsID(record.id)
    //       }}
    //     />
    //   ),
    // },
  ]

  useEffect(() => {
    expenseService
      .getExpense()
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleAdd = () => {
    setLoadingAdd(true)
    expenseService
      .addExpense(form.getFieldsValue())
      .then((res) => {
        console.log(res)
        message.success('Thêm giá bot thành công.')
        setEditingRecord(!editingRecord)
        form.resetFields()
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingAdd(false))
  }

  const handleOk = () => {}

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // return <Table columns={columns} dataSource={data} rowKey={(record) => record.id} />
  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <div className="h-fit md:col-span-2 bg-white rounded-lg drop-shadow">
          <Table
            className="overflow-x-auto"
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
          />
        </div>
        <div className="h-fit bg-white rounded-lg drop-shadow">
          <div className="text-xl text-center p-4">Price Bot</div>
          <Form form={form} className="px-4 grid grid-cols-3 gap-2">
            <label htmlFor="name">Name:</label>
            <Form.Item
              name="name"
              className="col-span-2"
              rules={[
                {
                  required: true,
                  message: 'Bắt buộc.',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <label htmlFor="price">Price:</label>
            <Form.Item
              name="price"
              className="col-span-2"
              rules={[
                {
                  required: true,
                  message: 'Bắt buộc.',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <label htmlFor="date">Date:</label>
            <Form.Item
              name="date"
              className="col-span-2"
              rules={[
                {
                  required: true,
                  message: 'Bắt buộc.',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <label htmlFor="name">Description:</label>
            <Form.Item
              name="description"
              className="col-span-2"
              rules={[
                {
                  required: true,
                  message: 'Bắt buộc.',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <div className="col-span-3 flex justify-center items-center space-x-2 mb-2">
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
      </div>
      <Modal title="Xóa gói" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn có chắc chắn xóa gói của Bot này?</p>
      </Modal>
    </>
  )
}

export default Expense
