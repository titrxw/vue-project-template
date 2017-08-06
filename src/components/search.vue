<template>
  <div class="search-item">
    <search
        style="position:absolute;width:100%;height: 44px;z-index:101;top:0px;"
        @result-click="resultClick"
        @on-change="onChange"
        :results="results"
        v-model="value"
        @on-focus="onFocus"
        @on-cancel="onCancel"
        @on-submit="onSubmit"
        ref="search" class="search"></search>
		<div class="search-panel" v-if="beginSearch">
      <slot></slot>
		</div>
		<div class="search-panel hide" v-else>
		</div>
  </div>
</template>
<script>
import { Search } from 'vux'
export default {
  components: {
    Search
  },
  props: ['searchResults', 'searchValue'],
  data () {
    return {
      beginSearch: false,
      value: '',
      results: []
    }
  },
  methods: {
    // search  回调函数
    resultClick (item) {
      this.$emit('search', {type: 'result', value: item})
      this.onCancel()
    },
    onChange (val) {
      this.$emit('search', {type: 'change', value: val})
    },
    onSubmit () {
      this.$refs.search.setBlur()
      this.results = []
      this.$emit('search', {type: 'input', value: this.value})
      this.onCancel()
    },
    onFocus () {
      this.results = []
      this.beginSearch = true
      console.log('on focus')
    },
    onCancel () {
      this.$refs.search.setBlur()
      this.beginSearch = false
      console.log('on cancel')
    }
  },
  watch: {
    searchResults (val) {
      this.results = val
    },
    searchValue (val) {
      this.value = val
    }
  }
}
</script>
<style>
.search-item .search-panel{
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 100;
  top:0px;
  background: #fff;
}
.search-item .search{
  width: 100%;
  top: 0px;
	background:#fff;
}
.search-item .hide{
  display:none;
}
.search-item .weui-search-bar{
  width:100%;
}
</style>
