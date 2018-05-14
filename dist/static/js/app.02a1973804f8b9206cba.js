webpackJsonp([1],{

/***/ "+jyM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/Spinner.vue
var Spinner = __webpack_require__("8Qnm");
var Spinner_default = /*#__PURE__*/__webpack_require__.n(Spinner);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-fb1f7dbc","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Spinner.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"spinner-wrap",class:_vm.isbig?'spinner-big':''},[_vm._m(0,false,false)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"spinner"},[_c('div',{staticClass:"spinner-container container1"},[_c('div',{staticClass:"circle1"}),_vm._v(" "),_c('div',{staticClass:"circle2"}),_vm._v(" "),_c('div',{staticClass:"circle3"}),_vm._v(" "),_c('div',{staticClass:"circle4"})]),_vm._v(" "),_c('div',{staticClass:"spinner-container container2"},[_c('div',{staticClass:"circle1"}),_vm._v(" "),_c('div',{staticClass:"circle2"}),_vm._v(" "),_c('div',{staticClass:"circle3"}),_vm._v(" "),_c('div',{staticClass:"circle4"})]),_vm._v(" "),_c('div',{staticClass:"spinner-container container3"},[_c('div',{staticClass:"circle1"}),_vm._v(" "),_c('div',{staticClass:"circle2"}),_vm._v(" "),_c('div',{staticClass:"circle3"}),_vm._v(" "),_c('div',{staticClass:"circle4"})])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_Spinner = (esExports);
// CONCATENATED MODULE: ./src/components/Spinner.vue
function injectStyle (ssrContext) {
  __webpack_require__("cz4m")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-fb1f7dbc"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  Spinner_default.a,
  components_Spinner,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_Spinner = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "+mP0":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "2Gf+":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "2xXY":
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
var cointool_1 = __webpack_require__("pLPz");
var entity_1 = __webpack_require__("6nHw");
var storagetool_1 = __webpack_require__("5LD5");
var vue_1 = __webpack_require__("/5sW");
var vue_property_decorator_1 = __webpack_require__("EOM2");
var wallet_vue_1 = __webpack_require__("PPZq");
var Spinner_vue_1 = __webpack_require__("+jyM");
var wwwtool_1 = __webpack_require__("50aY");
var balance = /** @class */ (function (_super) {
    __extends(balance, _super);
    function balance() {
        var _this = _super.call(this) || this;
        _this.currentAddress = "";
        _this.chooseAddress = "";
        _this.loadmsg = "";
        _this.claimbtn = true;
        _this.neoasset = new entity_1.NeoAsset();
        _this.balances = new Array();
        _this.neoasset.gas = 0;
        _this.neoasset.neo = 0;
        _this.neoasset.claim = '';
        _this.chooseAddressarr = new Array();
        _this.chooseAddressarr = storagetool_1.StorageTool.getLoginArr();
        return _this;
    }
    // Component method
    balance.prototype.mounted = function () {
        var _this = this;
        this.currentAddress = entity_1.LoginInfo.getCurrentAddress();
        this.getBalances();
        setInterval(function () { _this.getBalances(); }, 30000);
    };
    balance.prototype.addressSwitch = function () {
        entity_1.LoginInfo.setCurrentAddress(this.chooseAddress);
        this.currentAddress = this.chooseAddress;
        this.getBalances();
    };
    //获取余额
    balance.prototype.getBalances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var balances, clamis, clamis2, nep5balances, height, sum1, sum2, sum, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cointool_1.CoinTool.initAllAsset();
                        return [4 /*yield*/, wwwtool_1.WWW.api_getBalance(this.currentAddress)];
                    case 1:
                        balances = _b.sent();
                        return [4 /*yield*/, wwwtool_1.WWW.api_getclaimgas(this.currentAddress, 0)];
                    case 2:
                        clamis = _b.sent();
                        return [4 /*yield*/, wwwtool_1.WWW.api_getclaimgas(this.currentAddress, 1)];
                    case 3:
                        clamis2 = _b.sent();
                        return [4 /*yield*/, wwwtool_1.WWW.api_getnep5Balance(this.currentAddress)];
                    case 4:
                        nep5balances = _b.sent();
                        return [4 /*yield*/, wwwtool_1.WWW.api_getHeight()];
                    case 5:
                        height = _b.sent();
                        this.neoasset.neo = 0;
                        this.neoasset.gas = 0;
                        if (balances) {
                            sum1 = Neo.Fixed8.parse(clamis["gas"].toFixed(8));
                            sum2 = Neo.Fixed8.parse(clamis2["gas"].toFixed(8));
                            sum = sum1.add(sum2).toString();
                            this.neoasset.claim = sum; //塞入claim
                        }
                        balances.forEach //取NEO 和GAS
                        (function (balance) {
                            if (balance.asset == cointool_1.CoinTool.id_NEO) {
                                _this.neoasset.neo = balance.balance;
                            }
                            if (balance.asset == cointool_1.CoinTool.id_GAS) {
                                _this.neoasset.gas = balance.balance;
                            }
                        });
                        _a = this;
                        return [4 /*yield*/, entity_1.BalanceInfo.getBalancesByArr(balances, nep5balances, height)];
                    case 6:
                        _a.balances = _b.sent();
                        storagetool_1.StorageTool.setStorage("balances_asset", JSON.stringify(this.balances));
                        return [2 /*return*/];
                }
            });
        });
    };
    balance.prototype.toClaimGas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, res, txid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Neo.Fixed8.parse(this.neoasset.claim).compareTo(Neo.Fixed8.Zero) > 0)) return [3 /*break*/, 4];
                        if (!(this.neoasset.neo > 0)) return [3 /*break*/, 2];
                        this.claimbtn = false;
                        this.loadmsg = "Sending NEO to account address…";
                        return [4 /*yield*/, cointool_1.CoinTool.rawTransaction(this.currentAddress, cointool_1.CoinTool.id_NEO, this.neoasset.neo.toString())];
                    case 1:
                        res = _a.sent();
                        if (res.info) {
                            this.loadmsg = "Waiting for confirmation of transfer…";
                            this.queryNEOTx(res.info);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        this.loadmsg = "Claiming GAS…";
                        return [4 /*yield*/, cointool_1.CoinTool.claimGas()];
                    case 3:
                        res = _a.sent();
                        if (res["sendrawtransactionresult"]) {
                            txid = res["txid"];
                            this.queryClaimTx(txid);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    balance.prototype.queryNEOTx = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var res, result, txid_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, wwwtool_1.WWW.getrawtransaction(txid)];
                            case 1:
                                res = _a.sent();
                                if (!res) {
                                    this.queryNEOTx(txid);
                                    return [2 /*return*/];
                                }
                                this.loadmsg = "Claiming GAS…";
                                return [4 /*yield*/, cointool_1.CoinTool.claimGas()];
                            case 2:
                                result = _a.sent();
                                if (result["sendrawtransactionresult"]) {
                                    txid_1 = result["txid"];
                                    this.queryClaimTx(txid_1);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }, 20000);
                return [2 /*return*/];
            });
        });
    };
    balance.prototype.queryClaimTx = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, wwwtool_1.WWW.getrawtransaction(txid)];
                            case 1:
                                res = _a.sent();
                                if (res) {
                                    this.loadmsg = "Your GAS claim is successful!";
                                    this.claimbtn = true;
                                    this.getBalances();
                                    return [2 /*return*/];
                                }
                                this.queryClaimTx(txid);
                                return [2 /*return*/];
                        }
                    });
                }); }, 20000);
                return [2 /*return*/];
            });
        });
    };
    balance.prototype.toTransfer = function (asset) {
        storagetool_1.StorageTool.setStorage("transfer_choose", asset);
        window.location.hash = "#transfer";
    };
    balance = __decorate([
        vue_property_decorator_1.Component({
            components: {
                "wallet-layout": wallet_vue_1.default,
                "spinner-wrap": Spinner_vue_1.default
            }
        }),
        __metadata("design:paramtypes", [])
    ], balance);
    return balance;
}(vue_1.default));
exports.default = balance;


/***/ }),

/***/ "4+Dl":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,DQo8c3ZnIHdpZHRoPSI0MHB4IiBoZWlnaHQ9IjQ4cHgiIHZpZXdCb3g9IjAgMCA0MCA0OCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5ICg1MTAwMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+DQogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iMTkuOTYzNTM0MSUiIHkxPSI3Mi40OTU5MTc2JSIgeDI9IjEwMCUiIHkyPSIyMC4wMzA4OTgxJSIgaWQ9ImxpbmVhckdyYWRpZW50LTEiPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgb2Zmc2V0PSIwJSI+PC9zdG9wPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+DQogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+DQogICAgPC9kZWZzPg0KICAgIDxnIGlkPSLnmbvpmYbms6jlhow1IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9IummlumhtSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI4MC4wMDAwMDAsIC0xNzQuMDAwMDAwKSI+DQogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjA1LjAwMDAwMCwgMTQ0LjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3NS4wMDAwMDAsIDMwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMC43Mzg1ODY3NjgsOC4zNTgxMTQzNiBMMjMuOTU3NDUxNiwwIEwzOS42MzI5OTYsNy41MTU4NjEyNSBMMTYuNDk1ODE3OCwxNS44NjU1MTM0IEwwLjczODU4Njc2OCw4LjM1ODExNDM2IFogTTIzLjUwNzQ4MjMsMzEuNTk4NTkxNCBMMjMuNTA3NDgyMywxMy45OTY1NDc4IEw0MCw4LjI5NjkwMzY4IEw0MCwzOS41MDgxODcxIEwyMy41MDc0ODIzLDMxLjU5ODU5MTQgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjZmZmIj48L3BhdGg+DQogICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTIiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMSkiIHBvaW50cz0iMCAzOS45ODY2ODggMCA4Ljg2Njk5MjcgMTUuOTg5OTA2NiAxNi40MjQ4Nzc4IDE1Ljk4OTkwNjYgNDcuMzUxNzM5NyI+PC9wb2x5Z29uPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg=="

/***/ }),

/***/ "48oz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DateTool = /** @class */ (function () {
    function DateTool() {
    }
    /**************************************时间格式化处理************************************/
    DateTool.dateFtt = function (fmt, date) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    return DateTool;
}());
exports.DateTool = DateTool;


/***/ }),

/***/ "50aY":
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
var WWW = /** @class */ (function () {
    function WWW() {
    }
    WWW.makeRpcUrl = function (url, method) {
        var _params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            _params[_i - 2] = arguments[_i];
        }
        if (url[url.length - 1] != '/')
            url = url + "/";
        var urlout = url + "?jsonrpc=2.0&id=1&method=" + method + "&params=[";
        for (var i = 0; i < _params.length; i++) {
            urlout += JSON.stringify(_params[i]);
            if (i != _params.length - 1)
                urlout += ",";
        }
        urlout += "]";
        return urlout;
    };
    WWW.makeRpcPostBody = function (method) {
        var _params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            _params[_i - 1] = arguments[_i];
        }
        var body = {};
        body["jsonrpc"] = "2.0";
        body["id"] = 1;
        body["method"] = method;
        var params = [];
        for (var i = 0; i < _params.length; i++) {
            params.push(_params[i]);
        }
        body["params"] = params;
        return body;
    };
    WWW.gettransbyaddress = function (address, pagesize, pageindex) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("gettransbyaddress", address, pagesize, pageindex);
                        return [4 /*yield*/, fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    WWW.api_getHeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r, height;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "getblockcount");
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        height = parseInt(r[0]["blockcount"]) - 1;
                        return [2 /*return*/, height];
                }
            });
        });
    };
    WWW.api_getBlockInfo = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r, height;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "getblocktime");
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        height = parseInt(r[0]["blockcount"]) - 1;
                        return [2 /*return*/, height];
                }
            });
        });
    };
    WWW.api_getAllAssets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "getallasset");
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    WWW.api_getUTXO = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "getutxo", address);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    WWW.api_getnep5Balance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "getallnep5assetofaddress", address, 1);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    WWW.api_getBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var str, value, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "getbalance", address);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        value = _a.sent();
                        return [4 /*yield*/, value.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    WWW.getNep5Asset = function (asset) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("getnep5asset", asset);
                        return [4 /*yield*/, fetch(WWW.api, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    WWW.api_getAddressTxs = function (address, size, page) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("getaddresstxs", address, size, page);
                        return [4 /*yield*/, fetch(WWW.api, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    WWW.api_postRawTransaction = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("sendrawtransaction", data.toHexString());
                        return [4 /*yield*/, fetch(WWW.api, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    WWW.api_getclaimgas = function (address, type) {
        return __awaiter(this, void 0, void 0, function () {
            var str, str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type)
                            str = WWW.makeRpcUrl(WWW.api, "getclaimgas", address, type);
                        else
                            str = WWW.makeRpcUrl(WWW.api, "getclaimgas", address);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        if (r == undefined)
                            return [2 /*return*/, 0];
                        return [2 /*return*/, r[0]];
                }
            });
        });
    };
    WWW.api_getclaimtxhex = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "getclaimtxhex", address);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        if (r == undefined)
                            return [2 /*return*/, ""];
                        return [2 /*return*/, r[0]["claimtxhex"]];
                }
            });
        });
    };
    WWW.rpc_getHeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r, height;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "getblockcount");
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        height = parseInt(r) - 1;
                        return [2 /*return*/, height];
                }
            });
        });
    };
    WWW.rpc_getStorage = function (scripthash, key) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "getstorage", scripthash.toHexString(), key.toHexString());
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"] == null)
                            return [2 /*return*/, null];
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    WWW.rpc_getInvokescript = function (scripthash) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "invokescript", scripthash.toHexString());
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"] == null)
                            return [2 /*return*/, null];
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    WWW.getrawtransaction = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "getrawtransaction", txid);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (!json["result"])
                            return [2 /*return*/, null];
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    //注册域名时塞值
    WWW.setnnsinfo = function (address, name, time) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.apiaggr, "setnnsinfo", address, name, time);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"] == null)
                            return [2 /*return*/, null];
                        r = json["result"][0]["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    //获取地址下所有的域名
    WWW.getnnsinfo = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.apiaggr, "getnnsinfo", address);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"] == null)
                            return [2 /*return*/, null];
                        r = json["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    WWW.delnnsinfo = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.apiaggr, "delnnsinfo", domain);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"] == null)
                            return [2 /*return*/, null];
                        r = json["result"][0]["result"];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    WWW.api = "https://api.nel.group/api/testnet";
    WWW.apiaggr = "https://apiaggr.nel.group/api/testnet";
    return WWW;
}());
exports.WWW = WWW;


/***/ }),

/***/ "5LD5":
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
var entity_1 = __webpack_require__("6nHw");
var wwwtool_1 = __webpack_require__("50aY");
var cointool_1 = __webpack_require__("pLPz");
var StorageTool = /** @class */ (function () {
    function StorageTool() {
    }
    StorageTool.getLoginArr = function () {
        var message = sessionStorage.getItem("login-info-arr");
        var arr = message ? entity_1.LoginInfo.StringToArray(message) : [];
        return arr;
    };
    StorageTool.setLoginArr = function (value) {
        sessionStorage.setItem('login-info-arr', entity_1.LoginInfo.ArrayToString(value));
    };
    StorageTool.setStorage = function (key, value) {
        sessionStorage.setItem(key, value);
    };
    StorageTool.getStorage = function (key) {
        return sessionStorage.getItem(key);
    };
    StorageTool.delStorage = function (key) {
        sessionStorage.removeItem(key);
    };
    StorageTool.heightRefresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var oldheight, height;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldheight = StorageTool.getStorage("block-height");
                        return [4 /*yield*/, wwwtool_1.WWW.api_getHeight()];
                    case 1:
                        height = _a.sent();
                        if (oldheight == undefined || oldheight == null || oldheight == "") {
                            StorageTool.setStorage("block-height", height.toString());
                        }
                        if (height - parseInt(oldheight) >= 2) {
                            StorageTool.utxosRefresh();
                            StorageTool.setStorage('block-height', height.toString());
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    StorageTool.utxosRefresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cointool_1.CoinTool.getassets()];
                    case 1:
                        assets = _a.sent();
                        entity_1.UTXO.setAssets(assets);
                        return [2 /*return*/];
                }
            });
        });
    };
    return StorageTool;
}());
exports.StorageTool = StorageTool;
var StaticStore = /** @class */ (function () {
    function StaticStore() {
    }
    StaticStore.setAsset = function (asset) {
        StaticStore.choiceAsset = asset;
    };
    StaticStore.choiceAsset = "";
    return StaticStore;
}());
exports.StaticStore = StaticStore;


/***/ }),

/***/ "6nHw":
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
Object.defineProperty(exports, "__esModule", { value: true });
var storagetool_1 = __webpack_require__("5LD5");
var cointool_1 = __webpack_require__("pLPz");
var LoginInfo = /** @class */ (function () {
    function LoginInfo() {
    }
    LoginInfo.ArrayToString = function (array) {
        var obj = [];
        for (var i = 0; i < array.length; i++) {
            obj.push({});
            obj[i].pubkey = array[i].pubkey.toHexString();
            obj[i].prikey = array[i].prikey.toHexString();
            obj[i].address = array[i].address;
        }
        return JSON.stringify(obj);
    };
    LoginInfo.StringToArray = function (str) {
        var obj = JSON.parse(str);
        var arr = [];
        for (var i = 0; i < obj.length; i++) {
            arr.push(new LoginInfo());
            var str = obj[i].prikey;
            var str2 = obj[i].pubkey;
            arr[i].prikey = str.hexToBytes();
            arr[i].pubkey = str2.hexToBytes();
            arr[i].address = obj[i].address;
        }
        return arr;
    };
    LoginInfo.getCurrentLogin = function () {
        var address = LoginInfo.getCurrentAddress();
        var arr = storagetool_1.StorageTool.getLoginArr();
        var n = arr.findIndex(function (info) { return info.address == address; });
        return arr[n];
    };
    LoginInfo.getCurrentAddress = function () {
        return storagetool_1.StorageTool.getStorage("current-address");
    };
    LoginInfo.setCurrentAddress = function (str) {
        storagetool_1.StorageTool.setStorage("current-address", str);
    };
    return LoginInfo;
}());
exports.LoginInfo = LoginInfo;
var BalanceInfo = /** @class */ (function () {
    function BalanceInfo() {
    }
    BalanceInfo.jsonToArray = function (json) {
        var arr = new Array();
        for (var i in json) {
            if (json.hasOwnProperty(i)) {
                var element = json[i];
                var balance = new BalanceInfo();
                balance.asset = element["asset"];
                balance.balance = element["balance"];
                balance.name = element["balance"];
                balance.names = element["names"];
                balance.type = element["type"];
                arr.push(balance);
            }
        }
        return arr;
    };
    BalanceInfo.getBalancesByArr = function (balances, nep5balances, height) {
        var balancearr = [];
        if (balances) {
            balances.map(function (item) {
                item.names = cointool_1.CoinTool.assetID2name[item.asset];
                var a = storagetool_1.StorageTool.getStorage(item.asset);
                if (a) {
                    var obj = JSON.parse(a);
                    var h = obj["height"];
                    height - h > 1 ? storagetool_1.StorageTool.delStorage(item.asset) : item.balance = obj["balance"]["balance"];
                }
            }); //将列表的余额资产名称赋值
            balancearr = balances; //塞入页面modual
        }
        if (nep5balances) {
            for (var index = 0; index < nep5balances.length; index++) {
                var nep5 = nep5balances[index];
                var nep5b = new BalanceInfo();
                var id = nep5.assetid.replace("0x", "");
                id = id.substring(0, 4) + '...' + id.substring(id.length - 4);
                nep5b.asset = nep5.assetid;
                nep5b.balance = nep5.balance;
                nep5b.names = nep5.symbol + "(" + id + ")";
                nep5b.type = "nep5";
                balancearr.push(nep5b);
            }
        }
        return balancearr;
    };
    BalanceInfo.setBalanceSotre = function (balance, height) {
        storagetool_1.StorageTool.setStorage(balance.asset, JSON.stringify({ height: height, balance: balance }));
        console.log(storagetool_1.StorageTool.getStorage(balance.asset));
    };
    return BalanceInfo;
}());
exports.BalanceInfo = BalanceInfo;
var Nep5Balance = /** @class */ (function () {
    function Nep5Balance() {
    }
    return Nep5Balance;
}());
exports.Nep5Balance = Nep5Balance;
var Result = /** @class */ (function () {
    function Result() {
    }
    return Result;
}());
exports.Result = Result;
var AssetEnum;
(function (AssetEnum) {
    AssetEnum["NEO"] = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    AssetEnum["GAS"] = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
})(AssetEnum = exports.AssetEnum || (exports.AssetEnum = {}));
var NeoAsset = /** @class */ (function () {
    function NeoAsset() {
    }
    return NeoAsset;
}());
exports.NeoAsset = NeoAsset;
var OldUTXO = /** @class */ (function () {
    function OldUTXO(txid, n) {
        this.n = n;
        this.txid = txid;
    }
    OldUTXO.oldutxosPush = function (olds) {
        var arr = this.getOldutxos();
        storagetool_1.StorageTool.setStorage("old-utxos", JSON.stringify(arr.concat(olds)));
    };
    OldUTXO.setOldutxos = function (olds) {
        // let arr: OldUTXO[] = this.getOldutxos();
        storagetool_1.StorageTool.setStorage("old-utxos", JSON.stringify(olds));
    };
    OldUTXO.getOldutxos = function () {
        var arr = new Array();
        var str = storagetool_1.StorageTool.getStorage("old-utxos");
        if (str)
            arr = JSON.parse(str);
        return arr;
    };
    OldUTXO.prototype.compareUtxo = function (utxo) {
        return this.txid == utxo.txid && this.n == utxo.n;
    };
    return OldUTXO;
}());
exports.OldUTXO = OldUTXO;
var UTXO = /** @class */ (function () {
    function UTXO() {
    }
    UTXO.ArrayToString = function (utxos) {
        var str = "";
        var obj = [];
        for (var i = 0; i < utxos.length; i++) {
            obj.push({});
            obj[i].n = utxos[i].n;
            obj[i].addr = utxos[i].addr;
            obj[i].txid = utxos[i].txid;
            obj[i].asset = utxos[i].asset;
            obj[i].count = utxos[i].count.toString();
        }
        return obj;
    };
    UTXO.StringToArray = function (obj) {
        var utxos = new Array();
        for (var i = 0; i < obj.length; i++) {
            utxos.push(new UTXO);
            var str = obj[i].count;
            utxos[i].n = obj[i].n;
            utxos[i].addr = obj[i].addr;
            utxos[i].txid = obj[i].txid;
            utxos[i].asset = obj[i].asset;
            utxos[i].count = Neo.Fixed8.parse(str);
        }
        return utxos;
    };
    UTXO.setAssets = function (assets) {
        var obj = {};
        for (var asset in assets) {
            var arr = UTXO.ArrayToString(assets[asset]);
            obj[asset] = arr;
        }
        sessionStorage.setItem("current-assets-utxos", JSON.stringify(obj));
    };
    UTXO.getAssets = function () {
        var assets = null;
        var str = sessionStorage.getItem("current-assets-utxos");
        if (str !== null && str != undefined && str != '') {
            assets = JSON.parse(str);
            for (var asset in assets) {
                assets[asset] = UTXO.StringToArray(assets[asset]);
            }
        }
        return assets;
    };
    return UTXO;
}());
exports.UTXO = UTXO;
var Consts = /** @class */ (function () {
    function Consts() {
    }
    // static baseContract = "0x2172f8d5b17c2d45fa3ff58dee8e8a4c3f51ef72";0x954f285a93eed7b4aed9396a7806a5812f1a5950
    Consts.baseContract = "954f285a93eed7b4aed9396a7806a5812f1a5950";
    Consts.registerContract = "d6a5e965f67b0c3e5bec1f04f028edb9cb9e3f7c";
    return Consts;
}());
exports.Consts = Consts;
var DomainInfo = /** @class */ (function () {
    function DomainInfo() {
    }
    return DomainInfo;
}());
exports.DomainInfo = DomainInfo;
var RootDomainInfo = /** @class */ (function (_super) {
    __extends(RootDomainInfo, _super);
    function RootDomainInfo() {
        return _super.call(this) || this;
    }
    return RootDomainInfo;
}(DomainInfo));
exports.RootDomainInfo = RootDomainInfo;
var Transactionforaddr = /** @class */ (function () {
    function Transactionforaddr() {
    }
    return Transactionforaddr;
}());
exports.Transactionforaddr = Transactionforaddr;
var History = /** @class */ (function () {
    function History() {
    }
    History.setHistoryStore = function (history, height) {
        var arr = this.getHistoryStore();
        arr.push({ height: height, history: history });
        storagetool_1.StorageTool.setStorage("history-txs", JSON.stringify(arr));
    };
    History.getHistoryStore = function () {
        var str = storagetool_1.StorageTool.getStorage("history-txs");
        var arr = !!str ? JSON.parse(str) : [];
        return arr;
    };
    History.delHistoryStoreByHeight = function (height) {
        var arr = this.getHistoryStore();
        if (arr.length > 0) {
            var newarr_1 = [];
            arr.map(function (his) {
                var h = parseInt(his.height);
                if (height - h < 2) {
                    newarr_1.push(his);
                }
            });
            storagetool_1.StorageTool.setStorage("history-txs", JSON.stringify(newarr_1));
        }
    };
    return History;
}());
exports.History = History;
var Claim = /** @class */ (function () {
    function Claim(json) {
        this.addr = json['addr'];
        this.asset = json['asset'];
        this.claimed = json['claimed'];
        this.createHeight = json['createHeight'];
        this.n = json['n'];
        this.txid = json['txid'];
        this.useHeight = json['useHeight'];
        this.used = json['used'];
        this.value = json['value'];
    }
    Claim.strToClaimArray = function (arr) {
        var claimarr = new Array();
        for (var i in arr) {
            if (arr.hasOwnProperty(i)) {
                claimarr.push(new Claim(arr[i]));
            }
        }
        return claimarr;
    };
    return Claim;
}());
exports.Claim = Claim;
var Domainmsg = /** @class */ (function () {
    function Domainmsg() {
    }
    return Domainmsg;
}());
exports.Domainmsg = Domainmsg;
var DomainStatus = /** @class */ (function () {
    function DomainStatus() {
    }
    DomainStatus.setStatus = function (domain) {
        var str = sessionStorage.getItem("domain-status");
        var arr = {};
        if (str) {
            arr = JSON.parse(str);
            var msg = arr[domain.domainname];
            msg ? msg : msg = new DomainStatus();
            domain.await_mapping ? msg["await_mapping"] = domain.await_mapping : "";
            domain.await_register ? msg["await_register"] = domain.await_register : "";
            domain.await_resolver ? msg["await_resolver"] = domain.await_resolver : "";
            domain.mapping ? msg["mapping"] = domain.mapping : "";
            domain.resolver ? msg["resolver"] = domain.resolver.replace("0x", "") : "";
            arr[domain.domainname] = msg;
        }
        else {
            arr[domain.domainname] = domain;
        }
        sessionStorage.setItem("domain-status", JSON.stringify(arr));
    };
    DomainStatus.getStatus = function () {
        var str = sessionStorage.getItem("domain-status");
        return str ? JSON.parse(sessionStorage.getItem("domain-status")) : {};
    };
    return DomainStatus;
}());
exports.DomainStatus = DomainStatus;


/***/ }),

/***/ "7ql1":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "7vgD":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OSAoNTEwMDIpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iYmFsYW5jZTQtdGVzdG5ldCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IummlumhtS10cmFuc2Zlci1pbnB1dDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05MjIuMDAwMDAwLCAtMzc4LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0idHJhbnNmZXIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMC4wMDAwMDAsIDIyNi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSLlpKflm77moIcv6K2m5ZGKIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4MjIuMDAwMDAwLCAxNTIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI0LDEyLjE0ODE0ODEgQzI0LDUuMzcyNDQ0NDQgMTguNjI3NTU1NiwwIDExLjg1MTg1MTksMCBDNS4zNzI0NDQ0NCwwIDAsNS4zNzI0NDQ0NCAwLDEyLjE0ODE0ODEgQzAsMTguNjI3NTU1NiA1LjM3MjQ0NDQ0LDI0IDExLjg1MTg1MTksMjQgQzE4LjYyNzU1NTYsMjQgMjQsMTguNjI3NTU1NiAyNCwxMi4xNDgxNDgxIFoiIGlkPSJGaWxsLSIgZmlsbD0iI0ZGNkE2QSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMiw2LjQ1MTYxMjkgQzEyLjUwMjMxNTYsNi40NTE2MTI5IDEyLjg4ODU0MzcsNi44NDkxMDQ4NSAxMi44NzA0MzIzLDcuMzM5NDM2MDEgTDEyLjYzNDk0NCwxMy43MTQ4NTIgQzEyLjYxNjY3MiwxNC4yMDk1MzI0IDEyLjE5OTAyNTUsMTQuNjAyNjc1MSAxMS43MDE3NDU1LDE0LjYwMjY3NTEgTDEyLjI5ODI1NDUsMTQuNjAyNjc1MSBDMTEuODA1NTcwOSwxNC42MDI2NzUxIDExLjM4MzE2NzMsMTQuMjA1MTgzMSAxMS4zNjUwNTYsMTMuNzE0ODUyIEwxMS4xMjk1Njc3LDcuMzM5NDM2MDEgQzExLjExMTI5NTcsNi44NDQ3NTU1NyAxMS41MDExNjIyLDYuNDUxNjEyOSAxMiw2LjQ1MTYxMjkgWiBNMTIsMTcuNTQ4Mzg3MSBDMTEuNTAxMTYyMiwxNy41NDgzODcxIDExLjA5Njc3NDIsMTcuMTQzOTk5MSAxMS4wOTY3NzQyLDE2LjY0NTE2MTMgQzExLjA5Njc3NDIsMTYuMTQ2MzIzNSAxMS41MDExNjIyLDE1Ljc0MTkzNTUgMTIsMTUuNzQxOTM1NSBDMTIuNDk4ODM3OCwxNS43NDE5MzU1IDEyLjkwMzIyNTgsMTYuMTQ2MzIzNSAxMi45MDMyMjU4LDE2LjY0NTE2MTMgQzEyLjkwMzIyNTgsMTcuMTQzOTk5MSAxMi40OTg4Mzc4LDE3LjU0ODM4NzEgMTIsMTcuNTQ4Mzg3MSBaIiBpZD0iUGF0aC0iIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"

/***/ }),

/***/ "8Qnm":
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
var vue_property_decorator_1 = __webpack_require__("EOM2");
var Spinner = /** @class */ (function (_super) {
    __extends(Spinner, _super);
    function Spinner() {
        return _super.call(this) || this;
    }
    Spinner.prototype.mounted = function () { };
    __decorate([
        vue_property_decorator_1.Prop({ default: true }),
        __metadata("design:type", Boolean)
    ], Spinner.prototype, "isbig", void 0);
    Spinner = __decorate([
        vue_property_decorator_1.Component({
            components: {}
        }),
        __metadata("design:paramtypes", [])
    ], Spinner);
    return Spinner;
}(vue_property_decorator_1.Vue));
exports.default = Spinner;


/***/ }),

/***/ "Ay4p":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "D8AQ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "EGuX":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "GZV2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/nns.ts
var nns = __webpack_require__("cfoD");
var nns_default = /*#__PURE__*/__webpack_require__.n(nns);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-02d5917a","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/nns.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container "},[_c('div',{staticClass:"title"},[_c('span',[_vm._v("Register Neo Name")])]),_vm._v(" "),_c('div',{staticClass:"form-inline"},[_c('div',{staticClass:"input-group nns-register",class:_vm.domainerr?'input-err':'input-success'},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.nnsstr),expression:"nnsstr"}],staticClass:"nel",attrs:{"type":"text","placeholder":"type a name"},domProps:{"value":(_vm.nnsstr)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.nnsstr=$event.target.value},_vm.verifyDomain]}}),_vm._v(" "),_c('span',{staticClass:"input-group-addon nel "},[_c('span',[_vm._v(_vm._s(_vm.network))])])]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.nnsRegister}},[_vm._v("Register")]),_vm._v(" "),_c('div',{staticStyle:{"padding-left":"50px"}},[_c('span',[_vm._v(_vm._s(_vm.errmsg))])])]),_vm._v(" "),_c('div',{staticClass:"title"},[_c('span',[_vm._v("My Neo Name")]),_vm._v(" "),_c('bubble-wrap')],1),_vm._v(" "),_vm._l((_vm.domainarr),function(domain){return _c('div',{key:domain.index,staticClass:"form-inline"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-10"},[_c('span',{staticClass:"domainname"},[_vm._v("\n            "+_vm._s(domain.domainname)+"\n          ")]),_vm._v(" "),_c('br'),_vm._v(" "),_c('span',{staticClass:"msg-resolver"},[_vm._v("( Adress Resolver : "+_vm._s(domain.resolver)+") "),_c('br')]),_vm._v(" "),_c('span',{staticClass:"msg-resolver"},[_vm._v("( Adress Mapping : "+_vm._s(domain.mapping)+")"),_c('br')]),_vm._v(" "),_c('span',{staticClass:"msg-resolver"},[_vm._v("( Expiration Time : "+_vm._s(domain.time)+")\n          ")]),_vm._v(" "),_c('span',{staticClass:"msg-resolver state-lable"},[_vm._v(_vm._s(domain.isExpiration?"(Expiration)":"")+" "+_vm._s(domain.await_register?"(Waiting)":""))])]),_vm._v(" "),_c('div',{staticClass:"col-md-2"},[(!domain.await_register)?_c('button',{staticClass:"btn btn-nel",on:{"click":function($event){_vm.resolve(domain)}}},[_vm._v("Edit")]):_vm._e()])])])})],2),_vm._v(" "),_c('v-alert',{ref:"alert"},[_c('div',{staticClass:"content content-file"},[_c('span',{staticClass:"content-des"},[_vm._v("Neo Name : "+_vm._s(_vm.alert_domain))]),_vm._v(" "),_c('span',{staticClass:"content-msg"})]),_vm._v(" "),_c('div',{staticClass:"content content-verify"},[_c('span',{staticClass:"content-des"},[_vm._v("Adress Resolver : ")]),_vm._v(" "),_c('span',{staticClass:"content-msg warning-msg"},[_vm._v("( It is the official adress resolver , you have to confirm this adress resolver first to mapping your adress. )")]),_vm._v(" "),_c('div',{staticClass:"input-warp"},[_c('input',{staticClass:"input-ico input-disabled",attrs:{"type":"text","disabled":"disable"},domProps:{"value":_vm.alert_contract}}),_vm._v(" "),_c('div',{staticClass:"btn-verify-warp"},[(_vm.alert_resolver_state==0)?_c('button',{staticClass:"btn-nel btn-verify ",on:{"click":function($event){_vm.setresolve()}}},[_vm._v("Confirm")]):_vm._e(),_vm._v(" "),(_vm.alert_resolver_state==1)?_c('spinner-wrap'):_vm._e(),_vm._v(" "),(_vm.alert_resolver_state==2)?_c('button',{staticClass:"btn-nel btn-verify ",on:{"click":function($event){_vm.setresolve()}}},[_vm._v("Resetting ")]):_vm._e()],1),_vm._v(" "),(_vm.alert_resolver_state==2)?_c('span',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}})]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"content content-verify"},[_c('span',{staticClass:"content-des"},[_vm._v("Adress Mapping : ")]),_vm._v(" "),_c('span',{staticClass:"content-msg"}),_vm._v(" "),_c('div',{staticClass:"input-warp"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.alert_addr),expression:"alert_addr"}],staticClass:"input-ico ",attrs:{"type":"text"},domProps:{"value":(_vm.alert_addr)},on:{"input":function($event){if($event.target.composing){ return; }_vm.alert_addr=$event.target.value}}}),_vm._v(" "),_c('div',{staticClass:"icon-verify",staticStyle:{"display":"none"}}),_vm._v(" "),_c('div',{staticClass:"btn-verify-warp"},[(_vm.alert_config_state==0)?_c('button',{staticClass:"btn-nel btn-verify",on:{"click":function($event){_vm.configResolve()}}},[_vm._v("Confirm")]):_vm._e(),_vm._v(" "),(_vm.alert_config_state==2)?_c('button',{staticClass:"btn-nel btn-verify",on:{"click":function($event){_vm.configResolve()}}},[_vm._v("Resetting")]):_vm._e(),_vm._v(" "),(_vm.alert_config_state==1)?_c('spinner-wrap'):_vm._e()],1),_vm._v(" "),(_vm.alert_config_state==2)?_c('span',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}})]):_vm._e()])])])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var pages_nns = (esExports);
// CONCATENATED MODULE: ./src/pages/nns.vue
function injectStyle (ssrContext) {
  __webpack_require__("7ql1")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-02d5917a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  nns_default.a,
  pages_nns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_pages_nns = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "Gc41":
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
Object.defineProperty(exports, "__esModule", { value: true });
var VLink_vue_1 = __webpack_require__("N5E8");
var vue_class_component_1 = __webpack_require__("c+8m");
var vue_1 = __webpack_require__("/5sW");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loginshow = false;
        return _this;
    }
    Main.prototype.mounted = function () {
        if (this.$root["currentRoute"] == "") {
            this.$root["currentRoute"] = "#login";
        }
        if (this.$root["currentRoute"] == "#login") {
            document.body.classList.add("login-body");
            this.loginshow = false;
        }
        else {
            document.body.classList.remove("login-body");
            this.loginshow = true;
        }
    };
    Main = __decorate([
        vue_class_component_1.default({
            components: {
                VLink: VLink_vue_1.default
            }
        })
    ], Main);
    return Main;
}(vue_1.default));
exports.default = Main;


/***/ }),

/***/ "Gieu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/Valert.vue
var Valert = __webpack_require__("shbj");
var Valert_default = /*#__PURE__*/__webpack_require__.n(Valert);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1aea4542","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Valert.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.show)?_c('div',{staticClass:"alert-box"},[_c('div',{staticClass:"alert-warp"},[_c('div',{staticClass:"alert-title"},[_vm._v("Edit information")]),_vm._v(" "),_c('div',{staticClass:"alert-content"},[_vm._t("default")],2),_vm._v(" "),_c('div',{staticClass:"alert-close",on:{"click":function($event){_vm.closemudloe()}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])]):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_Valert = (esExports);
// CONCATENATED MODULE: ./src/components/Valert.vue
function injectStyle (ssrContext) {
  __webpack_require__("MTkh")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1aea4542"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  Valert_default.a,
  components_Valert,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_Valert = __webpack_exports__["default"] = (Component.exports);


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
var neotools_1 = __webpack_require__("PMwo");
var storagetool_1 = __webpack_require__("5LD5");
var entity_1 = __webpack_require__("6nHw");
var VLink_vue_1 = __webpack_require__("N5E8");
var login = /** @class */ (function (_super) {
    __extends(login, _super);
    function login() {
        var _this = _super.call(this) || this;
        // Data property
        _this.Message = "hello world";
        _this.wallet = new ThinNeo.nep6wallet();
        _this.filename = "";
        _this.password = "";
        _this.nep2 = "";
        _this.nep2pwd = "";
        _this.wif = "";
        _this.walletname = "";
        _this.walletpwd = "";
        _this.confirmpwd = "";
        _this.nameerr = "";
        _this.pwderr = "";
        _this.pwdmsg = "";
        _this.confirmerr = "";
        _this.moudle_nep6 = true;
        _this.moudle_wif = false;
        _this.moudle_nep2 = false;
        _this.moudle_generate = false;
        _this.moudle_download = false;
        _this.download_name = "";
        _this.download_href = "";
        _this.reader = new FileReader();
        _this.reader.onload = function () {
            var walletstr = _this.reader.result;
            _this.wallet.fromJsonStr(walletstr);
        };
        //初始化隨機數生成器
        //該隨機數生成器的原理是收集鼠標事件，所以早點打開，效果好
        Neo.Cryptography.RandomNumberGenerator.startCollectors();
        return _this;
    }
    login.prototype.mounted = function () {
        if (storagetool_1.StorageTool.getLoginArr().length > 0) {
            sessionStorage.clear();
        }
    };
    // Lifecycle hook
    login.prototype.fileChange = function ($event) {
        this.file = $event.target.files[0];
        this.filename = this.file.name;
        if (this.filename.includes(".json")) {
            this.reader.readAsText(this.file);
        }
    };
    login.prototype.login = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var res, loginarray, login, res, loginarray, login;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mui.toast("Be patient and wait for patience ...");
                        if (type == "nep6") {
                            neotools_1.neotools.nep6Load(this.wallet, this.password)
                                .then(function (res) {
                                var loginarray = res.info;
                                storagetool_1.StorageTool.setLoginArr(loginarray);
                                entity_1.LoginInfo.setCurrentAddress(loginarray[0].address);
                                mui.toast('Authentication passed, entering your account ^_^ ...', { duration: 'long', type: 'div' });
                                window.location.hash = "#balance";
                            })
                                .catch(function (e) {
                                mui.alert(">_< !!! The login failure error message is as follows:" + e);
                            });
                        }
                        if (type == "wif") {
                            res = neotools_1.neotools.wifDecode(this.wif);
                            if (res.err) {
                                mui.toast(">_< !!! Please enter the correct string ");
                            }
                            else {
                                loginarray = new Array();
                                login = res.info;
                                loginarray.push(login);
                                storagetool_1.StorageTool.setLoginArr(loginarray);
                                entity_1.LoginInfo.setCurrentAddress(login.address);
                                mui.toast('Authentication passed, entering your account ^_^ ...', { duration: 'long', type: 'div' });
                                window.location.hash = "#balance";
                            }
                        }
                        if (!(type == "nep2")) return [3 /*break*/, 2];
                        return [4 /*yield*/, neotools_1.neotools.nep2ToWif(this.nep2, this.nep2pwd)];
                    case 1:
                        res = _a.sent();
                        if (res.err) {
                            mui.toast(">_< !!! Please enter the correct string ");
                        }
                        else {
                            loginarray = new Array();
                            login = res.info;
                            loginarray.push(login);
                            storagetool_1.StorageTool.setLoginArr(loginarray);
                            entity_1.LoginInfo.setCurrentAddress(login.address);
                            mui.toast('Authentication passed, entering your account ^_^ ...', { duration: 'long', type: 'div' });
                            window.location.hash = "#balance";
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    login.prototype.cutModual = function (page) {
        if (page == "wif") {
            this.moudle_wif = true;
            this.moudle_nep2 = false;
            this.moudle_nep6 = false;
            this.moudle_generate = false;
            this.moudle_download = false;
        }
        if (page == "nep2") {
            this.moudle_wif = false;
            this.moudle_nep2 = true;
            this.moudle_nep6 = false;
            this.moudle_generate = false;
            this.moudle_download = false;
        }
        if (page == "nep6") {
            this.moudle_wif = false;
            this.moudle_nep2 = false;
            this.moudle_nep6 = true;
            this.moudle_generate = false;
            this.moudle_download = false;
        }
        if (page == "generate") {
            this.moudle_wif = false;
            this.moudle_nep2 = false;
            this.moudle_nep6 = false;
            this.moudle_generate = true;
            this.moudle_download = false;
        }
        if (page == "download") {
            this.moudle_wif = false;
            this.moudle_nep2 = false;
            this.moudle_nep6 = false;
            this.moudle_generate = false;
            this.moudle_download = true;
        }
    };
    login.prototype.verifypwd = function () {
        if (this.walletpwd.length < 8) {
            this.pwderr = 'true';
            this.pwdmsg = "Please enter a password of at least eight characters";
            return false;
        }
        var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
        if (!reg.test(this.walletpwd)) {
            this.pwderr = 'true';
            this.pwdmsg = "Use at least one character and one number ";
            return false;
        }
        else {
            this.pwderr = 'false';
            this.pwdmsg = '';
            return true;
        }
    };
    login.prototype.verifyConfirm = function () {
        if (this.confirmpwd && this.walletpwd == this.confirmpwd) {
            this.confirmerr = 'false';
            return true;
        }
        else {
            this.confirmerr = 'true';
            return false;
        }
    };
    login.prototype.verifyName = function () {
        this.walletname = this.walletname.replace(' ', '');
        if (this.walletname.length == 0) {
            this.nameerr = 'true';
            return false;
        }
        else {
            this.nameerr = 'false';
            return true;
        }
    };
    login.prototype.generate = function () {
        var _this = this;
        var confirm = this.verifyConfirm();
        var pwd = this.verifypwd();
        var name = this.verifyName();
        if (confirm && pwd && name) {
            this.cutModual('download');
            var array = new Uint8Array(32);
            var key = Neo.Cryptography.RandomNumberGenerator.getRandomValues(array);
            // spanPri.textContent = key.toHexString();
            var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(key);
            var addr = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
            this.moudle_download = true;
            this.wallet.scrypt = new ThinNeo.nep6ScryptParameters();
            this.wallet.scrypt.N = 16384;
            this.wallet.scrypt.r = 8;
            this.wallet.scrypt.p = 8;
            this.wallet.accounts = [];
            this.wallet.accounts[0] = new ThinNeo.nep6account();
            this.wallet.accounts[0].address = addr;
            ThinNeo.Helper.GetNep2FromPrivateKey(key, this.walletpwd, this.wallet.scrypt.N, this.wallet.scrypt.r, this.wallet.scrypt.p, function (info, result) {
                if (info == "finish") {
                    _this.wallet.accounts[0].nep2key = result;
                    _this.wallet.accounts[0].contract = new ThinNeo.contract();
                    var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(key);
                    _this.wallet.accounts[0].contract.script = ThinNeo.Helper.GetAddressCheckScriptFromPublicKey(pubkey).toHexString();
                    var jsonstr = JSON.stringify(_this.wallet.toJson());
                    var blob = new Blob([ThinNeo.Helper.String2Bytes(jsonstr)]);
                    _this.download_href = URL.createObjectURL(blob);
                    _this.download_name = _this.walletname + ".json";
                }
            });
        }
    };
    login.prototype.wifImport = function () {
    };
    login.prototype.nep2Import = function () {
    };
    login = __decorate([
        vue_property_decorator_1.Component({
            components: {
                "main-layout": Main_vue_1.default,
                "v-link": VLink_vue_1.default
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

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-667a6f35","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/login.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main-layout',[_c('div',{staticStyle:{"height":"180px"}}),_vm._v(" "),_c('div',{staticClass:"container-box"},[_c('div',{staticClass:"row login-container"},[_c('div',{staticClass:"container-left"},[_c('div',{staticClass:"container-icon"},[_c('img',{attrs:{"src":__webpack_require__("4+Dl"),"alt":""}})]),_vm._v(" "),_c('div',{staticClass:"container-title",class:{'active':!(_vm.moudle_generate||_vm.moudle_download)},on:{"click":function($event){_vm.cutModual('nep6')}}},[_c('span',{ref:"login"},[_vm._v("Login")])]),_vm._v(" "),_c('div',{staticClass:"container-title",class:{'active':(_vm.moudle_generate || _vm.moudle_download)},on:{"click":function($event){_vm.cutModual('generate')}}},[_c('span',{ref:"login"},[_vm._v("Generate")])])]),_vm._v(" "),_c('div',{staticClass:"container-right"},[(_vm.moudle_nep6)?_c('div',{staticClass:"nep6-imp"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v("\n              Login your wallet\n            ")])]),_vm._v(" "),_c('div',{staticClass:"input-login"},[_c('div',{staticClass:"input-group nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filename),expression:"filename"}],staticClass:"form-control",attrs:{"type":"text","placeholder":"Select keystore file. ","disabled":"true"},domProps:{"value":(_vm.filename)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filename=$event.target.value}}}),_vm._v(" "),_c('span',{staticClass:"input-group-addon"},[_c('button',{staticClass:"btn btn-nel fileinput-button"},[_c('span',[_vm._v("Select")]),_vm._v(" "),_c('input',{attrs:{"type":"file"},on:{"change":_vm.fileChange}})])])])]),_vm._v(" "),_c('div',{staticClass:"input-login",staticStyle:{"padding-top":"40px"}},[_c('div',{staticClass:"input-group nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"form-control",attrs:{"placeholder":"Enter password. ","type":"password"},domProps:{"value":(_vm.password)},on:{"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value}}}),_vm._v(" "),_c('span',{staticClass:"input-group-addon"},[_c('button',{staticClass:"btn btn-nel fileinput-button",on:{"click":function($event){_vm.login('nep6')}}},[_vm._v("\n                  Login\n                ")])])])]),_vm._v(" "),_c('div',{staticStyle:{"height":"36px","padding-top":"80px","padding-bottom":"30px","text-align":"center"}},[_c('hr',{attrs:{"width":"80%","color":"#987cb9"}}),_vm._v(" "),_c('div',{staticClass:"hr-more"},[_vm._v("or you can")])]),_vm._v(" "),_c('div',{staticStyle:{"width":"417px","margin":"0 auto","padding-top":"30px"}},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":function($event){_vm.cutModual('wif')}}},[_vm._v("Import key from WIF String ")])]),_vm._v(" "),_c('div',{staticStyle:{"width":"417px","margin":"0 auto","padding-top":"20px","padding-bottom":"5.9%"}},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":function($event){_vm.cutModual('nep2')}}},[_vm._v("Import key from nep2 String ")])])]):_vm._e(),_vm._v(" "),(_vm.moudle_wif)?_c('div',{staticClass:"wif_imp"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v("WIF Private Key")])]),_vm._v(" "),_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.wif),expression:"wif"}],attrs:{"type":"text","placeholder":"Enter your private key. "},domProps:{"value":(_vm.wif)},on:{"input":function($event){if($event.target.composing){ return; }_vm.wif=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"login-btn"},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":function($event){_vm.login('wif')}}},[_vm._v("Login")])]),_vm._v(" "),_c('div',{staticClass:"back"},[_c('a',{on:{"click":function($event){_vm.cutModual('nep6')}}},[_vm._v("< Back")])])]):_vm._e(),_vm._v(" "),(_vm.moudle_nep2)?_c('div',{staticClass:"nep2_imp"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v("Nep2")])]),_vm._v(" "),_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.nep2),expression:"nep2"}],attrs:{"type":"text","placeholder":"Enter your Nep2. "},domProps:{"value":(_vm.nep2)},on:{"input":function($event){if($event.target.composing){ return; }_vm.nep2=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.nep2pwd),expression:"nep2pwd"}],attrs:{"type":"password","placeholder":"Enter password. "},domProps:{"value":(_vm.nep2pwd)},on:{"input":function($event){if($event.target.composing){ return; }_vm.nep2pwd=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"login-btn"},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":function($event){_vm.login('nep2')}}},[_vm._v("Login")])]),_vm._v(" "),_c('div',{staticClass:"back"},[_c('a',{on:{"click":function($event){_vm.cutModual('nep6')}}},[_vm._v("< Back")])])]):_vm._e(),_vm._v(" "),(_vm.moudle_generate)?_c('div',{staticClass:"generate"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v("Generate a new wallet")])]),_vm._v(" "),_c('div',{class:_vm.nameerr!=''?( _vm.nameerr == 'true' ?'err':'success') :''},[_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.walletname),expression:"walletname"}],attrs:{"type":"text","placeholder":"Name your wallet. "},domProps:{"value":(_vm.walletname)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.walletname=$event.target.value},_vm.verifyName],"blur":_vm.verifyName}})]),_vm._v(" "),_c('div',{staticClass:"message"},[(_vm.nameerr=='true')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("7vgD"),"alt":""}}),_vm._v("   Wallet name cannot be empty.")]):_vm._e(),_vm._v(" "),(_vm.nameerr=='false')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}}),_vm._v("   Verification pass. ")]):_vm._e()])]),_vm._v(" "),_c('div',{class:_vm.pwderr!=''?( _vm.pwderr == 'true' ?'err':'success') :''},[_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.walletpwd),expression:"walletpwd"}],attrs:{"type":"password","placeholder":"Enter password. "},domProps:{"value":(_vm.walletpwd)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.walletpwd=$event.target.value},_vm.verifypwd],"blur":_vm.verifypwd}})]),_vm._v(" "),_c('div',{staticClass:"message"},[(_vm.pwderr=='true')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("7vgD"),"alt":""}}),_vm._v("   "+_vm._s(_vm.pwdmsg)+"\n              ")]):_vm._e(),_vm._v(" "),(_vm.pwderr=='false')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}}),_vm._v("   Verification pass.\n              ")]):_vm._e()])]),_vm._v(" "),_c('div',{class:_vm.confirmerr!=''?( _vm.confirmerr == 'true' ?'err':'success') :''},[_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.confirmpwd),expression:"confirmpwd"}],attrs:{"type":"password","placeholder":"Confirm password. "},domProps:{"value":(_vm.confirmpwd)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.confirmpwd=$event.target.value},_vm.verifyConfirm],"blur":_vm.verifyConfirm}})]),_vm._v(" "),_c('div',{staticClass:"message"},[(_vm.confirmerr=='true')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("7vgD"),"alt":""}}),_vm._v("   Please enter the same password as above.\n              ")]):_vm._e(),_vm._v(" "),(_vm.confirmerr=='false')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}}),_vm._v("   Verification pass.\n              ")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"login-btn"},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":function($event){_vm.generate()}}},[_vm._v("Generate")])])]):_vm._e(),_vm._v(" "),(_vm.moudle_download)?_c('div',{staticClass:"generate download"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v("Your keystore file has been created.")])]),_vm._v(" "),_c('p',{staticClass:"guide"},[_vm._v("You can click the ‘download’ button to save your keystore file!")]),_vm._v(" "),_c('div',{staticClass:"login-btn"},[_c('a',{staticClass:"btn btn-nel btn-import",attrs:{"download":_vm.download_name,"href":_vm.download_href}},[_vm._v("Download")])]),_vm._v(" "),_c('div',{staticClass:"remind"},[_c('p',{staticClass:"title-remind"},[_vm._v("Do not lose it!")]),_vm._v(" "),_c('p',{staticClass:"content-remind"},[_vm._v("It can’t be recovered if you lose it.")])])]):_vm._e()])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var pages_login = (esExports);
// CONCATENATED MODULE: ./src/pages/login.vue
function injectStyle (ssrContext) {
  __webpack_require__("2Gf+")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-667a6f35"
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

/***/ "MTkh":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "N5E8":
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-179656f6","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/VLink.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{class:{ active: _vm.isActive },attrs:{"href":_vm.href},on:{"click":_vm.go}},[_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_VLink = (esExports);
// CONCATENATED MODULE: ./src/components/VLink.vue
function injectStyle (ssrContext) {
  __webpack_require__("NLED")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-179656f6"
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

/* harmony default export */ var src_components_VLink = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "NLED":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "NmuQ":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA11JREFUWAnNWT1II0EUfgkiiNqk8CRgIYmdVhFFsU+6iFjZBK3vQAwErJa7q0QrOewsRbgmHhaCVtZqEy0UPEQUzR0EiTlEUG7v+2ZN2MQz2b/EffBt3s7Me/Ptm53ZN5OAOBRd1yMwTQIxIGwCVLkx4Qj6j0Ag8JMVTRWQ6gG+AMeAXaENbXs8JwmnXYAGlAC3Qh8a0OUJUTiaAvKA10KfU45JwjgAaMBfoFlC3xoQsEUUBh3Ad6BVwr46LJFEQ0auleTKQWCfjSOJRlrZ4h1+tbpRBCFOiGa+c42emX1XTZxKSFHBaX8OfKj7FM2v/IUuoljY/7CrNlN/aeiOyD09PUk2m5WdnR25vLwUOJf+/n6Jx+MyPT2t7k39NFLJgVw+s6GKIKLH1Z2fItuL59XVlSwsLMjFxQX9vZLh4WFZW1uTYDD4qq5OAaMXwYP+Llt9QoFtcuxgaWlJkRsaGpLl5WXZ3d2Vra0tmZmZYbUcHh7KxsaG0m1cyOVjpT0i6OTbCjNdv7+/19fX13UMs7o3X+bn5/VYLKanUilzsVX9mASDaM2sZLDC1qbS3d0tc3Nz0tZmfp0NJ+Pj40p5a/gbdDVIbhxipkxNkYeHB+WXD+FQkiTIfK4psre3p/yOjY059R8jQSabnsvm5qacnp5KZ2enzM7OOvUfFozzmdW31mq7XC6nj46OqgmCtdGq2f/anXkewVKpJIuLi/L8/CyTk5OSSCScRo92YRLU3XiotV1dXZV8Pi+RSEQymUxttd17nQRv7Vq91b5QKMj29raqTqfT0t7e/lZTq+W3JMgdmCdycHCghra3t1dGRka88HnjKcFisahI9fX1eUGOPm64/HPfanw4WeRCJiYmhNELhUIuvFSZHjG956eOeaAfJRpESsM068QrdtfX1/L4+OiFuxNy4ztIyRo/7q5Mvbj2JZNJtdS482ZwKhP8BmcqxXbjlFk1hcvN/v6+G1fkQk6iCDJzhb7CAjcSjUYr5gMDAxXdgbLywslI+ekAk4VZrKtN093dndqXkKiLdbBq01T1cCDpu21nFUHegKQGvJfU37i/EPT30ccLSf8eHpEgBWPs3+M3g6JxBVF/HmDWkPTvEXANUR6ifwWcbPRpY/sQXZ3NmElY1dFZS/6G+AfBNJPrQJbG6AAAAABJRU5ErkJggg=="

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
var entity_1 = __webpack_require__("6nHw");
///<reference path="./neo-ts.d.ts"/>
var neotools = /** @class */ (function () {
    function neotools() {
    }
    /**
     * verifyPublicKey 验证公钥
     * @param publicKey 公钥
     */
    neotools.verifyPublicKey = function (publicKey) {
        var array = Neo.Cryptography.Base58.decode(publicKey);
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
        var result = new entity_1.Result();
        var login = new entity_1.LoginInfo();
        try {
            login.prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
        }
        catch (e) {
            result.err = true;
            result.info = e.message;
            return result;
        }
        try {
            login.pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(login.prikey);
        }
        catch (e) {
            result.err = true;
            result.info = e.message;
            return result;
        }
        try {
            login.address = ThinNeo.Helper.GetAddressFromPublicKey(login.pubkey);
        }
        catch (e) {
            result.err = true;
            result.info = e.message;
            return result;
        }
        result.info = login;
        return result;
    };
    /**
     * nep2FromWif
     */
    neotools.nep2FromWif = function (wif, password) {
        var prikey;
        var pubkey;
        var address;
        var res = new entity_1.Result();
        try {
            prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
            var n = 16384;
            var r = 8;
            var p = 8;
            ThinNeo.Helper.GetNep2FromPrivateKey(prikey, password, n, r, p, function (info, result) {
                res.err = false;
                res.info.nep2 = result;
                pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
                var hexstr = pubkey.toHexString();
                address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                res.info.address = address;
                return res;
            });
        }
        catch (e) {
            res.err = true;
            res.info = e.message;
            return res;
        }
    };
    /**
     * nep2TOWif
     */
    neotools.nep2ToWif = function (nep2, password) {
        return __awaiter(this, void 0, void 0, function () {
            var res, login, promise;
            return __generator(this, function (_a) {
                res = new entity_1.Result();
                login = new entity_1.LoginInfo();
                promise = new Promise(function (resolve, reject) {
                    var n = 16384;
                    var r = 8;
                    var p = 8;
                    ThinNeo.Helper.GetPrivateKeyFromNep2(nep2, password, n, r, p, function (info, result) {
                        login.prikey = result;
                        if (login.prikey != null) {
                            login.pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(login.prikey);
                            login.address = ThinNeo.Helper.GetAddressFromPublicKey(login.pubkey);
                            res.err = false;
                            res.info = login;
                            resolve(res);
                        }
                        else {
                            res.err = true;
                            reject(res);
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
            var istart, res, arr, keyindex, account, result, error_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        istart = 0;
                        res = new entity_1.Result();
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
                        result = _a.sent();
                        // console.log("getpkformacc:" + result);
                        arr.push(result.info);
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        res.err = true;
                        res.info = error_1;
                        return [2 /*return*/, res];
                    case 5:
                        keyindex++;
                        return [3 /*break*/, 1];
                    case 6:
                        res.err = false;
                        res.info = arr;
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
                res = new entity_1.Result();
                promise = new Promise(function (resolve, reject) {
                    account.getPrivateKey(scrypt, password, function (info, result) {
                        if (info == "finish") {
                            var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(result);
                            var address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                            var wif = ThinNeo.Helper.GetWifFromPrivateKey(result);
                            var hexkey = result.toHexString();
                            // console.log(info + "|" + address + " wif=" + wif);
                            res.err = false;
                            res.info = { pubkey: pubkey, address: address, prikey: result };
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


/***/ }),

/***/ "PPZq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/layouts/wallet.ts
var wallet = __webpack_require__("YRcM");
var wallet_default = /*#__PURE__*/__webpack_require__.n(wallet);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-989ea100","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/layouts/wallet.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main-layout',[_c('nav',{staticClass:"navbar navbar-wallet"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"navbar-collapse collapse",attrs:{"id":"navbar"}},[_c('ul',{staticClass:"nav navbar-nav navbar-left"},[_c('li',[_c('v-link',{ref:"balance",attrs:{"href":"#balance"}},[_c('span',{class:[_vm.balance]}),_vm._v(" Balance\n            ")])],1),_vm._v(" "),_c('li',[_c('v-link',{ref:"transfer",attrs:{"href":"#transfer"}},[_c('span',{class:[_vm.transfer]}),_vm._v(" Transfer\n            ")])],1),_vm._v(" "),_c('li',[_c('v-link',{ref:"nns",attrs:{"href":"#nns"}},[_c('span',{class:[_vm.nns]}),_vm._v(" NNS\n            ")])],1),_vm._v(" "),_c('li',[_c('v-link',{ref:"setting",attrs:{"href":"#settings"}},[_c('span',{class:[_vm.setting]}),_vm._v(" Settings\n            ")])],1)]),_vm._v(" "),_c('div',{staticClass:"blockheight"},[_vm._v("Block Height："+_vm._s(_vm.blockheight))])])])]),_vm._v(" "),_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var layouts_wallet = (esExports);
// CONCATENATED MODULE: ./src/layouts/wallet.vue
function injectStyle (ssrContext) {
  __webpack_require__("+mP0")
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
  wallet_default.a,
  layouts_wallet,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_layouts_wallet = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "PnfL":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "QRjO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/balance.ts
var balance = __webpack_require__("2xXY");
var balance_default = /*#__PURE__*/__webpack_require__.n(balance);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-ec7412a8","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/balance.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container"},[_c('div',{staticClass:"title",staticStyle:{"padding-bottom":"28px"}},[_c('span',[_vm._v("NEO Balance")]),_vm._v(" "),_c('div',{staticStyle:{"float":"right"}},[_c('span',{staticClass:"user-select-ok",staticStyle:{"margin-right":"11px","color":"#fff"}},[_vm._v("Key Address ："+_vm._s(_vm.currentAddress))]),_vm._v(" "),(_vm.chooseAddressarr &&_vm.chooseAddressarr.length>1)?_c('button',{staticClass:"btn",attrs:{"data-toggle":"modal","data-target":"#selectAddr"}},[_vm._v("Switch")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"neobalance",staticStyle:{"background":"#454F60","border-radius":"5px"}},[_c('div',[_c('div',{staticStyle:{"padding":"30px","padding-bottom":"40px"}},[_c('span',{staticClass:"balance-type"},[_vm._v("NEO ")]),_vm._v(" "),_c('span',{staticClass:"balance-amount"},[_vm._v(_vm._s(_vm.neoasset.neo))])]),_vm._v(" "),_c('div',{staticStyle:{"padding-left":"30px","padding-bottom":"30px"}},[_c('span',{staticClass:"balance-type"},[_vm._v("GAS ")]),_vm._v(" "),_c('span',{staticClass:"balance-amount"},[_vm._v(_vm._s(_vm.neoasset.gas))])]),_vm._v(" "),_c('div',{staticClass:"claim",staticStyle:{"padding":"30px","padding-left":"2.3%"}},[_c('span',{staticStyle:{"margin-right":"17px"}},[_vm._v("GAS available to claim : "+_vm._s(_vm.neoasset.claim))]),_vm._v(" "),(_vm.neoasset.claim!='0'&&_vm.claimbtn)?_c('button',{staticClass:"btn btn-nel",on:{"click":_vm.toClaimGas}},[_vm._v("Claim")]):_vm._e(),_vm._v(" "),(!_vm.claimbtn)?_c('span',[_c('spinner-wrap',{attrs:{"isbig":false}})],1):_vm._e(),_vm._v(" "),_c('span',{staticClass:"loadmsg"},[_vm._v(" "+_vm._s(_vm.loadmsg))])])])]),_vm._v(" "),(_vm.balances.length)?_c('div',{staticClass:"balance-asset"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v("Asset")])]),_vm._v(" "),_vm._l((_vm.balances),function(balance){return _c('div',{key:balance.asset,staticClass:"assetrow"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-sm-2 info"},[_c('span',[_vm._v(_vm._s(balance.names))])]),_vm._v(" "),_c('div',{staticClass:"col-sm-8 info"},[_c('span',[_vm._v(" "+_vm._s(balance.balance))])]),_vm._v(" "),_c('div',{staticClass:"col-sm-2 transfer-btn"},[_c('span',{staticClass:"btn btn-transfer",on:{"click":function($event){_vm.toTransfer(balance.asset)}}},[_vm._v("Transfer")])])])])})],2):_vm._e(),_vm._v(" "),_c('div',{staticStyle:{"height":"30px"}})]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"selectAddr","tabindex":"-1"}},[_c('div',{staticClass:"modal-dialog",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"modal-header"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]),_vm._v(" "),_c('h4',{staticClass:"modal-title",attrs:{"id":"exampleModalLabel"}},[_vm._v("Choose address")])]),_vm._v(" "),_c('div',{staticClass:"modal-body"},[_c('form',[_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"exampleInputFile"}},[_vm._v("Select Nep6 File:")]),_vm._v(" "),_c('div',{staticClass:"radio",attrs:{"id":"selectAddress"}},_vm._l((_vm.chooseAddressarr),function(item){return _c('label',{key:item.address},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.chooseAddress),expression:"chooseAddress"}],attrs:{"type":"radio"},domProps:{"value":item.address,"checked":_vm._q(_vm.chooseAddress,item.address)},on:{"change":function($event){_vm.chooseAddress=item.address}}}),_vm._v(_vm._s(item.address)+"\n                ")])}))])])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-default",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v("Close")]),_vm._v(" "),_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button","data-dismiss":"modal"},on:{"click":function($event){_vm.addressSwitch()}}},[_vm._v("confirm")])])])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var pages_balance = (esExports);
// CONCATENATED MODULE: ./src/pages/balance.vue
function injectStyle (ssrContext) {
  __webpack_require__("EGuX")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ec7412a8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  balance_default.a,
  pages_balance,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_pages_balance = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "VbKi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-039438aa","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/bubble.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0,false,false)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bubble-box"},[_c('div',{staticClass:"bubble-png"},[_c('img',{attrs:{"src":__webpack_require__("PnfL"),"alt":""}})]),_vm._v(" "),_c('div',{staticClass:"bubble-msg"},[_vm._v("You get a reward of 50 NNCs ！")]),_vm._v(" "),_c('div',{staticClass:"help-icon"},[_c('img',{attrs:{"src":__webpack_require__("NmuQ"),"alt":""}}),_vm._v(" "),_c('div',{staticClass:"help-msg"},[_vm._v("\n      You will be rewarded with 50 NNCs on Mainnet for the first time you map your wallet address to an ending in \".test \" name successfully.\n      "),_c('div',{staticClass:"triangle-box"})])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var bubble = (esExports);
// CONCATENATED MODULE: ./src/components/bubble.vue
function injectStyle (ssrContext) {
  __webpack_require__("WdLa")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
var __vue_script__ = null
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-039438aa"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  bubble,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var components_bubble = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "WdLa":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "YRcM":
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
var vue_class_component_1 = __webpack_require__("c+8m");
var Main_vue_1 = __webpack_require__("l7Tq");
var VLink_vue_1 = __webpack_require__("N5E8");
var wwwtool_1 = __webpack_require__("50aY");
var storagetool_1 = __webpack_require__("5LD5");
var FeatureComponent = /** @class */ (function (_super) {
    __extends(FeatureComponent, _super);
    function FeatureComponent() {
        var _this = _super.call(this) || this;
        _this.balance = "";
        _this.nns = "";
        _this.transfer = "";
        _this.setting = "";
        _this.blockheight = 0;
        return _this;
    }
    FeatureComponent.prototype.mounted = function () {
        this.balance = this.$refs["balance"]["isActive"]
            ? "icon-balance-select"
            : "icon-balance-unselect";
        this.transfer = this.$refs["transfer"]["isActive"]
            ? "icon-transfer-select"
            : "icon-transfer-unselect";
        this.nns = this.$refs["nns"]["isActive"]
            ? "icon-nns-select"
            : "icon-nns-unselect";
        this.setting = this.$refs["setting"]["isActive"]
            ? "icon-setting-select"
            : "icon-setting-unselect";
        this.getHeight();
        var arr = storagetool_1.StorageTool.getLoginArr();
        if (arr.length == 0) {
            window.location.hash = "#login";
        }
    };
    FeatureComponent.prototype.getHeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                wwwtool_1.WWW.api_getHeight()
                    .then(function (res) {
                    _this.blockheight = res;
                });
                setTimeout(function () { _this.getHeight(); }, 15000);
                return [2 /*return*/];
            });
        });
    };
    FeatureComponent = __decorate([
        vue_class_component_1.default({
            components: {
                VLink: VLink_vue_1.default,
                MainLayout: Main_vue_1.default
            }
        }),
        __metadata("design:paramtypes", [])
    ], FeatureComponent);
    return FeatureComponent;
}(vue_1.default));
exports.default = FeatureComponent;


/***/ }),

/***/ "ar5l":
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
var entity_1 = __webpack_require__("6nHw");
var wwwtool_1 = __webpack_require__("50aY");
var cointool_1 = __webpack_require__("pLPz");
/**
 * @name NEONameServiceTool
 * @method initRootDomain_初始化根域名信息
 */
var NNSTool = /** @class */ (function () {
    function NNSTool() {
    }
    /**
     * @method 初始化根域名信息
     */
    NNSTool.initRootDomain = function () {
        return __awaiter(this, void 0, void 0, function () {
            var test, scriptaddress, domain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        test = new entity_1.RootDomainInfo();
                        // test.roothash = await NNSTool.getRootNameHash();
                        test.roothash = NNSTool.nameHash("test");
                        test.rootname = "test";
                        scriptaddress = entity_1.Consts.baseContract.hexToBytes().reverse();
                        return [4 /*yield*/, NNSTool.getOwnerInfo(test.roothash, scriptaddress)];
                    case 1:
                        domain = _a.sent();
                        test.owner = domain.owner;
                        test.register = domain.register;
                        test.resolver = domain.resolver;
                        test.ttl = domain.ttl;
                        NNSTool.root_test = test;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @method 查询域名信息
     * @param doamin 域名字符串
     */
    NNSTool.queryDomainInfo = function (doamin) {
        return __awaiter(this, void 0, void 0, function () {
            var domainarr, subdomain, nnshash, doamininfo, owner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        domainarr = doamin.split('.');
                        subdomain = domainarr[0];
                        nnshash = NNSTool.nameHashArray(domainarr);
                        return [4 /*yield*/, NNSTool.getOwnerInfo(nnshash, entity_1.Consts.baseContract.hexToBytes().reverse())];
                    case 1:
                        doamininfo = _a.sent();
                        owner = doamininfo.owner.toHexString();
                        // return address;
                        return [2 /*return*/, doamininfo];
                }
            });
        });
    };
    /**
     * 注册域名
     * @param doamin 域名字符串
     */
    NNSTool.registerDomain = function (doamin) {
        return __awaiter(this, void 0, void 0, function () {
            var nnshash, address, sb, scriptaddress, random_uint8, random_int, data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nnshash = NNSTool.nameHash(NNSTool.root_test.rootname);
                        address = entity_1.LoginInfo.getCurrentAddress();
                        sb = new ThinNeo.ScriptBuilder();
                        scriptaddress = NNSTool.root_test.register;
                        random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues(new Uint8Array(32));
                        random_int = Neo.BigInteger.fromUint8Array(random_uint8);
                        //塞入随机数
                        sb.EmitPushNumber(random_int);
                        sb.Emit(ThinNeo.OpCode.DROP);
                        sb.EmitParamJson(["(addr)" + address, "(bytes)" + nnshash.toHexString(), "(str)" + doamin]); //第二个参数是个数组
                        sb.EmitPushString("requestSubDomain");
                        sb.EmitAppCall(scriptaddress);
                        data = sb.ToArray();
                        return [4 /*yield*/, cointool_1.CoinTool.contractInvokeTrans_attributes(data)];
                    case 1:
                        res = _a.sent();
                        if (!res.err) {
                            // WWW.setnnsinfo(address,doamin,);
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * @method 返回根域名名称
     */
    NNSTool.getRootName = function () {
        return __awaiter(this, void 0, void 0, function () {
            var name, sb, scriptaddress, data, result, state, stack, bs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = "";
                        sb = new ThinNeo.ScriptBuilder();
                        sb.EmitParamJson(JSON.parse("[]"));
                        sb.EmitPushString("rootName");
                        scriptaddress = entity_1.Consts.baseContract.hexToBytes().reverse();
                        sb.EmitAppCall(scriptaddress);
                        data = sb.ToArray();
                        return [4 /*yield*/, wwwtool_1.WWW.rpc_getInvokescript(data)];
                    case 1:
                        result = _a.sent();
                        try {
                            state = result.state;
                            // info2.textContent = "";
                            if (state.includes("HALT, BREAK")) {
                                // info2.textContent += "Succ\n";
                            }
                            stack = result.stack;
                            //find name 他的type 有可能是string 或者ByteArray
                            if (stack[0].type == "Array") {
                                // info2.textContent += "name=" + stack[0].value + "\n";
                                length = stack[0].lenght;
                            }
                            else if (stack[0].type == "ByteArray") {
                                bs = stack[0].value.hexToBytes();
                                name = ThinNeo.Helper.Bytes2String(bs);
                            }
                            return [2 /*return*/, name];
                        }
                        catch (e) {
                            return [2 /*return*/, e.message];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @method 返回根域名hash
     */
    NNSTool.getRootNameHash = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nameHash, sb, scriptaddress, data, result, state, stack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sb = new ThinNeo.ScriptBuilder();
                        sb.EmitParamJson(JSON.parse("[]"));
                        sb.EmitPushString("rootNameHash");
                        scriptaddress = entity_1.Consts.baseContract.hexToBytes().reverse();
                        sb.EmitAppCall(scriptaddress);
                        data = sb.ToArray();
                        return [4 /*yield*/, wwwtool_1.WWW.rpc_getInvokescript(data)];
                    case 1:
                        result = _a.sent();
                        try {
                            state = result["state"];
                            // info2.textContent = "";
                            if (state.includes("HALT, BREAK")) {
                                // info2.textContent += "Succ\n";
                            }
                            stack = result["stack"];
                            //find name 他的type 有可能是string 或者ByteArray
                            if (stack[0].type == "ByteArray") {
                                nameHash = stack[0]["value"].hexToBytes();
                            }
                            return [2 /*return*/, nameHash];
                        }
                        catch (e) {
                            return [2 /*return*/, e.message];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //返回域名详情
    NNSTool.getOwnerInfo = function (domain, scriptaddress) {
        return __awaiter(this, void 0, void 0, function () {
            var info, sb, data, result, state, stackarr, stack, bt, parentOwner, domainstr, parentHash, bt, root, a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        info = new entity_1.DomainInfo();
                        sb = new ThinNeo.ScriptBuilder();
                        sb.EmitParamJson(["(bytes)" + domain.toHexString()]); //第二个参数是个数组
                        sb.EmitPushString("getOwnerInfo");
                        sb.EmitAppCall(scriptaddress);
                        data = sb.ToArray();
                        return [4 /*yield*/, wwwtool_1.WWW.rpc_getInvokescript(data)];
                    case 1:
                        result = _a.sent();
                        try {
                            state = result.state;
                            // info2.textContent = "";
                            if (state.includes("HALT, BREAK")) {
                                // info2.textContent += "Succ\n";
                            }
                            stackarr = result["stack"];
                            if (stackarr[0].type == "Array") {
                                stack = stackarr[0].value;
                                if (stack[0].type == "ByteArray") {
                                    info.owner = stack[0].value.hexToBytes();
                                }
                                if (stack[1].type == "ByteArray") {
                                    info.register = stack[1].value.hexToBytes();
                                }
                                if (stack[2].type == "ByteArray") {
                                    info.resolver = stack[2].value.hexToBytes();
                                }
                                if (stack[3].type == "Integer") {
                                    info.ttl = new Neo.BigInteger(stack[3].value).toString();
                                }
                                if (stack[3].type = "ByteArray") {
                                    bt = stack[3].value.hexToBytes();
                                    info.ttl = Neo.BigInteger.fromUint8ArrayAutoSign(bt.clone()).toString();
                                }
                                if (stack[4].type = "ByteArray") {
                                    parentOwner = stack[5].value.hexToBytes();
                                }
                                if (stack[5].type = "String") {
                                    domainstr = stack[5].value;
                                }
                                if (stack[6].type = "ByteArray") {
                                    parentHash = stack[6].value.hexToBytes();
                                }
                                if (stack[7].type = "ByteArray") {
                                    bt = stack[7].value.hexToBytes();
                                    root = Neo.BigInteger.fromUint8ArrayAutoSign(bt);
                                }
                                if (stack[7].type = "Integer") {
                                    a = new Neo.BigInteger(stack[7].value);
                                }
                            }
                        }
                        catch (e) {
                        }
                        // console.log(info);
                        return [2 /*return*/, info];
                }
            });
        });
    };
    //返回域名hash
    NNSTool.getNameHash = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var namehash, domainarr, subdomain, root, nnshash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        domainarr = domain.split('.');
                        subdomain = domainarr[0];
                        return [4 /*yield*/, NNSTool.getRootName()];
                    case 1:
                        root = _a.sent();
                        domainarr.shift();
                        domainarr.push(root);
                        nnshash = NNSTool.nameHashArray(domainarr);
                        return [2 /*return*/, nnshash];
                }
            });
        });
    };
    /**
     * 生成解析器
     * @param protocol
     * @param nnshash
     * @param scriptaddress
     */
    NNSTool.setResolve = function (nnshash, resolverhash) {
        return __awaiter(this, void 0, void 0, function () {
            var current, hash, hashstr, nnshashstr, resolvestr, scriptaddress, sb, random_uint8, random_int, data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        current = entity_1.LoginInfo.getCurrentLogin();
                        hash = ThinNeo.Helper.GetPublicKeyScriptHashFromPublicKey(current.pubkey);
                        hashstr = hash.reverse().toHexString();
                        nnshashstr = nnshash.reverse().toHexString();
                        resolvestr = resolverhash.reverse().toHexString();
                        scriptaddress = entity_1.Consts.baseContract.hexToBytes().reverse();
                        sb = new ThinNeo.ScriptBuilder();
                        random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues(new Uint8Array(32));
                        random_int = Neo.BigInteger.fromUint8Array(random_uint8);
                        //塞入随机数
                        sb.EmitPushNumber(random_int);
                        sb.Emit(ThinNeo.OpCode.DROP);
                        sb.EmitParamJson([
                            "(hex160)0x" + hashstr,
                            "(hex256)0x" + nnshashstr,
                            "(hex160)0x" + resolvestr
                        ]); //第二个参数是个数组
                        sb.EmitPushString("owner_SetResolver");
                        sb.EmitAppCall(scriptaddress);
                        data = sb.ToArray();
                        console.log(data.toHexString());
                        return [4 /*yield*/, cointool_1.CoinTool.contractInvokeTrans_attributes(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    NNSTool.setResolveData = function (nnshash, str, resolve) {
        return __awaiter(this, void 0, void 0, function () {
            var namehash, current, hash, hashstr, nnshashstr, scriptaddress, sb, random_uint8, random_int, data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        current = entity_1.LoginInfo.getCurrentLogin();
                        hash = ThinNeo.Helper.GetPublicKeyScriptHashFromPublicKey(current.pubkey);
                        hashstr = hash.reverse().toHexString();
                        nnshashstr = nnshash.reverse().toHexString();
                        scriptaddress = resolve.hexToBytes();
                        sb = new ThinNeo.ScriptBuilder();
                        random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues(new Uint8Array(32));
                        random_int = Neo.BigInteger.fromUint8Array(random_uint8);
                        //塞入随机数
                        sb.EmitPushNumber(random_int);
                        sb.Emit(ThinNeo.OpCode.DROP);
                        sb.EmitParamJson([
                            "(hex160)0x" + hashstr,
                            "(hex256)0x" + nnshashstr,
                            "(str)1",
                            "(str)addr",
                            "(str)" + str
                        ]);
                        sb.EmitPushString("setResolveData");
                        sb.EmitAppCall(scriptaddress);
                        data = sb.ToArray();
                        return [4 /*yield*/, cointool_1.CoinTool.contractInvokeTrans_attributes(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NNSTool.resolveData = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var scriptaddress, arr, nnshash, nnshashstr, sb, data, res, addr, state, stack, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        scriptaddress = entity_1.Consts.baseContract.hexToBytes().reverse();
                        arr = domain.split(".");
                        nnshash = NNSTool.nameHashArray(arr);
                        nnshashstr = nnshash.reverse().toHexString();
                        sb = new ThinNeo.ScriptBuilder();
                        sb.EmitParamJson([
                            "(str)addr",
                            "(hex256)0x" + nnshashstr,
                            "(str)1"
                        ]);
                        sb.EmitPushString("resolve");
                        sb.EmitAppCall(scriptaddress);
                        data = sb.ToArray();
                        return [4 /*yield*/, wwwtool_1.WWW.rpc_getInvokescript(data)];
                    case 1:
                        res = _a.sent();
                        addr = "";
                        try {
                            state = res.state;
                            // info2.textContent = "";
                            if (state.includes("HALT, BREAK")) {
                                stack = res.stack;
                                //find name 他的type 有可能是string 或者ByteArray
                                if (stack[0].type == "ByteArray") {
                                    if (stack[0].value != "00") {
                                        value = stack[0].value.hexToBytes();
                                        addr = ThinNeo.Helper.Bytes2String(value);
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.log(e);
                        }
                        return [2 /*return*/, addr];
                }
            });
        });
    };
    //解析域名完整模式
    NNSTool.resolveFull = function (protocol, nameArray) {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    /**
     * 获得所有者
     * @param nnshash 根域名hash
     * @param subdomain 二级域名
     * @param scriptaddress scriptaddress
     */
    NNSTool.getSubOwner = function (nnshash, subdomain, scriptaddress) {
        return __awaiter(this, void 0, void 0, function () {
            var owner, sb, data, result, state, stack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        owner = "";
                        sb = new ThinNeo.ScriptBuilder();
                        //var scriptaddress = Consts.registerContract.hexToBytes().reverse();
                        sb.EmitParamJson(["(bytes)" + nnshash.toHexString(), "(str)" + subdomain]); //第二个参数是个数组
                        sb.EmitPushString("getSubOwner");
                        sb.EmitAppCall(scriptaddress);
                        data = sb.ToArray();
                        return [4 /*yield*/, wwwtool_1.WWW.rpc_getInvokescript(data)];
                    case 1:
                        result = _a.sent();
                        try {
                            state = result.state;
                            // info2.textContent = "";
                            if (state.includes("HALT, BREAK")) {
                                stack = result.stack;
                                //find name 他的type 有可能是string 或者ByteArray
                                if (stack[0].type == "ByteArray") {
                                    if (stack[0].value != "00") {
                                        owner = ThinNeo.Helper.GetAddressFromScriptHash(stack[0].value.hexToBytes());
                                    }
                                }
                            }
                        }
                        catch (e) {
                            console.log(e);
                        }
                        return [2 /*return*/, owner];
                }
            });
        });
    };
    /**
     * 域名转hash
     * #region 域名转hash算法
     * 域名转hash算法
     * aaa.bb.test =>{"test","bb","aa"}
     * @param domain 域名
     */
    NNSTool.nameHash = function (domain) {
        var domain_bytes = ThinNeo.Helper.String2Bytes(domain);
        var hashd = Neo.Cryptography.Sha256.computeHash(domain_bytes);
        var namehash = new Uint8Array(hashd);
        return namehash.clone();
    };
    /**
     * 子域名转hash
     * @param roothash  根域名hash
     * @param subdomain 子域名
     */
    NNSTool.nameHashSub = function (roothash, subdomain) {
        var bs = ThinNeo.Helper.String2Bytes(subdomain);
        if (bs.length == 0)
            return roothash;
        var domain = Neo.Cryptography.Sha256.computeHash(bs);
        var domain_bytes = new Uint8Array(domain);
        var domainUint8arry = domain_bytes.concat(roothash);
        var sub = Neo.Cryptography.Sha256.computeHash(domainUint8arry);
        var sub_bytes = new Uint8Array(sub);
        return sub_bytes.clone();
    };
    /**
     * 返回一组域名的最终hash
     * @param domainarray 域名倒叙的数组
     */
    NNSTool.nameHashArray = function (domainarray) {
        domainarray.reverse();
        var hash = NNSTool.nameHash(domainarray[0]);
        for (var i = 1; i < domainarray.length; i++) {
            hash = NNSTool.nameHashSub(hash, domainarray[i]);
        }
        return hash;
    };
    NNSTool.verifyDomain = function (domain) {
        //check domain valid
        var reg = /^(.+\.)(test|[a-z][a-z])$/;
        if (!reg.test(domain)) {
            return false;
        }
        else {
            return true;
        }
    };
    NNSTool.verifyAddr = function (addr) {
        var reg = /^[a-zA-Z0-9]{34,34}$/;
        if (!reg.test(addr)) {
            return false;
        }
        else {
            return true;
        }
    };
    NNSTool.setDomainStatus = function () {
    };
    NNSTool.initStatus = function () {
        NNSTool.domainStatus = entity_1.DomainStatus.getStatus();
    };
    return NNSTool;
}());
exports.NNSTool = NNSTool;


/***/ }),

/***/ "cfoD":
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
var vue_class_component_1 = __webpack_require__("c+8m");
var wallet_vue_1 = __webpack_require__("PPZq");
var nnstool_1 = __webpack_require__("ar5l");
var wwwtool_1 = __webpack_require__("50aY");
var entity_1 = __webpack_require__("6nHw");
var Valert_vue_1 = __webpack_require__("Gieu");
var Spinner_vue_1 = __webpack_require__("+jyM");
var bubble_vue_1 = __webpack_require__("VbKi");
var storagetool_1 = __webpack_require__("5LD5");
var timetool_1 = __webpack_require__("48oz");
var NNS = /** @class */ (function (_super) {
    __extends(NNS, _super);
    function NNS() {
        var _this = _super.call(this) || this;
        _this.network = ".test";
        _this.nnsstr = "";
        _this.domainerr = false;
        _this.errmsg = "";
        _this.btn_register = true;
        _this.alert_addr = "";
        _this.alert_domain = "";
        _this.alert_contract = "0xabb0f1f3f035dd7ad80ca805fce58d62c517cc6b";
        _this.alert_resolve = true;
        _this.alert_resolver_disable = false;
        _this.alert_mapping_disable = false;
        _this.alert_config_state = 0;
        _this.alert_resolver_state = 0;
        _this.domainarr = new Array();
        Neo.Cryptography.RandomNumberGenerator.startCollectors();
        return _this;
    }
    NNS.prototype.mounted = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nnstool_1.NNSTool.initRootDomain()];
                    case 1:
                        _a.sent();
                        nnstool_1.NNSTool.initStatus();
                        this.getDomainsByAddr();
                        this.awaitHeight();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 校验域名
     */
    NNS.prototype.verifyDomain = function () {
        return __awaiter(this, void 0, void 0, function () {
            var regStr, re, domains, timestamp, copare;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.nnsstr = this.nnsstr.trim();
                        regStr = "^([a-zA-Z0-9-])";
                        re = new RegExp(regStr);
                        if (!!re.exec(this.nnsstr)) return [3 /*break*/, 1];
                        this.domainerr = true;
                        this.errmsg = "Please enter a domain name in the correct format ";
                        return [2 /*return*/];
                    case 1: return [4 /*yield*/, nnstool_1.NNSTool.queryDomainInfo(this.nnsstr + ".test")];
                    case 2:
                        domains = _a.sent();
                        if (domains.register && domains.ttl) {
                            timestamp = new Date().getTime();
                            copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(domains.ttl).multiply(1000));
                            // let copare: number = new Neo.BigInteger(timestamp).compareTo(doamininfo.ttl.multiply(1000));
                            if (copare < 0) {
                                // console.log('域名已到期');
                                this.domainerr = true;
                            }
                            else {
                                // mui.toast("The current domain name is registered : ");
                            }
                        }
                        else {
                            this.domainerr = false;
                            this.errmsg = "";
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     */
    NNS.prototype.nnsRegister = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, delres, res_1, state, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.verifyDomain();
                        if (!!this.domainerr) return [3 /*break*/, 8];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, nnstool_1.NNSTool.registerDomain(this.nnsstr)];
                    case 2:
                        res = _a.sent();
                        if (!res.err) return [3 /*break*/, 3];
                        console.error(res.info);
                        return [3 /*break*/, 6];
                    case 3:
                        this.btn_register = false;
                        return [4 /*yield*/, wwwtool_1.WWW.delnnsinfo(this.nnsstr + ".test")];
                    case 4:
                        delres = _a.sent();
                        if (!(delres == "suc")) return [3 /*break*/, 6];
                        return [4 /*yield*/, wwwtool_1.WWW.setnnsinfo(entity_1.LoginInfo.getCurrentAddress(), this.nnsstr + ".test", 0)];
                    case 5:
                        res_1 = _a.sent();
                        if (res_1 == "suc") {
                            state = new entity_1.DomainStatus();
                            state.await_register = true;
                            state.domainname = this.nnsstr + ".test";
                            entity_1.DomainStatus.setStatus(state);
                            this.getDomainsByAddr();
                        }
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _a.sent();
                        mui.alert(error_1.message);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获得域名列表
     */
    NNS.prototype.getDomainsByAddr = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, arr, state, _a, _b, _i, i, n, domain, a, msg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, wwwtool_1.WWW.getnnsinfo(entity_1.LoginInfo.getCurrentAddress())];
                    case 1:
                        res = _c.sent();
                        arr = new Array();
                        state = entity_1.DomainStatus.getStatus();
                        _a = [];
                        for (_b in res)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        i = _a[_i];
                        if (!res.hasOwnProperty(i)) return [3 /*break*/, 4];
                        n = parseInt(i);
                        domain = res[n];
                        a = state[domain["name"]] ? state[domain["name"]] : new entity_1.DomainStatus();
                        return [4 /*yield*/, this.queryDomainInfo(domain["name"])];
                    case 3:
                        msg = _c.sent();
                        if (a.await_resolver) {
                            if (a.resolver == msg.resolver) {
                                a.await_resolver = false;
                                msg.await_resolver = false;
                            }
                            else {
                                msg.await_resolver = true;
                            }
                        }
                        if (a.await_mapping) {
                            if (a.mapping == msg.mapping) {
                                a.await_mapping = false;
                                msg.await_mapping = false;
                            }
                            else {
                                msg.await_mapping = true;
                            }
                        }
                        arr.push(msg);
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        sessionStorage.setItem("domain-status", JSON.stringify(state ? state : {}));
                        this.domainarr = arr.reverse();
                        if (this.alert_domain) {
                            if (!!state[this.alert_domain]) {
                                (!!state[this.alert_domain]["await_resolver"]) ? this.alert_resolver_state = 1 : this.alert_resolver_state = 2;
                                (!!state[this.alert_domain]["await_mapping"]) ? this.alert_config_state = 1 : this.alert_config_state = 2;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param domain 查询域名信息
     */
    NNS.prototype.queryDomainInfo = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var dommsg, msg, timestamp, copare, resolver, resolver_str, addr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dommsg = new entity_1.Domainmsg();
                        dommsg.domainname = domain;
                        return [4 /*yield*/, nnstool_1.NNSTool.queryDomainInfo(domain)];
                    case 1:
                        msg = _a.sent();
                        if (!msg.ttl) return [3 /*break*/, 5];
                        timestamp = new Date().getTime();
                        copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(msg.ttl).multiply(1000));
                        copare < 0 ? dommsg.isExpiration = false : dommsg.isExpiration = true;
                        dommsg.time = timetool_1.DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(parseInt(msg.ttl + "000")));
                        dommsg.await_resolver = false;
                        if (!msg["resolver"]) return [3 /*break*/, 3];
                        resolver = msg["resolver"];
                        resolver_str = resolver.toHexString();
                        return [4 /*yield*/, nnstool_1.NNSTool.resolveData(domain)];
                    case 2:
                        addr = _a.sent();
                        dommsg.mapping = addr;
                        dommsg.resolver = resolver_str;
                        return [3 /*break*/, 4];
                    case 3:
                        dommsg.resolver = "";
                        dommsg.mapping = "";
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        dommsg.await_register = true;
                        dommsg.isExpiration = false;
                        _a.label = 6;
                    case 6: return [2 /*return*/, dommsg];
                }
            });
        });
    };
    /**
     *
     * @param msg 信息详情
     */
    NNS.prototype.resolve = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var name;
            return __generator(this, function (_a) {
                this.alert_domainmsg = msg;
                if (msg.resolver && !msg.await_resolver) {
                    this.alert_resolver_state = 2;
                }
                if (msg.await_resolver) {
                    this.alert_resolver_state = 1;
                }
                if (!msg.resolver && !msg.await_resolver) {
                    this.alert_resolver_state = 0;
                }
                if (msg.mapping && !msg.await_mapping) {
                    this.alert_config_state = 2;
                }
                if (msg.await_mapping) {
                    this.alert_config_state = 1;
                }
                if (!msg.mapping && !msg.await_mapping) {
                    this.alert_resolver_state = 0;
                }
                name = this.alert_domainmsg.domainname;
                this.alert_domain = name;
                this.alert_addr = this.alert_domainmsg.mapping;
                this.$refs["alert"]["show"] = true;
                return [2 /*return*/];
            });
        });
    };
    /**
     * 注册解析器
     */
    NNS.prototype.setresolve = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arr, nnshash, contract, res, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.alert_resolve = false;
                        this.alert_resolver_state = 1;
                        arr = this.alert_domain.split(".");
                        nnshash = nnstool_1.NNSTool.nameHashArray(arr);
                        contract = this.alert_contract.hexToBytes().reverse();
                        return [4 /*yield*/, nnstool_1.NNSTool.setResolve(nnshash, contract)];
                    case 1:
                        res = _a.sent();
                        state = new entity_1.DomainStatus();
                        state.await_resolver = true;
                        state.domainname = this.alert_domain;
                        state.resolver = this.alert_contract.hexToBytes().reverse().toHexString();
                        entity_1.DomainStatus.setStatus(state);
                        this.getDomainsByAddr();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 设置解析地址
     */
    NNS.prototype.configResolve = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arr, nnshash, res, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arr = this.alert_domain.split(".");
                        nnshash = nnstool_1.NNSTool.nameHashArray(arr);
                        return [4 /*yield*/, nnstool_1.NNSTool.setResolveData(nnshash, this.alert_addr, this.alert_domainmsg.resolver)];
                    case 1:
                        res = _a.sent();
                        this.alert_config_state = 1;
                        state = new entity_1.DomainStatus();
                        state.await_mapping = true;
                        state.domainname = this.alert_domain;
                        state.mapping = this.alert_addr;
                        entity_1.DomainStatus.setStatus(state);
                        this.getDomainsByAddr();
                        return [2 /*return*/];
                }
            });
        });
    };
    NNS.prototype.awaitHeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var str, currentheight, oldheight;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = storagetool_1.StorageTool.getStorage("current-height");
                        return [4 /*yield*/, wwwtool_1.WWW.api_getHeight()];
                    case 1:
                        currentheight = _a.sent();
                        oldheight = currentheight;
                        str ? oldheight = parseInt(str) : storagetool_1.StorageTool.setStorage("current-height", currentheight + "");
                        if (oldheight < currentheight) {
                            this.getDomainsByAddr();
                            oldheight++;
                            storagetool_1.StorageTool.setStorage("current-height", oldheight + "");
                        }
                        return [4 /*yield*/, setTimeout(function () {
                                _this.awaitHeight();
                            }, 5000)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NNS = __decorate([
        vue_class_component_1.default({
            components: {
                "wallet-layout": wallet_vue_1.default,
                "v-alert": Valert_vue_1.default,
                "spinner-wrap": Spinner_vue_1.default,
                "bubble-wrap": bubble_vue_1.default
            }
        }),
        __metadata("design:paramtypes", [])
    ], NNS);
    return NNS;
}(vue_1.default));
exports.default = NNS;


/***/ }),

/***/ "cz4m":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "dkEd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/settings.ts
var settings = __webpack_require__("lqCQ");
var settings_default = /*#__PURE__*/__webpack_require__.n(settings);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-ce834676","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/settings.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v("Settings")])]),_vm._v(" "),_c('div',{staticClass:"panel panel-default settings"},[_c('div',[_c('div',{staticStyle:{"padding-top":"2.8%","padding-bottom":"0.9%","padding-left":"2.3%"}},[_c('span',[_vm._v("My Wallet Adress :  "),_c('span',{staticClass:"user-select-ok"},[_vm._v(_vm._s(_vm.address))])])]),_vm._v(" "),_c('div',{staticStyle:{"padding-top":"2.8%","padding-bottom":"0.9%","padding-left":"2.3%"}},[_c('span',[_vm._v("My WIF :   ")]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel",on:{"click":_vm.visibleWif}},[_vm._v("Visible")]),_vm._v(" "),_c('span',{staticClass:"user-select-ok"},[_vm._v("  "+_vm._s(_vm.wif))])]),_vm._v(" "),_c('div',{staticStyle:{"padding-top":"2.8%","padding-bottom":"0.9%","padding-left":"2.3%"}},[_c('span',[_vm._v("My Wallet file :   ")]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel",on:{"click":_vm.download}},[_vm._v("Create")]),_vm._v("   \n                    "),(_vm.href!='')?_c('a',{attrs:{"download":_vm.walletname,"href":_vm.href}},[_vm._v("download")]):_vm._e()]),_vm._v(" "),_c('div',{staticStyle:{"padding-top":"2.8%","padding-bottom":"0.9%","padding-left":"2.3%"}},[_c('p',[_vm._v("This information is very important . It may cause your loss if you lose it .  \n                        "),_c('br'),_vm._v(" Save your keystore file and make copies of your wallet address and your WIF . Don't lose them .\n                    ")])])])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var pages_settings = (esExports);
// CONCATENATED MODULE: ./src/pages/settings.vue
function injectStyle (ssrContext) {
  __webpack_require__("D8AQ")
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
  settings_default.a,
  pages_settings,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_pages_settings = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "f3HO":
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
var wwwtool_1 = __webpack_require__("50aY");
var cointool_1 = __webpack_require__("pLPz");
var neotools_1 = __webpack_require__("PMwo");
var entity_1 = __webpack_require__("6nHw");
var storagetool_1 = __webpack_require__("5LD5");
var wallet_vue_1 = __webpack_require__("PPZq");
var vue_1 = __webpack_require__("/5sW");
var vue_class_component_1 = __webpack_require__("c+8m");
var timetool_1 = __webpack_require__("48oz");
var nnstool_1 = __webpack_require__("ar5l");
var transfer = /** @class */ (function (_super) {
    __extends(transfer, _super);
    function transfer() {
        var _this = _super.call(this) || this;
        _this.balances = [];
        _this.balance = new entity_1.BalanceInfo();
        _this.addrerr = "";
        _this.amounterr = "";
        _this.txs = [];
        _this.nextpage = true;
        _this.cutshow = true;
        _this.target = "";
        _this.isDomain = false;
        _this.toaddress = "";
        _this.amount = "";
        _this.asset = "";
        _this.txpage = 1;
        Neo.Cryptography.RandomNumberGenerator.startCollectors();
        return _this;
    }
    transfer.prototype.mounted = function () {
        var _this = this;
        var str = storagetool_1.StorageTool.getStorage("balances_asset");
        if (str == null)
            this.balances = new Array();
        else {
            this.balances = JSON.parse(str);
            var choose = storagetool_1.StorageTool.getStorage("transfer_choose");
            this.asset = (choose == null ? this.balances[0].asset : choose);
            var n = this.balances.findIndex(function (b) { return b.asset == _this.asset; });
            n = n < 0 ? 0 : n;
            this.balance = this.balances[n];
            this.history();
            // this.awaitHeight();
        }
    };
    transfer.prototype.cutPage = function (btn) {
        btn == "next" ? this.txpage++ : (this.txpage <= 1 ? this.txpage = 1 : this.txpage--);
        this.history();
    };
    transfer.prototype.choose = function (assetid) {
        var _this = this;
        this.asset = assetid;
        storagetool_1.StorageTool.setStorage("transfer_choose", assetid);
        var n = this.balances.findIndex(function (b) { return b.asset == _this.asset; });
        this.balance = this.balances[n];
        this.verify_Amount();
    };
    transfer.prototype.updateBalances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currcountAddr, balances, nep5balances, height;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currcountAddr = entity_1.LoginInfo.getCurrentAddress();
                        return [4 /*yield*/, wwwtool_1.WWW.api_getBalance(currcountAddr)];
                    case 1:
                        balances = _a.sent();
                        return [4 /*yield*/, wwwtool_1.WWW.api_getnep5Balance(currcountAddr)];
                    case 2:
                        nep5balances = _a.sent();
                        return [4 /*yield*/, wwwtool_1.WWW.api_getHeight()];
                    case 3:
                        height = _a.sent();
                        this.balances = entity_1.BalanceInfo.getBalancesByArr(balances, nep5balances, height);
                        storagetool_1.StorageTool.setStorage("balances_asset", JSON.stringify(this.balances));
                        return [2 /*return*/];
                }
            });
        });
    };
    transfer.prototype.verify_addr = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isDomain, isAddress, addr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isDomain = nnstool_1.NNSTool.verifyDomain(this.target);
                        isAddress = nnstool_1.NNSTool.verifyAddr(this.target);
                        if (!isDomain) return [3 /*break*/, 2];
                        return [4 /*yield*/, nnstool_1.NNSTool.resolveData(this.target)];
                    case 1:
                        addr = _a.sent();
                        if (addr) {
                            this.toaddress = addr;
                            this.isDomain = true;
                            this.addrerr = 'false';
                            return [2 /*return*/, true];
                        }
                        else {
                            this.addrerr = 'true';
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        if (isAddress) {
                            if (neotools_1.neotools.verifyPublicKey(this.target)) {
                                this.toaddress = this.target;
                                this.addrerr = 'false';
                                return [2 /*return*/, true];
                            }
                        }
                        else {
                            this.addrerr = 'true';
                            return [2 /*return*/, false];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    transfer.prototype.verify_Amount = function () {
        var balancenum = Neo.Fixed8.parse(this.balance.balance + '');
        var inputamount = Neo.Fixed8.parse(this.amount);
        var compare = balancenum.compareTo(inputamount);
        compare >= 1 ? this.amount = this.amount : this.amount = balancenum.toString();
        return true;
    };
    transfer.prototype.send = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, his, num, bear, height, res, his, num, bear, height, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        if (!(this.verify_addr() && this.verify_Amount())) return [3 /*break*/, 8];
                        if (!(!!this.balance["type"] && this.balance.type == "nep5")) return [3 /*break*/, 5];
                        return [4 /*yield*/, cointool_1.CoinTool.nep5Transaction(entity_1.LoginInfo.getCurrentAddress(), this.toaddress, this.asset, this.amount)];
                    case 1:
                        res = _a.sent();
                        if (!!res["err"]) return [3 /*break*/, 3];
                        mui.toast("Your transaction has been sent, please check it later");
                        his = new entity_1.History();
                        his.address = this.toaddress;
                        his.asset = this.asset;
                        his.value = this.amount;
                        his.txtype = "in";
                        his["waiting"] = true;
                        his.time = timetool_1.DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
                        his.assetname = this.balance.names;
                        his.txid = res.info;
                        this.txs = [his].concat(this.txs);
                        num = parseFloat(this.balance.balance + "");
                        bear = num - parseFloat(this.amount);
                        this.balance.balance = bear;
                        this.amount = "";
                        return [4 /*yield*/, wwwtool_1.WWW.api_getHeight()];
                    case 2:
                        height = _a.sent();
                        entity_1.BalanceInfo.setBalanceSotre(this.balance, height);
                        entity_1.History.setHistoryStore(his, height);
                        storagetool_1.StorageTool.setStorage("current-height", height + "");
                        return [3 /*break*/, 4];
                    case 3:
                        mui.alert("Transaction failure");
                        _a.label = 4;
                    case 4: return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, cointool_1.CoinTool.rawTransaction(this.toaddress, this.asset, this.amount)];
                    case 6:
                        res = _a.sent();
                        mui.toast(res.info);
                        his = new entity_1.History();
                        his.address = this.toaddress;
                        his.asset = this.asset;
                        his.value = this.amount;
                        his.txtype = "in";
                        his["waiting"] = true;
                        his.time = timetool_1.DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
                        his.assetname = this.balance.names;
                        his.txid = res.info;
                        this.txs = [his].concat(this.txs);
                        num = parseFloat(this.balance.balance + "");
                        bear = num - parseFloat(this.amount);
                        this.amount = "";
                        this.balance.balance = bear;
                        return [4 /*yield*/, wwwtool_1.WWW.api_getHeight()];
                    case 7:
                        height = _a.sent();
                        entity_1.BalanceInfo.setBalanceSotre(this.balance, height);
                        entity_1.History.setHistoryStore(his, height);
                        storagetool_1.StorageTool.setStorage("current-height", height + "");
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_1 = _a.sent();
                        mui.alert("-_-!!!You don't have enough change, you have to wait for the block height to change before you can make the next transaction ");
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    transfer.prototype.history = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var currentAddress, res, h, his, index, tx, txid, vins, type, vouts, value, txtype, assetType, blockindex, time, date, assetname, vin, asset, amount, address, nep5, history, arr, currcount, _a, _b, _i, index_1, i, out, address, amount, asset, assetname, nep5, n, assets, _c, _d, _e, asset, amount, assetname, nep5, assets, address, data, asset, amount, history;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, cointool_1.CoinTool.initAllAsset()];
                    case 1:
                        _f.sent();
                        currentAddress = entity_1.LoginInfo.getCurrentAddress();
                        return [4 /*yield*/, wwwtool_1.WWW.gettransbyaddress(currentAddress, 5, this.txpage)];
                    case 2:
                        res = _f.sent();
                        return [4 /*yield*/, wwwtool_1.WWW.api_getHeight()];
                    case 3:
                        h = _f.sent();
                        res = res ? res : []; //将空值转为长度0的数组
                        this.txpage == 1 && res.length > 5 ? this.cutshow = false : this.cutshow = true;
                        entity_1.History.delHistoryStoreByHeight(h);
                        his = entity_1.History.getHistoryStore();
                        if (!(res.length > 0)) return [3 /*break*/, 24];
                        this.txs = [];
                        if (his.length) {
                            his.map(function (hi) { _this.txs.push(hi.history); });
                        }
                        index = 0;
                        _f.label = 4;
                    case 4:
                        if (!(index < res.length)) return [3 /*break*/, 24];
                        tx = res[index];
                        txid = tx["txid"];
                        txid = txid.replace('0x', '');
                        vins = tx["vin"];
                        type = tx["type"];
                        vouts = tx["vout"];
                        value = tx["value"];
                        txtype = tx["txType"];
                        assetType = tx["assetType"];
                        blockindex = tx["blockindex"];
                        time = tx["blocktime"].includes("$date") ? JSON.parse(tx["blocktime"])["$date"] : parseInt(tx["blocktime"] + "000");
                        date = timetool_1.DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(time));
                        if (!(type == "out")) return [3 /*break*/, 9];
                        if (!(vins && vins.length == 1)) return [3 /*break*/, 8];
                        assetname = "";
                        vin = vins[0];
                        asset = vin["asset"];
                        amount = value[asset];
                        address = vin["address"];
                        if (!(assetType == "utxo")) return [3 /*break*/, 5];
                        assetname = cointool_1.CoinTool.assetID2name[asset];
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, wwwtool_1.WWW.getNep5Asset(asset)];
                    case 6:
                        nep5 = _f.sent();
                        assetname = nep5["name"];
                        _f.label = 7;
                    case 7:
                        history = new entity_1.History();
                        history.time = date;
                        history.txid = txid;
                        history.assetname = assetname;
                        history.address = address;
                        history.value = parseFloat(amount).toString();
                        history.txtype = type;
                        this.txs.push(history);
                        _f.label = 8;
                    case 8: return [3 /*break*/, 23];
                    case 9:
                        arr = {};
                        currcount = 0;
                        _a = [];
                        for (_b in vouts)
                            _a.push(_b);
                        _i = 0;
                        _f.label = 10;
                    case 10:
                        if (!(_i < _a.length)) return [3 /*break*/, 16];
                        index_1 = _a[_i];
                        i = parseInt(index_1);
                        out = vouts[i];
                        address = out["address"];
                        amount = out["value"];
                        asset = out["asset"];
                        assetname = "";
                        if (!(address != currentAddress)) return [3 /*break*/, 14];
                        if (!(assetType == "utxo")) return [3 /*break*/, 11];
                        assetname = cointool_1.CoinTool.assetID2name[asset];
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, wwwtool_1.WWW.getNep5Asset(asset)];
                    case 12:
                        nep5 = _f.sent();
                        assetname = nep5["name"];
                        _f.label = 13;
                    case 13:
                        n = out["n"];
                        if (arr[address] && arr[address][assetname]) {
                            arr[address][assetname] += amount;
                        }
                        else {
                            assets = {};
                            assets[assetname] = amount;
                            arr[address] = assets;
                        }
                        return [3 /*break*/, 15];
                    case 14:
                        currcount++;
                        _f.label = 15;
                    case 15:
                        _i++;
                        return [3 /*break*/, 10];
                    case 16:
                        if (!(currcount == vouts.length)) return [3 /*break*/, 22];
                        _c = [];
                        for (_d in value)
                            _c.push(_d);
                        _e = 0;
                        _f.label = 17;
                    case 17:
                        if (!(_e < _c.length)) return [3 /*break*/, 22];
                        asset = _c[_e];
                        if (!value.hasOwnProperty(asset)) return [3 /*break*/, 21];
                        amount = value[asset];
                        assetname = "";
                        if (!(assetType == "utxo")) return [3 /*break*/, 18];
                        assetname = cointool_1.CoinTool.assetID2name[asset];
                        return [3 /*break*/, 20];
                    case 18: return [4 /*yield*/, wwwtool_1.WWW.getNep5Asset(asset)];
                    case 19:
                        nep5 = _f.sent();
                        assetname = nep5["name"];
                        _f.label = 20;
                    case 20:
                        assets = {};
                        assets[assetname] = amount;
                        arr[currentAddress] = assets;
                        _f.label = 21;
                    case 21:
                        _e++;
                        return [3 /*break*/, 17];
                    case 22:
                        for (address in arr) {
                            if (arr.hasOwnProperty(address)) {
                                data = arr[address];
                                for (asset in data) {
                                    if (data.hasOwnProperty(asset)) {
                                        amount = data[asset];
                                        history = new entity_1.History();
                                        history.time = date;
                                        history.txid = txid;
                                        history.assetname = asset;
                                        history.address = address;
                                        history.value = parseFloat(amount).toString();
                                        history.txtype = type;
                                        this.txs.push(history);
                                    }
                                }
                            }
                        }
                        _f.label = 23;
                    case 23:
                        index++;
                        return [3 /*break*/, 4];
                    case 24:
                        //分页判断
                        res.length < 5 ? this.nextpage = false : this.nextpage = true; //判断是否是最后一页
                        this.txpage > 1 && res == 0 ? this.txpage-- : this.txpage; //判断是否到最后一页
                        return [2 /*return*/];
                }
            });
        });
    };
    transfer.prototype.awaitHeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var str, currentheight, oldheight;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = storagetool_1.StorageTool.getStorage("current-height");
                        return [4 /*yield*/, wwwtool_1.WWW.api_getHeight()];
                    case 1:
                        currentheight = _a.sent();
                        oldheight = currentheight;
                        str ? oldheight = parseInt(str) : storagetool_1.StorageTool.setStorage("current-height", currentheight + "");
                        if (!(currentheight - oldheight >= 2)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.history()];
                    case 2:
                        _a.sent();
                        sessionStorage.removeItem("current-height");
                        return [2 /*return*/];
                    case 3:
                        setTimeout(function () {
                            _this.awaitHeight();
                        }, 5000);
                        return [2 /*return*/];
                }
            });
        });
    };
    transfer = __decorate([
        vue_class_component_1.default({
            components: {
                "wallet-layout": wallet_vue_1.default
            }
        }),
        __metadata("design:paramtypes", [])
    ], transfer);
    return transfer;
}(vue_1.default));
exports.default = transfer;


/***/ }),

/***/ "l7Tq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/layouts/Main.vue
var Main = __webpack_require__("Gc41");
var Main_default = /*#__PURE__*/__webpack_require__.n(Main);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-94f42206","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/layouts/Main.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[_c('nav',{staticClass:"navbar navbar-nel navbar-fixed-top"},[_c('div',{staticClass:"container"},[_vm._m(0,false,false),_vm._v(" "),_c('div',{staticClass:"navbar-collapse collapse",attrs:{"id":"navbar"}},[_c('div',{staticClass:"logo"}),_vm._v(" "),_vm._m(1,false,false),_vm._v(" "),_c('ul',{staticClass:"nav navbar-nav navbar-right"},[_vm._m(2,false,false),_vm._v(" "),(_vm.loginshow)?_c('li',[_c('v-link',{ref:"login",attrs:{"href":"#login"}},[_vm._v("logout")])],1):_vm._e()])])])]),_vm._v(" "),_vm._t("default")],2)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"navbar-header"},[_c('button',{staticClass:"navbar-toggle collapsed",attrs:{"type":"button","data-toggle":"collapse","data-target":"#navbar","aria-expanded":"false","aria-controls":"navbar"}},[_c('span',{staticClass:"sr-only"},[_vm._v("Toggle navigation")]),_vm._v(" "),_c('span',{staticClass:"icon-bar"}),_vm._v(" "),_c('span',{staticClass:"icon-bar"}),_vm._v(" "),_c('span',{staticClass:"icon-bar"})])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"nav navbar-nav navbar-left"},[_c('li',[_c('a',{attrs:{"href":"https://scan.nel.group/#mainnet","target":"_blank"}},[_vm._v("Explorer")])]),_vm._v(" "),_c('li',[_c('a',{staticClass:"active-nel",attrs:{"href":"#wallet"}},[_vm._v("Wallet")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"dropdown"},[_c('a',{staticClass:"dropdown-toggle",attrs:{"data-toggle":"dropdown","role":"button","aria-haspopup":"true","aria-expanded":"false"}},[_c('span',{staticClass:"text",attrs:{"id":"network"}},[_vm._v("TestNet")]),_vm._v(" "),_c('span',{staticClass:" caret"})]),_vm._v(" "),_c('ul',{staticClass:"dropdown-menu dropdown-nel"},[_c('li',{staticClass:"active",attrs:{"id":"testnet-btn"}},[_c('a',{attrs:{"id":"testa"}},[_vm._v("TestNet")])]),_vm._v(" "),_c('li',{attrs:{"id":"mainnet-btn"}},[_c('a',{attrs:{"target":"_blank","href":"https://wallet.nel.group/#login","id":"maina"}},[_vm._v("MainNet")])])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var layouts_Main = (esExports);
// CONCATENATED MODULE: ./src/layouts/Main.vue
function injectStyle (ssrContext) {
  __webpack_require__("Ay4p")
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
  Main_default.a,
  layouts_Main,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_layouts_Main = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "lqCQ":
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
var vue_1 = __webpack_require__("/5sW");
var vue_class_component_1 = __webpack_require__("c+8m");
var wallet_vue_1 = __webpack_require__("PPZq");
var entity_1 = __webpack_require__("6nHw");
var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    function Settings() {
        var _this = _super.call(this) || this;
        _this.address = "";
        _this.wifshow = false;
        _this.wif = "";
        _this.href = "";
        _this.walletname = "";
        return _this;
    }
    Settings.prototype.mounted = function () {
        this.address = entity_1.LoginInfo.getCurrentAddress();
    };
    Settings.prototype.visibleWif = function () {
        this.wifshow = (this.wifshow == true ? false : true);
        var msg = entity_1.LoginInfo.getCurrentLogin();
        var wif = ThinNeo.Helper.GetWifFromPrivateKey(msg.prikey);
        this.wif = (this.wifshow == true ? wif : "");
    };
    Settings.prototype.download = function () {
        var _this = this;
        this.walletname = entity_1.LoginInfo.getCurrentAddress() + ".json";
        var wallet = new ThinNeo.nep6wallet();
        wallet.scrypt = new ThinNeo.nep6ScryptParameters();
        wallet.scrypt.N = 16384;
        wallet.scrypt.r = 8;
        wallet.scrypt.p = 8;
        wallet.accounts = [];
        wallet.accounts[0] = new ThinNeo.nep6account();
        wallet.accounts[0].address = entity_1.LoginInfo.getCurrentAddress();
        mui.prompt('Set the password ', 'Enter your password ', 'Create a wallet', ['cancel', 'confirm'], function (e) {
            if (e.index == 1) {
                ThinNeo.Helper.GetNep2FromPrivateKey(entity_1.LoginInfo.getCurrentLogin().prikey, e.value, wallet.scrypt.N, wallet.scrypt.r, wallet.scrypt.p, function (info, result) {
                    if (info == "finish") {
                        wallet.accounts[0].nep2key = result;
                        wallet.accounts[0].contract = new ThinNeo.contract();
                        wallet.accounts[0].contract.script = ThinNeo.Helper.GetAddressCheckScriptFromPublicKey(entity_1.LoginInfo.getCurrentLogin().pubkey).toHexString();
                        var jsonstr = JSON.stringify(wallet.toJson());
                        var blob = new Blob([ThinNeo.Helper.String2Bytes(jsonstr)]);
                        _this.href = URL.createObjectURL(blob);
                    }
                });
            }
        }, 'div');
        var input = document.querySelector('.mui-popup-input input');
        var download = document.querySelector('.mui-popup-button mui-popup-button-bold');
        input.type = 'password';
    };
    Settings = __decorate([
        vue_class_component_1.default({
            components: {
                "wallet-layout": wallet_vue_1.default
            }
        }),
        __metadata("design:paramtypes", [])
    ], Settings);
    return Settings;
}(vue_1.default));
exports.default = Settings;


/***/ }),

/***/ "owRU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/transfer.ts
var transfer = __webpack_require__("f3HO");
var transfer_default = /*#__PURE__*/__webpack_require__.n(transfer);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1f25c24e","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/transfer.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v("Transfer")])])]),_vm._v(" "),_c('div',{staticClass:"container"},[_c('div',{staticClass:"transfer-panel"},[_c('div',{staticClass:"form-horizontal"},[_c('div',{staticClass:"col-sm-12"},[_c('label',{staticClass:"col-sm-2 control-label",staticStyle:{"padding-top":"20px"},attrs:{"for":"firstname"}},[_vm._v("Asset：")]),_vm._v(" "),_c('div',{staticClass:"col-sm-3"},[_c('div',{staticClass:"dropdown"},[_c('div',{staticClass:"btn dropdown-toggle select-nel",class:_vm.balances.length>0 ? '' : 'select-disabled',attrs:{"type":"button","id":"assets","data-toggle":"dropdown"}},[_c('div',{staticClass:"select-title"},[_vm._v(_vm._s(_vm.balance.names))]),_vm._v(" "),_c('div',{staticClass:"select-caret"},[_c('span',{staticClass:"caret"})])]),_vm._v(" "),_c('ul',{staticClass:"dropdown-menu dropdown-nel",attrs:{"role":"menu","aria-labelledby":"assets"}},_vm._l((_vm.balances),function(balance){return _c('li',{key:balance.asset,class:_vm.asset==balance.asset?'active':'',attrs:{"role":"presentation","value":balance.asset}},[_c('a',{attrs:{"role":"menuitem","tabindex":"-1"},on:{"click":function($event){_vm.choose(balance.asset)}}},[_vm._v(_vm._s(balance.names))])])}))])]),_vm._v(" "),_c('div',{staticClass:"col-sm-4",staticStyle:{"padding-top":"20px"}},[_c('span',[_vm._v("      "+_vm._s(_vm.balance.balance)+" "+_vm._s(_vm.balance.names ? _vm.balance.names + " available" : "")+" ")])])]),_vm._v(" "),_c('div',{staticClass:"col-sm-12",class:_vm.addrerr!=''?(_vm.addrerr == 'true' ?'err':'success') :''},[_c('label',{staticClass:"col-sm-2 control-label",attrs:{"for":""}},[_c('div',{staticStyle:{"padding-top":"40px"}},[_vm._v("Address:")])]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('div',{staticStyle:{"padding-top":"30px"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.target),expression:"target"}],staticClass:"nel-input big",attrs:{"type":"text","placeholder":"Please enter an address or domain name "},domProps:{"value":(_vm.target)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.target=$event.target.value},_vm.verify_addr]}})]),_vm._v(" "),(_vm.isDomain)?_c('p',[_vm._v(_vm._s(_vm.toaddress))]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-sm-3 mess"},[(_vm.addrerr=='true')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("7vgD"),"alt":""}}),_vm._v("   Your adress is incorrect.")]):_vm._e(),_vm._v(" "),(_vm.addrerr=='false')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}})]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"col-sm-12",class:_vm.amounterr!=''?(_vm.amounterr == 'true' ?'err':'success') :''},[_c('label',{staticClass:"col-sm-2 control-label",attrs:{"for":""}},[_c('div',{staticStyle:{"padding-top":"40px"}},[_vm._v("Amount:")])]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('div',{staticStyle:{"padding-top":"30px"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.amount),expression:"amount"}],staticClass:"nel-input big",attrs:{"type":"number"},domProps:{"value":(_vm.amount)},on:{"change":_vm.verify_Amount,"input":[function($event){if($event.target.composing){ return; }_vm.amount=$event.target.value},_vm.verify_Amount]}})])]),_vm._v(" "),_c('div',{staticClass:"col-sm-3 mess"})]),_vm._v(" "),_c('div',{staticClass:"col-sm-12",staticStyle:{"padding-top":"30px"}},[_c('div',{staticClass:"col-sm-6"}),_vm._v(" "),_c('div',{staticClass:"col-sm-3"},[_c('button',{staticClass:"btn btn-link"},[_vm._v("Details")]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.send}},[_vm._v("Send")])])])])])]),_vm._v(" "),_c('div',{staticClass:"container"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v("History")])])]),_vm._v(" "),_c('div',{staticClass:"container"},[_c('div',{staticClass:"history-panel"},[_c('div',[_c('div',{staticClass:"title"}),_vm._v(" "),_vm._l((_vm.txs),function(tx){return _c('div',{key:tx.index,staticClass:"history"},[_c('div',{staticClass:"number",class:tx.txtype},[_vm._v("\n                        "+_vm._s(tx.txtype == 'out'?'+ ':'- ')+_vm._s(tx.value)+" "+_vm._s(tx.assetname))]),_vm._v(" "),_c('div',{staticClass:"address"},[_vm._v(" Send "+_vm._s(tx.txtype == 'out'?'form':'to')+" : "+_vm._s(tx.address))]),_vm._v(" "),_c('div',{staticClass:"time"},[_c('a',{attrs:{"href":'https://scan.nel.group/#testnet/transaction/'+tx.txid,"target":"_blank"}},[_vm._v("\n                            "+_vm._s(tx.txid.substring(0, 4) + '...' + tx.txid.substring(tx.txid.length - 4))+"\n                        ")]),_vm._v("  "+_vm._s(tx.time)+"\n                        "),(tx.waiting)?_c('div',[_vm._v("(Waiting)")]):_vm._e()])])})],2)]),_vm._v(" "),(_vm.cutshow)?_c('div',{staticClass:"page"},[_c('div',{staticClass:"page-previous",class:_vm.txpage<=1?'disabled':'',on:{"click":function($event){_vm.cutPage('pre')}}},[_c('img',{attrs:{"src":__webpack_require__("tt5S"),"alt":""}})]),_vm._v(" "),_c('div',{staticStyle:{"width":"1px"}}),_vm._v(" "),_c('div',{staticClass:"page-next",class:_vm.nextpage?'':'disabled',on:{"click":function($event){_vm.cutPage('next')}}},[_c('img',{attrs:{"src":__webpack_require__("pp3u"),"alt":""}})])]):_vm._e()])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var pages_transfer = (esExports);
// CONCATENATED MODULE: ./src/pages/transfer.vue
function injectStyle (ssrContext) {
  __webpack_require__("t4/y")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1f25c24e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  transfer_default.a,
  pages_transfer,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_pages_transfer = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "pLPz":
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
var wwwtool_1 = __webpack_require__("50aY");
var entity_1 = __webpack_require__("6nHw");
var storagetool_1 = __webpack_require__("5LD5");
///<reference path="./neo-ts.d.ts"/>
var CoinTool = /** @class */ (function () {
    function CoinTool() {
    }
    CoinTool.initAllAsset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allassets, a, asset, names, id, name, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wwwtool_1.WWW.api_getAllAssets()];
                    case 1:
                        allassets = _a.sent();
                        for (a in allassets) {
                            asset = allassets[a];
                            names = asset.name;
                            id = asset.id;
                            name = "";
                            if (id == CoinTool.id_GAS) {
                                name = "GAS";
                            }
                            else if (id == CoinTool.id_NEO) {
                                name = "NEO";
                            }
                            else {
                                for (i in names) {
                                    name = names[i].name;
                                    if (names[i].lang == "en")
                                        break;
                                }
                            }
                            CoinTool.assetID2name[id] = name;
                            CoinTool.name2assetID[name] = id;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获得utxos
     */
    CoinTool.getassets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var height, utxos, olds, olds2, n, old, findutxo, i_1, utxo, assets, i, item, asset, utxo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wwwtool_1.WWW.api_getHeight()];
                    case 1:
                        height = _a.sent();
                        return [4 /*yield*/, wwwtool_1.WWW.api_getUTXO(storagetool_1.StorageTool.getStorage("current-address"))];
                    case 2:
                        utxos = _a.sent();
                        olds = entity_1.OldUTXO.getOldutxos();
                        olds2 = new Array();
                        for (n = 0; n < olds.length; n++) {
                            old = olds[n];
                            findutxo = false;
                            for (i_1 = 0; i_1 < utxos.length; i_1++) {
                                utxo = utxos[i_1];
                                if (utxo.txid == old.txid && old.n == utxo.n && height - old.height <= 2) {
                                    findutxo = true;
                                    utxos.splice(i_1, 1);
                                }
                            }
                            if (findutxo) {
                                olds2.push(old);
                            }
                        }
                        entity_1.OldUTXO.setOldutxos(olds2);
                        assets = {};
                        for (i in utxos) {
                            item = utxos[i];
                            asset = item.asset;
                            if (assets[asset] == undefined || assets[asset] == null) {
                                assets[asset] = [];
                            }
                            utxo = new entity_1.UTXO();
                            utxo.addr = item.addr;
                            utxo.asset = item.asset;
                            utxo.n = item.n;
                            utxo.txid = item.txid;
                            utxo.count = Neo.Fixed8.parse(item.value);
                            assets[asset].push(utxo);
                        }
                        // }
                        return [2 /*return*/, assets];
                }
            });
        });
    };
    /**
     * @method 创建交易对象 ThinNeo.Transaction
     * @param utxos utxo列表
     * @param targetaddr 对方地址
     * @param assetid 资产id
     * @param sendcount 金额
     */
    CoinTool.makeTran = function (utxos, targetaddr, assetid, sendcount) {
        //if (sendcount.compareTo(Neo.Fixed8.Zero) <= 0)
        //    throw new Error("can not send zero.");
        var res = new entity_1.Result();
        var us = utxos[assetid];
        if (us == undefined) {
            // res.err = true;
            // res.info = "no enough money.";
            throw new Error("no enough money.");
        }
        var tran = new ThinNeo.Transaction();
        tran.type = ThinNeo.TransactionType.ContractTransaction;
        tran.version = 0; //0 or 1
        tran.extdata = null;
        tran.attributes = [];
        tran.inputs = [];
        var scraddr = "";
        utxos[assetid].sort(function (a, b) {
            return a.count.compareTo(b.count);
        });
        var count = Neo.Fixed8.Zero;
        var clonearr = [].concat(us); //用于返回剩余可用的utxo
        var old = [];
        for (var i = 0; i < us.length; i++) {
            var input = new ThinNeo.TransactionInput();
            input.hash = us[i].txid.hexToBytes().reverse();
            input.index = us[i].n;
            input["_addr"] = us[i].addr; //利用js的隨意性，臨時傳個值
            tran.inputs.push(input); //将utxo塞入input
            count = count.add(us[i].count); //添加至count中
            scraddr = us[i].addr;
            clonearr.shift(); //删除已塞入的utxo
            old.push(new entity_1.OldUTXO(us[i].txid, us[i].n));
            if (count.compareTo(sendcount) > 0) {
                break; //如果足够则跳出循环
            }
        }
        if (count.compareTo(sendcount) >= 0) {
            tran.outputs = [];
            //输出
            if (sendcount.compareTo(Neo.Fixed8.Zero) > 0) {
                var output = new ThinNeo.TransactionOutput();
                output.assetId = assetid.hexToBytes().reverse();
                output.value = sendcount;
                output.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(targetaddr);
                tran.outputs.push(output);
            }
            //找零
            var change = count.subtract(sendcount);
            if (change.compareTo(Neo.Fixed8.Zero) > 0) {
                var outputchange = new ThinNeo.TransactionOutput();
                outputchange.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(scraddr);
                outputchange.value = change;
                outputchange.assetId = assetid.hexToBytes().reverse();
                tran.outputs.push(outputchange);
            }
            res.err = false;
            res.info = { "tran": tran, "oldarr": old };
        }
        else {
            throw new Error("no enough money.");
        }
        return res;
    };
    /**
     * utxo转账方法
     * @param targetaddr 转入的地址
     * @param asset 资产
     * @param count 金额
     */
    CoinTool.rawTransaction = function (targetaddr, asset, count) {
        return __awaiter(this, void 0, void 0, function () {
            var arr, add, n, _count, utxos, tranres, tran, txid, msg, pubkey, prekey, addr, signdata, data, res, height, result, olds, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arr = storagetool_1.StorageTool.getLoginArr();
                        add = storagetool_1.StorageTool.getStorage("current-address");
                        n = arr.findIndex(function (login) { return login.address == add; });
                        _count = Neo.Fixed8.parse(count + "");
                        return [4 /*yield*/, CoinTool.getassets()];
                    case 1:
                        utxos = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        tranres = CoinTool.makeTran(utxos, targetaddr, asset, _count);
                        tran = tranres.info['tran'];
                        if (tran.witnesses == null)
                            tran.witnesses = [];
                        txid = tran.GetHash().clone().reverse().toHexString();
                        msg = tran.GetMessage().clone();
                        pubkey = arr[n].pubkey.clone();
                        prekey = arr[n].prikey.clone();
                        addr = arr[n].address;
                        signdata = ThinNeo.Helper.Sign(msg, prekey);
                        tran.AddWitness(signdata, pubkey, addr);
                        data = tran.GetRawData();
                        res = new entity_1.Result();
                        return [4 /*yield*/, wwwtool_1.WWW.api_getHeight()];
                    case 3:
                        height = _a.sent();
                        return [4 /*yield*/, wwwtool_1.WWW.api_postRawTransaction(data)];
                    case 4:
                        result = _a.sent();
                        if (result["sendrawtransactionresult"]) {
                            res.err = !result;
                            res.info = txid;
                            olds = tranres.info['oldarr'];
                            olds.map(function (old) { return old.height = height; });
                            entity_1.OldUTXO.oldutxosPush(olds);
                        }
                        return [2 /*return*/, res];
                    case 5:
                        error_1 = _a.sent();
                        throw error_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 领取gas
     */
    CoinTool.claimgas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var claimtxhex, tran, buf, current, msg, signdata, data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wwwtool_1.WWW.api_getclaimtxhex(entity_1.LoginInfo.getCurrentAddress())];
                    case 1:
                        claimtxhex = _a.sent();
                        tran = new ThinNeo.Transaction();
                        buf = claimtxhex.hexToBytes();
                        tran.Deserialize(new Neo.IO.BinaryReader(new Neo.IO.MemoryStream(buf.buffer, 0, buf.byteLength)));
                        current = entity_1.LoginInfo.getCurrentLogin();
                        msg = tran.GetMessage().clone();
                        signdata = ThinNeo.Helper.Sign(msg, current.prikey);
                        tran.AddWitness(signdata, current.pubkey, current.address);
                        data = tran.GetRawData();
                        return [4 /*yield*/, wwwtool_1.WWW.api_postRawTransaction(data)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    CoinTool.claimGas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var current, claimsstr, claims, sum, tran, i, claim, input, output, msg, signdata, data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        current = entity_1.LoginInfo.getCurrentLogin();
                        return [4 /*yield*/, wwwtool_1.WWW.api_getclaimgas(current.address, 0)];
                    case 1:
                        claimsstr = _a.sent();
                        claims = claimsstr["claims"];
                        sum = claimsstr["gas"].toFixed(8);
                        tran = new ThinNeo.Transaction();
                        //交易类型为合约交易
                        tran.type = ThinNeo.TransactionType.ClaimTransaction;
                        tran.version = 0; //0 or 1
                        tran.extdata = new ThinNeo.ClaimTransData(); //JSON.parse(JSON.stringify(claims));
                        tran.extdata.claims = [];
                        tran.attributes = [];
                        tran.inputs = [];
                        for (i in claims) {
                            claim = claims[i];
                            input = new ThinNeo.TransactionInput();
                            input.hash = (claim.txid).hexToBytes().reverse();
                            input.index = claim.n;
                            input["_addr"] = claim.addr;
                            tran.extdata.claims.push(input);
                        }
                        output = new ThinNeo.TransactionOutput();
                        output.assetId = (CoinTool.id_GAS).hexToBytes().reverse();
                        output.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(current.address);
                        output.value = Neo.Fixed8.parse(sum);
                        tran.outputs = [];
                        tran.outputs.push(output);
                        msg = tran.GetMessage().clone();
                        signdata = ThinNeo.Helper.Sign(msg, current.prikey);
                        tran.AddWitness(signdata, current.pubkey, current.address);
                        data = tran.GetRawData();
                        return [4 /*yield*/, wwwtool_1.WWW.api_postRawTransaction(data)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * invokeTrans 方式调用合约塞入attributes
     * @param script 合约的script
     */
    CoinTool.contractInvokeTrans_attributes = function (script) {
        return __awaiter(this, void 0, void 0, function () {
            var current, addr, tran, msg, pubkey, prekey, signdata, data, res, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        current = entity_1.LoginInfo.getCurrentLogin();
                        addr = current.address;
                        tran = new ThinNeo.Transaction();
                        //合约类型
                        tran.inputs = [];
                        tran.outputs = [];
                        tran.type = ThinNeo.TransactionType.InvocationTransaction;
                        tran.extdata = new ThinNeo.InvokeTransData();
                        //塞入脚本
                        tran.extdata.script = script;
                        tran.attributes = new Array(1);
                        tran.attributes[0] = new ThinNeo.Attribute();
                        tran.attributes[0].usage = ThinNeo.TransactionAttributeUsage.Script;
                        tran.attributes[0].data = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);
                        if (tran.witnesses == null)
                            tran.witnesses = [];
                        msg = tran.GetMessage().clone();
                        pubkey = current.pubkey.clone();
                        prekey = current.prikey.clone();
                        signdata = ThinNeo.Helper.Sign(msg, prekey);
                        tran.AddWitness(signdata, pubkey, addr);
                        data = tran.GetRawData();
                        res = new entity_1.Result();
                        return [4 /*yield*/, wwwtool_1.WWW.api_postRawTransaction(data)];
                    case 1:
                        result = _a.sent();
                        res.err = !result["sendrawtransactionresult"];
                        res.info = result["txid"];
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * invokeTrans 方式调用合约塞入attributes
     * @param script 合约的script
     */
    CoinTool.contractInvokeTrans = function (script) {
        return __awaiter(this, void 0, void 0, function () {
            var current, addr, assetid, utxos, tranmsg, tran, msg, pubkey, prekey, signdata, data, res, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        current = entity_1.LoginInfo.getCurrentLogin();
                        addr = current.address;
                        assetid = CoinTool.id_GAS;
                        return [4 /*yield*/, CoinTool.getassets()];
                    case 1:
                        utxos = _a.sent();
                        tranmsg = CoinTool.makeTran(utxos, current.address, assetid, Neo.Fixed8.Zero);
                        tran = tranmsg.info['tran'];
                        tran.type = ThinNeo.TransactionType.InvocationTransaction;
                        tran.extdata = new ThinNeo.InvokeTransData();
                        //塞入脚本
                        tran.extdata.script = script;
                        // (tran.extdata as ThinNeo.InvokeTransData).gas = Neo.Fixed8.fromNumber(1.0);
                        if (tran.witnesses == null)
                            tran.witnesses = [];
                        msg = tran.GetMessage().clone();
                        pubkey = current.pubkey.clone();
                        prekey = current.prikey.clone();
                        signdata = ThinNeo.Helper.Sign(msg, prekey);
                        tran.AddWitness(signdata, pubkey, addr);
                        data = tran.GetRawData();
                        console.log(data);
                        res = new entity_1.Result();
                        return [4 /*yield*/, wwwtool_1.WWW.api_postRawTransaction(data)];
                    case 2:
                        result = _a.sent();
                        res.err = !result;
                        res.info = "成功";
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * nep5转账
     * @param address 自己的地址
     * @param tatgeraddr 转账的地址
     * @param asset nep5资产id
     * @param amount 转账数额
     */
    CoinTool.nep5Transaction = function (address, tatgeraddr, asset, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var res, decimals, numarr, v, i, bnum, intv, sb, scriptaddress, random_uint8, random_int, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, wwwtool_1.WWW.getNep5Asset(asset)];
                    case 1:
                        res = _a.sent();
                        decimals = res["decimals"];
                        numarr = amount.split(".");
                        decimals -= (numarr.length == 1 ? 0 : numarr[1].length);
                        v = 1;
                        for (i = 0; i < decimals; i++)
                            v *= 10;
                        bnum = new Neo.BigInteger(amount.replace(".", ""));
                        intv = bnum.multiply(v).toString();
                        sb = new ThinNeo.ScriptBuilder();
                        scriptaddress = asset.hexToBytes().reverse();
                        random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues(new Uint8Array(32));
                        random_int = Neo.BigInteger.fromUint8Array(random_uint8);
                        //塞入随机数
                        sb.EmitPushNumber(random_int);
                        sb.Emit(ThinNeo.OpCode.DROP);
                        //塞值
                        sb.EmitParamJson(["(address)" + address, "(address)" + tatgeraddr, "(integer)" + intv]); //第二个参数是个数组
                        sb.EmitPushString("transfer");
                        sb.EmitAppCall(scriptaddress);
                        return [4 /*yield*/, CoinTool.contractInvokeTrans_attributes(sb.ToArray())];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    CoinTool.id_GAS = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
    CoinTool.id_NEO = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    CoinTool.assetID2name = {};
    CoinTool.name2assetID = {};
    return CoinTool;
}());
exports.CoinTool = CoinTool;


/***/ }),

/***/ "pp3u":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjE1cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDE1IDE2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OSAoNTEwMDIpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0i5rWP6KeI5ZmoNCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImJsb2Nrcy1oYW5nb3ZlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTY1OC4wMDAwMDAsIC0xMTY1LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8ZyBpZD0ic3d0aWNoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1OTAuMDAwMDAwLCAxMTU0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUxLjAwMDAwMCwgMC4wMDAwMDApIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUuMjc2MzkzMiwxMi4xNzEwMzk0IEwzMS42NTgzNTkyLDI0LjkzNDk3MTUgQzMxLjkwNTM0ODUsMjUuNDI4OTUgMzEuNzA1MTI0MSwyNi4wMjk2MjMgMzEuMjExMTQ1NiwyNi4yNzY2MTIzIEMzMS4wNzIyOTAyLDI2LjM0NjA0IDMwLjkxOTE3NzEsMjYuMzgyMTg1MSAzMC43NjM5MzIsMjYuMzgyMTg1MSBMMTgsMjYuMzgyMTg1MSBDMTcuNDQ3NzE1MywyNi4zODIxODUxIDE3LDI1LjkzNDQ2OTggMTcsMjUuMzgyMTg1MSBDMTcsMjUuMjI2OTQgMTcuMDM2MTQ1MSwyNS4wNzM4MjY5IDE3LjEwNTU3MjgsMjQuOTM0OTcxNSBMMjMuNDg3NTM4OCwxMi4xNzEwMzk0IEMyMy43MzQ1MjgxLDExLjY3NzA2MSAyNC4zMzUyMDExLDExLjQ3NjgzNjYgMjQuODI5MTc5NiwxMS43MjM4MjU5IEMyNS4wMjI3MDcsMTEuODIwNTg5NiAyNS4xNzk2Mjk1LDExLjk3NzUxMiAyNS4yNzYzOTMyLDEyLjE3MTAzOTQgWiIgaWQ9IlRyaWFuZ2xlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNC4zODIwNzYsIDE5LjAwMDExMCkgcm90YXRlKDkwLjAwMDAwMCkgdHJhbnNsYXRlKC0yNC4zODIwNzYsIC0xOS4wMDAxMTApICI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="

/***/ }),

/***/ "shbj":
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
var vue_1 = __webpack_require__("/5sW");
var vue_class_component_1 = __webpack_require__("c+8m");
var Spinner_vue_1 = __webpack_require__("+jyM");
var Valert = /** @class */ (function (_super) {
    __extends(Valert, _super);
    function Valert() {
        var _this = _super.call(this) || this;
        _this.show = false;
        return _this;
    }
    Valert.prototype.closemudloe = function () {
        this.show = false;
    };
    Valert.prototype.mounted = function () { };
    Valert = __decorate([
        vue_class_component_1.default({
            components: {
                "spinner-wrap": Spinner_vue_1.default
            }
        }),
        __metadata("design:paramtypes", [])
    ], Valert);
    return Valert;
}(vue_1.default));
exports.default = Valert;


/***/ }),

/***/ "t4/y":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "tt5S":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjE1cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDE1IDE2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OSAoNTEwMDIpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0i5rWP6KeI5ZmoNCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImJsb2Nrcy1oYW5nb3ZlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTYwOC4wMDAwMDAsIC0xMTY1LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8ZyBpZD0ic3d0aWNoIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1OTAuMDAwMDAwLCAxMTU0LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUuODk0NDI3MiwxMi43ODg4NTQ0IEwzMi4yNzYzOTMyLDI1LjU1Mjc4NjQgQzMyLjUyMzM4MjUsMjYuMDQ2NzY0OSAzMi4zMjMxNTgxLDI2LjY0NzQzNzkgMzEuODI5MTc5NiwyNi44OTQ0MjcyIEMzMS42OTAzMjQyLDI2Ljk2Mzg1NDkgMzEuNTM3MjExMSwyNyAzMS4zODE5NjYsMjcgTDE4LjYxODAzNCwyNyBDMTguMDY1NzQ5MiwyNyAxNy42MTgwMzQsMjYuNTUyMjg0NyAxNy42MTgwMzQsMjYgQzE3LjYxODAzNCwyNS44NDQ3NTQ5IDE3LjY1NDE3OTEsMjUuNjkxNjQxOCAxNy43MjM2MDY4LDI1LjU1Mjc4NjQgTDI0LjEwNTU3MjgsMTIuNzg4ODU0NCBDMjQuMzUyNTYyMSwxMi4yOTQ4NzU5IDI0Ljk1MzIzNTEsMTIuMDk0NjUxNSAyNS40NDcyMTM2LDEyLjM0MTY0MDggQzI1LjY0MDc0MSwxMi40Mzg0MDQ1IDI1Ljc5NzY2MzUsMTIuNTk1MzI3IDI1Ljg5NDQyNzIsMTIuNzg4ODU0NCBaIiBpZD0iVHJpYW5nbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1LjAwMDAwMCwgMTkuMDAwMDAwKSBzY2FsZSgtMSwgMSkgcm90YXRlKDkwLjAwMDAwMCkgdHJhbnNsYXRlKC0yNS4wMDAwMDAsIC0xOS4wMDAwMDApICI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="

/***/ }),

/***/ "wtuE":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OSAoNTEwMDIpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iYmFsYW5jZTQtdGVzdG5ldCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IummlumhtS10cmFuc2Zlci1pbnB1dCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTkyMi4wMDAwMDAsIC0zNzguMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSJHcm91cC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDAuMDAwMDAwLCAyMjYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i5omT5Yu+IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4MjIuMDAwMDAwLCAxNTIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI0LDEyLjE0ODE0ODEgQzI0LDUuMzcyNDQ0NDQgMTguNjI3NTU1NiwwIDExLjg1MTg1MTksMCBDNS4zNzI0NDQ0NCwwIDAsNS4zNzI0NDQ0NCAwLDEyLjE0ODE0ODEgQzAsMTguNjI3NTU1NiA1LjM3MjQ0NDQ0LDI0IDExLjg1MTg1MTksMjQgQzE4LjYyNzU1NTYsMjQgMjQsMTguNjI3NTU1NiAyNCwxMi4xNDgxNDgxIFoiIGlkPSJGaWxsLSIgZmlsbD0iIzJEREU0RiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik02LjI0NDk1MTczLDEyLjg0NjM1MDQgQzUuODU2MjkzNzUsMTIuNDQ2MjY3MiA1LjgwOTk0MDQ4LDExLjc1ODI2MDYgNi4xMzIwMjQ5OSwxMS4zMjIzNTgyIEw1LjY1MDYzMTc1LDExLjk3Mzg2NTcgQzUuOTc2OTIyMDIsMTEuNTMyMjcxMyA2LjU5NzQ5MzYyLDExLjQ0NTcyNDMgNy4wNDEyNTQ3NywxMS43ODQwMTY2IEw4Ljg5MDEwNjk3LDEzLjE5MzQ1MTYgQzkuMzMxODM2NTksMTMuNTMwMTk1MiAxMC4wMzc1NzI1LDEzLjUxNTExOSAxMC40NjU2OTA2LDEzLjE2MDM3NTkgTDE3LjAwNDc3NDYsNy43NDIwMjMxMiBDMTcuNDMzMjE1OCw3LjM4NzAxMjMyIDE4LjA5Nzg2MDcsNy40MTA5MjYyNCAxOC40ODA3NDQ0LDcuNzg3MDMxNzUgTDE3Ljc4MDUzNiw3LjA5OTIxOTE5IEMxOC4xNjcyNTA0LDcuNDc5MDg3NTggMTguMTY3ODY1NCw4LjA5MzI5ODk5IDE3Ljc2MTMzNCw4LjQ5MTIzOTY5IEwxMC40MDkwODE5LDE1LjY4ODEyNTMgQzEwLjAxMTc2MjUsMTYuMDc3MDQ4NiA5LjM3Nzg2MzY5LDE2LjA3MTM1OTQgOC45ODU5NDM5NSwxNS42Njc5MTg1IEw2LjI0NDk1MTczLDEyLjg0NjM1MDQgWiIgaWQ9IkZpbGwtIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="

/***/ }),

/***/ "x35b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __webpack_require__("/5sW");
var login_vue_1 = __webpack_require__("Luci");
var balance_vue_1 = __webpack_require__("QRjO");
var transfer_vue_1 = __webpack_require__("owRU");
var nns_vue_1 = __webpack_require__("GZV2");
var settings_vue_1 = __webpack_require__("dkEd");
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
                case "#balance":
                    return balance_vue_1.default;
                case "#login":
                    return login_vue_1.default;
                case "#transfer":
                    return transfer_vue_1.default;
                case "#nns":
                    return nns_vue_1.default;
                case "#settings":
                    return settings_vue_1.default;
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