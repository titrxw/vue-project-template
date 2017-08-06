<template>
  <div class="address-box">
    <div class="address-list">
      <group>
        <cell
        title="收货地址"
        :border-intent="false"
        arrow-direction="up"></cell>
        <template>
          <cell v-for="(item, cindex) in addresList" :key="cindex"  :title="item['name'] + item['mobile']" :inline-desc="item['address']" @click.native="setDefault">
            <img slot="icon" v-if="item['default']" src="../assets/images/checked.png"></img>
            <img slot="icon" v-else src="../assets/images/un_checked.png"></img>
            <a @click="edit($event)">编辑</a>
          </cell>
        </template>
      </group>
      <div v-transfer-dom>
        <popup v-model="editAddress" position="up" style="width:100%;height:100%;background:#fff;">
          <EditAddress :address="targetAddress" @editCallback="editCallback"></EditAddress>
        </popup>
      </div>
    </div>
    <div class="addAddress">
      <div class="button-box">
        <x-button type="primary" @click.native="add">新增收货地址</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import EditAddress from './editAddress'
import { Group, Cell, XButton, TransferDom, Popup } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    XButton,
    Popup,
    EditAddress
  },
  data () {
    return {
      editAddress: false,
      addresList: [
        {
          id: 1,
          default: 1,
          name: '测试',
          mobile: '15903466276',
          address: '太原市小店区'
        },
        {
          id: 1,
          default: 1,
          name: '测试',
          mobile: '15903466276',
          address: '太原市小店区'
        },
        {
          id: 1,
          default: 1,
          name: '测试',
          mobile: '15903466276',
          address: '太原市小店区'
        }
      ],
      targetAddress: {
        id: 1,
        name: '',
        mobile: '15903466276',
        address: [],
        detail: ''
      }
    }
  },
  methods: {
    add () {
      this.editAddress = true
    },
    edit (event) {
      event.stopPropagation()
      this.editAddress = true
    },
    setDefault () {
      // 发送请求 设置为默认
      this.$router.push(this.$route.query.back)
    },
    editCallback (result) {
      if (result['type'] === 1) {
        // 修改
        if (result['ret']) {
          // 成功
          console.log(1)
        } else {
          // 失败
          console.log(1)
        }
      } else {
        // 添加
        if (result['ret']) {
          // 成功
          console.log(1)
        } else {
          // 失败
          console.log(1)
        }
      }
      this.$router.push(this.$route.query.back)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      $('.vux-popup-picker-container').parent().css('z-index', '600')
    })
  }
}
</script>
<style>
.address-list{
  background: #fff;
}
.address-list img{
  width: 20px;
  height: 20px;
  float: left;
  margin-right: 10px;
}
.address-list a{
  color:red;
}
.addAddress{
  position: fixed;
  width: 100%;
  bottom: 0px;
}
</style>

