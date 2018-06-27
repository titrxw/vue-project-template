import store from '@/store'
export default class User {
    static token = null
    static login(result) {
        this.token = result.token
        sessionStorage.setItem('token', result.token)
        sessionStorage.setItem('last_login_time', Date.parse(new Date()) / 1000);
        store.commit("userAuthStatus", result.approveStatus);
    }
    static unlogin() {
        this.token = null
        sessionStorage.removeItem('token')
    }
    static getToken() {
        let lastTime = sessionStorage.getItem('last_login_time')
        let curTime = Date.parse(new Date()) / 1000;
        if (lastTime && (curTime - lastTime) > (2 * 60 * 55)) {
            this.unlogin()
        }
        if (!this.token) {
            this.token = sessionStorage.getItem('token')
        }
        if (this.token) {
            return this.token
        }
        return null
    }
}