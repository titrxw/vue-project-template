import Vue from 'vue'
import App from './App'
import './env'
import './conf'
import YDUI from 'vue-ydui'
import store from './store'
import router from './router'
import 'vue-ydui/dist/ydui.rem.css'
import './assets/style/common.less'
Vue.use(YDUI)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
