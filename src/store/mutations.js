const mutations = {
    updateStatus(state, val) {
        state.netStatus = val
    },
    msg(state, msg) {
        state.msg = msg
    },
    updateUserType(state, type) {
        sessionStorage.setItem('userType', type)
        state.userType = type
    },
    userAuthStatus(state, status) {
        sessionStorage.setItem('userAuthStatus', status)
        state.userAuthStatus = status
    },
    userInfo(state, data) {
        state.userInfo = data
    }
}

export default mutations