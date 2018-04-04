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

  let token = sessionStorage.getItem('token')

  // if (to.meta.requireWechatAuth === true && sessionStorage.getItem('wechatAuth') != 'true') {
  //   sessionStorage.setItem('redirect', to.fullPath)
  //   next({
  //     path: '/auth'
  //   })
  // } else {
  //   if (to.meta.requireLogin === true && !token) {
  //     sessionStorage.setItem('redirect', to.fullPath)
  //     next({
  //       path: '/login'
  //     })
  //   } else {
  //     if (to.meta.requireUserAuth === true && sessionStorage.getItem('userAuthStatus') != 2) {
  //       next({path: to.meta.userAuthPath, query: {from: to.path}})
  //     } else {
  //       if ((to.path === '/login' || to.name === 'Login') && token) {
  //         next({
  //           path: '/'
  //         })
  //       } else {
  //         next()
  //       }
  //     }
  //   }
  // }

  // 不需要微信认证的路由
  if (to.meta.requireLogin === true && !token) {
    sessionStorage.setItem('redirect', to.fullPath)
    next({
      path: '/login'
    })
  } else {
    if (to.meta.requireUserAuth === true && sessionStorage.getItem('userAuthStatus') != 2) {
      next({path: to.meta.userAuthPath, query: {from: to.path}})
    } else {
      if ((to.path === '/login' || to.name === 'Login') && token) {
        next({
          path: '/'
        })
      } else {
        if ((to.path === '/login' || to.name === 'Login') && !sessionStorage.getItem('redirect')) {
          sessionStorage.setItem('redirect', '/')
        }
        next()
      }
    }
  }
})

export default router
