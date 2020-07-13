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
  Vue.prototype.$http.get('/mobile/user/getMemberList', { sessionId: store.state.app.sessionId })
    .then(res => {
      if (res.data.success) {
        console.log(store.state.app)
        store.commit('SET_SINGLE_ITEM', ['memberList', res.data.obj])
        console.log(store.state.app)
      }
    })
}
uni.$on('getMemberList', () => {
  getMemberList()
})
const app = new Vue({
  store,
  ...App
})
app.$mount()
