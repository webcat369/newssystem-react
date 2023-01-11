import axios from 'axios'
import {store} from '../redux/store'
axios.defaults.baseURL="http://localhost:3000"

// axios.defaults.headers

// axios.interceptors.request.use
// axios.interceptors.response.use
axios.interceptors.request.use(function (config) {
    // 发送请求之前
    // 显示loading
    store.dispatch({
        type:"change_loading",
        payload:true
    })
    return config;
  }, function (error) {
    // 处理请求错误
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 在2xx范围内的任何状态代码都会触发此函数
    // 使用响应数据执行某些操作
    store.dispatch({
        type:"change_loading",
        payload:false
    })
    //隐藏loading
    return response;
  }, function (error) {
    // 任何超出2xx范围的状态代码都会触发此函数
    // 处理响应错误
    store.dispatch({
        type:"change_loading",
        payload:false
    })
     //隐藏loading
    return Promise.reject(error);
  });