<template>
  <div class="serverDetails">
    <a-page-header
      title="服务器详情"
      @back="$router.go(-1)"
    />
    <a-card :title="prefix" :bordered="false" style="margin-bottom: 20px">
      <div>
        <p>服主名称：{{ owner.name }}</p>
        <p>
          <span>当前人数：{{infor.playerAmount}}/{{ infor.maxPlayerAmount }}</span> 
          <span>当前模式：{{ infor.mode }}</span> 
          <span>当前地图：{{infor.currentMap}}</span>
          <span>地区：{{infor.region}}</span>
          <span v-if="abnormal.length" style="color: red">实锤玩家：{{abnormal.length}}</span>
          <span v-else>无实锤玩家</span>
        </p>
      </div>
      <div class="allMaps">
        <a-card-grid style="width: calc(100% / 8); text-align:center; padding: 5px" :hoverable="false" v-for="(item, index) in infor.rotation" :key="index + item.mapname + item.mode">
          <p>{{item.mapname}}</p>
          <p>{{item.mode}}</p>
        </a-card-grid>
      </div>
      <a slot="extra" @click="refresh">刷新</a>
    </a-card>
    <div class="hackerSwitch">
      <a-input
        class="inputBox"
        placeholder="请输入搜索玩家名称"
        v-model="search"
      />
      <a-switch v-model="showHacker" v-if="abnormal.length" /><span v-if="abnormal.length">只显示实锤</span>
    </div> 
    <div class="players">
      <div class="team1">
        <div class="title">team1</div>
        <a-table :columns="columns" :data-source="teamOne" :pagination="false">
          <a slot="name" slot-scope="text, item" @click="checkPlayer(item)"><span class="name">{{ text }}</span></a>
          <span slot="status" slot-scope="status" :style="{ color: status ? 'red' : 'rgba(0, 0, 0, 0.65)' }">{{status ? '实锤' : '无异常' }}</span>
        </a-table>
      </div>
      <div class="team2">
        <div class="title">team2</div>
        <a-table :columns="columns" :data-source="teamTwo" :pagination="false">
          <a slot="name" slot-scope="text, item" @click="checkPlayer(item)"><span class="name">{{ text }}</span></a>
          <span slot="status" slot-scope="status" :style="{ color: status ? 'red' : 'rgba(0, 0, 0, 0.65)' }">{{status ? '实锤' : '无异常' }}</span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getNowTime, fillInStr } from '@/utils/tool'
export default {
  data() {
    return {
      infor: {},
      prefix: '',
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '加入时间',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: '联ban状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        }
      ],
      data: [
        { name: 'lin_RunRun', status: false, ping: '26', index: 1 },
        { name: 'small_RunRun', status: true, ping: '68', index: 2 }
      ],
      team: [],
      bfbanStatus: {
        teamOne: {},
        teamTwo: {}
      },
      showHacker: false,
      search: ''
    }
  },
  computed: {
    owner() {
      return this.infor.owner || {}
    },
    teamOne() {
      const  { players = [] } = this.team[0] ||{}
      const { personaids = {} } = this.bfbanStatus.teamOne
      const { showHacker, search } = this
      return [...players].map((item) => {
        const { join_time, platoon, player_id } = item
        let name = `${platoon ? `[${platoon}]` : ''}${item.name}`
        const { hh, ss } = getNowTime(join_time)
        const { hacker } = personaids[player_id] || {}
        return { ...item, name, time: `${fillInStr(hh)}:${fillInStr(ss)}`, status: hacker}
      }).filter(item => (!search || item.name.indexOf(search) != -1) && (!showHacker || item.status))
    },
    teamTwo() {
      const  {players = [] } = this.team[1] ||{}
      const { personaids = {} } = this.bfbanStatus.teamTwo
      const { showHacker, search } = this
      return [...players].map((item) => {
        const { join_time, platoon, player_id } = item
        let name = `${platoon ? `[${platoon}]` : ''}${item.name}`
        const { hh, ss } = getNowTime(join_time)
        const { hacker } = personaids[player_id] || {}
        return { ...item, name, time: `${fillInStr(hh)}:${fillInStr(ss)}`, status: hacker}
      }).filter(item => (!search || item.name.indexOf(search) != -1) && (!showHacker || item.status))
    },
    abnormal() {
      const { teamOne, teamTwo } = this
      return [...teamOne.filter(item => item.status), ...teamTwo.filter(item => item.status)]
    }
  },
  methods: {
    refresh() {
      const { gameId } = this.$route.query
      this.$store.dispatch('players', { gameid: gameId }).then(res => {
        console.log(res)
        this.team = res.teams
        const [teamOne = {}, teamTwo = {}] = res.teams
        this.$store.dispatch('getCheckban', { id: teamOne.players.map(item => item.player_id).join(',')}).then(res => {
          this.bfbanStatus.teamOne = res
        })
        this.$store.dispatch('getCheckban', { id: teamTwo.players.map(item => item.player_id).join(',')}).then(res => {
          this.bfbanStatus.teamTwo = res
        })
      })
      this.$store.dispatch('detailedserver', { gameid: gameId }).then(res => {
        console.log(res)
        this.infor = res
      })
    },
    checkPlayer(e) {
      this.$router.push({ name: 'query', query: e })
    }
  },
  created() {
    const { prefix } = this.$route.query
    this.prefix = prefix
    this.refresh()
  },
  activated() {
    const { prefix } = this.$route.query
    if(prefix != this.prefix) {
      this.prefix = prefix
      this.refresh()
    }
  }
}
</script>

<style scoped lang="less">
.serverDetails {
  .allMaps {
    margin-top: 10px;
  }
  p>span {
    margin-right: 20px;
  }
  .players {
    display: flex;
    padding: 0 20px;
    >div {
      flex: 1;
      &:last-child {
        margin-left: 100px;
      }
      .title {
        font-size: 18px;
        margin-bottom: 10px;
      }
    }
    .name {
      color: #1890ff;
      text-decoration: underline;
    }
  }
  .hackerSwitch {
    .inputBox {
      width: 50%;
      margin-right: 10px;
    }
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    span {
      margin-left: 10px;
    }
  }
}
</style>