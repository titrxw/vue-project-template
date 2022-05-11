import storage from '../libs/storage'
export default function (to, from, next) {
  storage.get('token')
  let token = storage.get('token')

  if (to.meta.requireLogin === true && !token) {
    storage.set('redirect', to.fullPath)
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
