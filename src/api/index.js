import ajax from './axios'

// 微信认证获取跳转地址接口
const wechatAuthUrl = 'common/getWechatAuthUrl'

// 用户基本信息
const registerUrl = 'common/bind'
const loginUrl = 'common/login'
const personAuthUrl = 'member/personAuth'
const sendMsgUrl = 'common/sendMsg'
const personAuthDetailUrl = 'member/personAuthDetail'
const feedBackUrl = 'member/feedBack'
const unBindUrl = 'member/unbound'
const checkIsAuthUrl = 'member/getApproveStatus'
const userInfoUrl = 'member/userInfo'
const settingUrl = 'system/setting'



export default {
    // 微信认证获取跳转路径接口
    wechatAuth(params) {
        return ajax.post(wechatAuthUrl, params)
    },
    sendMsg(params) {
        return ajax.post(sendMsgUrl, params)
    },
    register(params) {
        return ajax.post(registerUrl, { form: params })
    },
    login() {
        return ajax.post(loginUrl, {
            openid: sessionStorage.getItem('openId')
        })
    },
    upload(params) {
        return ajax.post(uploadUrl, params)
    },
    personAuth(params) {
        return ajax.post(personAuthUrl, { form: params })
    },
    personAuthDetail() {
        return ajax.post(personAuthDetailUrl)
    },
    feedBack(params) {
        return ajax.post(feedBackUrl, { form: params })
    },
    unBind() {
        return ajax.post(unBindUrl)
    },
    checkIsAuth() {
        return ajax.post(checkIsAuthUrl)
    },
    userInfo() {
        return ajax.post(userInfoUrl)
    }
}