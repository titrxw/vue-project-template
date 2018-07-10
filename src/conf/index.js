
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