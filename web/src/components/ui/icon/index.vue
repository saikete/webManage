<template>
  <div class="ui-icon">
    <span :style="style" :class="['icon flexCenter', `icon-${name}`]"></span>
  </div>
</template>

<script>
export default {
  name: 'ui-icon',
  props: {
    name: String,
    rotate: [Number, String],
    weight: String
  },
  computed: {
    style() {
      const { rotate, weight } = this
      const style = {}
      if(rotate) {
        style.transform = `rotate(${rotate}deg)`
      }
      if(weight) {
        style.fontWeight = weight
      }
      return style
    }
  }
}
</script>

<style lang="less" scoped>
@import "./index.less";
</style>