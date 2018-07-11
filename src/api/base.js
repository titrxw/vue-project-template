import ajax from './axios'
import Vue from 'vue'
export default class base {
    static async post(url, data, header = {}) {
        Vue.submit()
        let result = await ajax.post(url, data, header)
        Vue.unSubmit()
        return result
    }
    
    static async get(url, data, header = {}) {
        Vue.submit()
        let result = await ajax.get(url, data, header)
        Vue.unSubmit()
        return result
    }
}