require('common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/family/watchInfo"],{2986:function(e,t,n){"use strict";var i={uCellGroup:function(){return n.e("uview-ui/components/u-cell-group/u-cell-group").then(n.bind(null,"46fc"))},uCellItem:function(){return n.e("uview-ui/components/u-cell-item/u-cell-item").then(n.bind(null,"59b3"))},uSwitch:function(){return n.e("uview-ui/components/u-switch/u-switch").then(n.bind(null,"858a"))}},u=function(){var e=this,t=e.$createElement;e._self._c},s=[];n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return i}))},4809:function(e,t,n){"use strict";(function(e){n("7736");i(n("66fd"));var t=i(n("7ef7"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"7ef7":function(e,t,n){"use strict";n.r(t);var i=n("2986"),u=n("aa91");for(var s in u)"default"!==s&&function(e){n.d(t,e,(function(){return u[e]}))}(s);var o,r=n("f0c5"),c=Object(r["a"])(u["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);t["default"]=c.exports},aa91:function(e,t,n){"use strict";n.r(t);var i=n("d6b9"),u=n.n(i);for(var s in i)"default"!==s&&function(e){n.d(t,e,(function(){return i[e]}))}(s);t["default"]=u.a},d6b9:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{phone:"",seriesName:"",watchImei:"",openTime:"",checked:!1}},computed:{sessionId:function(){return this.$store.state.app.sessionId},memberId:function(){return this.$store.state.member.memberId}},onShow:function(){this.init(),this.getState()},methods:{getState:function(){var e=this,t={sessionId:this.sessionId,memberId:this.memberId};this.$http.get("/mobile/user/getWatchRailRemind",t).then((function(t){t.data.success&&(e.checked=Boolean(t.data.obj.state))}))},init:function(){var e=this,t={sessionId:this.sessionId,memberId:this.memberId};this.$http.get("/mobile/healthy/getWatchDetail",t).then((function(t){if(console.log(t),t.data.success){var n=t.data.obj;for(var i in n)e[i]=n[i]}}))},updateRemind:function(){var e={sessionId:this.sessionId,memberId:this.memberId,state:Number(this.checked)};this.$http.post("mobile/user/updateRemind",e)}}};t.default=i}},[["4809","common/runtime","common/vendor"]]]);