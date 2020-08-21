const vm = {
  methods: {
    getList() {
      if (this.loading) return;
      this.loading = true
      let params = {
        size: this.pageSize,
        page: this.currentPage,
      }
      let result = null
      if (this.tabIndex == 0) {
        result = getWaitEventList(params)
      } else if (this.tabIndex == 1) {
        result = getAllEventList(params)
      }
      result.then(res => {
        this.eventList = [...this.list, ...res.data.data]
        // -------------- 监听最后一个DOM
        this.$nextTick(() => {
          this.observer(最后一个DOM)
        })
        // --------------
        this.total = res.data.total
        this.currentPage++
      }).finally(() => this.loading = false)
    },
    observer(dom) {
      // 不知道要不要考虑最后一个DOM被删除的情况。。。。
      if (this.lastDomObserver) {
        this.lastDomObserver.unobserve(this.lastDomTarget)
      }
      this.lastDomTarget = dom
      if ("IntersectionObserver" in window) {
        this.lastDomObserver = new IntersectionObserver((entries, observer) => {
          if (entries[0].intersectionRatio > 0) {
            if (this.notMore) {
              console.log('没有更多了');
            } else {
              this.getList()
            }
          }
        })
        this.lastDomObserver.observe(dom);
      }
    },
  },
  computed: {
    notMore() {
      return this.total / this.pageSize < this.currentPage - 1
    }
  },
}
// MDN： https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver