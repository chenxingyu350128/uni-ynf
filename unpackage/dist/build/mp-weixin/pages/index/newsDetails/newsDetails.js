(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/newsDetails/newsDetails"],{"2aa9":function(e,t,n){"use strict";(function(e){n("7736");i(n("66fd"));var t=i(n("3ac3"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"3ac3":function(e,t,n){"use strict";n.r(t);var i=n("e277"),s=n("d65a");for(var a in s)"default"!==a&&function(e){n.d(t,e,(function(){return s[e]}))}(a);n("8e09");var r,o=n("f0c5"),c=Object(o["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);t["default"]=c.exports},"8d7d":function(e,t,n){},"8e09":function(e,t,n){"use strict";var i=n("8d7d"),s=n.n(i);s.a},c13c:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{newsId:"",createTime:"",newPic:"",newTitle:"",newContent:""}},computed:{sessionId:function(){return this.$store.state.app.sessionId},memberId:function(){return this.$store.state.member.memberId}},onLoad:function(e){console.log(e),this.newsId=e.newsId,this.init()},methods:{init:function(){var e=this,t={newId:this.newsId};this.memberId&&(t.memberId=this.memberId),this.sessionId&&(t.sessionId=this.sessionId),this.$http.get("mobile/index/getNews",t).then((function(t){if(t.data.success){var n=t.data.obj;for(var i in n)e[i]=n[i];var s=n.newContent;e.newContent="".concat(s).replace(/\<img/gi,'<img class="richImg"')}}))}}};t.default=i},d65a:function(e,t,n){"use strict";n.r(t);var i=n("c13c"),s=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=s.a},e277:function(e,t,n){"use strict";var i,s=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i}))}},[["2aa9","common/runtime","common/vendor"]]]);