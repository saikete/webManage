<template>
  <div class="ui-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ui-card'
}
</script>

<style scoped lang="less">
.ui-card {
  padding: 25px;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}
</style>