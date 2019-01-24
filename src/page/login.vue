<template>
  <div class="login">
      <div class="body">
        <!-- <yd-cell-item>
            <span slot="left">账号：</span>
            <input slot="right" v-model="form.mobile" type="text" required  placeholder="请输入登录账号">
            <i slot="icon" class="demo-icons-phone"></i>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">密码：</span>
            <input slot="right" type="password" v-model="form.password" placeholder="请输入密码">
        </yd-cell-item>
        <yd-button-group>
          <yd-button type="primary"  size="large" @click.native="doBind">登录</yd-button>
        </yd-button-group> -->
      </div>
  </div>
</template>
<script>
import api from '@/api'
export default {
  data () {
    return {
      form: {
        mobile: '',
        password: '',
        unionid: this.$storage.get('unionId')
      }
    }
  },
  methods: {
    async doBind () {
      let msg = ''
      if (this.form.mobile === '') {
        msg = '请输入账号'
      } else if (this.form.password === '') {
        msg = '请输入密码'
      }
      if (msg) {
        this.$store.commit('msg', msg)
        return false
      }
      let result = await this.$api.bind(this.form)
      if (result) {
        this.$storage.set('token', result.token);
        this.$storage.set('last_login_time', Date.parse(new Date()) / 1000);
        this.$store.dispatch('reset')
        this.$router.push({path: '/'});
      }
    }
  }
}
</script>
<style scoped lang="less">
.login{
  background: #fff;
  height:100%;
  .head{
    text-align: center;
    padding-top: 60px;
    .logo{
      width: 160px;
      margin:0 auto;
    }
    p{
      font-size: 30px;
      margin-top: 15px;
    }
  }
  .body{
    margin-top:30px;
  }
}


</style>
