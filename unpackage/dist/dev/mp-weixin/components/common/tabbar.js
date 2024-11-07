(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/common/tabbar"],{

/***/ 742:
/*!**********************************************************************************************!*\
  !*** F:/code123/云贝全开源/【开源】云贝独立版VUE/前端/uniapp前端/用户端yb_小程序/yb_wm/components/common/tabbar.vue ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tabbar_vue_vue_type_template_id_329f8ed7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabbar.vue?vue&type=template&id=329f8ed7& */ 743);
/* harmony import */ var _tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tabbar.vue?vue&type=script&lang=js& */ 745);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 16);

var renderjs




/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _tabbar_vue_vue_type_template_id_329f8ed7___WEBPACK_IMPORTED_MODULE_0__["render"],
  _tabbar_vue_vue_type_template_id_329f8ed7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _tabbar_vue_vue_type_template_id_329f8ed7___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/common/tabbar.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 743:
/*!*****************************************************************************************************************************!*\
  !*** F:/code123/云贝全开源/【开源】云贝独立版VUE/前端/uniapp前端/用户端yb_小程序/yb_wm/components/common/tabbar.vue?vue&type=template&id=329f8ed7& ***!
  \*****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tabbar_vue_vue_type_template_id_329f8ed7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./tabbar.vue?vue&type=template&id=329f8ed7& */ 744);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tabbar_vue_vue_type_template_id_329f8ed7___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tabbar_vue_vue_type_template_id_329f8ed7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tabbar_vue_vue_type_template_id_329f8ed7___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tabbar_vue_vue_type_template_id_329f8ed7___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 744:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/code123/云贝全开源/【开源】云贝独立版VUE/前端/uniapp前端/用户端yb_小程序/yb_wm/components/common/tabbar.vue?vue&type=template&id=329f8ed7& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 745:
/*!***********************************************************************************************************************!*\
  !*** F:/code123/云贝全开源/【开源】云贝独立版VUE/前端/uniapp前端/用户端yb_小程序/yb_wm/components/common/tabbar.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./tabbar.vue?vue&type=script&lang=js& */ 746);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_tabbar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 746:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/code123/云贝全开源/【开源】云贝独立版VUE/前端/uniapp前端/用户端yb_小程序/yb_wm/components/common/tabbar.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;




















var _vuex = __webpack_require__(/*! vuex */ 18);



var _utils = _interopRequireDefault(__webpack_require__(/*! @/common/utils.js */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default2 =
{
  name: 'tabbar',
  props: {
    type: {
      type: Object,
      default: function _default() {
        return {
          message: 'hello' };

      } },

    ptype: {
      type: String,
      default: 'index' },

    color: { // small.normal
      type: String,
      default: '' } },


  data: function data() {
    return {};


  },
  computed: _objectSpread(_objectSpread({},
  (0, _vuex.mapState)({
    layout: function layout(state) {return state.layout.index.body && state.layout.index.body.menu;},
    cmlayout: function cmlayout(state) {return state.layout.custom.body && state.layout.custom.body.menu;},
    isshopdl: function isshopdl(state) {return state.config.isshopdl;} })), {}, {

    navbar: function navbar() {var _this = this;
      if (this.ptype == 'index' && !this.isshopdl) {
        if (getApp().globalData.tabbar) {
          // let nav = utils.deepCopy(getApp().globalData.tabbar),
          // 	a = !1
          // for (let i in nav.navs) nav.navs[i].link == '/' + this.pageroute ? (nav.navs[i].active = !0, a = !0) : nav.navs[i]
          // 	.active = !1;
          // if (a) {
          // 	this.$emit('refresh', true)
          // } else {
          // 	nav = null
          // }
          var nav = _utils.default.deepCopy(getApp().globalData.tabbar),
          index = nav.navs.findIndex(function (item) {return item.link == '/' + _this.util.getRoute();});
          if (index > -1) {
            nav.navs[index].active = true;
            this.$emit('refresh', true);
          } else {
            nav = null;
          }
          // console.log('navbarnavbarnavbar222', nav)
          return nav;
        } else {
          // console.log(this.layout)
          if (this.layout) {
            var _nav = {
              colorBg: '#fff',
              border_color: "rgba(0,0,0,0.05)",
              color: '#333',
              colorOff: '#888',
              navs: [] };

            if (this.layout[0] && this.layout[0].styles.imgUrl.length) {
              var laynav = this.layout[0].styles;
              _nav.colorBg = laynav.colorBg;
              _nav.border_color = laynav.colorLine;
              _nav.color = laynav.colorSelect;
              _nav.colorOff = laynav.colorUnselect;
              var arr = JSON.parse(JSON.stringify(laynav.imgUrl));
              // console.log(arr)
              for (var i in arr) {
                arr[i].icon = {
                  active: arr[i].front[0].img,
                  normal: arr[i].back[0].img };

                arr[i].link = this.changeUrl(arr[i].url);
                delete arr[i].front;
                delete arr[i].back;
                delete arr[i].url;
              }
              _nav.navs = arr;
            } else {
              _nav.navs = [{
                icon2: 'iconjiayuan',
                text: '首页',
                link: "/yb_wm/index/index" },

              {
                icon2: 'iconjiayuan',
                text: '点单',
                link: "/yb_wm/index/goods" },

              {
                icon2: 'iconjiayuan',
                text: '订单',
                link: "/yb_wm/index/order-index" },

              {
                icon2: 'iconjiayuan',
                text: '我的',
                link: "/yb_wm/index/my-index" }

              // {
              // 	icon2: 'iconjiayuan',
              // 	text: '客服',
              // 	link: "/yb_wm/my/other/kf"
              // },
              ];
            }
            _nav.navs.forEach(function (v) {
              v.t = v.link.indexOf('/index/') != -1 ? 6 : 1;
            });
            getApp().globalData.tabbar = _utils.default.deepCopy(_nav);
            var _index = _nav.navs.findIndex(function (item) {return item.link == '/' + _this.util.getRoute();});
            if (_index > -1) {
              _nav.navs[_index].active = true;
              this.$emit('refresh', true);
            } else {
              _nav = null;
            }
            // console.log(nav, index)
            return _nav;
          }
        }
        // } else if (this.isshopdl || this.ptype == 'shopdl') {
      } else if (this.ptype == 'custom') {
        if (this.cmlayout) {
          var _nav2 = {
            colorBg: '#fff',
            border_color: "rgba(0,0,0,0.05)",
            color: '#333',
            colorOff: '#888',
            navs: [] };

          if (this.cmlayout[0] && this.cmlayout[0].styles.imgUrl.length) {
            var _laynav = this.cmlayout[0].styles;
            _nav2.colorBg = _laynav.colorBg;
            _nav2.border_color = _laynav.colorLine;
            _nav2.color = _laynav.colorSelect;
            _nav2.colorOff = _laynav.colorUnselect;
            var _arr = _utils.default.deepCopy(_laynav.imgUrl);
            // console.log(arr)
            for (var _i in _arr) {
              _arr[_i].icon = {
                active: _arr[_i].front[0].img,
                normal: _arr[_i].back[0].img };

              _arr[_i].link = this.changeUrl(_arr[_i].url);
              delete _arr[_i].front;
              delete _arr[_i].back;
              delete _arr[_i].url;
            }
            _nav2.navs = _arr;
          } else {
            _nav2.navs = [{
              icon2: 'iconjiayuan',
              text: '首页',
              link: "/yb_wm/index/index" },

            {
              icon2: 'iconjiayuan',
              text: '订单',
              link: "/yb_wm/index/order-index" },

            {
              icon2: 'iconjiayuan',
              text: '我的',
              link: "/yb_wm/index/my-index" }];


          }
          _nav2.navs.forEach(function (v) {
            v.t = v.link.indexOf('/index/') != -1 ? 6 : 1;
          });
          var _index2 = _nav2.navs.findIndex(function (item) {return item.link == '/' + _this.util.getRoute();});
          if (_index2 > -1) {
            _nav2.navs[_index2].active = true;
            this.$emit('refresh', true);
          }
          return _nav2;
        }
      }
    } }),

  methods: {
    goPage: _utils.default.throttle(function (e) {
      // console.log(this.pageroute)
      if (e[0].active) return;
      var t = e[0].t == 6 ? 6 : this.pageroute.indexOf('/index/') > -1 ? 1 : 2;
      this.go({
        t: t,
        url: e[0].link });

      // return
      // if (this.ptype == 'index') {
      // 	this.go({
      // 		t: 2,
      // 		url: v.link
      // 	})
      // } else {
      // 	if (this.system.pattern == 1) { //平台
      // 		this.go({
      // 			t: i == 0 && getCurrentPages().length > 1 ? 4 : 2,
      // 			url: v.link
      // 		})
      // 	} else {
      // 		this.go({
      // 			t: 2,
      // 			url: v.link
      // 		})
      // 	}

      // }
    }, 500) },

  // mounted() {
  //


  // },
  created: function created() {
    this.pageroute = this.util.getRoute();
    // console.log('111')
    uni.hideTabBar();
  } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/common/tabbar.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/common/tabbar-create-component',
    {
        'components/common/tabbar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(742))
        })
    },
    [['components/common/tabbar-create-component']]
]);
