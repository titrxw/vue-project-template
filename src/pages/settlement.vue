<template>
  <div>
    <div class="take-delivery-info">
      <group>
        <cell :title="defaultDelivery['name'] + defaultDelivery['mobile']" :inline-desc="defaultDelivery['address']" is-link  :link="{path: 'address?back=' + currentPath}"></cell>
      </group>
    </div>
    <scroller lock-x style="height:100%;" :scroll-bottom-offst="10">
      <div class="scroll-body" style="min-height:750px;">
        <div class="vux-form-preview weui-form-preview">
          <div class="weui-form-preview__hd"  style="line-height: 1.7em;">
            <label class="weui-form-preview__label" v-html="$t('商品信息')"></label>
            <em class="weui-form-preview__value"  style="font-size: 1.3em;"  v-html="$t('共') + goodsNums + $t('件商品')"></em>
          </div>
          <div class="order-good-item">
            <GoodsItem :goodsInfo="item" gstyle="box-shadow:none;padding:0px;"v-for="(item, cindex) in goodsInfo" :key="cindex"></GoodsItem>
          </div>
          <cell title="配送方式"  is-link @click.native="selectExpress" :value="express"></cell>
          <div v-transfer-dom>
            <popup v-model="showExpressWay">
              <!-- group already has a top border, so we need to hide header's bottom border-->
              <popup-header
              left-text="取消"
              right-text="确定"
              title="请选择催缴方式"
              :show-bottom-border="false"
              @on-click-left="showExpressWay = false"
              @on-click-right="selectExpressWay"></popup-header>
              <group gutter="0">
                <radio v-model="express" :options="expressWay"></radio>
              </group>
            </popup>
          </div>
        </div>
        <group>
          <cell title="优惠券"  is-link @click.native="selectCoupon" :value="coupon"></cell>
        </group>
        <group>
          <cell title="商品总额" value="￥1024"></cell>
          <cell-form-preview :list="priceLlist"></cell-form-preview>
        </group>
        <div class="button-box">
          <x-button type="primary" @click.native="complete">支付</x-button>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
import GoodsItem from '../components/goodsitem'
import { Group, Cell, CellFormPreview, Scroller, TransferDom, Popup, PopupHeader, Radio, XButton } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    GoodsItem,
    Group,
    Cell,
    CellFormPreview,
    Scroller,
    Popup,
    PopupHeader,
    Radio,
    XButton
  },
  data () {
    return {
      currentPath: '',
      defaultDelivery: {
        name: 'test',
        mobile: '15903466276',
        address: '太原市小店区'
      },
      goodsNums: 2,
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
      ],
      showExpressWay: false,
      express: '',
      expressWay: [
        '圆通',
        'ems'
      ],
      coupon: '无可用优惠券',
      priceLlist: [{
        label: '商品金额',
        value: '￥200.0'
      }, {
        label: '运费',
        value: '￥6.0'
      }, {
        label: '优惠券',
        value: '-￥0.0'
      }]
    }
  },
  methods: {
    selectExpress () {
      this.showExpressWay = true
    },
    selectExpressWay (index) {
      console.log(this.express)
      this.showExpressWay = false
    }
  },
  mounted: function () {
    this.currentPath = this.$route.path + '?' + this.$route.query
  }
}
</script>
<style>
.order-good-item{
  padding-bottom: 2px;
}
</style>
