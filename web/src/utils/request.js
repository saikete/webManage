import axios from 'axios'    

// 全局操作
import router from '../router'
import store from '../store'


import apiConfig from './config'
const { robotServer: { https, bash } } = apiConfig
const http = https ? 'https' : 'http'

const request = axios.create({    //创建axios实例，在这里可以设置请求的默认配置
  timeout: 10000, // 设置超时时间10s
  // baseURL: `${http}://${bash}`  //根据自己配置的反向代理去设置不同环境的baeUrl
})



/** 添加请求拦截器 **/
request.interceptors.request.use(config => {
  store.dispatch('setGlobalLoading', true)
  return config
}, error=> {
  // 对请求错误做些什么
  return Promise.reject(error)
})

/** 添加响应拦截器  **/
request.interceptors.response.use(response => {
  store.dispatch('setGlobalLoading', false)
  const { status, data } = response
  if(status >= 200 && status < 300) {
    return data
  }
}, error => {
  store.dispatch('setGlobalLoading', false)
  return error
})

export default request