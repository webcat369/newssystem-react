import request from 'api/request'

export function childrenList (param: any): Promise<any> {
  return request.get('//children', param)
}