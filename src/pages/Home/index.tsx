import React,{useRef,useState,useEffect} from 'react'
import { Col, Row, Card, Avatar, List, Drawer } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import {news} from 'api/news'
// 按需引入lodash
import {groupBy} from 'lodash-es'
// 按需引入echarts
import * as Echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import {   
  BarChart,
  PieChart
} from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent
} from 'echarts/components';

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

import {themeStyles} from '../../style/style'
import {connect} from 'react-redux'

// 注册必须的组件
Echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  PieChart,
  LegendComponent,
  DatasetComponent,
  CanvasRenderer
]);
const { Meta } = Card;

function Home(props:any) {
  const barRef = useRef(null)
  const pieRef = useRef(null)
  const [viewList,setviewList] = useState([])
  const [starList,setstarList] = useState([])
  const [allList,setallList] = useState([])
  const [visible, setvisible] = useState(false)
  const [pieChart, setpieChart] = useState(null)
  const {username,region, role:{roleName} } = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || '') : null
  
  //初始化列表
  useEffect(() => {
    getViewList()
    getStarList()
    console.log(props.theme,'111111111');
    
  },[])

  useEffect(() => {
    getBarView()
    
    return () => {
      window.onresize = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const getViewList = async () => {
    const data = await news({
      publishState:2,
      _expand:'category',
      _sort:'view', // 根据view字段排序
      _order:'desc', // desc:降序，asc:升序
      _limit:6 // 限制6条
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

  const getBarView = async () => {
    const data = await news({
      publishState:2,
      _expand:'category'
    })

    console.log(data,'柱状图');
    console.log(groupBy(data,item => item.category.title),'lodash');
    
    //柱状图
    renderBarView(groupBy(data,item => item.category.title))
    //饼图
    setallList(data)
  }

  //初始化饼图
  const renderPieView = () => {
    console.log('饼图');
    let currentList = allList.filter((item:any) => item.author === username)
    let groupObj = groupBy(currentList,(item:any) => item.category.title)
    let list:any = []
    for(let i in groupObj){
      list.push({
        name:i,
        value:groupObj[i].length
      })
    }

    let myChart:any;
    if(!pieChart){
      myChart = Echarts.init(pieRef.current as unknown as HTMLDivElement)
      setpieChart(myChart)
    }else{
      myChart = pieChart
    }

    let option = {
      title: {
          text: '当前用户新闻分类图示',
          // subtext: '纯属虚构',
          left: 'center'
      },
      tooltip: {
          trigger: 'item'
      },
      legend: {
          orient: 'vertical',
          left: 'left',
      },
      series: [
          {
              name: '发布数量',
              type: 'pie',
              radius: '50%',
              data: list,
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
      ]
    };
    option && myChart.setOption(option);
  }

  //初始化柱状图
  const renderBarView = (obj:any) => {
    var myChart = Echarts.init(barRef.current as unknown as HTMLDivElement);
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel:{
          rotate:"45",
          interval:0
      }
      },
      yAxis: {
        minInterval: 1
      },
      series: [{
        name: '数量',
        type: 'bar',
        data: Object.values(obj).map((item:any) => item.length)
      }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // 图表响应
    window.onresize= ()=>{
      console.log("resize")
      myChart.resize()
    }
  }

  const onClose = () => {
    setvisible(false)
  }

  const stylesTheme = themeStyles['light']
  console.log(stylesTheme.backgroundColor1,'stylesTheme');
  
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={true} style={stylesTheme.backgroundColor1}>
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
              <SettingOutlined key="setting" onClick={() => {
                setvisible(true)
                // 报错：Initialize failed: invalid dom. 解决办法：setTimeout
                setTimeout(()=>{
                  renderPieView()
                },10)
              }}/>,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt='person'/>}
              title={username}
              description={
                <div>
                  <span>{region ? region : '全球'}</span>
                  <span style={{marginLeft:'30px'}}>{roleName}</span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      <Drawer width="500px"
              title="个人新闻分类" 
              placement="right" 
              closable={true}
              onClose={onClose} 
              open={visible}
              >
        <div ref={pieRef} style={{
          width:'100%',
          height:'400px',
          marginTop:"30px"
        }}></div>
      </Drawer>

      <div ref={barRef} style={{
        width:'100%',
        height:'300px',
        marginTop:"30px"
      }}></div>
    </div>
  )
}

const mapStateToProps = ({ThemeRender:{theme}}:any)=>({theme})

export default connect(mapStateToProps)(Home)