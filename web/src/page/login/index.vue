<template>
  <div class="login">
    <div>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="注册">
        </a-tab-pane>
        <a-tab-pane key="2" tab="登录" force-render>
        </a-tab-pane>
      </a-tabs>
      <div class="from">
        <div class="fromItem">
          <div class="label">
            服务器名称
          </div>
          <div>
            <a-input placeholder="请输入服务器名称" size="large" />
          </div>
        </div>
        <div class="fromItem">
          <div class="label">
            服务器验证码
          </div>
          <div>
            <a-input placeholder="请输入服务器验证码" size="large" />
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
            qq群
          </div>
          <div>
            <a-input placeholder="请输入qq群" type="password" size="large" />
          </div>
        </div>
        <div class="fromItem">
          <div class="label">
            服务器简称
          </div>
          <div>
            <a-input placeholder="请输入服务器简称" type="password" size="large" />
          </div>
        </div>
        <div class="fromItem">
          <div class="label">
            服务器介绍
          </div>
          <div>
            <a-textarea placeholder="请输入服务器介绍" type="password" :auto-size="{ minRows: 3, maxRows: 10 }" />
          </div>
        </div>
        <a-button type="primary">
          注册
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: #F4F4F8;
  overflow: hidden;
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