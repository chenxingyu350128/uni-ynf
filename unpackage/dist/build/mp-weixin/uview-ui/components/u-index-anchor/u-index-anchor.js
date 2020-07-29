(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-index-anchor/u-index-anchor"],{"0d17":function(t,e,n){"use strict";n.r(e);var u=n("ec28"),c=n.n(u);for(var r in u)"default"!==r&&function(t){n.d(e,t,(function(){return u[t]}))}(r);e["default"]=c.a},"237e":function(t,e,n){"use strict";n.r(e);var u=n("5028"),c=n("0d17");for(var r in c)"default"!==r&&function(t){n.d(e,t,(function(){return c[t]}))}(r);n("d3d4");var a,i=n("f0c5"),o=Object(i["a"])(c["default"],u["b"],u["c"],!1,null,"6fa3f6ce",null,!1,u["a"],a);e["default"]=o.exports},5028:function(t,e,n){"use strict";var u,c=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__get_style([t.wrapperStyle])),u=t.$u.guid(),c=t.__get_style([t.customAnchorStyle]);t.$mp.data=Object.assign({},{$root:{s0:n,g0:u,s1:c}})},r=[];n.d(e,"b",(function(){return c})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return u}))},d02d:function(t,e,n){},d3d4:function(t,e,n){"use strict";var u=n("d02d"),c=n.n(u);c.a},ec28:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"u-index-anchor",props:{useSlot:{type:Boolean,default:!1},index:{type:String,default:""},customStyle:{type:Object,default:function(){return{}}}},data:function(){return{active:!1,wrapperStyle:{},anchorStyle:{}}},inject:["UIndexList"],mounted:function(){this.UIndexList.children.push(this),this.UIndexList.updateData()},computed:{customAnchorStyle:function(){return Object.assign(this.anchorStyle,this.customStyle)}}};e.default=u}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-index-anchor/u-index-anchor-create-component',
    {
        'uview-ui/components/u-index-anchor/u-index-anchor-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("237e"))
        })
    },
    [['uview-ui/components/u-index-anchor/u-index-anchor-create-component']]
]);
