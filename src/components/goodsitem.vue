<template>
  <div class="goods-item" @click="detail" :style="gstyle">
    <div class="shp-cart-item-core shop-cart-display">
        <a class="cart-product-cell-1" href="javascript:">
          <img :src="goodsInfo['img']" class="cart-photo-thumb" alt="" style="opacity: 1;">
        </a>
        <div class="cart-product-cell-2">
          <div class="cart-product-name">
              <a href="javascript:">
                  <span class="non-fresh-txt">
                     {{ goodsInfo['title'] }}
                  </span>
              </a>
          </div>                                  
          <div class="cart-product-prop eles-flex">
            <span class="prop2">{{ goodsInfo['price'] }}</span>
          </div>
          <div class="cart-product-prop eles-flex">
            <span class="prop1">{{ goodsInfo['store'] }}</span>
          </div>
          <div class="cart-product-cell-3">
             <span class="shp-cart-item-price " id="price11277451685">¥{{ goodsInfo['promptPrice'] }}</span> 
          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'goodsItem',
  data () {
    return {
    }
  },
  props: ['goodsInfo', 'gstyle'],
  methods: {
    detail () {
      this.$router.push({path: 'goodDetail?id=' + this.goodsInfo['id']})
    }
  }
}
</script>
<style>
.goods-item{
  box-shadow: #efefef 0px 0px 9px 5px;
  margin: 15px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
}
.shop-cart-display.shp-cart-item-core {
    position: relative;
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

