import React,{useState,useEffect} from 'react'
import { Table,Tag,Button  } from 'antd'
import { useNavigate } from 'react-router-dom'
import { users } from 'api/user'

export default function List() {
  const [dataSource ,setdataSource] = useState([])
  const { username } = JSON.parse(localStorage.getItem('token') || '')

  useEffect(() => {
    getToExamine()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[username])

  const getToExamine = async () => {
    //_ne:排除某个值;  [_gte,_lte]:划范围，_get<= x <=_lte
    const list = await users({
      author: username,
      auditState_ne: 0, //auditState_ne:(0:草稿箱，1:审核列表)  审核状态不为0
      publishState_lte: 1, //发布状态 <= 1
      _expand:'category'
    })
    setdataSource(list)
  }

  const columns:any = [
    {
      titile:'新闻标题',
      dataIndex:'title',
      render: (title:string,item:any) => {
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
      title:'审核状态',
      dataIndex:'auditState',
      render:(auditState:number) => {
        // 审核状态映射
        const colorList = ["",'orange','green','red']
        const auditList = ["草稿箱","审核中","已通过","未通过"]
        return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
      }
    },
    {
      title:"操作",
      render:(item:any) => {
        return <div>
          {
            item.auditState === 1 && <Button onClick={() => handleRervert(item)}>撤销</Button>
          }
          {
            item.auditState === 2 && <Button onClick={() => handlePublish(item)}>发布</Button>
          }
          {
            item.auditState === 3 && <Button onClick={() => handleUpdate(item)}>更新</Button>
          }
        </div>
      }
    }
  ]

  const handleRervert = (item:any) => {

  }

  const handlePublish = (item:any) => {

  }

  const handleUpdate = (item:any) => {
    
  }

  return (
    <div>
      <Table 
        dataSource={dataSource} 
        columns={columns}
        rowKey={(item:any) => item.id}/>
    </div>
  )
}