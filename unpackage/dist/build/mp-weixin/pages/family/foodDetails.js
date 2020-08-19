require('common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/family/foodDetails"],{"3aa0":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=["克","毫克","微克"],a={data:function(){return{customStyle:{"border-top-right-radius":"0!important","border-bottom-right-radius":"0!important"},typeList:[{text:"早餐",color:"#00aaef"},{text:"早点",color:"#00aaef"},{text:"午餐",color:"#00aaef"},{text:"下午茶",color:"#00aaef"},{text:"晚餐",color:"#00aaef"},{text:"宵夜",color:"#00aaef"}],nutrients:[{name:"碳水化合物",mete:n[0],dataName:"carbohydrate",amount:"—"},{name:"蛋白质",mete:n[0],dataName:"protein",amount:"—"},{name:"脂肪",mete:n[0],dataName:"fat",amount:"—"},{name:"膳食纤维",mete:"",dataName:"dietaryFiber",amount:"—"},{name:"钠",mete:n[1],dataName:"sodium",amount:"—"},{name:"钾",mete:n[1],dataName:"potassium",amount:"—"},{name:"镁",mete:n[1],dataName:"magnesium",amount:"—"},{name:"硒",mete:n[2],dataName:"selenium",amount:"—"},{name:"铁",mete:n[1],dataName:"iron",amount:"—"},{name:"胡萝卜素",mete:n[2],dataName:"carotene",amount:"—"},{name:"锰",mete:n[1],dataName:"manganese",amount:"—"},{name:"核黄素",mete:n[1],dataName:"riboflavin",amount:"—"},{name:"胆固醇",mete:n[1],dataName:"cholesterol",amount:"—"},{name:"钙",mete:n[1],dataName:"calcium",amount:"—"},{name:"烟酸",mete:n[1],dataName:"niacin",amount:"—"},{name:"锌",mete:n[1],dataName:"zinc",amount:"—"},{name:"铜",mete:n[1],dataName:"copper",amount:"—"},{name:"硫酸铵",mete:n[1],dataName:"thiamine",amount:"—"},{name:"维生素A",mete:n[2],dataName:"vitaminA",amount:"—"},{name:"维生素B",mete:n[1],dataName:"vitaminB",amount:"—"},{name:"维生素C",mete:n[1],dataName:"vitaminC",amount:"—"},{name:"维生素D",mete:n[1],dataName:"vitaminD",amount:"—"},{name:"维生素E",mete:n[1],dataName:"vitaminE",amount:"—"}],caipId:"",biteId:"",foodNum:100,foodUnit:"",biteTime:"",foodType:0,fromRecommend:"",pic:"",name:"",nutritive:"",heatQuantity:0,rawMaterial:"",introduce:"",detailed:"",showPopup:!1,showTypeSelect:!1,startTime1:"",startTime2:"",endTime1:"",endTime2:"",minusInterval:null,addInterval:null}},computed:{sessionId:function(){return this.$store.state.app.sessionId}},onLoad:function(t){if(t){for(var e in console.log(t),t)this[e]=t[e];this.foodType=parseInt(this.foodType)}},onShow:function(){this.init(),this.foodType&&(this.showPopup=!0)},methods:{init:function(){var t=this,e={caipId:this.caipId,sessionId:this.sessionId};this.$http.get("/mobile/bite/getCaipDetails",e).then((function(e){e.data.success&&function(){var n=e.data.obj,a=function(e){t[e]=n[e],t.nutrients.forEach((function(a){a.dataName===e&&n[e]&&t.$set(a,"amount",parseInt(n[e]).toFixed(2))}))};for(var o in n)a(o)}()}))},addToMeal:function(){this.foodType?this.showPopup=!0:this.showTypeSelect=!0},minusStart:function(t){var e=this;console.log(t),this.endTime1="",this.startTime1=t.timeStamp,clearInterval(this.minusInterval),this.minusInterval=null,setTimeout((function(){console.log(e.startTime1),e.endTime1?(clearInterval(e.minusInterval),console.log("short"),console.log(e.foodNum),e.foodNum>1&&(console.log("fit"),e.foodNum--)):(clearInterval(e.minusInterval),e.minusInterval=setInterval((function(){e.foodNum>1&&(console.log("fit"),e.foodNum--)}),50))}),300)},addStart:function(t){var e=this;console.log(t),this.endTime2="",this.startTime2=t.timeStamp,clearInterval(this.addInterval),this.addInterval=null,setTimeout((function(){e.endTime2?(clearInterval(e.addInterval),console.log("short"),console.log(e.foodNum),e.foodNum<999&&(console.log("fit"),e.foodNum++)):(clearInterval(e.addInterval),e.addInterval=setInterval((function(){e.foodNum<999&&(console.log("fit"),e.foodNum++)}),50))}),300)},minusEnd:function(t){console.log("minusEnd"),clearInterval(this.minusInterval),this.endTime1=t.timeStamp},addEnd:function(t){console.log("addEnd"),clearInterval(this.addInterval),this.endTime2=t.timeStamp},touchMove:function(t){console.log("moved"),clearInterval(this.minusInterval),clearInterval(this.addInterval)},addCertain:function(){var e=this,n={sessionId:this.sessionId,memberId:this.memberId,biteTime:this.biteTime,foodType:this.foodType,foodName:this.name,foodImg:this.pic,foodNum:this.foodNum,foodUnit:this.foodUnit,caipId:this.caipId,heatQuantity:Math.round(this.heatQuantity/100*this.foodNum)};this.biteId&&(n.biteId=this.biteId);var a=this.biteId?"/mobile/bite/updateNewBite":"/mobile/bite/addNewBite";this.$http.post(a,n).then((function(n){n.data.success&&(e.$u.toast(n.data.msg),setTimeout((function(){t.navigateBack({delta:e.fromRecommend?1:e.biteId?1:2})}),500))}))},typeConfirm:function(t){this.foodType=t+1,this.showPopup=!0}}};e.default=a}).call(this,n("543d")["default"])},"8cec":function(t,e,n){"use strict";n.r(e);var a=n("3aa0"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},"9e35":function(t,e,n){"use strict";(function(t){n("7736");a(n("66fd"));var e=a(n("c6ac"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},b487:function(t,e,n){"use strict";var a=n("d0a2"),o=n.n(a);o.a},c1de:function(t,e,n){"use strict";var a={uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"250b"))},uTag:function(){return n.e("uview-ui/components/u-tag/u-tag").then(n.bind(null,"1d35"))},uLine:function(){return n.e("uview-ui/components/u-line/u-line").then(n.bind(null,"f0e5"))},uPopup:function(){return n.e("uview-ui/components/u-popup/u-popup").then(n.bind(null,"dfc0"))},uAvatar:function(){return n.e("uview-ui/components/u-avatar/u-avatar").then(n.bind(null,"7681"))},uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"513c"))},uActionSheet:function(){return n.e("uview-ui/components/u-action-sheet/u-action-sheet").then(n.bind(null,"fe81"))}},o=function(){var t=this,e=t.$createElement,n=(t._self._c,Math.round(t.heatQuantity/100*t.foodNum));t._isMounted||(t.e0=function(e){t.showPopup=!1}),t.$mp.data=Object.assign({},{$root:{g0:n}})},i=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}))},c6ac:function(t,e,n){"use strict";n.r(e);var a=n("c1de"),o=n("8cec");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("b487");var u,m=n("f0c5"),d=Object(m["a"])(o["default"],a["b"],a["c"],!1,null,"e79abc74",null,!1,a["a"],u);e["default"]=d.exports},d0a2:function(t,e,n){}},[["9e35","common/runtime","common/vendor"]]]);