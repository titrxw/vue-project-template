<template>
  <div class="login">
      <div class="body">
        Hello!
      </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data() {
    return {
      form: {
        mobile: "",
        password: "",
        unionid: this.$storage.get("unionId")
      }
    };
  },
  methods: {
    async doBind() {
      let msg = "";
      if (this.form.mobile === "") {
        msg = "请输入账号";
      } else if (this.form.password === "") {
        msg = "请输入密码";
      }
      if (msg) {
        this.$store.commit("msg", msg);
        return false;
      }
      let result = await this.$api.bind(this.form);
      if (result) {
        this.$storage.set(
          "token",
          result.token,
          Vue.onlineHour * 60 * 60 * 1000
        );
        this.$store.dispatch("reset");
        this.$router.push({ path: "/" });
      }
    }
  }
};
</script>
<style scoped lang="less">
.login {
  background: #fff;
  height: 100%;
  .head {
    text-align: center;
    padding-top: 60px;
    .logo {
      width: 160px;
      margin: 0 auto;
    }
    p {
      font-size: 30px;
      margin-top: 15px;
    }
  }
  .body {
    margin-top: 30px;
  }
}
</style>
