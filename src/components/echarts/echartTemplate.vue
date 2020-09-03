<template>
  <div class="echart-template" ref="echartTemplate"></div>
</template>

<script>
import { echartMixin } from "./echartMixins";
export default {
  mixins: [echartMixin],
  name: "echartTemplate",
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  watch: {
    options: {
      handler: "init",
      deep: true,
    },
  },
  methods: {
    init() {
      console.log(this.options);
      if (!this.options || !Object.keys(this.options).length) {
        return;
      }
      if (!this.myChart) {
        this.myChart = this.$echarts.init(this.$refs.echartTemplate);
      } else {
        this.myChart.clear();
      }
      this.myChart.setOption(this.options);
      this.$nextTick(this.myChart.resize);
      this.myChart.on("click", (params) => {
        this.$emit("click", params);
      });
    },
  },
  mounted() {
    this.$nextTick(this.init);
  },
};
</script>

<style lang="less" scoped>
.echart-template {
  width: 100%;
  height: 100%;
}
</style>
