<!--
 * @Author: 汪锦
 * @Date: 2020-06-19 09:40:02
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-06-19 15:30:50
 * @Description: 文件描述
--> 
<template>
  <div class="code-view">
    <pre v-highlightjs="code">
      <code class="javascript"></code>
    </pre>
    <div class="operations">
      <Tooltip content="下载组件(待完善)" placement="top" v-if="cName">
        <a :href="`/api/download?cName=${cName}`"><Icon type="md-code-download" size="30"/></a>
      </Tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "codeView",
  props: {
    code: String
  },
  watch: {
    code: {
      handler: "init"
    }
  },
  methods: {
    init() {
      // this.hljs.highlightBlock(this.$refs.code)
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.code-view {
  position: relative;
  .operations {
    position: absolute;
    right: 40px;
    top: 35px;
  }
  > pre {
    > code {
      padding: 30px;
    }
  }
}
</style>