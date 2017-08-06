<template>
  <div class="edit-addreee">
    <x-input title="姓名" v-model="oldAddress['name']" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
    <x-input title="手机号码"  v-model="oldAddress['mobile']"  name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
    <x-address title="收货地址" v-model="oldAddress['address']" raw-value :list="addressData" value-text-align="left"></x-address>
    <x-textarea :max="40" title="详细地址" v-model="oldAddress['detail']"></x-textarea>
    <div class="button-box">
        <x-button type="primary" @click.native="edit">确定</x-button>
    </div>
  </div>
</template>
<script>
import { XInput, XAddress, ChinaAddressV3Data, XTextarea, XButton } from 'vux'
export default {
  components: {
    XInput,
    XAddress,
    XTextarea,
    XButton
  },
  props: ['address'],
  data () {
    return {
      addressData: ChinaAddressV3Data,
      oldAddress: this.address
    }
  },
  methods: {
    edit () {
      if (this.address['id'] && this.address['id'] > 0) {
        // 修改
        this.$emit('editCallback', {ret: true, type: 1})
      } else {
        // 添加
        this.$emit('editCallback', {ret: true, type: 2})
      }
    }
  }
}
</script>
