import React,{useState,useEffect} from 'react'
import { Table,Button,Modal,notification } from 'antd';
import { DeleteOutlined,EditOutlined,UploadOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import { news,UpdateNews,DeleteNews } from 'api/news'
import { useNavigate } from 'react-router-dom'

const { confirm } = Modal

export default function Draft() {
  const [dataSource,setdataSource] = useState([])
  const { username } = JSON.parse(localStorage.getItem('token') || '')
  const navigat = useNavigate()

  // 初始化草稿箱数据：本用户+草稿标志+新闻分类
  useEffect(() => {
    getDraft()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[username])

  const getDraft = async () => {
    const list = await news({
      author:username,
      auditState:0, //0:草稿箱,1:提交审核
      _expand:'category'
    })
    setdataSource(list)
  }

  const columns = [
    {
      title:'ID',
      dataIndex:'id',
      render: (id:number) => {
        return <b>{id}</b>
      }
    },
    {
      title:'新闻标题',
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
      title:'分类',
      dataIndex:'category',
      render: (category:any) => {
        return category.title
      }
    },
    {
      title:'操作',
      render:() => {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={(item) => confirmMethod(item)}></Button>
          <Button shape="circle" icon={<EditOutlined />} onClick={(item) => updateMethod(item)}></Button>
          <Button type="primary" shape="circle" icon={<UploadOutlined />} onClick={(item) => handleCheck(item)}></Button>
        </div>
      }
    }
  ]

   // 删除方法
  const confirmMethod = (item:any) => {
    confirm({
      title:'你确定要删除吗？',
      icon:<ExclamationCircleOutlined/>,
      okText:'确定',
      cancelText:'取消',
      onOk(){
        deleteMethod(item)
      },
      onCancel(){}
    })
  }

  //删除
  const deleteMethod = async (item:any) => {
    console.log(item,'删除');
    // 当前页面同步状态 + 后端同步
    dataSource.filter((data:any) => data.id !== item.id)
    setdataSource([...dataSource])
    await DeleteNews(item.id)
  }

  //更新方法
  const updateMethod = (item:any) => {
    //跳转新闻更新列表
    navigat(`/news-manage/update/${item.id}`)
  }

  //审核方法
  const handleCheck = async (item:any) => {
    const data = await UpdateNews(item.id,{
      auditState:1 //0:草稿箱，1:提交审核
    })
    if(data) {
      //跳转审核列表
      navigat('/audit-manage/list')
      notification.info({
        message: `通知`,
        description:
          `您可以到${'审核列表'}中查看您的新闻`,
        placement:"bottomRight"
      })
    }
  }



  return (
    <div>
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        rowKey={(item:any) => item.id}
        pagination={{
          pageSize: 5
        }} 
      />
    </div>
  )
}