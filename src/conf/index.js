import Vue from 'vue'
import DevConf from './dev'
import ProducationConf from './producation'

Vue.onlineHour = 2
Vue.errorReport = {
    open: true,
    url: 'common/frontLog'
}

if (process.env.NODE_ENV === 'production') {
    Vue.prototype.clientHost = 'http://test.com/test/#/'
    Vue.prototype.imgHost = 'http://test.com/uploads/'
    Vue.prototype.uploadHost = 'http://test.com/upload/test/system/upload'
    Vue.prototype.G = ProducationConf
} else {
    Vue.prototype.clientHost = 'http://test.com/test/alpha/test/#/'
    Vue.prototype.imgHost = 'http://test.com/uploads/'
    Vue.prototype.uploadHost = 'http://test.com/upload/test/common/upload'
    Vue.prototype.G = DevConf
}