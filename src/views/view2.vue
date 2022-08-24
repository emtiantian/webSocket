<script setup lang="ts">
import myTable from "../components/myTable.vue";
const url = (window as any).env.WebSocketUrl2;
const name = (window as any).env.name2;
</script>


<template>
  <div class="logo">
    {{ name }}
  </div>
  <myTable :url="url" />
</template>

<style scoped>
.logo {
  height: 1em;
  padding: 1.5em;
  will-change: filter;
  font-size: 30px;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
