<template>
  <demo-page :options="options">
    <div style="width: 300px; background: #082A61">
      <scroll-table :columns="columns" :data="data" :showLength="6"></scroll-table>
    </div>
  </demo-page>
</template>

<script>
export default {
  name: "scrollTable-demo",
  data() {
    return {
      columns: [
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "年龄",
          key: "age",
        },
      ],
      data: [
        {
          name: "张三",
          age: 666,
        },
        {
          name: "李四",
          age: 22,
        },
        {
          name: "王五",
          age: 22,
        },
        {
          name: "赵六",
          age: 22,
        },
        {
          name: "王五",
          age: 22,
        },
        {
          name: "赵六",
          age: 22,
        },
        {
          name: "王五",
          age: 22,
        },
        {
          name: "赵六",
          age: 22,
        },
        {
          name: "王五",
          age: 22,
        },
        {
          name: "赵六",
          age: 22,
        },
      ],
      options: {
        tips: `滚动列表，可以配置rem和px单位。 下载组件后可自行修改内部代码props内部默认值
          company               单位，默认rem
          headerLineHeight      表头行高
          lineHeight            表体行高
          showIndex             是否显示index
          showHeader            是否显示头部
          duration              时长
          trunCount             每次滚动行数
          columns               表头数组 [{name: 表头名字, attr: '表体属性名', slot: '插槽名称', title: '是否显示表体', width: '宽度'}]
          data                  表体数组
          showLength            显示多少行
          spacing               间距
          titleFontSize         标题字体大小
          listFontSize          列表字体大小
          `,
        cName: "scrollTable",
      },
    };
  },
};
</script>
