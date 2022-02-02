<template>
  <div class="home">
    <div class="left">
      <div class="video">
        <iframe class="video" src="//player.bilibili.com/player.html?aid=935287732&bvid=BV1vM4y1F7ZW&cid=474413863&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
      </div>
      <div class="explanation">
        <a-card title="相关说明">
          <p>机器人免费提供，自助引入。私聊你付费教学属于骗子</p>
          <p>如果想要引入机器人到你的服务器请加群</p>
          <p>如果有误踢需要申述请到对应服务器的qq群获取更多信息</p>
          <P>目前已经有高仿机器人服务器，请加群检验你加入的机器人服务器是否经过认证</P>
          <a slot="extra" style="color: #1890ff;" @click="jumpGroup">QQ群号：184305984</a>
        </a-card>
      </div>
    </div>
    <div class="right">
      <a-tabs v-model="tabAction">
        <a-tab-pane :key="item.key" :tab="item.tab" v-for="item in homeTabs"></a-tab-pane>
      </a-tabs>
      <div class="update" v-show="tabAction == 'update'">
        <a-collapse accordion defaultActiveKey="0">
          <a-collapse-panel :header="item.title" v-for="(item, index) in log" :key="index">
            <div class="content">
              <div v-for="(item, index) in item.content" :key="item">{{index + 1}}. {{item}}</div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
      <div class="help" v-show="tabAction == 'help'">
        <div v-for="(item, index) in explain" :key="item.title"> 
          <p>{{index +1 }}. {{item.title}}</p>
          <a :href="item.link" target="blank" v-for="item in item.content" :key="item.link">{{item.content}}</a>
        </div>
      </div>
      <div class="bulletin" v-show="tabAction == 'bulletin'">
        暂无公告
      </div>
      <div class="party" v-show="tabAction == 'party'">
        <a-collapse accordion defaultActiveKey="0">
          <a-collapse-panel header="2022春节娱乐赛" key="0">
            <p>比赛说明在线链接</p>
            <a href="https://mubu.com/doc/7ko8ZHAwcEz" target="blank">https://mubu.com/doc/7ko8ZHAwcEz</a>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import home from './homeConfig.js'
export default {
  data() {
    return {
      ...home,
      homeTabs: [{
        tab: '重要更新日志',
        key: 'update'
      }, {
        tab: '视频和文档',
        key: 'help'
      }, {
        tab: '公告',
        key: 'bulletin'
      }, 
      {
        tab: '活动',
        key: 'party'
      }
      ],
      tabAction: 'update'
    }
  },
  methods: {
    jumpGroup() {
      window.open(`https://jq.qq.com/?_wv=1027&k=e75oLrJQ`)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  font-size: 16px;
  display: flex;
  >div {
    flex: 1;
  }
  .left {
    .video {
      margin-bottom: 20px;
      .title {
        font-size: 16px;
        margin-bottom: 10px;
      }
      >iframe {
        width: 100%;
        height: 500px;
      }
    }
  }
  .right {
    margin-left: 50px;
    .help {
      >div {
        margin-bottom: 10px;
        a {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>