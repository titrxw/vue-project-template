import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: function (resolve) {
        console.log(resolve)
        require(['../pages/NotFound'], resolve)
      }
    },
    {
      path: '/',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true,
        keepAlive: false
      },
      component: function (resolve) {
        console.log(resolve)
        require(['../pages/Home'], resolve)
      }
    },
    {
      path: '/cart',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: function (resolve) {
        require(['../pages/cart'], resolve)
      }
    },
    {
      path: '/order',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: function (resolve) {
        require(['../pages/order'], resolve)
      }
    },
    {
      path: '/user',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: function (resolve) {
        require(['../pages/user'], resolve)
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: function (resolve) {
        require(['../pages/Login'], resolve)
      }
    },
    {
      path: '/article',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: function (resolve) {
        require(['../pages/article'], resolve)
      }
    },
    {
      path: '/orderDetail',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: function (resolve) {
        require(['../pages/orderDetail'], resolve)
      }
    },
    {
      path: '/goodDetail',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: function (resolve) {
        require(['../pages/goodDetail'], resolve)
      }
    },
    {
      path: '/commentList',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: function (resolve) {
        require(['../pages/commentList'], resolve)
      }
    },
    {
      path: '/settlement',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: function (resolve) {
        require(['../pages/settlement'], resolve)
      }
    },
    {
      path: '/address',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: function (resolve) {
        require(['../pages/address'], resolve)
      }
    },
    {
      path: '/category',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: function (resolve) {
        require(['../pages/category'], resolve)
      }
    },
    {
      path: '/search',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: function (resolve) {
        require(['../pages/search'], resolve)
      }
    },
    {
      path: '/commentGoods',
      meta: {
        // 添加该字段，表示进入这个路由是需要登录的
        requireAuth: true
      },
      component: function (resolve) {
        require(['../pages/commentGoods'], resolve)
      }
    }
  ]
})
