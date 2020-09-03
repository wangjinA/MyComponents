<template>
  <div class="echart-preview">
    <div class="flex-center" style="padding: 20px 0" v-if="!isAdd">
      <Button type="info" @click="isAdd = true">添加</Button>
    </div>
    <div class="add-eachrts" v-if="isAdd">
      <div class="ae-edit">
        <div
          class="ae-edit-div"
          ref="div"
          @input="divInput"
          contenteditable="true"
          v-set-div-input
        ></div>
        <div class="ae-edit-errInfo" v-if="errInfo">
          {{ errInfo }}
        </div>
        <div class="ae-commit" style="padding: 20px 0">
          <Button type="info" @click="isAdd = false" v-if="!this.errInfo">返回</Button>
          <Button
            style="margin-left: 20px;"
            type="success"
            @click="commitEchart"
            v-if="addOptionsStr && !this.errInfo"
            >保存</Button
          >
        </div>
      </div>
      <div class="ae-preview" :style="{ background: echartBg }">
        <echart-template :options="addOptions" :openInterval="false"></echart-template>
        <div class="ap-operation">
          <Form>
            <FormItem label="背景颜色" :label-width="80">
              <Input v-model="echartBg" />
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div class="et-list" v-if="!isAdd">
      <div class="et-wrap" v-for="(item, index) in list" :key="index">
        <echart-template
          class="et"
          :options="item.options"
          :style="{ background: item.bg }"
        ></echart-template>
        <div class="et-operation">
          <span style="margin-right: auto; font-size: 12px;">作者：{{ item.userName }}</span>
          <div @click="copyText(item.optionsStr)">复制</div>
          <div @click="updateEchart(item)">修改</div>
          <div @click="deleteEchart(item)">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echartTemplate from "./echartTemplate";
import { copyText } from "@/utils";
export default {
  name: "echartPreview",
  components: {
    echartTemplate,
  },
  data() {
    return {
      pageSize: 100,
      pageNum: 1,
      isAdd: false, // 是否添加
      addOptionsStr: "", // div编辑代码
      addOptions: {}, // 添加的options配置
      list: [], // echarts列表
      errInfo: "", // 错误信息
      echartBg: "#1E1E1E",
    };
  },
  directives: {
    setDivInput: {
      inserted(e) {
        // 干掉IE http之类地址自动加链接
        try {
          document.execCommand("AutoUrlDetect", false, false);
        } catch (e) {
          console.log(e);
        }
        e.addEventListener("paste", (e) => {
          e.preventDefault();
          var text = null;

          if (window.clipboardData && window.clipboardData.setData) {
            // IE
            text = window.clipboardData.getData("text");
          } else {
            text =
              (e.originalEvent || e).clipboardData.getData("text/plain") ||
              prompt("在这里输入文本");
          }
          if (document.body.createTextRange) {
            let textRange;
            if (document.selection) {
              textRange = document.selection.createRange();
            } else if (window.getSelection) {
              let sel = window.getSelection();
              var range = sel.getRangeAt(0);

              // 创建临时元素，使得TextRange可以移动到正确的位置
              var tempEl = document.createElement("span");
              tempEl.innerHTML = "&#FEFF;";
              range.deleteContents();
              range.insertNode(tempEl);
              textRange = document.body.createTextRange();
              textRange.moveToElementText(tempEl);
              tempEl.parentNode.removeChild(tempEl);
            }
            textRange.text = text;
            textRange.collapse(false);
            textRange.select();
          } else {
            // Chrome之类浏览器
            document.execCommand("insertText", false, text);
          }
        });
        // 去除Crtl+b/Ctrl+i/Ctrl+u等快捷键
        e.addEventListener("keydown", (e) => {
          // 9 tab键
          switch (e.keyCode) {
            case 9:
              document.execCommand("insertText", false, "    ");
              e.preventDefault();
              e.stopPropagation();
              break;
          }
          // e.metaKey for mac
          if (e.ctrlKey || e.metaKey) {
            switch (e.keyCode) {
              case 66: //ctrl+B or ctrl+b
              case 98:
              case 73: //ctrl+I or ctrl+i
              case 105:
              case 85: //ctrl+U or ctrl+u
              case 117: {
                e.preventDefault();
                break;
              }
            }
          }
        });
      },
    },
  },
  methods: {
    copyText,
    commitEchart() {
      this.$post(
        "/api/addEcharts",
        {
          options: this.addOptionsStr,
          bg: this.echartBg,
          id: this.echartId,
        },
        true
      ).then((res) => {
        if (res.status) {
          this.isAdd = false;
        }
      });
    },
    divInput(e) {
      this.addOptionsStr = e.target.innerText;
    },
    // 删除
    deleteEchart(item) {
      this.$post(
        "/api/deleteEcharts",
        {
          id: item.id,
        },
        true
      ).then((res) => {
        if (res.status) {
          this.f5();
        }
      });
    },
    // 修改
    updateEchart(item) {
      this.isAdd = true;
      setTimeout(() => {
        this.echartId = item.id;
        this.addOptionsStr = item.optionsStr;
        this.$refs.div.innerText = item.optionsStr;
      }, 500);
    },
    // 获取
    f5() {
      this.$get(
        "/api/getEcharts",
        {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        },
        true
      ).then((res) => {
        let list = res.data.map((item) => {
          let options = {};
          try {
            eval(item.options);
          } catch (error) {
            console.log(error);
          }
          return {
            ...item,
            options,
            optionsStr: item.options,
          };
        });
        if (this.pageNum === 1) {
          this.list = list;
        } else {
          this.list = [...this.list, ...list];
        }
      });
    },
  },
  watch: {
    addOptionsStr(str) {
      let options = {};
      try {
        eval(this.addOptionsStr);
        this.errInfo = "";
      } catch (error) {
        let errInfo = error.toString();
        if (errInfo === "ReferenceError: option is not defined") {
          errInfo = "请把 option 变量改成 options (在后面加个s)";
        }
        this.errInfo = errInfo;
      }
      this.addOptions = options;
    },
    isAdd(val) {
      this.addOptionsStr = "";
      this.addOptions = {};
      this.echartId = "";
      if (!val) {
        this.pageNum = 1;
        this.f5();
      }
    },
  },
  created() {
    this.f5();
  },
};
</script>

<style lang="less" scoped>
.add-eachrts {
  display: flex;
  height: calc(100vh - var(--toolbarHeight));
  .ae-edit {
    background-color: #1e1e1e;
    width: 50%;
    border-right: 1px solid #f5f5f5;
    position: relative;
    white-space: pre-wrap;
    .ae-commit {
      position: absolute;
      width: 100%;
      bottom: 0;
      .flex-center();
    }
    .ae-edit-errInfo {
      position: absolute;
      bottom: 0;
      padding: 20px;
      width: 100%;
      background-color: #ff9900;
      color: #062c3e;
    }
    .ae-edit-div {
      height: 100%;
      color: #fff;
      padding: 30px;
    }
  }
  .ae-preview {
    background: #1e1e1e;
    width: 50%;
    position: relative;
    /deep/ .ivu-form .ivu-form-item-label {
      color: #fff;
    }
    .ap-operation {
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
}
.et-list {
  display: grid;
  gap: 2vw;
  justify-content: center;
  padding: 50px;
  grid-template-columns: repeat(4, 18vw);
  background-color: #f7f8fc;
  > .et-wrap {
    height: 18vw;
    position: relative;
    background-color: #fff;
    border-radius: 0.5vw;
    box-shadow: 1px 3px 7px 2px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    > .et-operation {
      position: absolute;
      bottom: 0px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      color: #fff;
      padding: 5px 10px;
      display: none;
      justify-content: center;
      align-items: baseline;
      background-color: var(--main-500);
      > div {
        margin: 0 10px;
        .hover();
      }
    }
    &:hover {
      transform: scale(1.1);
      > .et-operation {
        display: flex;
      }
    }
    > .et {
      border-radius: 0.5vw;
    }
  }
}
</style>
