import storage from '@/libs/storage'
const mutations = {
    updateStatus(state, val) {
        state.netStatus = val
    },
    msg(state, msg) {
        state.msg = msg
    },
    updateUserType(state, type) {
        storage.session.set('userType', type)
        state.userType = type
    },
    userAuthStatus(state, status) {
        storage.session.set('userAuthStatus', status)
        state.userAuthStatus = status
    },
    userInfo(state, data) {
        state.userInfo = data
    }
}

export default mutations