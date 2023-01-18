import base from './base'
// import global from '../config/global'
import Toast from '../components/Toast/index'
import {encode} from 'utils/rsa'
import {store} from '../redux/store'

function urlHandle (url: string) {
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url
  } else if (url.startsWith('/')) {
    return base.baseUrl + url.substr(0)
  } else {
    return base.baseUrl + url
  }
}

function netTimeout (netPromise: Promise<any>, timeout: number = 30000) {
  let timeoutFn: any
  let timeoutPromise: Promise<any> = new Promise((resolve, reject) => {
    timeoutFn = setTimeout(() => {
      Toast.show('请求超时')
      reject(new Error('timeout promise'))
    }, timeout)
  })

  // promise.race([p1,p2,p3]) 哪个结果获得的快，就返回那个结果,不论成功状态还是失败状态
  let abortablePromise: Promise<any> = Promise.race([
    netPromise.then((data) => {
      clearTimeout(timeoutFn)
      return Promise.resolve(data)
    }).catch((err) => {
      clearTimeout(timeoutFn)
      return Promise.reject(err)
    }),
    timeoutPromise,
  ])
  return abortablePromise
}

const request: {
  get(url: string, params?: { [key: string]: string | number },urlStr?:string | number,urlArr?:string[], options?: { [key: string]: string | number }): Promise<any>;
  post(url: string, params?: { [key: string]: string | number }, options?: { [key: string]: string | number }): Promise<any>;
  patch(url: string, urlStr?: string | number | undefined, params?: { [key: string]: string | number }, options?: { [key: string]: string | number }): Promise<any>;
  delete(url: string, urlStr?: string | number, options?: { [key: string]: string | number }): Promise<any>;
} = {
  get (url,params = {},urlStr,urlArr = [], options) {
    let str = urlStr ? '/' + urlStr : ''
    let newUrl = urlHandle(url) + str
    let paramsArray: string[] = []
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
    newUrl = Object.keys(params).length === 0 ? newUrl : urlArr.length === 0 ? newUrl + '?' + paramsArray.join('&') : urlArr.join('&')

    let request = new Promise((resolve, reject) => {
      fetch(newUrl)
        .then((response) => {
          // 显示loading
          store.dispatch({
            type:"change_loading",
            payload:true
          })
          // 得到的是一个promise对象，用于获取后台返回的数据
          // eslint-disable-next-line no-throw-literal
          if (response.status !== 200) throw { type: 'status', status: response.status, msg: response.statusText }
          return response.json() // 返回json对象形式
        })
        .then((data) => {
          // 这里才是得到的最终数据
          // if (data.Code !== base.successCode && data.Code !== base.noDataCode) {
          //   if (data.Code === base.loginInvalidCode) {
          //     global.token = ''
          //   }
          //   // eslint-disable-next-line no-throw-literal
          //   throw { type: 'code', code: data.Code, msg: data.Msg }
          // }
          //隐藏loading
          store.dispatch({
            type:"change_loading",
            payload:false
          })
          resolve(data)
        })
        .catch((err) => {
          //隐藏loading
          store.dispatch({
            type:"change_loading",
            payload:false
          })
          if (!options || !options.noToast) {
            let text
            if (err.type === 'status' || err.type === 'code') {
              text = err.msg
            } else {
              text = '网络连接失败，请检查网络设置'
            }
            Toast.show(text || '服务器繁忙', 3000)
          }
          reject(err)
        })
    })
    return netTimeout(request)
  },
  post (url, params = {}, options) {
    let newUrl = urlHandle(url)
    let request = new Promise((resolve, reject) => {
      fetch(newUrl, {
        method: 'POST',
        body: options?.isEncrypt ? encode(JSON.stringify(params)) : JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json'
        }
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded'
        // },
        // body: "key=value"
      })
        .then((response) => {
          // 显示loading
          store.dispatch({
            type:"change_loading",
            payload:true
          })      

          // 得到的是一个promise对象，用于获取后台返回的数据
          // eslint-disable-next-line no-throw-literal
          // if (response.status !== 200) throw { type: 'status', status: response.status, msg: response.statusText }
          return response.json()
        })
        .then((data) => {
          //隐藏loading
          store.dispatch({
            type:"change_loading",
            payload:false
          })
          // 这里才是得到的最终数据
          // if (data.Code !== base.successCode && data.Code !== base.noDataCode) {
          //   if (data.Code === base.loginInvalidCode) {
          //     global.token = ''
          //   }
          //   // eslint-disable-next-line no-throw-literal
          //   throw { type: 'code', code: data.Code, msg: data.Msg }
          // }
          // try {
          //   if (options?.cache) {
          //     sessionStorage.setItem(options?.cache + '', JSON.stringify(data))
          //   }
          // } catch (err) {
          //   console.log('缓存出错')
          // }
          resolve(data)
        })
        .catch((err) => {
          //隐藏loading
          store.dispatch({
            type:"change_loading",
            payload:false
          })
          if (!options || !options.noToast) {
            let text
            if (err.type === 'status' || err.type === 'code') {
              text = err.msg
            } else {
              text = '网络连接失败，请检查网络设置'
            }
            Toast.show(text || '服务器繁忙', 3000)
          }
          reject(err)
        })
    })
    return netTimeout(request)
  },
  patch(url,urlStr, params = {},options){
    let str = urlStr ? '/' + urlStr : ''
    let newUrl = urlHandle(url) + str
    let request = new Promise((resolve, reject) => {
      fetch(newUrl, {
        method: 'PATCH',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          // 显示loading
          store.dispatch({
            type:"change_loading",
            payload:true
          })
          return response.json()
        })
        .then((data) => {
          console.log(data,'fatch');
          //隐藏loading
          store.dispatch({
            type:"change_loading",
            payload:false
          })
          resolve(data)
        })
        .catch((err) => {
          //隐藏loading
          store.dispatch({
            type:"change_loading",
            payload:false
          })
          if (!options || !options.noToast) {
            let text
            if (err.type === 'status' || err.type === 'code') {
              text = err.msg
            } else {
              text = '网络连接失败，请检查网络设置'
            }
            Toast.show(text || '服务器繁忙', 3000)
          }
          reject(err)
        })
    })
    return netTimeout(request)
  },
  delete(url,urlStr,options){
    let str = urlStr ? '/' + urlStr : ''
    let newUrl = urlHandle(url) + str
    let request = new Promise((resolve, reject) => {
      fetch(newUrl, {
        method: 'DELETE',
      })
        .then((response) => {
          // 显示loading
          store.dispatch({
            type:"change_loading",
            payload:true
          })
          return response.json()
        })
        .then((data) => {
          console.log(data,'fatch');
          //隐藏loading
          store.dispatch({
            type:"change_loading",
            payload:false
          })
          resolve(data)
        })
        .catch((err) => {
          //隐藏loading
          store.dispatch({
            type:"change_loading",
            payload:false
          })
          if (!options || !options.noToast) {
            let text
            if (err.type === 'status' || err.type === 'code') {
              text = err.msg
            } else {
              text = '网络连接失败，请检查网络设置'
            }
            Toast.show(text || '服务器繁忙', 3000)
          }
          reject(err)
        })
    })
    return netTimeout(request)
  }
}

export default request
