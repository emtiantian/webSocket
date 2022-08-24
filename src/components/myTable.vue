<template>
  <el-table :data="data" style="width: 100%" stripe height="550">
    <el-table-column type="index" label="序号" width="150" />
    <el-table-column prop="data" label="数据" />
    <el-table-column prop="time" label="时间" width="280" />
  </el-table>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Ref } from "vue";
const data: Ref<Array<Object>> = ref([]);
const error: Ref<string> = ref("");
let socket: WebSocket;

const props = defineProps<{
  url: string | URL;
}>();
// const Arrays = computed<Array<Object>>(() => {
//   if (Arrays.length > 0) {
//     return Arrays.push({ data: data.value, time: new Date().getDate() });
//   }
//   const arr: Array<Object> = [];
//   return arr;
// });
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
    data.value.push({ data: event.data, time: new Date().getTime() });
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