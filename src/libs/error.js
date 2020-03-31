import Vue from 'vue'
import ajax from '../api/axios'

var logs = []
const errorHandler = (error, vm) => {
    console.error(error)
    console.error(vm)
    if (process.env.NODE_ENV === 'production' && Vue.errorReport.open) {
        let log = {
            data: vm._data,
            route: vm.$route.fullPath,
            msg: {
                desc: error.message,
                stack: error.stack
            }
        }
        if (logs.length == 0) {
            setTimeout(function() {
                ajax.post(Vue.errorReport.url, {
                    logs
                })
                logs = []
            }, 1000)
        }
        logs.push(log)
    }
}

export default {
    install: function(Vue) {
        Vue.config.errorHandler = errorHandler;
        /**
         * 下面的是用在异步的try上  应为异步的执行是在浏览器专门的线程执行，只是回调在主线程执行，try-catch 只能捕获在其中执行的同步代码所抛出的异常，也就是异步的过程无法try catch
         */
        Vue.prototype.$throw = function(error) {
            return errorHandler(error, this);
        };
    }
}