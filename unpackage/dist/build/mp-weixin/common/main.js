(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"3c0e":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=n},"6ffb":function(e,t,o){"use strict";o.r(t);var n=o("718e");for(var a in n)"default"!==a&&function(e){o.d(t,e,(function(){return n[e]}))}(a);o("70ef");var s,r,u,c,f=o("f0c5"),i=Object(f["a"])(n["default"],s,r,!1,null,null,null,!1,u,c);t["default"]=i.exports},"70ef":function(e,t,o){"use strict";var n=o("ee3f"),a=o.n(n);a.a},"718e":function(e,t,o){"use strict";o.r(t);var n=o("3c0e"),a=o.n(n);for(var s in n)"default"!==s&&function(e){o.d(t,e,(function(){return n[e]}))}(s);t["default"]=a.a},aec2:function(e,t,o){"use strict";(function(e,t){o("7736");var n=c(o("66fd")),a=c(o("6ffb")),s=c(o("5074")),r=c(o("e0fe")),u=c(o("58ec"));function c(e){return e&&e.__esModule?e:{default:e}}function f(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?f(Object(o),!0).forEach((function(t){d(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):f(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function d(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function l(t){var o=n.default.prototype.scanType?{sessionId:u.default.state.app.sessionId,memberNum:t}:{memberId:u.default.state.member.memberId,sessionId:u.default.state.app.sessionId,watchImei:t},a=n.default.prototype.scanType?"/mobile/healthy/getEwmMember":"/mobile/healthy/bindWatch";n.default.prototype.$http.post(a,o).then((function(t){t.data.success&&(n.default.prototype.scanType?p(t.data.obj.memberId):(m(),e.showToast({title:"腕表绑定成功"})))}))}function p(t){var o={sessionId:u.default.state.app.sessionId,memberId:t};n.default.prototype.$http.post("/mobile/healthy/addEwmMember",o).then((function(t){t.data.success&&(m(),e.showToast({title:"添加好友成功"}))}))}function m(){n.default.prototype.$http.get("/mobile/user/getMemberList",{sessionId:u.default.state.app.sessionId}).then((function(e){e.data.success&&(console.log(u.default.state.app),u.default.commit("SET_SINGLE_ITEM",["memberList",e.data.obj]),console.log(u.default.state.app))}))}function b(){n.default.prototype.$http.get("/mobile/user/getUser",{sessionId:u.default.state.app.sessionId}).then((function(e){if(e.data.success){var t=e.data.obj;u.default.commit("SET_EACH_ITEM",t)}}))}function y(){var e={memberId:u.default.state.member.memberId,sessionId:u.default.state.app.sessionId};n.default.prototype.$http.get("/mobile/user/getMember",e).then((function(e){if(e.data.success){var t=e.data.obj;u.default.commit("SET_EACH_MEMBER_ITEM",t)}}))}n.default.use(s.default),n.default.prototype.$http=r.default.fly,n.default.prototype.sessionId=u.default.state.app.sessionId,n.default.prototype.userId=u.default.state.app.userId,n.default.prototype.memberId=u.default.state.member.memberId,n.default.config.productionTip=!1,a.default.mpType="app",e.$on("routerToLogin",(function(){e.redirectTo({url:"/pages/public/firstCome/firstCome"})})),e.$on("scanCode",(function(t){console.log(t),n.default.prototype.scanType=t,e.scanCode({scanType:[t?"qrCode":"barCode"],success:function(e){console.log(e),l(e.result)}})})),e.$on("getMemberList",(function(){m()})),e.$on("getMember",(function(){y()})),e.$on("getUser",(function(){b()}));var h=new n.default(i({store:u.default},a.default));t(h).$mount()}).call(this,o("543d")["default"],o("543d")["createApp"])},ee3f:function(e,t,o){}},[["aec2","common/runtime","common/vendor"]]]);