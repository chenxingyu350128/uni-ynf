import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
// import {debounce, throttle} from '@/utils/myLodash'

Vue.use(uView);
// check git
import http from '@/utils/flyIO.js'

// Vue.prototype.$debounce = debounce
// Vue.prototype.$throttle = throttle
// console.log(debounce, throttle)
Vue.prototype.$http = http.fly

import store from 'store.js'

Vue.filter("price", function (val) {
  return "￥" + Number(val).toFixed(2);
});
Vue.config.productionTip = false

App.mpType = 'app'

// flyIO拦截器中无法处理路由跳转， 通过uni.$emit/$on处理
uni.$on('routerToLogin', () => {
  uni.redirectTo({
      url: '/pages/public/firstCome/firstCome'
  })
})

uni.$on('scanCode', (e) => {
  console.log(e)
  Vue.prototype.scanType = e
  uni.scanCode({
    scanType: [e?'qrCode':'barCode'], // 添加设备条形码， 添加好友二维码
    success: res => {
      console.log(res)
      dealScanResult(res.result)
    }
  })
})

function dealScanResult (e) {
  const data = Vue.prototype.scanType ? 
    { // 添加好友
      sessionId: store.state.app.sessionId,
      memberNum: e
    } 
    : 
    { // 添加设备
      memberId: store.state.member.memberId,
      sessionId: store.state.app.sessionId,
      watchImei: e
    }
  
  const url = Vue.prototype.scanType ? '/mobile/healthy/getEwmMember' : '/mobile/healthy/bindWatch'
  
  Vue.prototype.$http.post(url, data)
    .then(res => {
      if (res.data.success) {
        if (Vue.prototype.scanType) {
          addMember(res.data.obj.memberId)
        } else { // 添加设备
          getMemberList()
          getMember()
          uni.showToast({
            title: '腕表绑定成功'
          })
        }
      }
    })
}

function addMember(memberId){
  const data = {
    sessionId: store.state.app.sessionId,
    memberId
  }
  Vue.prototype.$http.post('/mobile/healthy/addEwmMember', data)
    .then(res=>{
      if(res.data.success){
        getMemberList()
        uni.showToast({
          title: '添加好友成功'
        })
      }
    })
}
function getMemberList () {
  if (!store.state.app.sessionId) {
    return false
  }
    
  Vue.prototype.$http.get('/mobile/user/getMemberList', { sessionId: store.state.app.sessionId })
    .then(res => {
      if (res.data.success) {
        console.log(store.state.app)
        store.commit('SET_SINGLE_ITEM', ['memberList', res.data.obj])
        console.log(store.state.app)
      }
    })
}
function getUser () {
  Vue.prototype.$http.get('/mobile/user/getUser', { sessionId: store.state.app.sessionId })
    .then(res => {
      if (res.data.success) {
        const obj = res.data.obj
        store.commit('SET_EACH_ITEM', obj)
      }
    })        
}
function getMember () {
  const data = {
    memberId: store.state.member.memberId,
    sessionId: store.state.app.sessionId
  }
  Vue.prototype.$http.get('/mobile/user/getMember', data)
    .then(res => {
      if (res.data.success) {
        const obj = res.data.obj
        store.commit('SET_EACH_MEMBER_ITEM', obj)
      }
    })        
}
uni.$on('getMemberList', () => {
  getMemberList()
})
uni.$on('getMember', () => {
  getMember()
})
uni.$on('getUser', () => {
  getUser()
})
uni.$on('MEMBER_NOT_EXIST', () => {
  uni.switchTab({
    url: '/pages/tabbar/family/family?memberNotFound=true'
  })
})
const app = new Vue({
  store,
  ...App
})
app.$mount()
