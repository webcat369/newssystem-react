import request from 'api/request'

export function users (param: any): Promise<any> {
  return request.get('/users', param)
}

export function handleuUers (urlStr:string|number,param: any): Promise<any> {
  return request.patch('/users',urlStr, param)
}
