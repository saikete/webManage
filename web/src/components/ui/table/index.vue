<template>
  <div>
    <div :class="['ui-table']">
      <table>
        <colgroup>
          <col v-if="showIndex" style="width: 63px" />
          <col v-for="(item, index) in columns" :style="style(item, index)" :key="item.name" />
          <col v-if="operation" />
        </colgroup>
        <thead>
          <tr>
            <th v-if="showIndex">NO.</th>
            <th v-for="item in columns" :key="item.name" :class="[item.align]">{{item.title}}</th>
            <th v-if="operation"></th>
          </tr>
        </thead>
        <tbody class="content">
          <template v-for="(item, index) in listFilter">
            <tr v-if="item.trTitle" :key="item[keyName]"><td class="itemTitle" :colspan=" showIndex ? columns.length + 1 : columns.length">{{item.trTitle}}</td></tr>
            <tr v-if="item.type == 'single'" :key="item[keyName]"><td class="single" :colspan=" showIndex ? columns.length + 1 : columns.length"></td></tr>
            <tableItem :item="item" :key="item[keyName]" :index="index" :i="false">
              <template slot-scope="{ record, slotName, item, keyName }">
                <slot :name="slotName" :item="item" :keyName="keyName" :record="record"></slot>
              </template>
            </tableItem>
            <template v-if="item.children && (childName.includes(item[columns[0].name]) || operation)">
              <template v-for="(item, i) in item.children">
                <tableItem :item="item" :key="item[keyName]" :index="i" :i="index" children>
                  <template slot-scope="{ record, slotName, item, keyName }">
                    <slot :name="slotName" :item="item" :keyName="keyName" :record="record"></slot>
                  </template>
                </tableItem>
              </template>
            </template>
          </template>
        </tbody>
      </table>
    </div>
    <ui-dialog class="closeDialog" v-if="show" v-model="show" @confirm="closeConfirm">
      <div>
        <div class='title'>{{type}}项目</div>
        <div class="text">您确认{{type}}{{removeItem[hiddenKey]}}项目吗？</div>
      </div>
      <template slot="cancel">取消</template>
      <template slot="confirm">确定</template>
    </ui-dialog>
  </div>
</template>

<script>
import tableItem from './item'
export default {
  name: 'ui-table',
  components: { tableItem },
  props: {
    list: Array,
    columns: {
      type: Array,
      default: () => []
    },
    showIndex: Boolean,
    keyName: {
      type: String,
      default: 'name'
    },
    name: String,
    value: {
      type: Array,
      default: () => []
    },
    hiddenKey: String
  },
  methods: {
    style(item) {
      const { width } = item
      let flex = item.flex || this.flex
      const style = {}
      if(width) {
        style.width = width
      }
      if(flex) {
        style.flex = flex
      }
      return style
    },
    close({index, i}) {
      this.closeIndex = { index, i }
      this.show = true
      if(this.replace) {
        this.type = '隐藏'
      }
      if(this.remove) {
        this.type = '删除'
      }
    },
    change() {
      const { label, value } = this
      const index = value.indexOf(label)
      const v = [...value]
      if(index == -1) {
        this.close()
        return
      }else {
        v.splice(index, 1)
      }
      this.$emit('input', v)
    },
    closeConfirm() {
      const { removeItem, hiddenKey, value } = this
      const v = [...value]
      v.push(removeItem[hiddenKey])
      this.$emit('input', v)
      this.show = false
    },
    showChildren(name) {
      const index = this.childName.indexOf(name)
      if(index === -1) {
        this.childName.push(name)
      }else {
        this.childName.splice(index, 1)
      }
    }
  },
  computed: {
    tableWidth() {
      const { columns, showIndex, operation } = this
      let tableWidth = columns.reduce(function(prev, cur) {
        return `${prev} ${prev?'+':''} ${cur.width}`
      },'')
      if(operation) {
        tableWidth = `63px + ${tableWidth}`
      }
      if(showIndex) {
        tableWidth = `63px + ${tableWidth}`
      }
      return tableWidth
    },
    operation() {
      return this.replace || this.remove
    },
    replace() {
      return this.$parent.replace
    },
    remove() {
      return this.$parent.remove
    },
    listFilter() {
      const { list = [], value, hiddenKey, replace } = this
      const end = []
      const start = list.reduce((start, item) => {
        if(replace && value.includes(item[hiddenKey])) {
          end.push(item)
          return start
        }
        if(value.includes(item[hiddenKey])) {
          return start
        }
        start.push(item)
        return start
      }, [])
      return [...start, ...end]
    },
    removeItem() {
      const { closeIndex: { index, i }, listFilter } = this
      if(i === false) {
        return listFilter[index]
      }
      return listFilter[index].children[i]
    }
  },
  data() {
    return {
      show: false,
      type: '',
      childName: []
    }
  }
}
</script>

<style lang="less" scoped>
.ui-table {
  overflow-x: auto;
  background: #fff;
  width: 100%;
  font-size: 16px;
  table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
  }
  colgroup {
    display: table-column-group;
  }
  thead {
    tr {
      display: table-row;
      border-bottom: 1px solid #EFEFEF;
      th {
        font-size: 16px;
        &:first-child {
          padding-left: 21px;
        }
        &.center {
          text-align: center;
        }
        text-align: left;
        height: 49px;
        box-sizing: border-box;
        word-break: break-all;
        color: #999999;
      }
    }
  }
  .itemTitle {
    height: 50px;
    background: #F8F8FA;
    border-bottom: 1px solid #EFEFEF;
    padding-left: 21px;
    color: #343356;
    font-size: 17px;
    font-weight: bold;
  }
  .single {
    height: 21px;
    background: #F8F8FA;
    border-bottom: 1px solid #EFEFEF;
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