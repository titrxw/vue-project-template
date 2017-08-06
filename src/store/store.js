import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import frame from './frame'
import user from './user'
import Net from './net'
import wechat from './wechat'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    frame: frame,
    user: user,
    wechat: wechat,
    net: Net
  }
})
