import request from 'api/request'

//获取用户列表
export function users (param: any): Promise<any> {
  return request.get('/users', param)
}

//修改用户状态
export function patchUers (urlStr:string|number,param: any): Promise<any> {
  return request.patch('/users',urlStr, param)
}

//新增用户
export function postUers (param: any): Promise<any> {
  return request.post('/users',param)
}
