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

Vue.prototype.$bus = new Vue()
Vue.mixin(busMixins)