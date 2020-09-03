export const echartMixin = {
  props: {
    openInterval: {
      // 打开定时器refresh动画
      type: Boolean,
      default: true
    },
    duration: {
      // 多少毫秒执行一次
      type: Number,
      default: 3500
    }
  },
  methods: {
    __clearInterval() {
      // 销毁定时器
      clearInterval(this.private_timer)
    },
    __openInterval() {
      // 开启定时器
      this.private_timer = setInterval(() => {
        this.refresh()
      }, this.duration)
    },
    refresh() {
      if (!this.openInterval) {
        this.__clearInterval()
      }
      console.log(12);
      let myChart = this.myChart
      if (myChart) {
        let options = myChart.getOption()
        myChart.clear()
        myChart.setOption(options)
      }
    },
    resize() {
      this.myChart && this.myChart.resize()
    }
  },
  mounted() {
    this.__openInterval() // 默认开启定时器

    this.$bus_$on('resize', () => {
      // 存在myChart对象则并且窗口发生变化的时候Resize
      if (this.myChart) {
        console.log(this);
        if (this.myChart.resize && typeof this.myChart.resize === 'function') {
          this.myChart.resize()
        }
      }
    })
  },
  destroyed() {
    this.__clearInterval() // 销毁定时器
  }
}
export default {
  echartMixin,
}
