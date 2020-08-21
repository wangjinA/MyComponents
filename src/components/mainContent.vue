<!--
 * @Author: 汪锦
 * @Date: 2020-06-18 09:18:18
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-06-19 15:10:51
 * @Description: 主容器
--> 
<template>
  <main class="main" @click="mainClick">
    <template v-if="cName">
      <component :is="`${cName}-Demo`" />
    </template>
    <template v-if="uName">
      <h2 style="margin-top: 20px; text-align: center;">{{sidebarItem.tips}}</h2>
      <code-view :code="code"></code-view>
    </template>
  </main>
</template>

<script>
import codeView from '@/components/codeView'
export default {
  name: 'mainContent',
  components: {
    codeView
  },
  data() {
    return {
      code: ''
    }
  },
  watch: {
    uName: {
      handler: 'getUCode'
    }
  },
  methods: {
    getUCode() {
      if(this.uName)
        this.$get('/api/getCode', {
          uName: this.uName
        }).then(res => {
          if(res.status) {
            this.code = res.data
          }
        })
    },
    mainClick() {
      // this.setHasSidebar(false)
    }
  }
}
</script>

<style lang="less" scoped>
.main{
  height: calc(100vh - var(--toolbarHeight));
  overflow: auto;
  transition: .3s;
}
</style>