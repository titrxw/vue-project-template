const mutations = {
  updateStatus(state, val) {
    state.netStatus = val
  },
  msg(state, msg) {
    state.msg = msg
  },
  openId (state, val) {
    state.openId = val
    sessionStorage.setItem('openId', val)
  },
  updateUserType (state, type) {
    sessionStorage.setItem('userType', type)
    state.userType = type
  },
  firstUserAuth (state, status) {
    sessionStorage.setItem('firstUserAuth', status)
    state.firstUserAuth = status
  },
  userAuthStatus (state, status) {
    sessionStorage.setItem('userAuthStatus', status)
    state.userAuthStatus = status
  },
  userInfo (state, data) {
    state.userInfo = data
  }
}

export default mutations
