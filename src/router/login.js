import Vue from 'vue'
export default function (to, from, next) {
  let lastTime = Vue.storage.get('last_login_time')
  let curTime = Date.parse(new Date()) / 1000;
  if (lastTime && (curTime - lastTime) > (Vue.onlineHour * 60 * 55)) {
    Vue.storage.delete('token')
  }


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
