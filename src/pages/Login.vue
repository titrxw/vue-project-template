<template>
  <div class="login">
      <div class="lhead">
        <img class="logo" src="../assets/images/logo.png">
        <p>相寓管家</p>
      </div>
      <div class="body">
        <x-input title="手机号码"  v-model="form.mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
        <x-input title="输入验证码" v-model="form.code" class="weui-vcode">
            <x-button slot="right" :disabled="disable" type="primary" style="background-color: #a565ff;" mini @click.native="sendSms">{{ smsBtnText }}</x-button>
        </x-input>
        <x-button type="primary" style="width:95%;margin-top:30px;background-color: #a565ff;" action-type="button" @click.native="doLogin">登陆</x-button>
      </div>
      <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="短信发送成功" :position="position">短信发送成功</toast>
  </div>
</template>
<script>
import { XInput, XButton, XImg, Toast } from 'vux'
import { mapActions } from 'vuex'
export default {
  components: {
    XInput,
    XButton,
    XImg,
    Toast
  },
  data () {
    return {
      form: {
        mobile: '',
        code: ''
      },
      smsBtnText: '发送验证码',
      position: 'middle',
      showPositionValue: false,
      disable: false,
      isLogin: this.$store.state.user.isLogin
    }
  },
  methods: {
    ...mapActions(['login']),
    doLogin () {
      let handle = this
      handle.login(handle.form)
      handle.$router.push({path: '/'})
      // this.$http.get('/api').then(function (result) {
      //   console.log(result)
      //   handle.login(handle.form)
      //   if (handle.$store.state.user.isLogin) {
      //     handle.$router.push({path: '/'})
      //   }
      // })
    },
    sendSms () {
      this.showPositionValue = true
      this.disable = true
      this.smsBtnText = '60s'
      let handle = this
      let preid = 60
      let Timer = setInterval(function () {
        handle.smsBtnText = preid + 's'
        preid = preid - 1
        if (preid === 0) {
          handle.disable = false
          handle.smsBtnText = '发送验证码'
          clearInterval(Timer)
        }
      }, 1000)
    }
  }
}
</script>
<style>
.lhead{
  text-align: center;
}
.logo{
  margin-top: 50px;
  width: 160px;
}
.head-img{
  width: 200px;
      margin: 0 auto;
}
.body{
  margin-top:30px;
}
.lhead p{
  font-size: 30px;
}
.weui-btn_primary{
  background-color: #a565ff;
}
</style>
