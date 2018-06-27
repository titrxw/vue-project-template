import ajax from './axios'
export default class base {
    static post(url, data, header = {}) {
        return ajax.post(url, data, header)
    }
    static get(url, data, header = {}) {
        return ajax.get(url, data, header)
    }
}