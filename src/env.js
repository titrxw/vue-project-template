import Vue from 'vue'
let ENV_PRODUCATION = process.env.NODE_ENV === 'production' ? true: false
Vue.ENV_PRODUCATION = ENV_PRODUCATION