(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/addFeedback"],{"1f24":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{type:"",feedbackContent:"",phone:"",qq:"",mail:"",btnStyle:{"border-radius":"unset!important",background:"#00aaef"}}},computed:{sessionId:function(){return this.$store.state.app.sessionId}},onLoad:function(e){var n=["APP应用","腕表","耗电","腕表外观","其他"];e.type&&(this.type=Number(e.type)),t.setNavigationBarTitle({title:n[this.type]+"反馈"})},methods:{commit:function(){var e=this;if(!this.feedbackContent)return this.$u.toast("请填写具体的反馈内容"),!1;if(!this.phone&&!this.qq&&!this.mail)return this.$u.toast("请至少选择一种联系方式"),!1;var n={sessionId:this.sessionId,feedbackType:this.type,feedbackContent:this.feedbackContent,phone:this.phone,qq:this.qq,mail:this.mail};this.$http.post("/mobile/personal/addFeedback",n).then((function(n){n.data.success&&(e.$u.toast("反馈已收到，客服将尽快处理"),setTimeout((function(){t.navigateBack()}),1e3))}))}}};e.default=n}).call(this,n("543d")["default"])},2742:function(t,e,n){},"3be8":function(t,e,n){"use strict";var u={uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uview-ui/components/u-input/u-input")]).then(n.bind(null,"20c4"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"250b"))}},i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return u}))},"79c5":function(t,e,n){"use strict";(function(t){n("7736");u(n("66fd"));var e=u(n("7a1a"));function u(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"7a1a":function(t,e,n){"use strict";n.r(e);var u=n("3be8"),i=n("b0eb");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("b5e6");var a,s=n("f0c5"),c=Object(s["a"])(i["default"],u["b"],u["c"],!1,null,"5fd12c9c",null,!1,u["a"],a);e["default"]=c.exports},b0eb:function(t,e,n){"use strict";n.r(e);var u=n("1f24"),i=n.n(u);for(var o in u)"default"!==o&&function(t){n.d(e,t,(function(){return u[t]}))}(o);e["default"]=i.a},b5e6:function(t,e,n){"use strict";var u=n("2742"),i=n.n(u);i.a}},[["79c5","common/runtime","common/vendor"]]]);