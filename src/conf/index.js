
import Vue from 'vue'
import devConf from './dev'
import producationConf from './producation'


if (Vue.ENV_PRODUCATION) {
  Vue.prototype.imgHost = 'https://baidu.com/uploads/'
  Vue.prototype.uploadApiHost = 'https://baidu.com/upload/kc/system/upload'
  Vue.prototype.sysConstant = producationConf
} else {
  Vue.prototype.imgHost = 'https://baidu.com/uploads/'
  Vue.prototype.uploadApiHost = 'https://baidu.com/upload/kc/system/upload'
  sessionStorage.setItem('openId', 'oxrQJ1OvL8uk3lzvjtZE9PyzC07U')
  Vue.prototype.sysConstant = devConf
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
  window.addEventListener('resize', function () {
  　　if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
      　　window.setTimeout(function () {
　　　　　　　　　document.activeElement.scrollIntoViewIfNeeded();
          }, 0);
      }
  })
}


/**
 * 单次提交，点击后按钮变灰
 */
Vue.cancelSubmit = function () {
  if (Vue.el) {
    window.setTimeout(function () {
      Vue.el.submit = false
      Vue.el.setAttribute('class', Vue.elClass);
    }, 500);
  }
}
Vue.submit = function () {
  if (Vue.el) {
    Vue.el.setAttribute('class', ' yd-btn-disabled ' + Vue.elClass);
  }
}
// 自定义指令  在标签上添加v-submit
Vue.directive('submit', {
  inserted(el, binding) {
    Vue.el = el
    Vue.elClass = el.getAttribute('class')
  }
})
/**
 * 单次提交 end
 */




