import React,{useState,useEffect} from 'react'
import { news,UpdateNews } from 'api/news'
import {Table,Button,notification,Breadcrumb} from 'antd'

export default function Audit() {
  const [dataSource,setdataSource] = useState([])
  const {roleId,region,username} =  JSON.parse(localStorage.getItem('token') || '')

 // 设置待审核（auditState=1）新闻数据
  useEffect(() => {
    console.log(roleId,region,username);
    
    getNews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId,region,username])

   // 设置待审核（auditState=1）新闻数据
  const getNews = async () => {
    const roleObj:any = {
      "1":"superadmin",
      "2":"admin",
      "3":"editor"
    }

    const list = await news({
      auditState:1,
      _expand:'category'
    })

    setdataSource(roleObj[roleId] === 'superadmin' ? list : [
      // 超级管理员不限制，区域管理员：自己+自己区域编辑，区域编辑：看不到用户列表
      ...list.fliter((item:any) => item.author === username),
      ...list.filter((item:any) => item.region === region && roleObj[item.roleId] === 'editor')
    ])
  }

  const columns = [
    {
      title:"新闻标题",
      dataIndex:'title',
      render:(title:string,item:any) => {
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title:'作者',
      dataIndex:'author'
    },
    {
      title:'新闻分类',
      dataIndex:'category',
      render:(category:any) => {
        return <div>{category.title}</div>
      }
    },
    {
      title:'操作',
      render:(item:any) => {
        return <div>
          <Button type="primary" onClick={()=>handleAudit(item,2,1)} style={{marginRight:'20px'}}>通过</Button>
          <Button danger onClick={()=>handleAudit(item,3,0)}>驳回</Button>
        </div>
      }
    }
  ]

  // 审核方法：通过（审核状态变为2，发布状态变为1）&驳回（审核状态变为3，发布状态变为0）
  const handleAudit = async (item:any,auditState:number,publishState:number) => {
    setdataSource(dataSource.filter((data:any) => data.id !== item.id))

    const list = await UpdateNews(item.id,{
      auditState:auditState,
      publishState:publishState
    })

    if(list){
      notification.info({
        message: `通知`,
        description:
          `您可以到[审核管理/审核列表]中查看您的新闻的审核状态`,
        placement:"bottomRight"
      })
    }
  }

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>审核管理</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/audit-manage/audit">审核新闻</a>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Table 
        dataSource={dataSource} 
        columns={columns} 
        rowKey={(item:any) => item.id}
        style={{
          marginTop:'20px'
        }}
        pagination={{
          pageSize: 5
        }} 
      />
    </div>
  )
}