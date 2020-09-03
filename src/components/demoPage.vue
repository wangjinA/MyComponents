<!--
 * @Author: 汪锦
 * @Date: 2020-06-18 10:47:32
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-08-31 17:58:07
 * @Description: 示例容器组件
-->
<template>
  <div class="demo-page">
    <div class="use-container" :style="`background:${options.bg};`">
      <slot></slot>
    </div>
    <div class="container">
      <div class="title">通用按钮</div>
      <div class="tips">{{ options.tips }}</div>
      <div class="title">代码示例</div>
      <code-view :code="code" :cName="cName"></code-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "demo-page",
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      code: "",
    };
  },
  created() {
    console.log(this);
    this.$get("/api/getCode", {
      cName: this.cName,
    }).then((res) => {
      this.code = res.data.code;
    });
  },
};
</script>

<style lang="less" scoped>
.demo-page {
  height: calc(100vh - var(--toolbarHeight));
  min-height: calc(100vh - var(--toolbarHeight));
}
.container {
  background-color: #fff;
  min-height: 50%;
}
.use-container {
  min-height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.hy-button + .hy-button {
  margin-left: 20px;
}
</style>
