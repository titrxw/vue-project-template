<template>
  <div class="comment-item">
    <div class="top">
      <span>{{ commentInfo['user'] }}</span>
      <rater v-model="commentInfo['raters']" slot="value" active-color="#a565ff" :font-size="15" disabled></rater>
    </div>
    <div class="content">
      <span class="weui-form-preview__value">{{ commentInfo['content'] }}</span>
    </div>
    <div class="imgs">
      <label class="comment-img"  v-for="(aitem, cindex) in commentInfo['imgs']" :key="cindex" v-if="aitem !== null">
          <img :src="aitem" class="previewer-demo-img" @click="show(cindex)"/>
      </label>
      <div v-transfer-dom>
        <previewer :list="list" ref="previewer" :options="options"></previewer>
      </div>
    </div>
    <div class="bottom">
      <span>{{ commentInfo['time'] }}</span>
      <span>
        |
      </span>
      <span>{{ commentInfo['attr'] }}</span>
    </div>
  </div>
</template>
<script>
import { Rater, Previewer, TransferDom } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Rater,
    Previewer
  },
  props: ['commentInfo'],
  data () {
    return {
      list: [],
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  methods: {
    show (index) {
      this.$refs.previewer.show(index)
    }
  },
  mounted: function () {
    if (this.commentInfo['imgs']) {
      this.commentInfo['imgs'].forEach((item, index) => {
        this.list.push({
          src: item
        })
      })
    }
  }
}
</script>
<style>
.comment-item{
  font-size: 13px;
  padding: 15px;
  position: relative;
  background: #fff;
}
.comment-item:before {
  content: " ";
  position: absolute;
  left: 0;
  top:  0;
  right: 0;
  height: 1px;
  border-top: 1px solid #D9D9D9;
  color: #D9D9D9;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  left:15px;
}
.content{
  margin-top: 5px;
  max-height: 100px;
}
.bottom{
  margin-top:5px;
}
.comment-img{
  height: 60px;
  width: 60px;
  display: inline-block;
  background: #ccc;
  margin-left:9px;
  background-size: 60px;
}
.comment-img img{
  width:100%;
  height:100%;
}
.imgs{
  margin-top:10px;
}
</style>
