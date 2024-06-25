import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Spin, Upload, message } from 'antd'
import fileService from '../../service/fileService'

const File = () => {
  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = (info) => {
    let newFileList = [...info.fileList]

    newFileList = newFileList.slice(-1)

    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url
      }
      return file
    })

    setFileList(newFileList)
  }

  const handleFileSubmit = () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('file', fileList[0].originFileObj)
    fileService
      .uploadFile(formData)
      .then(() => {
        message.success('Upload thành công.')
        setFileList([])
      })
      .catch((err) => message.error(err.message))
      .finally(() => setLoading(false))
  }

  return (
    <div className="space-y-2">
      <Form onFinish={handleFileSubmit} disabled={loading}>
        <Form.Item
          name="file"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn file',
            },
          ]}
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            multiple={false}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Button htmlType="submit" type="primary">
          {loading ? <Spin /> : 'Xác nhận'}
        </Button>
      </Form>
    </div>
  )
}

export default File
