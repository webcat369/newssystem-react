/* eslint-disable array-callback-return */
import React,{useState,useEffect,Suspense,lazy} from 'react'
import {connect} from 'react-redux'
import { Spin } from 'antd'
import { Switch,Route,} from "react-router-dom"
import {slideList} from '../../api/slideList/index'
import {childrenList} from '../../api/childrenList/index'

//路由懒加载
import Home from '../../pages/Home/index'
const NoPermission = lazy(() => import('../../pages/NoPermission/index'))
// 路由与组件映射
const LocalRouterMap:any = {
  "/home": <Home />
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

  const {role:{rights}} = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || '') : null

  // 路由自身页面权限:映射列表+ （侧边权限||新闻路由）
  const checkRoute = (item:any) => {
    return LocalRouterMap(item.key) && (item.pagepermisson || item.routepermisson)
  }

  //用户权限检查
  const checkUserPermission = (item:any) => {
    return rights.include(item.key)
  }


  return (
    <Spin size="large" spinning={props.isLoading}>
      <Switch>
        {BackRouteList.map((item:any) => {
          if(checkRoute(item) && checkUserPermission(item)){
            return <Route path={item.key} key={item.key} component={Suspense}/>
          }
          return <Route path="*" key="NoPermission" component={NoPermission} />
        })}
      </Switch>
    </Spin>
  )
}

const mapStateToProps = ({LoadingReducer:{isLoading}}:any)=>({isLoading})

export default connect(mapStateToProps)(NewsRouter)