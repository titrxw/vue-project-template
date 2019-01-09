<template>
<div>
    <img src="../../assets/images/wait.png">
</div>
</template>
<script>
import api from '../../api'
export default {
  methods: {
    async doLogin () {
      let result = await api.login()
      if (!result) return false

      sessionStorage.setItem('token', result.token)
      sessionStorage.setItem('last_login_time', Date.parse(new Date()) / 1000);
      
      let path = sessionStorage.getItem('redirect')
      path = path ? path : '/'
      this.$router.push({path: path})
    },
    // snsapi_base  snsapi_userinfo
    async wechatAuth (scope = 'snsapi_base') {
      let result = await api.wechatAuth({
        scope: scope
      })
      if (result) {
        location.href = result.url
      }
    }
  },
  watch : {
    '$route.query' (val) {
      if (val.openid && val.openid !== '') {
        sessionStorage.setItem('openId', val.openid)
        sessionStorage.setItem('unionId', val.unionid)
        sessionStorage.setItem('wechatAuth', true)
        this.doLogin()
      }
    }
  },
  mounted: function () {
    if (this.$route.query.openid && this.$route.query.openid !== '') {
      sessionStorage.setItem('openId', this.$route.query.openid)
      sessionStorage.setItem('unionId', this.$route.query.unionid)
      sessionStorage.setItem('wechatAuth', true)
      this.doLogin()
    } else if (!sessionStorage.getItem('openId') || sessionStorage.getItem('openId') === '') {
      this.wechatAuth('snsapi_userinfo')
    }
  }
}
</script>
<style scoped lang="less">
img{
  width: 160px;
  margin:0 auto;
  display:block;
  margin-top: 60px;
}
</style>
