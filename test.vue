<template>
  <div>
    <div
      class="list"
      ref="list"
      v-for="(i, index) in list"
      :key="i"
      @click="list.splice(index, 1)"
      :data-delay="0.1 * i"
    >
      <div class="list-item">
        <div class="li-one"></div>
        <div class="li-two"></div>
        <div class="li-three"></div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };
  },
  mounted() {
    console.log(
      anime({
        targets: this.$refs.list,
        reverse: true,
        keyframes: [
          {
            translateX: 30,
            duration: 0,
          },
          {
            translateX: -0,
          },
        ],
        delay: anime.stagger(60), // 每个元素的延迟增加100毫秒。
      })
    );
  },
};
</script>

<style lang="less">
.list {
  margin-bottom: 10px;
  // transition-duration: 0.3s;
  width: 100%;
}
.list-item {
  display: grid;
  grid-template: 20px 20px ~"/" 50px 200px;
  gap: 10px;
  justify-content: center;
  .li-one {
    background-color: #6ab6fc;
    border-radius: 10px;
  }
  .li-two {
    background-color: #6ab6fc;
    border-radius: 10px;
    grid-row: 1~ "/" 3;
  }
  .li-three {
    background-color: #9ed2fc;
    border-radius: 10px;
    width: 50%;
  }
}
</style>
