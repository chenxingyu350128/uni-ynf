require('common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/family/location"],{1496:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{cHeight:"",cWidth:"",pixelRatio:1,longitude:0,latitude:0,showMenu:!1,battery:0,actionList:[{text:"历史记录",color:"#00aaef"},{text:"安全围栏",color:"#00aaef"}]}},computed:{markers:function(){return this.longitude&&this.latitude?[{id:"watchPosition",longitude:this.longitude,latitude:this.latitude,iconPath:"./static/map/currentPosition.png"}]:[]},locationPoint:function(){return this.$store.state.app.locationPoint},watchId:function(){return this.$store.state.member.watchId},memberId:function(){return this.$store.state.member.memberId},sessionId:function(){return this.$store.state.app.sessionId}},onShow:function(){var e=this,n=t.createSelectorQuery().in(this).select(".page");n.fields({size:!0,scrollOffset:!0},(function(t){console.log(t),e.cHeight=t.height,e.cWidth=t.width})).exec(),this.getWatchPosition()},methods:{getWatchPosition:function(){var t=this;if(this.watchId){var e={sessionId:this.sessionId,memberId:this.memberId};this.$http.get("/mobile/user/getCurrentLocus",e).then((function(e){e.data.success&&(t.longitude=parseFloat(e.data.obj.lon),t.latitude=parseFloat(e.data.obj.lat),t.getBettary())}))}},getBettary:function(){var t=this,e={sessionId:this.sessionId,watchId:this.watchId,memberId:this.memberId};this.$http.get("/mobile/healthy/getWatchBattery",e).then((function(e){e.data.success&&(t.battery=e.data.obj)}))},actionClick:function(e){t.navigateTo({url:e?"./electricFence":"./locationHistory"})},openMenu:function(){this.showMenu=!0}}};e.default=n}).call(this,n("543d")["default"])},"7a2d":function(t,e,n){},"8a04":function(t,e,n){"use strict";var i=n("7a2d"),o=n.n(i);o.a},bf63:function(t,e,n){"use strict";n.r(e);var i=n("c2d9"),o=n("d806");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("8a04");var a,c=n("f0c5"),s=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,"7c2d8250",null,!1,i["a"],a);e["default"]=s.exports},c2d9:function(t,e,n){"use strict";var i={uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"250b"))},uniBattery:function(){return n.e("components/uni-battery/uni-battery").then(n.bind(null,"6493"))},uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"513c"))},uActionSheet:function(){return n.e("uview-ui/components/u-action-sheet/u-action-sheet").then(n.bind(null,"fe81"))}},o=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}))},d806:function(t,e,n){"use strict";n.r(e);var i=n("1496"),o=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=o.a},f488:function(t,e,n){"use strict";(function(t){n("7736");i(n("66fd"));var e=i(n("bf63"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["f488","common/runtime","common/vendor"]]]);