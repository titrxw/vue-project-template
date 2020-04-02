<template>
  <div id="app">
    <router-view class="page-view"></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {};
  },
  watch: {
    "$store.state.msg"(val) {
      if (val) {
        // do something
        this.$store.commit("msg", "");
      }
    },
    "$store.state.error"(val) {
      if (val) {
        alert(val);
        this.$store.commit("error", "");
      }
    }
  }
};
</script>
<style scoped>
.page-view {
  top: 0px;
  width: 100%;
  height: 100%;
}
</style>
