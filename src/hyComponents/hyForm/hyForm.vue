<!--
 * @Author: 汪锦
 * @Date: 2020-06-18 17:09:54
 * @LastEditors: 迢迢
 * @LastEditTime: 2021-05-31 17:07:14
 * @Description: form表单样式
 -->

<template>
  <div class="hyForm" :class="{ 'hyForm-readonly': readonlyType }">
    <Row :gutter="gutter">
      <i-col :span="item.row ? 24 : 24 / colNum" v-for="(item, index) in columns" :key="index">
        <div
          class="hyForm-item"
          :style="`margin-bottom: ${colGutter}px; ${readonlyType && 'align-items: flex-start;'}`"
        >
          <div class="hyForm-item-label addColon" :style="`width: 6em;`">
            <span v-if="item.required" style="color: #ff1839;">*</span>
            {{ item.name }}：
          </div>
          <div class="hyForm-item-content">
            <div v-if="readonlyType" class="readonlyText">{{ item.value || "-" }}</div>
            <div v-else>
              <template v-if="item.type == 'select'">
                <i-select
                  size="default"
                  v-model="formData[item.key]"
                  clearable
                  @on-clear="selectClear(item)"
                >
                  <i-option
                    :value="select.value"
                    v-for="(select, selectIndex) in item.data"
                    :key="selectIndex"
                    >{{ select.name }}</i-option
                  >
                </i-select>
              </template>
              <template v-else-if="item.type == 'date'">
                <DatePicker
                  class="datePicker"
                  v-model="formData[item.key]"
                  size="default"
                  type="datetimerange"
                  split-panels
                  :placeholder="'请选择' + item.name"
                  confirm
                  @on-clear="selectClear(item)"
                ></DatePicker>
              </template>
              <template v-else>
                <i-input
                  size="default"
                  v-model="formData[item.key]"
                  :placeholder="'请输入' + item.name"
                />
              </template>
            </div>
          </div>
        </div>
      </i-col>
    </Row>
    <div class="hyForm-operation">
      <div v-show="searchType">
        <slot name="footer">
          <hy-button
            class="hy-button"
            ref="addBtn"
            @click="$emit('add')"
            v-if="$listeners.add"
            size="samll"
            >添加</hy-button
          >
          <hy-button class="hy-button" @click="search" size="samll">查询</hy-button>
          <hy-button class="hy-button" @click="reset" size="samll">重置刷新</hy-button>
        </slot>
      </div>
      <div v-show="formType">
        <slot name="footer">
          <hy-button class="hy-button" @click="commit" size="samll">提交</hy-button>
          <hy-button class="hy-button" @click="reset" size="samll">重置</hy-button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
// import hyButton from "@/components/component/hyButton";
export default {
  components: {
    // hyButton,
  },
  name: "HyForm",
  props: {
    type: {
      // 3种类型 表单(默认) 搜索 只读
      type: String,
      default: "form",
      validator(type) {
        let types = ["form", "search", "readonly"];
        return types.some((item) => item === type);
      },
    },
    colNum: {
      // 一行多少个
      type: Number,
      default: 4,
    },
    columns: {
      // 每一项
      type: Array,
      default: () => [],
      required: true,
    },
    gutter: {
      // 横向间距
      type: Number,
      default: 30,
    },
    colGutter: {
      // 纵向间距
      type: Number,
      default: 30,
    },
    footerHide: {
      // 底部按钮显示
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  filters: {
    autoLabelWidth(item) {
      if (item.labelWidth) {
        return item.labelWidth;
      } else if (item.name) {
        return item.name.length * 30;
      }
      return "";
    },
  },
  methods: {
    commit() {
      console.log(this.formData);
      for (let i = 0; i < this.columns.length; i++) {
        const item = this.columns[i];
        if (item.required) {
          let dataItem = this.formData[item.key];
          if (dataItem === undefined || dataItem === "") {
            return this.$Message.error("请完善数据：" + item.title);
          }
        }
      }
      this.$emit("commit", { ...this.formData });
    },
    selectClear(item) {
      // 点击选择器删除触发
      let parent = this.$parent;
      setTimeout(() => {
        parent.$set(parent.searchData, item.key, "");
        this.$set(this.formData, item.key, "");
      });
    },
    initData() {
      // 初始化formData对象
      this.columns.forEach((item) => {
        this.$set(this.formData, item.key, "");
      });
    },
    rightClick() {
      this.$emit("add");
    },
    search() {
      // 判断formData值是否全部为空，全部为空不发送信息
      if (
        !Object.values(this.formData).some((item) => {
          if (item instanceof Array) {
            // 日期是数组
            if (!item.some((item) => !!item)) {
              return;
            }
          }
          return !!item;
        })
      ) {
        this.$Message.error("请填写搜索条件");
        return;
      }
      this.$emit("search", { ...this.formData });
    },
    reset() {
      setTimeout(() => Object.assign(this.$data, this.$options.data()), 0);
      this.$emit("resetList");
    },
  },
  computed: {
    searchType() {
      return this.type === "search";
    },
    formType() {
      return this.type === "form";
    },
    readonlyType() {
      return this.type === "readonly";
    },
  },
  created() {
    this.initData();
  },
};
</script>

<style lang="less" scoped>
.hyForm {
  color: #fff;
  .readonlyText {
    border: 1px solid #00ccff;
    padding: 5px;
  }
  .hyForm-operation {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .hy-button {
      margin: 0 20px;
    }
  }
  .hyForm-item {
    font-size: 16px;
    display: flex;
    align-items: center;
    &-label {
      color: #18cffe;
      text-align: right;
    }
    &-content {
      flex: 1;
    }
  }
  .datePicker {
    color: #2c3e50;
    width: 100%;
  }
  /deep/ .ivu-select-selection,
  /deep/ .ivu-input {
    background-color: rgba(164, 248, 255, 0.08);
    border-color: #00ccff;
    box-shadow: 0 0 6px 0px rgba(164, 248, 255, 0.5);
    color: #fff;
  }
  /deep/ .ivu-input-group-prepend {
    width: 80px;
    background-color: transparent;
    border-color: #00ccff;
    background-color: rgba(164, 248, 255, 0.08);
    padding-left: 0;
    padding-right: 0;
    border-right: 1px solid;
    .ivu-select {
      color: #fff;
    }
  }
}
.hyForm-readonly {
  // 只读样式
  .hyForm-item {
    align-items: flex-start;
    &-label {
      margin-top: 5px;
    }
  }
}
</style>
