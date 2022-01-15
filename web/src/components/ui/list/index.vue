<template>
  <div :class="['paddingBox', $parent.flex && 'flex', $parent.border && 'border', showArrow && 'showArrow']" :style="style" v-if="show || ($parent.replace && !$parent.remove)">
    <div :class="['ui-list-item', (($parent.replace || $parent.remove) && show) && 'operation']">
      <div class="label" v-if="label && !$parent.hideLabel">
        {{ label }}<span>{{ $parent.flex ? '' : ':' }}</span>
      </div>
      <div :class="['content', (!hide || $parent.operation) && 'hide' ]">
        <div ref="content"><slot></slot></div>
      </div>
      <ui-icon class="ui-icon" @click.native="change" name="add" rotate="45" v-if="$parent.remove" />
      <ui-icon class="ui-icon" @click.native="change" :name="show ? 'closeEye': 'eye'" v-else-if="$parent.replace" />
      <ui-icon name="arrow" v-else-if="showArrow && !$parent.replace" @click.native="hide = !hide" :rotate="hide ? '90' : '-90'" class="arrow" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    change() {
      const { label, $parent: { value, onChange = () => {} } } = this
      const index = value.indexOf(label)
      const v = [...value]
      if(index === -1) {
        const item = { label }
        this.$parent.close({ index: this.index, item })
        return
      }else {
        v.splice(index, 1)
      }
      onChange(v)
    },
    getHeight() {
      const { offsetHeight } = this.$refs.content || {}
      if(offsetHeight > 120) {
        this.showArrow = true
      }
    }
  },
  data() {
    return {
      showArrow: false,
      hide: false
    }
  },
  name: 'ui-list-item',
  props: {
    label: String,
    name: String,
    index: Number
  },
  computed: {
    style() {
      const { flex } = this.$parent
      const style = {}
      if(flex) {
        style.width = `${100 / this.$parent.flex}%`
      }
      return style
    },
    show() {
      const { label, $parent: { value } } = this
      return !value.includes(label)
    }
  }
}
</script>

<style scoped lang="less">
.paddingBox {
  margin-bottom: 10px;
  &.border {
    border-bottom: 1px solid #EEEEF6;
    padding: 6px 10px;
    &:last-child {
      border: none;
    }
  }
  &.flex {
    margin-bottom: 0;
    padding: 6px 10px;
    .ui-list-item {
      color: #999999;
      line-height: 37px;
      padding-left: 11px;
    }
    &:nth-last-child(1){
      border-bottom: none;
    }
    &:nth-last-child(2):not(:nth-child(4n)){
      border-bottom: none;
    }
    &:nth-last-child(3):nth-child(4n+1), &:nth-last-child(3):nth-child(4n+2){
      border-bottom: none;
    }
    &:nth-last-child(4):nth-child(4n+1){
      border-bottom: none;
    }
    .label {
      font-weight: normal;
    }
  }
}
.ui-list-item {
  display: flex;
  color: #000000;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  line-height: 36px;
  padding-left: 9px;
  position: relative;
  padding-right: 40px;
  &.operation {
    background: rgba(106, 123, 255, .1);
    border-radius: 2px;
  }
  >.ui-icon {
    color: #4D5EEA;
    font-size: 20px;
    margin-right: 8px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
  .label {
    margin-right: 10px;
    font-weight: bold;
    >span {
      font-weight: normal;
    }
  }
  .content {
    flex: 1;
    color: #000000;
    width: 0;
    position: relative;
    &.hide {
      max-height: 110px;
      overflow: hidden;
      text-overflow: ellipsis;
      >div {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    // >div {
    //   overflow: hidden;
    //   white-space: nowrap;
    //   text-overflow: ellipsis;
    // }
  }
  .arrow {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    transform: translateY(0);
    color: #999999;
  }
}
</style>