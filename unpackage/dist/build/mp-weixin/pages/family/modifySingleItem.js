require('common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/family/modifySingleItem"],{"32a6":function(e,t,a){"use strict";a.r(t);var l=a("6083"),n=a("5eae");for(var u in n)"default"!==u&&function(e){a.d(t,e,(function(){return n[e]}))}(u);a("42ee");var i,r=a("f0c5"),o=Object(r["a"])(n["default"],l["b"],l["c"],!1,null,"3794f29e",null,!1,l["a"],i);t["default"]=o.exports},"42ee":function(e,t,a){"use strict";var l=a("d8f1"),n=a.n(l);n.a},"5eae":function(e,t,a){"use strict";a.r(t);var l=a("d430"),n=a.n(l);for(var u in l)"default"!==u&&function(e){a.d(t,e,(function(){return l[e]}))}(u);t["default"]=n.a},6083:function(e,t,a){"use strict";var l={uField:function(){return a.e("uview-ui/components/u-field/u-field").then(a.bind(null,"ecd7"))},uPicker:function(){return Promise.all([a.e("common/vendor"),a.e("uview-ui/components/u-picker/u-picker")]).then(a.bind(null,"c041"))},uButton:function(){return a.e("uview-ui/components/u-button/u-button").then(a.bind(null,"250b"))},uSelect:function(){return a.e("uview-ui/components/u-select/u-select").then(a.bind(null,"c285"))}},n=function(){var e=this,t=e.$createElement,a=(e._self._c,e.value.split("-"));e._isMounted||(e.e0=function(t){e.showDate=!0},e.e1=function(t){e.showDate=!0}),e.$mp.data=Object.assign({},{$root:{g0:a}})},u=[];a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return u})),a.d(t,"a",(function(){return l}))},a37a:function(e,t,a){"use strict";(function(e){a("7736");l(a("66fd"));var t=l(a("32a6"));function l(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},d430:function(e,t,a){"use strict";(function(e){function a(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var l={data:function(){return{customStyle:{"border-radius":"unset!important",border:"none!important"},isShow:!0,isUser:!1,showDate:!1,key:"",value:"",label:"",changeGender:!1,gender:"",genders:[{value:"1",label:"男"},{value:"2",label:"女"}],bloodTypes:[{value:"A型",label:"A型"},{value:"B型",label:"B型"},{value:"AB型",label:"AB型"},{value:"O型",label:"O型"},{value:"其他",label:"其他"}],careers:[{value:"计算机/互联网/通信",label:"计算机/互联网/通信"},{value:"计算机/互联网/通信",label:"计算机/互联网/通信"},{value:"生产/工艺/制造",label:"生产/工艺/制造"},{value:"医疗/护理/制药",label:"医疗/护理/制药"},{value:"金融/银行/投资/保险",label:"金融/银行/投资/保险"},{value:"商业/服务业/个体经营",label:"商业/服务业/个体经营"},{value:"文化/广告/传媒",label:"文化/广告/传媒"},{value:"娱乐/艺术/表演",label:"娱乐/艺术/表演"},{value:"律师/法务",label:"律师/法务"},{value:"教育/培训",label:"教育/培训"},{value:"公务员/行政/事业单位",label:"公务员/行政/事业单位"},{value:"学生",label:"学生"},{value:"其他",label:"其他"}],relatives:[{value:"父亲",label:"父亲",extra:1},{value:"母亲",label:"母亲",extra:2},{value:"丈夫",label:"丈夫",extra:1},{value:"妻子",label:"妻子",extra:2},{value:"爷爷",label:"爷爷",extra:1},{value:"奶奶",label:"奶奶",extra:2},{value:"外公",label:"外公",extra:1},{value:"外婆",label:"外婆",extra:2},{value:"儿子",label:"儿子",extra:1},{value:"女儿",label:"女儿",extra:2},{value:"亲戚",label:"亲戚",extra:0},{value:"朋友",label:"朋友",extra:0},{value:"其他",label:"其他",extra:0},{value:"本人",label:"本人",extra:0}]}},computed:{yearNow:function(){return Number(this.$u.timeFormat(new Date,"yyyy"))},defaultGender:function(){var e=this,t=0;return this.genders.forEach((function(a,l){a.value==e.value&&(t=l)})),[t]},defaultBlood:function(){var e=this,t=0;return this.bloodTypes.forEach((function(a,l){a.value==e.value&&(t=l)})),[t]},defaultRela:function(){var e=this,t=0;return this.relatives.forEach((function(a,l){a.value==e.value&&(t=l)})),[t]},defaultCareer:function(){var e=this,t=0;return this.careers.forEach((function(a,l){a.value==e.value&&(t=l)})),[t]},sessionId:function(){return this.$store.state.app.sessionId},memberId:function(){return this.$store.state.member.memberId},showField:function(){var e=["realName","trueName","identity","address","height","weight","phone","mail"];return e.includes(this.key)},showSelect:function(){var e=["sex","blood","occupation","rela"];return e.includes(this.key)},showPicker:function(){var e=["birthday","householdRegister","domicile"];return e.includes(this.key)}},onLoad:function(e){console.log(e),this.key=e.key,this.value=e.value,this.label=e.label,this.isUser=Boolean(parseInt(e.isUser))},methods:{updateInfo:function(){var t=this;if(!this.value)return this.$u.toast("数据不能为空，请输入"),!1;var l=a({sessionId:this.sessionId},this.key,this.value);this.isUser||(console.log("vvv"),l.memberId=this.memberId),this.changeGender&&(l.sex=this.gender);var n=this.isUser?"/mobile/user/editUser":"/mobile/user/updateMember";this.$http.post(n,l).then((function(a){a.data.success&&(t.isUser?e.$emit("getUser"):e.$emit("getMember"),t.$u.toast(a.data.msg),e.navigateBack())}))},genderConfirm:function(e){console.log(e),this.value=e[0].value,this.updateInfo()},bloodConfirm:function(e){console.log(e),this.value=e[0].value,this.updateInfo()},occuConfirm:function(e){console.log(e),this.value=e[0].value,this.updateInfo()},relaConfirm:function(e){console.log(e),this.value=e[0].value,e[0].extra&&(this.changeGender=!0,this.gender=e[0].extra),this.updateInfo()},dateChange:function(e){console.log(e),this.value=e.year+"-"+e.month+"-"+e.day},regionChange:function(e){console.log(e),this.value=e.province.label+"-"+e.city.label+"-"+e.area.label}}};t.default=l}).call(this,a("543d")["default"])},d8f1:function(e,t,a){}},[["a37a","common/runtime","common/vendor"]]]);