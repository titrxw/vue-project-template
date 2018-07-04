<template>
  <div class="login" v-if="!tryLogin">
      <div class="head">
        <img class="logo" src="../../assets/images/logo.png">
        <p>相寓太原</p>
      </div>
      <yd-cell-item>
          <input  slot="right" style="text-align:left;" type="tel" regex="mobile" :showSuccessIcon="false" :showErrorIcon="false" v-model="form.mobile" required  placeholder="请输入手机号">
      </yd-cell-item>
      <yd-cell-item class="send-msg">
          <input slot="right" style="flex:1;" v-model="form.code" type="tel" placeholder="请输入手机验证码" autocomplete="off">
          <yd-sendcode slot="right" 
                      v-model="hasSend" 
                      @click.native="sendMsg" 
                      type="warning"
            ></yd-sendcode>
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
import api from "@/api/auth";
import Validate from "../../libs/validate";
import storage from '@/libs/storage'
export default {
  data() {
    return {
      sendMsgText: "获取短信验证码",
      hasSend: false,
      tryLogin: true,
      form: {
        mobile: "",
        code: ""
      }
    };
  },
  methods: {
    afterLogin(result) {
      // 保存token以及登录时间
      // 上一步路径
      let path = storage.get("redirect");
      storage.delete("redirect");
      path = path ? path : "/";
      this.$router.push(path);
    },
    async doLogin() {
      let msg = "";
      if (this.form.mobile == "") {
        msg = "请输入手机号码";
      } else if (!Validate.isMobile(this.form.mobile)) {
        msg = "请输入正确的手机号码";
      } else if (this.form.code === "") {
        msg = "请输入手机验证码";
      }
      if (msg !== "") {
        this.$store.commit("msg", msg);
        return false;
      }

      let result = await api.register(this.form);
      this.$store.commit("updateStatus", true);
      if (result) {
        if (result.ret == 600) {
          this.$dialog.alert({ mes: result.msg });
          return true;
        }
        this.afterLogin(result);
      }
    },
    async sendMsg() {
      if (!Validate.isMobile(this.form.mobile)) {
        this.$store.commit("msg", "请输入正确的手机号码");
        return false;
      }
      this.hasSend = true;

      let result = await api.sendMsg(this.form.mobile);
      if (result) {
        this.$dialog.toast({
          mes: "验证码已发送，请注意查收",
          icon: "success"
        });
      } else {
        this.hasSend = false;
      }
    },
    protocol() {
      this.$router.push({ path: "/protocol" });
    },
    async autoLogin() {
      let result = await api.login();
      this.$store.commit("updateStatus", true);
      if (!result) {
        this.tryLogin = false;
        return false;
      }
      this.afterLogin(result);
    }
  },
  mounted: function() {
    this.$store.commit("updateStatus", false);
    this.autoLogin();
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
  .logo {
    width: 160px;
    margin: 0 auto;
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
  .user-protocol {
    line-height: 20px;
  }
}
</style>
