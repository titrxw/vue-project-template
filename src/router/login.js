import Vue from 'vue'
export default function (to, from, next) {

  Vue.storage.get('token')
  let token = Vue.storage.get('token')

  if (to.meta.requireLogin === true && !token) {
    Vue.storage.set('redirect', to.fullPath)
    next({
      path: '/login'
    })
    return false
  } else {
    if ((to.path === '/login' || to.name === 'Login') && token) {
      next({
        path: '/'
      })
      return false
    }
  }
  return true;
}
