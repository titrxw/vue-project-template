import ajax from './axios'

let api = {
  login: (params) => {
    return ajax.post('admin_syscommon/login', params)
  },
  logout: (params) => {
    return ajax.post('admin_sysframe/logout', params)
  },
  password: (params) => {
    return ajax.post('admin_sysframe/password', params)
  }
}

export default {
  install: function (Vue) {
    Vue.api = api
    Vue.prototype.$api = api
  }
}
