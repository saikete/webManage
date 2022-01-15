<template>
  <div class="ui-transfer">
    <div class="title">{{ title }}</div>
    <div class="transferBox">
      <div class="dataList list">
        <div class='listTitle'>
          <ui-checkbox :value="allCheck" :indeterminate="indeterminate" @onChange="onChange">所有项目</ui-checkbox>
        </div>
        <div class="checkbox">
          <ui-checkbox-group v-model="check">
            <ui-checkbox class="ui-checkbox" v-for="item in data" :key="item" :name="item">{{ item }}</ui-checkbox>
          </ui-checkbox-group>
        </div>
      </div>
      <div class="arrow">
        <div><ui-icon name="arrow" /></div>
        <div><ui-icon name="arrow" rotate="180" /></div>
      </div>
      <div class="valueList list">
        <div class='listTitle'>
          <ui-checkbox v-if="check.length" :value="true">当前项目</ui-checkbox>
        </div>
        <div class="checkbox">
          <ui-checkbox-group v-model="check">
            <ui-checkbox class="ui-checkbox" v-for="item in valueList" :key="item" :name="item">{{ item }}</ui-checkbox>
          </ui-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      check: []
    }
  },
  methods: {
    onChange() {
      const { indeterminate, allCheck } = this
      if(indeterminate || !allCheck) {
        this.check = this.data.map(item => item)
      }else if(allCheck) {
        this.check = []
      }
    },
    confirm() {
      return [...this.check]
    }
  },
  computed: {
    valueList() {
      const { check, data } = this
      return data.filter(item => check.includes(item))
    },
    allCheck() {
      const { check, data } = this
      return check.length == data.length
    },
    indeterminate() {
      const { check, data } = this
      return check.length < data.length && check.length > 0
    }
  },
  watch: {
    value() {
      this.check = [...this.value]
    }
  },
  created() {
    this.check = [...this.value]
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title: String,
    value: {
      type: Array,
      default: () => []
    }
  },
  name: 'ui-transfer',
}
</script>

<style scoped lang="less">
.ui-transfer {
  .title {
    font-size: 22px;
    color: #343356;
    font-weight: bold;
    margin-bottom: 26px;
    text-align: center;
  }
  .transferBox {
    height: 420px;
    display: flex;
    .arrow {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      >div {
        width: 40px;
        height: 40px;
        border: 1px solid #EEEEF6;
        border-radius: 4px;
        color: #9A9DBA;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:first-child{
          margin-right: 20px;
        }
      }
    }
    .list {
      width: 240px;
      height: 100%;
      overflow: auto;
      border: 1px solid #EEEEF6;
      border-radius: 4px;
      .listTitle {
        height: 44px;
        border-bottom: 1px solid #EEEEF6;
        background: #F8F8FA;
        display: flex;
        align-items: center;
        padding-left: 21px;
        color: #343356;
      }
      .checkbox {
        padding-left: 21px;
        padding-top: 17px;
        .ui-checkbox {
          margin-bottom: 16px;
        }
      }
    }
  }
}
</style>