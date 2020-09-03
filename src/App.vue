<!--
 * @Author: 汪锦
 * @Date: 2020-06-17 17:22:19
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-08-31 17:37:41
 * @Description: 文件描述
-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    window.app = this;
  },
};
</script>

<style lang="less">
#app {
  width: 100vw;
  height: 100vh;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
}
ul,
li {
  list-style: none;
}
*,
::after,
::before {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e2e8f0;
}
::-webkit-scrollbar-thumb {
  background-color: #c7e0f9;
  border-radius: 4px;
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 4px rgba(0, 0, 5, 0.2);
}
</style>
