<template>
  <div class="login">
      <div class="head">
        <p>登陆</p>
      </div>
      <yd-cell-item>
          <input  slot="right" style="text-align:left;" type="tel" regex="mobile" :showSuccessIcon="false" :showErrorIcon="false" v-model="form.mobile" required  placeholder="请输入手机号">
      </yd-cell-item>
      <yd-cell-item class="send-msg">
          <input slot="right" v-model="form.password" type="password"  placeholder="请输入密码" autocomplete="off">
      </yd-cell-item>
      <yd-button-group class="theme-margin-top">
        <yd-button type="primary"  size="large" v-submit @click.native="doLogin">登录</yd-button>
      </yd-button-group>
      <div class="theme-padding user-register">
          <a class="theme-color-text" @click="register" >去注册</a>
      </div>
  </div>
</template>
<script>
import api from "@/api/auth";
export default {
  data() {
    return {
      form: {
        mobile: "",
        password: ""
      }
    };
  },
  methods: {
    register () {
      this.$router.push('/register')
    },
    async doLogin() {
      let msg = "";
      if (this.form.mobile == "") {
        msg = "请输入手机号码";
      } else if (this.form.password === "") {
        msg = "请输入密码";
      }
      if (msg !== "") {
        this.$store.commit("msg", msg);
        return false;
      }

      let result = await api.login(this.form);
      if (result) {
        let that = this
        this.websocket.setOnMessage(function (event) {
          console.log(event)
        });
        this.websocket.setOnConnect(function (event) {
          that.websocket.send({
            'controller': 'common',
            'action': 'userBindFd',
            'data': {
              'uid': result
            }
          });
        });
        this.websocket.connect(this.sysConstant.WEBSOCKET_HOST)
      }
    }
  }
};
</script>
<style scoped lang="less">
.login {
  height: 100%;
  background: #fff;
  .head {
    text-align: center;
    padding-top: 60px;
  }
  .head-img {
    width: 200px;
    margin: 0 auto;
  }
  .head p {
    font-size: 30px;
    margin-top: 15px;
    margin-bottom: 30px;
  }
  .yd-checkbox {
    padding-right: 0px;
  }
  .user-register {
    line-height: 20px;
  }
}
</style>
