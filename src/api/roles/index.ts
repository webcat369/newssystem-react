import request from 'api/request'

//角色列表
export function roles (param?: any): Promise<any> {
  return request.get('/roles', param)
}