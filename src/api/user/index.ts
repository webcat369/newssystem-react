import request from 'api/request'

export function users (param: any): Promise<any> {
  return request.get('//users', param)
}