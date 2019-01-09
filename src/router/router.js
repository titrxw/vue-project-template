export default [
  {
    path: '*',
    component: function (resolve) {
      require(['../page/404'], resolve)
    }
  },
  {
    path: '/',
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: true,
      showNavBar: false
    },
    component: function (resolve) {
      require(['../page/login'], resolve)
    }
  },
  {
    path: '/login',
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireWechatAuth: false,
      showTabBar: false,
      showNavBar: false
    },
    component: function (resolve) {
      require(['../page/login'], resolve)
    }
  },
  {
    path: '/wechatAuth',
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireWechatAuth: false,
      showTabBar: false,
      showNavBar: false,
      keepAlive: false
    },
    component: function (resolve) {
      require(['../page/wechat/auth'], resolve)
    }
  }
]
