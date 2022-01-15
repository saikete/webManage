<template>
  <div class="ui-loading">
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: String
  },
  methods: {
    hide() {
      this.state = false
    },
    close() {
      if (!this.state) {
        this.$emit("onClose")
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ui-loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  color: #fff;
  .spinner {
    margin: 100px auto 0;
    width: 150px;
    text-align: center;
  }
  .spinner > div {
    width: 10px;
    height: 10px;
    background-color: #fff;
    border-radius: 100%;
    display: inline-block;
    opacity: .9;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    /* Prevent first frame from flickering when animation starts */
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    margin-right: 4px;
  }
  
  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  
  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
 
}

@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}
 
@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>