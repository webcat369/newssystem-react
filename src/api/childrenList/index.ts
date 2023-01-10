import request from 'api/request'

//子路由列表
export function childrenList (param?: any): Promise<any> {
  return request.get('/children', param)
}

//修改子路由列表
export function UpdateChildrenList (UrlStr:number|string, param?: any): Promise<any> {
  return request.patch('/children',UrlStr, param)
}

//删除子路由
export function DeleteChildrenList (UrlStr:number|string): Promise<any> {
  return request.delete('/children',UrlStr)
}