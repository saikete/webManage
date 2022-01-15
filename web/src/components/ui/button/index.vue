<template>
  <div :class="['ui-button', 'flexCenter', plain && 'plain']"><slot></slot></div>
</template>

<script>
export default {
  name: 'ui-button',
  props: {
    size: String,
    plain: Boolean
  }
}
</script>

<style scoped lang='less'>
.ui-button {
  width: 120px;
  background: #6A7BFF;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  height: 36px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  &.plain {
    background: none;
    border: 1px solid rgba(154, 157, 186, .5);
    color: rgba(52, 51, 86, .6);
  }
}
</style>