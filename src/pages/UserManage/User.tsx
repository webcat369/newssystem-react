import React,{useState,useEffect,useRef} from 'react'
import {Table,Switch,Button,Modal} from 'antd'
import { DeleteOutlined, EditOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import { users,UpdateUers,addUers,deleteUers } from 'api/user'
import { regions } from 'api/regions'
import { roles } from 'api/roles'
import UserFrom from '../../components/UserManage/UserFrom'

const { confirm } = Modal

export default function UserList() {
  const [dataSource,setdataSource] = useState([] as any)
  const [regionList,setregionList] = useState([])
  const [roleList, setroleList] = useState([]);
  const addForm = useRef(null as any) //useRef:any()
  const updateForm:any = useRef(null)
  const [isAddlVisible,setisAddlVisible] = useState(false)
  const [isUpdatelVisible,setisUpdatelVisible] = useState(false)
  const [current,setcurrent] = useState([] as any)
  const [isUpdateDisabled,setisUpdateDisabled] =  useState(false)
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
    const list = await users({
      _expand:"role"
    })

    console.log(list,'用户列表');
    setdataSource(roleObj[roleId] === 'superadmin' ? list : [
      // 超级管理员不限制，区域管理员：自己+自己区域编辑，区域编辑：看不到用户列表
      ...list.filter((item:any) => item.username === username),
      ...list.filter((item:any) => item.region === region && roleObj[item.roleId] === 'editor')
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
          <Button danger shape="circle" icon={<DeleteOutlined />} size="middle" disabled={item.default} onClick={() => confirmDelete(item)} />
          <Button type="primary" shape="circle" icon={<EditOutlined />} size="middle" disabled={item.default} onClick={() => showUpdate(item)}/>
        </div>)
      }
    },
  ]

  const switchMethod = async (item:any) => {
    item.roleState = !item.roleState;
    setdataSource([...dataSource]);
    await UpdateUers(item.id,{
      roleState: item.roleState
    })
  }

  const confirmDelete = (item:any) => {
    console.log('删除');
    confirm({
      title:'你确定要删除吗？',
      icon:<ExclamationCircleOutlined/>,
      onOk(){
        deleteMethod(item)
      },
      onCancel(){}
    })
  }

  const deleteMethod = async (item:any) => {
    setdataSource(dataSource.filter((data:any) => data.id !== item.id))
    //删除
    await deleteUers(item.id)
  }

  const showUpdate = async (item:any) => {
    console.log(item,'更新用户');
    await setisUpdatelVisible(true)
    if(item.roleId === 1){
      setisUpdateDisabled(true)
    }else{
      setisUpdateDisabled(false)
    }
    //报错：TypeError: Cannot read properties of null (reading 'setFieldsValue')
    //方法一：async await
    //方法二：
    // setTimeout(() => {
      updateForm.current.setFieldsValue(item)
    // })
    setcurrent(item)
  }

  const showModal = () => {
    console.log('增加用户');
    setisAddlVisible(true)
  }

  const handleAddOk = () => {
    addForm.current.validateFields().then(async (value:any) => {
      setisAddlVisible(false)
      // 清空表单
      addForm.current.resetFields();

      const data = await addUers({
        ...value,
        roleState: true,
        default: false
      })
      //重新渲染表单
      setdataSource([...dataSource, {
        ...data,
        // 提交数据中没有角色名称，是关联得来的
        role: roleList.filter((item:any) => item.id === value.roleId)[0]
      }])
    })
    .catch((err:any) => {
      console.log(err);
    })
  }

  //取消新增
  const handleAddCancel = () => {
    setisAddlVisible(false)
  }

  const handleUpdateOk = () => {
    updateForm.current.validateFields().then(async (value:any) => {
      console.log(value,'确定更新');
      setisUpdatelVisible(false)
      
      //重新渲染
      setdataSource(dataSource.map((item:any) => {
        if(item.id === current.id){
          return{
            ...item,  //当前未修改的数据
            ...value, //当前修改过的那条数据
            // 提交数据中没有角色名称，是关联得来的
            role: roleList.filter((data:any) => data.id === value.roleId)[0]
          }
        }
        return item
      }))
      setisUpdateDisabled(!isUpdateDisabled)
      await UpdateUers(current.id,value)
    }).catch((err:any)=> {
      console.log(err);
    })
  }

  const handleUpdateCancel = () => {
    console.log('取消更新');
    setisUpdatelVisible(false)
    setisUpdateDisabled(!isUpdateDisabled)
  }

  return (
    <div>
      <Button type='primary' onClick={showModal}>增加用户</Button>

      <Modal title="增加用户" okText="确定" cancelText="取消"  open={isAddlVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
        <UserFrom ref={addForm} regionList={regionList} roleList={roleList} />
      </Modal>

      <Modal title="更新用户" okText="确定" cancelText="取消"  open={isUpdatelVisible} onOk={handleUpdateOk} onCancel={handleUpdateCancel}>
        <UserFrom ref={updateForm} regionList={regionList} roleList={roleList} isUpdateDisabled={isUpdateDisabled}/>
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