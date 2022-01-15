<template>
  <div class="home">
    <div class="left">
      <div class="item">
        <h5>机器人说明</h5>
        <div>
          <p>机器人免费对外提供</p>
          <p>如果想要引入机器人到你的服务器请加群获取更多信息</p>
          <p>如果有误踢需要申述请加群获取更多信息</p>
          <P>目前已经有高仿机器人服务器，请加群检验你加入的机器人服务器是否经过认证</P>
          <p>qq 群号：623359058</p>
        </div>
      </div>
      <div class="item">
        <h5>机器人相关教程</h5>
        <div v-for="(item, index) in explain" :key="item.title"> 
          <p>{{index +1 }}. {{item.title}}</p>
          <a :href="item.link" target="blank" v-for="item in item.content" :key="item.link">{{item.content}}</a>
        </div>
      </div>
      <div class="item">
        <h5>内测服主</h5>
        <div> 
          感谢以下人员提供的帮助(按字母排序，不分先后)：fang2021 Mage99999 墨雨 Lin_RunRun yingdaomayi122 XiaoPeng_No1（陆续添加）
        </div>
      </div>
    </div>
    <div class="right">
      <p style="margin-bottom: 10px">更新日志</p>
      <div class="item">
        <div v-for="(item, index) in log" :key="index">
          <p class="title" v-if="item.title">{{item.title}}</p>
          <p v-for="item in item.content" :key="item">{{ item }}</p>
        </div>
        .....
      </div>
    </div>
  </div>
</template>

<script>
import home from './homeConfig.js'
export default {
  data() {
    return {
      ...home
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
    .item {
      margin-bottom: 30px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
      padding: 10px;
      h5 {
        margin-bottom: 5px;
      }
      >div {
        margin-bottom: 10px;
        p {
          margin-bottom: 5px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        a {
          margin-right: 30px;
        }
      }
    }
  }
  .right {
    margin-left: 50px;
    .item {
      margin-bottom: 30px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
      padding: 10px;
      max-height: 60vh;
      overflow: auto;
      >div {
        margin-bottom: 15px;
        .title {
          margin-bottom: 3px;
        }
        p {
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>