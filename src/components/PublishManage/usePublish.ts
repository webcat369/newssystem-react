import {useEffect, useState} from 'react'
import {news,UpdateNews,DeleteNews} from 'api/news/index'
import {notification} from 'antd'

//发布方法封装
function usePublish (type:number){
  const {username} = JSON.parse(localStorage.getItem('token') || '')
  const [dataSource,setdataSource] = useState([])

  // 初始化数据，从父组件中拿到参数type
  useEffect(() => {
    getNews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[type,username])

  //获取数据
  const getNews = async () => {
    const list  = await news({
      author:username,
      publishState:type,
      _expand:'category'
    })
    setdataSource(list)
  }

  // 发布方法
  const handlePublish = async (id:number) => {
    // 从待发布列表中移除
    setdataSource(dataSource.filter((item:any) => item.id !== id))
    // 后端推送设置状态
    const list = await UpdateNews(id,{
      publishState:2,
      publishTime:Date.now()
    })
    if(list){
      notification.info({
        message: `通知`,
        description:
          `您可以到【发布管理/已经发布】中查看您的新闻`,
        placement:"bottomRight"
      });
    }
  }

  //下线方法
  const handleSunset = async (id:number) => {
    //从已发布列表移除
    setdataSource(dataSource.filter((item:any) => item.id !== id))
    // 后端推送设置状态
    const list = await UpdateNews(id,{
      publishState:3
    })

    if(list){
      notification.info({
        message: `通知`,
        description:
          `您可以到【发布管理/已下线】中查看您的新闻`,
        placement:"bottomRight"
      });
    }
  }

  //删除方法
  const handleDelete = async (id:number) => {
    //从已下线列表移除
    setdataSource(dataSource.filter((item:any) => item.id !== id))
    // 后端推送设置状态
    await DeleteNews(id)
    notification.info({
      message: `通知`,
      description:
        `您已经删除了已下线的新闻`,
      placement:"bottomRight"
  });
  }

  return {
    dataSource,
    handlePublish,
    handleSunset,
    handleDelete
  }
}

export default usePublish