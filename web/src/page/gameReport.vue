<template>
  <div class="gameReport">
    <a-page-header
      :title="`${name} 历史游戏记录搜索`"
      @back="$router.go(-1)"
    />
    <div class="searchTip">
      <p>1. 搜索时间会比较漫长，请耐心等待</p>
      <p>2. 时间是从现在开始，下面的选择日期结束，不选择日期表示搜索到游戏记录没有为止，请尽可能的选择结束日期，频繁调用数据接口你的ip可能会被拉入黑名单</p>
      <p>3. 不输入关键词默认只搜索前哨模式游戏记录，输入关键词搜索前哨模式以及其他模式中含关键词的其他服务器名称</p>
    </div>
    <div class="searchBox">
      <a-date-picker @change="onChange" :locale="locale" placeholder="请选择结束时间" />
      <a-input-search class="inputBox" :placeholder="`请输入搜索关键词`" enter-button="搜索" v-model="search" @search="onSearch" />
    </div>
    <div class="servers">
      <div class="filterBox">
        <a-input class="inputBox" placeholder="筛选以查询到的服务器" v-model="filter" />
        <a-button type="primary" @click="copyReport">复制已选择游戏记录 </a-button>
      </div>
      <a-table :columns="columns" :data-source="servers" :pagination="false" :expanded-row-keys.sync="selectServers" :row-selection="rowSelection">
        <a slot="name" slot-scope="text, item" @click="checkPlayer(item)"><span class="name">{{ text }}</span></a>
        <a slot="map" slot-scope="text" >{{ text && text.name }}</a>
      </a-table>
    </div>
  </div>
</template>

<script>
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import { getNowTime } from '@/utils/tool'
export default {
  created() {
    const { name } = this.$route.query
    this.name = name
  },
  data() {
    return {
      locale,
      search: '',
      reports: [],
      paginationToken: '',
      searchDate: 0,
      filter: '',
      columns: [
        {
          title: '服务器名',
          dataIndex: 'serverName',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '地图名',
          dataIndex: 'map',
          scopedSlots: { customRender: 'map' }
        },
        {
          title: '模式',
          dataIndex: 'modeKey',
        },
        {
          title: '结束时间',
          dataIndex: 'ymd_hms'
        }
      ],
      rowSelection: {
        onSelect: (record, selected, selectedRows) => {
          this.selectServers = selectedRows
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          this.selectServers = selectedRows
        }
      },
      selectServers: [],
      name: ''
    }
  },
  computed: {
    servers() {
      return this.reports.filter(item => item.serverName.toUpperCase().indexOf(this.filter.toUpperCase()) != -1).map(item => {
        const { ymd_hms } = getNowTime(item.timestamp * 1000)
        item.ymd_hms = ymd_hms
        return item
      })
    }
  },
  methods: {
    onSearch() {
      this.reports = []
      this.getGameReport()
    },
    getGameReport() {
      this.$store.dispatch('btrGameReport', { name: 'lin_RunRun', paginationToken: this.paginationToken }).then(res => {
        const { reports, paginationToken } = res.data
        this.reports = [...this.reports, ...reports.filter(item => {
          return item.modeKey == 'Outpost0' || (this.search && item.serverName.toUpperCase().indexOf(this.search.toUpperCase()) != -1)
        })]
        this.paginationToken = paginationToken
        const length = this.reports.length
        if(paginationToken) {
          if(length) {
            const last = this.reports[length-1]
            if(!this.searchDate || last.timestamp * 1000 > this.searchDate) {
              this.$store.dispatch('setGlobalLoading', true)
              setTimeout(() => {
                this.getGameReport()
              }, 1000)
            }
          }else {
            this.$store.dispatch('setGlobalLoading', true)
            setTimeout(() => {
              this.getGameReport()
            }, 1000)
          }
          
        }
      }) 
    },
    onChange(e, dateString) {
      console.log(+e._d)
      this.searchDate = +e._d
    },
    checkPlayer(e) {
      window.open(`https://battlefieldtracker.com/bfv/gamereport/origin/${e.gameReportId}?handle=${this.name}`)
    },
    copyReport() {
      if(!this.selectServers.length) {
        this.$toast('选择的游戏记录不能为空', 1.5)
        return
      }
      this.$copyText(this.selectServers.map(item => `https://battlefieldtracker.com/bfv/gamereport/origin/${item.gameReportId}?handle=${this.name}`).join('\r\n')).then((e) => {
        this.$toast('链接复制成功，黏贴到你任意黏贴的地方去把', 1.5)
      }, (e) => {
        this.$toast('链接复制失败，请重试', 1.5)
      })
    }
  },
}
</script>

<style lang="less" scoped>
.searchTip {
  font-size: 14px;
  margin-bottom: 20px;
  color: rgb(165, 40, 40);
}
.searchBox {
  display: flex;
  .inputBox {
    width: 30%;
    margin-left: 10px;
  }
}
.servers {
  .filterBox {
    margin-bottom: 20px;
  }
  .inputBox {
    width: 30%;
    margin-right: 10px;
  }
}
</style>