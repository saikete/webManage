<template>
  <div class="indexPage">
    <div class="header">
      <div class="mainBox">
        <img :src="logo" class="logo" />
        <div class="nav">
          <div :class="['item', routeAction == item.router && 'on']" v-for="item in nav" @click="link(item)" :key="item.label">{{item.label}}</div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="mainRouterView">
        <keep-alive><router-view></router-view></keep-alive>
      </div>
      <div class="version">
        <div>
          <!-- <p>开发：lin_RunRun 红旅驴与绿旅驴与驴 REBF服服主-[REBF]20-42FPS-BF </p> -->
          <p>支持帮助：<a :href="item.link" target="_blank" v-for="item in support" :key="item.label">{{ item.label }}</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/images/logo.jpg'
import config from '@/utils/config'
export default {
  data() {
    return {
      nav: [
        { label: '主页', router: '' },
        { label: '查询', router: 'query' },
        { label: '机器人服务器管理', router: '' },
        { label: '举报外挂-战地联ban', router: 'https://bfban.com/#/' }
      ],
      routeAction: '',
      logo,
      support: config.support
    }
  },
  methods: {
    link(item) {
      const { router, label } = item
      if( label == '举报外挂-战地联ban') {
        window.open(router)
        return
      }
      if(router) {
        const { name }= this.$route
        if(name == router) return
        this.routeAction = router
        this.$router.replace({ name: router })
      }else {
        this.$toast('开发中', 1.5)
      }
    }
  },
  created () {
    const { name, meta: { action } }= this.$route
    this.routeAction = action ||  name
  }
}
</script>

<style scoped lang="less">
.indexPage {
  padding-top: 80px;
  min-height: 100vh;
  background: #F4F4F8;
  .header {
    height: 80px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
    background: #fff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.04);
    .mainBox {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      height: 100%;
      .logo {
        height: 50px;
        border-radius: 50%;
        margin-right: 65px;
      }
      .nav {
        display: flex;
        font-size: 18px;
        height: 100%;
        margin-right: auto;
        .item {
          margin-right: 60px;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          cursor: pointer;
          &.on {
            color: #4D5EEA;
            &::after {
              content: '';
              width: 100%;
              height: 4px;
              border-radius: 2px;
              background: #4D5EEA;
              position: absolute;
              bottom: 0;
            }
          }
        }
      }
      .user {
        display: flex;
        font-size: 20px;
        color: #9A9DBA;
        padding-right: 10px;
        align-items: center;
        img {
          width: 16px;
          margin-right: 37px;
          cursor: pointer;
        }
        .ui-icon {
          margin-right: 37px;
        }
      }
    }
  }
  >.main {
    padding-top: 24px;
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .mainRouterView {
      min-height: calc(100vh - 190px);
    }
    .version {
      text-align: center;
      font-size: 13px;
      color: #444;
      padding: 25px 0;
      display: flex;
      justify-content: center;
      >div {
        text-align: left;
      }
      a {
        margin-right: 10px;
      }
    }
  }
}
</style>