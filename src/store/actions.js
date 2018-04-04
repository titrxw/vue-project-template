import api from '../api'

export const getUserInfo = ({
  commit, state
}) => {
  if (JSON.stringify(state.userInfo) == "{}") {
    api.userInfo().then(response => {
      return commit('userInfo', response)
    })
  }
}