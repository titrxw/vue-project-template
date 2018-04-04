
import Vue from 'vue'
import constant from './constant'
Vue.prototype.sysConstant = constant;

/**
 * 全局函数 配置用户类型
 */
Vue.prototype.getRenterType = function () {
  return 1
}
Vue.prototype.getProprietorType = function () {
  return 2
}
Vue.prototype.getCurrentUserType = function () {
  let userType = sessionStorage.getItem('userType')
  if (userType == null) {
    userType = 1
  }
  return parseInt(userType)
}


Vue.prototype.serviceTel = ''

Vue.prototype.imgHost = ''
Vue.prototype.uploadApiHost = ''
Vue.prototype.amaApiKey = ''

Vue.prototype.faceApiKey = '_BoKIQ8_'
Vue.prototype.faceApiSecret = '-WFDLFezjhjur'


sessionStorage.setItem('openId', 'oGhJPwTVma-1oJBpnf-xEZTcnuQA')
