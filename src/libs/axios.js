import axios from 'axios'
import store from '../store/store'
axios.defaults.timeout = 5000
// code状态码200判断
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.interceptors.response.use((res) => {
  if (res.status === 200) {
    if (res.data && res.data !== '') {
      try {
        res.data = JSON.parse(res.data)
      } catch (e) {
        res.data = {ret: 400, data: {}, msg: 'data format error'}
      }
      if (res.data.ret === 200) {
        store.commit('requestSuccess')
      } else {
        store.commit('requestFail', res.data.msg)
      }
    } else {
      store.commit('requestFail', 'return null')
      return Promise.reject(res)
    }
  }
  if (res.status !== 200) {
    store.commit('requestFail', res.status)
    return Promise.reject(res)
  }
  return Promise.resolve(res)
}, (error) => {
  console.log('promise error:' + error)
  return Promise.reject(error)
})
export default axios
