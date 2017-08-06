<template>
  <scroller lock-x style="height:100%;" @on-scroll-bottom="onScrollBottom" :scroll-bottom-offst="10">
  <div class="scroller">
    <div class="head">
      <div class="search-box"> 
        <img :src="headSrc" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></img>
        <search
          style="position:relative;width:90%;height: 0px;"
          @result-click="resultClick"
          @on-change="getResult"
          :results="results"
          :auto-fixed="false"
          v-model="value"
          @on-focus="onFocus"
          @on-cancel="onCancel"
          @on-submit="onSubmit"
          ref="search" class="search"></search>
      </div>
      <div class="operate-box">
        <grid :rows="4">
            <grid-item :link="{ path: hitem.path}" :label="hitem.title" v-for="(hitem, index) in operates" :key="index">
                <img slot="icon" :src="hitem.icon"></img>
            </grid-item>
        </grid>
      </div>
    </div>
    <div class="home-body">
      <goodsItem v-for="(item, index) in goodsList" :key="index" :goodsInfo="item"></goodsItem>
    </div>
  </div>
  </scroller>
</template>
<script>
import { Login } from '../api/index'
import goodsItem from '../components/goodsitem'
import { Scroller, Grid, GridItem, Search } from 'vux'
export default {
  components: {
    Scroller,
    goodsItem,
    Search,
    Grid,
    GridItem
  },
  data () {
    return {
      headSrc: require('../assets/images/head-bg.png'),
      goodsList: [
        {
          id: 1,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png')
        },
        {
          id: 3,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png')
        },
        {
          id: 2,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png')
        },
        {
          id: 1,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png')
        },
        {
          id: 3,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png')
        },
        {
          id: 2,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png')
        },
        {
          id: 1,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png')
        },
        {
          id: 3,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png')
        },
        {
          id: 2,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png')
        }
      ],
      operates: [
        {
          title: '领优惠券',
          icon: require('../assets/images/coupon.png'),
          path: ''
        },
        {
          title: '扫码购物',
          icon: require('../assets/images/qr.png'),
          path: ''
        },
        {
          title: '物流查询',
          icon: require('../assets/images/express.png'),
          path: ''
        },
        {
          title: '商品分类',
          icon: require('../assets/images/category.png'),
          path: 'category'
        }
      ],
      value: '',
      results: []
    }
  },
  methods: {
    onScrollBottom () {
      console.log(45)
    },
    // search  回调函数
    resultClick (item) {
      console.log(item)
    },
    getResult (val) {
      console.log(1)
    },
    onSubmit () {
      this.$refs.search.setBlur()
    },
    onFocus () {
      Login(function (result) {
        console.log(result)
      })
      console.log('on focus')
    },
    onCancel () {
      console.log('on cancel')
    }
  }
}
</script>
<style>
.head{
  background: #fff;
}
.ximg-demo {
  width: 100%;
  height: 180px;
}
.home-body{
  margin-top:10px;
  background: #fff;
  padding-top: 5px;
  padding-bottom: 10px;
}
.weui-grids a{
  text-decoration: none;
}
.vux-search-box{
  top: -70px;
  border-radius: 10px;
  margin: 0 auto;
}
.search-box{
  height:180px;
}
</style>
