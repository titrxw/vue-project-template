<template>
  <div class="payments">
    <tab :line-width=3 active-color='#a565ff' v-model="index">
        <tab-item class="vux-center" :selected="defaultTab === item" v-for="(item, index) in tabList" @click="demo2 = item" :key="index">{{item}}</tab-item>
    </tab>
    <swiper :show-dots="false" v-model="index" :style="swiperStyle" @on-index-change="onSwiperItemIndexChange">
        <swiper-item v-for="(item, aindex) in data" :key="aindex" style="height:100%;">
            <div v-if="item" class="tab-swiper vux-center">
                <scroller lock-x height="100%" @on-scroll-bottom="onScrollBottom" ref="scrollerEvent" :scroll-bottom-offst="10">
                    <div class="box2">
                      <div class="cells" v-for="(aitem, cindex) in item" :key="cindex" @click="orderDetail(aitem.id, aitem.status)">
                          <orderItem 
                            :index="[aindex, cindex]"
                            :bodyItems="aitem.goods" 
                            :footerButtons="aitem.status" 
                            :conf="conf" 
                            :header-label="$t('金额：') + aitem.price" 
                            :header-value="convertStatus(aitem.status)"
                            @goComment="goComment"
                            @deleteOrder="deleteOrder"
                            @goPay="goPay"></orderItem>
                      </div>
                    </div>
                </scroller>
            </div>
            <div v-else class="hide">
            </div>
        </swiper-item>
    </swiper>
  </div>
</template>
<script>
import $ from 'jquery'
import orderItem from '../components/orderitem'
import { Tab, TabItem, Swiper, SwiperItem, Group, Cell, Scroller } from 'vux'
export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Group,
    Cell,
    Scroller,
    orderItem
  },
  data () {
    return {
      index: 0,
      defaultTab: '全部账单',
      tabList: ['全部账单', '未支付', '待收货'],
      swiperStyle: '',
      // item中的按钮配置
      conf: {
        1: [
          {
            text: '去评价',
            click: 'goComment'
          },
          {
            text: '删除',
            click: 'deleteOrder'
          }
        ],
        2: [
          {
            text: '支付',
            click: 'goPay'
          }
        ],
        3: [
          {
            text: '收货',
            click: 'goComment'
          }
        ]
      },
      data: [
        [
          {
            id: 1,
            price: 2000.0,
            status: 1,
            goods: [
              {
                price: 2000.0,
                img: require('../assets/images/test-3.png'),
                list: [
                  {
                    label: '账单金额',
                    value: '团日活动换个房间预付款吗，该u路该高科技航空路过 '
                  },
                  {
                    label: '到期房款日',
                    value: '2017-7-7'
                  }
                ]
              },
              {
                price: 2000.0,
                img: require('../assets/images/test-3.png'),
                list: [
                  {
                    label: '账单金额',
                    value: '团日活动换个房间预付款吗，该u路该高科技航空路过 '
                  },
                  {
                    label: '到期房款日',
                    value: '2017-7-7'
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            price: 2000.0,
            status: 1,
            goods: [
              {
                price: 2000.0,
                img: require('../assets/images/test-3.png'),
                list: [
                  {
                    label: '账单金额',
                    value: '团日活动换个房间预付款吗，该u路该高科技航空路过 '
                  },
                  {
                    label: '到期房款日',
                    value: '2017-7-7'
                  }
                ]
              },
              {
                price: 2000.0,
                img: require('../assets/images/test-3.png'),
                list: [
                  {
                    label: '账单金额',
                    value: '团日活动换个房间预付款吗，该u路该高科技航空路过 '
                  },
                  {
                    label: '到期房款日',
                    value: '2017-7-7'
                  }
                ]
              }
            ]
          }
        ],
        [
          {
            id: 1,
            price: 2000.0,
            status: 2,
            goods: [
              {
                price: 2000.0,
                img: require('../assets/images/test-3.png'),
                list: [
                  {
                    label: '账单金额',
                    value: '团日活动换个房间预付款吗，该u路该高科技航空路过 '
                  },
                  {
                    label: '到期房款日',
                    value: '2017-7-7'
                  }
                ]
              },
              {
                price: 2000.0,
                img: require('../assets/images/test-3.png'),
                list: [
                  {
                    label: '账单金额',
                    value: '团日活动换个房间预付款吗，该u路该高科技航空路过 '
                  },
                  {
                    label: '到期房款日',
                    value: '2017-7-7'
                  }
                ]
              }
            ]
          }
        ],
        [
          {
            id: 1,
            price: 2000.0,
            status: 3,
            goods: [
              {
                img: require('../assets/images/test-3.png'),
                list: [
                  {
                    label: '账单金额',
                    value: '团日活动换个房间预付款吗，该u路该高科技航空路过 '
                  },
                  {
                    label: '到期房款日',
                    value: '2017-7-7'
                  }
                ]
              },
              {
                img: require('../assets/images/test-3.png'),
                list: [
                  {
                    label: '账单金额',
                    value: '团日活动换个房间预付款吗，该u路该高科技航空路过 '
                  },
                  {
                    label: '到期房款日',
                    value: '2017-7-7'
                  }
                ]
              }
            ]
          }
        ],
        [
        ],
        [
        ]
      ]
    }
  },
  mounted: function () {
    let type = parseInt(this.$route.query.type)
    if (type === 2 || type === 3) {
      this.defaultTab = this.tabList[type - 1]
    }
    let scrollHeight = $(window).height() - 44
    scrollHeight = scrollHeight + 'px'
    this.swiperStyle = 'height:' + scrollHeight
    $('.vux-swiper').css('height', '100%')
  },
  methods: {
    onScrollBottom () {
      console.log(23)
    },
    orderDetail (id, status) {
      this.$router.push('orderDetail?id=' + id + '&status=' + status)
    },
    convertStatus (status) {
      if (status === 1) {
        return '已支付'
      } else if (status === 2) {
        return '未支付'
      } else {
        return '待收货'
      }
    },
    onSwiperItemIndexChange (index) {
      console.log(index)
    },
    goComment (result) {
      console.log(result)
      this.$router.push({path: 'commentGoods?id=' + this.data[result[0]][result[1]]['id']})
    },
    deleteOrder (result) {
      console.log(result)
    },
    goPay (result) {
      console.log(result)
    }
  }
}
</script>
<style>
.tab-swiper{
    height:100%;
}
.weui-cells{
    margin-top:5px;
}
.cells{
    background: #fff;
    margin-top:10px;
}
.hide{
    display: none;
}
.cellbox{
    background: #a565ff;
    color:#fff;
}
.payments{
  height: 100%;
}
.weui-cell:before{
  border-top: 1px solid #efefef;
}
</style>
