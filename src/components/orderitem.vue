<template>
  <div class="vux-form-preview weui-form-preview">
    <div class="weui-form-preview__hd">
      <label class="weui-form-preview__label" v-html="headerLabel"></label>
      <em class="weui-form-preview__value" v-html="headerValue"></em>
    </div>
    <div class="weui-form-preview__bd" >
      <div class="good-item" v-for="(aitem, cindex) in bodyItems" :key="cindex">
        <div class="img">
          <img :src="aitem.img"/>
        </div>
        <div class="desc">
          <div class="weui-form-preview__item" v-for="item in aitem.list">
            <span class="weui-form-preview__value">{{$t(item.value)}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="weui-form-preview__ft">
      <a class="weui-form-preview__btn" :class="{'weui-form-preview__btn_default': button.style==='default', 'weui-form-preview__btn_primary': button.style === 'primary'}" href="javascript:" v-for="button in Buttons" @click="onButtonClick(button.onButtonClick, $event)">{{$t(button.text)}}</a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'form-preview',
  data () {
    return {
      Buttons: []
    }
  },
  props: ['index', 'headerLabel', 'headerValue', 'bodyItems', 'footerButtons', 'conf'],
  methods: {
    onButtonClick (cb, event) {
      event.stopPropagation()
      cb()
    }
  },
  mounted: function () {
    this.footerButtons = parseInt(this.footerButtons)
    let btns = this.conf[this.footerButtons]
    console.log(btns)
    let handle = this
    btns.forEach(function (item, index) {
      handle.Buttons.push({
        style: 'primary',
        text: item.text,
        onButtonClick: (event) => {
          handle.$emit(item.click, handle.index)
        }
      })
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/weui/widget/weui_cell/weui_form/weui-form-preview.less';
.vux-form-preview {
  overflow: hidden;
}
.img{
    width: 70px;
    height: 70px;
    min-width: 70px;
    min-height: 70px;
}
.img img{
  width:100%;
  height: 100%;
}
.desc{
  padding-left:10px;
}
.good-item{
  display: flex;
}
.weui-form-preview__hd .weui-form-preview__value {
  font-size: 1.3em;
}
.weui-form-preview__hd {
  line-height: 1.7em;
}
</style>
