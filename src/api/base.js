import ajax from './axios'
export default class base {
    static async post(url, data, header = {}) {
        if (ajax.before) {
            ajax.before()
        }
        let result = await ajax.post(url, data, header)
        if (ajax.after) {
            ajax.after()
        }
        return result
    }
    
    static async get(url, data, header = {}) {
        if (ajax.before) {
            ajax.before()
        }
        let result = await ajax.get(url, data, header)
        if (ajax.after) {
            ajax.after()
        }
        return result
    }
}