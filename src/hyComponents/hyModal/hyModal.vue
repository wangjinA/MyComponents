<template>
  <div class="hyModal" v-transfer-dom :data-transfer="transfer">
    <transition name="hyModal-mask">
      <div
        class="hyModal-mask"
        :style="setMaskStyles"
        v-show="visible"
        v-if="mask"
        @click="handleClickMask"
      ></div>
    </transition>
    <transition name="hyModal">
      <template v-if="!showOrIf">
        <div class="hyModal-wrap" :style="mainStyles" v-if="visible">
          <div
            class="hyModal-wrap-header"
            v-if="showHead"
            :style="{ color: titleColor, borderBottom: titleStyle.borderBottom }"
          >
            <slot name="header">
              <div class="hyModal-wrap-header-inner">{{ title }}</div>
            </slot>
            <a class="hyModal-wrap-close" v-if="closable" @click="close">
              <slot name="close">
                <Icon type="ios-close" size="50"></Icon>
              </slot>
            </a>
          </div>
          <div class="hyModal-wrap-body" :class="{ 'no-header': !showHead, hei88: footerHide }">
            <slot></slot>
          </div>
          <div class="hyModal-wrap-footer" v-if="!footerHide">
            <slot name="footer">
              <i-button type="text" size="large" @click.native="cancel" style="color: #57a3f3;">{{
                cancelText
              }}</i-button>
              <i-button type="primary" size="large" @click.native="ok">{{ okText }}</i-button>
            </slot>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="hyModal-wrap" :style="mainStyles" v-show="visible">
          <div
            class="hyModal-wrap-header"
            v-if="showHead"
            :style="{ color: titleColor, borderBottom: titleStyle.borderBottom }"
          >
            <slot name="header">
              <div class="hyModal-wrap-header-inner">{{ title }}</div>
            </slot>
            <a class="hyModal-wrap-close" v-if="closable" @click="close">
              <slot name="close">
                <Icon type="ios-close" size="50"></Icon>
              </slot>
            </a>
          </div>
          <div class="hyModal-wrap-body" :class="{ 'no-header': !showHead, hei88: footerHide }">
            <slot></slot>
          </div>
          <div class="hyModal-wrap-footer" v-if="!footerHide">
            <slot name="footer">
              <i-button type="Warning" size="large" @click.native="cancel">{{
                cancelText
              }}</i-button>
              <i-button type="primary" size="large" @click.native="ok">{{ okText }}</i-button>
            </slot>
          </div>
        </div>
      </template>
    </transition>
  </div>
</template>

<script>
import TransferDom from "./transfer-dom";
export default {
  name: "hyModal",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    // 是否有遮罩层
    mask: {
      type: Boolean,
      default: true,
    },
    // 是否有右上角关闭
    closable: {
      type: Boolean,
      default: true,
    },
    // wrap样式
    styles: {
      type: Object,
    },
    // 标题
    title: {
      type: String,
    },
    // modal宽度
    width: {
      type: [Number, String],
      default: 800,
    },
    // modal高度
    height: {
      type: [Number, String],
      default: 670,
    },
    // 位置，fix
    top: {
      type: [Number, String],
      default: 30,
    },
    left: {
      type: [Number, String],
      default: 50,
    },
    // 确定按钮文字
    okText: {
      type: String,
      default: "确定",
    },
    // 取消按钮文字
    cancelText: {
      type: String,
      default: "取消",
    },
    // 是否隐藏底部
    footerHide: {
      type: Boolean,
      default: true,
    },
    // 字体色
    titleColor: {
      type: String,
      default: "#A7F8FE",
    },
    titleStyle: {
      type: Object,
      default() {
        return {
          borderBottom: "1px solid #fff",
        };
      },
    },
    // 相对浏览器水平垂直居中
    center: {
      type: Boolean,
      default: true,
    },
    // 是否允许点击遮罩层关闭
    maskClosable: {
      type: Boolean,
      default: true,
    },
    // v-show:true v-if:false
    showOrIf: {
      type: Boolean,
      default: false,
    },
    transfer: {
      type: Boolean,
      default: false,
    },
    maskStyles: {
      type: Object,
    },
  },
  directives: {
    TransferDom,
  },
  computed: {
    mainStyles() {
      let style = {};
      const width = parseInt(this.width);
      const width_half = parseInt(this.width) / 2;
      const height = parseInt(this.height);
      const height_half = parseInt(this.height) / 2;
      const top = this.center ? 50 : parseInt(this.top);
      const left = this.center ? 50 : parseInt(this.left);
      const styleSize = {
        width: width <= 100 ? `${width}%` : `${width}px`,
        height: height <= 100 ? `${height}%` : `${height}px`,
      };
      const stylePosition = {
        position: "fixed",
        top:
          top < 100 ? (this.center ? `calc(${top}% - ${height_half}px)` : `${top}%`) : `${top}px`,
        left:
          left < 100
            ? this.center
              ? `calc(${left}% - ${width_half}px)`
              : `${left}%`
            : `${left}px`,
        // transform: this.center ?"translate(-50%, -50%)":""
      };
      const customStyle = this.styles ? this.styles : {};
      // width + 自定义样式
      Object.assign(style, styleSize, stylePosition, customStyle);
      return style;
    },
    setMaskStyles() {
      let style = {};
      const customStyle = this.maskStyles ? this.maskStyles : {};
      Object.assign(style, customStyle);
      return style;
    },
  },
  data() {
    return {
      showHead: true,
      visible: this.value,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    // 关闭modal
    close() {
      this.visible = false;
      this.$emit("input", false);
      this.$emit("on-cancel");
    },
    cancel() {
      this.close();
    },
    handleClickMask() {
      if (this.maskClosable) {
        this.close();
      }
    },
    // 确定按钮
    ok() {
      this.visible = false;
      this.$emit("input", false);
      this.$emit("on-ok");
    },
    initModal() {
      let showHead = true;
      if (this.$slots.header === undefined && !this.title) {
        showHead = false;
      }
      this.showHead = showHead;
    },
  },
  mounted() {
    this.initModal();
  },
};
</script>

<style lang="less" scoped>
.hyModal {
  &-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
    height: 100%;
    z-index: 1000;

    &-hidden {
      display: none;
    }
  }
  &-wrap {
    z-index: 1000;
    // border-radius: 5px;
    // box-shadow: 0px 0px 6px 1px #3de8f9;
    height: 766px;
    width: 812px;
    // overflow: hidden;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("./images/hyModal-bg.png");
    &-close {
      position: absolute;
      top: 11px;
      right: 0px;
      width: 35px;
      height: 35px;
      display: block;
      color: #fff;
      font-size: 28px;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: #ddd;
      }
    }
    &-header {
      position: relative;
      padding: 26px 0 20px;
      margin: 0 32px 0 50px;
      // border-bottom: 1px solid #fff;
      line-height: 1;
      text-align: left;
      font-size: 24px;
      &-inner {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    &-body {
      width: 100%;
      word-break: break-all;
      height: calc(100% - 166px);
      position: relative;
      padding: 20px 20px 0 50px;
      overflow-y: auto;
      overflow-x: hidden;
      // background-color: #1f4088e0;
      // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    &-body.hei88 {
      height: calc(~"100% - 88px");
      color: #fff;
    }
    .no-header {
      height: 100%;
    }
    &-footer {
      padding: 12px 18px 12px 18px;
      text-align: center;
      // background-color: #1f4088e0;
      button + button {
        margin-left: 8px;
        margin-bottom: 0;
      }
    }
  }
}
.hyModal-mask-enter-active,
.hyModal-mask-leave-active {
  transition: all 0.3s linear;
}

.hyModal-mask-enter,
.hyModal-mask-leave-to {
  opacity: 0;
}
.hyModal-enter-active,
.hyModal-leave-active {
  transition: all 0.3s linear;
}
.hyModal-enter-active {
  animation: hySacle 0.3s;
}
.hyModal-leave-active {
  animation: hySacle 0.3s reverse;
}

.hyModal-enter,
.hyModal-leave-to {
  // opacity: 0;
}
@keyframes hySacle {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
