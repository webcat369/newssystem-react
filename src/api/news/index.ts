import request from 'api/request'

//新闻列表
export function news (param: any): Promise<any> {
  return request.get('/news', param)
}

//上传新闻
export function addNews (param: any): Promise<any> {
  return request.post('/news', param)
}

//修改新闻
export function UpdateNews (UrlStr:number | string,param: any): Promise<any> {
  return request.patch('/news', UrlStr, param)
}

//删除新闻
export function DeleteNews (UrlStr:number | string): Promise<any> {
  return request.delete('/news', UrlStr)
}