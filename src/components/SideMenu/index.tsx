import React, { useState, useEffect } from 'react'
//css
import './../SideMenu/index.scss'
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined,ContainerOutlined,AppstoreOutlined,SettingOutlined,MailOutlined,LinkOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom'
import {connect} from 'react-redux'

import {slideList} from 'api/slideList'

const { Sider } = Layout;
// const { SubMenu } = Menu;

// 模拟数组结构
// const menuList = [
//   {
//     key: "/home",
//     title: "首页",
//     icon: <UserOutlined />
//   },
//   {
//     key: "/user-manage",
//     title: "用户管理",
//     icon: <UserOutlined />,
//     children: [
//       {
//         key: "/user-manage/list",
//         title: "用户列表",
//         icon: <UserOutlined />
//       }
//     ]
//   },
//   {
//     key: "/right-manage",
//     title: "权限管理",
//     icon: <UserOutlined />,
//     children: [
//       {
//         key: "/right-manage/role/list",
//         title: "角色列表",
//         icon: <UserOutlined />
//       },
//       {
//         key: "/right-manage/right/list",
//         title: "角色列表",
//         icon: <UserOutlined />
//       }
//     ]
//   }
// ]
const iconList:any = {
  "/home": <UserOutlined />,
  "/user-manage": <LinkOutlined />,
  "/user-manage/list": '',
  "/right-manage": <ContainerOutlined />,
  "/right-manage/role/list": '',
  "/right-manage/right/list": '',
  "/news-manage":<MailOutlined />,
  "/news-manage/list":'',
  "/audit-manage":<AppstoreOutlined />,
  "/audit-manage/audit":'',
  "/audit-manage/list":'',
  "/publish-manage":<SettingOutlined />,
  "/publish-manage/unpublished":'',
  "/publish-manage/published":'',
  "/publish-manage/sunset":'',
  //.......
}

function SideMenu(props:any) {
  const [menu,setMenu] = useState([])
  const navigate = useNavigate()
  //初始化侧边栏内容列表
  useEffect(() => {
    getSildeList()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const getSildeList = async () => {
    const data = await slideList({
      _embed:'children'
    });
    console.log(data,'侧边导航');
    
    setMenu(data)
  }

  //解构当前用户的页面权限
  const {role: {rights}} = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || '') : null
  //检查登录用户的权限
  const checkPagePermission = (item:any) => {
    return item.pagepermisson && rights.includes(item.key)
  }

  // 截取当前URL路径
  const location = useLocation();
  const selectedkeys = location.pathname;
  const openkeys = ["/" + location.pathname.split("/")[1]];

  // 侧边栏内容列表
  const renderMenu = (menuList:any) => {
    return menuList.map((item:any) => {
      // 检查每一项是否有下级列表（使用可选链语法）&& 页面权限
     if(item.children?.length > 0 && checkPagePermission(item)){
      // return ( 
      //   <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
      //     {renderMenu(item.children)}
      //   </SubMenu>
      // )
      return {
        label: item.title,
        key: item.key,
        icon:iconList[item.key],
        children: renderMenu(item.children),
      }
     }
     return checkPagePermission(item) && { label: item.title, key: item.key, icon:iconList[item.key] }
    //  <Menu.Item key={item.key} icon={iconList[item.key]} onClick={() =>
    //   history.push(item.key)
    // }>{item.title}</Menu.Item>
    })
  }
  const onClick: MenuProps['onClick'] = item => {
    console.log(item.key,'路由映射');
    
    navigate(item.key)
  };

  return (
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
      <div style={{ display: "flex", height: "100%", flexDirection: 'column' }}>
        <div className="logo" >新闻发布后台管理系统</div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Menu theme="dark" 
                mode="inline" 
                selectedKeys={[selectedkeys]} 
                className="aaaaaaa" 
                defaultOpenKeys={openkeys}
                items={renderMenu(menu)}
                onClick={onClick}
                >
            {/* {renderMenu(menu)} */}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
const mapStateToProps = ({CollapsedReducer: {isCollapsed}}:any)=>({isCollapsed})


// connect 是一个函数，它的返回值为另外一个函数。
const enhance = connect(mapStateToProps)
// 返回值为 HOC，它会返回已经连接 Redux store 的组件
export default enhance(SideMenu)
//换句话说，connect 是一个返回高阶组件的高阶函数！

//简写：
// export default connect(mapStateToProps)(SideMenu)