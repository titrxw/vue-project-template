<template>
  <div class="com-category">
    <transition name="fade-choose">
      <section class="good_container">
        <section class="menu_container">
          <section class="menu_left" id="wrapper_menu" ref="wrapperMenu">
              <ul>
                  <li v-for="(item,index) in categoryList" :key="index" class="menu_left_li" :class="{activity_menu: index == categoryIndex}" @click="chooseCategory(index)">
                      <img :src="item.icon" v-if="item.icon">
                      <span>{{item.text}}</span>
                      <!--<span class="category_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>-->
                  </li>
              </ul>
          </section>
          <section class="menu_right" ref="menugoodList">
              <ul>
                  <li v-for="(item,index) in categoryList" :key="index">
                    <slot :name="index"></slot>
                  </li>
              </ul>
          </section>
        </section>
      </section>
    </transition>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  props: ['categoryList'],
  data () {
    return {
      categoryIndex: 0,
      categoryIndexChange: true,
      categorycroll: null,
      categoryListTop: []
    }
  },
  methods: {
    chooseCategory (index) {
      this.categoryIndex = index
      this.categoryIndexChange = false
      this.categorycroll.scrollTo(0, -this.categoryListTop[index], 400)
      this.categorycroll.on('scrollEnd', () => {
        this.categoryIndexChange = true
      })
    },
    listenScroll (element) {
      this.categorycroll = new BScroll(element, {
        probeType: 3,
        deceleration: 0.001,
        bounce: false,
        swipeTime: 2000,
        click: true
      })
      const wrapperMenu = new BScroll(this.$refs.wrapperMenu, {
        click: true
      })
      const wrapMenuHeight = this.$refs.wrapperMenu.clientHeight
      this.categorycroll.on('scroll', (pos) => {
        if (!this.$refs.wrapperMenu) {
          return ''
        }
        this.categoryListTop.forEach((item, index) => {
          if (this.categoryIndexChange && Math.abs(Math.round(pos.y)) >= item) {
            const menuList = this.$refs.wrapperMenu.querySelectorAll('.activity_menu')
            const el = menuList[0]
            this.categoryIndex = index
            console.log(wrapMenuHeight)
            wrapperMenu.scrollToElement(el, 500, 0, -(wrapMenuHeight / 2 - 50))
          }
        })
      })
    },
    getCategoryListHeight () {
      const listContainer = this.$refs.menugoodList
      const listArr = Array.from(listContainer.children[0].children)
      listArr.forEach((item, index) => {
        this.categoryListTop[index] = item.offsetTop
      })
      this.listenScroll(listContainer)
    }
  },
  mounted: function () {
    this.getCategoryListHeight()
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/mixin';
a, article, aside, b, body, button, dd, div, dl, dt, figcaption, figure, footer, h1, h2, h3, h4, h5, h6, header, i, input, li, nav, p, section, select, span, textarea, ul {
    padding: 0;
    margin: 0;
    list-style: none;
    font-style: normal;
    text-decoration: none;
    border: none;
    color: #333;
    font-weight: 400;
    font-family: Microsoft Yahei;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
}
.menu_container
{
    display: flex;
    flex: 1;
    overflow-y: hidden;
    position: relative;
    .menu_left{
        width: 3.8rem;
        .menu_left_li{
            padding: .7rem .3rem;
            border-bottom: 0.025rem solid #ededed;
            box-sizing: border-box;
            border-left: 0.15rem solid #f8f8f8;
            position: relative;
            img{
                @include wh(.5rem, .6rem);
            }
            span{
                @include sc(.6rem, #666);
            }
            .category_num{
                position: absolute;
                top: .1rem;
                right: .1rem;
                background-color: #ff461d;
                line-height: .6rem;
                text-align: center;
                border-radius: 50%;
                border: 0.025rem solid #ff461d;
                min-width: .6rem;
                height: .6rem;
                @include sc(.5rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
            }
        }
        .activity_menu{
            border-left: 0.15rem solid #a565ff;
            background-color: #fff;
            span:nth-of-type(1){
                font-weight: bold;
            }
        }
    }
    .menu_right{
        flex: 4;
        overflow-y: auto;
    }
}
.fade-choose-enter-active, .fade-choose-leave-active {
    transition: opacity .5s;
}
.fade-choose-leave, .fade-choose-leave-active {
    display: none;
}
.fade-choose-enter, .fade-choose-leave-active {
    opacity: 0;
}
.good_container{
    display: flex;
    flex: 1;
    height: 100%;
    padding-bottom: 2rem;
}
</style>
