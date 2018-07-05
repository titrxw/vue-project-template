import Vue from 'vue'
import Router from 'vue-router'
import RouterConf from './router.js'
import wechat from '@/beans/wechat'
import user from '@/beans/user'
import storage from '@/libs/storage'

Vue.use(Router)

const router = new Router({
    routes: RouterConf
})

router.beforeEach(function(to, from, next) {
    let title = ''
    if (to.meta.title && to.meta.title !== '') {
        title = to.meta.title
        document.title = title
    }

    let token = user.getToken()
        // 检测微信授权
    if (Vue.ENV_PRODUCATION && to.meta.requireWechatAuth === true && !wechat.hasAuth()) {
        storage.session.set('redirect', to.fullPath)
        next({
            path: '/auth'
        })
    } else {
        // 账户绑定认证
        if (to.meta.requireLogin === true && !token) {
            storage.session.set('redirect', to.fullPath)
            next({
                path: '/login'
            })
        } else {
            if ((to.path === '/login' || to.name === 'Login') && token) {
                next({
                    path: '/'
                })
            } else {
                next()
            }
        }
    }
})
export default router