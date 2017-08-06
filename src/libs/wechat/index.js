import Vue from 'vue'
import { WechatPlugin } from 'vux'
import conf from './conf'
import Apis from './apis'
Vue.use(WechatPlugin)

class WeChat {
  _apiStatusList = {}
  _wx = null
  _conf = {}
  _apis = {}
  constructor (wx, conf, apis) {
    this._wx = wx
    this._conf = conf
    this._apis = apis
  }
  init () {
    this.initConf()
    this.bindCallBack()
  }
  initConf () {
    this._wx.config(this._conf)
  }
  bindCallBack () {
    let handle = this
    this._wx.ready(function () {
      handle.checkApi()
    })
    this._wx.error(function () {
      console.log('error')
    })
  }
  checkApi () {
    let handle = this
    this._wx.checkJsApi({
      jsApiList: handle._conf['jsApiList'],
      success: function (res) {
        handle._apiStatusList = res['checkResult']
      }
    })
  }
  api (name, args, callback) {
    if (this._conf['jsApiList'].indexOf[name] < 0) {
      console.log('error')
      return false
    }
    if (this._apis[name] !== null) {
      this.apis[name]({wx: this._wx, args: args}, callback)
    } else {
      console.log(name + 'not exists')
    }
  }
}

export default new WeChat(Vue.wechat, conf.conf(), Apis)
