<template>
  <yd-layout>
    <router-view></router-view>
    <yd-tabbar slot="tabbar" v-if="showTabBar" activeColor="#a565ff">
      <yd-tabbar-item title="首页" link="/" :active="path == '/'">
          <img slot="icon" v-if="path == '/'" src="./assets/images/home-active.png"></img>
          <img slot="icon" v-else src="./assets/images/home.png"></img>
      </yd-tabbar-item>
      <yd-tabbar-item title="找房" link="/house" :active="path == '/house'">
          <img slot="icon" v-if="path == '/house'" src="./assets/images/house-active.png"></img>
          <img slot="icon" v-else src="./assets/images/house.png"></img>
      </yd-tabbar-item>
      <yd-tabbar-item title="生活" link="/service" :active="path == '/service'">
          <img slot="icon" v-if="path == '/service'" src="./assets/images/service-active.png"></img>
          <img slot="icon" v-else src="./assets/images/service.png"></img>
      </yd-tabbar-item>
      <yd-tabbar-item title="我的" :link="userLink" :active="path == userLink">
          <img slot="icon" v-if="path == userLink" src="./assets/images/user-active.png"></img>
          <img slot="icon" v-else src="./assets/images/user.png"></img>
      </yd-tabbar-item>
    </yd-tabbar>
    <yd-backtop></yd-backtop>
  </yd-layout>
</template>
<script>
export default {
  name: "app",
  computed: {
    showTabBar() {
      return this.$route.meta.showTabBar;
    },
    path() {
      return this.$route.path;
    },
    userLink() {
      this.$store.state.userType;
      if (this.getRenterType() === this.getCurrentUserType()) {
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
