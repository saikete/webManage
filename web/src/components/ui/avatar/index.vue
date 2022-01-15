<template>
  <div :class="['ui-avatar', stroke && 'stroke' ]" :style="style">
    <img class="avatar" :src="src || images.defaultAvatar" />
    <img class="sexIcon" v-if="src && gender" :src="sexIcon" />
  </div>
</template>

<script>
export default {
  name: 'ui-avatar',
  props: {
    src: String,
    gender: [String, Number],
    size: [String, Number],
    stroke: Boolean
  },
  computed: {
    sexIcon() {
      const { gender, images } = this
      switch(gender) {
        case 1:
        case '1':
          return images.icon_male
        default: 
          return images.icon_female
      }
    },
    style() {
      const { size } = this
      return size ? {
        width: size + 'px',
        height: size + 'px'
      }: {}
    }
  }
}
</script>

<style scoped lang="less">
.ui-avatar {
  position: relative;
  display: flex;
  width: 60px;
  height: 60px;
  &.stroke {
    border: #EEEEF6 1px solid;
    border-radius: 4px;
    padding: 5px;
    width: 80px;
    height: 80px;
    .sexIcon {
      width: 21px;
      height: 21px;
      bottom: -9px;
      right: -9px;
    }
  }
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
  .sexIcon {
    width: 19px;
    height: 19px;
    position: absolute;
    bottom: -8px;
    right: -8px;
  } 
}
</style>