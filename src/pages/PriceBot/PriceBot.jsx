import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Spin, Table, message, Select } from 'antd'
import pricebotService from '../../service/pricebotService'
import botService from '../../service/botService'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useLoading } from '../../App'

const { Option } = Select

const PriceBot = () => {
  const { setIsLoading } = useLoading()
  const [data, setData] = useState([])
  const [botOptions, setBotOptions] = useState([])
  const [form] = Form.useForm()
  const [loadingAdd, setLoadingAdd] = useState(false)
  const [loadingUpdated, setLoadingUpdated] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [month, setMonth] = useState('')
  const [botTradingId, setBotTradingId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const columns = (onEdit) => [
    {
      title: 'Số tháng của gói',
      dataIndex: 'month',
      sorter: (a, b) => a.month - b.month,
    },
    {
      title: 'Giá gói',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
    },
    {
      title: 'BotTradingId',
      dataIndex: 'botTradingId',
    },
    {
      title: 'Action',
      render: (_, record) => (
        <>
          <Button
            className="mr-2 border-0"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Button
            className="text-red-600 border-0"
            icon={<DeleteOutlined />}
            onClick={() => {
              setIsModalOpen(true)
              setMonth(record.month)
              setBotTradingId(record.botTradingId)
            }}
          />
        </>
      ),
    },
  ]

  useEffect(() => {
    setIsLoading(true)
    pricebotService
      .getPriceBot()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))

    botService
      .getAllBot()
      .then((res) => setBotOptions(res.data))
      .catch((err) => console.log(err))
  }, [setIsLoading, isEditing])

  const onEdit = (record) => {
    form.setFieldsValue(record)
    setIsEditing(true)
  }

  const handleUpdate = () => {
    setLoadingUpdated(true)
    const formData = form.getFieldsValue()
    pricebotService
      .updatePriceBot(formData.month, formData.botTradingId, formData)
      .then((res) => {
        console.log(res)
        message.success('Cập nhật thành công!')
        setIsEditing(false)
        // setIsEditing(!isEditing)

        form.resetFields()
      })
      .catch((err) => {
        console.log(err)
        message.error('Lỗi cập nhật.')
      })
      .finally(() => setLoadingUpdated(false))
  }

  const handleAdd = () => {
    setLoadingAdd(true)
    pricebotService
      .addPriceBot(form.getFieldsValue())
      .then((res) => {
        console.log(res)
        message.success('Thêm giá bot thành công.')
        setIsEditing(false)
        // setIsEditing(!isEditing)
        form.resetFields()
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingAdd(false))
  }

  const handleOk = () => {
    pricebotService
      .deletePrictbot(month, botTradingId)
      .then((res) => {
        const newData = data.filter(
          (item) => !(item.month === month && item.botTradingId === botTradingId),
        )
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
            columns={columns(onEdit)}
            dataSource={data}
            rowKey={(record) => record.botTradingId + record.month}
          />
        </div>
        <div className="h-fit bg-white rounded-lg drop-shadow">
          <div className="text-xl text-center p-4">Price Bot</div>
          <Form
            form={form}
            className="px-4 grid grid-cols-3 gap-2"
            initialValues={{ month: '', price: '', discount: '', botTradingId: '' }}
          >
            <label htmlFor="month">Gói:</label>
            <Form.Item name="month" className="col-span-2">
              <Input disabled={isEditing} />
            </Form.Item>
            <label htmlFor="price">Giá:</label>
            <Form.Item name="price" className="col-span-2">
              <Input />
            </Form.Item>
            <label htmlFor="discount">Giảm giá:</label>
            <Form.Item name="discount" className="col-span-2">
              <Input />
            </Form.Item>
            <label htmlFor="botTradingId">Bot ID:</label>
            <Form.Item name="botTradingId" className="col-span-2">
              <Select disabled={isEditing}>
                {botOptions.map((bot) => (
                  <Option key={bot.id} value={bot.id}>
                    {bot.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <div className="col-span-3 flex justify-center items-center space-x-2 mb-2">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                onClick={handleUpdate}
                disabled={!isEditing}
              >
                {loadingUpdated ? <Spin /> : 'Cập nhật'}
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                onClick={handleAdd}
                disabled={isEditing}
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

export default PriceBot
