import React,{useState,useEffect} from 'react'
import { Table,Button,Modal,Tree } from 'antd';
import { DeleteOutlined, EditOutlined ,ExclamationCircleOutlined } from '@ant-design/icons'
import { roles,DeleteRoles } from 'api/roles/index'
import { slideList } from 'api/slideList/index'

const { confirm } = Modal;

export default function RoleList() {
  const [dataSource,setdataSource] = useState([] as any)
  const [isModalVisible,setisModalVisible] = useState(false)
  const [rightList,setrightList] = useState([])
  const [currentRights,setcurrentRights] = useState([]) //当前角色拥有的权限下的路由信息
  const [currentId,setcurrentId] = useState(0)

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
          <Button type="primary" shape="circle" icon={<EditOutlined />} size="middle" onClick={(item:any) => {
            setisModalVisible(true)
            setcurrentRights(item.rights)
            setcurrentId(item.id)
          }}/>
        </div>
      }
    },
  ];

  const confirmDelete = (item:any) => {
    console.log('权限分配-删除');
    confirm({
      title:'你确定要删除吗？',
      icon:<ExclamationCircleOutlined/>,
      onOk(){
        getDeleteRoles(item)
      },
      onCancel(){},
    })
  }

  const getDeleteRoles = async (item:any) => {
    setdataSource(dataSource.filter((data:any) => data.id !== item.id))
    await DeleteRoles(item.id)
  }

  const handleOk = () => {
    setisModalVisible(false)
    setdataSource(dataSource.map((item:any) => {
      if (item.id===currentId) {
        return {
          ...item,
          rights:currentRights
        }
      }
      return item
    }));
  }

  const handleCancel = () => {
    setisModalVisible(false)
  }

  const onCheck  = (checkedKeys:any) => {
    console.log('Tree');
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