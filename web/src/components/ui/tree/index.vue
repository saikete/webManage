<template>
  <div class="ui-tree">
    <ui-checkbox-group :value="value" @onChange="resultFilter">
      <div class="checkbox" v-for="item in list" :key="item.label">
        <ui-checkbox :name="item.name">{{ item.label }}</ui-checkbox>
        <div v-if="item.children && item.children.length && value.includes(item.name)" class="children">
          <ui-tree :list="item.children" :value="value" @onChange="onChange" />
        </div>
      </div>
    </ui-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'ui-tree',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onChange(value) {
      this.$emit('onChange', value)
    },
    resultFilter(value) {
      // 当上层的checkbox取消选中的时候，把下层已选中的取消选中

      // 递归开始
      recursion(this.list)
      function recursion(list, deleteValue) {
        // 循环传进来的数组
        list.forEach(item => {
          const { name, children } = item
          // 这里判断是否需要删除当前已经选中的
          if(deleteValue) {
            // 如果需要，判断是否已经选中，已经选中那么就删除
            const index = value.indexOf(name)
            if(index != -1) {
              value.splice(index, 1)
            }
          }
          // 判断当前循环这项是否存在子级，以及是否选中，如果没有选中 那么这层递归开始把子级删除
          if(children && !value.includes(name)) {
            recursion(children, true)
          }
        })
      }
      // 处理完成以后把数据返回上一层递归组件
      this.onChange(value)
    }
  }
}
</script>

<style lang="less" scoped>
.ui-tree {
  .checkbox {
    margin-bottom: 18px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .children {
    padding-top: 18px;
    padding-left: 27px;
  }
}
</style>