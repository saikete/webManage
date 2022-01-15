<template>
  <div class="ui-input">
    <div class="leftIcon">
      <slot name="leftIcon" v-if="$slots.leftIcon"></slot>
      <ui-icon v-else-if="!$slots.leftIcon && leftIcon" @click.native.stop="iconClick" class="ui-icon" :name="leftIcon" />
    </div>
    <input ref="input" :value="value" @input="input" v-bind="$attrs" />
    <ui-icon v-if="rightIcon" @click.native.stop="iconClick" class="ui-icon rightIcon" :name="rightIcon" />
  </div>
</template>

<script>
export default {
  name: 'ui-input',
  props: {
    value: [Number, String],
    rightIcon: [String],
    leftIcon: [String]
  },
  methods: {
    input() {
      this.$emit('input', this.$refs.input.value)
    },
    iconClick() {
      this.$emit('iconClick')
    }
  }
}
</script>

<style scoped lang="less">
.ui-input {
  width: 100%;
  height: 36px;
  line-height: 36px;
  border: 1px solid rgba(154, 157, 186, 0.5);
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  padding-left: 10px;
  position: relative;
  align-items: center;
  input {
    border: none;
    height: 100%;
    width: 0;
    flex: 1;
    background: none;
  }
  .ui-icon {
    // position: absolute;
    font-size: 20px;
    font-weight: 500;
    cursor: pointer;
    // top: 0;
    // bottom: 0;
    // margin: auto 0;
    // right: 9px;
    color: rgba(154, 157, 186, 0.5);
    &.rightIcon {
      margin-left: 10px;
    }

  }
  .leftIcon {
    margin-right: 10px;
    display: flex;
    align-items: center;
  }
}
</style>