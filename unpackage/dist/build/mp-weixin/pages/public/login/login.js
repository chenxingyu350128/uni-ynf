(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/public/login/login"],{1910:function(t,e,s){"use strict";s.r(e);var n=s("1a31"),i=s.n(n);for(var a in n)"default"!==a&&function(t){s.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},"1a31":function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"Login",data:function(){return{username:"",password:"",setpwd:!1,vCode:"",showRetrieve:!1,isExist:!1,fromMine:!1,status:0,seconds:0,timer:"",realName:"",wxBind:void 0,openId:"",image:"",avatar:s("8d10"),exitState:0,exitTimeout:""}},computed:{btnText:function(){return 0===this.wxBind?this.setpwd?"设置":"绑定":this.status?"注册":"登陆"},showpwd:function(){return!(0===this.wxBind&&!this.setpwd)},showyzm:function(){return!!this.status||0===this.wxBind&&!this.setpwd},sessionId:function(){return this.$store.state.app.sessionId}},beforeDestroy:function(){clearInterval(this.timer)},methods:{textChange:function(t,e){t},getCode:function(){var e=this;this.$http.get("/mobile/user/sendMsg",{params:{userNo:this.username}}).then((function(s){s.data.success&&(t.showToast({title:"验证码已发送"}),e.seconds=60,e.timer=setInterval((function(){e.seconds--,0===e.seconds&&clearInterval(e.timer)}),1e3))}))},checkExist:function(){var t=this;this.$http.post("/mobile/user/isUserExist",{userName:this.username}).then((function(e){e.data.success&&(console.log(1245),t.login()),5e3==e.data.code&&(t.status=!t.status)}))},checkPhone:function(t){if(!/^1[3456789]\d{9}$/.test(t))return!0},checkpwd:function(t){if(!/^(\w){6,20}$/.test(t))return!0},submit:function(){var t=this;if(0!==this.wxBind||this.setpwd)if(0===this.wxBind&&this.setpwd){if(!this.username)return;if(this.checkPhone(this.username))return;if(!this.password)return;if(this.checkpwd(this.password))return;var e={openid:this.openId,userName:this.username,realName:this.realName,image:this.image,passWord:this.password};this.$http.post("/mobile/user/regForWx",e).then((function(e){e.data.success&&(t.setStorage(e),t.setAlias(t.sessionId))}))}else{var s=!1,n=[{status:!this.username,remind:"请输入手机号"},{status:this.checkPhone(this.username),remind:"手机号格式有误，请重输"},{status:!this.password,remind:"请输入密码"},{status:this.checkpwd(this.password),remind:"密码只能输入6-20个字母、数字、下划线"}];this.status&&n.push({status:!this.vCode,remind:"请输入验证码"}),n.some((function(t){if(t.status)return s=!0,!0})),s||this.status||this.login()}else{if(!this.username)return;if(this.checkPhone(this.username))return;var i={openid:this.openId,userName:this.username,realName:this.realName,image:this.image,yzcode:this.vCode};this.$http.post("/mobile/user/boundPhone",i).then((function(e){e.data.success&&(e.data.obj.wechatType?(t.setStorage(e),t.setAlias(t.sessionId)):(t.$toast.success("微信号已绑定手机,请设置登陆密码"),t.setpwd=!0))}))}},login:function(){var t=this,e={userName:this.username,passWord:this.password};this.status&&(e.yzcode=this.vCode);var s=this.status?"/mobile/user/reg":"/mobile/user/login";this.$http.post(s,e).then((function(e){e.data.success&&t.status&&(t.status=!t.status)}))},agreement:function(){t.navigateTo({url:"../webviewPage/webviewPage?url=http://mobile.yinaf.com/page/agreement.html"})},wxLogin:function(t){var e=this;this.$http.post("/mobile/user/loginForWx",{code:t}).then((function(t){!t.data.success||(localStorage.removeItem("isLogOut"),e.openId=t.data.obj.openid,e.wxBind=t.data.obj.wechatType,e.realName=t.data.obj.realName,e.image=t.data.obj.image,e.wxBind)}))},setStorage:function(t){this.$store.commit("SET_EACH_STATE",t.data.obj)}}};e.default=n}).call(this,s("543d")["default"])},"4b1a":function(t,e,s){"use strict";var n={uButton:function(){return s.e("uview-ui/components/u-button/u-button").then(s.bind(null,"250b"))}},i=function(){var t=this,e=t.$createElement;t._self._c},a=[];s.d(e,"b",(function(){return i})),s.d(e,"c",(function(){return a})),s.d(e,"a",(function(){return n}))},"58b0":function(t,e,s){},"74e2":function(t,e,s){"use strict";var n=s("58b0"),i=s.n(n);i.a},ae65:function(t,e,s){"use strict";(function(t){s("7736");n(s("66fd"));var e=n(s("f52c"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,s("543d")["createPage"])},f52c:function(t,e,s){"use strict";s.r(e);var n=s("4b1a"),i=s("1910");for(var a in i)"default"!==a&&function(t){s.d(e,t,(function(){return i[t]}))}(a);s("74e2");var o,u=s("f0c5"),r=Object(u["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=r.exports}},[["ae65","common/runtime","common/vendor"]]]);