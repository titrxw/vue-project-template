import Vue from 'vue'
import RouterConf from './router.js'
import Router from 'vue-router'

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


  let lastTime = sessionStorage.getItem('last_login_time')
  let curTime = Date.parse(new Date()) / 1000;
  if (lastTime && (curTime - lastTime) > (Vue.onlineHour * 60 * 55)) {
    sessionStorage.removeItem('token')
  }


  let token = sessionStorage.getItem('token')

  if (to.meta.requireLogin === true && !token) {
    sessionStorage.setItem('redirect', to.fullPath)
    next({
      path: '/login'
    })
  } else {
    if ((to.path === '/login' || to.name === 'Login') && token) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

export default router
