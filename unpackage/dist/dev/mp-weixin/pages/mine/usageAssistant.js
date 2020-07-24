(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/mine/usageAssistant"],{

/***/ 420:
/*!*********************************************************************!*\
  !*** E:/learn/xxx/main.js?{"page":"pages%2Fmine%2FusageAssistant"} ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _usageAssistant = _interopRequireDefault(__webpack_require__(/*! ./pages/mine/usageAssistant.vue */ 421));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_usageAssistant.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 421:
/*!**************************************************!*\
  !*** E:/learn/xxx/pages/mine/usageAssistant.vue ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _usageAssistant_vue_vue_type_template_id_4caf5410_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./usageAssistant.vue?vue&type=template&id=4caf5410&scoped=true& */ 422);
/* harmony import */ var _usageAssistant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./usageAssistant.vue?vue&type=script&lang=js& */ 424);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _usageAssistant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _usageAssistant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _usageAssistant_vue_vue_type_style_index_0_id_4caf5410_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./usageAssistant.vue?vue&type=style&index=0&id=4caf5410&lang=scss&scoped=true& */ 426);
/* harmony import */ var _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _usageAssistant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _usageAssistant_vue_vue_type_template_id_4caf5410_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _usageAssistant_vue_vue_type_template_id_4caf5410_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4caf5410",
  null,
  false,
  _usageAssistant_vue_vue_type_template_id_4caf5410_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/mine/usageAssistant.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 422:
/*!*********************************************************************************************!*\
  !*** E:/learn/xxx/pages/mine/usageAssistant.vue?vue&type=template&id=4caf5410&scoped=true& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_template_id_4caf5410_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./usageAssistant.vue?vue&type=template&id=4caf5410&scoped=true& */ 423);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_template_id_4caf5410_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_template_id_4caf5410_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_template_id_4caf5410_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_template_id_4caf5410_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 423:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/learn/xxx/pages/mine/usageAssistant.vue?vue&type=template&id=4caf5410&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  uniCollapse: function() {
    return __webpack_require__.e(/*! import() | components/uni-collapse/uni-collapse */ "components/uni-collapse/uni-collapse").then(__webpack_require__.bind(null, /*! @/components/uni-collapse/uni-collapse.vue */ 707))
  },
  uniCollapseItem: function() {
    return __webpack_require__.e(/*! import() | components/uni-collapse-item/uni-collapse-item */ "components/uni-collapse-item/uni-collapse-item").then(__webpack_require__.bind(null, /*! @/components/uni-collapse-item/uni-collapse-item.vue */ 714))
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 424:
/*!***************************************************************************!*\
  !*** E:/learn/xxx/pages/mine/usageAssistant.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./usageAssistant.vue?vue&type=script&lang=js& */ 425);
/* harmony import */ var _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 425:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/learn/xxx/pages/mine/usageAssistant.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      itemStyle: {
        'color': '#00aaef',
        height: '100vh' },

      headerStyle: {
        'color': '#00aaef' },

      list: [
      {
        title: '热点问题',
        map: [
        {
          title: '1、如何使用APP绑定腕表？',
          content: '在家人页面点击菜单，添加设备，可以通过二维码或条形码扫码添加，无法识别可以通过手动数据设备IMEI码添加完成，完成设备绑定' },

        {
          title: '2、如何购买颐纳福腕表？',
          content: '在服务页面点击商城，选择你要购买的腕表，下单完成购物流程。' },

        {
          title: '3、积分有什么作用？',
          content: '你好，积分可以在颐纳福任何产品进行消费，1积分=0.01元。' },

        {
          title: '4、如何设置运动目标？',
          content: '在家人页面点击实时数据，选择运动选项卡点击设定目标，可根据你每天的运动进行设定。' },

        {
          title: '5、如何设置排行榜？',
          content: '在家人页面点击实时数据，选择运动选项卡点击排行榜。点击右上角设置默认搜索条件，也可以进行排行榜分享。' },

        {
          title: '6、如何使用微信进行登录？',
          content: '你好，请在登录页面选择其他登录方式，选择微信登录，即可进入微信登录入口。' }] },



      {
        title: '用户与成员问题',
        map: [
        {
          title: '1、如何创建成员？',
          content: '在家人页面点击联系人，点击添加家人，按照步骤完成。' },

        {
          title: '2、如何绑定成员？',
          content: '在家人页面点击联系人，右上角选择扫码添加或绑定家人，进行相关操作。' },

        {
          title: '3、成员权限转让？',
          content: '在家人页面点击联系人，左滑成员列表点击转让，选择你要转让的用户完成即可。(成员有主和副两种权限，主权限拥有对腕表的所有操作，副权限不能对腕表进行相关设置操作)' },

        {
          title: '4、如何删除成员？',
          content: '在家人页面点击联系人，左滑成员列表点击删除。（如果是已绑定腕表的主成员无法删除，先解除绑定后删除）' },

        {
          title: '5、多个APP用户如何关联一个成员？',
          content: '通过绑定家人和扫码添加关联成员。(一个APP最多可以拥有10个成员)' },

        {
          title: '6、如何查看其他成员信息？',
          content: '在家人页面点击成员头像左右两侧箭头切换成员，在联系人点击成员可以切换成员。' },

        {
          title: '7、如何修改登录密码？',
          content: '在我的页面点击用户头像，选择修改密码。' },

        {
          title: '8、如何注销账号？',
          content: '你好，注销账号后不能恢复，不能再用该手机号作为账号使用颐纳福相关产品。根据《中华人民共和国网络安全法》相关规定，颐纳福所有产品允许用户注销账户' }] },



      {
        title: '腕表使用与设置',
        map: [
        {
          title: '1、腕表如何进行设置？',
          content: '在家人页面点击腕表设置，可以增对具体设置项进行设置，APP3.0.1版本推出快捷设置方式，在每个实时数据选项卡右侧都有一个快捷设置按钮' },

        {
          title: '2、如何设置腕表紧急联系人？',
          content: '在家人页面点击腕表设置，选择SOS设置' },

        {
          title: '3、如何设置腕表通讯录？',
          content: '在家人页面点击腕表设置，选择通讯录。' },

        {
          title: '4、如何查看腕表定位信息？',
          content: '在家人页面点击定位，查看当前实时腕表定位数据和手机定位。' },

        {
          title: '5、如何设置安全围栏？',
          content: '在家人页面点击定位，点击右上角菜单，选择安全围栏。' },

        {
          title: '6、腕表数据如何查看？',
          content: '在家人页面点击实时数据，根据不同型号的腕表会采集相关的数据，共分为以下5种数据，运动、睡眠、心率、血压、血糖，根据佩戴情况，实时返回相关数据，还可以根据日期查看历史数据。' },

        {
          title: '7、什么是警报提醒？',
          content: '你好，警报提醒是针对成员用户绑定腕表后，采集超过预设值较高或者较低值时，推送提醒。(警报提醒分为心率、血压、血糖、范围、SOS)' },

        {
          title: '8、如何电话呼叫腕表？',
          content: '在家人页面点击电话呼叫，系统会打开拨号界面，进行电话呼叫操作。(电话呼叫需要预先设置物联网卡号，在家人页面点击腕表设置，选中腕表信息，修改物联网卡号即可)' }] },



      {
        title: '积分规则',
        map: [
        {
          title: '1、积分如何获取？',
          content: '积分可以通过做任务或者购买颐纳福产品得到。' },

        {
          title: '2、积分详情',
          ext: true,
          content: [
          '1、注册APP成为颐纳福会员，获得500积分。',
          '2、绑定腕表获得100积分。(每个成员第一次绑定腕表)',
          '3、商城购买商品，0.01元钱等于1积分',
          '4、佩戴腕表每日步数高于5000步以上，获得5积分',
          '5、APP客户端上传腕表佩戴者饮食，获得5积分',
          '6、浏览一条新闻获得5积分(不可重复获得)',
          '7、参加线下活动获得500积分',
          '8、子女与父母互动一次获得5积分(打电话)'] }] },




      {
        title: '其他问题',
        map: [
        {
          title: '1、忘记账号密码怎么办？',
          content: '你好，颐纳福APP采用的时候手机号作为你的登录账号，如果忘记密码，可以在登录页面点击忘记密码进行密码修改。' },

        {
          title: '2、如何联系客服反馈问题？',
          content: '你好，请你通过APP内的“意见反馈”将问题详细描述(最好有相关截图说明)联系我们，这样我们会定位到你的账户，客服会协助你进行处理。' }] }] };






  } };exports.default = _default;

/***/ }),

/***/ 426:
/*!************************************************************************************************************!*\
  !*** E:/learn/xxx/pages/mine/usageAssistant.vue?vue&type=style&index=0&id=4caf5410&lang=scss&scoped=true& ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_style_index_0_id_4caf5410_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./usageAssistant.vue?vue&type=style&index=0&id=4caf5410&lang=scss&scoped=true& */ 427);
/* harmony import */ var _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_style_index_0_id_4caf5410_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_style_index_0_id_4caf5410_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_style_index_0_id_4caf5410_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_style_index_0_id_4caf5410_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_long_Downloads_Compressed_HBuilderX_2_7_14_20200618_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_usageAssistant_vue_vue_type_style_index_0_id_4caf5410_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 427:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/learn/xxx/pages/mine/usageAssistant.vue?vue&type=style&index=0&id=4caf5410&lang=scss&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[420,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/usageAssistant.js.map