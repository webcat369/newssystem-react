import React from 'react'
import NewsPublish from 'components/PublishManage/NewsPublish'
import usePublish from 'components/PublishManage/usePublish'
import {Button} from 'antd'

//已发布 2
export default function Published() {
  const {dataSource,handleSunset} = usePublish(2)
  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(id:number) => <Button danger onClick={() => handleSunset(id)}>下线</Button>}/>
    </div>
  )
}