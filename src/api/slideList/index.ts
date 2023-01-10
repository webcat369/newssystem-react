import request from 'api/request'

//侧边栏（侧边路由）信息
export function slideList (param?: any): Promise<any> {
  return request.get('/rights', param)
}

//修改侧边栏（侧边路由）信息
export function UpdateSlideList (UrlStr:number|string,param?: any): Promise<any> {
  return request.patch('/rights',UrlStr, param)
}

//删除侧边路由信息
export function DeleteSlideList (UrlStr:number|string): Promise<any> {
  return request.delete('/rights',UrlStr)
}