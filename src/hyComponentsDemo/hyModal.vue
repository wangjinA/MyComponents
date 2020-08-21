<template>
  <demo-page :options="options">
    <hy-modal v-model="showModal" :footerHide="true" title="标题">
      这是内容
    </hy-modal>
  </demo-page>
</template>

<script>
export default {
  name: 'hyModal-demo',
  data() {
    return {
      showModal: true,
      options: {
        tips: '一个简单的模态框',
        cName: 'hyModal',
      }
    }
  }
}
</script>