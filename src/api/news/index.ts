import request from 'api/request'

//新闻列表
export function news (param: any): Promise<any> {
  return request.get('/news', param)
}

//上传新闻
export function addNews (param: any): Promise<any> {
  return request.post('/news', param)
}