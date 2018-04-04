<template>
    <img src='../assets/images/404.png'>
</template>
<script>
export default {
  mounted: function () {
    this.$store.commit('updateStatus',true)
  }
}
</script>

<style lang="less" scoped>
img {
  width:270px;
  height:270px;
  margin:0 auto;
  margin-top:60px;
  display: block;
}
</style>

