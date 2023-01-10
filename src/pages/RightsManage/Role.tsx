import React,{useState,useEffect} from 'react'
import { Table,Button,Modal,Tree } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { roles } from 'api/roles/index'
import { slideList } from 'api/slideList/index'

export default function RoleList() {
  const [dataSource,setdataSource] = useState([])
  const [isModalVisible,setisModalVisible] = useState(false)
  const [rightList,setrightList] = useState([])

  useEffect(() => {
    getRolesList()
    getSlideList()
  },[])

  const getRolesList = async () => {
    const list = await roles()
    setdataSource(list)
  }

  const getSlideList = async () => {
    const data = await slideList({
      _embed:'children'
    })
    setrightList(data)
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
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render:(item:any) => {
        <div>
         <Button danger shape="circle" icon={<DeleteOutlined />} size="middle" onClick={() => confirmDelete(item)} />
          <Button type="primary" shape="circle" icon={<EditOutlined />} size="middle" onClick={() => {
            setisModalVisible(true)
          }}/>
        </div>
      }
    },
  ];

  const confirmDelete = (item:any) => {
    console.log('权限分配-删除');
  }

  const handleOk = () => {
    setisModalVisible(false)
  }

  const handleCancel = () => {
    setisModalVisible(false)
  }

  const onCheck  = () => {

  }


  return (
    <div>
      <Table 
          dataSource={dataSource} 
          columns={columns} 
          rowKey={(item:any) => item.id}
          pagination={{
            position:['bottomRight']
          }}/>

      <Modal title="权限分配" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree
        checkable
        onCheck={onCheck}
        treeData={rightList}
        />
      </Modal>
    </div>
  )
}