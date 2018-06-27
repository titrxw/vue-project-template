import base from './base'
import wechat from '@/libs/wechat'
import user from '@/libs/user'

/**
 * 登录类
 */
export default class Auth extends base {
    // 微信认证获取跳转路径接口
    static async wechatAuth(scope = 'snsapi_base') {
        let result = await this.post('common/getWechatAuthUrl', { scope: scope })
        if (result) {
            window.location.href = result.url
        }
    }
    static sendMsg(params) {
        return this.post('common/sendMsg', { mobile: params })
    }
    static async register(params) {
        let result = await this.post('common/bind', { form: params })
        if (result) {
            user.login(result)
        }
        return result
    }
    static async login() {
        let result = await this.post('common/login', {
            openid: wechat.getOpenId()
        })
        if (result) {
            user.login(result)
        }
        return result
    }
    static unLogin() {
        this.G.token = null
    }
}