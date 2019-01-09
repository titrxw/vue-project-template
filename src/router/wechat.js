export default {
  validate(to, from, next) {
    if (process.env.NODE_ENV === 'production' && to.meta.requireWechatAuth === true && sessionStorage.getItem('wechatAuth') != 'true') {
      sessionStorage.setItem('redirect', to.fullPath)
      next({
        path: '/wechatAuth'
      })
      return false;
    }
    return true;
  }
}
