export default [
  {
    path: '/*',
    component: () => import('../view/404')
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
    component: () => import('../view/login')
  },
  {
    path: '/login',
    meta: {
      // 添加该字段，表示进入这个路由是需要登录的
      requireWechatAuth: false,
      showTabBar: false,
      showNavBar: false
    },
    component: () => import('../view/login')
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
    component: () => import('../view/wechat/auth')
  }
]
