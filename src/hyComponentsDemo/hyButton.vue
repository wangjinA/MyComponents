<template>
  <demo-page :options="options">
    <hy-button size="samll">小按钮</hy-button>
    <hy-button size="large">大按钮</hy-button>
    <hy-button size="samll" :btnStyle="2">小按钮</hy-button>
    <hy-button size="large" :btnStyle="2">大按钮</hy-button>
  </demo-page>
</template>
<script>
export default {
  name: 'hyButton-demo',
  data() {
    return {
      options: {
        tips: '就是一个按钮，不解释',
        cName: 'hyButton',
        bg: 'linear-gradient(to right, #0e326e 0%, #001d4e 100%)'
      }
    }
  },
}
</script>