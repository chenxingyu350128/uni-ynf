require('common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/family/HrSetting"],{"04cf":function(t,e,n){"use strict";n.r(e);var i=n("4988"),a=n("ce27");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);var u,r=n("f0c5"),o=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],u);e["default"]=o.exports},"218a":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{style:{"border-radius":"unset",background:"#00aaef"},hrMin:55,hrMax:120,heartRate:600}},computed:{memberId:{get:function(){return this.$store.state.member.memberId},set:function(){}},watchId:{get:function(){return this.$store.state.member.watchId},set:function(){}},sessionId:function(){return this.$store.state.app.sessionId}},onShow:function(){this.init(),this.getRate()},methods:{hrSetting:function(){var e=this,n={hrMin:this.hrMin,hrMax:this.hrMax,heartRate:this.heartRate,watchId:this.watchId,memberId:this.memberId,sessionId:this.sessionId};this.$http.post("mobile/healthy/setWatch",n).then((function(n){n.data.success&&(e.$u.toast(n.data.msg),setTimeout((function(){t.navigateBack()}),500))}))},getRate:function(){var t=this,e={sessionId:this.sessionId,memberId:this.memberId};this.$http.get("/mobile/healthy/getRate",e).then((function(e){if(e.data.success){var n=e.data.obj;n&&(t.heartRate=n.heartRate)}}))},init:function(){var t=this,e={sessionId:this.sessionId,memberId:this.memberId};this.$http.get("/mobile/healthy/getHealthyRange",e).then((function(e){if(e.data.success){var n=e.data.obj;for(var i in n)t[i]=n[i]}}))}}};e.default=n}).call(this,n("543d")["default"])},4988:function(t,e,n){"use strict";var i={uField:function(){return n.e("uview-ui/components/u-field/u-field").then(n.bind(null,"ecd7"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"250b"))}},a=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}))},ce27:function(t,e,n){"use strict";n.r(e);var i=n("218a"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},feca:function(t,e,n){"use strict";(function(t){n("7736");i(n("66fd"));var e=i(n("04cf"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["feca","common/runtime","common/vendor"]]]);