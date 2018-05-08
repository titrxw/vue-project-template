import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router'
import qs from 'qs'
// 配置
axios.defaults.timeout = 50000
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.baseURL = Vue.ENV_PRODUCATION ? 'http://www.baidu.com/kc/' : 'kc'

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
      config.data = qs.stringify(config.data)
    } else if (config.method === 'get') {
      if (token) {
        config.params['token'] = token
      }
    }
    return config
  },
  error => {
    store.commit('msg', '系统错误')
    return false
  }
)
axios.interceptors.response.use(
  response => {
    if (typeof response.data == 'string') {
      store.commit('msg', '系统错误')
      return false
    }
    switch (response.data.ret) {
      case 200:
        return response.data.data
        break
      // 业务需要 
      case 302:
        return false
        break
      case 300:
      // 登录超时
        sessionStorage.removeItem('token')
        router.replace({
          path: '/login'
        })
        return false
        break
      case 404:
        router.push({ path: '/404' });
        return false;
        break;
      // 业务消息处理
      case 600:
        // 通过msg判断
        response.data.data = null
        return response.data
        break
      default:
        if (response.data.ret) {
          store.commit('msg', response.data.msg)
          return false
        }
        // 第三方数据
        return response.data
        break
    }
  },
  error => {
    store.commit('msg', '系统错误')
    return false
  }
)
export default axios
