<template>
  <div>
    <tab :line-width=3 v-model="tabIndex">
          <tab-item class="vux-center" :selected="defaultTab === item" v-for="(item, index) in tabList" :key="index">{{item}}</tab-item>
      </tab>
      <swiper :show-dots="false" :style="swipStyle" v-model="tabIndex"  @on-index-change="onSwiperItemIndexChange">
          <swiper-item v-for="(item, aindex) in commentList" :key="aindex" style="height:100%;">
              <div v-if="item" class="tab-swiper vux-center">
                  <scroller lock-x height="100%" @on-scroll-bottom="onScrollBottom" ref="scrollerEvent" :scroll-bottom-offst="10">
                      <div class="box2">
                        <commentItem v-for="(citem, index) in item"  :key="index" :commentInfo="citem"></commentItem>
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
import commentItem from '../components/comment'
import { Tab, TabItem, Swiper, SwiperItem, Scroller } from 'vux'
export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    commentItem,
    Scroller
  },
  data () {
    return {
      tabIndex: 0,
      swipStyle: '',
      defaultTab: '好评',
      tabList: ['好评', '差评', '有图'],
      commentList: [
        [
          {
            id: 1,
            user: '测试',
            raters: 4,
            content: 'sadsadsfsdf',
            time: '2017-7-27',
            attr: '黑色'
          },
          {
            id: 1,
            user: '测试',
            raters: 4,
            content: 'sadsadsfsdf',
            time: '2017-7-27',
            attr: '黑色'
          },
          {
            id: 1,
            user: '测试',
            raters: 4,
            content: 'sadsadsfsdf',
            time: '2017-7-27',
            attr: '黑色'
          },
          {
            id: 1,
            user: '测试',
            raters: 4,
            content: 'sadsadsfsdf',
            time: '2017-7-27',
            attr: '黑色'
          }
        ],
        [
          {
            id: 1,
            user: '测试',
            raters: 4,
            content: 'sadsadsfsdf',
            time: '2017-7-27',
            attr: '黑色'
          },
          {
            id: 1,
            user: '测试',
            raters: 4,
            content: 'sadsadsfsdf',
            time: '2017-7-27',
            attr: '黑色'
          }
        ],
        [
          {
            id: 1,
            user: '测试',
            raters: 4,
            content: 'sadsadsfsdf',
            time: '2017-7-27',
            attr: '黑色'
          },
          {
            id: 1,
            user: '测试',
            raters: 4,
            content: 'sadsadsfsdf',
            time: '2017-7-27',
            attr: '黑色'
          }
        ]
      ]
    }
  },
  methods: {
    onScrollBottom () {
      console.log(23)
    },
    onSwiperItemIndexChange (index) {
      console.log(index)
    }
  },
  mounted: function () {
    let height = $(window).height() - 44
    this.swipStyle = 'height:' + height + 'px'
  }
}
</script>
<style>
.vux-slider > .vux-swiper{
  height:100%;
}
.tab-swiper{
  height:100%;
}
</style>

