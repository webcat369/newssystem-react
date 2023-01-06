import React,{forwardRef } from 'react'
import { Form, Input,Select } from 'antd';

const { Option } = Select;

const UserFrom = forwardRef((props:any, addForm: any) => {
  return (
    <Form
      ref={addForm}
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
        rules={[{ required: true, message: '请输入区域!' }]}
      >
        <Select disabled={false}>
          {
            props.regionList.map((item:any) => {
              return (<Option key={item.id} value={item.vlaue}>{item.title}</Option>)
            })
          }
        </Select>
      </Form.Item>

      <Form.Item
        label="角色"
        name="roleId"
        rules={[{ required: true, message: '请输入角色!' }]}
      >
        <Select>
         {
          props.roleList.map((item:any) => {
            return (<Option key={item.id} value={item.value}>{item.roleName}</Option>)
          })
         }
        </Select>
      </Form.Item>

    </Form>
  )
})

export default UserFrom