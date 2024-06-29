import { Button, ConfigProvider, Form, Input, Modal, Space, Spin, message } from 'antd'
import React, { useState } from 'react'
import adminService from '../../service/adminService'

const Admin = () => {
  const [form] = Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [currentAction, setCurrentAction] = useState('')
  const [loading, setLoading] = useState(false)

  const showModal = () => {
    setFormData(form.getFieldsValue())
    setIsModalOpen(true)
  }

  const handleOk = () => {
    // const data = {
    //   ...form.getFieldsValue(),
    //   stopOrderValue: form.getFieldValue('stopOrderValue') || 0,
    //   orderNumber: form.getFieldValue('orderNumber') || 0,
    //   price: form.getFieldValue('price') || 0,
    //   status: currentAction,
    // }
    let data = { status: currentAction }
    Object.keys(form.getFieldsValue()).forEach(
      (key) => (data = { ...data, [key]: form.getFieldValue(key) || 0 }),
    )

    setLoading(true)
    adminService
      .adminPost(data)
      .then((res) => {
        // console.log(res)
        message.success('Gửi lệnh thành công.')
        // form.resetFields()
      })
      .catch((err) => {
        console.log(err)
        message.error('Gửi lệnh thất bại.')
      })

      .finally(() => {
        setIsModalOpen(false)
        setLoading(false)
      })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleActionClick = (action) => {
    setCurrentAction(action)
  }

  return (
    <>
      <div className="text-center p-5 mb-5 text-2xl">Đặt lệnh</div>
      <Form form={form} onFinish={showModal} initialValues={{ stopOrder: 'SOL' }}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 px-2">
          <Form.Item
            name="price"
            className="md:col-start-2"
            rules={[
              {
                required: true,
                message: 'Giá đặt được yêu cầu!',
              },
              {
                pattern: /^\d+(\.\d{1})?$/,
                message: 'Giá đặt chỉ có 1 chữ số thập phân!',
              },
            ]}
          >
            <Input size="large" placeholder="Giá đặt" />
          </Form.Item>
          <Form.Item
            name="orderNumber"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số hợp đồng!',
              },
            ]}
          >
            <Input size="large" placeholder="Số hợp đồng" />
          </Form.Item>
          <Space.Compact className="w-full">
            <Form.Item
              name="stopOrderValue"
              className="flex-1"
              rules={[
                {
                  pattern: /^\d+(\.\d{1})?$/,
                  message: 'Là số nguyên hoặc chỉ có 1 chữ số thập phân',
                },
              ]}
            >
              <Input size="large" placeholder="Stop Order" />
            </Form.Item>
          </Space.Compact>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            htmlType="submit"
            type="primary"
            danger
            size="large"
            className="mx-2"
            onClick={() => handleActionClick('SHORT')}
          >
            SHORT
          </Button>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: '#198754',
                  colorPrimaryHover: '#75b798',
                  colorPrimaryActive: '#198754',
                },
              },
            }}
          >
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="mx-2"
              onClick={() => handleActionClick('LONG')}
            >
              LONG
            </Button>
          </ConfigProvider>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: '#ffc107',
                  colorPrimaryHover: '#ffda6a',
                  colorPrimaryActive: '#ffc107',
                },
              },
            }}
          >
            <Button
              type="primary"
              size="large"
              className="mx-2"
              onClick={() => {
                handleActionClick('CANCEL_ALL')
                showModal()
              }}
            >
              Hủy tất cả
            </Button>
          </ConfigProvider>
          <Button
            type="primary"
            size="large"
            className="mx-2"
            onClick={() => {
              handleActionClick('CANCEL_VITHE')
              showModal()
            }}
          >
            Hủy vị thế
          </Button>
        </div>
      </Form>
      <Modal
        title={
          currentAction === 'CANCEL_ALL'
            ? 'Xác nhận hủy tất cả'
            : currentAction === 'CALL_VITHE'
            ? 'Xác nhận hủy vị thế'
            : 'Thông tin đặt lệnh'
        }
        open={isModalOpen}
        onOk={handleOk}
        okText={loading ? <Spin /> : 'OK'}
        okButtonProps={{ disabled: loading }}
        onCancel={handleCancel}
      >
        {currentAction === 'CANCEL_ALL' ? (
          <p>Bạn có chắc chắn muốn hủy tất cả không?</p>
        ) : currentAction === 'CALL_VITHE' ? (
          <p>Bạn có chắc chắn muốn hủy vị thế không?</p>
        ) : (
          <>
            <p>Giá đặt: {formData.price}</p>
            <p>Số hợp đồng: {formData.orderNumber}</p>
            <p>StopOder: {formData.stopOrderValue}</p>
            <p className="text-red-700">
              Lệnh đặt: <strong>{currentAction}</strong>
            </p>
          </>
        )}
      </Modal>
    </>
  )
}

export default Admin
