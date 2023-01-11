import request from 'api/request'

//新闻分类列表
export function categories (param?: any): Promise<any> {
  return request.get('/categories', param)
}

//修改新闻分类信息
export function undateCategories (UrlStr: number | string,param?: any): Promise<any> {
  return request.patch('/categories',UrlStr,param)
}

//删除新闻分类信息
export function deleteCategories (UrlStr: number | string): Promise<any> {
  return request.delete('/categories', UrlStr)
}