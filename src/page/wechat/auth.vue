<template>
  <div>
      <img src="../../assets/images/wait.png">
  </div>
</template>
<script>
import api from '../../api'
export default {
  methods: {
    // snsapi_base  snsapi_userinfo
    async wechatAuth (scope = 'snsapi_base') {
      let result = await api.wechatAuth({
        scope: scope
      })
      if (result) {
        window.location.href = result.url
      }
    }
  },
  mounted: function () {
    if (this.$route.query.openid && this.$route.query.openid !== '') {
      sessionStorage.setItem('openId', this.$route.query.openid)
      sessionStorage.setItem('wechatAuth', true)

      let path = sessionStorage.getItem('redirect')
      path = path ? path : '/'
      if (this.$route.meta.requireLogin) {
        path = '/login'
      }
      this.$router.push(path)
    } else if (!sessionStorage.getItem('openId') || sessionStorage.getItem('openId') === '') {
      this.wechatAuth()
    } else {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
img{
  width: 160px;
  margin:0 auto;
  display:block;
  margin-top: 60px;
}
</style>
