<template>
  <div id="app">
    <drawer
    width="200px;"
    :drawer-style="{'background-color':'#35495e', width: '200px'}">
      <!-- main content -->
      <view-box ref="viewBox" v-if="path === '/' || path === '/user' || path === '/service'" body-padding-bottom="59px">
        <router-view class="router-view"></router-view>
        <tabbar class="vux-demo-tabbar" icon-class="vux-center"  slot="bottom">
          <tabbar-item :link="{path:'/'}">
            <span v-if="path === '/'" :selected="path === '/'" class="demo-icon-22 vux-demo-tabbar-icon-home bottom-tab-span tab-one-active" slot="icon"></span>
            <span v-else class="demo-icon-22 vux-demo-tabbar-icon-home bottom-tab-span tab-one" slot="icon"></span>
            <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item link="cart">
            <span v-if="path === '/cart'" :selected="path === '/cart'" class="demo-icon-22 bottom-tab-span tab-two-active" slot="icon"></span>
            <span v-else class="demo-icon-22 bottom-tab-span tab-two" slot="icon"></span>
            <span slot="label">购物车</span>
          </tabbar-item>
          <tabbar-item link="/user">
            <span  v-if="path === '/user'" class="demo-icon-22 vux-demo-tabbar-icon-home bottom-tab-span tab-four-active" slot="icon"></span>
            <span  v-else class="demo-icon-22 vux-demo-tabbar-icon-home bottom-tab-span tab-four" slot="icon"></span>
            <span slot="label">我的</span>
        </tabbar-item>
        </tabbar>
      </view-box>
      <view-box v-else  body-padding-bottom="0px">
        <router-view class="router-view"></router-view>
      </view-box>
    </drawer>
    <div v-transfer-dom>
        <loading v-model="isLoading" :text="loadingText"></loading>
      </div>
    <toast v-model="requestStatus" :time="1200" type="text">{{ toastMsg }}</toast>
  </div>
</template>
<script>
import { Badge, Drawer, ViewBox, Tabbar, TabbarItem, Loading, TransferDomDirective as TransferDom, Toast } from 'vux'
import { mapState } from 'vuex'
export default {
  directives: {
    TransferDom
  },
  components: {
    Badge,
    Drawer,
    ViewBox,
    Tabbar,
    Toast,
    Loading,
    TabbarItem
  },
  computed: {
    ...mapState({
      isLoading: state => state.frame.isLoading
    }),
    path: function () {
      return this.$route.path
    },
    requestStatus () {
      if (this.$store.getters['status'] === 200) {
        return false
      } else {
        this.toastMsg = this.$store.getters['msg']
        return true
      }
    }
  },
  data () {
    return {
      drawerVisibility: false,
      showMode: 'push',
      showModeValue: 'push',
      showPlacement: 'left',
      showPlacementValue: 'left',
      toastMsg: '',
      position: 'middle',
      loadingText: '正在加载'
    }
  }
}
</script>
<style>
body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow-x: hidden;
}
.router-view{ 
  height:100%;
}
.bottom-tab-span{
  position:relative;
  top: -2px;
}
.weui-tabbar{
  height: 60px;
}
.weui-tabbar__label{
     margin: 0;
    /* margin-bottom: 10px; */
    margin-top: 6px;
}
.tab-one{
  background: url('assets/images/home.png');
  background-size:29px;
}
.tab-one-active{
  background: url('assets/images/home-active.png');
  background-size:29px;
}
.tab-two{
  background: url('assets/images/cart.png');
  background-size:29px;
}
.vux-cell-bd p{
  margin: 0;
}
.weui-cell__bd p{
  margin: 0;
}
.tab-two-active{
  background: url('assets/images/cart-active.png');
  background-size:29px;
}
.tab-four{
  background: url('assets/images/user.png');
  background-size:29px;
}
.tab-four-active{
  background: url('assets/images/user-active.png');
  background-size:29px;
}
.weui-tabbar a{
  text-decoration: none;
}
#app{
  height:100%;
  background: #eee;
}
.demo-icon-22 {
    height: 25px;
    width: 30px;
    margin-left: -1px;
    margin-top: 6px;
    display: block;
}
.button-box{
  width:95%;
  margin:0 auto;;
  margin-top:15px;
}
a{
  text-decoration: none;
}
p{
  margin:0;
}
</style>
