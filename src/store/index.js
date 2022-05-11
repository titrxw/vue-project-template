import 'babel-polyfill'
import {createStore} from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions
})
