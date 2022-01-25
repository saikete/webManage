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
          <span>异常玩家：5</span>
        </p>
        <p>目前查询玩家列表数量暂时不稳定，查询bfban的状态暂时不开放</p>
      </div>
      <div class="allMaps">
        <a-card-grid style="width: calc(100% / 8); text-align:center; padding: 5px" :hoverable="false" v-for="(item, index) in infor.rotation" :key="index + item.mapname + item.mode">
          <p>{{item.mapname}}</p>
          <p>{{item.mode}}</p>
        </a-card-grid>
      </div>
      <a slot="extra" @click="refresh">刷新</a>
    </a-card>
    <div class="players">
      <div class="team1">
        <div class="title">team1</div>
        <a-table :columns="columns" :data-source="teamOne" :pagination="false">
          <a class="name" slot="name, item" slot-scope="text" @click="checkPlayer(item)">{{ text }}</a>
          <span slot="status" slot-scope="status" :style="{ color: status ? 'red' : 'rgba(0, 0, 0, 0.65)' }">{{status ? '实锤' : '' }}</span>
        </a-table>
      </div>
      <div class="team2">
        <div class="title">team2</div>
        <a-table :columns="columns" :data-source="teamTwo" :pagination="false">
          <a class="name" slot="name, item" slot-scope="text" @click="checkPlayer(item)">{{ text }}</a>
          <span slot="status" slot-scope="status" :style="{ color: status ? 'red' : 'rgba(0, 0, 0, 0.65)' }">{{status ? '实锤' : '' }}</span>
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
      bfbanStatus: {}
    }
  },
  computed: {
    owner() {
      return this.infor.owner || {}
    },
    teamOne() {
      const  { players = [] } = this.team[0] ||{}
      const { teamOne = [] } = this.bfbanStatus
      return [...players].map((item, index) => {
        const { join_time, platoon } = item
        const platoonText = platoon ? `[${platoon}]` : ''
        let name = `${platoonText}${item.name}`
        const { hh, ss } = getNowTime(join_time)
        const { hacker } = teamOne[index] || {}
        return { ...item, name, time: `${fillInStr(hh)}:${fillInStr(ss)}`, status: hacker}
      })
    },
    teamTwo() {
      const  {players = [] } = this.team[1] ||{}
      const { teamTwo = [] } = this.bfbanStatus
      return [...players].map((item, index) => {
        const { join_time, platoon } = item
        const platoonText = platoon ? `[${platoon}]` : ''
        let name = `${platoonText}${item.name}`
        const { hh, ss } = getNowTime(join_time)
        const { status } = teamTwo[index] || {}
        return { ...item, name, time: `${fillInStr(hh)}:${fillInStr(ss)}`, status: hacker}
      })
    }
  },
  methods: {
    refresh() {
      const { gameId } = this.$route.query
      this.$store.dispatch('players', { gameid: gameId }).then(res => {
        console.log(res)
        this.team = res.teams
        const [teamOne = {}, teamTwo = {}] = res.teams
        this.$store.dispatch('checkban', teamOne.players.map(item => ({ personaId: item.player_id }))).then(res => {
          console.log(res)
          this.bfbanStatus.teamOne = res
        })
        this.$store.dispatch('checkban', teamTwo.players.map(item => ({ personaId: item.player_id }))).then(res => {
          console.log(res)
          this.bfbanStatus.teamTwo = res
        })
      })
      this.$store.dispatch('detailedserver', { gameid: gameId }).then(res => {
        console.log(res)
        this.infor = res
      })
    },
    checkPlayer(e) {
      console.log(e)
    }
  },
  created() {
    const { prefix } = this.$route.query
    this.prefix = prefix
    this.refresh()
    const { year, month, day, hh, mm } = getNowTime(1642233840445031)
    console.log({ year, month, day, hh, mm })
  },
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
}
</style>