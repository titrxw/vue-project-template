import Vue from 'vue'
import devConf from './dev'
import producationConf from './producation'


if (Vue.ENV_PRODUCATION) {
    Vue.prototype.imgHost = 'https://baidu.com/uploads/'
    Vue.prototype.uploadApiHost = 'https://baidu.com/upload/kc/system/upload'
    Vue.prototype.sysConstant = producationConf
    Vue.apiHost = 'https://baidu.com/api'
} else {
    Vue.prototype.imgHost = 'https://baidu.com/uploads/'
    Vue.prototype.uploadApiHost = 'https://baidu.com/upload/kc/system/upload'
    sessionStorage.setItem('openId', 'oxrQJ1OvL8uk3lzvjtZE9PyzC07U')
    Vue.prototype.sysConstant = devConf
    Vue.apiHost = 'https://baidu.com/api'
}


// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    error: require('../assets/images/error.png'),
    loading: require('../assets/images/load.gif'),
    attempt: 3
})


// 输入框和键盘问题
if (/Android/gi.test(navigator.userAgent)) {
    window.addEventListener('resize', function() {　　
        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {　　
            window.setTimeout(function() {　　　　　　　　　
                document.activeElement.scrollIntoViewIfNeeded();
            }, 0);
        }
    })
}


// 点击后等待请求完成才可以再点击  利用自定义指令实现        使用时需要在标签上添加v-submit
Vue.submit = function() {
    Vue.hasSubmit = true
}

Vue.unSubmit = function() {
    Vue.hasSubmit = false
}

Vue.directive('submit', {
    // 当被绑定的元素插入到 DOM 中时……
    bind(el, binding, vnode) {
        function documentHandler(e) {
            if (Vue.hasSubmit && el.contains(e.target)) {
                return false;
            }
            if (binding.expression) {
                binding.value(e);
            }
        }
        el.__vueSubmit__ = documentHandler;
        document.addEventListener('mousedown', documentHandler);
    },
    unbind(el, binding) {
        document.removeEventListener('mousedown', el.__vueSubmit__);
        delete el.__vueSubmit__;
    }
})