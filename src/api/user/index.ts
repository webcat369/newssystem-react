import request from 'api/request'

//获取用户列表
export function users (param: any): Promise<any> {
  return request.get('/users', param)
}

//修改用户状态
export function UpdateUers (urlStr:string|number,param?: any): Promise<any> {
  return request.patch('/users',urlStr, param)
}

//新增用户
export function addUers (param: any): Promise<any> {
  return request.post('/users',param)
}

//删除用户
export function deleteUers (urlStr:string|number): Promise<any> {
  return request.delete('/users',urlStr)
}
