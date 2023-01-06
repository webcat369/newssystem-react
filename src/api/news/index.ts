import request from 'api/request'

export function news (param: any): Promise<any> {
  return request.get('/news', param)
}