import React,{useState,useEffect,useRef} from 'react'
import {Table,Switch,Button,Modal} from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { users,patchUers } from 'api/user'
import { regions } from 'api/regions'
import { roles } from 'api/roles'
import UserFrom from '../../components/UserManage/UserFrom'

export default function UserList() {
  const [dataSource,setdataSource] = useState([])
  const [regionList,setregionList] = useState([])
  const [roleList, setroleList] = useState([]);
  const addForm = useRef(null as any) //useRef:any()
  const [isAddlVisible,setisAddlVisible] = useState(false)
  const {roleId,region,username} =  localStorage.getItem('token') ?JSON.parse(localStorage.getItem('token') || '') : null

  useEffect(() => {
    getDataSource()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[roleId,region,username])

  useEffect(() => {
    getRegionList()
    getRoles()
  },[])

  const getDataSource = async () => {
    const roleObj:any = {
      1:"superadmin", //超级管理员：添加、删除、编辑所有用户
      2:"admin", //区域管理员：新增、删除、编辑本用户及本区域下的区域编辑用户
      3:"editor" //区域编辑：没有本页面权限
    }
    const data = await users({
      _expand:"role"
    })

    console.log(data,'用户列表');
    setdataSource(roleObj[roleId] === 'superadmin' ? data : [
      // 超级管理员不限制，区域管理员：自己+自己区域编辑，区域编辑：看不到用户列表
      ...data.map((item:any) => item.username === username),
      ...data.map((item:any) => item.region === region && roleObj[item.roleId] === 'editor')
    ])
  }

  const getRegionList = async () => {
    const list = await regions()
    console.log(list,'区域列表');
    setregionList(list)
  }

  const getRoles = async () => {
    const list = await roles()
    console.log(list,'角色列表');
    setroleList(list)
  }

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        ...regionList.map((item:any) => ({
          text: item.title,
          value: item.value,
        })),
        {
          text: '全球',
          value: '全球',
        },
      ],
      onFilter: (value:any, item:any) => {
        console.log(value,item);
        if(value === '全球'){
          return item.region === ''
        }
        return item.region.includes(value)
      },
      render: (region:any) => {
        return <b>{region === "" ? "全球" : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role:any) => {
        return role?.roleName
      }
    },
    {
      title: '用户名称',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render:(roleState:any, item:any) => <Switch checked={roleState} disabled={item.default} onChange={()=> switchMethod(item)} />
    },
    {
      title: '操作',
      render:(item:any) => {
        return (<div>
          <Button danger shape="circle" icon={<DeleteOutlined />} size="middle" onClick={() => confirmDelete(item)} />
          <Button type="primary" shape="circle" icon={<EditOutlined />} size="middle" onClick={() => showUpdate(item)}/>
        </div>)
      }
    },
  ]

  const switchMethod = async (item:any) => {
    console.log(item,'开关',dataSource);
    item.roleState = !item.roleState;
    setdataSource([...dataSource]);
    await patchUers(item.id,{
      roleState: item.roleState
    })
  }

  const confirmDelete = (item:any) => {
    console.log('删除');
  }

  const showUpdate = (item:any) => {
    console.log('编辑');
  }

  const showModal = () => {
    console.log('增加用户');
    setisAddlVisible(true)
  }

  const handleAddOk = () => {
      console.log('ok');
      addForm.current.validateFields().then((value:any) => {
        console.log(value,'结果');
      }) 
      // setisAddlVisible(false)
  }

  const handleAddCancel = () => {
    console.log('cnacel');
    setisAddlVisible(false)
  }

  return (
    <div>
      <Button type='primary' onClick={showModal}>增加用户</Button>

      <Modal title="增加用户" open={isAddlVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
        <UserFrom ref={addForm} regionList={regionList} roleList={roleList} />
      </Modal>

      <Table 
        dataSource={dataSource}
        columns={columns} 
        rowKey={item => item.id} 
        pagination={{
          position:['bottomRight'],
          pageSize:5
        }}
      />
    </div>
  )
}