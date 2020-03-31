import Vue from 'vue'
import RouterConf from './router.js'
import Router from 'vue-router'
import login from './login'

Vue.use(Router)

let router = new Router({
  routes: RouterConf
})

router.beforeEach(function (to, from, next) {
  let title = ''
  if (to.meta.title && to.meta.title !== '') {
    title = to.meta.title
    document.title = title
  }

  if (login(to, from, next)) {
    next()
  }
})

export default router
