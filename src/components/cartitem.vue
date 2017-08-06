<template>
  <div class="cart-item items">
    <div class="check-wrapper">
      <span v-if="check === true" class="cart-checkbox group-648608 cart-checked" @click="changeSelected"></span>
      <span v-else class="cart-checkbox group-648608 cart-un-checked" @click="changeSelected"></span>
    </div>
    <div class="shp-cart-item-core shop-cart-display">
        <a class="cart-product-cell-1" href="javascript:">
          <img :src="goods['img']" class="cart-photo-thumb" alt="" style="opacity: 1;">
        </a>
        <div class="cart-product-cell-2">
          <div class="cart-product-name">
            <a href="javascript:">
                <span class="non-fresh-txt">
                    {{ goods['title'] }}
                </span>
            </a>
          </div>
          <div class="cart-product-prop eles-flex">
            <span class="prop2">{{ goods['price'] }}</span>
          </div>
          <div class="cart-product-prop eles-flex">
            <span class="prop1">{{ goods['store'] }}</span>
          </div>
          <div class="cart-product-prop eles-flex" v-if="goods['attr']">
            <span class="prop1">{{ goods['attr'] }}</span>
          </div>
          <div class="cart-product-cell-3">
             <span class="shp-cart-item-price ">¥{{ goods['promptPrice'] }}</span> 
             <div class="quantity-wrapper customize-qua" style="right: -12px;">
              <x-number :value="goods['num']" :min="0" :max="goods['store']"  fillable @on-change="change"></x-number>
             </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import { XNumber } from 'vux'
export default {
  name: 'cartItem',
  components: {
    XNumber
  },
  data () {
    return {
      goods: {},
      check: true
    }
  },
  props: ['goodsInfo', 'checked'],
  mounted: function () {
    this.goods = this.goodsInfo
    if (this.goods['price'] === null || this.goods['price'] === '' || this.goods['price'] < 0) {
      this.goods['price'] = 0
    }
    if (this.goods['promptPrice'] === null || this.goods['promptPrice'] === '' || this.goods['promptPrice'] < 0) {
      this.goods['promptPrice'] = this.goods['price']
    }
    if (!this.goods['store'] || this.goods['store'] === null || this.goods['store'] === '' || this.goods['store'] < 0) {
      this.goods['store'] = 0
    }
    if (this.goods['num'] === null || this.goods['num'] === '' || this.goods['num'] < 0) {
      this.goods['num'] = 1
    }
    this.goods['checked'] = true
  },
  methods: {
    changeSelected () {
      this.check = !this.check
      this.goods['checked'] = this.check
      this.$emit('itemUpdate')
    },
    change (val) {
      this.goods['num'] = val
      this.$emit('itemUpdate')
    }
  },
  watch: {
    checked (val) {
      this.goods['checked'] = val
      this.check = val
    }
  }
}
</script>
<style>
.cart-item{
  position: relative;
  padding: 10px;
  padding-top: 7px;
  margin-bottom: 0px;
}
.cart-item:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: -1px;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.items{
  padding-left: 40px;
}
.items .check-wrapper {
    margin-top: 35px;
    margin-left: -30px;
}
.check-wrapper {
    height: 20px;
    width: 20px;
    margin-left: -29px;
    margin-top: 19px;
    display: block;
    position: absolute;
}
.check-wrapper .cart-checkbox {
    width: 20px;
    height: 20px;
}
.cart-checked{
    background: url('../assets/images/checked.png') no-repeat;
}
.cart-un-checked{
    background: url('../assets/images/un_checked.png') no-repeat;
}
.cart-checkbox {
    display: block;
    width: 20px;
    height: 20px;
    margin: 0 auto;
    background-size: 18px;
}
.quantity-wrapper.customize-qua {
    position: absolute;
    top: -12px;
    right: 0;
    width: 160px;
    box-sizing: border-box;
    white-space: nowrap;
    height: 100%;
    font-size: 0;
}
.shop-cart-display.shp-cart-item-core {
    position: relative;
    margin: 10px 0;
    box-sizing: border-box;
}
.shop-cart-display .cart-product-cell-1 .cart-photo-thumb {
    width: 88px;
    height: 88px;
}
.shop-cart-display .cart-product-cell-1 {
    width: auto;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    background-size: 100%;
}
.shop-cart-display .cart-product-cell-2, .edit-pro-mode {
    padding-left: 95px;
    width: 100%;
    box-sizing: border-box;
}
.shop-cart-display .cart-product-name {
    margin-bottom: 3px;
    height: 30px;
    line-height: 15px;
    font-size: 13px;
    color: #252525;
}
.cart-product-name a {
    color: #555;
    display: inline-block;
    height: 100%;
    position: relative;
}
.shop-cart-display .cart-product-name a span {
    height: 30px;
    max-height: 30px;
    font-size: 13px;
    line-height: 15px;
    vertical-align: middle;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: start;
    color: #232326;
    word-break: break-all;
}
.cart-product-prop {
    height: 12px;
    line-height: 12px;
    margin-bottom: 3px;
    font-size: 11px;
    color: #81838e;
    white-space: nowrap;
}
.cart-product-prop .prop1 {
    padding-right: 2px;
}
.cart-product-prop .prop1, .cart-product-prop .prop2 {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-flex-basis: 0;
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.shop-cart-display .cart-product-cell-3 {
    width: 100%;
    position: relative;
    background: #fff;
    text-align: left;
    height: 24px;
    font-size: 0;
    line-height: 1;
}
.shop-cart-display .shp-cart-item-price {
    display: inline-block;
    height: 100%;
    line-height: 24px;
    font-size: 13px;
    color: #f23030;
}
.shp-cart-item-price strong {
    font-size: 16px;
    font-weight: normal;
    margin-left: 3px;
}
</style>

