import React from 'react'
import NewsPublish from 'components/PublishManage/NewsPublish'
import usePublish from 'components/PublishManage/usePublish'
import {Button} from 'antd'

//待发布 1
export default function Unpublished() {
  const {dataSource,handlePublish} = usePublish(1)
  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(id:number) => <Button type="primary" onClick={() => handlePublish(id)}>发布</Button> }/>
    </div>
  )
}