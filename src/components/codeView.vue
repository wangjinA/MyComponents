<!--
 * @Author: 汪锦
 * @Date: 2020-06-19 09:40:02
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-09-01 09:26:28
 * @Description: 代码示例
-->
<template>
  <div class="code-view">
    <pre v-highlightjs="code">
      <code class="javascript"></code>
    </pre>
    <div class="operations">
      <Tooltip content="下载组件" placement="top" v-if="cName">
        <a :href="`/api/download?cName=${cName}.zip`" :download="`${cName}.zip`">
          <Icon type="md-code-download" :size="30" />
        </a>
      </Tooltip>
      <!-- <Tooltip content="post下载" placement="top" v-if="cName">
        <a @click="psotDown" :download="`${cName}.zip`">
          <Icon type="md-code-download" :size="30" />
        </a>
      </Tooltip> -->
      <Tooltip content="复制示例" placement="top" v-if="cName">
        <a @click="copyText(code)"><Icon type="md-copy" :size="25"/></a>
      </Tooltip>
    </div>
  </div>
</template>

<script>
import { copyText } from "@/utils";
export default {
  name: "codeView",
  props: {
    code: String,
  },
  watch: {
    code: {
      handler: "init",
    },
  },
  methods: {
    // 复制文本
    copyText,
    psotDown() {
      this.$post(`/api/download`, {
        cName: this.cName,
      }).then((res) => {
        console.log(res);
      });
    },
    init() {
      // this.hljs.highlightBlock(this.$refs.code)
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>
.code-view {
  position: relative;
  .operations {
    position: absolute;
    right: 40px;
    top: 35px;
    /deep/.ivu-tooltip + .ivu-tooltip {
      margin-left: 20px;
    }
  }
  > pre {
    > code {
      padding: 30px;
    }
  }
}
</style>
