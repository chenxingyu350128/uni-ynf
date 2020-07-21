require('common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/family/alarmDetails"],{"2a62":function(t,e,a){"use strict";a.r(e);var i=a("a797"),n=a("cd7b");for(var s in n)"default"!==s&&function(t){a.d(e,t,(function(){return n[t]}))}(s);a("3fca");var c,r=a("f0c5"),o=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,"e93b66de",null,!1,i["a"],c);e["default"]=o.exports},"3fca":function(t,e,a){"use strict";var i=a("f817"),n=a.n(i);n.a},a797:function(t,e,a){"use strict";var i,n=function(){var t=this,e=t.$createElement;t._self._c},s=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return i}))},cd7b:function(t,e,a){"use strict";a.r(e);var i=a("fc83"),n=a.n(i);for(var s in i)"default"!==s&&function(t){a.d(e,t,(function(){return i[t]}))}(s);e["default"]=n.a},d160:function(t,e,a){"use strict";(function(t){a("7736");i(a("66fd"));var e=i(a("2a62"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},f817:function(t,e,a){},fc83:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{showMap:!1,cHeight:"",cWidth:"",pixelRatio:1,alarmId:"",memberId:"",type:"",radius:"",time:"",content:"",suggest:"",lat:"",lon:"",address:"",watchAddress:"",watchLat:"",watchLon:"",tb2:[["类别","收缩压","舒张压"],["理想血压","<120","<80"],["正常高值","120~139","80~89"],["高血压","<140","<90"],["1级高血压","140~159","90~99"],["2级高血压","160~179","100~109"],["3级高血压","<180","<110"],["单纯收缩期高血压","<140","<90"]],tb3:[["正常血糖","<6.1","<7.8"],["空腹血糖受损","6.1~7.0","<7.8"],["糖耐量减低","<7.0","7.8~11.1"],["糖尿病",">7.0",">11.1"]],HR_Reference:"正常人安静状态下每分钟心跳次数，一般为60~100次/分钟，可因年龄、性别活其他生理因素产生个体差异。年龄越小，心率越快，老年人心跳比年轻人慢，女性的心率比同龄男性快，这些都是正常现象。"}},computed:{markers:function(){return this.lon&&this.lat?[{id:"alarmMap",longitude:this.watchLon||this.lon,latitude:this.watchLat||this.lat,iconPath:"/static/img/map/currentPosition.png"}]:[]},finalLon:function(){return this.watchLon||this.lon},finalLat:function(){return this.watchLat||this.lat},typeName:function(){return 1==this.type?"心率":2==this.type?"血压":3==this.type?"血糖":void 0},symptoms:function(){return 1==this.type?"胸闷气短、心情烦躁、心肺功能差、高热、贫血、甲亢、出血、疼痛、缺氧、心衰和心肌病等疾病。":2==this.type?"头晕、头痛、颈项板紧、疲劳、心悸等，也可出现视力模糊、鼻出血等较重症状，典型的高血压头痛在血压下降后即可消失。":3==this.type?"多饮、多尿、多食、消瘦、皮肤瘙痒。血糖升高较快可视力模糊。":void 0},sessionId:function(){return this.$store.state.app.sessionId}},onLoad:function(t){this.alarmId=t.alarmId,this.memberId=t.memberId,this.type=parseInt(t.type)},onShow:function(){var e=this,a=t.createSelectorQuery().in(this).select(".page");a.fields({size:!0,scrollOffset:!0},(function(t){console.log(t),e.cHeight=t.height,e.cWidth=t.width})).exec(),this.init()},methods:{init:function(){var t,e=this,a={sessionId:this.sessionId,memberId:this.memberId,type:this.type,alarId:this.alarmId};switch(this.type){case 0:case 1:case 2:case 3:t="/mobile/healthy/getAlarmDetails";break;case 4:t="/mobile/healthy/getRailDetails";break;case 5:t="/mobile/healthy/getSosDetails";break}this.$http.get(t,a).then((function(t){if(t.data.success){var a=t.data.obj;for(var i in a)e[i]=a[i];e.showMap=e.type>3}}))}}};e.default=a}).call(this,a("543d")["default"])}},[["d160","common/runtime","common/vendor"]]]);