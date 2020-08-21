<template>
  <demo-page :options="options">
    <div class="threed-wrap">
      <threed-tags :list="tags"></threed-tags>
    </div>
  </demo-page>
</template>

<script>
export default {
  name: 'threedTags-demo',
  data() {
    return {
      tags: [
        '新冠病毒',
        '社会环境',
        '地摊',
        '谨防诈骗',
        '大前端',
        'JavaScript',
        'CSS',
        'HTML',
        'Vue',
        'less',
        'webpack'
      ],
      options: {
        cName: 'threedTags',
        tips: '3D云标签',
        bg: 'linear-gradient(to right, #0e326e 0%, #001d4e 100%)'
      }
    }
  }
}
</script>
<style lang="less" scoped>
.threed-wrap{
  // background-image: url("~@/assets/images/main/zsk-kuang.png");
  // background-size: 100% 100%;
  width: 449px;
  height: 310px;
}
</style>