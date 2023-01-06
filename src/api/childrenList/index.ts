import request from 'api/request'

//子路由列表
export function childrenList (param?: any): Promise<any> {
  return request.get('/children', param)
}