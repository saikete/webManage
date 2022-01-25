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
        :placeholder="`请输入搜索关键词`"
        enter-button="搜索"
        size="large"
        v-model="search"
        @search="onSearch"
      />
    </div>
    <div class="servers" v-if="searchOptionValue == 'server'">
      <a-card :title="item.prefix" v-for="item in servers" :key="item.gameId" :bordered="false" style="margin-bottom: 20px">
        <p><span>当前人数：{{ item.serverInfo }}</span> <span>当前模式：{{ item.mode }}</span> <span>当前地图：{{item.currentMap}}</span> <span>地区：{{item.region}}</span></p> 
        <a slot="extra" @click="jumpDetails(item)">查看详情</a>
      </a-card>
    </div>
    <div v-if="searchOptionValue == 'player' && player.id" class="player">
      <a-card :title="playerName" class="info">
        <p><span>等级：{{ 'lv.' + player.rank }}</span> <span>游戏时间：{{timePlayed}}</span> <span>联Ban查询结果：{{ player.statusText }}</span> <span>机器人服名单情况：</span> <span>存在异常的武器数量：{{ abnormalWeapons.length }}</span></p> 
        <p><span>击杀：{{ player.kills }}</span> <span>死亡：{{ player.deaths }}</span> <span>SPM：{{player.scorePerMinute}}</span> <span>kpm：{{player.killsPerMinute}}</span> <span>kd：{{player.killDeath}}</span></p> 
        <a slot="extra" @click="gameReport">查看游戏记录</a>
      </a-card>
      <a-tabs default-active-key="0" @change="tabChange">
        <a-tab-pane key="0" tab="全自动武器"></a-tab-pane>
        <a-tab-pane key="1" tab="半自动武器/霰弹枪" force-render></a-tab-pane>
        <a-tab-pane key="2" tab="狙击枪/反器材武器" force-render></a-tab-pane>
        <a-tab-pane key="3" tab="配备/近战" force-render></a-tab-pane>
      </a-tabs>
      <a-table :columns="columns" :data-source="weaponsFilter" :pagination="false">
        <a class="name" slot="name" slot-scope="text">{{ text }}</a>
        <span slot="status" slot-scope="status" :style="{ color: status ? 'red' : 'rgba(0, 0, 0, 0.65)' }">{{status ? '异常' : '' }}</span>
      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      searchOption: [
        { type: 'player', label: '玩家数据'},
        { type: 'server', label: '普通服务器'},
        { type: 'robotServer', label: '机器人服务器', disabled: true},
      ],
      searchOptionValue: 'player',
      servers: [],
      player: {},
      weaponType: '0',
      columns: [
        {
          title: '武器名',
          dataIndex: 'weaponName',
          key: 'weaponName',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '击杀数',
          dataIndex: 'kills',
          key: 'kills',
        },
        {
          title: 'acc',
          dataIndex: 'accuracy',
          key: 'accuracy',
        },
        {
          title: '爆头率',
          dataIndex: 'headshots',
          key: 'headshots',
        },
        {
          title: 'kpm',
          dataIndex: 'killsPerMinute',
          key: 'killsPerMinute',
        },
        {
          title: '效率',
          dataIndex: 'hitVKills',
          key: 'hitVKills',
        },
        {
          title: '是否异常',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        }
      ]
    }
  },
  methods: {
    onSearch(e) {
      console.log(e)
      switch(this.searchOptionValue) {
        case 'server':
          this.$store.dispatch('servers', { name: e }).then(res => {
            this.servers= res.servers
          })
          break
        case 'player':
          this.$store.dispatch('playersAllData', { name: e }).then(res => {
            this.player= res
            this.$store.dispatch('getCheckban', res).then(res => {
              const { status } = res.personaids[this.player.id]
              let statusText = '无记录'
              switch(status) {
                case '0':
                  statusText = '举报未处理'
                  break
                case '1':
                  statusText = '实锤' 
                  break
                case '2':
                  statusText = '嫌疑再观察' 
                  break
                case '3':
                  statusText = '认为 没开挂' 
                  break
                case '4':
                  statusText = '回收站'
                  break
                case '5':
                  statusText = '回复讨论中' 
                  break
                case '6':
                  statusText = '等待管理确认' 
                  break

              }
              this.player = { ...this.player, status, statusText }
            })
            this.$store
          })
      }
    },
    jumpDetails(e) {
      console.log(e)
      const { prefix, gameId } = e
      this.$router.push({
        name: 'serverDetails', query: { gameId, prefix }
      })
    },
    tabChange(e) {
      this.weaponType = e
    },
    gameReport() {
      window.open(`https://battlefieldtracker.com/bfv/profile/origin/${this.player.userName}/gamereports`)
    }
  },
  computed: {
    playerName() {
      const { activePlatoon = {}, userName } = this.player
      if(activePlatoon.tag) {
        return `[${activePlatoon.tag}]${userName}`
      }
      return userName
    },
    timePlayed(){
      const { timePlayed } = this.player
      if(timePlayed) {
        const arr = timePlayed.split(', ')
        const h = parseInt(arr[0]) * 24 + parseInt(arr[1])
        return `${h}小时`
      }
      return ''
    },
    weapons() {
      const { weapons } = this.player
      return weapons.map(item => {
        let { accuracy, kills, headshots, killsPerMinute } = item
        accuracy = parseInt(accuracy)
        headshots = parseInt(headshots)
        if(item.weaponName == '刘易斯机枪') {
          console.log(headshots)
          console.log(accuracy)
        }
        item.status = false
        if(kills< 100) {
          return item
        }
        switch(item.type) {
          case '突击步枪':
          case '轻机枪':
            if(accuracy >= 35 || headshots >= 40) {
              item.status = true
            }
            break
          case '冲锋枪':
            if(accuracy >= 35 || headshots >= 35) {
              item.status = true
            }
            break
          case '固定式机枪':
            if(accuracy >= 35 || headshots >= 30) {
              item.status = true
            }
            break
          case '半自动步枪':
          case '手动枪机卡宾枪':
            if(accuracy >= 40 || headshots >= 40) {
              item.status = true
            }
            break
          case '单动式步枪':
            if(accuracy >= 60 || killsPerMinute >= 3) {
              item.status = true
            }
            break
          case '反器材步枪':
            if(accuracy >= 60 || headshots >= 40) {
              item.status = true
            }
            break
        }
        return item
      })
    },
    abnormalWeapons() {
      return this.weapons.filter(item => item.status)
    },
    weaponsFilter() {
      const { weapons, weaponType } = this
      const weaponsType = [
        ['固定式机枪', '轻机枪', '突击步枪', '冲锋枪'], 
        ['自动装填步枪', '手动枪机卡宾枪', '半自动步枪', '霰弹枪'], 
        ['单动式步枪', '反器材步枪'], 
        ['配备', '近战']
      ]
      return weapons.filter(item => weaponsType[weaponType].includes(item.type)).sort((a, b) => b.kills - a.kills)
      // .map(item => {
      //   return { ...item, star: parseInt(item.kills / 100)}
      // })
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
.servers, .player {
  margin-top: 30px;
  p>span {
    margin-right: 20px;
  }
  .info {
     margin-bottom: 20px;
  }
}
</style>