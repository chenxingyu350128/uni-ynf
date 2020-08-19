require('common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/family/locationHistoryMap"],{1695:function(t,e,n){"use strict";(function(t){n("7736");i(n("66fd"));var e=i(n("e165"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},8609:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{day:"",longitude:"",latitude:"",items:[],markers:[],polyline:[],includePoints:[],movableMarker:null,timer:null}},computed:{startMarker:function(){var t=this.markers,e=t.length;return e?{id:1225,latitude:t[0].latitude,longitude:t[0].longitude,iconPath:"./static/map/map_marker_start.png",width:20,height:30}:""},endMarker:function(){var t=this.markers,e=t.length;return e?{id:1226,latitude:t[e-1].latitude,longitude:t[e-1].longitude,iconPath:"./static/map/map_marker_end.png",width:20,height:30}:""},SE_markers:function(){return[this.startMarker,this.endMarker]},memberId:function(){return this.$store.state.member.memberId},sessionId:function(){return this.$store.state.app.sessionId}},onLoad:function(t){t.day&&(this.day=t.day)},onShow:function(){this.init()},methods:{translateMarker:function(){for(var e=t.createMapContext("historyMap",this),n=this.polyline[0].points,i=n.length,a=0;a<i-1;a++)e.translateMarker({markerId:1225,destination:n[a+1],duration:2500})},init:function(){var t=this,e={memberId:this.memberId,sessionId:this.sessionId,day:this.day};this.$http.get("/mobile/user/getLocationHistory",e).then((function(e){if(e.data.success){t.items=e.data.obj,t.longitude=t.items[0].lon,t.latitude=t.items[0].lat;var n=[],i=[],a=[];t.items.forEach((function(t,e){n[e]={latitude:t.lat,longitude:t.lon},a.push([t.lat,t.lon]),i.push({id:"marker_m"+e,latitude:t.lat,longitude:t.lon,iconPath:"./static/map/marker.png"})})),t.polyline=[{points:n,color:"#d33682",arrowLine:!0,width:6}],t.markers=i,t.includePoints=a,t.$nextTick((function(){t.translateMarker()}),2e3)}}))}}};e.default=n}).call(this,n("543d")["default"])},dc50:function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}))},e165:function(t,e,n){"use strict";n.r(e);var i=n("dc50"),a=n("f768");for(var r in a)"default"!==r&&function(t){n.d(e,t,(function(){return a[t]}))}(r);var o,u=n("f0c5"),s=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);e["default"]=s.exports},f768:function(t,e,n){"use strict";n.r(e);var i=n("8609"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a}},[["1695","common/runtime","common/vendor"]]]);