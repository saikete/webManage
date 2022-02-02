<template>
  <div class="login">
    
    <a-page-header
      title="返回首页"
      @back="$router.replace({ name: 'home' })"
    />
    <div class="fromBox">
      <div>
        <a-tabs default-active-key="1" @change="tabChange">
          <a-tab-pane key="1" tab="注册">
          </a-tab-pane>
          <a-tab-pane key="2" tab="登录" force-render>
          </a-tab-pane>
        </a-tabs>
        <div class="from" v-if="tabAction == '1'">
          <div class="fromItem">
            <div class="label">
              qq号
            </div>
            <div>
              <a-input placeholder="请输入qq号" type="password" size="large" />
            </div>
          </div>
          <div class="fromItem">
            <div class="label">
              用户名
            </div>
            <div>
              <a-input placeholder="请输入用户名" size="large" />
            </div>
          </div>
          <div class="fromItem">
            <div class="label">
              密码
            </div>
            <div>
              <a-input placeholder="请输入密码" type="password" size="large" />
            </div>
          </div>
          <a-button type="primary">
            注册
          </a-button>
        </div>
        <div class="from" v-else>
          <div class="fromItem">
            <div class="label">
              用户名/qq
            </div>
            <div>
              <a-input placeholder="请输入用户名/qq" size="large" />
            </div>
          </div>
          <div class="fromItem">
            <div class="label">
              密码
            </div>
            <div>
              <a-input placeholder="请输入密码" type="password" size="large" />
            </div>
          </div>
          <a-button type="primary">
            登录
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabAction: '1'
    }
  },
  methods: {
    tabChange(e) {
      this.tabAction = e
    }
  },
}
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #F4F4F8;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .fromBox {
    flex: 1;
    justify-content: center;
    display: flex;
  }
  .from {
    padding: 20px;
    .fromItem {
      display: flex;
      margin-bottom: 10px;
      font-size: 16px;
      width: 600px;
      .label {
        width: 130px;
      }
      >div:last-child {
        flex: 1;
      }
    }
  }
}
</style>