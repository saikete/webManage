<template>
  <div class="ui-dialog" v-if="value" @mousewheel.prevent.stop>
    <div class='content'>
      <div class="slotBox">
        <slot></slot>
      </div>
      <div class="buttonBox">
        <ui-button class="ui-button cancel" plain v-if="$slots.cancel" @click.native="cancel"><slot name="cancel"></slot></ui-button>
        <ui-button class="ui-button" @click.native="confirm"><slot name="confirm"></slot></ui-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ui-dialog',
  props: {
    value: Boolean
  },
  methods: {
    confirm() {
      this.$emit('confirm')
    },
    cancel() {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped lang="less">
@import "./index.less";
</style>