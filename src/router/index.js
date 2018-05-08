import Vue from 'vue'
import Router from 'vue-router'
import RouterConf from './router.js'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: RouterConf
})

router.beforeEach(function (to, from, next) {
  let title = ''
  if (to.meta.title && to.meta.title !== '') {
    title = to.meta.title
    document.title = title
  }

  // 检测token是否过期 2小时在线（前5分钟过期）
  let lastTime = sessionStorage.getItem('last_login_time')
  let curTime = Date.parse(new Date()) / 1000;
  if (lastTime && (curTime - lastTime) > ( 2 * 60 * 55 )) {
    sessionStorage.removeItem('token')
  }


  let token = sessionStorage.getItem('token')
  // 检测微信授权
  if (Vue.ENV_PRODUCATION && to.meta.requireWechatAuth === true && sessionStorage.getItem('wechatAuth') != 'true') {
    sessionStorage.setItem('redirect', to.fullPath)
    next({
      path: '/auth'
    })
  } else {
    // 账户绑定认证
    if (to.meta.requireLogin === true && !token) {
      sessionStorage.setItem('redirect', to.fullPath)
      next({
        path: '/login'
      })
    } else {
      // 业务 用户实名认证验证
      if (to.meta.requireUserAuth === true && sessionStorage.getItem('userAuthStatus') != 3) {
        next({path: to.meta.userAuthPath, query: {from: to.path}})
      } else {
        if ((to.path === '/login' || to.name === 'Login') && token) {
          next({
            path: '/'
          })
        } else {
          next()
        }
      }
    }
  }
})
export default router
