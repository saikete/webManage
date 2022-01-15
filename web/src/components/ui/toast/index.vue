<template>
  <div class="ui-toast">
    <div class="content">{{ content }}</div>
  </div>
</template>
<script>
export default {
  name: "toast",
  data() {
    return {
      state: true,
      time: this.duration
    };
  },
  props: {
    content: String,
    duration: {
      type: Number,
      default: 1.5
    }
  },
  mounted() {
    if (this.duration) {
      setTimeout(() => {
        this.hide()
        this.close()
      }, this.duration * 1000);
    }
  },
  methods: {
    hide() {
      this.state = false;
    },
    close() {
      if (!this.state) {
        this.$emit("onClose");
      }
    }
  }
};
</script>
<style scoped lang="less"> 
.ui-toast {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  z-index: 10;
  justify-content: center;
  .content {
    padding: 3px 8px;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    border-radius: 4px;
    font-size: 14px;

  }
}
</style>