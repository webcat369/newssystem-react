import React from 'react'
import NewsPublish from 'components/PublishManage/NewsPublish'
import usePublish from 'components/PublishManage/usePublish'
import {Button} from 'antd'

//已下线 3
export default function Sunset() {
  const {dataSource,handleDelete} = usePublish(3)
  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(id:number) => <Button danger onClick={() => handleDelete(id)}>删除</Button>}/>
    </div>
  )
}