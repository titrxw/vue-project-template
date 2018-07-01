<template>
<div id="upload-box" class="stars-upload">
    <div class="upload-list-item" :style="'width:' + itemWidth + 'px;height:' + itemWidth + 'px;' + ((index + 1) % lineItems == 0 ? 'margin-right:-1px' : '' )" v-for="(item, index) in uploadList" v-if="showList"  :key="index">
        <img v-if="item.url" :src="imgHost + item.url">
        <div class="upload-list-item-cover" :style="!progress || item.url ? 'background:transparent' : 'background: rgba(0, 0, 0, .6)'" @click="handleClick(index)">
          <Progress v-if="progress && !item.url" :percentage="item.percentage"  style="flex:1;" :show-text="false" ></Progress>
        </div>
    </div>
    <Upload
    :style="!showList ? 'width:100%' : ''"
        :on-success="handleSuccess"
        :beforeUpload="beforeUpload"
        :on-error="onError"
        :on-progress="onProgress"
        :format="format"
        :max-size="fileSize"
        :min-size="minSize"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :on-min-size="handleMinSize"
        :data="uploadData"
        :accept="accept"
        :multiple="getMutiple()"
        :capture="capture"
        :lrz="lrz"
        :action="action">
        <div v-if="!$slots.default"  :style="'width:' + (itemWidth - 7) + 'px;height:' + itemWidth + 'px;line-height:' + itemWidth + 'px'" 
            :class="'upload-components-button ' + (!$slots.default ? 'default-upload-button' : '')">
            <svg t="1520242137594" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3768" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><path d="M860.8 294l-135 0-80.8-81.6c0 0-0.4-0.4-0.6-0.4l-0.4-0.4 0 0c-12-12-28.2-19.6-46.6-19.6l-168 0c-19.6 0-37 8.4-49.2 21.8l0 0.2-79 80L163.2 294C126 294 96 323.2 96 360.4l0 404.2c0 37.2 30 67.4 67.2 67.4l697.6 0c37 0 67.2-30.2 67.2-67.4L928 360.4C928 323.2 897.8 294 860.8 294zM512 731c-101.8 0-184.8-83.2-184.8-185.2 0-102.2 83-185.2 184.8-185.2 102 0 184.8 83 184.8 185.2C696.8 647.8 614 731 512 731zM848.2 401c-15.4 0-28-12.6-28-28.2s12.6-28.2 28-28.2c15.4 0 28 12.6 28 28.2S863.6 401 848.2 401z" p-id="3769"></path><path d="M512 405.8c-77.2 0-139.6 62.6-139.6 140 0 77.2 62.4 140 139.6 140 77 0 139.6-62.6 139.6-140C651.6 468.4 589 405.8 512 405.8z" p-id="3770"></path></svg>
        </div>
        <slot></slot>
    </Upload>
</div>
</template>

<script>

require('../lrzall')
import Upload from './upload'
import user from '@/libs/user'
import Progress from 'vue-multiple-progress'
  export default {
  components: {
    Upload,
    Progress
  },
  props: {
    lineItems: {
      type: [String, Number],
      default: 4,
      validator: function(val) {  
          return val > 0;  
      } 
    },
    lrz: {
        type: Boolean,
        default: false
    },
    lrzOption: {
      type: Object,
      default: function () {
        return {quality: 0.9}
      }
    },
    accept: {
      type: String,
      default: ''
    },
    capture: {
      type: String,
      default: ''
    },
    format: {
      type: [Array],
      default: function() {
        return ['jpg', 'jpeg', 'png']
      }
    },
    showList: {
      type: [Boolean],
      default: true
    },
    multiple: {
      type: [Boolean],
      default: false
    },
    progress: {
      type: Boolean,
      default: false
    },
    fileSize: {
      type: [Number],
      default: 2048
    },
    minSize: {
      type: [Number],
      default: 0
    },
    listLength: {
      type: [Number],
      default: 1
    },
    value: {
      type: [Array, String],
      default: function() {
        if (this.multiple) {
          return []
        } else {
          return ''
        }
      }
    },
    action: {
      type: String,
      default: ''
    },
    imgHost: {
      type: String,
      default: ''
    },
    preview: {
        type: Function,
        default: null
    },
    // 多个上传组件一起使用的时候做区分
    uniqueId: {
      type: [ Number, String ],
      default: 0
    }
  },
  data() {
    return {
      emit: false,
      uploadData: {
        token: user.getToken()
      },
      uploadList: [],
      uidList: [],
      itemWidth: 0,
      emitValue: []
    }
  },
  methods: {
    getMutiple ()
    {
      if (this.multiple && (this.accept != '' || this.capture != '')) {
        return false
      }

      return this.multiple
    },
    beforeUpload (file) {
      if (!this.handleBeforeUpload()) {
        return false
      }
      this.emit = false

      if (!this.multiple) {
        this.uidList = []
        this.uploadList = []
      }
      this.uidList.push(file.uid)
      // 图片名字暂时保留
      this.uploadList.push({
        name: file.name,
        url: '',
        percentage: 0
      })
      this.emitValue.push('')
      if (this.lrz) {
          return lrz(file, this.lrzOption)
      }
      return true
    },
    onProgress (e, file, list) {
      this.uploadList[this.uidList.indexOf(file.uid)].percentage = e.percent
    },
    onError (err, response, file) {
      this.delete(this.uidList.indexOf(file.uid))
    },
    handleClick(index) {
      if (!this.uploadList[index].url) {
        return false
      }
      if (this.preview) {
        this.preview(index, this.uniqueId)
        return false
      }
      
      this.delete(index)
      this.emit = true
    },
    handleSuccess(res, file) {
      if (res.data.url) {
        delete this.uploadList[this.uidList.indexOf(file.uid)].percentage
        this.$set(this.uploadList[this.uidList.indexOf(file.uid)], 'url' , res.data.url)
        this.$set(this.emitValue, this.uidList.indexOf(file.uid) , res.data.url)
        this.emit = true
      } else {
        this.notify('文件上传失败')
        this.delete(this.uidList.indexOf(file.uid))
      }
    },
    handleFormatError(file) {
      this.notify(file.name + '文件的格式不正确，请选择' + this.format)
    },
    handleMaxSize(file) {
      this.delete(this.uidList.indexOf(file.uid))
      this.notify('文件' + file.name + ' 太大, 不能超过 ' + this.fileSize / 1024 + 'M.')
    },
    handleMinSize(file) {
      this.delete(this.uidList.indexOf(file.uid))
      this.notify('文件' + file.name + ' 太小, 不能小于 ' + this.fileSize / 1024 + 'M.')
    },
    handleBeforeUpload() {
      if (!this.multiple) {
        return true;
      }
      const check = this.uploadList.length < this.listLength;
      if (!check) {
        this.notify('超过上传允许的最大数量.')
      }
      return check;
    },
    notify (msg) {
      if (this.$store) {
        this.$store.commit('msg', msg)
      }
    },
    delete (index) {
      this.$delete(this.emitValue, index);
      this.$delete(this.uploadList, index);
      this.$delete(this.uidList, index);
    },
    init (val) {
      this.uploadList = []
      this.emitValue = []
      this.uidList = []
      if (typeof val  == 'string') {
        // 防止空数据
        if (val) {
          this.uploadList = JSON.parse(JSON.stringify([{url: val}]))
          this.emitValue = [val]
          this.uidList = [1]
        }
      } else {
        val.forEach((item, key) => {
          this.uploadList.push({
            url: item
          })
          this.emitValue.push(item)
          this.uidList.push(key)
        });
      }
    }
  },
  watch: {
    emit: function(val) {
      if (val) {
        this.$emit('input', this.multiple ? this.emitValue : this.emitValue[0])
        this.emit = false
      }
    },
    value (val) {
      this.init(val)
    }
  },
  mounted() {
    this.init(this.value)
    let width = document.getElementById('upload-box').clientWidth - (this.lineItems - 1) * 4
    this.itemWidth = width/this.lineItems
  }
}
</script>

<style scoped>
.default-upload-button {
  width: 58px;
  height: 58px;
  border: 1px dashed #dddee1;
  border-radius: 4px;
  line-height: 58px;text-align:center;
}
.upload-components-button{
float: left;
  overflow: hidden;
}

.upload-list-item {
float: left;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
  margin-right: 4px;
  margin-bottom: 2px;
}

.upload-list-item img {
  width: 100%;
  height: 100%;
}

.upload-list-item-cover {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .6);
}
.upload-list-item-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>