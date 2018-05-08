
export default [
  {
    path: '*',
    component: function (resolve) {
      require(['../page/404'], resolve)
    }
  },
  {
    path: '/404',
    component: function (resolve) {
      require(['../page/404'], resolve)
    }
  },
  {
    path: '/',
    meta: {
      requireWechatAuth: true,
      requireLogin: false,
      showTabBar: true,
       
      title: '首页'
    },
    component: function (resolve) {
      require(['../page/home'], resolve)
    }
  },
  {
    path: '/login',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: false,
      showTabBar: false,
       
      title: '登录'
    },
    component: function (resolve) {
      require(['../page/login/login'], resolve)
    }
  },
  {
    path: '/auth',
    meta: {
      
      requireLogin: false,
      showTabBar: false,
      
    },
    component: function (resolve) {
      require(['../page/wechat/auth'], resolve)
    }
  }
]