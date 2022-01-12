<template>
  <div class="serverSearch">
    <div class="searchInput">
      <input v-model="serverName" />
    </div>
    <div class="list">

    </div>
  </div>
</template>

<script>
// import { ref, reactive, computed } from 'vue'
import { ref } from 'vue'
export default {
  setup() {
    const serverName = ref('')
    return { serverName }
  }
}
</script>

<style>
.serverSearch {
  width: 980px;
 
}
</style>