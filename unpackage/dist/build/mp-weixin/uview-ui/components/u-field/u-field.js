(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-field/u-field"],{"028a":function(t,e,n){"use strict";n.r(e);var i=n("9b15"),l=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=l.a},3631:function(t,e,n){"use strict";var i=n("9d69"),l=n.n(i);l.a},"9b15":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"u-field",props:{icon:String,rightIcon:String,required:Boolean,label:String,password:Boolean,clearable:{type:Boolean,default:!0},labelWidth:{type:[Number,String],default:130},labelAlign:{type:String,default:"left"},inputAlign:{type:String,default:"left"},iconColor:{type:String,default:"#606266"},autoHeight:{type:Boolean,default:!0},errorMessage:{type:[String,Boolean],default:""},placeholder:String,placeholderStyle:String,focus:Boolean,fixed:Boolean,value:[Number,String],type:{type:String,default:"text"},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},confirmType:{type:String,default:"done"},labelPosition:{type:String,default:"left"},fieldStyle:{type:Object,default:function(){return{}}},clearSize:{type:[Number,String],default:30},iconStyle:{type:Object,default:function(){return{}}},borderTop:{type:Boolean,default:!1},borderBottom:{type:Boolean,default:!0}},data:function(){return{focused:!1,itemIndex:0}},computed:{inputWrapStyle:function(){var t={};return t.textAlign=this.inputAlign,"left"==this.labelPosition?t.margin="0 8rpx":t.marginRight="8rpx",t},rightIconStyle:function(){var t={};return"top"==this.arrowDirection&&(t.transform="roate(-90deg)"),"bottom"==this.arrowDirection?t.transform="roate(90deg)":t.transform="roate(0deg)",t},labelStyle:function(){var t={};return"left"==this.labelAlign&&(t.justifyContent="flext-start"),"center"==this.labelAlign&&(t.justifyContent="center"),"right"==this.labelAlign&&(t.justifyContent="flext-end"),t},justifyContent:function(){return"left"==this.labelAlign?"flex-start":"center"==this.labelAlign?"center":"right"==this.labelAlign?"flex-end":void 0},inputMaxlength:function(){return Number(this.maxlength)},fieldInnerStyle:function(){var t={};return"left"==this.labelPosition?t.flexDirection="row":t.flexDirection="column",t}},methods:{onInput:function(t){this.$emit("input",t.target.value)},onFocus:function(t){this.focused=!0,this.$emit("focus",t)},onBlur:function(t){this.focused=!1,this.$emit("blur",t)},onConfirm:function(t){this.$emit("confirm",t.detail.value)},onClear:function(t){this.$emit("input","")},rightIconClick:function(){this.$emit("right-icon-click"),this.$emit("click")},fieldClick:function(){this.$emit("click")}}};e.default=i},"9d69":function(t,e,n){},ecd7:function(t,e,n){"use strict";n.r(e);var i=n("f0e2"),l=n("028a");for(var r in l)"default"!==r&&function(t){n.d(e,t,(function(){return l[t]}))}(r);n("3631");var o,u=n("f0c5"),a=Object(u["a"])(l["default"],i["b"],i["c"],!1,null,"ee26e03c",null,!1,i["a"],o);e["default"]=a.exports},f0e2:function(t,e,n){"use strict";var i={uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"513c"))}},l=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__get_style([t.inputWrapStyle])),i=t.__get_style([t.fieldStyle]),l=t.__get_style([t.fieldStyle]),r=t.__get_style([t.rightIconStyle]);t.$mp.data=Object.assign({},{$root:{s0:n,s1:i,s2:l,s3:r}})},r=[];n.d(e,"b",(function(){return l})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-field/u-field-create-component',
    {
        'uview-ui/components/u-field/u-field-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ecd7"))
        })
    },
    [['uview-ui/components/u-field/u-field-create-component']]
]);
