import Vue from 'vue'
import './conf'
import error from './libs/error'
import api from './api'
import store from './store'
import storage from './libs/storage'
import router from './router'
import './assets/style/common.less'
import App from './App'
import Vconsole from 'vconsole'

Vue.use(error);
Vue.use(api);
Vue.use(storage)


Vue.directive('submit', {
    // 当被绑定的元素插入到 DOM 中时……
    bind(el, binding) {
        function clickHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (!el.contains(e.target)) {
                return false;
            }
            // 点击时间间隔,也可以按照请求是否结束来处理
            if (e.timeStamp - e.srcElement.timeStamp <= 600) {
                e.srcElement.timeStamp = e.timeStamp
                return false;
            }
            e.srcElement.timeStamp = e.timeStamp

            // 判断指令中是否绑定了函数
            if (binding.expression) {
                let arg = []
                if (binding.arg) {
                    arg = binding.arg.split(',')
                }
                if (e.target.dataset.args) {
                    arg.push(e.target.dataset.args)
                }
                binding.value(e, ...arg);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueSubmit__ = clickHandler;
        document.addEventListener('mousedown', clickHandler);
    },
    unbind(el) {
        // 解除事件监听
        document.removeEventListener('mousedown', el.__vueSubmit__);
        delete el.__vueSubmit__;
    }
})

process.env.NODE_ENV === 'development' && new Vconsole()

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')