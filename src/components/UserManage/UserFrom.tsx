import React,{forwardRef, useEffect,useState } from 'react'
import { Form, Input,Select } from 'antd';

const { Option } = Select;

const UserFrom = forwardRef((props:any, ref: any) => {
  const [isDisabled,setisDisabled] = useState(false)
  useEffect(() => {
    console.log(props.isUpdate,'isUpdate');
    setisDisabled(props.isUpdateDisabled)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.isUpdateDisabled])
  const {region,roleId} = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || '') : null
  const roleObj:any = {
    "1":"superadmin",
    "2":"admin",
    "3":"editor"
  }

  const checkRegionDisabled = (item:any) => {
    if(roleObj[roleId] === 'superadmin'){
      return false
    }else{
      return item.region !== region
    }
  }

  const checkRoleDisabled = (item:any) => {
    if(roleObj[roleId] === 'superadmin'){
      return false
    }else{
      return roleObj[item.id] !== 'editor'
    }
  }

  return (
    <Form
      ref={ref}
      layout="vertical"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="区域"
        name="region"
        rules={isDisabled ? [] : [{ required: true, message: '请输入区域!' }]}
      >
        <Select disabled={isDisabled}>
          {
            props.regionList.map((item:any) => {
              return (<Option key={item.id} value={item.value} disabled={
                checkRegionDisabled(item)
              }>{item.title}</Option>)
            })
          }
        </Select>
      </Form.Item>

      <Form.Item
        label="角色"
        name="roleId"
        rules={[{ required: true, message: '请输入角色!' }]}
      >
        <Select onChange={(value:any) => {
          if(value === 1){
            setisDisabled(true)
            ref.current.setFieldsValue({
              region:''
            })
          }else{
            setisDisabled(false)
          }
        }}>
         {
          props.roleList.map((item:any) => {
            return (<Option key={item.id} value={item.id} disabled={checkRoleDisabled(item)}>{item.roleName}</Option>)
          })
         }
        </Select>
      </Form.Item>

    </Form>
  )
})

export default UserFrom