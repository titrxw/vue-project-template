export default class Wechat {
    static openId = null
    static wechatAuthSuccess(openId) {
        this.openId = openId
        sessionStorage.setItem('openId', openId)
    }
    static getOpenId() {
        if (!this.openId) {
            this.openId = sessionStorage.getItem('openid')
        }
        if (this.openId) {
            return this.openId
        }
        return false;
    }
    static hasAuth() {
        if (this.getOpenId()) {
            return true
        }
        return false
    }
}