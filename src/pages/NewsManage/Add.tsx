import React,{useState,useRef,useEffect} from 'react'
import { PageHeader,Steps,Form,Input,Select } from 'antd';
import style from './scss/News.module.scss'
import { categories } from 'api/categories'
import NewsEditor from 'components/NewsManage/NewsEditor'

const { Option } = Select

export default function Add() {
  const [current,setcurrent] = useState(0)
  const [categoryList,setcategoryList] = useState([])
  const [content,setcontent] = useState('')
  const NewsForm = useRef(null)
  const [newsInfo,setnewsInfo] = useState([] as any)

  useEffect(() => {
    getCategories()
  },[])

  const getCategories = async () => {
    const data = await categories()
    setcategoryList(data)
  }
  
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
  // 24栅格布局
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  }

  return (
    <div>
      <PageHeader 
        className="site-page-header"
        title="撰写新闻"
        subTitle="This is a Write news"/>

      <Steps items={stepsItem} current={current} /> 

      <div className={current === 0 ? '' : style.active}>
        <Form 
          {...layout}
          name="basic"
          ref={NewsForm}>
            <Form.Item label="新闻标题" name="title" rules={[{ required: true, message: '请输入新闻标题' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="新闻分类" name="categoryId" rules={[{ required: true, message: '请选择新闻分类' }]}>
              <Select>
                {
                  categoryList.map((item:any) => <Option value={item.id} key={item.id}>{item.title}</Option>)
                }
              </Select>
            </Form.Item>
        </Form>
      </div>

      <div className={current === 1 ? '' : style.active}>
        <NewsEditor getContent={(value:any)=>{
                        console.log(value,'setcontent')
                        setcontent(value)
                    }}/>
      </div>

      <div className={current === 2 ? '' : style.active}>
        <div dangerouslySetInnerHTML = {{ __html: newsInfo.content }}></div>
      </div>
    </div>
  )
}