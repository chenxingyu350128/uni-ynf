(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-icon/u-icon"],{"513c":function(t,e,i){"use strict";i.r(e);var n=i("c5b4"),u=i("9ccd");for(var r in u)"default"!==r&&function(t){i.d(e,t,(function(){return u[t]}))}(r);i("530b");var o,c=i("f0c5"),s=Object(c["a"])(u["default"],n["b"],n["c"],!1,null,"dc09783e",null,!1,n["a"],o);e["default"]=s.exports},"530b":function(t,e,i){"use strict";var n=i("84ed"),u=i.n(n);u.a},"84ed":function(t,e,i){},"9ccd":function(t,e,i){"use strict";i.r(e);var n=i("fa2d"),u=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=u.a},c5b4:function(t,e,i){"use strict";var n,u=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__get_style([t.customStyle])),n=t.__get_style([t.imgStyle]),u=t.__get_style([t.iconStyle]);t.$mp.data=Object.assign({},{$root:{s0:i,s1:n,s2:u}})},r=[];i.d(e,"b",(function(){return u})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}))},fa2d:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"u-icon",props:{name:{type:String,default:""},color:{type:String,default:""},size:{type:[Number,String],default:"inherit"},bold:{type:Boolean,default:!1},index:{type:[Number,String],default:""},hoverClass:{type:String,default:""},customPrefix:{type:String,default:"uicon"},label:{type:String,default:""},labelPos:{type:String,default:"right"},labelSize:{type:[String,Number],default:"28"},labelColor:{type:String,default:"#606266"},marginLeft:{type:[String,Number],default:"6"},marginTop:{type:[String,Number],default:"6"},marginRight:{type:[String,Number],default:"6"},marginBottom:{type:[String,Number],default:"6"},imgMode:{type:String,default:"widthFix"},customStyle:{type:Object,default:function(){return{}}}},computed:{customClass:function(){var t=[];return t.push(this.customPrefix+"-"+this.name),"uicon"==this.customPrefix?t.push("u-iconfont"):t.push(this.customPrefix),this.color&&this.$u.config.type.includes(this.color)&&t.push("u-icon__icon--"+this.color),t},iconStyle:function(){var t={};return t={fontSize:"inherit"==this.size?"inherit":this.size+"rpx",fontWeight:this.bold?"bold":"normal"},this.color&&!this.$u.config.type.includes(this.color)&&(t.color=this.color),t},isImg:function(){return-1!==this.name.indexOf("/")},imgStyle:function(){var t={};return t.width=this.size+"rpx",t}},methods:{click:function(){this.$emit("click",this.index)},touchstart:function(){this.$emit("touchstart",this.index)}}};e.default=n}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-icon/u-icon-create-component',
    {
        'uview-ui/components/u-icon/u-icon-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("513c"))
        })
    },
    [['uview-ui/components/u-icon/u-icon-create-component']]
]);
