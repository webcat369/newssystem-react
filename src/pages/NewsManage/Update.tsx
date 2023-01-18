import React,{useState,useRef,useEffect} from 'react'
import { PageHeader,Steps,Form,Input,Select,Button,message } from 'antd'
import style from './scss/News.module.scss'
import { categories } from 'api/categories'
import NewsEditor from 'components/NewsManage/NewsEditor'
import { useNavigate,useParams } from 'react-router-dom'
import { news,UpdateNews } from 'api/news'

const { Option } = Select

//更新新闻
export default function Update() {
  const navigate = useNavigate()
  const [current,setcurrent] = useState(0)
  const NewsForm = useRef(null as any)
  const [categoryList,setcategoryList] = useState([])
  const [content,setcontent] = useState('' as any)
  const {id} = useParams()
  const [formInfo,setformInfo] = useState({})

  useEffect(() => {
    getCategories()
  },[])

  useEffect(() => {
    getNews()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id])

  const getCategories = async () => {
    const data = await categories()
    setcategoryList(data)
  }

  const getNews = async () => {
    const data = await news({},id,['_expand=category','_expand=role'])
    let {title,categoryId,content} = data
    // 设置表单数据（step0)
    NewsForm.current.setFieldsValue({
      title,
      categoryId
    })
    // 设置富文本数据（step1)
    setcontent(content)
  }
  
  const handleSave = async (auditState:number) => {
    const data = await UpdateNews(id,{
      ...formInfo,
      "content": content,
      "auditState": auditState,
    })
    console.log('保存草稿箱',id,data); 
    
  }

  const handleNext = () => {
    console.log('下一步');
    if(current === 0){
      //获取表单数据
      NewsForm.current.validateFields().then((res:any) => {
        setformInfo(res)
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
    console.log('上一步');
    setcurrent(current - 1)
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
    labelCol: { 
      // span: 4
      flex: '110px'
    },
    wrapperCol: { 
      // span: 20
      flex: 1 
    },
  }

  return (
    <div>
      <PageHeader 
        className="site-page-header"
        title="更新新闻"
        onBack={()=> window.history.back()}
        subTitle="This is a subtitle"/>

        <Steps items={stepsItem} current={current}  />

        <div className={current === 0 ? style.interval : style.active}>
          <Form
            {...layout}
            name='base'
            ref={NewsForm}>
              <Form.Item label="新闻标题" name="title" rules={[{ required: true, message: '请输入新闻标题' }]}>
                <Input/>
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

        <div className={current === 1 ? style.interval : style.active}>
          <NewsEditor 
            getCount={(value:any) => {
              setcontent(value)
            }}
            content={content}/>
        </div>

        <div className={current === 2 ? style.interval : style.active}>
          <div
            dangerouslySetInnerHTML = {{ __html: content }}
            style={{
              margin:"24px 0",
              padding:'15px',
              border:"1px solid gray",
              height:'500px',
              overflow: 'hidden',
              overflowY: 'auto',
            }}></div>
        </div>

        <div style={{marginTop:'50px'}}>
          {
            current === 2 && <span>
              <Button type="primary" onClick={() => handleSave(0)}>保存草稿箱</Button>
              <Button danger onChange={() => handleSave(1)}>提交审核</Button>
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