import React,{useEffect} from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import TopHeader from '../../components/TopHeader/index'
import SideMenu from '../../components/SideMenu/index'
//css
import './index.scss'
//antd
import { Layout } from 'antd'
import NewsRouter from '../../router/NewsRouter/index'

const { Content } = Layout;


export default function NewsSandBox() {
  NProgress.start()
  useEffect(()=>{
    NProgress.done()
})
  return (
    <Layout>
      <SideMenu/>
      <Layout className="site-layout">
        <TopHeader />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}>
          <NewsRouter />
        </Content>
      </Layout>
    </Layout>
  )
}