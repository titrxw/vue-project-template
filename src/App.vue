<template>
  <transition name="page-move">
    <router-view class="page-view"></router-view>
  </transition>
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

.page-move-enter-active,
.page-move-leave-active {
  transition: opacity 0.3s;
}
.page-move-enter, .page-move-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
