import React,{useState,useEffect} from 'react'
import { Table,Tag,Button,Popover,Switch,Modal } from 'antd';
import { DeleteOutlined, EditOutlined ,ExclamationCircleOutlined } from '@ant-design/icons'
import { slideList , UpdateSlideList,DeleteSlideList } from 'api/slideList'
import { UpdateChildrenList , DeleteChildrenList} from 'api/childrenList'

const {confirm} = Modal

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
      render:(key:string) => {
        return <Tag color='magenta' key={key}>{key}</Tag>
      }
    },
    {
      title: '操作',
      render:(item:any) => {
        return <div>
          <Button danger shape="circle" icon={<DeleteOutlined />} size="middle" onClick={() => confirmDelete(item)} />
          <Popover 
          title={
            <div style={{textAlign:'center'}}>页面配置项</div>
          } 
          trigger={
            item.pagepermisson === undefined ? 'hover' : 'click'
          } 
          content={
            <div style={{textAlign:'center'}}>
              <Switch checked={item.pagepermisson} onChange={() => switchMethod(item)} />
            </div>
          }>
            <Button type="primary" shape="circle" icon={<EditOutlined />} size="middle"  disabled={item.pagepermisson===undefined} />
          </Popover>
        </div>
      }
    },
  ]

  const switchMethod = async (item:any) => {
    console.log(item,'开关');
    item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
    //重新渲染
    setdataSource([...dataSource])
    if(item.grade === 1){
      await UpdateSlideList(item.id,{pagepermisson:item.pagepermisson})
    }else{
      await UpdateChildrenList(item.id,{pagepermisson:item.pagepermisson})
    }
  }

  const confirmDelete = (item:any) => {
    console.log(item,'删除');
    confirm({
      title:'你确定要删除吗？',
      icon:<ExclamationCircleOutlined/>,
      okText: '确认',
      cancelText: '取消',
      onOk(){
        DeleteRoles(item)
      },
      onCancel(){}
    })

  }

  const DeleteRoles = async (item:any) => {
    if(item.grade === 1){
      dataSource.filter((data:any) => data.id !== item.id)
      setdataSource([...dataSource])
      await DeleteSlideList(item.id)
    }else{
      const list =  dataSource.filter((data:any) => data.id === item.rightId)
      list[0].children = list[0].children.filter((data:any) => data.id !== item.id)
      setdataSource([...dataSource])
      await DeleteChildrenList(item.id)
    }
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