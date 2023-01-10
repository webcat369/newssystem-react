import request from 'api/request'

//角色列表
export function roles (param?: any): Promise<any> {
  return request.get('/roles', param)
}

//修改角色信息
export function UpdateRoles (urlStr?:number | string, param?: any): Promise<any> {
  return request.patch('/roles',urlStr, param)
}

//删除角色信息
export function DeleteRoles (urlStr?:number | string): Promise<any> {
  return request.delete('/roles',urlStr)
}


