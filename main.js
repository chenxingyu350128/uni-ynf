import Vue from 'vue'
import App from './App'
import _ from 'lodash'
// import tabbar from '@/components/tabbar.vue'
// import uniRow from '@/components/uni-row/uni-row.vue'
// import uniCol from '@/components/uni-col/uni-col.vue'
// import './node_modules/@mdi/font/css/materialdesignicons.css'
import dateTimeFormat from '@/utils/dateFormat.js'
import http from '@/utils/flyIO.js'
import store from 'store.js'


// Vue.use(VueAMap);
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$dateStr = dateTimeFormat
// console.log(http)
Vue.prototype.$http = http.fly
Vue.prototype._ = _

const app = new Vue({
	store,
	...App
})
app.$mount()
// Vue.component('tab-bar',tabbar)
// Vue.component('uni-row',uniRow)
// Vue.component('uni-col',uniCol)
// Vue.component('uni-header',uniHeader)