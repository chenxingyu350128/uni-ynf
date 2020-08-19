require('common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/family/sleepSetting"],{"341a":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{style:{"border-radius":"unset",background:"#00aaef"},params:{year:!1,month:!1,day:!1,hour:!0,minute:!0,second:!1},activedTime:"",showPicker:!1,timeIndex:"",switch0:!1,switch1:!1,asleep0:"20:00",asleep1:"12:00",awake0:"09:00",awake1:"15:00"}},computed:{memberId:{get:function(){return this.$store.state.member.memberId},set:function(){}},watchId:{get:function(){return this.$store.state.member.watchId},set:function(){}},defaultValue:function(){return this.$u.timeFormat(new Date,"yyyy-mm-dd")+" "+this.activedTime},sessionId:function(){return this.$store.state.app.sessionId}},onShow:function(){this.init()},methods:{openPicker:function(e,t){this.activedTime=e,this.timeIndex=t,this.showPicker=!0},timeConfirm:function(e){console.log(e);var t=e.hour+":"+e.minute,n=["asleep0","awake0","asleep1","awake1"];this[n[this.timeIndex]]=t},sleepSetting:function(){var t={type:1,startTime:this.asleep0,endTime:this.awake0,sessionId:this.sessionId,memberId:this.memberId},n={type:2,startTime:this.asleep1,endTime:this.awake1,sessionId:this.sessionId,memberId:this.memberId};this.$http.post("/mobile/healthy/setSleepTimeQuantum",t),this.$http.post("/mobile/healthy/setSleepTimeQuantum",n),setTimeout((function(){e.navigateBack()}),500)},switchChange:function(e){var t={swich:Number(this["switch"+e]),type:e+1,memberId:this.memberId,sessionId:this.sessionId};this.$http.post("/mobile/healthy/updateSleepTimeQuantum",t)},init:function(){var e=this,t={sessionId:this.sessionId,memberId:this.memberId};this.$http.get("/mobile/healthy/getSleepTimeQuantum",t).then((function(t){if(t.data.success){var n=t.data.obj;n.length&&n.forEach((function(t,n){1===t.type&&(e.switch0=Boolean(t.swich),e.asleep0=t.startTime,e.awake0=t.endTime),2===t.type&&(e.switch1=Boolean(t.swich),e.asleep1=t.startTime,e.awake1=t.endTime)}))}}))}}};t.default=n}).call(this,n("543d")["default"])},"6eb4":function(e,t,n){},"842f":function(e,t,n){"use strict";var i=n("6eb4"),s=n.n(i);s.a},"8d36":function(e,t,n){"use strict";n.r(t);var i=n("341a"),s=n.n(i);for(var u in i)"default"!==u&&function(e){n.d(t,e,(function(){return i[e]}))}(u);t["default"]=s.a},b349:function(e,t,n){"use strict";var i={uCellGroup:function(){return n.e("uview-ui/components/u-cell-group/u-cell-group").then(n.bind(null,"46fc"))},uCellItem:function(){return n.e("uview-ui/components/u-cell-item/u-cell-item").then(n.bind(null,"59b3"))},uSwitch:function(){return n.e("uview-ui/components/u-switch/u-switch").then(n.bind(null,"858a"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"250b"))},uPicker:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-picker/u-picker")]).then(n.bind(null,"c041"))}},s=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return i}))},e683:function(e,t,n){"use strict";n.r(t);var i=n("b349"),s=n("8d36");for(var u in s)"default"!==u&&function(e){n.d(t,e,(function(){return s[e]}))}(u);n("842f");var o,a=n("f0c5"),r=Object(a["a"])(s["default"],i["b"],i["c"],!1,null,"1cc4d07e",null,!1,i["a"],o);t["default"]=r.exports},e743:function(e,t,n){"use strict";(function(e){n("7736");i(n("66fd"));var t=i(n("e683"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["e743","common/runtime","common/vendor"]]]);