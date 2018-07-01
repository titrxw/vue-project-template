import storage from './storage'
export default class Wechat {
    static openId = null
    static wechatAuthSuccess(openId) {
        this.openId = openId
        storage.session.set('openId', openId)
    }
    static getOpenId() {
        if (!this.openId) {
            this.openId = storage.session.get('openid')
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