<template>
<div class="article">
  <div class="weui-msg"> 
      <div class="weui-msg__text-area">
        <h2 class="weui-msg__title"></h2>
        <p class="weui-msg__desc"></p> 
        <p class="weui-msg__desc">{{ title }}
        </p>
      </div>
  </div>
  <div class="weui-msg">
    <span >{{ time }}</span> <span class="author">{{ author }}</span>
  </div>
  
  <div class="weui-msg content"> 
      <div class="weui-msg__text-area">
        <h2 class="weui-msg__title"></h2>
        <p class="weui-msg__desc"></p> 
        <p class="weui-msg__desc" style="font-size:18px;">{{ content }}
        </p>
      </div>
  </div>
  <div class="weui-msg">
    <img class="article-img" :src="img"></img>
  </div>
  <div class="weui-msg bottom">
    <span >阅读 {{ amountOfRead }}</span> <span class="points">点赞 {{ pointsOfLike }}</span>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      title: '上半年房地产贷款增速回落 业内：房企资金链迎大考',
      time: '2017-07-21',
      author: '相寓',
      content: '7月24日，央行发布《2017年上半年金融机构贷款投向统计报告》。报告显示，上半年房地产贷款增速回落，人民币房地产贷款增加3.04万亿元，占同期各项贷款的38.1%，比一季度占比低2.3个百分点。其中，个人住房贷款余额20.1万亿元，同比增长30.8%，增速比上季末低4.9个百分点。',
      img: 'http://pic.eju.com/getpic.php?freewill=1&w=720&h=540&mohu=1&url=http://src.leju.com/imp/imp/deal/4b/95/5/108511f8b955a7014eef07af311_p24_mk24_sX0.jpg',
      amountOfRead: 1000,
      pointsOfLike: 200
    }
  }
}
</script>
<style>
.article .weui-msg{
  padding-left:10px;
  padding-right:10px;
}
.article .article-img{
  width:100%;
  height:100%;
}
.article .author{
  color:#3385ff;
}
.article .bottom{
  margin-top:20px;
}
.article .points{
  margin-left:10px;
}
.article .weui-msg__desc{
  font-size:22px;
}
.article .weui-msg__desc{
  font-size:22px;
}
.article .content .weui-msg__desc{
  font-size:18px;
}
</style>
