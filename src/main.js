import Vue from 'vue'
import App from './App'
import YDUI from 'vue-ydui'
import store from './store'
import router from './router'
import vuexI18n from 'vuex-i18n'
require('./conf/index')
import 'vue-ydui/dist/ydui.rem.css'
import './assets/style/common.less'
Vue.use(YDUI)
Vue.use(vuexI18n.plugin, store)

// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: require('./assets/images/error.png'),
  loading: require('./assets/images/load.gif'),
  attempt: 3
})

// 二维码
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

// 高德地图
import VueAMap from 'vue-amap'
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'd9ad499bdc16deccdf5f315a156caa41',
  plugin: ['AMap.Geolocation']
})



// 输入框和键盘问题
if (/Android/gi.test(navigator.userAgent)) {
  window.addEventListener('resize', function () {
  　　if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
      　　window.setTimeout(function () {
　　　　　　　　　document.activeElement.scrollIntoViewIfNeeded();
          }, 0);
      }
  })
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
