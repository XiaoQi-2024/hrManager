import axios from 'axios'
import store from '@/store' // index可以忽略
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址
  timeout: 10000
}) // 创建一个axios实例

// 请求拦截 成功1，失败2
service.interceptors.request.use((config) => {
  // 向请求头中注入token
  if (store.getters.token) {
    config.headers.Authorization = 'Bearer ${store.getters.token}'
  }
  return config
}, (error) => {
  // 失败执行promise
  return Promise.reject(error)
})

// 响应拦截 成功1，失败2
service.interceptors.response.use((response) => {
  // 成功执行
  // axios会默认加一层dat的包裹
  const { success, message, data } = response.data
  if (success) {
    return data // 返回用户所需的数据
  } else {
    // 业务失败时
    Message.error(message) // 提示消息
  }
}, (error) => {
  Message.error(error.message) // 提示错误
  // 失败执行promise
  return Promise.reject(error)
})

export default service
