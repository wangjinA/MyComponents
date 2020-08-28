<!--
 * @Author: 汪锦
 * @Date: 2020-06-17 17:26:53
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-08-28 17:15:43
 * @Description: 侧边栏
-->
<template>
  <div class="sidebar" ref="sidebar">
    <template v-if="list.length">
      <div v-for="(item, i) in list" :key="i" class="sidebar-list" :ref="item.title">
        <div class="sidebar-title">{{ item.title }}</div>
        <div
          v-for="(comItem, index) in item.children"
          :key="index"
          class="sidebar-item"
          @click="itemClick(comItem)"
          :class="{ active: comItem.cName === cName }"
        >
          {{ comItem.name }}
        </div>
      </div>
    </template>
    <template v-else>
      <div class="not-data">空空如也</div>
    </template>
  </div>
</template>

<script>
import pageConfig from "@/config/pageConfig";
export default {
  name: "sidebar",
  data() {
    return {};
  },
  methods: {
    itemClick(item) {
      this.setSidebarItem(item);
      if (item.type === "util") {
        this.setuName(item.cName);
        this.setcName();
      } else {
        this.setcName(item.cName);
        this.setuName();
      }
    },
    showC() {
      this.$refs.sidebar.scrollTop = this.$refs.components[0].offsetTop - 10;
    },
    showU() {
      this.$refs.sidebar.scrollTop = this.$refs.utils[0].offsetTop - 10;
    },
  },
  computed: {
    list() {
      let currentItem = pageConfig[this.globalType];
      return currentItem && currentItem.list ? currentItem.list : [];
    },
  },
  created() {
    this.$bus.$on("showC", this.showC);
    this.$bus.$on("showU", this.showU);
  },
};
</script>
<style lang="less" scoped>
.sidebar {
  height: 100vh;
  width: var(--sidebarWidth);
  z-index: 1;
  position: fixed;
  overflow: auto;
  left: 0;
  transform: translateX(-100%);
  padding: 20px;
  top: 0;
  background-color: #edf2f7;
  background-color: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s;
  box-shadow: 2px 68px 10px rgba(194, 206, 219, 0.68);
  .sidebar-list {
    & + .sidebar-list {
      margin-top: 30px;
    }
  }
  .sidebar-item {
    box-shadow: 0 10px 15px -3px rgba(36, 69, 101, 0.19), 0 4px 6px -2px #d0dce8;
    box-shadow: var(--shadow);
    overflow: hidden;
    color: #667eea;
    color: var(--main-500);
    width: 120px;
    height: 68px;
    border-radius: 4px;
    background-color: #fff;
    border-width: 2px;
    border-color: transparent;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #273849;
    font-size: 16px;
    font-weight: 400;
    &.active {
      border-width: 2px;
      border-color: var(--main-500);
      color: inherit;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        left: 0;
        top: 0;
        background: var(--main-500);
        opacity: 0.2;
      }
    }
    &:hover {
      cursor: pointer;
      opacity: 0.9;
    }
    & + .sidebar-item {
      margin-top: 20px;
    }
  }
  .sidebar-title {
    color: #4a5568;
    color: var(--sidebar-color);
    font-size: 13px;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 10px;
  }
}
</style>
