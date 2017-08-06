export default {
  state: {
    isLoading: false
  },
  mutations: {
    prepareLoad (state) {
      state.isLoading = true
    },
    hasLoad (state) {
      state.isLoading = false
    }
  }
}
