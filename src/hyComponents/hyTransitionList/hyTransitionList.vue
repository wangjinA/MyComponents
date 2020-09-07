<template>
  <transition-group
    v-bind="$attrs"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    class="hyTransitionList"
  >
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: "hyTransitionList",
  props: {
    name: {
      type: String,
      default: "v",
    },
  },
  data() {
    return {};
  },
  methods: {
    beforeEnter(dom) {
      dom.classList.add(`${this.name}-enter`, `${this.name}-enter-active`);
    },
    enter(dom, done) {
      let delay = dom.dataset.delay * 1000;
      setTimeout(() => {
        dom.classList.remove(`${this.name}-enter`);
        dom.classList.add(`${this.name}-enter-to`);
        //监听 transitionend 事件
        var transitionend = window.ontransitionend ? `transitionend` : `webkitTransitionEnd`;
        dom.addEventListener(transitionend, function onEnd() {
          dom.removeEventListener(transitionend, onEnd);
          done(); // 调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
        });
      }, delay);
    },
    afterEnter(dom) {
      dom.classList.remove(`${this.name}-enter-to`, `${this.name}-enter-active`);
    },
    beforeLeave(dom) {
      dom.classList.add(`${this.name}-leave`, `${this.name}-leave-active`);
    },
    leave(dom, done) {
      let delay = dom.dataset.delay;
      console.log(delay);
      setTimeout(() => {
        dom.classList.remove(`${this.name}-leave`);
        dom.classList.add(`${this.name}-leave-to`);
        //监听 transitionend 事件
        var transitionend = window.ontransitionend ? `transitionend` : `webkitTransitionEnd`;
        dom.addEventListener(transitionend, function onEnd() {
          dom.removeEventListener(transitionend, onEnd);
          done(); // 调用done() 告诉vue动画已完成，以触发 afterleave 钩子
        });
      }, delay);
    },
    afterLeave(dom) {
      dom.classList.remove(`${this.name}-leave-to`, `${this.name}-leave-active`);
    },
  },
};
</script>

<style lang="less">
.hyTransitionList {
  overflow: hidden;
  position: relative;
  > li,
  > div {
    width: 100%;
  }
}

.list-leave-active {
  transition-delay: 0s !important;
  position: absolute;
  transition: 0.5s;
}
.list-enter {
  transform: translateY(20px);
}
.list-enter-to {
  transform: translateY(0);
}
.list-leave {
  transform: translateX(0px);
}
.list-leave-to {
  transform: translateX(100%);
}
</style>
