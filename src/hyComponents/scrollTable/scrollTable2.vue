<!--
 * @Author: 汪锦
 * @Date: 2020-03-16 15:20:13
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-07-28 10:07:49
 * @Description: 滚动表格
 -->
<template>
  <div class="scrollTable" @mouseenter="Stop()" @mouseleave="Up()">
    <div class="scrollTable-title" :style="{ height: headerLineHeight + 'px' }">
      <div class="title-item item-index" v-if="showIndex">序号</div>
      <div
        class="title-item"
        v-for="item in columns"
        :key="item.title"
        :style="{ flex: `0 0 ${item.width + 'px'}` }"
      >
        {{ item.title }}
      </div>
    </div>
    <div
      ref="scrollTableList"
      class="scrollTable-list yjcg-content-scrollbar"
      :class="{ overflowAuto: isOverflow }"
      :style="`height: ${lineHeight * showLength + spacing * (showLength - 1)}px`"
    >
      <div
        ref="scrollTableListBox"
        class="scrollTable-list-box"
        :style="
          animate &&
            `transition: .5s; transform:translate(0, ${-lineHeight * trunCount - spacing}px)`
        "
      >
        <div
          class="scrollTable-list-box-item"
          @click="$dispatch('selectItem', item)"
          :style="{
            backgroundColor: item.backgroundColor,
            height: lineHeight + 'px',
            marginBottom: spacing + 'px',
          }"
          v-for="item in list"
          :key="item.diyKey"
          :class="{ even: item.index % 2 != 1 }"
        >
          <div class="list-item item-index" v-if="showIndex">{{ item.index }}</div>
          <div
            class="list-item"
            v-for="col in columns"
            :key="col.key"
            :style="{ flex: `0 0 ${col.width + 'px'}` }"
          >
            <Tooltip
              :content="item[col.key]"
              v-if="col.key"
              placement="top"
              class="scrollTable-tooltip"
              max-width="200"
            >
              <span class="text-overflow">{{ item[col.key] }}</span>
            </Tooltip>
            <slot :name="col.slot" v-if="col.slot" :item="item"></slot>
          </div>
        </div>
        <div
          v-if="list.length == 0"
          class="scrollTable-list-box-item scrollNotData"
          :style="{ height: lineHeight + 'px' }"
        >
          暂无数据
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "scrollTable",
  props: {
    // 表头行高
    headerLineHeight: {
      type: Number,
      default: 40,
    },
    // 表体行高
    lineHeight: {
      type: Number,
      default: 40,
    },
    showIndex: {
      // 是否显示index
      type: Boolean,
      default: true,
    },
    duration: {
      // 时长
      type: Number,
      default: 2000,
    },
    trunCount: {
      // 每次滚动行数
      type: Number,
      default: 1,
    },
    columns: {
      // 表头数组 [{label: 表头名字, attr: '表体属性名', slot: '插槽名称', title: '是否显示表体', width: '宽度'}]
      type: Array,
      default: (_) => [],
    },
    data: {
      // 表体数组
      type: Array,
      default: (_) => [],
    },
    showLength: {
      type: Number,
      default: 10,
    },
    spacing: {
      // 间距
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      animate: false,
      isOverflow: false,
      timeOutNum: undefined,
    };
  },
  computed: {
    list() {
      return this.data.map((item, index) => ({
        ...item,
        index: index + 1,
        diyKey: this.getRandomCount(),
      }));
    },
    isOpenScroll() {
      // 判断 内容 > 容器，则开启滚动
      return this.$refs.scrollTableListBox.offsetHeight > this.$refs.scrollTableList.offsetHeight;
    },
  },
  watch: {
    data: {
      handler(val, oldVal) {
        if (val.length) {
          this.$nextTick(() => {
            if (this.isOpenScroll) {
              this.ScrollUp();
            }
          });
        } else {
          this.clear();
        }
      },
      immediate: true,
    },
  },
  methods: {
    getRandomCount(n = 18) {
      let chars = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      var res = "";
      for (var i = 0; i < n; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += chars[id];
      }
      return res;
    },
    ScrollUp() {
      if (this.list.length != 0) {
        this.clear();
        this.intNum = setInterval(() => {
          this.animate = true; // 向上滚动的时候需要添加css3过渡动画
          this.timeOutNum = setTimeout(() => {
            this.list.push(
              ...this.list.splice(0, this.trunCount).map((item) => ({
                ...item,
                diyKey: this.getRandomCount(),
              }))
            );
            this.animate = false;
          }, 500);
        }, this.duration);
      }
    },
    //鼠标移上去停止
    Stop() {
      if (!this.isOpenScroll) return;
      this.isOverflow = true;
      this.clear();
    },
    Up() {
      if (!this.isOpenScroll) return;
      this.isOverflow = false;
      this.ScrollUp();
    },
    clear() {
      if (this.intNum) {
        clearInterval(this.intNum);
      }
      if (this.timeOutNum) {
        clearTimeout(this.timeOutNum);
        this.animate = false;
      }
    },
  },
  destroyed() {
    this.clear();
  },
};
</script>
<style lang="less" scoped>
.scrollTable {
  color: #fff;
  &-title {
    background-color: rgba(20, 93, 192, 0.4);
    width: 100%;
    display: flex;
    align-items: center;
    .title-item {
      padding: 0 3%;
      flex: 1;
      &.item-index {
        flex: none;
      }
      // &:nth-child(3) {
      //   flex: none;
      //   width: 0.8px;
      //   padding: 0;
      // }
    }
  }
  &-list {
    height: 100px;
    overflow: hidden;
    &-box {
      &-item {
        display: flex;
        justify-content: center;
        align-items: center;
        .list-item {
          padding: 0 3%;
          overflow: hidden;
          flex: 1;
          .scrollTable-tooltip {
            // .text-overflow1(1)
          }
          &.item-index {
            font-family: "DIN-Bold";
          }
          /deep/ i {
            font-family: "DIN-Medium";
            font-style: normal;
          }
        }
        &.even {
          background-color: rgba(20, 93, 192, 0.4);
        }
      }
    }
    &::-webkit-scrollbar {
      /* Y滚动条宽度 */
      width: 2px;
      height: 2px;
    }
  }
  .overflowAuto {
    overflow: hidden auto !important;
  }
  // .anim {
  //   transition: all 0.5s;
  //   margin-top: -0.225px; //高度等于行高
  // }
}
</style>
