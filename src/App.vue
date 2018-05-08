<template>
  <yd-layout>
    <transition name="page-move">
      <router-view class="page-view"></router-view>
    </transition>
    <yd-tabbar slot="tabbar" v-if="$route.meta.showTabBar" activeColor="#a565ff">
      <yd-tabbar-item title="首页" link="/" :active="$route.path == '/'">
      </yd-tabbar-item>
      <yd-tabbar-item title="生活" link="/service" :active="$route.path == '/service'">
      </yd-tabbar-item>
      <yd-tabbar-item title="我的" :link="userLink" :active="$route.path == userLink">
      </yd-tabbar-item>
    </yd-tabbar>
    <yd-backtop></yd-backtop>
  </yd-layout>
</template>
<script>
export default {
  name: "app",
  computed: {
    userLink() {
      if (this.$store.state.userType == 2) {
        return "/user";
      }
      return "/user/ownerIndex";
    }
  },
  watch: {
    "$store.state.msg"(val) {
      if (val) {
        this.$dialog.toast({
          mes: val,
          timeout: 1500,
          callback: () => {
            this.$store.commit("msg", "");
          }
        });
      }
    },
    '$store.state.netStatus' (val) {
      if (!val) {
        this.$dialog.loading.open("加载中...");
      } else {
        this.$dialog.loading.close();
      }
    }
  }
};
</script>
<style scoped>
.page-view{
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  top:0px;
  position: absolute;
  width:100%;
}

.page-move-enter-active,
.page-move-leave-active {
  -webkit-transition: -webkit-transform .3s;
  transition: -webkit-transform .3s;
  transition: transform .3s;
  transition: transform .3s, -webkit-transform .3s;

  transition: opacity .5s;
}
.page-move-enter, .page-move-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

