<template>
  <demo-page :options="options">
    <div class="title" style="color:#fff;">表单</div>
    <hyForm :columns="columns" :colNum="2" type="form"></hyForm>
    <div class="cut-line"></div>
    <div class="title" style="color:#fff;">搜索</div>
    <hyForm :columns="columns" :colNum="2" type="search"></hyForm>
    <div class="cut-line"></div>
    <div class="title" style="color:#fff;">只读</div>
    <hyForm :columns="columns" :colNum="2" type="readonly"></hyForm>
  </demo-page>
</template>

<script>
export default {
  name: 'hyForm-demo',
  data() {
    return {
      columns: [
        {
          name: "事件编号",
          key: "eventCode",
          value: 'test001',
          type: 'select',
          required: true,
          data: [{
            name: 'test1',
            value: 'test1'
          }, {
            name: 'test1',
            value: 'test1'
          }, {
            name: 'test1',
            value: 'test1'
          }, {
            name: 'test1',
            value: 'test1'
          }]
        }, {
          name: "事件名称",
          key: "eventName",
          value: '殴打他人'
        }, {
          name: "案发时间",
          key: "eventTime",
          type: 'date',
          value: '2020-06-17 15:25'
        }, {
          name: "责任单位",
          key: "respUnitName",
          value: '区应急'
        }, {
          name: "事件内容",
          key: "partiUnitName",
          row: true,
          value: '广州市花都区新花路24号发生殴打他人'
        }
      ],
      options: {
        cName: 'hyForm',
        tips: '包含3种类型 表单(默认) 搜索 只读； 修改type就可以 form、search、readonly',
        bg: 'linear-gradient(to right, #0e326e 0%, #001d4e 100%)'
      }
    }
  }
}
</script>