<template>
  <el-table :data="data" style="width: 100%" stripe height="550">
    <el-table-column type="index" label="序号" width="150" />
    <el-table-column prop="data" label="数据" />
    <el-table-column prop="time" label="时间" width="280" />
  </el-table>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { format } from "../util/index";
import type { Ref } from "vue";
const data: Ref<Array<Object>> = ref([]);
const error: Ref<string> = ref("");
let socket: WebSocket;

const props = defineProps<{
  url: string | URL;
}>();

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
    console.log("socket data" + event.data);
    data.value.push({ data: event.data, time: format("yyyy-MM-dd hh:mm:ss") });
  });
  return socket;
}

onMounted(() => {
  console.log("onMounted" + props.url);
  createWebSocket();
});
</script>
<script lang="ts">
import { ElTable } from "element-plus";
export default {
  name: "myTable",
  components: { ElTable },
};
</script>