<template>
  <div class="fuzzy-search ">
    <input placeholder="关键字查询" class="inputText" v-model="searchText" @keyup.enter="searchHandler" @keyup.27="closeAll" />
    <transition name="showScale">
      <Icon type="md-close" class="fuzzy-close" v-show="searchText.length > 0" @click="closeAll" />
    </transition>
    <div class="search-icon-box">
      <img class="fuzzy-search-icon" v-if="!loading" src="./images/search.png" @click="searchHandler" />
      <Icon type="ios-loading" v-if="loading" class="ios-loading" />
    </div>
    <transition name="scaleY">
      <div class="searchResult" v-if="searchTag === 1">
        <div class="search-section">
          <div class="ss-left">
            <span>搜索结果</span>
          </div>
          <div class="ss-right">{{ resultList.length }}条</div>
        </div>
        <div>
          <div class="searchAll search_currency" v-for="(item, index) in resultList" :key="index">
            <span>{{ item.name }}</span>
            <span class="rk_list rk_list3">{{ item.address }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      searchText: '',
      searchTag: 0,
      resultList: [
        {
          name: '张三',
          address: '珠江国际大厦'
        },
        {
          name: '张三',
          address: '珠江国际大厦'
        },
        {
          name: '张三',
          address: '珠江国际大厦'
        },
        {
          name: '张三',
          address: '珠江国际大厦'
        }
      ],
      loading: false
    }
  },
  watch: {
    searchText(val) {
      if (!val) {
        this.closeAll()
      }
    }
  },
  methods: {
    // 点击、回车、切换搜索条件、切换类型
    searchHandler() {
      this.pageNum = 1
      if (this.searchText) {
        this.searchData()
      }
    },
    searchData() {
      this.loading = true
      setTimeout(() => {
        this.searchTag = 1
        this.loading = false
      }, 800)
    },
    closeAll() {
      this.searchText = ''
      this.searchTag = 0
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.fuzzy-search {
  --width: 3.57rem;
  z-index: 4;
  position: absolute;
  // top: 1.76rem;
  // left: 5.67rem;
  right: 110%;
  width: var(--width);
  // width: 5.5rem;
  height: 0.53rem;
  display: flex;
  color: #ffffff;
  background-image: url('./images/searchBox.png');
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  .fuzzy-close {
    cursor: pointer;
    position: absolute;
    top: 0.07rem;
    right: 0.9rem;
    margin-right: 0.1rem;
    font-size: 0.22rem;
    padding: 0.1rem 0;
    transition: 0.2s;
    transform: rotate(0deg);
    color: rgba(255, 255, 255, 0.7);
    &:hover {
      transform: rotate(90deg);
      color: #ff8181;
    }
  }
  .search-icon-box {
    position: absolute;
    right: 0.1rem;
    top: 0.15rem;
    margin-left: auto;
    margin-right: 0.18rem;
    .fuzzy-search-icon {
      width: 0.28rem;
      height: 0.28rem;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .ios-loading {
      @keyframes rotateLoading {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      // transform-origin: center;
      animation: rotateLoading 0.5s linear infinite;
      font-size: 0.25rem;
      color: #21dfff;
    }
  }
  .searchStyle {
    transform-origin: top;
    padding: 0.11rem 0.15rem;
    // height: 2.89rem;
    background: linear-gradient(0deg, rgba(0, 115, 128, 1) 0%, rgba(1, 69, 128, 1) 100%);
    position: absolute;
    width: 4.16rem;
    top: 100%;
    left: 0;
    text-align: left;
    font-size: 0.24rem;
    font-family: Source Han Sans CN Regular, Source Han Sans CN Regular-Regular;
    font-weight: 400;
    // overflow: hidden;
    box-shadow: 2px 2px 10px 1px #23232385;
  }
  .searchResult::-webkit-scrollbar {
    width: 0.03rem;
  }
  .searchResult::-webkit-scrollbar-thumb {
    background: #b1d8eb;
    border-radius: 0.1rem;
  }
  .searchResult::-webkit-scrollbar-track-piece {
    background: transparent;
  }
  .searchResult {
    // overflow-y: scroll;

    transform-origin: top;
    padding: 0.11rem 0.15rem;
    // height: 2.89rem;
    background: linear-gradient(0deg, rgba(0, 115, 128, 1) 0%, rgba(1, 69, 128, 1) 100%);
    position: absolute;
    width: var(--width);
    top: 100%;
    left: 0;
    text-align: left;
    font-size: 0.24rem;
    font-family: Source Han Sans CN Regular, Source Han Sans CN Regular-Regular;
    font-weight: 400;
    // overflow: hidden;
    box-shadow: 2px 2px 10px 1px #23232385;
    .search-section {
      display: flex;
      height: 0.4rem;
      padding: 0 0.07rem;
      justify-content: space-between;
      align-items: center;
      font-size: 0.16rem;
      border-top: 0.01rem solid rgba(255, 255, 255, 0.5);
      border-bottom: 0.01rem solid rgba(255, 255, 255, 0.5);
      margin-bottom: 0.1rem;
      position: relative;
      .ss-right {
        // .hover();
      }
    }
    .search_currency {
      font-size: 0.18rem;
      cursor: pointer;
      .icon_man,
      .icon_woman {
        font-size: 0.12rem;
      }
      .icon_woman {
        color: #e8720d;
      }
      .icon_man {
        color: #00b8ff;
      }
      .rk_list {
        position: absolute;
      }
      .rk_list1 {
        left: 35%;
      }
      .rk_list2 {
        left: 45%;
      }
      .rk_list3 {
        left: 65%;
        display: inline-block;
        width: 1.2rem;
        .text-overflow1(1);
      }
      &:hover {
        background: rgba(0, 158, 226, 0.4);
        .ardess_left {
          // .bg-style('../../../assets/images/search-panel/xresult-list-num-acitve.png');
          background-size: 100% auto;
        }
      }
    }
    .search_house {
      padding: 0 0 0 0.61rem;
      height: 0.9rem;
      line-height: 0.9rem;
      position: relative;
      .ardess_left {
        // .bg-style('../../../assets/images/search-panel/xresult-list-num.png');
        background-size: 100% auto;
        position: absolute;
        top: 0.15rem;
        width: 0.4rem;
        height: 0.5rem;
        line-height: 0.46rem;
        font-size: 0.18rem;
        text-align: center;
        left: 0.05rem;
      }
      .text-overflow1(1);
      /* > p {
        height: 0.45rem;
        line-height: 0.45rem;
        &:nth-child(1) {
          font-size: 0.2rem;
        }
        &:nth-child(2) {
          font-size: 0.16rem;
        }
      } */
      .search-house-title {
        font-size: 0.2rem;
        font-weight: 500;
        height: 0.45rem;
        line-height: 0.42rem;
      }
      .search-house-address {
        font-size: 0.15rem;
        color: #ccc;
        height: 0.35rem;
        line-height: 0.32rem;
      }
    }
    .searchAll {
      .space-between();
      padding: 0 0 0 0.11rem;
      height: 0.45rem;
      line-height: 0.45rem;
    }
  }
  .rightOption {
    width: 1.3rem;
    padding: 0 0 0 0.2rem;
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    i.iconarrow-down {
      font-size: 0.2rem;
      transition: 0.3s;
      transform: rotate(0deg);
      margin-top: 0.02rem;
      margin-left: 0.1rem;
    }
    > .ro-text {
      font-size: 0.24rem;
      font-family: 'SourceHanSansCN-Regular';
    }
    .titleDrop {
      position: absolute;
      left: 0.01rem;
      top: 100%;
      width: 100%;
      display: none;
      text-align: center;
      padding: 0.11rem 0 0.11rem 0;
      background: linear-gradient(rgba(21, 71, 77, 0.9) 0%, rgba(0, 41, 77, 0.9) 80%);
      li {
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.24rem;
        font-family: 'SourceHanSansCN-Regular';
      }
      li:hover {
        background: rgba(0, 158, 226, 0.4);
      }
    }
    &:hover {
      i {
        transform: rotate(-180deg);
      }
      .titleDrop {
        display: block;
      }
    }
  }
  .inputText {
    width: 3.5rem;
    color: #fff;
    height: 100%;
    line-height: 100%;
    border: none;
    outline: none;
    font-size: 0.2rem;
    font-family: Source Han Sans CN Regular, Source Han Sans CN Regular-Regular;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0);
    padding: 0 0 0 0.21rem;
    &::-webkit-input-placeholder {
      font-size: 0.16rem;
      color: #cfcfcf;
    }
  }
}
</style>
