<template>
<div class="comment-goods">
  <cell title="描述相符">
    <img slot="icon" class="good-img" :src="good.img"/>
    <rater v-model="commentRater" slot="value" :max="6" active-color="#a565ff"></rater>
  </cell>
    <x-textarea title="评价内容" :max="200" placeholder="请输入评价内容" :show-counter="false" :height="100" :rows="8" :cols="30"></x-textarea>
  <group title="添加图片(选填，提供问题截图)">
    <Upload flag="thumbnail" :imgs="uploadImgs" :upload="upload" ref="upload">
    </Upload>
  </group>
  <div class="button-box">
    <x-button type="primary" >提交</x-button>
  </div>
</div>
</template>
<script>
import Upload from '../components/upload'
import { XTextarea, Group, XButton, Rater, Cell } from 'vux'
export default {
  components: {
    Group,
    XButton,
    XTextarea,
    Rater,
    Upload,
    Cell
  },
  data () {
    return {
      text: 'sd',
      commentRater: 5,
      uploadImgs: [],
      uploadComplete: false,
      good: {
        id: 1,
        img: require('../assets/images/test-3.png')
      }
    }
  },
  methods: {
    uploadProgress (progress) {
      console.log(progress)
    },
    upload (file) {
      console.log(this.uploadImgs)
      console.log(file)
      this.$refs.upload.complete()
    }
  },
  mounted: function () {
    this.good['id'] = this.$route.query['id']
    console.log(this.good)
  }
}
</script>
<style>
.comment-goods{
  background:#fff;
}
.good-img{
  height: 20px;
  width:20px;
  margin-top: 5px;
  margin-right: 5px;
}
</style>
