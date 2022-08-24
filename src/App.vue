<script setup >
import { ref, computed } from "vue";
import view1 from "./views/view1.vue";
import view2 from "./views/view2.vue";
const routes = {
  "/view1": view1,
  "/view2": view2,
};
const name2 = window.env.name2;
const name1 = window.env.name1;
const currentPath = ref(window.location.hash);
window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || "/view1"] || "/view1";
});
</script>
<template>
  <a href="#/view1">{{ name1 }}</a> | <a href="#/view2">{{ name2 }}</a>
  <component :is="currentView" />
</template>