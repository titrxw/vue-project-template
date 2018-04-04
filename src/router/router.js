
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
    path: '/style',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: false,
      showTabBar: false,
       
      title: '多种风格'
    },
    component: function (resolve) {
      require(['../page/style'], resolve)
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
    path: '/protocol',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: false,
      showTabBar: false,
       
      title: '相寓太原用户协议'
    },
    component: function (resolve) {
      require(['../page/login/protocol'], resolve)
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
  },
  {
    path: '/user',
    meta: {
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: true,
       
      title: '个人中心'
    },
    component: function (resolve) {
      require(['../page/user/index'], resolve)
    }
  },
  {
    path: '/user/house',
    meta: {
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      requireUserAuth: false,
      userAuthPath: '/user/noAuthentication',
      title: '我的房源'
    },
    component: function (resolve) {
      require(['../page/user/house'], resolve)
    }
  },
  {
    path: '/user/ownerIndex',
    meta: {
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: true,
      title: '个人中心'
    },
    component: function (resolve) {
      require(['../page/user/ownerIndex'], resolve)
    }
  },
  {
    path: '/user/authentication',
    meta: {
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '实名认证'
    },
    component: function (resolve) {
      require(['../page/user/authentication'], resolve)
    }
  },
  {
    path: '/user/noAuthentication',
    meta: {
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false
    },
    component: function (resolve) {
      require(['../page/user/noAuthentication'], resolve)
    }
  },
  {
    path: '/user/consult',
    meta: {
      requireWechatAuth: true,
      requireLogin: false,
      showTabBar: false,
       
      'title': '客服咨询'
    },
    component: function (resolve) {
      require(['../page/user/consult'], resolve)
    }
  },
  {
    path: '/user/feedback',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '反馈'
    },
    component: function (resolve) {
      require(['../page/user/feedback'], resolve)
    }
  },
  {
    path: '/entrustContract',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      requireUserAuth: true,
      userAuthPath: '/user/noAuthentication',
      title: '我的合同'
    },
    component: function (resolve) {
      require(['../page/entrustContract/index'], resolve)
    }
  },
  {
    path: '/entrustContract/detail',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      requireUserAuth: true,
      userAuthPath: '/user/noAuthentication',
      title: '合同详情'
    },
    component: function (resolve) {
      require(['../page/entrustContract/detail'], resolve)
    }
  },
  {
    path: '/entrustContract/houseCheck',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      requireUserAuth: true,
      userAuthPath: '/user/noAuthentication',
      title: '房源交验'
    },
    component: function (resolve) {
      require(['../page/entrustContract/houseCheck'], resolve)
    }
  },
  {
    path: '/tenantContract',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      requireUserAuth: true,
      userAuthPath: '/user/noAuthentication',
      title: '合同管理'
    },
    component: function (resolve) {
      require(['../page/tenantContract/index'], resolve)
    }
  },
  {
    path: '/tenantContract/detail',
    meta: {
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      requireUserAuth: true,
      userAuthPath: '/user/noAuthentication',
      title: '合同详情'
    },
    component: function (resolve) {
      require(['../page/tenantContract/detail'], resolve)
    }
  },
  {
    path: '/service',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: true,
       
      title: '生活'
    },
    component: function (resolve) {
      require(['../page/service/index'], resolve)
    }
  },
  {
    path: '/special/detail',
    meta: {
      requireWechatAuth: true,
      showTabBar: false,
      title: '专题详情'
    },
    component: function (resolve) {
      require(['../page/special_detail'], resolve)
    }
  },
  {
    path: '/house',
    meta: {
      requireWechatAuth: true,
      showTabBar: true,
      title: '相寓好房'
    },
    component: function (resolve) {
      require(['../page/house/index'], resolve)
    }
  },
  {
    path: '/house/onlineAdd',
    meta: {
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '在线委托'
    },
    component: function (resolve) {
      require(['../page/house/onlineAdd'], resolve)
    }
  },
  {
    path: '/house/add',
    meta: {
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '发布房源'
    },
    component: function (resolve) {
      require(['../page/house/add'], resolve)
    }
  },
  {
    path: '/house/conf',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '房屋配置'
    },
    component: function (resolve) {
      require(['../page/house/conf'], resolve)
    }
  },
  {
    path: '/house/characteristic',
    meta: {
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '房屋特色'
    },
    component: function (resolve) {
      require(['../page/house/characteristic'], resolve)
    }
  },
  {
    path: '/house/require',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '出租要求'
    },
    component: function (resolve) {
      require(['../page/house/require'], resolve)
    }
  },
  {
    path: '/house/verify',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      requireUserAuth: true,
      userAuthPath: '/user/noAuthentication',
      title: '房源验证'
    },
    component: function (resolve) {
      require(['../page/house/verify'], resolve)
    }
  },
  {
    path: '/house/despics',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '房源图片'
    },
    component: function (resolve) {
      require(['../page/house/despics'], resolve)
    }
  },
  {
    path: '/house/doAdd',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '提交审核'
    },
    component: function (resolve) {
      require(['../page/house/doAdd'], resolve)
    }
  },
  {
    path: '/house/publishSuccess',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '发布房源'
    },
    component: function (resolve) {
      require(['../page/house/publishSuccess'], resolve)
    }
  },
  {
    path: '/house/udetail',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '房源详情'
    },
    component: function (resolve) {
      require(['../page/house/udetail'], resolve)
    }
  },
  {
    path: '/house/detail',
    meta: {
      requireWechatAuth: true,
      showTabBar: false,
       
      title: '房源详情'
    },
    component: function (resolve) {
      require(['../page/house/detail'], resolve)
    }
  },
  {
    path: '/house/beforeHousePics',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '上传房源美照'
    },
    component: function (resolve) {
      require(['../page/house/beforeHousePics'], resolve)
    }
  },
  {
    path: '/house/solicit',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '求租'
    },
    component: function (resolve) {
      require(['../page/house/solicit'], resolve)
    }
  },
  {
    path: '/house/solicit/success',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '求租'
    },
    component: function (resolve) {
      require(['../page/house/solicit_success'], resolve)
    }
  },
  {
    path: '/bespeak',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '房源约看'
    },
    component: function (resolve) {
      require(['../page/bespeak/index'], resolve)
    }
  },{
    path: '/bespeak/add',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '房源约看'
    },
    component: function (resolve) {
      require(['../page/bespeak/add'], resolve)
    }
  },
  {
    path: '/bespeak/sure',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '房源约看'
    },
    component: function (resolve) {
      require(['../page/bespeak/sure'], resolve)
    }
  },
  {
    path: '/bespeak/success',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '约看订单'
    },
    component: function (resolve) {
      require(['../page/bespeak/success'], resolve)
    }
  },
  {
    path: '/aptitude',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      requireUserAuth: false,
      userAuthPath: '/user/noAuthentication',
      title: '在线签约'
    },
    component: function (resolve) {
      require(['../page/aptitude/aptitude'], resolve)
    }
  },
  {
    path: '/aptitude/lease',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      requireUserAuth: true,
      userAuthPath: '/user/noAuthentication',
      title: '承租信息'
    },
    component: function (resolve) {
      require(['../page/aptitude/lease'], resolve)
    }
  },
  {
    path: '/aptitude/duty',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      requireUserAuth: true,
      userAuthPath: '/user/noAuthentication',
      title: '合同确认'
    },
    component: function (resolve) {
      require(['../page/aptitude/duty'], resolve)
    }
  },
  {
    path: '/aptitude/success',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '签约成功'
    },
    component: function (resolve) {
      require(['../page/aptitude/success'], resolve)
    }
  },
  {
    path: '/payment',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      requireUserAuth: true,
      userAuthPath: '/user/noAuthentication',
      title: '缴费'
    },
    component: function (resolve) {
      require(['../page/payment/index'], resolve)
    }
  },
  {
    path: '/payment/bills',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      requireUserAuth: true,
      userAuthPath: '/user/noAuthentication',
      title: '我的账单'
    },
    component: function (resolve) {
      require(['../page/payment/bills'], resolve)
    }
  },
  {
    path: '/payment/bill/detail',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      requireUserAuth: true,
      userAuthPath: '/user/noAuthentication',
      title: '账单详情'
    },
    component: function (resolve) {
      require(['../page/payment/detail'], resolve)
    }
  },
  {
    path: '/payment/success',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '支付成功'
    },
    component: function (resolve) {
      require(['../page/payment/success'], resolve)
    }
  },
  {
    path: '/payment/applaySuccess',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '申请成功'
    },
    component: function (resolve) {
      require(['../page/payment/applaySuccess'], resolve)
    }
  },
  {
    path: '/payment/friendPay',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '朋友代付'
    },
    component: function (resolve) {
      require(['../page/payment/friendPay'], resolve)
    }
  },
  {
    path: '/order',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '我的订单'
    },
    component: function (resolve) {
      require(['../page/order/index'], resolve)
    }
  },
  {
    path: '/orderDetail',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '订单详情'
    },
    component: function (resolve) {
      require(['../page/order/detail'], resolve)
    }
  },
  {
    path: '/entrust',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '我的委托'
    },
    component: function (resolve) {
      require(['../page/entrust/index'], resolve)
    }
  },
  {
    path: '/entrust/detail',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
       
      title: '我的委托'
    },
    component: function (resolve) {
      require(['../page/entrust/detail'], resolve)
    }
  },
  {
    path: '/notify',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: false,
      showTabBar: false,
       
      title: '我的消息'
    },
    component: function (resolve) {
      require(['../page/notify/index'], resolve)
    }
  },
  {
    path: '/question',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: false,
      showTabBar: false,
       
      title: '问大家'
    },
    component: function (resolve) {
      require(['../page/question/index'], resolve)
    }
  },
  {
    path: '/question/detail',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: false,
      showTabBar: false,
       
      title: '问大家'
    },
    component: function (resolve) {
      require(['../page/question/detail'], resolve)
    }
  },
  {
    path: '/intelligentLock',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      title: '智能锁'
    },
    component: function (resolve) {
      require(['../page/intelligentLock/index'], resolve)
    }
  },
  {
    path: '/intelligentLock/record',
    meta: {
      
      requireWechatAuth: true,
      requireLogin: true,
      showTabBar: false,
      title: '智能锁'
    },
    component: function (resolve) {
      require(['../page/intelligentLock/record'], resolve)
    }
  }
]