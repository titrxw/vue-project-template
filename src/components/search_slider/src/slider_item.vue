<template>
    <transition :name="'show-content-' + from" >
      <section v-show="active" :class="baseClass + _class">
        <slot></slot>
      </section>
    </transition>
</template>
<script>
export default {
  name: 'yd-screen-item',
  props: {
    text: {
      type: String,
      default: ''
    },
    _class: {
      type: String,
      default: ''
    },
    from: {
      type: String,
      default: 'top'
    }
  },
  data () {
    return {
      active: false,
      baseClass: 'screen-content  ',
      index: -1,
    }
  },
  methods: {
    setIndex (index) {
      this.index = index
    }
  },
  mounted() {
    this.$parent.addItem({text: this.text});
  },
  watch: {
    text: function (val) {
      if (this.index < 0) {
        return false
      }
      this.$parent.setItemText(this.index, val)
    }
  }
}
</script>
<style scoped>
.screen-content{
  width:100%;
  position: absolute;
  z-index: 80;
  margin-top:.8rem;
  border-top:0.025rem solid #e4e4e4;background-color:#fff;
}
.show-content-top-enter-active, .show-content-top-leave-active {
  transition:all .3s;
  transform:translateY(0);
}
.show-content-top-enter, .show-content-top-leave-active {
  opacity:0;
  transform:translateY(-100%)
}
</style>
