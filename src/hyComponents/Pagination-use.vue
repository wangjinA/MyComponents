<template>
  <my-pagination 
    :currentPage.sync="currentPage"
    :limit.sync="limit"
    :totalCount="totalCount"
    @turn="getData"></my-pagination>
</template>

<script>
import myPagination from "./Pagination";
export default {
  components: {
    myPagination,
  },
  data() {
    return {
      currentPage: 1, //当前页码
      limit: 3, //每页显示条数
      totalCount: 100,
    };
  },
  methods: {
    getData() {
      console.log("刷新列表！");
    },
  },
};
</script>
