import React,{useState,useEffect} from 'react'
import { Table,Tag,Button } from 'antd';
import { DeleteOutlined, EditOutlined  } from '@ant-design/icons'
import { slideList } from 'api/slideList'

export default function RightsList() {
  const [dataSource,setdataSource] = useState([] as any)

  useEffect(() => {
    getRightsList()
  },[])

  const getRightsList = async () => {
    const list = await slideList({
      _embed:"children"
    })
    setdataSource(list)
  }

  const columns:any = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id:number) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render:(key:any) => {
        return <Tag color='volcano' key={key}>{key}</Tag>
      }
    },
    {
      title: '操作',
      render:(item:any) => {
        return <div>
            <Button danger shape="circle" icon={<DeleteOutlined />} size="middle" onClick={() => confirmDelete(item)} />
          <Button type="primary" shape="circle" icon={<EditOutlined />} size="middle" />
        </div>
      }
    },
  ]

  const confirmDelete = (item:any) => {
    console.log(item,'删除');
  }

  return (
    <div>
      <Table 
        dataSource={dataSource}
        columns={columns} 
        rowKey={item => item.id} 
        pagination={{
          pageSize:5
        }}/>
    </div>
  )
}