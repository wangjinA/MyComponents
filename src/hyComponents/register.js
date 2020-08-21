/*
 * @Author: 汪锦
 * @Date: 2020-06-18 09:53:19
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-06-19 16:07:17
 * @Description: 注册全局组件
 */
import Vue from 'vue'

const getPathName = path => {
  return path.replace(/(.*\/)*([^.]+).*/ig, "$2")
}

const componentsContext = require.context('@/hyComponents', true, /index\.js$/)
const componentsDemoContext = require.context('@/hyComponentsDemo', true, /\.vue$/)

componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  const c = componentConfig.default || componentConfig
  Vue.component(c.name, c)
})

componentsDemoContext.keys().forEach(component => {
  const componentConfig = componentsDemoContext(component)
  const c = componentConfig.default || componentConfig
  Vue.component(`${getPathName(component)}-Demo`, c)
})

import codeView from '@/components/codeView'
import demoPage from '@/components/demoPage'
Vue.component(codeView.name, codeView)
Vue.component(demoPage.name, demoPage)