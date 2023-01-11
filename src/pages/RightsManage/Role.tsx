import React,{useState,useEffect} from 'react'
import { Table,Button,Modal,Tree } from 'antd';
import { DeleteOutlined, EditOutlined ,ExclamationCircleOutlined } from '@ant-design/icons'
import { roles,DeleteRoles,UpdateRoles } from 'api/roles/index'
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
        return <div>
         <Button danger shape="circle" icon={<DeleteOutlined />} size="middle" onClick={() => confirmDelete(item)} />
          <Button type="primary" shape="circle" icon={<EditOutlined />} size="middle" onClick={() => {
          setisModalVisible(true);
          setcurrentRights(item.rights);
          setcurrentId(item.id);
        }}/>
        </div>
      }
    },
  ];

  const confirmDelete = (item:any) => {
    console.log('删除');
    confirm({
      title:'你确定要删除吗？',
      icon:<ExclamationCircleOutlined/>,
      okText: '确认',
      cancelText: '取消',
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

  const handleOk = async () => {
    setisModalVisible(false)
    setdataSource(dataSource.map((item:any) => {
      if (item.id === currentId) { // 选中的那行角色id
        return {
          ...item,
          rights:currentRights //新的路由信息去覆盖旧的路由信息
        }
      }
      return item //未选中的其余行信息
    }));
    await UpdateRoles(currentId,{
      rights:currentRights
    })
  }

  const handleCancel = () => {
    setisModalVisible(false)
  }

  const onCheck  = (checkedKeys:any,e:any) => {
    // console.log(checkedKeys,'选择',e);
    setcurrentRights(checkedKeys.checked)
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
          checkStrictly
          onCheck={onCheck}
          treeData={rightList}
          checkedKeys={currentRights}
        />
      </Modal>
    </div>
  )
}