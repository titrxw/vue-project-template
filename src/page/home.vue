<template>
  <div class="home">
    <div class="head">
      <a  class="lazy-load-box">
        <img v-if="bannerSrc" v-lazy="bannerSrc"/>
      </a>
    </div>
      <div class="tab" :class="showHome? 'tab-left': 'tab-right'">
        <yd-button class="tab-btn" type="hollow" @click.native="showHome = true">相寓HOME</yd-button>
        <yd-button type="hollow" class="tab-btn" style="margin-left:-4px;" @click.native="showHome = false">业主委托</yd-button>
      </div>
      <div class="tab-content">
        <div v-show="showHome" class="tab-home">
          <yd-cell-group v-if="specialList.length > 0">
            <yd-cell-item>
              <span slot="left">
                <div class="common-cell">
                  <span class="body-title font-size-20">专题</span>
                  <span class="body-desc">百分百好房源，真实有效</span>
                </div>
              </span>
            </yd-cell-item>
            <swiper :options="swiperOption" class="content">
              <swiper-slide v-for="(item, index) in specialList" :key="index" style="height:3.4rem;" @click.native="$router.push('special/detail?id=' + item.id)">
                  <div class="swip-item lazy-load-box" style="height:2.38rem;"><img v-lazy="imgHost + item.project_img"/></div>
                  <div class="swip-card-foot">
                    <span>{{ item.title }}</span>
                    <span>{{ item.description }}</span>
                  </div>
              </swiper-slide>
            </swiper>
          </yd-cell-group>
          <yd-cell-group>
            <yd-cell-item arrow @click.native="goHouse">
              <span slot="left">
                <div class="common-cell">
                  <span class="body-title font-size-20">精选房源</span>
                  <span class="body-desc">百分百好房源，真实有效</span>
                </div>
              </span>
              <span slot="right">查看更多</span>
            </yd-cell-item>
            <swiper :options="swiperOption" class="content">
              <swiper-slide v-for="(item, index) in houseList" :key="index" style="height:3.4rem;" @click.native="$router.push('house/detail?id=' + item.id)">
                  <div class="swip-item lazy-load-box" style="height:2.38rem;"><img v-lazy="imgHost + item.house_img"/></div>
                  <div class="swip-card-foot">
                    <span>{{ item.house_name }}</span>
                    <span>￥{{ item.month_rental }}/月</span>
                  </div>
              </swiper-slide>
            </swiper>
          </yd-cell-group>
          <yd-cell-group>
            <yd-cell-item arrow @click.native="goStyle">
              <span slot="left">
                <div class="common-cell">
                  <span class="body-title font-size-20">多种风格</span>
                  <span class="body-desc">多种装修风格，任您挑选</span>
                </div>
              </span>
              <span slot="right">查看更多</span>
            </yd-cell-item>
            <swiper :options="swiperOption" class="content">
              <swiper-slide v-for="(item, index) in home.swips" :key="index" style="height:2.48rem;" @click.native="goStyle"><a class="swip-item lazy-load-box"><img v-lazy="item.pic"/></a></swiper-slide>
            </swiper>
          </yd-cell-group>
          <yd-cell-group>
            <div class="home-ad" @click="call">
                <img src="../assets/images/ad.png"/>
            </div>
          </yd-cell-group>
          <yd-cell-group>
            <yd-cell-item>
              <span slot="left">
                <div class="common-cell">
                  <span class="body-title font-size-20">贴心配置</span>
                  <span class="body-desc">品牌家电</span>
                </div>
              </span>
            </yd-cell-item>
            <div class="head body-big-img">
              <a  class="lazy-load-box">
                <img v-lazy="home.pics[0]"/>
              </a>
            </div>
            <div class="desc">
              <div class="desc-item">
                <div class="desc-item-title">
                  <span class="desc-item-icon"></span>
                  <span class="desc-item-title">品牌家电</span>
                </div>
                <span class="desc-item-else">空调，电视，冰箱，洗衣机，电磁炉/燃气灶等</span>
              </div>
              <div class="desc-item">
                <div class="desc-item-title">
                  <span class="desc-item-icon"></span>
                  <span class="desc-item-title">全套家具</span>
                </div>
                <span class="desc-item-else">睡床，床头柜，衣柜，电视柜，餐具，茶几等</span>
              </div>
              <div class="desc-item">
                <div class="desc-item-title">
                  <span class="desc-item-icon"></span>
                  <span class="desc-item-title">配套供应</span>
                </div>
                <span class="desc-item-else">厨具，洗漱用品(沐浴露，润肤露等)，一次性拖鞋等</span>
              </div>
            </div>
          </yd-cell-group>
          <yd-cell-group style="margin-bottom: 0px;">
            <yd-cell-item>
              <span slot="left">
                <div class="common-cell">
                  <span class="body-title font-size-20">环保材料</span>
                  <span class="body-desc">W1级标准</span>
                </div>
              </span>
            </yd-cell-item>
            <div class="head body-big-img">
              <a  class="lazy-load-box">
                <img style="height: auto;" v-lazy="home.pics[1]"/>
              </a>
            </div>
          </yd-cell-group>
        </div>
        <div  v-show="!showHome" class="tab-else">
          <yd-cell-group>
            <yd-cell-item>
              <span slot="left">
                <div class="common-cell">
                  <span class="body-title font-size-20">房屋出租，交给相寓托管</span>
                  <span class="body-desc">做省心房东</span>
                </div>
              </span>
            </yd-cell-item>
            <yd-button-group style="margin-bottom:10px;">
              <!-- <yd-button type="primary"  size="large" style="margin-top:0px;" @click.native="selfEntrustment">发布房源</yd-button> -->
              <yd-button type="primary"  size="large" style="margin-top:0px;" @click.native="onlineEntrustment">在线委托</yd-button>
            </yd-button-group>
            <a class="lazy-load-box">
              <img v-lazy="home.entrustmentPics[0]"/>
            </a>
          </yd-cell-group>
          <yd-cell-group>
            <yd-cell-item>
              <span slot="left">
                <div class="common-cell">
                  <span class="body-title font-size-20">相寓托管的两种方式</span>
                  <span class="body-desc">相寓根据房屋品质，租约年限等，为您提供两种方式</span>
                </div>
              </span>
            </yd-cell-item>
            <div class="head body-big-img">
              <a class="lazy-load-box">
                <img v-lazy="home.entrustmentPics[1]"/>
              </a>
            </div>
            <div class="head body-big-img" style="margin-top:15px;">
              <a class="lazy-load-box">
                <img v-lazy="home.entrustmentPics[2]"/>
              </a>
            </div>
          </yd-cell-group>
          <yd-button-group>
              <yd-button type="hollow"  size="large" @click.native="onlineEntrustment">在线委托</yd-button>
          </yd-button-group>
          <div class="bottom-logo">
            <img :src="home.entrustmentPics[3]">
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import api from '../api'
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      bannerSrc: require('../assets/images/demo/home/banner.png'),
      showHome: true,
      swiperOption: {
        slidesPerView: 1.8,
        spaceBetween: 10,
        freeMode: true
      },
      home: {
        pics: [
          require('../assets/images/demo/home/get-keting.png'),
          require('../assets/images/demo/home/home-bottom.png')
        ],
        entrustmentPics: [
          require('../assets/images/demo/home/weituo_desc.png'),
          require('../assets/images/demo/home/weituo1.png'),
          require('../assets/images/demo/home/weituo2.png'),
          require('../assets/images/white-logo.png')
        ],
        swips: [
          {
            pic: require('../assets/images/demo/home/sun.png'),
            href: ''
          },
          {
            pic: require('../assets/images/demo/home/kabu.png'),
            href: ''
          },
          {
            pic: require('../assets/images/demo/home/hongdou.png'),
            href: ''
          },
          {
            pic: require('../assets/images/demo/home/xingqing.png'),
            href: ''
          },
          {
            pic: require('../assets/images/demo/home/luoman.png'),
            href: ''
          }
        ]
      },
      houseList: [],
      specialList: []
    }
  },
  methods: {
    onlineEntrustment () {
      this.$router.push({path: '/house/onlineAdd'})
    },
    selfEntrustment () {
      this.$router.push({path: '/house/add'})
    },
    goStyle () {
      this.$router.push({path: '/style'})
    },
    goHouse () {
      this.$router.push({path: '/house'})
    },
    call () {
      window.location.href = 'tel:' + this.serviceTel
    }
  },
  mounted: async function () {
    if (this.$route.query.operate == 'lease') {
      this.showHome = false
    }
    let result = await api.houseList({
      page_size: 5
    })
    if (result) {
      this.houseList = result
    }

    result = await api.specialList()
    if (result) {
      this.specialList = result
    }
  }
}
</script>
<style scoped lang="less">
@import '../assets/style/conf.less';
.home{
  width:100%;
  img[lazy=loaded]{
     width:100%;
  }
  .head{
    height:4rem;
    img[lazy=loaded]{
      height:100%;
    }
  }
  .tab{
    height:.9rem;
    background: #fff;
    .tab-btn{
      border-radius:0px;
      height:100%;
      width:80px;
      margin: 0px;
      border: none;
      background-color:transparent;
    }
  }
  .tab-left{
    background-image: url('../assets/images/left-tab.png');
    background-size: 100% 100%;
  }
  .tab-right{
    background-image: url('../assets/images/right-tab.png');
    background-size: 100% 100%;
  }
  .tab-content{
    .home-ad img{
      width: 100%;
      height: 100%;
      display: block;
    }
    .common-cell{
        margin-top: 8px;
        margin-bottom: 8px;
        .body-title{
            display: block;
            font-weight: bold;
        }
        .body-desc{
          color: @text-gray;
          font-size: @gray-font-size;
          margin-top: 3px;
          display: block;
        }
    }
    .swip-item{
      height:100%;
      img[lazy=loaded]{
        height:100%;
      }
    }
    .swip-card-foot{
        height:.62rem;
        span{
          display: block;
          margin-top:.12rem;
          font-size: 0.26rem;
        }
      }
    .content{
      padding: @theme-padding;
      padding-top:0px;
          padding-bottom: 0.06rem;
    }
    .desc{
      padding: @theme-padding;
      .desc-item{
        margin-bottom: 10px;
        .desc-item-icon{
          background: url('../assets/images/rec.png');
          height: .4rem;
          width: .09rem;
          margin-right: .2rem;
          float: left;
        }
        .desc-item-title{
          display: flex;
          align-items: center;
          height: 25px;
          .desc-item-title{
            font-size: 14px;
          }
        }
        .desc-item-else{
          color:@text-gray;
          display: block;
          margin-top: 3px;
          font-size: @gray-font-size;
        }
      }
    }
    .bottom-logo{
      height: .8rem;
      margin: .24rem;
      text-align: center;
      img{
        height: 100%;
        width: 1.16rem;
        margin: 0 auto;
      }
    }
  }

  .body-big-img{
    height:auto;
    padding-left: @theme-padding;
    padding-right: @theme-padding;
  }
}
</style>

