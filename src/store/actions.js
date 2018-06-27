import api from '../api/auth'

export const getUserInfo = ({
    commit,
    state
}) => {
    if (JSON.stringify(state.userInfo) == "{}") {
        api.userInfo().then(response => {
            return commit('userInfo', response)
        })
    }
}