<template>
  <demo-page :options="options">
    <hy-transition-list name="list" appear tag="div">
      <div
        class="list"
        v-for="(i, index) in list"
        :key="i"
        @click="list.splice(index, 1)"
        :data-delay="0.1 * i"
      >
        <div class="list-item">
          <div class="li-one">
            点我
          </div>
          <div class="li-two"></div>
          <div class="li-three"></div>
        </div>
      </div>
    </hy-transition-list>
  </demo-page>
</template>
<script>
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      options: {
        tips: "列表入场，交错、删除",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.list-item {
  display: grid;
  grid-template: 20px 20px ~"/" 50px 200px;
  gap: 10px;
  justify-content: center;
  .hover();
  .li-one {
    background-color: #6ab6fc;
    border-radius: 10px;
    grid-row: 1~ "/" 3;
    color: #fff;
    display: grid;
    place-content: center;
  }
  .li-two {
    background-color: #6ab6fc;
    border-radius: 10px;
  }
  .li-three {
    background-color: #9ed2fc;
    border-radius: 10px;
    width: 50%;
  }
}
.list {
  margin-bottom: 10px;
  transition-duration: 0.3s;
  width: 100%;
}
</style>
