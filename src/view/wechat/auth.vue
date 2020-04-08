<template>
<div>
    <!-- <img src="../../assets/images/wait.png"> -->
</div>
</template>
<script>
export default {
  methods: {
    async doLogin () {
      let result = await this.$api.login()
      if (!result) return false

      this.$storage.set('token', result.token)
      this.$storage.set('last_login_time', Date.parse(new Date()) / 1000);
      
      let path = this.$storage.get('redirect')
      path = path ? path : '/'
      this.$router.push({path: path})
    },
    // snsapi_base  snsapi_userinfo
    async wechatAuth (scope = 'snsapi_base') {
      let result = await this.$api.wechatAuth({
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
        this.$storage.set('openId', val.openid)
        this.$storage.set('unionId', val.unionid)
        this.$storage.set('wechatAuth', true)
        this.doLogin()
      }
    }
  },
  mounted: function () {
    if (this.$route.query.openid && this.$route.query.openid !== '') {
      this.$storage.set('openId', this.$route.query.openid)
      this.$storage.set('unionId', this.$route.query.unionid)
      this.$storage.set('wechatAuth', true)
      this.doLogin()
    } else if (!this.$storage.get('openId') || this.$storage.get('openId') === '') {
      this.wechatAuth('snsapi_userinfo')
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
