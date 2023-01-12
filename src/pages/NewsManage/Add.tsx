import React,{useState,useRef,useEffect} from 'react'
import { PageHeader,Steps,Form,Input,Select,Button,message } from 'antd';
import style from './scss/News.module.scss'
import { categories } from 'api/categories'
import NewsEditor from 'components/NewsManage/NewsEditor'

const { Option } = Select

export default function Add() {
  const [current,setcurrent] = useState(0)
  const [categoryList,setcategoryList] = useState([])
  const [content,setcontent] = useState('' as any)
  const NewsForm = useRef(null as any)
  const [formInfo, setformInfo] = useState({})

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

  const handleSave = (value:number) => {
    console.log(value,'保存到草稿箱,提交审核');
    
  }

  const handleNext = () => {
    if(current===0){
      // 获取表单数据：formInfo
      NewsForm.current.validateFields().then((item:any) => {
        setformInfo(item)
        setcurrent(current + 1)
      }).catch((err:any) => {
        console.log(err);
      })
    }else{
      if(content === '' || content.trim() === "<p></p>"){
        message.error('新闻内容不能为空')
      }else{
        setcurrent(current + 1)
      }
    }
  }

  const handlePrevious = () => {
    setcurrent(current-1)
  }

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
        <div dangerouslySetInnerHTML = {{ __html: content }}></div>
      </div>

      <div style={{ marginTop:'50px' }}>
        {
          current === 2 && <span>
            <Button type="primary" onClick={() => handleSave(0)}>保存草稿箱</Button>
            <Button danger onClick={() => handleSave(1)}>提交审核</Button>
          </span>
        }
        {
          current < 2 && <Button type="primary" onClick={handleNext}>下一步</Button>
        }
        {
          current > 0 && <Button onClick={handlePrevious}>上一步</Button>
        }
      </div>
    </div>
  )
}