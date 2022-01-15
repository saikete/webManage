<template>
  <div>
    <div :class="['ui-list-group', flex && 'flex']">
      <slot></slot>
    </div>
    <ui-dialog class="closeDialog" v-if="show" v-model="show" @confirm="closeConfirm">
      <div>
        <div class='title'>{{type}}项目</div>
        <div class="text">您确认{{type}}{{removeItem.label}}项目吗？</div>
      </div>
      <template slot="cancel">取消</template>
      <template slot="confirm">确定</template>
    </ui-dialog>
  </div>
</template>

<script>
export default {
  name: 'ui-list',
  props: {
    flex: [Number, String],
    value: {
      type: Array,
      default: () => []
    },
    name: String,
    border: Boolean,
    hideLabel: Boolean
  },
  data() {
    return {
      show: false,
      closeIndex: 0,
      removeItem: {},
      type: ''
    }
  },
  methods: {
    onChange(v) {
      this.$emit('input', v)
    },
    getChildren() {
      this.$children.forEach(item => {
        item.getHeight()
      })
    },
    close({ index, item }) {
      this.closeIndex = index
      this.removeItem = item
      this.show = true
      if(this.replace) {
        this.type = '隐藏'
      }
      if(this.remove) {
        this.type = '删除'
      }
    },
    closeConfirm() {
      this.show = false
      const v = [...this.value]
      this.$emit('input', [...v, this.removeItem.label])
    }
  },
  computed: {
    replace() {
      return this.$parent.replace
    },
    remove() {
      return this.$parent.remove
    }
  }
}
</script>

<style scoped lang="less">
.ui-list-group {
  &.flex {
    display: flex;
    flex-wrap: wrap;
  }
}

.closeDialog {
  text-align: center;
  font-size: 18px;
  color: #343356;
  .title {
    margin-bottom: 40px;
    font-size: 22px;
    font-weight: bold;
  }
}
</style>