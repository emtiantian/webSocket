<template>
  <el-table :data="arr" style="width: 100%">
    <el-table-column type="index" label="序号" width="50" />
    <el-table-column prop="data" label="数据" />
    <el-table-column prop="time" label="时间" width="180" />
  </el-table>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import type { Ref } from "vue";
const data: Ref<string> = ref("");
const error: Ref<string> = ref("");
let socket: WebSocket;

const props = defineProps<{
  url: string | URL;
}>();
const Arrays = computed<Array<object>>(() => {
  if (Arrays.length > 0) {
    return Arrays.push({ data: data.value, time: new Date().getDate() });
  }
  const arr: Array<object> = new Array();
  return arr.push({ data: data.value, time: new Date().getDate() });
});
const emit = defineEmits<{
  (e: "open"): void;
  (e: "close"): void;
  (e: "error", error: string): void;
  (e: "message", data: any): void;
}>();

function createWebSocket() {
  socket = new WebSocket(props.url);
  socket.addEventListener("open", () => {
    console.log("socket open");
  });
  socket.addEventListener("close", () => {
    console.log("socket close");
  });
  socket.addEventListener("error", (errorData) => {
    console.log("socket error" + errorData);
    error.value = errorData.type;
  });
  socket.addEventListener("message", (event) => {
    data.value = event.data;
  });
  return socket;
}
onMounted(() => {
  console.log("onMounted");
  createWebSocket();
});
</script>
<script lang="ts">
export default {
  name: "myTable",
  data() {
    return {
      arr: [
        { data: "123", time: new Date().getDate() },
        { data: "1234", time: new Date().getDate() },
      ],
    };
  },
};
</script>