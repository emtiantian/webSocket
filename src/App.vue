<script setup lang="ts">
import myTable from "./components/myTable.vue";
const url = (window as any).env.WebSocketUrl;
const name = (window as any).env.name;
// const url = "ws://10.0.0.118:18500/ws";
console.log(url + "url");
</script>


<template>
  <div class="logo">
    {{ name }}
  </div>
  <myTable :url="url" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
