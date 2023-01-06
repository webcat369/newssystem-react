import request from 'api/request'

//区域列表
export function regions (param?: any): Promise<any> {
  return request.get('/regions', param)
}