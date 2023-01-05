import request from 'api/request'

export function slideList (param: any): Promise<any> {
  return request.get('/rights', param)
}