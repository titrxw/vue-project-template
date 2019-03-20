import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router'
// 配置
axios.defaults.timeout = 50000
axios.defaults.baseURL = Vue.apiHost

axios._cancelQueue = []
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



let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (ever) => {
  for(let p in pending){
    if(pending[p].url === ever.url + '&' + ever.method + '&' + ever.data) { //当当前请求在数组中存在时执行函数体
      pending[p].cancel(); //执行取消操作  取消的是前面的请求
      let index= axios._cancelQueue.indexOf(pending[p].cancel)
      if (index >= 0) {
        axios._cancelQueue.splice(index,1)
      }
      pending.splice(p, 1); //把这条记录从数组中移除
    }
  }
}



axios.interceptors.request.use(
  config => {
    let token = Vue.storage.get('token')
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


    removePending(config); //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c)=>{
      axios._cancelQueue.push(c)
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ url: config.baseURL + '/' + config.url + '&' + config.method + '&' + JSON.stringify(config.data), cancel: c });  
    });


    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    // 也可以延时删除
    let timer = setTimeout(() => {
      removePending(response.config);  //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
      clearTimeout(timer)
    },600)
    
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
        Vue.storage.delete('token')
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
    if (axios.isCancel(error)) {
      return false
    }
    
    store.commit('error', error.message)
    store.commit('netStatus', false)
    return false
  }
)
export default axios
