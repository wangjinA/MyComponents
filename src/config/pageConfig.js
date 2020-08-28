export const pageConfig = {
  组件库: {
    list: [{
      title: 'components',
      children: [{
        name: '按钮',
        cName: 'hyButton',
      }, {
        name: '弹窗',
        cName: 'hyModal',
      }, {
        name: '表单',
        cName: 'hyForm',
      }, {
        name: '3D云标签',
        cName: 'threedTags',
      }]
    }]
  },
  js库: {
    list: [{
      title: 'utils',
      children: [{
        name: '滚动加载',
        type: 'util',
        cName: 'observerDOM',
        tips: '监听元素是否出现在可视区域，可用做滚动加载',
      }, {
        name: 'vuex封装',
        type: 'util',
        cName: 'vuex',
        tips: 'vuex封装，只需要配置state就阔以了！懒人必备(比如我)',
      }, {
        name: '不错的链接',
        type: 'util',
        cName: 'links',
        tips: '不错的链接',
      }]
    }]
  },
  echarts: {}
}

export default pageConfig