import Vue from 'vue'
export default {
  validate(to, from, next) {
    let lastTime = sessionStorage.getItem('last_login_time')
    let curTime = Date.parse(new Date()) / 1000;
    if (lastTime && (curTime - lastTime) > (Vue.onlineHour * 60 * 55)) {
      sessionStorage.removeItem('token')
    }


    let token = sessionStorage.getItem('token')

    if (to.meta.requireLogin === true && !token) {
      sessionStorage.setItem('redirect', to.fullPath)
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
}
