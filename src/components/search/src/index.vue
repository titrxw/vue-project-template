<template>
  <div class="vux-search-box" :class="{'vux-search-fixed':isFixed}" :style="{top: isFixed ? top : '', position: fixPosition }">
    <div class="weui-search-bar" :class="{'weui-search-bar_focusing': !isCancel || currentValue}">
      <slot name="left"></slot>
      <form class="weui-search-bar__form" @submit.prevent="$emit('on-submit', value)" action=".">
        <div class="vux-search-mask" @click="touch" v-show="!isFixed && autoFixed"></div>
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input class="weui-search-bar__input" :id="`search_input_${uuid}`" :placeholder="placeholder" autocomplete="off" :required="required" v-model="currentValue" ref="input"
          @focus="onFocus"
          @blur="onBlur"/>
          <a href="javascript:" class="weui-icon-clear" @click="clear" v-show="currentValue"></a>
        </div>
        <label :for="`search_input_${uuid}`" class="weui-search-bar__label" v-show="!isFocus && !value">
          <i class="weui-icon-search"></i>
          <span>{{placeholder || 'placeholder'}}</span>
        </label>
      </form>
      <a href="javascript:" class="weui-search-bar__cancel-btn" @click="cancel">{{cancelText || 'cancel_text'}}</a>
      <slot name="right"></slot>
    </div>
    <div class="weui-cells vux-search_show" v-show="isFixed">
      <slot></slot>
      <div class="weui-cell weui-cell_access" v-for="item in results" @click="handleResultClick(item)">
        <div class="weui-cell__bd weui-cell_primary">
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'yd-search',
  props: {
    required: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    cancelText: {
      type: String,
      default: '取消'
    },
    value: {
      type: String,
      default: ''
    },
    results: {
      type: Array,
      default () {
        return []
      }
    },
    autoFixed: {
      type: Boolean,
      default: true
    },
    top: {
      type: String,
      default: '0px'
    },
    position: {
      type: String,
      default: 'fixed'
    },
    autoScrollToTop: Boolean
  },
  created () {
    this.uuid = Math.random().toString(36).substring(3, 8)
    if (this.value) {
      this.currentValue = this.value
    }
  },
  computed: {
    fixPosition () {
      if (this.isFixed) {
        return this.position === 'absolute' ? 'absolute' : 'fixed'
      }
      return 'static'
    }
  },
  methods: {
    clear () {
      this.currentValue = ''
      this.isFocus = true
      this.setFocus()
      if (this.autoFixed && !this.isFixed) {
        this.isFixed = true
      }
    },
    cancel () {
      this.isCancel = true
      this.currentValue = ''
      this.isFixed = false
      this.$emit('on-cancel')
    },
    handleResultClick (item) {
      this.$emit('result-click', item) // just for compatibility
      this.$emit('on-result-click', item)
      this.isCancel = true
      this.isFixed = false
    },
    touch () {
      this.isCancel = false
      if (this.autoFixed) {
        this.isFixed = true
      }
      this.$emit('on-touch')
    },
    setFocus () {
      this.$refs.input.focus()
    },
    setBlur () {
      this.$refs.input.blur()
    },
    onFocus () {
      this.isFocus = true
      this.$emit('on-focus')
      this.touch()
    },
    onBlur () {
      this.isFocus = false
    }
  },
  data () {
    return {
      currentValue: '',
      isCancel: true,
      isFocus: false,
      isFixed: false
    }
  },
  watch: {
    isFixed (val) {
      if (val === true) {
        this.setFocus()
        this.isFocus = true

        if (this.autoScrollToTop) {
          setTimeout(() => {
            window.scrollTo(0, 0)
          }, 150)
        }
      } else {}
    },
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    }
  }
}
</script>

<style>
.weui-search-bar {
  position: relative;
  padding: 8px 10px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  box-sizing: border-box;
  background-color: #EFEFF4;
}
.weui-search-bar:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D7D6DC;
    color: #D7D6DC;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.weui-search-bar__form {
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    -ms-flex: auto;
    flex: auto;
    background-color: #EFEFF4;
}
.vux-search-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 90%;
    height: 100%;
    z-index: 5;
}
.weui-search-bar__box {
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
}
.weui-search-bar__box .weui-icon-search {
    position: absolute;
    left: 10px;
    top: 0;
    line-height: 28px;
}
.weui-icon-search {
    color: #B2B2B2;
    font-size: 14px;
}
.weui-icon-search:before {
    content: "\E626";
}
[class^="weui-icon-"]:before, [class*=" weui-icon-"]:before {
    display: inline-block;
    margin-left: .2em;
    margin-right: .2em;
}
[class*=" weui-icon-"], [class^=weui-icon-] {
    display: inline-block;
    vertical-align: middle;
    font: normal normal normal 14px/1 weui;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
}
.weui-search-bar__box .weui-search-bar__input {
    padding: 4px 0;
    width: 100%;
    height: 1.42857143em;
    border: 0;
    font-size: 14px;
    line-height: 1.42857143em;
    box-sizing: content-box;
    background: transparent;
}
.weui-icon-clear:before {
    content: "\E602";
}
[class^="weui-icon-"]:before, [class*=" weui-icon-"]:before {
    display: inline-block;
    margin-left: .2em;
    margin-right: .2em;
}
.weui-search-bar__box .weui-icon-clear {
    position: absolute;
    top: 0;
    right: 0;
padding: 1px 5px;
    line-height: 28px;
}
.weui-icon-clear {
    color: #B2B2B2;
    font-size: 14px;
}
.weui-search-bar__label {
    position: absolute;
    top: 6px;
    right: 1px;
    bottom: 6px;
    left: 1px;
    z-index: 2;
    border-radius: 3px;
    text-align: center;
    color: #9B9B9B;
    background: #FFFFFF;
}
.weui-search-bar__label .weui-icon-search {
    margin-right: 5px;
}
[class^="weui-icon-"], [class*=" weui-icon-"] {
    display: inline-block;
    vertical-align: middle;
    font: normal normal normal 14px/1 "YDUI-ICONS";
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
}
.weui-search-bar__label span {
    display: inline-block;
    font-size: 14px;
    vertical-align: middle;
}
.weui-search-bar__form:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    border-radius: 10px;
    border: 1px solid #E6E6EA;
    box-sizing: border-box;
    background: #FFFFFF;
}
.weui-search-bar__cancel-btn {
  display: none;
    margin-left: 10px;
    line-height: 28px;
    color: #a565ff;
    white-space: nowrap;
}
.weui-search-bar:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D7D6DC;
    color: #D7D6DC;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.weui-cells.vux-search_show {
    margin-top: 0!important;
    overflow-y: auto;
    max-height: 400px;
}
.weui-cells {
    margin-top: 1.17647059em;
    background-color: #FFFFFF;
    line-height: 1.41176471;
    font-size: 17px;
    overflow: hidden;
    position: relative;
}
.weui-cells:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
.weui-cell_access {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    color: inherit;
}
.weui-cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 15px;
}
.weui-cell {
    padding: 10px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.weui-cell__bd {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
}
.weui-cell_primary {
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
}
.weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn {
    display: block;
}
.weui-search-bar.weui-search-bar_focusing .weui-search-bar__label {
    display: none;
}
.vux-search-fixed {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  background: rgba(255, 255, 255, 1);
  backdrop-filter: blur(5px);
}
.vux-search-box {
  width: 100%;
}
.weui-cells.vux-search_show {
  margin-top: 0!important;
  overflow-y: auto;
  max-height: 400px;

  &::-webkit-scrollbar {
    display: none;
  }

  &::after {
    display: none;
  }
}
.vux-search-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 90%;
  height: 100%;
  z-index: 5;
}
</style>
