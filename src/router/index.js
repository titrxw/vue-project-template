import RouterConf from './router.js'
import {createRouter, createWebHashHistory} from 'vue-router'
import login from './login'

let router = createRouter({
  routes: RouterConf,
  history: createWebHashHistory()
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
