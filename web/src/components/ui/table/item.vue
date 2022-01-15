<template>
  <tr class="ui-table-item" :key="item[$parent.keyName]">
    <td v-if="$parent.showIndex">{{ i === false ? (index + 1) : '' }}</td>
    <td v-for="(i, cIndex) in $parent.columns" :key="i.name" :class="[i.align ]">
      <div>
        <slot :slotName="i.slot" :item="item" :keyName="i.name" :record="item[i.name]"></slot>
        <ui-icon 
          class="ui-icon" 
          @click.native="showChildren(item[i.name])" 
          v-if="cIndex === 0 && item.children && !$parent.operation" 
          :rotate="!$parent.childName.includes(item[i.name]) ? -90 : 90" 
          name="arrow" />
      </div>
    </td>
    <td v-if="$parent.operation" class="add">
      <ui-icon name="add" rotate="45" @click.native="close" v-if="$parent.remove" />
      <ui-icon class="ui-icon" v-else @click.native.stop="change" :name="!$parent.value.includes(item[$parent.hiddenKey]) ? 'closeEye': 'eye'" />
    </td>
    <td class="bg" v-if="$parent.operation && !$parent.value.includes(item[$parent.hiddenKey])"></td>
  </tr>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    index: Number,
    i: [Number, Boolean]
  },
  methods: {
    close() {
      const { index, i } = this
      if(i === false) {
        this.$parent.close({ index, i })
      }else {
        this.$parent.close({ index: i, i: index })
      }
    },
    change() {
      const { item, $parent: { value, hiddenKey } } = this
      const index = value.indexOf(item[hiddenKey])
      const v = [...value]
      if(index === -1) {
        this.close()
        return
      }else {
        v.splice(index, 1)
      }
      this.$parent.$emit('input', v)
    },
    showChildren(name) {
      this.$parent.showChildren(name)
    }
  }
}
</script>

<style scoped lang="less">
.ui-table-item {
  display: table-row;
  border-bottom: 1px solid #EFEFEF;
  position: relative;
  .add {
    position: absolute;
    right: 17px;
    top: 50%;
    transform: translateY(-50%);
    margin: auto 0;
    color: #4D5EEA;
    font-size: 20px;
    z-index: 1;
    cursor: pointer;
  }
  .bg {
    position: absolute;
    left: 10px;
    top: 7px;
    right: 10px;
    bottom: 7px;
    background: rgba(106, 123, 255, .1);
    border-radius: 2px;
    padding: 0;
    min-height: auto;
  }
  &:last-child {
    border-bottom: none
  }
  td {
    font-size: 16px;
    >div {
      display: flex;
      .ui-icon {
        color: #B1B1B1;
        margin-left: 8px;
        cursor: pointer;
      }
    }
    &:first-child {
      padding-left: 21px;
    }
    &.center {
      text-align: center;
    }
    padding: 14px 0 16px 0;
    box-sizing: border-box;
    overflow-wrap: break-word;
    min-height: 49px;
    color: #000000;
  }
}
</style>