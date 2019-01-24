import Vue from 'vue'
export default function (to, from, next) {
  if (process.env.NODE_ENV === 'production' && to.meta.requireWechatAuth === true && Vue.storage.get('wechatAuth') != 'true') {
    Vue.storage.set('redirect', to.fullPath)
    next({
      path: '/wechatAuth'
    })
    return false;
  }
  return true;
}
