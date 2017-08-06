<template>
<div class="screen-item sort_item" :class="{choose_type:index == value}">
  <div class="sort_item_container" @click="chooseType()">
    <div class="sort_item_border">
      <span :class="{category_title: index == value}">{{ text }}</span>
      <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
        <polygon points="0,3 10,3 5,8"/>
      </svg>
    </div>
  </div>
  <div v-show="index == value && showPanel" class="masker" ref="item" @click="cancel">
      <slot></slot>
  </div>
</div>
</template>
<script>
import { Masker } from 'vux'
export default {
  components: {
    Masker
  },
  props: ['text', 'index', 'value', 'secClick'],
  data () {
    return {
      click_num: 0,
      showPanel: true
    }
  },
  methods: {
    chooseType () {
      if (this.index !== this.value) {
        this.click_num = 0
        this.showPanel = true
        this.$emit('input', this.index)
      } else {
        if (this.secClick) {
          this.click_num = this.click_num === 1 ? 0 : 1
        }
      }
      if (this.$refs.item.innerHTML.trim() === '') {
        this.showPanel = false
      }
      this.$emit('select', {index: this.index, data: this.click_num})
    },
    cancel () {
      this.showPanel = false
      this.$emit('input', -1)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/mixin';
.sort_item{
  @include sc(0.55rem, #444);
  @include wh(33.3%, 2.3rem);
  text-align: center;
  line-height: 1rem;
  .sort_item_container{
    @include wh(100%, 100%);
    position: relative;
    z-index: 14;
    background-color: #fff;
    box-sizing: border-box;
    padding-top: .6rem;
    .sort_item_border{
      height: 1rem;
      border-right: 0.025rem solid $bc;
    }
  }
  .sort_icon{
    vertical-align: middle;
    transition: all .3s;
    fill:#666;
  }
  
}
.choose_type{
  .sort_item_container{

    .category_title{
      color: $blue;
    }
    .sort_icon{
      transform: rotate(180deg);
      fill:$blue;
    }
  }
}
.masker{
  position: fixed;
  width: 100%;
  left: 0px;
  height: 100%;
  background: rgba(0,0,0,0.5);
}
</style>
