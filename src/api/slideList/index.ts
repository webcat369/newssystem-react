import request from 'api/request'

//侧边栏信息
export function slideList (param?: any): Promise<any> {
  return request.get('/rights', param)
}