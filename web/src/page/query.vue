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
        <p><span>等级：{{ 'lv.' + player.rank }}</span> <span>游戏时间：{{timePlayed}}</span></p> 
        <p><span>击杀：{{ player.kills }}</span> <span>死亡：{{ player.deaths }}</span> <span>SPM：{{player.scorePerMinute}}</span> <span>kpm：{{player.killsPerMinute}}</span> <span>kd：{{player.killDeath}}</span></p> 
        <p><span>机器人服名单情况：</span> <span>存在异常的武器数量：{{ abnormalWeapons.length }}</span></p> 
        <p><span :class="['status' + player.status, 'bfbanStatus']">联Ban查询结果：<strong>{{ player.statusText }}</strong></span></p> 
        <a slot="extra" @click="gameReport">查看游戏记录</a>
      </a-card>
      <a-card title="申述教程" class="info" v-if="abnormalWeapons.length && player.status != '1'">
        <div class="reportTip">
          <p style="color: red">注意：你有数据异常武器，没有被添加全局白名单可能会被机器人服务器踢出</p>
          <p>先通过下方的武器列表找到你被标记异常的武器，然后根据你自身不同的情况选择不同的申述方式</p><br />
          <p>如果是刷枪导致了异常</p>
          <p><a :href="`https://battlefieldtracker.com/bfv/profile/origin/${player.userName}/gamereports`" target="_blank">点击这里</a>进入到你的游戏记录页面，然后找到你的刷枪游戏记录，然后把链接保存下来</p><br />
          <p>如果正常打打出了异常数据</p>
          <p>
            <a href="https://www.bilibili.com/read/cv4812329?from=search&spm_id_from=333.337.0.0" target="_blank">点击这里</a>
            查看moss的教学，然后在打开moss的情况下录制一整局你被标异常的武器证据录像，并且数据达到了被标异常数据的水平以后。上传到任意可以随时阅览的在线视频网站。然后<a :href="`https://battlefieldtracker.com/bfv/profile/origin/${player.userName}/gamereports`" target="_blank">点击这里</a>进入你的游戏记录页面，找到这把录制的游戏记录，然后把视频的在线观看地址，moss生成的zip包，游戏记录的链接一起保存下来</p><br />
          <p>完成以上步骤以后，加入Q群 184305984 ，把你刚刚保存的申述资料找群内管理员进行申述，申述成功以后在帮你添加全局白名单</p>
        </div>
      </a-card>
      <a-card title="联ban实锤提示" class="info" v-if="player.status == '1'">
        <div class="reportTip">
          <p style="color: red">注意：你已经被<a style="color: red" href="https://bfban.com/#/" target="_blank">战地联ban</a>实锤，没有解除实锤状态可能会被机器人服务器踢出</p><br />
          <p><a :href="`https://bfban.com/#/cheaters/${player.originUserId}`" target="_blank">点击这里</a>跳转到你的举报页面，查看被实锤理由</p><br />
          <p><a href="https://docs.qq.com/doc/DVXBYQUdvelJNbGJm" target="_blank">点击这里</a>查看联ban申述示范</p><br />
        </div>
      </a-card>
      <a-tabs default-active-key="0" @change="tabChange">
        <a-tab-pane key="0" tab="全自动武器"></a-tab-pane>
        <a-tab-pane key="1" tab="半自动武器/霰弹枪" force-render></a-tab-pane>
        <a-tab-pane key="2" tab="狙击枪/反器材武器/医疗兵卡宾枪" force-render></a-tab-pane>
        <a-tab-pane key="3" tab="配备/近战" force-render></a-tab-pane>
        <a-tab-pane key="4" tab="异常武器" force-render></a-tab-pane>
      </a-tabs>
      <a-table :columns="columns" :data-source="weaponsFilter" :pagination="false">
        <a class="name" slot="name" slot-scope="text">{{ text }}</a>
        <span slot="status" slot-scope="status" :style="{ color: status ? 'red' : 'rgba(0, 0, 0, 0.65)' }">{{status ? '数据异常' : '' }}</span>
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
          title: '武器数据是否异常',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        }
      ]
    }
  },
  methods: {
    onSearch(e) {
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
              const { status, originUserId } = res.personaids[this.player.id]
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
              this.player = { ...this.player, status, statusText, originUserId }
            })
            this.$store
          })
      }
    },
    jumpDetails(e) {
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
    },
    jumpBFban() {
      const { originUserId } = this.player
      if(originUserId) {
        window.open(`https://bfban.com/#/cheaters/${originUserId}`)
      }else {
        this.$toast('该玩家在联ban无举报记录', 1.5)
      }
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
            if(accuracy >= 40 || headshots >= 40) {
              item.status = true
            }
            break
          case '单动式步枪':
          case '手动枪机卡宾枪': 
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
      if(weaponType == '4') {
        return weapons.filter(item => item.status)
      }
      const typeWeapons = weapons.filter(item => weaponsType[weaponType].includes(item.type))
      return [
        ...typeWeapons.filter(item => item.status), ...typeWeapons.filter(item => !item.status).sort((a, b) => {
        return b.kills - a.kills
      })] 
    }
  },
  activated() {
    const { name, player_id } = this.$route.query
    if(player_id) {
      this.search = name
      this.onSearch(name)
    }
  }
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
  .bfbanStatus {
    &.status1, &.status2 {
      color: red;
    }
    &.status3, &.status3 {
      color: green;
    }
  }
  .bfbanJump {
    cursor: pointer;
    text-decoration: underline;
  }
}
.reportTip {
  p {
    margin-bottom: 2px;
    a {
      color: #516EEC;
      text-decoration: underline;
      margin: auto 2px;
    }
  }
}
</style>