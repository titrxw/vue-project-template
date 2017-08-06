<template>
<div>
  <div class="good-box">
  <div class="goods-info">
    <div class="thumbs">
      <swiper style="height: 310px;" loop auto :list="goodsInfo['thumbs']" :index="thumbs_index"></swiper>
    </div>
    <div class="goods-title">
      <span class="weui-form-preview__value">人的功夫的好高房价房管局规划局法规</span>
      <span class="weui-form-preview__value">12</span>
      <span class="weui-form-preview__value">12</span>
    </div>
    <group>
    <cell
      title="领券"
      is-link
      :border-intent="false"
      :arrow-direction="showCoupon ? 'up' : 'down'"
      @click.native="showCoupon = !showCoupon"></cell>
      <template v-if="showCoupon">
        <cell :title="item" value="领取"  v-for="(item, index) in goodsInfo['couponList']"  :key="index"></cell>
      </template>
    </group>
    <group>
      <cell
        title="促销"
        is-link
        :border-intent="false"
        :arrow-direction="showPrompt ? 'up' : 'down'"
        @click.native="showPrompt = !showPrompt"></cell>
        <template v-if="showPrompt">
          <cell :title="item" value="领取"  v-for="(item, index) in goodsInfo['promptList']"  :key="index"></cell>
        </template>
    </group>
    <group>
    <cell
      :title="$t('已选  ') + goodsInfo['attrList'][selectAttr - 1]['name'] + ', ' + selectNum"
      is-link
      :border-intent="false"
      :arrow-direction="showSelect ? 'up' : 'down'"
      @click.native="showSelect = !showSelect"></cell>
      <template v-if="showSelect">
        <cell title="规格">
        <checker
          v-model="selectAttr"
          default-item-class="attr-item"
          selected-item-class="attr-item-selected"
          >
          <checker-item v-for="(item, index) in goodsInfo['attrList']"  :key="index" :value="item['id']">{{ item['name'] }}</checker-item>
        </checker>
        </cell>
        <x-number title="数量" :min="0" :max="goodsInfo['store']" v-model="selectNum" :value="selectNum"></x-number>
      </template>
    </group>
    <group>
      <cell
        title="评价"
        is-link
        :border-intent="false"
        :arrow-direction="showComment ? 'up' : 'down'"
        @click.native="showComment = !showComment">
        <div>
          <span style="color:red;">90%</span>
          <span>好评</span>
        </div>
        </cell>
        <template v-if="showComment">
          <commentItem v-for="(item, index) in goodsInfo['commentList']"  :key="index" :commentInfo="item"></commentItem>
          <cell :title="$t('共') + goodsInfo['commentCount'] + $t('条评价')" value="查看更多" is-link :link="{path: 'commentList?id=' + goodsInfo['id']}"></cell>
        </template>
    </group>
    <group style="height:100%;">
      <tab :line-width=3 active-color='#a565ff' v-model="tabIndex">
          <tab-item class="vux-center" :selected="defaultTab === item" v-for="(item, index) in tabList" :key="index">{{item}}</tab-item>
      </tab>
      <swiper style="height: 100%;" :show-dots="false" v-model="tabIndex" @on-index-change="onSwiperItemIndexChange">
          <swiper-item v-for="(item, aindex) in goodsElseInfo" :key="aindex">
              <div v-if="item" class="tab-swiper vux-center">
                <div class="box2">
                  {{ item['content'] }}
                </div>
              </div>
              <div v-else class="hide">
              </div>
          </swiper-item>
      </swiper>
    </group>
  </div>
  </div>
  <div class="fix-tab">
      <a class=" box-flex-c" id="add-cart">
        <em class="btm-act-icn" id="shoppingCart">
					<i class="order-numbers" id="carNum">5</i>
				</em>
        <span class="focus-info">购物车</span>
      </a>
      <a class="box-flex-c add-to-cart">添加到购物车</a>
      <a class="box-flex-c now-by"  @click="buyNow">立即购买</a>
  </div>
</div>
</template>
<script>
import commentItem from '../components/comment'
import { Tab, TabItem, Swiper, SwiperItem, Checker, CheckerItem, Cell, Group, XNumber } from 'vux'
export default {
  components: {
    Swiper,
    Cell,
    Group,
    XNumber,
    Checker,
    CheckerItem,
    commentItem,
    Tab,
    TabItem,
    SwiperItem
  },
  data () {
    return {
      tabIndex: 0,
      defaultTab: '商品详情',
      tabList: ['商品详情', '规格参数', '售后保障'],
      address: [],
      selectAttrText: '',
      selectAttr: 1,
      selectNum: 1,
      showCoupon: false,
      showPrompt: false,
      showSelect: true,
      showComment: true,
      thumbs_index: 0,
      goodsInfo: {
        thumbs: [
          {
            url: 'javascript:',
            img: 'https://static.vux.li/demo/1.jpg',
            title: '送你一朵fua'
          },
          {
            url: 'javascript:',
            img: 'https://static.vux.li/demo/2.jpg',
            title: '送你一辆车'
          },
          {
            url: 'javascript:',
            img: 'https://static.vux.li/demo/3.jpg',
            title: '送你一次旅行'
          }
        ],
        couponList: [
          '优惠券',
          '优惠券',
          '优惠券'
        ],
        promptList: [
          '优惠券',
          '优惠券',
          '优惠券'
        ],
        attrList: [
          {
            id: 1,
            name: '白色'
          },
          {
            id: 2,
            name: '黑色'
          },
          {
            id: 3,
            name: '蓝色'
          }
        ],
        commentList: [
          {
            id: 1,
            user: '测试',
            raters: 4,
            content: 'sadsadsfsdf',
            time: '2017-7-27',
            attr: '黑色',
            imgs: [
              'https://static.vux.li/demo/3.jpg',
              'https://static.vux.li/demo/3.jpg',
              'https://static.vux.li/demo/3.jpg',
              'https://static.vux.li/demo/3.jpg',
              'https://static.vux.li/demo/3.jpg'
            ]
          },
          {
            id: 1,
            user: '测试',
            raters: 4,
            content: 'sadsadsfsdf',
            time: '2017-7-27',
            attr: '黑色',
            imgs: [
              'https://static.vux.li/demo/3.jpg',
              'https://static.vux.li/demo/3.jpg',
              'https://static.vux.li/demo/3.jpg',
              'https://static.vux.li/demo/3.jpg',
              'https://static.vux.li/demo/3.jpg',
              'https://static.vux.li/demo/3.jpg',
              'https://static.vux.li/demo/3.jpg',
              'https://static.vux.li/demo/3.jpg',
              'https://static.vux.li/demo/3.jpg',
              'https://static.vux.li/demo/3.jpg'
            ]
          }
        ],
        id: 1,
        commentCount: 3000,
        store: 12,
        price: 120,
        promptPrice: 100
      },
      goodsElseInfo: [
        {
          content: 'dfsfdsfsdf'
        },
        {
          content: 'dfsfdsfsdf'
        },
        {
          content: 'dfsfdsfsdf'
        }
      ]
    }
  },
  methods: {
    onScrollBottom () {
      console.log(23)
    },
    onSwiperItemIndexChange (index) {
      console.log(index)
    },
    buyNow () {
      this.$router.push({path: 'settlement?id=' + this.goodsInfo['id']})
    }
  }
}
</script>
<style>
.good-box{
  margin-bottom:70px;
}
.goods-title{
  margin:10px;
}
.attr-item {
  width: 80px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
}
.attr-item-selected {
  background: #ffffff url('../assets/images/active.png') no-repeat right bottom;
  border-color: #ff4a00;
}
.vux-slider > .vux-swiper{
  height:100%;
}
.fix-tab{
  display: flex;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 50px;
  background: #fefefe;
  border-top: 1px solid #ccc;
}
#add-cart{
  -webkit-box-flex: 0.5;
  -webkit-flex: 0.5;
  flex: 0.5;
}
.fix-tab .box-flex-c {
  display: block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  line-height: 50px;
  text-align: center;
  flex: 1;
  -webkit-flex-basis: 0;
  flex-basis: 0;
}
.btm-act-icn {
    width: 23px;
    height: 21px;
    display: block;
    margin: 0 auto;
    background-color: #fff;
    margin-top: 10px;
    margin-bottom: 4px;
    background: url('../assets/images/cart_sprits_all.png') no-repeat;
    background-size: 98px;
    position: relative;
    background-position-x: -1px;
    background-position-y: -22px;
}
.order-numbers {
    display: inline-block;
    position: absolute;
    top: -5px;
    background-color: #f23030;
    line-height: 10px;
    font-style: normal;
    border-radius: 8px;
    padding: 0 4px;
    font-size: 8px;
    color: #fff;
    right: -9px;
    border: 1px solid #fff;
}
.fix-tab a span {
    display: block;
    line-height: 9px;
    height: 15px;
    text-align: center;
    font-size: 13px;
}
.add-to-cart{
  background-color: #ffb03f;
  color:#fff;
}
.now-by{
  background-color: #f23030;
  color:#fff;
}
</style>

