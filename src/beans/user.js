import store from '@/store'
import storage from '@/libs/storage'
export default class User {
    static token = null
    static login(result) {
        this.token = result.token
        storage.session.set('token', result.token)
        storage.session.set('last_login_time', Date.parse(new Date()) / 1000)
    }
    static unlogin() {
        this.token = null
        storage.session.delete('token')
        storage.session.delete('last_login_time')
    }
    static getToken() {
        let lastTime = storage.session.get('last_login_time')
        let curTime = Date.parse(new Date()) / 1000;
        if (lastTime && (curTime - lastTime) > (2 * 60 * 55)) {
            this.unlogin()
        }
        if (!this.token) {
            this.token = storage.session.get('token')
        }
        if (this.token) {
            storage.session.set('last_login_time', Date.parse(new Date()) / 1000)
            return this.token
        }
        return null
    }
}