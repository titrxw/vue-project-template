const mutations = {
  netStatus (state, status) {
    state.netStatus = status
  },
  msg(state, msg) {
    state.msg = msg
  },
  error (state, msg) {
    state.error = msg
  }
}

export default mutations
