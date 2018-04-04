<template>
  <div class="vux-cell-form-preview" :class="{'vux-cell-no-border-intent': !borderIntent}">
    <div class="weui-form-preview__bd">
      <div class="weui-form-preview__item" v-for="(item, index) in list" :key="index">
        <label class="weui-form-preview__label" v-html="item.label"></label>
        <span class="weui-form-preview__value" v-html="item.value"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'yd-form-preview',
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    borderIntent: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.vux-cell-form-preview{
  padding: 10px 15px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  .weui-form-preview__bd {
      padding: 10px 15px;
      font-size: .27rem;
      text-align: right;
      color: #a5a5a5;
      line-height: 2;
      width: 100%;
      padding: 0;
      .weui-form-preview__item {
        overflow: hidden;
        .weui-form-preview__label {
            float: left;
            margin-right: 1em;
            min-width: 4em;
            color: #a5a5a5;
            // text-align: justify;
            // text-align-last: justify;
            text-align: left;
        }
        .weui-form-preview__value {
            display: block;
            overflow: hidden;
            word-break: normal;
            word-wrap: break-word;
        }
      }
  }
}



</style>

