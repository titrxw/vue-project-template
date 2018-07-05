<template>
  <div>
      <img src="../../assets/images/wait.png">
  </div>
</template>
<script>
import auth from '@/api/auth'
import wechat from '@/beans/wechat'
import storage from '@/libs/storage'
export default {
  mounted: function () {
    if (this.$route.query.openid && this.$route.query.openid !== '') {
      wechat.wechatAuthSuccess(this.$route.query.openid)

      let path = storage.session.get('redirect')
      storage.session.delete("redirect");
      path = path ? path : '/'
      if (this.$route.meta.requireLogin) {
        path = '/login'
      }
      this.$router.push(path)
    } else if (!wechat.hasAuth()) {
      auth.wechatAuth()
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
