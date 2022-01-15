<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  name: 'ui-checkbox-group',
  props: {
    value: [Array]
  },
  methods: {
    onChange(value) {
      this.$emit('onChange', value)
      this.$emit('input', value)
    }
  }
}
</script>

<style>

</style>