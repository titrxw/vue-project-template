<template>
  <div class="order-detail">
    <group>
      <cell title="商品总额" value="￥1024"></cell>
      <cell-form-preview :list="priceLlist"></cell-form-preview>
    </group>
    <div style="margin-top:10px;">
      <div class="vux-form-preview weui-form-preview">
        <div class="weui-form-preview__hd" style="line-height: 1.7em;">
          <label class="weui-form-preview__label" v-html="$t('商品信息')"></label>
          <em class="weui-form-preview__value" style="font-size: 1.3em;" v-html="$t('共') + goodsNums + $t('件商品')"></em>
        </div>
        <div class="order-good-item">
          <GoodsItem :goodsInfo="item" gstyle="box-shadow:none;padding:0px; " v-for="(item, cindex) in goodsInfo" :key="cindex"></GoodsItem>
        </div>
      </div>
    </div>
    <group>
      <cell title="收货人信息" value="任雄伟"></cell>
      <cell-form-preview :list="expressLlist"></cell-form-preview>
    </group>
    <div class="button-box">
        <x-button type="primary" @click.native="complete">支付</x-button>
        <x-button type="default" style="border:1px solid #a565ff;color:#a565ff" @click.native="doPress">申请取消订单</x-button>
      </div>
  </div>
</template>
<script>
import GoodsItem from '../components/goodsitem'
import { CellFormPreview, Group, Cell, XButton } from 'vux'
export default {
  components: {
    CellFormPreview,
    Group,
    Cell,
    GoodsItem,
    XButton
  },
  data () {
    return {
      goodsNums: 2,
      priceLlist: [{
        label: '状态',
        value: '已支付'
      }, {
        label: '订单编号',
        value: '567657657657567'
      }, {
        label: '下单时间',
        value: '2017-07-27'
      }],
      expressLlist: [{
        label: '状态',
        value: '已支付'
      }, {
        label: '订单编号',
        value: '567657657657567'
      }, {
        label: '下单时间',
        value: '2017-07-27'
      }],
      goodsInfo: [
        {
          id: 1,
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
        }
      ]
    }
  }
}
</script>
<style>
.order-good-item{
  padding-bottom: 10px;
}
</style>

