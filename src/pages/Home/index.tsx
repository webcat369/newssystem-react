import React,{useRef,useState,useEffect} from 'react'
import { Col, Row, Card, Avatar, List } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import {news} from '../../api/news/index'

const { Meta } = Card;

export default function Home() {
  const barRef = useRef(null)
  const [viewList,setviewList] = useState([])
  const [starList,setstarList] = useState([])

  //初始化列表
  useEffect(() => {
    getViewList()
    getStarList()
  },[])
  
  const getViewList = async () => {
    const data = await news({
      publishState:2,
      _expand:'category',
      _sort:'view',
      _order:'desc',
      _limit:6
    })
    console.log(data,'用户最常浏览');
    setviewList(data)
  }

  const getStarList = async () => {
    const data = await news({
      publishState:2,
      _expand:'category',
      _sort:'star',
      _order:'desc',
      _limit:6
    })
    console.log(data,'用户点赞最多');
    setstarList(data)
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true}>
            <List
              size="small"
              bordered={false}
              dataSource={viewList}
              renderItem={(item:any) => (<List.Item>
                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
              </List.Item>)}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={true}>
            <List
                size="small"
                bordered={false}
                dataSource={starList}
                renderItem={(item:any) => (<List.Item>
                  <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>)}
              />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title="Card title"
              description="This is the description"
            />
          </Card>
        </Col>
      </Row>

      <div ref={barRef} style={{
        width:'100%',
        height:'300px',
        marginTop:"30px"
      }}></div>
    </div>
  )
}