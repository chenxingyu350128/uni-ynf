import Vue from 'vue'
import App from './App'
import tabbar from '@/components/tabbar.vue'
import uniRow from '@/components/uni-row/uni-row.vue'
import uniCol from '@/components/uni-col/uni-col.vue'
// import './node_modules/@mdi/font/css/materialdesignicons.css'
Vue.config.productionTip = false
import dateTimeFormat from '@/static/js/dateFormat.js'
import http from 'utils/luch-request/index.js'
import store from 'store.js'
App.mpType = 'app'
Vue.prototype.$dateStr = dateTimeFormat
Vue.prototype.$http = http.http

const app = new Vue({
	store,
	...App
})
app.$mount()
Vue.component('tab-bar',tabbar)
Vue.component('uni-row',uniRow)
Vue.component('uni-col',uniCol)