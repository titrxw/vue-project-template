import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router'
import user from '@/beans/user'
import qs from 'qs'
// 配置
axios.defaults.timeout = 50000
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.baseURL = Vue.ENV_PRODUCATION ? 'http://www.baidu.com/kc/' : 'kc'

axios.interceptors.request.use(
  config => {
    let token = user.getToken()
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
        // 业务需要 
      case 302:
        return false
      case 300:
        // 登录超时
        user.unlogin()
        router.replace({
          path: '/login'
        })
        return false
      case 404:
        router.push({
          path: '/404'
        });
        return false;
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
    store.commit('msg', '系统错误')
    return false
  }
)
export default axios
