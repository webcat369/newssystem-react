
import React,{useEffect,useState} from 'react'
import dayjs from 'dayjs'
import { useParams } from 'react-router-dom'
import { news } from 'api/news';
import { PageHeader,Descriptions } from 'antd';
import './scss/sacrollBar.scss'

export default function Preview() {
  const [newsInfo,setnewsInfo] = useState({} as any)
  const params = useParams()

  useEffect(() => {
    getnewsInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const getnewsInfo = async () => {
    const data = await news({
      id:params.id,
      _expand:'category',
      // _expand:'role'
    })
    setnewsInfo(data[0])
    console.log(data,'新闻预览');
  }

   // 审核状态、发布状态映射
   const auditList = ["未审核", '审核中', '已通过', '未通过']
   const publishList = ["未发布", '待发布', '已上线', '已下线']
  return (
    <div>
      {
        newsInfo && <div>
        <PageHeader
          className="site-page-header"
          onBack={() => window.history.back()}
          title={newsInfo.title}
          subTitle={newsInfo?.category?.value}
        />
        <Descriptions size='small' column={3}>
          <Descriptions.Item label="创建者">{newsInfo.author}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{dayjs(newsInfo.createTime).format("YYYY/MM/DD HH:mm:ss")}</Descriptions.Item>
          <Descriptions.Item label="发布时间">{newsInfo.publishTime ? dayjs(newsInfo.publishTime).format("YYYY/MM/DD HH:mm:ss") : "-"}</Descriptions.Item>
          <Descriptions.Item label="区域">{newsInfo.region}</Descriptions.Item>
          <Descriptions.Item label="审核状态">
           <span style={{color:'red'}}>{auditList[newsInfo.auditState]}</span>
          </Descriptions.Item>
          <Descriptions.Item label="发布状态">
            <span style={{color:'red'}}>{publishList[newsInfo.publishState]}</span>
          </Descriptions.Item>
          <Descriptions.Item label="访问数量">{newsInfo.view}</Descriptions.Item>
          <Descriptions.Item label="点赞数量">{newsInfo.star}</Descriptions.Item>
          <Descriptions.Item label="评论数量">0</Descriptions.Item>
        </Descriptions>
        <div dangerouslySetInnerHTML = {{ __html: newsInfo.content }} 
        style={{
          margin:"24px 0",
          padding:'15px',
          border:"1px solid gray",
          height:'500px',
          overflow: 'hidden',
          overflowY: 'auto',
        }}></div>
      </div>
      }
    </div>
  )
}