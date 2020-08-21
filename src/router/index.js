import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: '/',
    component: () => import('@/pages/login')
  }, {
    path: '/myC',
    name: 'myC',
    component: () => import('@/pages/myC'),
  }]
})

export default router