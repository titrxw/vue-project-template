export default {
  state: {
    requestStatus: 200,
    requestMsg: ''
  },
  mutations: {
    requestSuccess (state) {
      state.requestStatus = 200
    },
    requestFail (state, msg) {
      state.requestStatus = 400
      state.requestMsg = msg
    }
  },
  getters: {
    status (state) {
      return state.requestStatus
    },
    msg (state) {
      return state.requestMsg
    }
  }
}
