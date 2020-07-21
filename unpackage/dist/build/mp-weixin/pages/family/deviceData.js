require('common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/family/deviceData"],{1253:function(t,e,a){"use strict";var i={uNavbar:function(){return a.e("uview-ui/components/u-navbar/u-navbar").then(a.bind(null,"2f05"))},uTabsSwiper:function(){return Promise.all([a.e("common/vendor"),a.e("uview-ui/components/u-tabs-swiper/u-tabs-swiper")]).then(a.bind(null,"7e10"))},uIcon:function(){return a.e("uview-ui/components/u-icon/u-icon").then(a.bind(null,"513c"))},uGrid:function(){return a.e("uview-ui/components/u-grid/u-grid").then(a.bind(null,"8a6c"))},uGridItem:function(){return a.e("uview-ui/components/u-grid-item/u-grid-item").then(a.bind(null,"ff03"))},uPicker:function(){return Promise.all([a.e("common/vendor"),a.e("uview-ui/components/u-picker/u-picker")]).then(a.bind(null,"c041"))}},n=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.showDatePicker=!0})},r=[];a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return i}))},"206b":function(t,e,a){"use strict";a.r(e);var i=a("1253"),n=a("f171");for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a("2685");var o,s=a("f0c5"),u=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"940ae834",null,!1,i["a"],o);e["default"]=u.exports},2685:function(t,e,a){"use strict";var i=a("3516"),n=a.n(i);n.a},3516:function(t,e,a){},"41fc":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("3fd4"));function n(t){return t&&t.__esModule?t:{default:t}}function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var o=null,s={data:function(){var t;return t={tabList:[{name:"运动"},{name:"睡眠"},{name:"心率"},{name:"血压"},{name:"血糖"}],typeTitles:["步数","睡眠","心率","血压","血糖"],current:0,swiperCurrent:0,datePickerValue:"",monthPickerValue:"",showDatePicker:!1,step:0,bpm:0,duration:0,deviceTime:"",count:0,alert:0,gi:0,sbp:0,dbp:100,calorie:0,distance:0,minute:0,heartDuration:0,quietDuration:0},r(t,"alert",0),r(t,"maxGi",0),r(t,"minGi",0),r(t,"maxDbp",0),r(t,"maxSbp",0),r(t,"max",0),r(t,"min",0),r(t,"tab",0),r(t,"stepAim",5e3),r(t,"cWidth",""),r(t,"cHeight",""),r(t,"pixelRatio",1),r(t,"serverData",""),r(t,"chartCategories",[]),r(t,"dbpMax",""),r(t,"dbpMin",""),r(t,"sbpMin",""),r(t,"sbpMax",""),r(t,"hrMin",""),r(t,"hrMax",""),r(t,"gluMin",""),r(t,"gluMax",""),t},computed:{memberId:function(){return this.$store.state.member.memberId},sessionId:function(){return this.$store.state.app.sessionId},tabBG:function(){var t=["#00aaef","#c7a7dc","#fd7b7b","#fa6e31","#f1ce7e"];return t[this.current]},sleepQuality:function(){return this.duration>8?"优":this.duration>=6&&this.duration<=7?"良好":"一般"},background:function(){return{backgroundColor:this.tabBG}},dateStr:function(){return this.datePickerValue||this.$u.timeFormat(new Date,"yyyy-mm-dd")},today:function(){return this.$u.timeFormat(new Date,"yyyy-mm-dd")},monthStr:function(){return this.monthPickerValue||this.$u.timeFormat(new Date,"yyyy-mm")}},onLoad:function(){this},onShow:function(){this.getRange(),this.getStepAim(),this.getData()},methods:{measure:function(){this.current>2?t.navigateTo({url:"./addMeasureData?type=".concat(this.current,"&BG=").concat(this.tabBG,"&date=").concat(this.dateStr)}):this.$u.toast("小程序功能未开放，可前往app使用该功能")},getRange:function(){var t=this,e={memberId:this.memberId,sessionId:this.sessionId};this.$http.get("/mobile/healthy/getHealthyRange",e).then((function(e){if(e.data.success){var a=e.data.obj;for(var i in a)t[i]=a[i]}}))},getStepAim:function(){var t={memberId:this.memberId,sessionId:this.sessionId};this.$http.post("mobile/healthy/getGoalStep",t).then((function(t){t.data.success}))},toStepAim:function(){t.navigateTo({url:"./stepAim?aim="+this.stepAim})},toStepRank:function(){t.navigateTo({url:"./stepRank?date="+this.dateStr})},typeChange:function(t){console.log(t),this.swiperCurrent=t,this.tab=0},timeScopeChange:function(t){if(t===this.tab)return!1;this.tab=t,this.getData()},getData:function(){this.getDataBy(),this.current<2?this.getDataTo():this.getCurrent()},getDataTo:function(){var t=this,e={memberId:this.memberId,type:this.tab+1,sessionId:this.sessionId,data:this.dateStr},a=["/mobile/healthy/getStepToDay","/mobile/healthy/getSleepToDay"];this.$http.get(a[this.current],e).then((function(e){if(e.data.success){var a=e.data.obj;for(var i in a)t[i]=a[i]}}))},getCurrent:function(){var t=this,e={sessionId:this.sessionId,memberId:this.memberId};4===this.current&&(e.data=this.dateStr);var a=["","","/mobile/healthy/getCurrentHeartRate","/mobile/healthy/getBloodPressureToDay","/mobile/healthy/getBloodSugarToDay"];this.$http.get(a[this.current],e).then((function(e){if(e.data.success){var a=e.data.obj;for(var i in a)t[i]=a[i]}}))},totalData:function(){t.navigateTo({url:"./totalData?type=".concat(this.current,"&tabBG=").concat(this.tabBG)})},getDataBy:function(){var t=this,e={memberId:this.memberId,sessionId:this.sessionId};2===this.tab?e.month=this.monthStr:e.day=this.dateStr;var a=[["/mobile/healthy/getStepByDay","/mobile/healthy/getStepByWeek","/mobile/healthy/getStepByMonthNew"],["/mobile/healthy/getSleepByDay","/mobile/healthy/getSleepByWeek","/mobile/healthy/getSleepByMonthNew"],["/mobile/healthy/getHeartRateByDay","/mobile/healthy/getHeartRateByWeek","/mobile/healthy/getHeartRateByMonth"],["/mobile/healthy/getBloodPressureByDay","/mobile/healthy/getBloodPressureByWeek","/mobile/healthy/getBloodPressureByMonth"],["/mobile/healthy/getBloodSugarByDay","/mobile/healthy/getBloodSugarByWeek","/mobile/healthy/getBloodSugarByMonth"]];this.$http.get(a[this.current][this.tab],e).then((function(e){if(e.data.success){var a=e.data.obj;for(var i in a)"deviceTime"!==i&&(t[i]=a[i]);var n=t.current>1?a.data:a,r=[],o=[],s=[],u=[];if(0===t.current){var h=["hour","day","day"];n.forEach((function(e){r.push(e.step);var a=e[h[t.tab]];if(1===t.tab){var i=a.split("-");i.shift(),a=i.join("-")}s.push(a)})),u.push({name:"运动步数",data:r})}if(1===t.current){var c=["hour","day","day"];n.forEach((function(e){r.push(e.heartDuration),o.push(e.quietDuration);var a=e[c[t.tab]];if(1===t.tab){var i=a.split("-");i.shift(),a=i.join("-")}s.push(a)})),u.push({name:"深睡眠",data:r}),u.push({name:"浅睡眠",data:o})}if(2===t.current){var l=["hour","day","day"];n.forEach((function(e){r.push(e.bpm),o.push(e.minBpm);var a=e[l[t.tab]];if(1===t.tab){var i=a.split("-");i.shift(),a=i.join("-")}s.push(a)})),u.push({name:"最高心率",data:r}),u.push({name:"最低心率",data:o})}if(3===t.current){var d=["hour","day","day"];n.forEach((function(e){r.push(e.sbp),o.push(e.dbp);var a=e[d[t.tab]];if(1===t.tab){var i=a.split("-");i.shift(),a=i.join("-")}s.push(a)})),u.push({name:"收缩压",data:r}),u.push({name:"舒张压",data:o})}if(4===t.current){var f=["hour","day","day"];n.forEach((function(e){r.push(e.gi);var a=e[f[t.tab]];s.push(a)})),u.push({name:"血糖",data:r})}t.$nextTick((function(){t.showChart(u,s)}),100)}}))},seeDetails:function(t){var e=this,a=o.getCurrentDataIndex(t);o.showToolTip(t,{format:function(t,i){return console.log(t,i),!e.tab&&t.data&&e.toHourData(a),i+" "+t.name+":"+t.data}})},toHourData:function(e){var a=1===this.current?parseInt(this.chartCategories[e].split(":")[0]):e;console.log(a),t.navigateTo({url:"./hourData?hour=".concat(a,"&type=").concat(this.current,"&time=").concat(this.dateStr,"&tabBG=").concat(this.tabBG)})},showChart:function(e,a){var n=this,s=this;console.log(e,a),this.chartCategories=a;var u=this.current>1?{area:{type:"straight"}}:{column:{type:2===this.tab?"meter":"group",opacity:.2,width:28}};this.$nextTick((function(){var h=t.createSelectorQuery().in(n).select(".canvasShell"+n.current);h.fields({size:!0,scrollOffset:!0}).exec((function(t){var h;console.log(t[0]);var c=t[0];1!==s.current&&(s.cHeight=c.height,s.cWidth=c.width),o=new i.default((h={$this:s,canvasId:"canvasColumn"+n.current,type:s.current>1?"area":"column",dataPointShape:s.current<2,legend:{show:!1,position:"top",float:"left",fontSize:12,lineHeight:6},fontSize:12,animation:!1,background:"#FFFFFF",pixelRatio:s.pixelRatio,width:s.cWidth*s.pixelRatio,height:s.cHeight*s.pixelRatio,yAxis:{disabled:!0},xAxis:{rotateLabel:!0},tooltip:{showBox:!0},series:{legendShape:"circle"},categories:a},r(h,"series",e),r(h,"extra",u),h))}))}),100)},transition:function(t){var e=t.detail.dx;this.$refs.tabs.setDx(e)},animationfinish:function(t){var e=this,a=t.detail.current;this.$refs.tabs.setFinishCurrent(a),this.swiperCurrent=a,this.current=a,this.$nextTick((function(){e.getData()}),1e3)},dataChange:function(t){console.log(t),this.datePickerValue=t.year+"-"+t.month+"-"+t.day,this.monthPickerValue=t.year+"-"+t.month,this.getData()}}};e.default=s}).call(this,a("543d")["default"])},f171:function(t,e,a){"use strict";a.r(e);var i=a("41fc"),n=a.n(i);for(var r in i)"default"!==r&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a},f8fa:function(t,e,a){"use strict";(function(t){a("7736");i(a("66fd"));var e=i(a("206b"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])}},[["f8fa","common/runtime","common/vendor","pages/family/common/vendor"]]]);