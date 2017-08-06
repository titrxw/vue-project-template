// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import store from './store/store'
import router from './router'
import vuexI18n from 'vuex-i18n'
import Axios from './libs/axios'
import { LoadingPlugin } from 'vux'

Vue.use(vuexI18n.plugin, store)

router.beforeEach(function (to, from, next) {
  // if (to.meta.requireAuth) {
  //   store.commit('prepareLoad')
  //   if (sessionStorage.getItem(store.getters['getAccessKey'])) {
  //     next()
  //   } else {
  //     next({
  //       path: '/login',
  //       query: {redirect: to.path}
  //     })
  //   }
  // } else {
  //   if (to.path === '/login' || to.name === 'Login') {
  //     if (sessionStorage.getItem(store.getters['getAccessKey'])) {
  //       next(false)
  //     } else {
  //       store.commit('prepareLoad')
  //       next()
  //     }
  //   } else {
  //     store.commit('prepareLoad')
  //     next()
  //   }
  // }
  store.commit('prepareLoad')
  next()
})

router.afterEach(function (to) {
  store.commit('hasLoad')
})

Vue.use(LoadingPlugin)
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.$http = Axios
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
