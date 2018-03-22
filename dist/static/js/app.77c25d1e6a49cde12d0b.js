webpackJsonp([2],{

/***/ "6Fs6":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "ILH5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../static/js/neo-ts.d.ts"/>
var vue_1 = __webpack_require__("/5sW");
var vue_property_decorator_1 = __webpack_require__("EOM2");
var Main_vue_1 = __webpack_require__("l7Tq");
var neotools_1 = __webpack_require__("PMwo");
var login = /** @class */ (function (_super) {
    __extends(login, _super);
    function login() {
        var _this = _super.call(this) || this;
        // Data property
        _this.Message = "hello world";
        _this.wallet = new ThinNeo.nep6wallet();
        _this.filename = "";
        _this.password = "";
        _this.reader = new FileReader();
        _this.reader.onload = function () {
            var walletstr = _this.reader.result;
            _this.wallet.fromJsonStr(walletstr);
            for (var i = 0; i < _this.wallet.accounts.length; i++) {
                mui.alert(_this.wallet.accounts[i].address);
            }
        };
        return _this;
    }
    // Lifecycle hook
    login.prototype.fileChange = function ($event) {
        this.file = $event.target.files[0];
        this.filename = this.file.name;
        if (this.filename.includes(".json")) {
            this.reader.readAsText(this.file);
        }
    };
    login.prototype.login = function () {
        var _this = this;
        neotools_1.neotools.nep6Load(this.wallet, this.password)
            .then(function (res) {
            mui.alert("登陆成功");
            _this.loadKeys = res.result;
        })
            .catch(function (e) {
            mui.alert(e);
        });
    };
    login.prototype.modual = function (type) {
        var mask = mui.createMask(function (call) {
        }); //callback为用户点击蒙版时自动执行的回调；
        mask.show(); //显示遮罩
        // mask.close();//关闭遮罩
    };
    login.prototype.wifImport = function () {
    };
    login.prototype.nep2Import = function () {
    };
    login = __decorate([
        vue_property_decorator_1.Component({
            components: {
                "main-layout": Main_vue_1.default,
            }
        }),
        __metadata("design:paramtypes", [])
    ], login);
    return login;
}(vue_1.default));
exports.default = login;


/***/ }),

/***/ "Luci":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/login.ts
var login = __webpack_require__("ILH5");
var login_default = /*#__PURE__*/__webpack_require__.n(login);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4037e9bb","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/login.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main-layout',[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v("\n      Login your wallet\n    ")])]),_vm._v(" "),_c('div',{staticStyle:{"height":"56px","width":"417px","margin":"0 auto"}},[_c('div',{staticClass:"input-group",staticStyle:{"height":"56px"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filename),expression:"filename"}],staticClass:"form-control",staticStyle:{"height":"56px"},attrs:{"type":"text","disabled":"true"},domProps:{"value":(_vm.filename)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filename=$event.target.value}}}),_vm._v(" "),_c('span',{staticClass:"input-group-addon"},[_c('button',{staticClass:"btn btn-nel fileinput-button"},[_c('span',[_vm._v("Select")]),_vm._v(" "),_c('input',{attrs:{"type":"file"},on:{"change":_vm.fileChange}})])])])]),_vm._v(" "),_c('div',{staticStyle:{"height":"56px","width":"417px","margin":"0 auto","padding-top":"40px"}},[_c('div',{staticClass:"input-group",staticStyle:{"height":"56px"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"form-control",staticStyle:{"height":"56px"},attrs:{"type":"password"},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value}}}),_vm._v(" "),_c('span',{staticClass:"input-group-addon"},[_c('button',{staticClass:"btn btn-nel fileinput-button",on:{"click":_vm.login}},[_vm._v("\n            Login\n        ")])])])]),_vm._v(" "),_c('div',{staticStyle:{"height":"36px","padding-top":"80px","padding-bottom":"30px","text-align":"center"}},[_vm._v("or you can")]),_vm._v(" "),_c('div',{staticStyle:{"width":"417px","margin":"0 auto","padding-top":"30px"}},[_c('button',{staticClass:"btn btn-nel btn-import"},[_vm._v("Import key from WIF String ")])]),_vm._v(" "),_c('div',{staticStyle:{"width":"417px","margin":"0 auto","padding-top":"20px"}},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":function($event){_vm.modual('nep2')}}},[_vm._v("Import key from nep2 String ")])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var pages_login = (esExports);
// CONCATENATED MODULE: ./src/pages/login.vue
function injectStyle (ssrContext) {
  __webpack_require__("d2qE")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  login_default.a,
  pages_login,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_pages_login = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "PMwo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path="../../static/js/neo-ts.d.ts"/>
var neotools = /** @class */ (function () {
    function neotools() {
    }
    /**
     * verifyPublicKey 验证公钥
     * @param publicKey 公钥
     */
    neotools.verifyPublicKey = function (publicKey) {
        var array = Neo.Cryptography.Base58.decode(publicKey);
        //var hexstr = array.toHexString();
        //var salt = array.subarray(0, 1);
        //var hash = array.subarray(1, 1 + 20);
        var check = array.subarray(21, 21 + 4); //
        var checkdata = array.subarray(0, 21); //
        var hashd = Neo.Cryptography.Sha256.computeHash(checkdata); //
        hashd = Neo.Cryptography.Sha256.computeHash(hashd); //
        var hashd = hashd.slice(0, 4); //
        var checked = new Uint8Array(hashd); //
        var error = false;
        for (var i = 0; i < 4; i++) {
            if (checked[i] != check[i]) {
                error = true;
                break;
            }
        }
        return !error;
    };
    /**
     * wifDecode wif解码
     * @param wif wif私钥
     */
    neotools.wifDecode = function (wif) {
        var result = { err: false, result: { pubkey: Uint8Array, prikey: Uint8Array, address: "" } };
        var prikey;
        var pubkey;
        var address;
        try {
            prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
            var hexstr = prikey.toHexString();
            result.result.prikey = hexstr;
        }
        catch (e) {
            result.err = true;
            result.result = e.message;
            return result;
        }
        try {
            pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
            var hexstr = pubkey.toHexString();
            result.result.pubkey = hexstr;
        }
        catch (e) {
            result.err = true;
            result.result = e.message;
            return result;
        }
        try {
            address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
            result.result.address = address;
        }
        catch (e) {
            result.err = true;
            result.result = e.message;
            return result;
        }
        return result;
    };
    /**
     * nep2FromWif
     */
    neotools.nep2FromWif = function (wif, password) {
        var prikey;
        var pubkey;
        var address;
        var res = { err: false, result: { address: "", nep2: "" } };
        try {
            prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
            var n = 16384;
            var r = 8;
            var p = 8;
            ThinNeo.Helper.GetNep2FromPrivateKey(prikey, password, n, r, p, function (info, result) {
                res.err = false;
                res.result.nep2 = result;
                pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
                var hexstr = pubkey.toHexString();
                address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                res.result.address = address;
                return res;
            });
        }
        catch (e) {
            res.err = true;
            res.result = e.message;
            return res;
        }
    };
    /**
     * nep2TOWif
     */
    neotools.nep2ToWif = function (nep2, password) {
        return __awaiter(this, void 0, void 0, function () {
            var prikey, pubkey, address, promise;
            return __generator(this, function (_a) {
                promise = new Promise(function (resolve, reject) {
                    var n = 16384;
                    var r = 8;
                    var p = 8;
                    ThinNeo.Helper.GetPrivateKeyFromNep2(nep2, password, n, r, p, function (info, result) {
                        //spanNep2.textContent = "info=" + info + " result=" + result;
                        console.log("result=" + "info=" + info + " result=" + result);
                        prikey = result;
                        if (prikey != null) {
                            var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
                            var address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                            var wif = ThinNeo.Helper.GetWifFromPrivateKey(prikey);
                            console.log('1:' + address);
                            resolve({ err: false, result: { pubkey: pubkey, address: address, prikey: prikey } });
                        }
                        else {
                            // spanWif.textContent = "result=" + "info=" + info + " result=" + result;
                            reject({ err: false, result: result });
                        }
                    });
                });
                return [2 /*return*/, promise];
            });
        });
    };
    /**
     * nep6Load
     */
    neotools.nep6Load = function (wallet, password) {
        return __awaiter(this, void 0, void 0, function () {
            var istart, res, arr, keyindex, account, result_1, error_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        istart = 0;
                        res = new result();
                        arr = new Array();
                        keyindex = 0;
                        _a.label = 1;
                    case 1:
                        if (!(keyindex < wallet.accounts.length)) return [3 /*break*/, 6];
                        account = wallet.accounts[keyindex];
                        if (account.nep2key == null) {
                            return [3 /*break*/, 5];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, neotools.getPriKeyfromAccount(wallet.scrypt, password, account)];
                    case 3:
                        result_1 = _a.sent();
                        console.log("getpkformacc:" + result_1);
                        arr.push(result_1.result);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        res.err = true;
                        res.result = error_1;
                        return [2 /*return*/, res];
                    case 5:
                        keyindex++;
                        return [3 /*break*/, 1];
                    case 6:
                        res.err = false;
                        res.result = arr;
                        return [2 /*return*/, res];
                    case 7:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * getPriKeyform
     */
    neotools.getPriKeyfromAccount = function (scrypt, password, account) {
        return __awaiter(this, void 0, void 0, function () {
            var res, promise;
            return __generator(this, function (_a) {
                res = new result();
                promise = new Promise(function (resolve, reject) {
                    account.getPrivateKey(scrypt, password, function (info, result) {
                        if (info == "finish") {
                            var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(result);
                            var address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                            var wif = ThinNeo.Helper.GetWifFromPrivateKey(result);
                            var hexkey = result.toHexString();
                            console.log(info + "|" + address + " wif=" + wif);
                            res.err = false;
                            res.result = { pubkey: pubkey, address: address, prikey: result };
                            resolve(res);
                        }
                        else {
                            // info2.textContent += info + "|" + result;
                            reject({ err: true, result: result });
                        }
                    });
                });
                return [2 /*return*/, promise];
            });
        });
    };
    return neotools;
}());
exports.neotools = neotools;
var result = /** @class */ (function () {
    function result() {
    }
    return result;
}());
exports.result = result;


/***/ }),

/***/ "PtCc":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "UZAB":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "d2qE":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "l7Tq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/VLink.vue
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

/* harmony default export */ var VLink = ({
  props: {
    href: {
      type: String,
      required: true
    }
  },
  computed: {
    isActive() {
      return this.href === this.$root.currentRoute;
    }
  },
  methods: {
    go(event) {
      event.preventDefault();
      this.$root.currentRoute = this.href;
      window.history.pushState(null, this.href, window.location.pathname + this.href);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0a8239e6","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/VLink.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{class:{ active: _vm.isActive },attrs:{"href":_vm.href},on:{"click":_vm.go}},[_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_VLink = (esExports);
// CONCATENATED MODULE: ./src/components/VLink.vue
function injectStyle (ssrContext) {
  __webpack_require__("6Fs6")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0a8239e6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  VLink,
  components_VLink,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_VLink = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/layouts/Main.vue
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
//



/* harmony default export */ var Main = ({
  components: {
    VLink: src_components_VLink
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-b65a4632","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/layouts/Main.vue
var Main_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_c('nav',{staticClass:"navbar navbar-nel navbar-fixed-top"},[_c('div',{staticClass:"container"},[_vm._m(0,false,false),_vm._v(" "),_c('div',{staticClass:"navbar-collapse collapse",attrs:{"id":"navbar"}},[_c('ul',{staticClass:"nav navbar-nav navbar-left"},[_c('li',[_c('v-link',{attrs:{"href":"#explorer"}},[_vm._v("Explorer")])],1),_vm._v(" "),_c('li',[_c('v-link',{attrs:{"href":"#wallet"}},[_vm._v("Wallet")])],1)]),_vm._v(" "),_c('ul',{staticClass:"nav navbar-nav navbar-right"},[_c('li',[_c('v-link',{attrs:{"href":"#login"}},[_vm._v("login")])],1),_vm._v(" "),_c('li',[_c('v-link',{attrs:{"href":"#generate"}},[_vm._v("Generate")])],1)])])])]),_vm._v(" "),_vm._t("default")],2)}
var Main_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"navbar-header"},[_c('button',{staticClass:"navbar-toggle collapsed",attrs:{"type":"button","data-toggle":"collapse","data-target":"#navbar","aria-expanded":"false","aria-controls":"navbar"}},[_c('span',{staticClass:"sr-only"},[_vm._v("Toggle navigation")]),_vm._v(" "),_c('span',{staticClass:"icon-bar"}),_vm._v(" "),_c('span',{staticClass:"icon-bar"}),_vm._v(" "),_c('span',{staticClass:"icon-bar"})]),_vm._v(" "),_c('a',{staticClass:"navbar-brand",attrs:{"href":"#"}},[_vm._v("NEL")])])}]
var Main_esExports = { render: Main_render, staticRenderFns: Main_staticRenderFns }
/* harmony default export */ var layouts_Main = (Main_esExports);
// CONCATENATED MODULE: ./src/layouts/Main.vue
function Main_injectStyle (ssrContext) {
  __webpack_require__("UZAB")
}
var Main_normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var Main___vue_template_functional__ = false
/* styles */
var Main___vue_styles__ = Main_injectStyle
/* scopeId */
var Main___vue_scopeId__ = "data-v-b65a4632"
/* moduleIdentifier (server only) */
var Main___vue_module_identifier__ = null
var Main_Component = Main_normalizeComponent(
  Main,
  layouts_Main,
  Main___vue_template_functional__,
  Main___vue_styles__,
  Main___vue_scopeId__,
  Main___vue_module_identifier__
)

/* harmony default export */ var src_layouts_Main = __webpack_exports__["default"] = (Main_Component.exports);


/***/ }),

/***/ "t1su":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __webpack_require__("/5sW");
var vue_property_decorator_1 = __webpack_require__("EOM2");
var Main_vue_1 = __webpack_require__("l7Tq");
var axios_1 = __webpack_require__("mtWM");
var home = /** @class */ (function (_super) {
    __extends(home, _super);
    function home() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Data property
        _this.Message = "hello world";
        return _this;
    }
    home.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.post("/user/login", this.$data)];
                    case 1:
                        rt = _a.sent();
                        console.log(rt.data);
                        return [2 /*return*/];
                }
            });
        });
    };
    // Lifecycle hook
    home.prototype.mounted = function () {
        mui.toast("mouted");
    };
    // Component method
    home.prototype.updateMyProperty = function ($event) {
    };
    home = __decorate([
        vue_property_decorator_1.Component({
            components: {
                "main-layout": Main_vue_1.default
            }
        })
    ], home);
    return home;
}(vue_1.default));
exports.default = home;


/***/ }),

/***/ "vkyI":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/home.ts
var home = __webpack_require__("t1su");
var home_default = /*#__PURE__*/__webpack_require__.n(home);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3f07993f","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/home.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main-layout',[_c('p',[_vm._v("Home page")]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.Message))]),_vm._v(" "),_c('button',{on:{"click":_vm.login}},[_vm._v("login")])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var pages_home = (esExports);
// CONCATENATED MODULE: ./src/pages/home.vue
function injectStyle (ssrContext) {
  __webpack_require__("PtCc")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3f07993f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  home_default.a,
  pages_home,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_pages_home = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "x35b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __webpack_require__("/5sW");
var home_vue_1 = __webpack_require__("vkyI");
var login_vue_1 = __webpack_require__("Luci");
vue_1.default.config.productionTip = false;
var notFound = vue_1.default.component('notFound', function (resolve) { return __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("c5Mg")]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe); });
var app = new vue_1.default({
    el: '#app',
    data: {
        currentRoute: window.location.hash
    },
    computed: {
        ViewComponent: function () {
            switch (this.currentRoute) {
                case "#wallet":
                    return home_vue_1.default;
                case "#login":
                    return login_vue_1.default;
            }
            return notFound;
        }
    },
    render: function (h) {
        return h(this.ViewComponent);
    }
});
window.addEventListener('popstate', function () {
    app.currentRoute = window.location.hash;
});


/***/ })

},["x35b"]);