/* eslint-disable array-callback-return */
import React,{useState,useEffect,Suspense,lazy} from 'react'
import {connect} from 'react-redux'
import { Spin } from 'antd'
import { Switch,Route,} from "react-router-dom"
import {slideList} from '../../api/slideList/index'
import {childrenList} from '../../api/childrenList/index'

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
  "/user-manage/list": <UserList />,
  "/right-manage/role/list": <RoleList />,
  "/right-manage/right/list": <RightList />,
  "/news-manage/add": <NewsAdd />,
  "/news-manage/draft": <NewsDraft />,
  "/news-manage/preview/:id":<NewsPreview />,
  "/news-manage/update/:id":<NewsUpdate />,
  "/news-manage/category": <NewsCategory />,
  "/audit-manage/audit": <Audit />,
  "/audit-manage/list": <AuditList />,
  "/publish-manage/unpublished": <Unpublished />,
  "/publish-manage/published": <Published />,
  "/publish-manage/sunset":<Sunset />
}

function NewsRouter(props:any) {
  const [BackRouteList,setBackRouteList] = useState([])
  // 初始化所有路由列表
  useEffect(() => {
    Promise.all([slideList({}),childrenList({})]).then((res) => {
      console.log([...res[0], ...res[1]],'res');
      setBackRouteList([...res[0], ...res[1]] as any)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const {role: {rights}} = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || '') : null

  // 路由自身页面权限:映射列表+ （侧边权限||新闻路由）
  const checkRoute = (item:any)=>{
    console.log(item);
    
    return LocalRouterMap[item.key] && (item.pagepermisson || item.routepermisson)
  }

  //用户权限检查
  const checkUserPermission = (item:any) => {
    console.log(rights.includes(item.key));
    
    return rights.includes(item.key)
  }


  return (
    <Spin size="large" spinning={props.isLoading}>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Switch>
          {BackRouteList.map((item:any) => {
            if(checkRoute(item) && checkUserPermission(item)){
              return <Route path={item.key} key={item.key} component={() => <Suspense fallback={<div>Loading...</div>}>{LocalRouterMap[item.key]}</Suspense>}/>
            }
            return <Route path="*" key="NoPermission" component={NoPermission} />
          })}
          <Route path='/' component={Home} />
        </Switch>
      {/* </Suspense> */}
    </Spin>
  )
}

const mapStateToProps = ({LoadingReducer:{isLoading}}:any)=>({isLoading})

export default connect(mapStateToProps)(NewsRouter)