<template>
  <div class="upload-box">
    <div class="imgs">
      <label class="mo-upload"  v-for="(aitem, cindex) in tmpImgs" :key="cindex" v-if="aitem !== null">
        <span class="delete_upload" @click="deleteUpload(cindex)"></span>
        <img :src="aitem" class="previewer-demo-img" @click="show(cindex)"></label>
      </label>
      <label class="mo-upload upload">
        <input type="file" :accept="accepts" @change="beforeUpload">
        <slot></slot>
      </label>
    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
    <toast v-model="notifyShow" type="cancel">上传失败</toast>
  </div>
</template>
<script>
import { Previewer, TransferDom, Toast } from 'vux'
export default {
  name: 'MoUpload',
  directives: {
    TransferDom
  },
  components: {
    Previewer,
    Toast
  },
  data () {
    return {
      tmpImgs: [],
      currentFile: null,
      list: [],
      notifyShow: false,
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
  props: {
    accepts: {
      type: String,
      default: 'image/jpeg,image/jpg,image/png,image/gif'
    },
    //  当前上传标识,以便于在同一个监听函数中区分不同的上传域
    flag: [String, Number],
    maxSize: {
      type: Number,
      //  上传大小限制
      default: 100000
    },
    imgs: [Array],
    // 用户自定义对图片的处理
    upload: [Function]
  },
  methods: {
    show (index) {
      this.$refs.previewer.show(index)
    },
    beforeUpload (event) {
      let file = event.target.files[0]
      // const self = this
      // const flag = this.flag
      if (file) {
        if (this.maxSize) {
          if (this.upload !== null) {
            this.currentFile = file
            this.upload(file)
          }
        }
      }
    },
    // 根据上传的file获取浏览器本地的链接
    getFileUrl (file) {
      let url = ''
      url = window.URL.createObjectURL(file)
      return url
    },
    deleteUpload (index) {
      this.tmpImgs = this.tmpImgs.slice(0, index).concat(this.tmpImgs.slice(index + 1, this.tmpImgs.length))
      this.list = this.list.slice(0, index).concat(this.list.slice(index + 1, this.list.length))
      this.tmpImgs.push(null)
      this.tmpImgs.pop()
      this.list.push(null)
      this.list.pop()
    },
    complete (status = true, src = '') {
      if (status) {
        // 添加文件到list中
        // 正式 的时候 把下面的一行删掉
        let src = this.getFileUrl(this.currentFile)
        this.tmpImgs.push(src)
        this.list.push(
          {
            src: src
          }
        )
      } else {
        console.log('失败')
        this.notifyShow = true
      }
    }
  },
  mounted: function () {
    this.tmpImgs = this.imgs
  }
}
</script>
<style>
input[type='file']{
  display: none;
}
.mo-upload{
    height: 60px;
    width: 60px;
    display: inline-block;
    background: #ccc;
    margin-left:9px;
    background-size: 60px;
}
.mo-upload img{
  width:100%;
  height:100%;
}
.upload{
  background: url('../assets/images/upload.png');
  background-size: 60px;
}
.upload-box{
  margin:10px;
}
.delete_upload{
    width: 15px;
    height: 15px;
    background: red;
    display: block;
    position: absolute;
    z-index: 100;
    margin-left: 45px;
    background: url('../assets/images/del.png');
    background-size: 15px;
}
</style>

