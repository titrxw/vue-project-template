<template>
  <div class="login">
      <yd-cell-item>
          <input  slot="right" style="text-align:left;" type="tel"  :showSuccessIcon="false" :showErrorIcon="false" v-model="form.name" required  placeholder="请输入昵称">
      </yd-cell-item>
      <yd-cell-item>
          <input  slot="right" style="text-align:left;" type="tel"  regex="mobile" :showSuccessIcon="false" :showErrorIcon="false" v-model="form.mobile" required  placeholder="请输入手机号">
      </yd-cell-item>
      <yd-cell-item>
          <input  slot="right" style="text-align:left;" type="tel"  :showSuccessIcon="false" :showErrorIcon="false" v-model="form.password" required  placeholder="请输入密码">
      </yd-cell-item>
      <yd-cell-item>
          <input  slot="right" style="text-align:left;" type="tel"  :showSuccessIcon="false" :showErrorIcon="false" v-model="form.sure_password" required  placeholder="请输入确认密码">
      </yd-cell-item>
      <yd-button-group class="theme-margin-top">
        <yd-button type="primary"  size="large" v-submit @click.native="doLogin">登录</yd-button>
      </yd-button-group>
  </div>
</template>
<script>
import api from "@/api/auth";
import Validate from "@/libs/validate";
export default {
  data() {
    return {
      form: {
        name: '',
        mobile: "",
        password: "",
        sure_password: ''
      }
    };
  },
  methods: {
    async doLogin() {
      let msg = "";
      if (this.form.name == "") {
        msg = "请输入姓名";
      } else if (this.form.mobile == "") {
        msg = "请输入手机号码";
      } else if (!Validate.isMobile(this.form.mobile)) {
        msg = "请输入正确的手机号码";
      } else if (this.form.password === "") {
        msg = "请输入密码";
      } else if (this.form.sure_password === "") {
        msg = "请输入确认密码";
      } else if (this.form.sure_password != this.form.password) {
        msg = "确认密码输入错误";
      }
      if (msg !== "") {
        this.$store.commit("msg", msg);
        return false;
      }

      let result = await api.register(this.form);
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
}
</style>
