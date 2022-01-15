<template>
  <div class="ui-timeline-item">
    <div class="line"></div>
    <div class="point">
      <div></div>
    </div>
    <div class="date">
      {{ date }}
    </div>
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ui-timeline-item",
  props: {
    date: [String, Number]
  }
}
</script>

<style lang="less">
.ui-timeline-item {
  display: flex;
  padding-left: 44px;
  display: flex;
  color: #000000;
  position: relative;
  line-height: 20px;
  font-size: 16px;
  padding-bottom: 20px;
  &:last-child {
    padding-bottom: 0;
    .line {
      display: none;
    }
  }
  .point {
    width: 14px;
    height: 14px;
    position: absolute;
    background: #DEE1FF;
    padding: 2px;
    border-radius: 50%;
    left: 0;
    top: 2px;
    z-index: 2;
    >div {
      background: #6979F8;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  .line {
    z-index: 1;
    position: absolute;
    top: 10px;
    bottom: -2px;
    width: 2px;
    left: 6px;
    background: #DEE1FF;
  }
  .date {
    width: 96px;
    margin-right: 10px;
  }
}
</style>