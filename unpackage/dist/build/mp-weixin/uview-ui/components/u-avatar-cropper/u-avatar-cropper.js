(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-avatar-cropper/u-avatar-cropper"],{"084b":function(t,e,i){"use strict";i.r(e);var r=i("a50c"),o=i("57f9");for(var n in o)"default"!==n&&function(t){i.d(e,t,(function(){return o[t]}))}(n);i("2ced");var c,s=i("f0c5"),h=Object(s["a"])(o["default"],r["b"],r["c"],!1,null,"ea1a11ae",null,!1,r["a"],c);e["default"]=h.exports},"2ced":function(t,e,i){"use strict";var r=i("9f2a"),o=i.n(r);o.a},"57f9":function(t,e,i){"use strict";i.r(e);var r=i("77b4"),o=i.n(r);for(var n in r)"default"!==n&&function(t){i.d(e,t,(function(){return r[t]}))}(n);e["default"]=o.a},"77b4":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(i("c390"));function o(t){return t&&t.__esModule?t:{default:t}}var n={props:{boundStyle:{type:Object,default:function(){return{lineWidth:4,borderColor:"rgb(245, 245, 245)",mask:"rgba(0, 0, 0, 0.35)"}}}},data:function(){return{bottomNavHeight:50,originWidth:200,width:0,height:0,cropperOpt:{id:"cropper",targetId:"targetCropper",pixelRatio:1,width:0,height:0,scale:2.5,zoom:8,cut:{x:(this.width-this.originWidth)/2,y:(this.height-this.originWidth)/2,width:this.originWidth,height:this.originWidth},boundStyle:{lineWidth:t.upx2px(this.boundStyle.lineWidth),mask:this.boundStyle.mask,color:this.boundStyle.borderColor}},destWidth:200,rectWidth:200,fileType:"jpg",src:""}},onLoad:function(e){var i=this,o=t.getSystemInfoSync();if(this.width=o.windowWidth,this.height=o.windowHeight-this.bottomNavHeight,this.cropperOpt.width=this.width,this.cropperOpt.height=this.height,this.cropperOpt.pixelRatio=o.pixelRatio,e.destWidth&&(this.destWidth=e.destWidth),e.rectWidth){var n=Number(e.rectWidth);this.cropperOpt.cut={x:(this.width-n)/2,y:(this.height-n)/2,width:n,height:n}}this.rectWidth=e.rectWidth,e.fileType&&(this.fileType=e.fileType),this.cropper=new r.default(this.cropperOpt).on("ready",(function(t){})).on("beforeImageLoad",(function(t){})).on("imageLoad",(function(t){})).on("beforeDraw",(function(t,e){})),t.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#000000"}),t.chooseImage({count:1,sizeType:["compressed"],sourceType:["album","camera"],success:function(t){i.src=t.tempFilePaths[0],i.cropper.pushOrign(i.src)}})},methods:{touchStart:function(t){this.cropper.touchStart(t)},touchMove:function(t){this.cropper.touchMove(t)},touchEnd:function(t){this.cropper.touchEnd(t)},getCropperImage:function(){var e=this,i=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(console.log(this.src),!this.src)return this.$u.toast("请先选择图片再裁剪");var r={destHeight:Number(this.destWidth),destWidth:Number(this.destWidth),fileType:this.fileType};this.cropper.getCropperImage(r,(function(r,o){o?t.showModal({title:"温馨提示",content:o.message}):i?t.previewImage({current:"",urls:[r]}):(t.$emit("uAvatarCropper",r),e.$u.route({type:"back"}))}))},uploadTap:function(){var e=this,i=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(t){i.src=t.tempFilePaths[0],i.cropper.pushOrign(e.src)}})}}};e.default=n}).call(this,i("543d")["default"])},"9f2a":function(t,e,i){},a50c:function(t,e,i){"use strict";var r,o=function(){var t=this,e=t.$createElement;t._self._c},n=[];i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return r}))},be6b:function(t,e,i){"use strict";(function(t){i("7736");r(i("66fd"));var e=r(i("084b"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])}},[["be6b","common/runtime","common/vendor"]]]);