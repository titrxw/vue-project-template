<template>
  <div class="home">
    <div class="head-bg">
        <img class="head-bg-pic" src="../assets/images/user-head-bg.png">
        <br/>
        <div class="user-head-bg head-box">
            <img class="user-head-pic" :src="headPic">
        </div>
        <div class="user-desc-box head-box">
            <span class="user-desc">我是谁</span>
            <span class="user-desc"></span>
        </div>
    </div>
    <div class="hbody">
        <group>
            <cell title="全部订单" is-link link="order" value="">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/images/user-head-bg.png">
            </cell>
            <cell title="待付款" is-link link="order?type=2"  value="">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/images/user-head-bg.png">
            </cell>
            <cell title="待收货" is-link link="order?type=3"  value="">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/images/user-head-bg.png">
            </cell>
            <cell title="售后订单" is-link link="order"  value="">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/images/user-head-bg.png">
            </cell>
        </group>
        <group>
            <cell title="优惠券" is-link link="feedBack" value="">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../assets/images/user-head-bg.png">
            </cell>
        </group>
    </div>
  </div>
</template>
<script>
import { Cell, Group } from 'vux'
export default {
  components: {
    Cell,
    Group
  },
  data () {
    return {
      headPic: this.$store.getters['getHeadPic']
    }
  }
}
</script>
<style>
.home {
    height:100%;
    background: #efefef;
}
.head-bg{
    height: 120px;
    width: 100%;
}
.user-head-bg{
    height: 80px;
    width: 80px;
    background: url('../assets/images/user-head.png');
    position: relative;
    padding-top: 1px;
    background-size: 80px;
    margin-left: 10px;
}
.head-box{
  float:left;
}
.user-desc-box{
    height: 105px;
    width: 160px;
    margin-top: -11px;
}
.service-box{
    float: right;
    margin-right: 10px;
    margin-top: 50px;
}
.user-desc{
    text-align: left;
    width:100%;
    display: block;
    color:white;
    margin-top:30px;
    margin-left:10px;
    position: relative;
}
.user-head-pic{
    height: 76px;
    width: 76px;
    margin-top: 2px;
    border-radius: 100%;
    margin-left: 2px;
    margin-top: 1px;
    position: relative;
}
.head-bg-pic{
    position: absolute;
    display: block;
    top: 0px;
    width: 100%;
    height: 120px;
}
</style>

