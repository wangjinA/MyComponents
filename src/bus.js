import Vue from 'vue'
export const busMixins = {
  data() {
    return {
      private_busNames: []
    }
  },
  methods: {
    $bus_$on(busName, fun) {
      this.private_busNames.push(busName)
      this.$bus.$on(busName, fun)
    }
  },
  beforeDestroy() {
    this.private_busNames.forEach(busName => {
      this.$bus.$off(busName)
    })
  }
}
let bus = new Vue()
let timer
window.addEventListener('resize', e => {
  clearTimeout(timer) // 节流
  timer = setTimeout(() => {
    bus.$emit('resize', e) // 节流后触发bus
  }, 100)
})

Vue.prototype.$bus = bus
Vue.mixin(busMixins)