<template>
<div class='order-item'>
  <yd-cell-group>
  <yd-cell-item>
    <span slot="left" class="title">{{ title }}</span>
    <span slot="right" class="status title">{{ status }}</span>
  </yd-cell-item>
  <div class="order-good-item" v-for="(item, index) in items" :key="index">
    <div class="list-mes" >
      <div class="list-title"><span class="label">{{ item.label }}</span><span class="value">{{ item.value }}</span></div>
    </div>
  </div>
  <div class="foot-btn">
    <slot></slot>
  </div>
  </yd-cell-group>
</div>
</template>
<script>
export default {
  name: 'yd-order-item',
  data () {
    return {
    }
  },
  props: {
    title: String,
    status: String,
    items: Array
  }
}
</script>
<style scoped>
.order-good-item{
  margin-left:15px;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 7px 0 8px;
  position: relative;
}
.title{
  font-weight: 800;
}
.list-item{
    width: 2rem;
    padding: 1rem 0;
}
.list-mes {
    background-color: #fff;
}
.list-mes {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding-left: 7px;
}
.list-mes {
    background-color: #fff;
}
.list-mes .list-title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
    text-overflow: ellipsis;
    line-height: .38rem;
    max-height: 1.34rem;
}
.list-mes .list-title {
    color: #505050;
    font-size: .26rem;
    text-align: justify;
    font-weight: normal;
}
.foot-btn{
  height: 38px;    margin-top: 5px;
}
.foot-btn:before {
    content: "";
    position: absolute;
    z-index: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #d9d9d9;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    margin-left: 15px;
    margin-top:-6px;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
.foot-btn:after {
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #b2b2b2;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
</style>
