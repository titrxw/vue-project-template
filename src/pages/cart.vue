<template>
  <div class="cart">
    <scroller lock-x  @on-scroll-bottom="onScrollBottom" :scroll-bottom-offst="10" :style="scrollStyle">
      <div class="cart-list">
        <cartItem v-for="(item, index) in cartList" :key="index" :goodsInfo="item" :checked="checkAll" @itemUpdate="updateTotalPrice"></cartItem>
      </div>
    </scroller>
    <div class="payment-total-bar payment-total-bar-new box-flex-f" id="payment_p" style="display: flex;">
        <div class="shp-chk shp-chk-new   box-flex-c" @click="checkAllHandler">
            <span v-if="checkAll"  class="cart-checkbox cart-checked"></span>
            <span v-else  class="cart-checkbox cart-un-checked" ></span>
            <span class="cart-checkbox-text">全选</span>
        </div>
        <div class="shp-cart-info shp-cart-info-new  box-flex-c">
            <strong id="shpCartTotal" data-fsizeinit="14" class="shp-cart-total" style="font-size: 14px;">合计:<span class="bottom-bar-price" id="cart_realPrice"> ¥0.00</span></strong>
            <span id="saleOffNew" data-fsizeinit="10" class="sale-off sale-off-new  bottom-total-price" style="font-size: 10px;">总额:<span class="money-unit-bf" id="cart_oriPrice">{{ allPrice }}</span>立减:<span class="money-unit-bf" id="cart_rePrice">0.00</span></span>
        </div>
        <a class="btn-right-block btn-right-block-new  box-flex-c" @click="buyNow">去结算<span id="checkedNum">({{ allPrice }})</span></a>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import cartItem from '../components/cartitem'
import { Scroller } from 'vux'
export default {
  components: {
    cartItem,
    Scroller
  },
  data () {
    return {
      checkAll: true,
      allPrice: 0,
      scrollStyle: '0px',
      cartList: [
        {
          id: 1,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png'),
          num: 2
        },
        {
          id: 1,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png'),
          num: 2
        },
        {
          id: 1,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png'),
          num: 2
        },
        {
          id: 1,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png'),
          num: 2
        }
      ]
    }
  },
  methods: {
    onScrollBottom () {
      console.log(7)
    },
    checkAllHandler () {
      this.checkAll = !this.checkAll
      this.updateTotalPrice()
    },
    updateTotalPrice () {
      let handle = this
      this.$nextTick(function () {
        let price = 0
        console.log(handle.cartList)
        if (!handle.checkAll) {
          handle.allPrice = price
          return false
        }
        handle.cartList.forEach(function (item, index) {
          if (item.checked) {
            price += item['price'] * item['num']
          }
        })
        handle.allPrice = price
      })
    },
    buyNow () {
      this.$router.push({path: 'settlement?carts=1,2,3,4,5'})
    }
  },
  mounted: function () {
    let scrollHeight = $(window).height() - 50
    scrollHeight = scrollHeight + 'px'
    this.scrollStyle = 'height:' + scrollHeight
    this.updateTotalPrice()
  }
}
</script>
<style>
.cart-list{
  background: #fff;
}
.payment-total-bar {
    width: 100%;
    height: 50px;
    overflow: hidden;
    position: fixed;
    background: #fff;
    bottom: 0;
    left: 0;
    z-index: 1;
}
.payment-total-bar:before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 100%;
    height: 0;
    border-top: 1px solid #e3e5e9;
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
}
.shp-chk-new {
    max-width: 50px;
    padding-left: 16px;
    padding-top: 15px;
}
.shp-chk {
    width: 38px;
    text-align: center;
    overflow: hidden;
}
.cart-checked{
    background: url('../assets/images/checked.png') no-repeat;
}
.cart-un-checked{
    background: url('../assets/images/un_checked.png') no-repeat;
}
.shp-chk-new .cart-checkbox {
    display: table-cell !important;
}
.payment-total-bar .cart-checkbox {
    margin-left: 11px;
}
.cart-checkbox-text {
    color: #232326;
    display: table-cell;
    vertical-align: middle;
    padding-left: 4px;
    font-size: 12px;
    line-height: 20px;
    font-weight: bold;
}
.shp-cart-info-new {
    margin-left: 8px;
    font-size: 0;
    overflow: hidden;
}
.shp-cart-info {
    display: block;
}
.sale-off-new {
    display: inline-block;
    color: #232326 !important;
    opacity: 0.8;
    height: 14px;
    font-size: 10px;
    line-height: 18px;
    margin-bottom: 10px;
    margin-top: 2px;
    white-space: nowrap;
}
.shp-cart-total {
    margin-top: 10px;
    display: block;
    line-height: 14px;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
}
span#cart_oriPrice {
    margin-right: 3px;
}
.btn-right-block {
    display: block;
    max-width: 98px;
    line-height: 50px;
    text-align: center;
    background: #f23030;
    color: #fff;
    font-size: 16px;
    height: 49px;
    margin-top: 1px;
}
.btn-right-block-new span {
    font-size: 12px;
    margin-left: 2px;
}
.box-flex-c {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-flex-basis: 0;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
}
</style>
