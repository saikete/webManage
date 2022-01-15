<template>
  <div class="ui-checkbox" @click="onChange">
    <div :class="['checkBox', (isCheck || indeterminate) && 'check', 'flexCenter']">
      <ui-icon v-if="isCheck" name="success" />
      <ui-icon v-else-if="indeterminate" name="minus" />
    </div>
    <div class="slotBox"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'ui-checkbox',
  props: {
    value: Boolean,
    name: [String, Number],
    type: String,
    indeterminate: Boolean
  },
  computed: {
    isCheck() {
      const { $options: { name } = {}, value } = this.$parent
      if(name == 'ui-checkbox-group') {
        return value.includes(this.name)
      }else {
        return this.value
      }
    }
  },
  methods: {
    onChange() {
      const { $options: { name } = {}, value, onChange } = this.$parent
      if(name == 'ui-checkbox-group') {
        const index = value.findIndex(item => item == this.name)
        if(index == -1) {
          value.push(this.name)
        }else {
          value.splice(index, 1)
        }
        onChange(value)
        this.$emit('onChange')
      }else {
        this.$emit('input', !this.value)
        this.$emit('onChange', !this.value)
      }
    }
  }
}
</script>

<style scoped lang="less">
.ui-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  .checkBox {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    overflow: hidden;
    font-size: 16px;
    margin-right: 9px;
    border: 1px solid #D9D9D9;
    box-sizing: border-box;
    color: #fff;
    &.check {
      background: #6A7BFF;
      border-color: #6A7BFF;
    }
  }
}
.slotBox {
  font-size: 16px;
}
</style>