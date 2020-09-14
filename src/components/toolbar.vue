<!--
 * @Author: 汪锦
 * @Date: 2020-06-17 17:37:26
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-09-10 10:17:55
 * @Description: 工具栏
-->
<template>
  <div class="toolbar">
    <div @click="setHasSidebar(!hasSidebar)" class="hover">
      <Icon type="md-arrow-round-back backIcon" />
      {{ hasSidebar ? "TOOGLE" : "TOOGLE" }}
    </div>
    <div style="margin: 0 auto; font-size:20px;">组件库</div>
    <ul class="nav-ul">
      <li
        :class="{ active: globalType === item.name }"
        v-for="(item, index) in list"
        :key="index"
        @click="item.click ? item.click() : navHandler(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import pageConfig from "@/config/pageConfig";
export default {
  name: "toolbar",
  data() {
    return {
      list: [
        {
          name: "socket.io",
        },
        {
          name: "echarts",
        },
        {
          name: "动画",
        },
        {
          name: "组件库",
        },
        {
          name: "js库",
        },
        {
          name: "上传组件",
        },
        {
          name: "退出登录",
          click: () => {
            localStorage.setItem("token", "");
            this.$router.push("/");
          },
        },
      ],
    };
  },
  watch: {
    globalType: {
      handler(val) {
        try {
          if (val === "echarts" || val === "socket.io") {
            this.setHasSidebar(false);
          } else {
            this.setHasSidebar(true);
          }
          this.setcName(pageConfig[val].list[0].children[0].cName); // 切换导航 获取列表下第一个组件
        } catch (error) {
          console.log(error && "");
        }
      },
      immediate: true,
    },
  },
  methods: {
    navHandler(item) {
      this.setGlobalType(item.name);
    },
    outLogin() {
      this.$router.push("/");
    },
    // navHandler() {
    //   this.$Message.warning({
    //     background: true,
    //     content: "别点我，还在开发",
    //     duration: 2,
    //   });
    // },
  },
};
</script>

<style lang="less" scoped>
.toolbar {
  background-color: var(--main-500);
  transition: padding 0.3s;
  padding: 0 16px;
  height: var(--toolbarHeight);
  display: flex;
  align-items: center;
  color: #fff;
  .backIcon {
    transform: rotate(180deg);
    transition: 0.3s;
  }
  .nav-ul {
    display: flex;
    user-select: none;
    li {
      margin: 0 5px;
      padding: 5px 20px;
      .hover();
      &.active {
        background: var(--main-400);
        border-radius: 50px;
      }
    }
  }
}
</style>
