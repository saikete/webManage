<template>
  <div class="ui-tag" :style="style"><slot></slot></div>
</template>

<script>
export default {
  name: 'ui-tag',
  props: {
    color: {
      type: String,
      value: ''
    }
  },
  computed: {
    style() {
      const { color } = this
      return color ? {
        color, borderColor: color
      } : {
        
      }
    }
  }
}
</script>

<style scoped lang="less">
.ui-tag {
  padding: 3px 9px;
  color: rgba(52, 51, 86, .6);
  border: 1px solid rgba(154, 157, 186, .5);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: normal;
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
}
</style>