import ajax from '../api/axios'
var logs = []
const errorHandler = (error, vm) => {
  console.error(error)
  console.error(vm)
  if (process.env.NODE_ENV === 'production') {
    let log = {
      data: vm._data,
      route: vm.$route.fullPath,
      msg: {
        desc: error.message,
        stack: error.stack
      }
    }
    if (logs.length == 0) {
      setTimeout(function () {
        ajax.post('admin_sysframe/frontLog', {
          logs
        })
        logs = []
      },1000)
    }
    logs.push(log)
  }
}

export default {
  install: function (Vue) {
    Vue.config.errorHandler = errorHandler;
    Vue.prototype.$throw = function (error) {
      return errorHandler(error, this);
    };
  }
}
