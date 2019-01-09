import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router'
// 配置
axios.defaults.timeout = 50000
axios.defaults.baseURL = Vue.apiHost


axios.tpost = axios.post
axios.tget = axios.get

axios.post = async (url, data, header = {}) => {
  if (Vue.beforeRequest) {
    Vue.beforeRequest()
  }
  let result = await axios.tpost(url, data, header)
  if (Vue.afterRequest) {
    Vue.afterRequest(result)
  }
  return result
}

axios.get = async (url, data, header = {}) => {
  if (Vue.beforeRequest) {
    Vue.beforeRequest()
  }
  let result = await axios.tget(url, data, header)
  if (Vue.afterRequest) {
    Vue.afterRequest(result)
  }
  return result
}

axios.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem('token')
    if (config.method === 'post') {
      if (!config.data) {
        config.data = {};
      }
      if (token) {
        config.data['token'] = token
      }
    } else if (config.method === 'get') {
      if (token) {
        config.params['token'] = token
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    if (typeof response.data == 'string') {
      store.commit('error', '数据格式错误' + response.data)
      return false
    }

    switch (response.data.ret) {
      case 200:
        return response.data.data
        // 业务需要 
      case 302:
        router.replace({
          path: '/login'
        })
        return false
      case 401:
        // 登录超时
        sessionStorage.removeItem('token')
        router.replace({
          path: '/login'
        })
        return false
        // 业务消息处理
      case 600:
        // 通过msg判断
        response.data.data = null
        return response.data
      default:
        if (response.data.ret) {
          store.commit('msg', response.data.msg)
          return false
        }
        // 第三方数据
        return response.data
    }
  },
  error => {
    store.commit('error', error.message)
    store.commit('netStatus', false)
    return false
  }
)
export default axios
