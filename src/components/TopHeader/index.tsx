import React from 'react'
import { Layout, Dropdown,Avatar } from 'antd';
import type { MenuProps } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import {connect} from 'react-redux'

const { Header } = Layout;

function TopHeader(props:any) {
  const navigate = useNavigate()
  const changeCollapsed =  () => {
    props.changeCollapsed()
  }
  
  const {username,role:{roleName}} =  localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || '') : null
 
  const items: MenuProps['items'] = [
    {
      label: roleName,
      key: 'center',
    },
    {
      label: '退出',
      key: 'leave',
    },
  ];
  const handleMenuClick: MenuProps['onClick'] = e => {
    if (e.key === 'leave') {
      console.log('退出');
      localStorage.removeItem('token');
      navigate('/login')
    }
  };
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {props.isCollapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />}
      <div style={{ float: "right" }}>
        <span style={{marginRight:'20px'}}>欢迎<span style={{color:"#1890ff"}}>{username}</span>回来</span>
        <Dropdown menu={{items,onClick: handleMenuClick}}>
          <span>
          <Avatar size="large" icon={<UserOutlined />} />
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}

const mapStateToProps = ({CollapsedReducer: {isCollapsed}}:any)=>{
  return {
   isCollapsed
  }
}
const mapDispatchToProps = {
 changeCollapsed(){
   return {
     type:"change_collapsed"
   }
 }
}

export default connect(mapStateToProps,mapDispatchToProps)(TopHeader)