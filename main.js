import Vue from 'vue'
import App from './App'
import tabbar from './components/tabbar.vue'
import './node_modules/@mdi/font/css/materialdesignicons.css'
Vue.config.productionTip = false
import store from './store.js'
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
Vue.component('tab-bar',tabbar)