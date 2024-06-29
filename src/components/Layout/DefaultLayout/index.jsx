import React from 'react'
import Sidebar from '../Sidebar'
import { Layout } from 'antd'
import Header from '../Header'
import Footer from '../Footer'
import { Content } from 'antd/es/layout/layout'

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Layout>
        <Sidebar />
        <Layout>
          <Header />
          <Content style={{ margin: '0 16px' }}>
            <div
              style={{
                padding: 24,
                // minHeight: 360,
              }}
              className="bg-white rounded-lg mt-5"
            >
              {children}
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  )
}

export default DefaultLayout
