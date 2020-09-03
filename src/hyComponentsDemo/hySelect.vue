<template>
  <demo-page :options="options">
    <hy-select :data="selectList"></hy-select>
  </demo-page>
</template>
<script>
export default {
  name: "hySelect-demo",
  data() {
    return {
      selectList: [
        {
          name: "重点人",
          value: 100,
        },
        {
          name: "一级对象",
          value: 80,
        },
        {
          name: "预警人",
          value: 59,
          childList: [
            {
              name: "重点预警",
              value: 66,
            },
          ],
        },
        {
          name: "一般",
          value: 54,
        },
        {
          name: "普通",
          value: 99,
        },
      ],
      options: {
        tips: `
            多选列表 - 递归组件；主要是通过列表的active判断是否选中，内部会在每一项添加这个变量。
            因为原先是用rem写的，如果需要px则需要重写像素单位

            // 最好是在项目上安装一个这个插件，鼠标点击非自身，关闭组件；组件内部也引用了这个vue指令 v-click-outside-x
            import * as vClickOutside from 'v-click-outside-x';
            Vue.use(vClickOutside);
            
            @selectItem: 增加
            @reduceItem: 减少
            @cancelAll: 取消选中所有的
            currentSelect: 当前所有选中的item
        `,
      },
    };
  },
  created() {
    // 设置html字体大小，因为该组件原来是rem写的样式。
    this.htmlOldFontSize = document.documentElement.style.fontSize || "16px";
    document.documentElement.style.fontSize = "70px";
  },
  destroyed() {
    document.documentElement.style.fontSize = this.htmlOldFontSize;
  },
};
</script>
