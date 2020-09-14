/*
 * @Author: 汪锦
 * @Date: 2020-06-17 17:22:19
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-09-14 16:05:15
 * @Description: 文件描述
 */
import Vue from 'vue'
import App from './App.vue'
import './style/main.less'
Vue.config.productionTip = false

import './hyComponents/register.js'

import store from './store'

import router from './router'

import './bus.js'

import axios from './axios'
Vue.use(axios)

// 代码高亮
import 'highlight.js/styles/github.css';
import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

// 初始化session和vue的绑定。 （刷新）
import { initSessionJoinVue, sessionJoinVue } from './utils'
Vue.prototype.sessionJoinVue = sessionJoinVue
initSessionJoinVue(['userInfo'])

// echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
window.$echarts = echarts


import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
// import vueHighlightJS from 'vue-highlightjs'
// import VueRouter from 'vue-router'
Vue.use(ViewUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
