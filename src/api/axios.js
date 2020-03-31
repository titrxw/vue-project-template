import Vue from 'vue'
import axios from 'axios'
import store from '../store'
// 配置
axios.defaults.timeout = 50000
axios.defaults.baseURL = Vue.apiHost

axios.interceptors.request.use(
    config => {
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

        switch (response.data.code) {
            case 200:
                return response.data.data
            default:
                if (response.data.code) {
                    store.commit('msg', response.data.error)
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
        return false
    }
)
export default axios