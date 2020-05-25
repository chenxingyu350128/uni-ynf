(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/uni-bottom-nav/uni-bottom-nav"],{

/***/ 310:
/*!*****************************************************************************!*\
  !*** E:/learn/uni-app/uni-ynf/components/uni-bottom-nav/uni-bottom-nav.vue ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uni_bottom_nav_vue_vue_type_template_id_c77d8ffa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uni-bottom-nav.vue?vue&type=template&id=c77d8ffa&scoped=true& */ 311);
/* harmony import */ var _uni_bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uni-bottom-nav.vue?vue&type=script&lang=js& */ 313);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _uni_bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _uni_bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _uni_bottom_nav_vue_vue_type_style_index_0_id_c77d8ffa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uni-bottom-nav.vue?vue&type=style&index=0&id=c77d8ffa&scoped=true&lang=scss& */ 315);
/* harmony import */ var _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _uni_bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _uni_bottom_nav_vue_vue_type_template_id_c77d8ffa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _uni_bottom_nav_vue_vue_type_template_id_c77d8ffa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "c77d8ffa",
  null,
  false,
  _uni_bottom_nav_vue_vue_type_template_id_c77d8ffa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "E:/learn/uni-app/uni-ynf/components/uni-bottom-nav/uni-bottom-nav.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 311:
/*!************************************************************************************************************************!*\
  !*** E:/learn/uni-app/uni-ynf/components/uni-bottom-nav/uni-bottom-nav.vue?vue&type=template&id=c77d8ffa&scoped=true& ***!
  \************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_template_id_c77d8ffa_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-bottom-nav.vue?vue&type=template&id=c77d8ffa&scoped=true& */ 312);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_template_id_c77d8ffa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_template_id_c77d8ffa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_template_id_c77d8ffa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_template_id_c77d8ffa_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 312:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/learn/uni-app/uni-ynf/components/uni-bottom-nav/uni-bottom-nav.vue?vue&type=template&id=c77d8ffa&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components = {
  "uni-icons": function() {
    return __webpack_require__.e(/*! import() | components/uni-icons/uni-icons */ "components/uni-icons/uni-icons").then(__webpack_require__.bind(null, /*! @/components/uni-icons/uni-icons.vue */ 275))
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var l0 = _vm.__map(_vm.list, function(item, index) {
    var s0 = _vm.__get_style([
      _vm.currentTabIndex == index
        ? {
            color: _vm.activeColor
          }
        : {
            color: _vm.inActiveColor
          }
    ])

    return {
      $orig: _vm.__get_orig(item),
      s0: s0
    }
  })

  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        l0: l0
      }
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 313:
/*!******************************************************************************************************!*\
  !*** E:/learn/uni-app/uni-ynf/components/uni-bottom-nav/uni-bottom-nav.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-bottom-nav.vue?vue&type=script&lang=js& */ 314);
/* harmony import */ var _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 314:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/learn/uni-app/uni-ynf/components/uni-bottom-nav/uni-bottom-nav.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
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
  name: 'uniBottomNav',
  // data() {
  // 		return {
  // 				tabList:
  // 				[
  // 						{
  // 								icon: 'mdi-home',
  // 								text: '首页',
  // 						},
  // 						{
  // 								icon: 'mdi-clock-outline',
  // 								text: '家人',
  // 						},
  // 						{
  // 								icon: 'mdi-room-service-outline',
  // 								text: '服务',
  // 						},
  // 						{
  // 								icon: 'mdi-account-circle',
  // 								text: '我的',
  // 						}
  // 				]
  // 		}
  // },
  props: {
    backgroundColor: {
      type: String,
      default: '#fbfbfb' },

    inActiveColor: {
      type: String,
      default: '#999' },

    activeColor: {
      type: String,
      default: '#00aaef' },

    height: {
      type: String,
      default: '45px' },

    list: {
      type: Array,
      default: [],
      required: true } },


  computed: {
    currentTabIndex: function currentTabIndex() {
      return this.$store.state.app.tabbarIndex;
    },
    tabList: function tabList() {
      return;
    } },

  methods: {
    switchTab: function switchTab(index) {
      console.log(index);
      console.log(this.currentTabIndex);
      if (this.currentTabIndex === index) {
        return;
      }
      this.$store.commit('SET_SINGLE_STATE', ['tabbarIndex', index]);
      var tabbarUrls = [
      '/pages/index/index',
      '/pages/family/family',
      '/pages/service/service',
      '/pages/mine/mine'];


      uni.navigateTo({

        url: tabbarUrls[this.currentTabIndex] });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 315:
/*!***************************************************************************************************************************************!*\
  !*** E:/learn/uni-app/uni-ynf/components/uni-bottom-nav/uni-bottom-nav.vue?vue&type=style&index=0&id=c77d8ffa&scoped=true&lang=scss& ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_2_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_style_index_0_id_c77d8ffa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./uni-bottom-nav.vue?vue&type=style&index=0&id=c77d8ffa&scoped=true&lang=scss& */ 316);
/* harmony import */ var _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_2_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_style_index_0_id_c77d8ffa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_2_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_style_index_0_id_c77d8ffa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_2_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_style_index_0_id_c77d8ffa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_2_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_style_index_0_id_c77d8ffa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_2_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Downloads_Compressed_HBuilderX_2_6_6_20200320_alpha_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_uni_bottom_nav_vue_vue_type_style_index_0_id_c77d8ffa_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 316:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-2!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/learn/uni-app/uni-ynf/components/uni-bottom-nav/uni-bottom-nav.vue?vue&type=style&index=0&id=c77d8ffa&scoped=true&lang=scss& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/uni-bottom-nav/uni-bottom-nav.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-bottom-nav/uni-bottom-nav-create-component',
    {
        'components/uni-bottom-nav/uni-bottom-nav-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(310))
        })
    },
    [['components/uni-bottom-nav/uni-bottom-nav-create-component']]
]);
