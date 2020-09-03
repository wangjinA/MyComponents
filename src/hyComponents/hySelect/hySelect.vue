<!--
 * @Author: 汪锦
 * @Date: 2020-07-29 09:38:18
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-08-31 17:56:53
 * @Description: 多选列表 - 组件递归
-->

<template>
  <div
    class="many-select"
    ref="manySelect"
    v-click-outside="() => (openSelect = false)"
    :style="isChild && `left: ${childLeft}px; top: ${childTop}px;`"
  >
    <div
      class="default-text"
      :style="{ width: width + 'rem', fontSize: size + 'rem', height: titleHeight + 'rem' }"
      v-if="!isChild"
      @click="toggleHandler"
    >
      <div class="dt-val text-overflow">{{ selectTextList || placeholder }}</div>
      <i class="iconfont icon-arrow-down" :class="{ active: openSelect }"></i>
    </div>
    <transition name="scaleY">
      <div
        class="ms-list"
        v-if="isChild || openSelect"
        :style="{ maxHeight: `${maxLength * itemHeight}rem` }"
      >
        <div
          class="ms-item"
          v-for="(item, index) in data"
          :key="index"
          @click.stop="clickHandler(item, true)"
          :class="{ active: item.active, showChild: item.showChild }"
          :style="{ width: width + 'rem', fontSize: size + 'rem', height: itemHeight + 'rem' }"
        >
          <div class="sm-square" @click.stop="iconHandler(item)"></div>
          <i class="iconfont icon-select-bold" @click.stop="iconHandler(item)"></i>
          <div class="text-overflow">{{ item.name }}</div>
          <i class="iconfont icon-arrow-right" v-if="hasChild(item)"></i>
          <!-- 递归自身 -->
          <!-- <transition name="scaleX"> -->
          <hy-select
            class="ms-list-child"
            ref="msChild"
            v-if="hasChild(item) && item.showChild"
            :data="item.childList"
            :isChild="true"
            :dataIndex="index"
            @child-slect-all="childSelectAll"
            @child-slect-all-not="childSelectAllNot"
            @selectItem="$emit('select-item', $event)"
            @reduceItem="$emit('reduce-item', $event)"
          ></hy-select>
          <!-- </transition> -->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// @selectItem: 增加
// @reduceItem: 减少
// @cancelAll: 取消选中所有的
// currentSelect: 当前所有选中的item
export default {
  name: "hySelect",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    isChild: Boolean,
    dataIndex: Number,
    placeholder: {
      type: String,
      default: "请选择",
    },
    width: {
      type: Number,
      default: 1.7,
    },
    size: {
      type: Number,
      default: 0.2,
    },
    titleHeight: {
      type: Number,
      default: 0.52,
    },
    itemHeight: {
      type: Number,
      default: 0.48,
    },
    maxLength: {
      type: Number,
      default: 10,
    },
    // 是否单选
    // isSingle: Boolean
  },
  data() {
    return {
      openSelect: false,
      childLeft: -9999,
      childTop: -9999,
    };
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.isSelectAll();
        });
      },
    },
    openSelect(val) {
      if (!val) {
        this.data.forEach((item) => {
          this.hideAllShowChild(item);
        });
      }
    },
    currentSelect(val, old) {
      // this.timer = setTimeout(() => {
      //   clearTimeout(this.timer);
      // }, 0);
      this.$nextTick(() => {
        // 用此方法包裹（或者用上面的方法），否则会多次触发 cancelAll
        if (!val.length && old.length > val.length) {
          console.log("cancelAll");
          this.$emit("cancelAll");
        }
      });
    },
  },
  methods: {
    // 递归获取所有选中的项
    getCurrentSelect(data = this.data) {
      let arr = [];
      data.forEach((item) => {
        if (this.hasChild(item)) {
          arr.push(...this.getCurrentSelect(item.childList));
        } else if (item.active) {
          arr.push(item);
        }
      });
      return arr;
    },
    hasChild(item) {
      return !!(item.childList && item.childList.length);
    },
    // 递归选中所有子项目
    selectAll(item) {
      this.$set(item, "active", true);
      item.childList.forEach((item) => {
        if (this.hasChild(item)) {
          this.selectAll(item);
        } else {
          !item.active && this.clickHandler(item);
        }
      });
    },
    // 递归减少所有子项目
    reduceAll(item) {
      this.$set(item, "active", false);
      if (item.childList && item.childList.length) {
        item.childList.forEach((item) => {
          this.reduceAll(item);
        });
      }
      item.active && this.clickHandler(item);
    },
    // 框点击事件
    iconHandler(item) {
      if (item.childList && item.childList.length) {
        // 切换showChild
        this.data.forEach((item) => {
          this.hideAllShowChild(item);
        });
        this.$set(item, "showChild", !item.active);
        if (!item.active) {
          this.selectAll(item);
        } else {
          this.reduceAll(item);
        }
      } else {
        this.clickHandler(item);
      }
    },
    // 点击item
    clickHandler(item, isClick = false) {
      // 点击事件才会影响showChild
      if (isClick) {
        this.data.forEach((__item) => {
          // 关闭其他打开的child
          __item != item && this.$set(__item, "showChild", false);
        });
      }
      if (this.hasChild(item)) {
        // 切换child
        if (isClick) {
          this.$set(item, "showChild", !item.showChild);
          if (!item.showChild) {
            this.hideAllShowChild(item);
          }
        }
      } else {
        this.$set(item, "active", !item.active); // 切换选中
        this.$emit(item.active ? "selectItem" : "reduceItem", item); // 向父元素触发选中和取消
        // window.timerSelect = setTimeout(() => {
        //   clearTimeout(window.timerSelect);
        //   if (!item.active) {
        //     !this.currentSelect.length && this.$emit("cancelAll");
        //   }
        // }, 20);
      }
      // this.();
    },
    // 判断当前列表是否全部选中
    isSelectAll(data = this.data) {
      if (data.every((item) => item.active)) {
        // chidl所有都选中的状态下后触发
        this.$emit("child-slect-all", this.dataIndex);
      } else {
        this.$emit("child-slect-all-not", this.dataIndex);
      }
    },
    // 切换选择列表
    toggleHandler() {
      this.data.forEach((__item) => {
        this.$set(__item, "showChild", false);
      });
      this.openSelect = !this.openSelect;
    },
    // chidl所有都选中的状态下后选中自身
    childSelectAll(index) {
      this.$set(this.data[index], "active", true);
    },

    childSelectAllNot(index) {
      this.$set(this.data[index], "active", false);
    },
    // 递归获取已选中的item
    getActiveList(data = this.data) {
      let arr = [];
      data.forEach((item) => {
        if (item.childList && item.childList.length) {
          arr.push(...this.getActiveList(item.childList));
        } else {
          item.active && arr.push(item);
        }
      });
      return arr;
    },
    // 隐藏所有子项showChild
    hideAllShowChild(item) {
      if (item.childList && item.childList.length) {
        this.$set(item, "showChild", false);
        item.childList.forEach((_item) => {
          this.hideAllShowChild(_item);
        });
      }
    },
    // 因为设置overflow auto，所以需要fixed定位（导致损失动画，fixed和transform不共戴天...），定位需要计算父元素的坐标，但是递归是由最子项开始递归，
    // 子元素true状态的时候父元素还是false的状态，所以出现了这个方法， （PS：心累，逻辑稍微增加了一点，可以参照element|iview的源码实现）
    setPosition() {
      if (this.isChild) {
        let timeOut = null;
        let timer = setInterval(() => {
          let parentRect = this.$refs.manySelect.parentElement.getBoundingClientRect();
          if (parentRect.left != -9999) {
            this.childLeft = parentRect.left + parentRect.width;
            this.childTop = parentRect.top;
            clearInterval(timer);
            clearTimeout(timeOut);
          }
        }, 10);
        timeOut = setTimeout(() => {
          clearInterval(timer);
        }, 10000);
      }
    },
  },
  computed: {
    // 所有选中的item， 不包含父级大类
    currentSelect() {
      return this.getCurrentSelect();
    },
    // 显示的文本
    selectTextList() {
      return this.getActiveList()
        .map((item) => item.name)
        .join(",");
    },
  },
  mounted() {
    this.setPosition();
  },
};
</script>

<style lang="less" scoped>
@import "./iconfont/iconfont.css";
.ms-list {
  background: linear-gradient(0deg, rgba(0, 115, 128, 0.9) 0%, rgba(1, 69, 128, 0.9) 100%);
  position: absolute;
  z-index: 99;
  cursor: pointer;
  transform-origin: center top;
  overflow: auto;
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: rgba(76, 247, 255, 1);
    }
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(76, 247, 255, 0.5);
    transition: 0.5s;
    border-radius: 0.05rem;
    z-index: 999;
  }

  &::-webkit-scrollbar {
    width: 0.04rem;
    height: 0.04rem;
  }

  &::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0.05rem rgba(0, 0, 5, 0.2);
  }
  .ms-item {
    // height: 0.48rem;
    display: flex;
    align-items: center;
    color: #fff;
    padding-left: 0.1rem;
    padding-right: 0.2rem;
    position: relative;
    .ms-list-child {
      transform-origin: left;
      position: fixed;
      top: 0;
      z-index: 99;
      // transition: transform 0.3s;
    }
    .sm-square {
      width: 0.15rem;
      height: 0.15rem;
      border-radius: 0.03rem;
      border: 0.01rem solid rgba(255, 255, 255, 0.6);
      margin-right: 0.14rem;
      flex-shrink: 0;
    }
    i.icon-arrow-right {
      margin-left: auto;
      font-size: 0.15rem;
    }
    i.icon-select-bold {
      margin-right: 0.14rem;
      display: none;
      font-size: 0.2rem;
    }
    &.active,
    &:hover {
      background-color: rgba(0, 158, 226, 0.4);
    }
    &.showChild {
      background-color: rgba(0, 158, 226, 0.7);
    }
    &.active {
      color: #ffef34;
      > .sm-square {
        display: none;
      }
      > i.icon-select-bold {
        display: block;
      }
    }
  }
}
.default-text {
  height: 0.52rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 5%;
  color: #fff;
  position: relative;
  cursor: pointer;
  background-image: url("./hySelect.png");
  background-size: 100% 100%;
  margin-bottom: 0.001rem;
  i {
    font-size: 0.2rem;
    transition: 0.3s;
    transform: rotate(0deg);
    &.active {
      transform: rotate(-180deg);
    }
  }
}

.scaleY-enter-active,
.scaleY-leave-active {
  transition: 0.3s;
}
.scaleY-leave-to,
.scaleY-enter {
  transform: scaleY(0);
  opacity: 0;
}
.scaleY-leave,
.scaleY-enter-to {
  transform: scaleY(1);
  opacity: 1;
}
</style>
