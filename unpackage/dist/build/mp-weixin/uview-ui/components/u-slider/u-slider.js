(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-slider/u-slider"],{"22c9":function(t,e,i){"use strict";i.r(e);var a=i("86b1"),n=i("63a6");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("2b7a");var u,r=i("f0c5"),l=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"1167740c",null,!1,a["a"],u);e["default"]=l.exports},"2b7a":function(t,e,i){"use strict";var a=i("f7e7"),n=i.n(a);n.a},"63a6":function(t,e,i){"use strict";i.r(e);var a=i("8f29"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},"86b1":function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__get_style([t.barStyle,{height:t.height+"rpx",backgroundColor:t.activeColor}])),a=t.$slots.default?null:t.__get_style([t.blockStyle,{height:t.blockWidth+"rpx",width:t.blockWidth+"rpx"}]);t.$mp.data=Object.assign({},{$root:{s0:i,s1:a}})},s=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}))},"8f29":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"u-slider",props:{value:{type:[Number,String],default:0},disabled:{type:Boolean,default:!1},blockWidth:{type:[Number,String],default:30},min:{type:[Number,String],default:0},max:{type:[Number,String],default:100},step:{type:[Number,String],default:1},height:{type:[Number,String],default:6},activeColor:{type:String,default:"#2979ff"},inactiveColor:{type:String,default:"#c0c4cc"},blockColor:{type:String,default:"#ffffff"},blockStyle:{type:Object,default:function(){return{}}}},data:function(){return{startX:0,status:"end",newValue:0,distanceX:0,startValue:0,barStyle:{},sliderRect:{left:0,width:0}}},watch:{value:function(t){"end"==this.status&&this.updateValue(this.value,!1)}},created:function(){this.updateValue(this.value,!1)},mounted:function(){var t=this;this.$uGetRect(".u-slider").then((function(e){t.sliderRect=e}))},methods:{onTouchStart:function(t){if(!this.disabled){this.startX=0;var e=t.touches[0];this.startX=e.clientX,this.startValue=this.format(this.value),this.status="start"}},onTouchMove:function(t){if(!this.disabled){"start"==this.status&&this.$emit("start");var e=t.touches[0];this.distanceX=e.clientX-this.sliderRect.left,this.newValue=this.distanceX/this.sliderRect.width*100,this.status="moving",this.$emit("moving"),this.updateValue(this.newValue,!0)}},onTouchEnd:function(){this.disabled||("moving"===this.status&&(this.updateValue(this.newValue,!1),this.$emit("end")),this.status="end")},updateValue:function(t,e){var i=this.format(t),a={width:i+"%"};1==e?a.transition="none":delete a.transition,this.$emit("input",i),this.barStyle=a},format:function(t){return Math.round(Math.max(this.min,Math.min(t,this.max))/this.step)*this.step},onClick:function(t){if(!this.disabled){var e=(t.detail.x-this.sliderRect.left)/this.sliderRect.width*100;this.updateValue(e,!1)}}}};e.default=a},f7e7:function(t,e,i){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-slider/u-slider-create-component',
    {
        'uview-ui/components/u-slider/u-slider-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("22c9"))
        })
    },
    [['uview-ui/components/u-slider/u-slider-create-component']]
]);
