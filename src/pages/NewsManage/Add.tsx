import React,{useState} from 'react'
import { PageHeader,Steps,Form } from 'antd';
import style from './scss/News.module.scss'


export default function Add() {
  const [current,setcurrent] = useState(0)
  
  const stepsItem = [
    { 
      title: '基本信息' ,
      description:'新闻标题，新闻分类'
    }, 
    { 
      title: '新闻内容',
      description:'新闻主体内容'
    }, 
    { 
      title: '新闻提交',
      description:'保存草稿或者提交审核'
    }
  ]

  return (
    <div>
      <PageHeader 
        className="site-page-header"
        title="撰写新闻"
        subTitle="This is a Write news"/>

      <Steps items={stepsItem} current={current} /> 

      <div className={current === 0 ? '' : style.active}>
        <Form>

        </Form>
      </div>
    </div>
  )
}