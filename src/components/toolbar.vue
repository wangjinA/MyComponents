<!--
 * @Author: 汪锦
 * @Date: 2020-06-17 17:37:26
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-06-19 17:11:38
 * @Description: 工具栏
--> 
<template>
  <div class="toolbar">
    <div @click="setHasSidebar(!hasSidebar)" class="hover">
      <Icon type="md-arrow-round-back" />
      {{ hasSidebar ? 'TOOGLE' : 'TOOGLE' }}
    </div>
    <div style="margin: 0 auto; font-size:20px;">组件库</div>
    <ul class="nav-ul">
      <li @click="$bus.$emit('showC')">组件库</li>
      <li @click="$bus.$emit('showU')">js库</li>
      <li @click="navHandler">上传组件</li>
      <li @click="outLogin">退出登录</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'toolbar',
  data() {
    return {
      
    }
  },
  methods: {
    outLogin() {
      this.$router.push('/')
    },
    navHandler() {
      this.$Message.warning({
        background: true,
        content: '别点我，还在开发',
        duration: 2
      });
    }
  }
}
</script>

<style lang="less" scoped>
.toolbar{
  background-color: var(--main-500);
  transition: padding .3s;
  padding: 0 16px;
  height: var(--toolbarHeight);
  display: flex;
  align-items: center;
  color: #fff;
  .nav-ul{
    display: flex;
    user-select: none;
    li{
      margin: 0 20px;
      .hover()
    }
  }
}
</style>