<template>
  <div class="search">
    <SearchItem @search="search" :searchResults="result" :searchValue="searchValue" ref="search">
      <div class="history" v-if="historySearch">
        <divider>历史搜索</divider>
        <checker v-model="checkHistorySearch" default-item-class="check-item" selected-item-class="check-item-selected">
          <checker-item v-for="(item, index) in historySearch" :key="index"  :value="item" @on-item-click="onItemClick('history', item)">{{ item }}</checker-item>
        </checker>
      </div>
      <div class="hot"  v-if="hotSearch">
        <divider>热搜</divider>
        <checker v-model="checkHotSearch" default-item-class="check-item" selected-item-class="check-item-selected">
          <checker-item v-for="(item, index) in hotSearch" :key="index"  :value="item" @on-item-click="onItemClick('hot', item)">{{ item }}</checker-item>
        </checker>
      </div>
    </SearchItem>
    <ScreenSearch>
      <ScreenItem :text="item['name']" v-model="screentIndex" :secClick="true" :index="index" v-for="(item, index) in screenData" @select="chooseType" :key="index">
        <transition name="showlist" v-if="item['type'] == 'list'">
          <section  class="sort_detail_type">
            <ul class="sort_list_container" @click="sortList($event)">
              <li class="sort_list_li" v-for="(citem, cindex) in item['items']" :key="cindex" @click="doSearch(citem, index)">
                <p><span>{{ citem.name }}</span></p>
              </li>
            </ul>
          </section>
        </transition>
        <transition name="showlist" v-if="item['type'] == 'screen'">
          <section class="sort_detail_type filter_container">
            <section  v-for="(citem, cindex) in item['items']" :key="cindex" style="width: 100%;">
              <header class="filter_header_style">{{ citem.name }}</header>
              <checker v-if="citem.type == 'mutl'" v-model="citem['check']" type="checkbox" default-item-class="check-item" selected-item-class="check-item-selected">
                <checker-item v-for="(chitem, chindex) in citem['items']" :key="chindex" :value="chitem.id">{{ chitem.name }}</checker-item>
              </checker>
              <checker v-else v-model="citem['check']" default-item-class="check-item" selected-item-class="check-item-selected">
                <checker-item v-for="(chitem, chindex) in citem['items']" :key="chindex" :value="chitem.id">{{ chitem.name }}</checker-item>
              </checker>
            </section>
            <footer v-if="item['type'] == 'screen'" class="confirm_filter">
              <div class="clear_all filter_button_style" @click="clearSelect(index)">清空</div>
              <div class="confirm_select filter_button_style" @click="confirmSelectFun(index)">确定</div>
            </footer>
          </section>
        </transition>
      </ScreenItem>
			<div class="search-result" slot="list" style="height:100%;" >
        <scroller lock-x style="height:100%;" @on-scroll-bottom="onScrollBottom" :scroll-bottom-offst="10">
          <div class="search-scroll">
            <goodsItem v-for="(item, index) in searchResult" :key="index" :goodsInfo="item"></goodsItem>
          </div>
        </scroller>
    </div>
		</ScreenSearch>
  </div>
</template>
<script>
import SearchItem from '../components/search'
import ScreenItem from '../components/screenItem'
import ScreenSearch from '../components/screenSearch'
import goodsItem from '../components/goodsitem'
import { Scroller, Checker, CheckerItem, Divider } from 'vux'
export default {
  components: {
    goodsItem,
    Scroller,
    Checker,
    CheckerItem,
    SearchItem,
    ScreenSearch,
    ScreenItem,
    Divider
  },
  data () {
    return {
      screentIndex: -1,
      checkHistorySearch: '',
      checkHotSearch: '',
      searchValue: '',
      result: [],
      listenerChange: true,
      historySearch: [
        '测试'
      ],
      hotSearch: [
        '测试1'
      ],
      searchResult: [
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
        },
        {
          id: 1,
          title: '的双方各东风股份的股份的符合规定道德规范',
          price: 100.0,
          promptPrice: 80.9,
          img: require('../assets/images/test-3.png')
        }
      ],
      screenData: [
        {
          name: '综合',
          type: 'list',
          items: [
            {
              id: 1,
              name: '测试'
            },
            {
              id: 3,
              name: '测试'
            },
            {
              id: 4,
              name: '测试'
            }
          ]
        },
        {
          name: '测试1',
          type: ''
        },
        {
          name: '测试2',
          type: ''
        },
        {
          name: '测试3',
          type: 'screen',
          items: [
            {
              name: '测试',
              type: '',
              items: [
                {
                  id: 1,
                  name: '测试'
                },
                {
                  id: 2,
                  name: '测试'
                },
                {
                  id: 3,
                  name: '测试'
                },
                {
                  id: 4,
                  name: '测试'
                },
                {
                  id: 5,
                  name: '测试'
                },
                {
                  id: 6,
                  name: '测试'
                },
                {
                  id: 7,
                  name: '测试'
                },
                {
                  id: 8,
                  name: '测试'
                }
              ]
            },
            {
              name: '测试1',
              type: 'mutl',
              items: [
                {
                  id: 1,
                  name: '测试'
                },
                {
                  id: 2,
                  name: '测试'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    onScrollBottom () {
      console.log('load more')
    },
    search (result) {
      console.log(result)
      if (result['type'] === 'input') {
        this.historySearch.push(result['value'])
      } else if (result['type'] === 'change' && this.listenerChange) {
        this.result.push({
          title: result['value'],
          other: result['value']
        })
      }
    },
    onItemClick (type, item) {
      this.listenerChange = false
      this.searchValue = item
      this.$refs.search.onCancel()
    },
    doSearch (item, index) {
      console.log(item)
    },
    clearSelect (index) {
      console.log(index)
    },
    confirmSelectFun (index) {
      console.log(index)
      this.screentIndex = -1
      // this.confirmStatus = !this.confirmStatus
      // this.sortBy = ''
      // let tmpData = []
      // this.data[index]['items'].forEach((item, cindex) => {
      //   if (item['check'] !== null && item['check'] !== '') {
      //     tmpData.push(item)
      //   }
      // })
      // this.$emit('search', {index: index, data: tmpData})
    }
  }
}
</script>
<style>
.search-result{
    margin-top: 81px;
    background: #fff;
    height: 100%;
}
.check-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
  margin:5px;
}
.check-item-selected {
  border: 1px solid green;
}
.history, .hot{
  padding:10px;
}
.history{
  margin-top:50px;
}
</style>
<style lang="scss" scoped>
@import '../assets/scss/mixin';
.check-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
  margin:5px;
}
.check-item-selected {
  border: 1px solid green;
}
.vux-checker-box{
  display:table;
}
.showlist-enter-active, .showlist-leave-active {
  transition: all .3s;
  transform: translateY(0);
}
.showlist-enter, .showlist-leave-active {
  opacity: 0;
  transform: translateY(-100%);
}
.sort_detail_type{
  width: 100%;
  position: absolute;
  display:flex;
  left: 0;
  border-top: 0.025rem solid $bc;
  background-color: #fff;
}
.sort_list_container{
  width: 100%;
  .sort_list_li{
    height: 2.5rem;
    display: flex;
    align-items: center;
    svg{
      @include wh(0.7rem, 0.7rem);
      margin:0 .3rem 0 .8rem;
    }
    p{
      line-height: 2.5rem;
      flex: auto;
      text-align: left;
      text-indent: 0.25rem;
      border-bottom: 0.025rem solid $bc;
      @include fj;
      align-items: center;
      span{
        color: #666;
      }
    }
    .sort_select{
      span{
        color: $blue;
      }
    }
  }
}
.filter_container{
  flex-direction: column;
  align-items: flex-start;
  min-height: 10.6rem;
  background-color: #fff;
  .filter_header_style{
    @include sc(0.4rem, #333);
    line-height: 1.5rem;
    height: 1.5rem;
    text-align: left;
    padding-left: .5rem;
    background-color: #fff;
  }
  .filter_ul{
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.5rem;
    background-color: #fff;
    .filter_li{
      display: flex;
      align-items: center;
      border: 0.025rem solid #eee;
      @include wh(4.7rem, 1.4rem);
      margin-right: 0.25rem;
      border-radius: 0.125rem;
      padding: 0 0.25rem;
      margin-bottom: 0.25rem;
      svg{
        @include wh(.8rem, .8rem);
        margin-right: 0.125rem;
      }
      span{
        @include sc(0.4rem, #333);
      }
      .filter_icon{
        @include wh(.8rem, .8rem);
        font-size: 0.5rem;
        border: 0.025rem solid $bc;
        border-radius: 0.15rem;
        margin-right: 0.25rem;
        line-height: .8rem;
        text-align: center;
      }
      .activity_svg{
        margin-right: .25rem;
      }
      .selected_filter{
        color: $blue;
      }
    }
  }
  .confirm_filter{
    display: flex;
    background-color: #f1f1f1;
    width: 100%;
    padding: .3rem .2rem;
    .filter_button_style{
      @include wh(50%, 1.8rem);
      font-size: 0.8rem;
      line-height: 1.8rem;
      border-radius: 0.2rem;
    }
    .clear_all{
      background-color: #fff;
      margin-right: .5rem;
      border: 0.025rem solid #fff;
    }
    .confirm_select{
      background-color: #56d176;
      color: #fff;
      border: 0.025rem solid #56d176;
      span{
        color: #fff;
      }
    }
  }
}
</style>

