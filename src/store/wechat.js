export default {
  state: {
    code: '',
    openId: '',
    accessToken: '',
    timestamp: '',
    nonceStr: '',
    signature: ''
  },
  mutations: {
    code (state, info) {
      state.code = info.code
    },
    openId (state, info) {
      state.openId = info.openId
    },
    accessToken (state, info) {
      state.accessToken = info.accessToken
    },
    timestamp (state, info) {
      state.timestamp = info.timestamp
    },
    nonceStr (state, info) {
      state.nonceStr = info.nonceStr
    },
    signature (state, info) {
      state.signature = info.signature
    }
  },
  actions: {
    code ({commit}, code) {
      commit('code', code)
    },
    openId ({commit}, openId) {
      commit('openId', openId)
    },
    accessToken ({commit}, accessToken) {
      commit('accessToken', accessToken)
    },
    timestamp ({commit}, timestamp) {
      commit('timestamp', timestamp)
    },
    nonceStr ({commit}, nonceStr) {
      commit('nonceStr', nonceStr)
    },
    signature ({commit}, signature) {
      commit('signature', signature)
    }
  },
  getters: {
    code (state) {
      return state.code
    },
    openId (state) {
      return state.openId
    },
    accessToken (state) {
      return state.accessToken
    },
    timestamp (state) {
      return state.timestamp
    },
    nonceStr (state) {
      return state.nonceStr
    },
    signature (state) {
      return state.signature
    }
  }
}
