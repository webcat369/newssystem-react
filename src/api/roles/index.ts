import request from 'api/request'

export function roles (param?: any): Promise<any> {
  return request.get('/roles', param)
}