import Vue from 'vue'
import App from './App'
import VueAMap,{ lazyAMapApiLoaderInstance } from "vue-amap";
import _ from 'lodash'
import tabbar from '@/components/tabbar.vue'
// import uniRow from '@/components/uni-row/uni-row.vue'
// import uniCol from '@/components/uni-col/uni-col.vue'
// import './node_modules/@mdi/font/css/materialdesignicons.css'
Vue.config.productionTip = false
import dateTimeFormat from '@/static/js/dateFormat.js'
import http from '@/common/fly.js'
import store from 'store.js'

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: "71a4fe9e16a9e93d6653175b5f6693c8",
  plugin: [
    "AMap.Geolocation",
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.Geocoder"
  ],
  v: "1.4.4"
});
lazyAMapApiLoaderInstance.load().then(()=>{
  localStorage.removeItem('_AMap_raster');
})
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
Vue.component('tab-bar',tabbar)
// Vue.component('uni-row',uniRow)
// Vue.component('uni-col',uniCol)
// Vue.component('uni-header',uniHeader)