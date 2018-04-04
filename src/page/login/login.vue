<template>
  <div class="login" v-if="!tryLogin">
      <div class="head">
        <img class="logo" src="../../assets/images/logo.png">
        <p>相寓太原</p>
      </div>
      <yd-cell-item>
          <input  slot="right" style="text-align:left;" type="tel" regex="mobile" :showSuccessIcon="false" :showErrorIcon="false" v-model="form.mobile" required  placeholder="请输入手机号">
      </yd-cell-item>
      <yd-cell-item>
          <input slot="right" style="flex:1;" v-model="form.code" type="tel" placeholder="请输入手机验证码" autocomplete="off">
          <span slot="right" class="text-btn" v-if="!hasSend" @click="sendMsg">{{ sendMsgText }}</span>
          <span slot="right" v-else class="text-gray">{{ sendMsgText }}</span>
      </yd-cell-item>
      <yd-button-group class="theme-margin-top">
        <yd-button type="primary"  size="large" @click.native="doLogin">登录</yd-button>
      </yd-button-group>
      <div class="theme-padding user-protocol">
          <span class="text-gray font-size-12">首次登录将为您创建相寓太原账号，点击登录表示您同意</span>
          <a class="theme-color-text" @click="protocol" >《相寓太原用户协议》</a>
      </div>
  </div>
</template>
<script>
import api from '../../api'
import Validate from '../../libs/validate'
export default {
  data () {
    return {
      sendMsgText: '获取短信验证码',
      hasSend: false,
      tryLogin: true,
      form: {
        mobile: '',
        code: '',
        openid: sessionStorage.getItem('openId')
      }
    }
  },
  methods: {
    async doLogin () {
      let msg = ''
      if (this.form.mobile == '') {
        msg = '请输入手机号码'
      } else if (!Validate.isMobile(this.form.mobile)) {
        msg = '请输入正确的手机号码'
      } else if (this.form.code === '') {
        msg = '请输入手机验证码'
      }
      if (msg !== '') {
        this.$store.commit('msg', msg)
        return false
      }

      let result = await api.register(this.form)
      this.$store.commit('updateStatus', true)
      if (result) {
        if (result.ret == 600){
          this.$dialog.alert({mes: result.msg});
          return true;
        }
        sessionStorage.setItem('token', result.token)
        this.$store.commit('userAuthStatus', result.approveStatus)
        let path = sessionStorage.getItem('redirect')
        if (path != null && path != '') {
          sessionStorage.removeItem('redirect')
          this.$router.push(path)
        } else {
          this.$router.go(-1)
        }
      }
    },
    async sendMsg () {
      if (!Validate.isMobile(this.form.mobile)) {
        this.$store.commit('msg', '请输入正确的手机号码')
        return false
      }
      this.hasSend = true

      let result = await api.sendMsg({
        mobile: this.form.mobile
      });
      if (result) {
        this.$dialog.toast({
          mes: '验证码已发送，请注意查收',
          icon: 'success'
        })
        let _this = this
        let ms = 60
        let time = setInterval(function () {
          --ms
          if (ms <= 0) {
            _this.sendMsgText = '获取短信验证码'
            clearInterval(time)
            _this.hasSend = false
            return false
          }
          _this.sendMsgText = '再次获取(' + ms + 's)'
        }, 1000)
      } else {
        this.hasSend = false
      }
    },
    protocol () {
      this.$router.push({path: '/protocol'})
    },
    async autoLogin () {
      let result = await api.login()
      this.$store.commit('updateStatus', true)
      if (!result) {
        this.tryLogin = false
        return false
      } 
      sessionStorage.setItem('token', result.token)
      sessionStorage.setItem('userAuthStatus', result.approveStatus)
      let path = sessionStorage.getItem('redirect')
      sessionStorage.removeItem('redirect')
      this.$router.push({path: path})
    }
  },
  mounted: function () {
    this.$store.commit('updateStatus', false)
    this.autoLogin()
  }
}
</script>
<style scoped lang="less">
.login{
  height:100%;
  background: #fff;
  .head{
    text-align: center;
    padding-top: 60px;
  }
  .logo{
    width: 160px;
    margin:0 auto;
  }
  .head-img{
    width: 200px;
    margin: 0 auto;
  }
  .head p{
    font-size: 30px;
    margin-top: 15px;
    margin-bottom: 30px;
  }
  .yd-checkbox {
    padding-right: 0px;
  }
  .user-protocol{
    line-height:20px;
  }
}
</style>
