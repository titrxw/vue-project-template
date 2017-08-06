export default {
  state: {
    accessKey: 'user',
    isLogin: false,
    userInfo: {
      // 测试用
      mobile: '15903466276',
      // 测试用
      pic: require('../assets/images/test-head-pic.png')
    },
    // 记录之前录入的合同号
    beforeContractNo: '',
    // 手机号错误次数限制
    errorLimit: 6,
    // 手机号验证错误次数
    currentErrorNums: 0
  },
  mutations: {
    login (state, info) {
      if (info !== null) {
        state.isLogin = true
        state.userInfo = info
        sessionStorage.setItem(state.accessKey, info)
      }
    },
    reloadUserInfo (state, info) {
      if (!state.isLogin) {
        state.isLogin = true
        state.userInfo = info
      }
    },
    loginOut (state) {
      state.isLogin = false
      state.userInfo = null
      sessionStorage.removeItem('user')
    },
    addContractNo (state, no) {
      state.beforeContractNo = no
    },
    errorNums (state, nums) {
      if (nums === 're') {
        state.currentErrorNums = 0
      } else {
        state.currentErrorNums ++
      }
    }
  },
  actions: {
    login ({commit}, user) {
      commit('login', user)
    },
    loginOut ({commit}) {
      commit('loginOut')
    },
    addContractNo ({commit}, no) {
      commit('addContractNo', no)
    },
    increCheckError ({commit}) {
      commit('errorNums', 'i')
    },
    restoreCurrentErrorNums ({commit}) {
      commit('errorNums', 're')
    }
  },
  getters: {
    isLogin (state) {
      return state.isLogin
    },
    getUser (state) {
      return state.userInfo
    },
    getAccessKey (state) {
      return state.accessKey
    },
    getMobile (state) {
      return state.userInfo['mobile']
    },
    getHeadPic (state) {
      return state.userInfo['pic']
    },
    getContractNo (state) {
      return state.beforeContractNo
    },
    residueDegree (state) {
      if (state.currentErrorNums > state.errorLimit) {
        return 0
      } else {
        return state.errorLimit - state.currentErrorNums
      }
    },
    overLimit (state) {
      if (state.currentErrorNums > state.errorLimit) {
        return false
      } else {
        return true
      }
    }
  }
}
