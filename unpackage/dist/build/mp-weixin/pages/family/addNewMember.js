require('common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/family/addNewMember"],{"0c77":function(e,t,n){"use strict";(function(e){n("7736");r(n("66fd"));var t=r(n("197c"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"197c":function(e,t,n){"use strict";n.r(t);var r=n("c777"),i=n("988c");for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("3a7c");var u,s=n("f0c5"),d=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"45473cd6",null,!1,r["a"],u);t["default"]=d.exports},"3a7c":function(e,t,n){"use strict";var r=n("6487"),i=n.n(r);i.a},"5b69":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{customStyle:{"border-radius":"unset!important",border:"none!important"},title:["","成员性别","出生年月","成员身高","成员体重"],relaIndex:0,gender:1,today:new Date,pickerDay:"",step:0,minHeight:120,minWeight:40,sliderHeight:45,sliderWeight:15,weight:55,relatives:[{rela:"父亲",gender:1},{rela:"母亲",gender:2},{rela:"丈夫",gender:1},{rela:"妻子",gender:2},{rela:"爷爷",gender:1},{rela:"奶奶",gender:2},{rela:"外公",gender:1},{rela:"外婆",gender:2},{rela:"儿子",gender:1},{rela:"女儿",gender:2},{rela:"亲戚",gender:0},{rela:"朋友",gender:0},{rela:"其他",gender:0},{rela:"本人",gender:0}],showDatePicker:!1}},computed:{birthday:function(){return this.pickerDay||this.$u.timeFormat(this.today,"yyyy-mm-dd")},sessionId:function(){return this.$store.state.app.sessionId}},methods:{changeRelaIndex:function(e,t){this.relaIndex=e,t&&(this.gender=t)},setGender:function(e){var t=this,n=!0,r=this.relatives[this.relaIndex].rela;this.relatives.some((function(e){if(r===e.rela&&e.gender)return t.$u.toast("该关系成员性别不可更改"),n=!1,!0})),n&&(this.gender=e)},dateChange:function(e){this.pickerDay=e.result},addMember:function(){var t=this,n={sex:this.gender,birthday:this.birthday,rela:this.relatives[this.relaIndex].rela,height:this.minHeight+this.sliderHeight,weight:this.minWeight+this.sliderWeight,sessionId:this.sessionId};this.$http.post("/mobile/user/addMember",n).then((function(n){n.data.success&&(e.$emit("getMemberList"),t.$u.toast(n.data.msg),e.navigateBack())}))}}};t.default=n}).call(this,n("543d")["default"])},6487:function(e,t,n){},"988c":function(e,t,n){"use strict";n.r(t);var r=n("5b69"),i=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=i.a},c777:function(e,t,n){"use strict";var r={uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"250b"))},uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"513c"))},uSlider:function(){return n.e("uview-ui/components/u-slider/u-slider").then(n.bind(null,"22c9"))},uCalendar:function(){return n.e("uview-ui/components/u-calendar/u-calendar").then(n.bind(null,"8a99"))}},i=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.showDatePicker=!0},e.e1=function(t){e.step--},e.e2=function(t){e.step++})},a=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}))}},[["0c77","common/runtime","common/vendor"]]]);