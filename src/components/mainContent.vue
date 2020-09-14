<!--
 * @Author: 汪锦
 * @Date: 2020-06-18 09:18:18
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-09-10 09:32:55
 * @Description: 主容器
-->
<template>
  <main class="main" @click="mainClick">
    <template v-if="globalType === '组件库' || globalType === '动画'">
      <component :is="`${cName}-Demo`" />
    </template>
    <template v-if="globalType === 'js库'">
      <h2 style="margin-top: 20px; text-align: center;">{{ sidebarItem.tips }}</h2>
      <code-view :code="code"></code-view>
    </template>
    <template v-if="globalType === 'echarts'">
      <echart-preview></echart-preview>
    </template>
    <template v-if="globalType === 'socket.io'">
      <socket-io></socket-io>
    </template>
  </main>
</template>

<script>
import codeView from "@/components/codeView";
import echartPreview from "@/components/echarts/echartPreview";
import socketIo from "@/components/socket.io";
export default {
  name: "mainContent",
  components: {
    codeView,
    echartPreview,
    socketIo,
  },
  data() {
    return {
      code: "",
    };
  },
  watch: {
    cName: {
      handler() {
        if (this.globalType === "js库") {
          this.getUCode();
        }
      },
    },
  },
  methods: {
    // 获取utils
    getUCode() {
      if (this.cName)
        this.$get("/api/getCode", {
          uName: this.cName,
        }).then((res) => {
          if (res.status) {
            this.code = res.data.code;
          }
        });
    },
    mainClick() {
      // this.setHasSidebar(false)
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  height: calc(100vh - var(--toolbarHeight));
  overflow: auto;
  transition: 0.3s;
}
</style>
