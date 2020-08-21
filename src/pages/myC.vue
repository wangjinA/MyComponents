<template>
  <div class="myC"  :class="{'has-sidebar': hasSidebar}">
    <toolbar />
    <sidebar />
    <main-content />
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";
import toolbar from "@/components/toolbar";
import mainContent from "@/components/mainContent";
export default {
  components: {
    sidebar,
    toolbar,
    mainContent
  }
};
</script>

<style lang="less">

.has-sidebar{
  .main{
    padding-left: var(--sidebarWidth);
  }
  .toolbar{
    padding: 0 16px 0 calc(var(--sidebarWidth) + 15px);
  }
  .sidebar{
    transform: translateX(0);
  }
}
</style>