import React,{useState,useEffect,Suspense,lazy} from 'react'
import {connect} from 'react-redux'
import { Spin } from 'antd'
import { Routes,Route,Navigate} from "react-router-dom"
import {slideList} from 'api/slideList'
import {childrenList} from 'api/childrenList'

//路由懒加载
import Home from '../../pages/Home/index'
const NoPermission = lazy(() => import('../../pages/NoPermission'))
const RightList = lazy(()=> import('../../pages/RightsManage/List'))
const RoleList = lazy(()=> import('../../pages/RightsManage/Role'))
const UserList = lazy(()=> import('../../pages/UserManage/User'))
const NewsAdd = lazy(()=> import('../../pages/UserManage/Add'))
const NewsDraft = lazy(()=> import('../../pages/NewsManage/Draft'))
const NewsCategory = lazy(()=> import('../../pages/NewsManage/Category'))
const Audit = lazy(()=> import('../../pages/AuditManage/Audit'))
const AuditList = lazy(()=> import('../../pages/AuditManage/List'))
const Unpublished = lazy(()=> import('../../pages/PublishManage/Unpublished'))
const Published = lazy(()=> import('../../pages/PublishManage/Published'))
const Sunset = lazy(()=> import('../../pages/PublishManage/Sunset'))
const NewsPreview = lazy(()=> import('../../pages/NewsManage/Preview'))
const NewsUpdate = lazy(()=> import('../../pages/NewsManage/Update'))
// 路由与组件映射
const LocalRouterMap:any = {
  "/home": <Home />,
  "/user-manage/list": <UserList />, //用户列表
  "/right-manage/role/list": <RoleList />, //角色列表
  "/right-manage/right/list": <RightList />, //权限列表
  "/news-manage/add": <NewsAdd />, //撰写新闻
  "/news-manage/draft": <NewsDraft />, //草稿箱
  "/news-manage/preview/:id":<NewsPreview />, //新闻预览
  "/news-manage/update/:id":<NewsUpdate />, //新闻更新
  "/news-manage/category": <NewsCategory />, //新闻分类
  "/audit-manage/audit": <Audit />, //审核新闻
  "/audit-manage/list": <AuditList />, //审核列表
  "/publish-manage/unpublished": <Unpublished />, //待发布
  "/publish-manage/published": <Published />, //已发布
  "/publish-manage/sunset":<Sunset /> //已下线
}

function NewsRouter(props:any) {
  const [BackRouteList,setBackRouteList] = useState([])

  // 初始化所有路由列表
  useEffect(() => {
    Promise.all(
      [slideList(),childrenList()]
      ).then((res) => {
      console.log([...res[0], ...res[1]],'初始化所有路由列表');
      setBackRouteList([...res[0], ...res[1]] as any)
    })
  },[])

  const {role: {rights}} = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || '') : null

  // 路由自身页面权限:映射列表+ （侧边权限||新闻路由）
  const checkRoute = (item:any)=>{
    return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
  }

  //用户权限检查
  const checkUserPermission = (item:any) => {
    return rights.includes(item.key)
  }


  return (
    <Spin size="large" spinning={props.isLoading}>
      <Routes>
          {BackRouteList.map((item:any) => {
          if(checkRoute(item) && checkUserPermission(item)){
              return <Route path={item.key} key={item.key} element={<Suspense fallback={<div>Loading...</div>}>{LocalRouterMap[item.key]}</Suspense>} />
              }
              return <Route path="*" key="NoPermission" element={<NoPermission />} />
            })}
            <Route path='/' element={<Navigate to="/home" />} />
      </Routes>
    </Spin>
  )
}

const mapStateToProps = ({LoadingReducer:{isLoading}}:any)=>({isLoading})

export default connect(mapStateToProps)(NewsRouter)