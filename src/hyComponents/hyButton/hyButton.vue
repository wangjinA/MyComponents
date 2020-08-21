<!--
 * @Author: 汪锦
 * @Date: 2020-03-27 11:23:49
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-06-19 09:13:42
 * @Description: 公共button
 -->

<template>
  <div class="hy-button" :class="{'hy-button-style2': btnStyle == 2}" @click="$emit('click')" :style="btnCss">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'HyButton',
    props: {
      width: {
        type: Number,
        default: 100
      },
      height: {
        type: Number,
      },
      btnStyle:{
        type:Number,
        default:1
      },
      fontSize: {
        type:Number,
        default: 20
      },
      size: {
        type: String,
        default: 'default'
      }
    },
    data() {
      return {
        realWidth: 100,
        realHeight: 40,
      }
    },
    computed: {
      btnCss() {
        let width = 0
        let height = 0
        let fontSize = 16
        switch (this.size) {
          case 'large':
            width = 145;
            height = 50;
            fontSize = 20
            break;
          case 'samll':
            width = 100;
            height = 40;
            fontSize = 16
            break
          default:
            width = 100;
            height = 40;
            fontSize = 16
            break;
        }
        return `
          width:${width}px;
          height:${height}px;
          line-height:${height}px;
          font-size: ${fontSize}px
        `
      }
    },
  }
</script>

<style lang="less" scoped>
.hy-button{
  text-align: center;
  color: #fff;
  background-image: url('./btn.png');
  background-size: 100% 100%;
  cursor: pointer;
  user-select: none;
  display: inline-block;
  &:active{
    background-image: url('./btn-active.png');
  }
}
.hy-button-style2 {
    background-image: url("./btn-style2.png");
  &:hover {
    background-image: url("./btn-style2-hover.png");
  }
}
</style>