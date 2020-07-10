import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
Vue.use(uView);

import http from '@/utils/flyIO.js'

Vue.prototype.$http = http.fly

import store from 'store.js'

Vue.config.productionTip = false

App.mpType = 'app'

// flyIO拦截器中无法处理路由跳转， 通过uni.$emit/$on处理
uni.$on('routerToLogin', () => {
  uni.redirectTo({
      url: '/pages/public/firstCome/firstCome'
  })
})

const app = new Vue({
  store,
  ...App
})
app.$mount()
