/*
 * @Author: 汪锦
 * @Date: 2020-06-19 11:32:06
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-08-28 11:07:29
 * @Description: 通过原生fetch封装请求
 */
import router from '@/router'
import { Message } from 'view-design'
const qs = require('qs')
const requestAPI = (url, options, showInfo = false) => {
  return fetch(url, {
    body: options.data, // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      'content-type': 'application/json',
      token: localStorage.getItem('token')
    },
    method: options.method || 'GET', // *GET, POST, PUT, DELETE, etc.
    // credentials: 'same-origin', // include, same-origin, *omit
    // mode: 'no-cors', // no-cors, cors, *same-origin
    // redirect: 'follow', // manual, *follow, error
    // referrer: 'no-referrer', // *client, no-referrer
    credentials: 'include',//为了在当前域名内自动发送 cookie ， 必须提供这个选项
    ...options
  }).then(response => {
    console.log(response);
    if (response.status === 304) {
      Message['error']({
        content: '登录失效',
        duration: 2.2,
        background: true
      })
      router.push('/')
      return Promise.reject('登录失效')
    }
    return response.json().then(res => {
      if (res.status)
        if (showInfo) {
          Message[res.status ? 'success' : 'error']({
            content: res.message,
            duration: 2.2,
            background: true
          })
        }
      return res
    })
  })
}

function $get(url, params, showInfo) {
  url = url.split('?')[0] + '?' + qs.stringify(params)
  return requestAPI(url, {
    method: 'GET'
  }, showInfo)
}
function $post(url, params, showInfo) {
  return requestAPI(url, {
    body: JSON.stringify(params),
    method: 'POST',
  }, showInfo)
}

export default {
  install(Vue) {
    Vue.prototype.$get = $get
    Vue.prototype.$post = $post
  }
}