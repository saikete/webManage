<template>
  <div clas="home">
    <div class="searchBox">
      <a-select class="a-select" v-model="searchOptionValue" size="large">
        <a-select-option :value="item.type" v-for="item in searchOption" :key="item.type" :disabled="item.disabled">
          {{ item.label }}
        </a-select-option>
      </a-select>
      <a-input-search
        class="inputBox"
        placeholder="请输入服务器名称"
        enter-button="搜索"
        size="large"
        @search="onSearch"
      />
    </div>
    <div class="servers">
      <a-card :title="item.prefix" v-for="item in servers" :key="item.gameId" :bordered="false" style="margin-bottom: 20px">
        <p><span>当前人数：{{ item.serverInfo }}</span> <span>当前模式：{{ item.mode }}</span> <span>当前地图：{{item.currentMap}}</span> <span>地区：{{item.region}}</span></p> 
        <a slot="extra" @click="jumpDetails(item)">查看详情</a>
      </a-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      searchOption: [
        { type: 'player', label: '玩家', disabled: true},
        { type: 'server', label: '普通服务器'},
        { type: 'robotServer', label: '机器人服务器', disabled: true},
      ],
      searchOptionValue: 'server',
      servers: []
    }
  },
  methods: {
    onSearch(e) {
      console.log(e)
      this.$store.dispatch('servers', { name: e }).then(res => {
        console.log(res)
        this.servers= res.servers
      })
    },
    jumpDetails(e) {
      console.log(e)
      const { prefix, gameId } = e
      this.$router.push({
        name: 'serverDetails', query: { gameId, prefix }
      })
    }
  },
}
</script>

<style scoped lang="less">
.searchBox {
  display: flex;
  .a-select {
    margin-right: 20px;
    width: 140px;
  }
  .inputBox {
    width: 500px;
  }
}
.servers {
  margin-top: 30px;
  p>span {
    margin-right: 20px;
  }
}
</style>