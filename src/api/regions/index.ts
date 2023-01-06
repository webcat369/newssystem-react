import request from 'api/request'

export function regions (param?: any): Promise<any> {
  return request.get('/regions', param)
}