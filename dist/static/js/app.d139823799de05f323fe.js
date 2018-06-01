webpackJsonp([1],{

/***/ "+Xm1":
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
var Valert_vue_1 = __webpack_require__("Gieu");
var Spinner_vue_1 = __webpack_require__("+jyM");
var bubble_vue_1 = __webpack_require__("VbKi");
var NNS = /** @class */ (function (_super) {
    __extends(NNS, _super);
    function NNS() {
        var _this = _super.call(this) || this;
        _this.network = ".test";
        _this.nnsstr = "";
        _this.domainerr = false;
        _this.receive_disable = true;
        _this.mapping_err = "";
        _this.errmsg = "";
        _this.btn_register = true;
        _this.verifyDomainNumber = 0;
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
                    case 0: return [4 /*yield*/, tools.NNSTool.initRootDomain()];
                    case 1:
                        _a.sent();
                        tools.NNSTool.initStatus();
                        this.getDomainsByAddr();
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
            var verify, domains, timestamp, copare;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.nnsstr = this.nnsstr.toLowerCase();
                        this.nnsstr = this.nnsstr.trim();
                        verify = /^[a-zA-Z0-9]{1,32}$/;
                        if (!verify.test(this.nnsstr)) return [3 /*break*/, 2];
                        return [4 /*yield*/, tools.NNSTool.queryDomainInfo(this.nnsstr + ".test")];
                    case 1:
                        domains = _a.sent();
                        if (domains.register && domains.ttl) {
                            timestamp = new Date().getTime();
                            copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(domains.ttl).multiply(1000));
                            if (copare < 0) {
                                // console.log('域名已到期');
                                this.errmsg = "" + this.$t("nns.err1");
                                this.domainerr = true;
                            }
                            else {
                                this.errmsg = "";
                                this.domainerr = false;
                                // mui.toast("The current domain name is registered : ");
                            }
                        }
                        else {
                            this.domainerr = false;
                            this.errmsg = "";
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        //验证输入的字符串是否符合规则 
                        this.domainerr = true;
                        this.errmsg = "" + this.$t("nns.alertmessage2");
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    NNS.prototype.verifyMappingAddress = function () {
        var res = tools.neotools.verifyAddress(this.alert_addr);
        res ? this.mapping_err = "0" : this.mapping_err = "1";
        return res;
    };
    NNS.prototype.nnsRegister = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, state, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.verifyDomain();
                        if (!!this.domainerr) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, tools.NNSTool.registerDomain(this.nnsstr)];
                    case 2:
                        res = _a.sent();
                        if (res.err) {
                            console.error(res.info);
                        }
                        else {
                            state = new tools.DomainStatus();
                            state.await_register = true;
                            state.domainname = this.nnsstr + ".test";
                            tools.DomainStatus.setStatus(state);
                            this.getDomainsByAddr();
                            this.btn_register = true;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        mui.alert(error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获得域名列表
     */
    NNS.prototype.getDomainsByAddr = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var res, arrdomain, arr, state, key, inculde, _a, _b, _i, i, n, domain, a, msg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, tools.WWW.getnnsinfo(tools.LoginInfo.getCurrentAddress())];
                    case 1:
                        res = _c.sent();
                        arrdomain = res ? res.map(function (dom) { return dom + ".test"; }) : [];
                        arr = new Array();
                        state = tools.DomainStatus.getStatus();
                        // state = JSON.parse(JSON.stringify(state));
                        if (state) {
                            for (key in state) {
                                if (state.hasOwnProperty(key)) {
                                    inculde = arrdomain.includes(key);
                                    inculde ? "" : arrdomain.push(key);
                                }
                            }
                        }
                        _a = [];
                        for (_b in arrdomain)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        i = _a[_i];
                        if (!arrdomain.hasOwnProperty(i)) return [3 /*break*/, 4];
                        n = parseInt(i);
                        domain = arrdomain[n];
                        a = state[domain] ? state[domain] : new tools.DomainStatus();
                        return [4 /*yield*/, this.queryDomainInfo(domain)];
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
                            arr.map(function (dom) {
                                if (dom.domainname == _this.alert_domain) {
                                    dom.await_resolver ? _this.alert_resolver_state = 1 : !!dom.resolver ? _this.alert_resolver_state = 2 : _this.alert_resolver_state = 0;
                                    dom.await_mapping ? _this.alert_config_state = 1 : (!!dom.mapping ? _this.alert_config_state = 2 : _this.alert_config_state = 0);
                                }
                            });
                            // if (!!state[ this.alert_domain ])
                            // {
                            //     let isMappingAwait = !!state[ this.alert_domain ][ "await_mapping" ];
                            //     let isMapping = !!state[ this.alert_domain ][ "mapping" ];
                            //     let isResolverAwait = !!state[ this.alert_domain ][ "await_resolver" ];
                            //     let isResolver = !!state[ this.alert_domain ][ "resolver" ];
                            //     isResolverAwait ? this.alert_resolver_state = 1 : isResolver ? this.alert_resolver_state = 2 : this.alert_resolver_state = 0;
                            //     isMappingAwait ? this.alert_config_state = 1 : (isMapping ? this.alert_config_state = 2 : this.alert_config_state = 0);
                            // }
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
                        dommsg = new tools.Domainmsg();
                        dommsg.domainname = domain;
                        return [4 /*yield*/, tools.NNSTool.queryDomainInfo(domain)];
                    case 1:
                        msg = _a.sent();
                        if (!msg.ttl) return [3 /*break*/, 5];
                        this.receive_disable = false;
                        timestamp = new Date().getTime();
                        copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(msg.ttl).multiply(1000));
                        copare < 0 ? dommsg.isExpiration = false : dommsg.isExpiration = true;
                        dommsg.time = tools.DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(parseInt(msg.ttl + "000")));
                        dommsg.await_resolver = false;
                        if (!msg["resolver"]) return [3 /*break*/, 3];
                        resolver = msg["resolver"];
                        resolver_str = resolver.toHexString();
                        return [4 /*yield*/, tools.NNSTool.resolveData(domain)];
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
            var name, isMappingAwait, isMapping, isResolverAwait, isResolver;
            return __generator(this, function (_a) {
                this.alert_domainmsg = msg;
                name = this.alert_domainmsg.domainname;
                this.alert_domain = name;
                this.alert_addr = this.alert_domainmsg.mapping;
                this.mapping_err = "";
                if (!!msg) {
                    isMappingAwait = !!msg["await_mapping"];
                    isMapping = !!msg["mapping"];
                    isResolverAwait = !!msg["await_resolver"];
                    isResolver = !!msg["resolver"];
                    isResolverAwait ? this.alert_resolver_state = 1 : isResolver ? this.alert_resolver_state = 2 : this.alert_resolver_state = 0;
                    isMappingAwait ? this.alert_config_state = 1 : (isMapping ? this.alert_config_state = 2 : this.alert_config_state = 0);
                }
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
                        nnshash = tools.NNSTool.nameHashArray(arr);
                        contract = this.alert_contract.hexToBytes().reverse();
                        return [4 /*yield*/, tools.NNSTool.setResolve(nnshash, contract)];
                    case 1:
                        res = _a.sent();
                        state = new tools.DomainStatus();
                        state.await_resolver = true;
                        state.domainname = this.alert_domain;
                        state.resolver = this.alert_contract.hexToBytes().reverse().toHexString();
                        tools.DomainStatus.setStatus(state);
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
                        if (!this.verifyMappingAddress()) return [3 /*break*/, 2];
                        arr = this.alert_domain.split(".");
                        nnshash = tools.NNSTool.nameHashArray(arr);
                        return [4 /*yield*/, tools.NNSTool.setResolveData(nnshash, this.alert_addr, this.alert_domainmsg.resolver)];
                    case 1:
                        res = _a.sent();
                        this.alert_config_state = 1;
                        state = new tools.DomainStatus();
                        state.await_mapping = true;
                        state.domainname = this.alert_domain;
                        state.mapping = this.alert_addr;
                        tools.DomainStatus.setStatus(state);
                        this.getDomainsByAddr();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
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
                        str = tools.StorageTool.getStorage("current-height");
                        return [4 /*yield*/, tools.WWW.api_getHeight()];
                    case 1:
                        currentheight = _a.sent();
                        oldheight = currentheight;
                        str ? oldheight = parseInt(str) : tools.StorageTool.setStorage("current-height", currentheight + "");
                        if (oldheight < currentheight) {
                            this.getDomainsByAddr();
                            oldheight++;
                            tools.StorageTool.setStorage("current-height", oldheight + "");
                        }
                        return [4 /*yield*/, setTimeout(function () {
                                _this.awaitHeight();
                            }, 30000)];
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

/***/ "+jyM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/Spinner.vue
var Spinner = __webpack_require__("8Qnm");
var Spinner_default = /*#__PURE__*/__webpack_require__.n(Spinner);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1d4a9de1","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Spinner.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"spinner-wrap",class:_vm.isbig?'spinner-big':''},[_vm._m(0,false,false)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"spinner"},[_c('div',{staticClass:"spinner-container container1"},[_c('div',{staticClass:"circle1"}),_vm._v(" "),_c('div',{staticClass:"circle2"}),_vm._v(" "),_c('div',{staticClass:"circle3"}),_vm._v(" "),_c('div',{staticClass:"circle4"})]),_vm._v(" "),_c('div',{staticClass:"spinner-container container2"},[_c('div',{staticClass:"circle1"}),_vm._v(" "),_c('div',{staticClass:"circle2"}),_vm._v(" "),_c('div',{staticClass:"circle3"}),_vm._v(" "),_c('div',{staticClass:"circle4"})]),_vm._v(" "),_c('div',{staticClass:"spinner-container container3"},[_c('div',{staticClass:"circle1"}),_vm._v(" "),_c('div',{staticClass:"circle2"}),_vm._v(" "),_c('div',{staticClass:"circle3"}),_vm._v(" "),_c('div',{staticClass:"circle4"})])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_Spinner = (esExports);
// CONCATENATED MODULE: ./src/components/Spinner.vue
function injectStyle (ssrContext) {
  __webpack_require__("7VBB")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1d4a9de1"
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

/***/ "0LJk":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "4+Dl":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,DQo8c3ZnIHdpZHRoPSI0MHB4IiBoZWlnaHQ9IjQ4cHgiIHZpZXdCb3g9IjAgMCA0MCA0OCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5ICg1MTAwMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+DQogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iMTkuOTYzNTM0MSUiIHkxPSI3Mi40OTU5MTc2JSIgeDI9IjEwMCUiIHkyPSIyMC4wMzA4OTgxJSIgaWQ9ImxpbmVhckdyYWRpZW50LTEiPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgb2Zmc2V0PSIwJSI+PC9zdG9wPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgb2Zmc2V0PSIxMDAlIj48L3N0b3A+DQogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+DQogICAgPC9kZWZzPg0KICAgIDxnIGlkPSLnmbvpmYbms6jlhow1IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9IummlumhtSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI4MC4wMDAwMDAsIC0xNzQuMDAwMDAwKSI+DQogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjA1LjAwMDAwMCwgMTQ0LjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSJsb2dvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3NS4wMDAwMDAsIDMwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMC43Mzg1ODY3NjgsOC4zNTgxMTQzNiBMMjMuOTU3NDUxNiwwIEwzOS42MzI5OTYsNy41MTU4NjEyNSBMMTYuNDk1ODE3OCwxNS44NjU1MTM0IEwwLjczODU4Njc2OCw4LjM1ODExNDM2IFogTTIzLjUwNzQ4MjMsMzEuNTk4NTkxNCBMMjMuNTA3NDgyMywxMy45OTY1NDc4IEw0MCw4LjI5NjkwMzY4IEw0MCwzOS41MDgxODcxIEwyMy41MDc0ODIzLDMxLjU5ODU5MTQgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjZmZmIj48L3BhdGg+DQogICAgICAgICAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJQYXRoLTIiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMSkiIHBvaW50cz0iMCAzOS45ODY2ODggMCA4Ljg2Njk5MjcgMTUuOTg5OTA2NiAxNi40MjQ4Nzc4IDE1Ljk4OTkwNjYgNDcuMzUxNzM5NyI+PC9wb2x5Z29uPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg=="

/***/ }),

/***/ "5smL":
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
var wallet_vue_1 = __webpack_require__("PPZq");
var Spinner_vue_1 = __webpack_require__("+jyM");
var balance = /** @class */ (function (_super) {
    __extends(balance, _super);
    function balance() {
        var _this = _super.call(this) || this;
        _this.currentAddress = "";
        _this.chooseAddress = "";
        _this.loadmsg = "";
        _this.claimbtn = true;
        _this.neoasset = new tools.NeoAsset();
        _this.balances = new Array();
        _this.neoasset.gas = 0;
        _this.neoasset.neo = 0;
        _this.neoasset.claim = '';
        _this.chooseAddressarr = new Array();
        _this.chooseAddressarr = tools.StorageTool.getLoginArr();
        return _this;
    }
    // Component method
    balance.prototype.mounted = function () {
        this.currentAddress = tools.LoginInfo.getCurrentAddress();
        this.getBalances();
        // setInterval(() => { this.getBalances() }, 30000)
    };
    balance.prototype.addressSwitch = function () {
        tools.LoginInfo.setCurrentAddress(this.chooseAddress);
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
                        tools.CoinTool.initAllAsset();
                        return [4 /*yield*/, tools.WWW.api_getBalance(this.currentAddress)];
                    case 1:
                        balances = _b.sent();
                        return [4 /*yield*/, tools.WWW.api_getclaimgas(this.currentAddress, 0)];
                    case 2:
                        clamis = _b.sent();
                        return [4 /*yield*/, tools.WWW.api_getclaimgas(this.currentAddress, 1)];
                    case 3:
                        clamis2 = _b.sent();
                        return [4 /*yield*/, tools.WWW.api_getnep5Balance(this.currentAddress)];
                    case 4:
                        nep5balances = _b.sent();
                        return [4 /*yield*/, tools.WWW.api_getHeight()];
                    case 5:
                        height = _b.sent();
                        this.neoasset.neo = 0;
                        this.neoasset.gas = 0;
                        if (balances) {
                            sum1 = Neo.Fixed8.parse(clamis["gas"].toFixed(8));
                            sum2 = Neo.Fixed8.parse(clamis2["gas"].toFixed(8));
                            sum = sum1.add(sum2).toString();
                            this.neoasset.claim = sum; //塞入claim
                            balances.forEach //取NEO 和GAS
                            (function (balance) {
                                if (balance.asset == tools.CoinTool.id_NEO) {
                                    _this.neoasset.neo = balance.balance;
                                }
                                if (balance.asset == tools.CoinTool.id_GAS) {
                                    _this.neoasset.gas = balance.balance;
                                }
                            });
                        }
                        _a = this;
                        return [4 /*yield*/, tools.BalanceInfo.getBalancesByArr(balances, nep5balances, height)];
                    case 6:
                        _a.balances = _b.sent();
                        tools.StorageTool.setStorage("balances_asset", JSON.stringify(this.balances));
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
                        this.loadmsg = "" + this.$t("balance.msg1");
                        return [4 /*yield*/, tools.CoinTool.rawTransaction(this.currentAddress, tools.CoinTool.id_NEO, this.neoasset.neo.toString())];
                    case 1:
                        res = _a.sent();
                        if (res.info) {
                            this.loadmsg = "" + this.$t("balance.msg2");
                            this.queryNEOTx(res.info);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        this.loadmsg = "" + this.$t("balance.msg3");
                        return [4 /*yield*/, tools.CoinTool.claimGas()];
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
                            case 0: return [4 /*yield*/, tools.WWW.getrawtransaction(txid)];
                            case 1:
                                res = _a.sent();
                                if (!res) {
                                    this.queryNEOTx(txid);
                                    return [2 /*return*/];
                                }
                                this.loadmsg = "" + this.$t("balance.msg3");
                                return [4 /*yield*/, tools.CoinTool.claimGas()];
                            case 2:
                                result = _a.sent();
                                if (result["sendrawtransactionresult"]) {
                                    txid_1 = result["txid"];
                                    this.queryClaimTx(txid_1);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); }, 30000);
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
                            case 0: return [4 /*yield*/, tools.WWW.getrawtransaction(txid)];
                            case 1:
                                res = _a.sent();
                                if (res) {
                                    this.loadmsg = "" + this.$t("balance.msg4");
                                    this.claimbtn = true;
                                    this.getBalances();
                                    return [2 /*return*/];
                                }
                                this.queryClaimTx(txid);
                                return [2 /*return*/];
                        }
                    });
                }); }, 30000);
                return [2 /*return*/];
            });
        });
    };
    balance.prototype.toTransfer = function (asset) {
        tools.StorageTool.setStorage("transfer_choose", asset);
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

/***/ "7VBB":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "7vgD":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,DQo8c3ZnIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5ICg1MTAwMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+PC9kZWZzPg0KICAgIDxnIGlkPSJiYWxhbmNlNC10ZXN0bmV0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9IummlumhtS10cmFuc2Zlci1pbnB1dDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05MjIuMDAwMDAwLCAtMzc4LjAwMDAwMCkiPg0KICAgICAgICAgICAgPGcgaWQ9InRyYW5zZmVyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDAuMDAwMDAwLCAyMjYuMDAwMDAwKSI+DQogICAgICAgICAgICAgICAgPGcgaWQ9IuWkp+Wbvuaghy/orablkYoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgyMi4wMDAwMDAsIDE1Mi4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI0LDEyLjE0ODE0ODEgQzI0LDUuMzcyNDQ0NDQgMTguNjI3NTU1NiwwIDExLjg1MTg1MTksMCBDNS4zNzI0NDQ0NCwwIDAsNS4zNzI0NDQ0NCAwLDEyLjE0ODE0ODEgQzAsMTguNjI3NTU1NiA1LjM3MjQ0NDQ0LDI0IDExLjg1MTg1MTksMjQgQzE4LjYyNzU1NTYsMjQgMjQsMTguNjI3NTU1NiAyNCwxMi4xNDgxNDgxIFoiIGlkPSJGaWxsLSIgZmlsbD0iI0ZGNkE2QSI+PC9wYXRoPg0KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTIsNi40NTE2MTI5IEMxMi41MDIzMTU2LDYuNDUxNjEyOSAxMi44ODg1NDM3LDYuODQ5MTA0ODUgMTIuODcwNDMyMyw3LjMzOTQzNjAxIEwxMi42MzQ5NDQsMTMuNzE0ODUyIEMxMi42MTY2NzIsMTQuMjA5NTMyNCAxMi4xOTkwMjU1LDE0LjYwMjY3NTEgMTEuNzAxNzQ1NSwxNC42MDI2NzUxIEwxMi4yOTgyNTQ1LDE0LjYwMjY3NTEgQzExLjgwNTU3MDksMTQuNjAyNjc1MSAxMS4zODMxNjczLDE0LjIwNTE4MzEgMTEuMzY1MDU2LDEzLjcxNDg1MiBMMTEuMTI5NTY3Nyw3LjMzOTQzNjAxIEMxMS4xMTEyOTU3LDYuODQ0NzU1NTcgMTEuNTAxMTYyMiw2LjQ1MTYxMjkgMTIsNi40NTE2MTI5IFogTTEyLDE3LjU0ODM4NzEgQzExLjUwMTE2MjIsMTcuNTQ4Mzg3MSAxMS4wOTY3NzQyLDE3LjE0Mzk5OTEgMTEuMDk2Nzc0MiwxNi42NDUxNjEzIEMxMS4wOTY3NzQyLDE2LjE0NjMyMzUgMTEuNTAxMTYyMiwxNS43NDE5MzU1IDEyLDE1Ljc0MTkzNTUgQzEyLjQ5ODgzNzgsMTUuNzQxOTM1NSAxMi45MDMyMjU4LDE2LjE0NjMyMzUgMTIuOTAzMjI1OCwxNi42NDUxNjEzIEMxMi45MDMyMjU4LDE3LjE0Mzk5OTEgMTIuNDk4ODM3OCwxNy41NDgzODcxIDEyLDE3LjU0ODM4NzEgWiIgaWQ9IlBhdGgtIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQogICAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KPC9zdmc+"

/***/ }),

/***/ "82a0":
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
var wallet_vue_1 = __webpack_require__("PPZq");
var vue_1 = __webpack_require__("/5sW");
var vue_class_component_1 = __webpack_require__("c+8m");
var transfer = /** @class */ (function (_super) {
    __extends(transfer, _super);
    function transfer() {
        var _this = _super.call(this) || this;
        _this.balances = [];
        _this.balance = new tools.BalanceInfo();
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
        var str = tools.StorageTool.getStorage("balances_asset");
        if (str == null)
            this.balances = new Array();
        else {
            this.balances = JSON.parse(str);
            var choose = tools.StorageTool.getStorage("transfer_choose");
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
        tools.StorageTool.setStorage("transfer_choose", assetid);
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
                        currcountAddr = tools.LoginInfo.getCurrentAddress();
                        return [4 /*yield*/, tools.WWW.api_getBalance(currcountAddr)];
                    case 1:
                        balances = _a.sent();
                        return [4 /*yield*/, tools.WWW.api_getnep5Balance(currcountAddr)];
                    case 2:
                        nep5balances = _a.sent();
                        return [4 /*yield*/, tools.WWW.api_getHeight()];
                    case 3:
                        height = _a.sent();
                        this.balances = tools.BalanceInfo.getBalancesByArr(balances, nep5balances, height);
                        tools.StorageTool.setStorage("balances_asset", JSON.stringify(this.balances));
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
                        isDomain = tools.NNSTool.verifyDomain(this.target);
                        isAddress = tools.NNSTool.verifyAddr(this.target);
                        if (!isDomain) return [3 /*break*/, 2];
                        this.target = this.target.toLowerCase();
                        return [4 /*yield*/, tools.NNSTool.resolveData(this.target)];
                    case 1:
                        addr = _a.sent();
                        if (addr) {
                            this.toaddress = addr;
                            this.isDomain = true;
                            this.addrerr = 'false';
                            return [2 /*return*/, true];
                        }
                        else {
                            this.toaddress = "";
                            this.addrerr = 'true';
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        if (isAddress) {
                            if (tools.neotools.verifyPublicKey(this.target)) {
                                this.toaddress = this.target;
                                this.addrerr = 'false';
                                return [2 /*return*/, true];
                            }
                        }
                        else {
                            this.addrerr = 'true';
                            this.toaddress = "";
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
                        return [4 /*yield*/, tools.CoinTool.nep5Transaction(tools.LoginInfo.getCurrentAddress(), this.toaddress, this.asset, this.amount)];
                    case 1:
                        res = _a.sent();
                        if (!!res["err"]) return [3 /*break*/, 3];
                        mui.toast("" + this.$t("transfer.msg2"));
                        his = new tools.History();
                        his.address = this.toaddress;
                        his.asset = this.asset;
                        his.value = this.amount;
                        his.txtype = "in";
                        his["waiting"] = true;
                        his.time = tools.DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
                        his.assetname = this.balance.names;
                        his.txid = res.info;
                        this.txs = [his].concat(this.txs);
                        num = parseFloat(this.balance.balance + "");
                        bear = num - parseFloat(this.amount);
                        this.balance.balance = bear;
                        this.amount = "";
                        return [4 /*yield*/, tools.WWW.api_getHeight()];
                    case 2:
                        height = _a.sent();
                        tools.BalanceInfo.setBalanceSotre(this.balance, height);
                        tools.History.setHistoryStore(his, height);
                        tools.StorageTool.setStorage("current-height", height + "");
                        return [3 /*break*/, 4];
                    case 3:
                        mui.alert("" + this.$t("transfer.msg3"));
                        _a.label = 4;
                    case 4: return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, tools.CoinTool.rawTransaction(this.toaddress, this.asset, this.amount)];
                    case 6:
                        res = _a.sent();
                        mui.toast(res.info);
                        his = new tools.History();
                        his.address = this.toaddress;
                        his.asset = this.asset;
                        his.value = this.amount;
                        his.txtype = "in";
                        his["waiting"] = true;
                        his.time = tools.DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
                        his.assetname = this.balance.names;
                        his.txid = res.info;
                        this.txs = [his].concat(this.txs);
                        num = parseFloat(this.balance.balance + "");
                        bear = num - parseFloat(this.amount);
                        this.amount = "";
                        this.balance.balance = bear;
                        return [4 /*yield*/, tools.WWW.api_getHeight()];
                    case 7:
                        height = _a.sent();
                        tools.BalanceInfo.setBalanceSotre(this.balance, height);
                        tools.History.setHistoryStore(his, height);
                        tools.StorageTool.setStorage("current-height", height + "");
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_1 = _a.sent();
                        mui.alert("" + this.$t("transfer.msg4"));
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
                    case 0: return [4 /*yield*/, tools.CoinTool.initAllAsset()];
                    case 1:
                        _f.sent();
                        currentAddress = tools.LoginInfo.getCurrentAddress();
                        return [4 /*yield*/, tools.WWW.gettransbyaddress(currentAddress, 5, this.txpage)];
                    case 2:
                        res = _f.sent();
                        return [4 /*yield*/, tools.WWW.api_getHeight()];
                    case 3:
                        h = _f.sent();
                        res = res ? res : []; //将空值转为长度0的数组
                        this.txpage == 1 && res.length > 5 ? this.cutshow = false : this.cutshow = true;
                        tools.History.delHistoryStoreByHeight(h);
                        his = tools.History.getHistoryStore();
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
                        date = tools.DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(time));
                        if (!(type == "out")) return [3 /*break*/, 9];
                        if (!(vins && vins.length == 1)) return [3 /*break*/, 8];
                        assetname = "";
                        vin = vins[0];
                        asset = vin["asset"];
                        amount = value[asset];
                        address = vin["address"];
                        if (!(assetType == "utxo")) return [3 /*break*/, 5];
                        assetname = tools.CoinTool.assetID2name[asset];
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, tools.WWW.getNep5Asset(asset)];
                    case 6:
                        nep5 = _f.sent();
                        assetname = nep5["name"];
                        _f.label = 7;
                    case 7:
                        history = new tools.History();
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
                        assetname = tools.CoinTool.assetID2name[asset];
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, tools.WWW.getNep5Asset(asset)];
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
                        assetname = tools.CoinTool.assetID2name[asset];
                        return [3 /*break*/, 20];
                    case 18: return [4 /*yield*/, tools.WWW.getNep5Asset(asset)];
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
                                        history = new tools.History();
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
                        str = tools.StorageTool.getStorage("current-height");
                        return [4 /*yield*/, tools.WWW.api_getHeight()];
                    case 1:
                        currentheight = _a.sent();
                        oldheight = currentheight;
                        str ? oldheight = parseInt(str) : tools.StorageTool.setStorage("current-height", currentheight + "");
                        if (!(currentheight - oldheight >= 2)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.history()];
                    case 2:
                        _a.sent();
                        sessionStorage.removeItem("current-height");
                        return [2 /*return*/];
                    case 3:
                        setTimeout(function () {
                            _this.awaitHeight();
                        }, 30000);
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

/***/ "8KnJ":
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
var vue_property_decorator_1 = __webpack_require__("EOM2");
var Valert_vue_1 = __webpack_require__("Gieu");
var Spinner_vue_1 = __webpack_require__("+jyM");
var auctioninfo_vue_1 = __webpack_require__("NH4h");
/// <reference path="../tools/importpack.ts"/>
var Auction = /** @class */ (function (_super) {
    __extends(Auction, _super);
    function Auction() {
        var _this = _super.call(this) || this;
        _this.auctionShow = false;
        _this.auctionPage = false;
        return _this;
    }
    Auction.prototype.onBack = function () {
        this.auctionPage = false;
    };
    Auction = __decorate([
        vue_property_decorator_1.Component({
            components: {
                "v-alert": Valert_vue_1.default,
                "spinner-wrap": Spinner_vue_1.default,
                "auction-info": auctioninfo_vue_1.default
            }
        }),
        __metadata("design:paramtypes", [])
    ], Auction);
    return Auction;
}(vue_1.default));
exports.default = Auction;


/***/ }),

/***/ "8L/I":
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
var neoauction_vue_1 = __webpack_require__("jrmo");
var NNSNeo = /** @class */ (function (_super) {
    __extends(NNSNeo, _super);
    function NNSNeo() {
        var _this = _super.call(this) || this;
        _this.showType = 1;
        return _this;
    }
    NNSNeo.prototype.mounted = function () { };
    NNSNeo = __decorate([
        vue_class_component_1.default({
            components: {
                "wallet-layout": wallet_vue_1.default,
                "neo-auction": neoauction_vue_1.default
            }
        }),
        __metadata("design:paramtypes", [])
    ], NNSNeo);
    return NNSNeo;
}(vue_1.default));
exports.default = NNSNeo;


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

/***/ "B+db":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "BXPd":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "C0Cu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/bid/nnsneo.ts
var nnsneo = __webpack_require__("8L/I");
var nnsneo_default = /*#__PURE__*/__webpack_require__.n(nnsneo);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0c23eebf","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/bid/nnsneo.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container "},[_c('div',{staticClass:"title-menu"},[_c('ul',{staticClass:"menu-box"},[_c('li',{staticClass:"active",on:{"click":function($event){_vm.showType = 1}}},[_vm._v("Neo Name Auction")]),_vm._v(" "),_c('li',{on:{"click":function($event){_vm.showType = 2}}},[_vm._v("SGas Exchange")]),_vm._v(" "),_c('li',{on:{"click":function($event){_vm.showType = 3}}},[_vm._v("My Neo Name")]),_vm._v(" "),_c('li',{on:{"click":function($event){_vm.showType = 4}}},[_vm._v("Bonus")])])]),_vm._v(" "),_c('div',{staticClass:"content-box"},[(_vm.showType == 1)?_c('neo-auction'):_vm._e()],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var bid_nnsneo = (esExports);
// CONCATENATED MODULE: ./src/pages/bid/nnsneo.vue
function injectStyle (ssrContext) {
  __webpack_require__("EFZt")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0c23eebf"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  nnsneo_default.a,
  bid_nnsneo,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_bid_nnsneo = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "EFZt":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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
        _this.currentLanguage = sessionStorage.getItem("language") == "cn"
            ? "中文"
            : "English";
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
    Main.prototype.cutLanguage = function (lang) {
        switch (lang) {
            case 1:
                this.currentLanguage = "English";
                sessionStorage.setItem("language", "en");
                this.$i18n.locale = "en";
                break;
            case 2:
                this.currentLanguage = "中文";
                sessionStorage.setItem("language", "cn");
                this.$i18n.locale = "cn";
                break;
            default:
                break;
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

/***/ "Gdp8":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Gieu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/Valert.vue
var Valert = __webpack_require__("shbj");
var Valert_default = /*#__PURE__*/__webpack_require__.n(Valert);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-620d150e","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Valert.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.show)?_c('div',{staticClass:"alert-box"},[_c('div',{staticClass:"alert-warp"},[_c('div',{staticClass:"alert-title"},[_vm._v(_vm._s(_vm.$t('nns.alerttitle')))]),_vm._v(" "),_c('div',{staticClass:"alert-content"},[_vm._t("default")],2),_vm._v(" "),_c('div',{staticClass:"alert-close",on:{"click":function($event){_vm.closemudloe()}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])]):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_Valert = (esExports);
// CONCATENATED MODULE: ./src/components/Valert.vue
function injectStyle (ssrContext) {
  __webpack_require__("uRES")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-620d150e"
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
var VLink_vue_1 = __webpack_require__("N5E8");
var login = /** @class */ (function (_super) {
    __extends(login, _super);
    function login() {
        var _this = _super.call(this) || this;
        // Data property
        _this.Message = "hello world";
        _this.wallet = new ThinNeo.nep6wallet();
        _this.otcgo = new tools.WalletOtcgo();
        _this.isotc = false;
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
            var isotc = !walletstr.includes("accounts");
            if (isotc) {
                _this.wallet.accounts = undefined;
                _this.otcgo.fromJsonStr(walletstr);
            }
            else {
                _this.otcgo.address = undefined;
                _this.wallet.fromJsonStr(walletstr);
            }
        };
        //初始化随机数生成器
        //该随机数生成器原理是，手机鼠标事件，所以早点打开效果好
        Neo.Cryptography.RandomNumberGenerator.startCollectors();
        return _this;
    }
    login.prototype.mounted = function () {
        if (tools.StorageTool.getLoginArr().length > 0) {
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
    login.prototype.loginFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loginarray_1, error_1, result, loginarray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.filename) {
                            mui.alert("" + this.$t("toast.msg3"));
                            return [2 /*return*/];
                        }
                        mui.toast("" + this.$t("toast.msg1"));
                        if (!!!this.wallet.accounts) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, tools.neotools.nep6Load(this.wallet, this.password)];
                    case 2:
                        loginarray_1 = _a.sent();
                        tools.StorageTool.setLoginArr(loginarray_1);
                        tools.LoginInfo.setCurrentAddress(loginarray_1[0].address);
                        mui.toast("" + this.$t("toast.msg2"), { duration: 'long', type: 'div' });
                        window.location.hash = "#balance";
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        mui.alert("" + this.$t("toast.msg3"));
                        return [3 /*break*/, 4];
                    case 4:
                        if (!!this.otcgo.address) {
                            try {
                                this.otcgo.otcgoDecrypt(this.password);
                                result = this.otcgo.doValidatePwd();
                                if (result) {
                                    loginarray = new Array();
                                    loginarray.push(new tools.LoginInfo());
                                    loginarray[0].address = this.otcgo.address;
                                    loginarray[0].prikey = this.otcgo.prikey;
                                    loginarray[0].pubkey = this.otcgo.pubkey;
                                    tools.StorageTool.setLoginArr(loginarray);
                                    tools.LoginInfo.setCurrentAddress(loginarray[0].address);
                                    mui.toast("" + this.$t("toast.msg2"), { duration: 'long', type: 'div' });
                                    window.location.hash = "#balance";
                                }
                                else {
                                    mui.alert("" + this.$t("toast.msg3"));
                                }
                            }
                            catch (error) {
                                mui.alert("" + this.$t("toast.msg3"));
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    login.prototype.loginWif = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, loginarray, login;
            return __generator(this, function (_a) {
                mui.toast("" + this.$t("toast.msg1"));
                res = tools.neotools.wifDecode(this.wif);
                if (res.err) {
                    mui.toast("" + this.$t("toast.msg4"));
                }
                else {
                    loginarray = new Array();
                    login = res.info;
                    loginarray.push(login);
                    tools.StorageTool.setLoginArr(loginarray);
                    tools.LoginInfo.setCurrentAddress(login.address);
                    mui.toast("" + this.$t("toast.msg2"), { duration: 'long', type: 'div' });
                    window.location.hash = "#balance";
                }
                return [2 /*return*/];
            });
        });
    };
    login.prototype.loginNep2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, loginarray, login;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mui.toast("" + this.$t("toast.msg1"));
                        return [4 /*yield*/, tools.neotools.nep2ToWif(this.nep2, this.nep2pwd)];
                    case 1:
                        res = _a.sent();
                        if (res.err) {
                            mui.toast("" + this.$t("toast.msg4"));
                        }
                        else {
                            loginarray = new Array();
                            login = res.info;
                            loginarray.push(login);
                            tools.StorageTool.setLoginArr(loginarray);
                            tools.LoginInfo.setCurrentAddress(login.address);
                            mui.toast("" + this.$t("toast.msg2"), { duration: 'long', type: 'div' });
                            window.location.hash = "#balance";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    login.prototype.loginNeodun = function () { };
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
            this.pwdmsg = '' + this.$t("generate.pwderrmsg1");
            return false;
        }
        var reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
        if (!reg.test(this.walletpwd)) {
            this.pwderr = 'true';
            this.pwdmsg = '' + this.$t("generate.pwderrmsg2");
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

/***/ "JPeH":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "Luci":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/login.ts
var login = __webpack_require__("ILH5");
var login_default = /*#__PURE__*/__webpack_require__.n(login);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-ce5512f6","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/login.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main-layout',[_c('div',{staticStyle:{"height":"180px"}}),_vm._v(" "),_c('div',{staticClass:"container-box"},[_c('div',{staticClass:"row login-container"},[_c('div',{staticClass:"container-left"},[_c('div',{staticClass:"container-icon"},[_c('img',{attrs:{"src":__webpack_require__("4+Dl"),"alt":""}})]),_vm._v(" "),_c('div',{staticClass:"container-title",class:{'active':!(_vm.moudle_generate||_vm.moudle_download)},on:{"click":function($event){_vm.cutModual('nep6')}}},[_c('span',{ref:"login"},[_vm._v(_vm._s(_vm.$t("login.login")))])]),_vm._v(" "),_c('div',{staticClass:"container-title",class:{'active':(_vm.moudle_generate || _vm.moudle_download)},on:{"click":function($event){_vm.cutModual('generate')}}},[_c('span',{ref:"login"},[_vm._v(_vm._s(_vm.$t("generate.generate")))])])]),_vm._v(" "),_c('div',{staticClass:"container-right"},[(_vm.moudle_nep6)?_c('div',{staticClass:"nep6-imp"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v("\n              "+_vm._s(_vm.$t("login.title"))+"\n            ")])]),_vm._v(" "),_c('div',{staticClass:"input-login"},[_c('div',{staticClass:"input-group nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filename),expression:"filename"}],staticClass:"form-control",attrs:{"type":"text","placeholder":_vm.$t('login.selectplaceholder'),"disabled":"true"},domProps:{"value":(_vm.filename)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filename=$event.target.value}}}),_vm._v(" "),_c('span',{staticClass:"input-group-addon"},[_c('button',{staticClass:"btn btn-nel fileinput-button"},[_c('span',[_vm._v(_vm._s(_vm.$t("login.selectbtn")))]),_vm._v(" "),_c('input',{attrs:{"type":"file"},on:{"change":_vm.fileChange}})])])])]),_vm._v(" "),_c('div',{staticClass:"input-login",staticStyle:{"padding-top":"40px"}},[_c('div',{staticClass:"input-group nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"form-control",attrs:{"placeholder":_vm.$t('login.passwordholder'),"type":"password"},domProps:{"value":(_vm.password)},on:{"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }_vm.loginFile($event)},"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value}}}),_vm._v(" "),_c('span',{staticClass:"input-group-addon"},[_c('button',{staticClass:"btn btn-nel fileinput-button",on:{"click":_vm.loginFile}},[_vm._v("\n                  "+_vm._s(_vm.$t("login.login"))+"\n                ")])])])]),_vm._v(" "),_c('div',{staticStyle:{"height":"36px","padding-top":"80px","padding-bottom":"30px","text-align":"center"}},[_c('hr',{attrs:{"width":"80%","color":"#987cb9"}}),_vm._v(" "),_c('div',{staticClass:"hr-more"},[_vm._v(_vm._s(_vm.$t("login.cutlinemsg")))])]),_vm._v(" "),_c('div',{staticStyle:{"width":"417px","margin":"0 auto","padding-top":"30px"}},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":function($event){_vm.cutModual('wif')}}},[_vm._v(_vm._s(_vm.$t("login.wifmsg")))])]),_vm._v(" "),_c('div',{staticStyle:{"width":"417px","margin":"0 auto","padding-top":"20px","padding-bottom":"5.9%"}},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":function($event){_vm.cutModual('nep2')}}},[_vm._v(_vm._s(_vm.$t("login.nep2msg")))])])]):_vm._e(),_vm._v(" "),(_vm.moudle_wif)?_c('div',{staticClass:"wif_imp"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v(_vm._s(_vm.$t("wif.title")))])]),_vm._v(" "),_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.wif),expression:"wif"}],attrs:{"type":"text","placeholder":_vm.$t('wif.wifplaceholder')},domProps:{"value":(_vm.wif)},on:{"input":function($event){if($event.target.composing){ return; }_vm.wif=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"login-btn"},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":_vm.loginWif}},[_vm._v(_vm._s(_vm.$t("login.login")))])]),_vm._v(" "),_c('div',{staticClass:"back"},[_c('a',{on:{"click":function($event){_vm.cutModual('nep6')}}},[_vm._v("< "+_vm._s(_vm.$t("wif.back")))])])]):_vm._e(),_vm._v(" "),(_vm.moudle_nep2)?_c('div',{staticClass:"nep2_imp"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v("Nep2")])]),_vm._v(" "),_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.nep2),expression:"nep2"}],attrs:{"type":"text","placeholder":_vm.$t('nep2.placeholder')},domProps:{"value":(_vm.nep2)},on:{"input":function($event){if($event.target.composing){ return; }_vm.nep2=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.nep2pwd),expression:"nep2pwd"}],attrs:{"type":"password","placeholder":_vm.$t('nep2.password')},domProps:{"value":(_vm.nep2pwd)},on:{"input":function($event){if($event.target.composing){ return; }_vm.nep2pwd=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"login-btn"},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":_vm.loginNep2}},[_vm._v(_vm._s(_vm.$t("login.login")))])]),_vm._v(" "),_c('div',{staticClass:"back"},[_c('a',{on:{"click":function($event){_vm.cutModual('nep6')}}},[_vm._v("< "+_vm._s(_vm.$t("wif.back")))])])]):_vm._e(),_vm._v(" "),(_vm.moudle_generate)?_c('div',{staticClass:"generate"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v(_vm._s(_vm.$t("generate.title")))])]),_vm._v(" "),_c('div',{class:_vm.nameerr!=''?( _vm.nameerr == 'true' ?'err':'success') :''},[_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.walletname),expression:"walletname"}],attrs:{"type":"text","placeholder":_vm.$t('generate.name')},domProps:{"value":(_vm.walletname)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.walletname=$event.target.value},_vm.verifyName],"blur":_vm.verifyName}})]),_vm._v(" "),_c('div',{staticClass:"message"},[(_vm.nameerr=='true')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("7vgD"),"alt":""}}),_vm._v("   "+_vm._s(_vm.$t('generate.nameempty')))]):_vm._e(),_vm._v(" "),(_vm.nameerr=='false')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}}),_vm._v("   "+_vm._s(_vm.$t('generate.namepass')))]):_vm._e()])]),_vm._v(" "),_c('div',{class:_vm.pwderr!=''?( _vm.pwderr == 'true' ?'err':'success') :''},[_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.walletpwd),expression:"walletpwd"}],attrs:{"type":"password","placeholder":_vm.$t('generate.password')},domProps:{"value":(_vm.walletpwd)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.walletpwd=$event.target.value},_vm.verifypwd],"blur":_vm.verifypwd}})]),_vm._v(" "),_c('div',{staticClass:"message"},[(_vm.pwderr=='true')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("7vgD"),"alt":""}}),_vm._v("   "+_vm._s(_vm.pwdmsg)+"\n              ")]):_vm._e(),_vm._v(" "),(_vm.pwderr=='false')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}}),_vm._v("   "+_vm._s(_vm.$t('generate.namepass'))+"\n              ")]):_vm._e()])]),_vm._v(" "),_c('div',{class:_vm.confirmerr!=''?( _vm.confirmerr == 'true' ?'err':'success') :''},[_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.confirmpwd),expression:"confirmpwd"}],attrs:{"type":"password","placeholder":_vm.$t('generate.passwordagain')},domProps:{"value":(_vm.confirmpwd)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.confirmpwd=$event.target.value},_vm.verifyConfirm],"blur":_vm.verifyConfirm}})]),_vm._v(" "),_c('div',{staticClass:"message"},[(_vm.confirmerr=='true')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("7vgD"),"alt":""}}),_vm._v("   "+_vm._s(_vm.$t('generate.pwderrmsg3'))+"\n              ")]):_vm._e(),_vm._v(" "),(_vm.confirmerr=='false')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}}),_vm._v("   "+_vm._s(_vm.$t('generate.namepass'))+"\n              ")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"login-btn"},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":function($event){_vm.generate()}}},[_vm._v(_vm._s(_vm.$t("generate.generate")))])])]):_vm._e(),_vm._v(" "),(_vm.moudle_download)?_c('div',{staticClass:"generate download"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v(_vm._s(_vm.$t("generate.createmsg")))])]),_vm._v(" "),_c('p',{staticClass:"guide"},[_vm._v(_vm._s(_vm.$t("generate.downloadmsg")))]),_vm._v(" "),_c('div',{staticClass:"login-btn"},[_c('a',{staticClass:"btn btn-nel btn-import",attrs:{"download":_vm.download_name,"href":_vm.download_href}},[_vm._v(_vm._s(_vm.$t("generate.download")))])]),_vm._v(" "),_c('div',{staticClass:"remind"},[_c('p',{staticClass:"title-remind"},[_vm._v(_vm._s(_vm.$t("generate.msg")))]),_vm._v(" "),_c('p',{staticClass:"content-remind"},[_vm._v(_vm._s(_vm.$t("generate.msg2")))])])]):_vm._e()])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var pages_login = (esExports);
// CONCATENATED MODULE: ./src/pages/login.vue
function injectStyle (ssrContext) {
  __webpack_require__("0LJk")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ce5512f6"
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

/***/ "NH4h":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/bid/auctioninfo.ts
var auctioninfo = __webpack_require__("mcrB");
var auctioninfo_default = /*#__PURE__*/__webpack_require__.n(auctioninfo);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2d5c80ea","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/bid/auctioninfo.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page-two"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v("Auction Information")]),_vm._v(" "),_c('div',{staticClass:"goback",on:{"click":_vm.onBack}},[_vm._v("<<<Go back")])]),_vm._v(" "),_vm._m(0,false,false),_vm._v(" "),_vm._m(1,false,false),_vm._v(" "),_vm._m(2,false,false),_vm._v(" "),_vm._m(3,false,false),_vm._v(" "),_vm._m(4,false,false),_vm._v(" "),_vm._m(5,false,false),_vm._v(" "),_vm._m(6,false,false)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-box"},[_c('div',{staticClass:"filename"},[_vm._v("Domain : Bennyrepublic1234.test")]),_vm._v(" "),_c('div',{staticClass:"status"},[_vm._v("Status : "),_c('span',{staticClass:"status-being"},[_vm._v("Fixed period ")])]),_vm._v(" "),_c('div',{staticClass:"highest-price"},[_vm._v("Highest bid price : 9 SGas")]),_vm._v(" "),_c('div',{staticClass:"bidder"},[_vm._v("Current bidder  : "),_c('span',[_vm._v("Other people（ AYMa5TcgVfvPxBxzzfYswUHAvXLyaptquh ）")])]),_vm._v(" "),_c('div',{staticClass:"bidder"},[_vm._v("Current bidder  : "),_c('span',{staticClass:"bidder-me"},[_vm._v("Me（ AYMa5TcgVfvPxBxzzfYswUHAvXLyaptquh ）")])]),_vm._v(" "),_c('div',{staticClass:"my-bid-sgas"},[_vm._v("My cumulative bid  : "),_c('span',{staticClass:"status-ended"},[_vm._v("8")]),_vm._v("  SGas")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"title"},[_c('span',[_vm._v("Get my domain")])]),_vm._v(" "),_c('div',{staticClass:"form-box"},[_c('div',{staticClass:"name"},[_vm._v("BunnyRepublic.neo")]),_vm._v(" "),_c('div',{staticClass:"tips"},[_vm._v("Tips : When you successfully get your domain,You can edit it in My Neo Name.")]),_vm._v(" "),_c('div',{staticClass:"btn-center"},[_c('button',{staticClass:"btn btn-nel btn-bid"},[_vm._v("Get domain")]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel btn-bid btn-disable",attrs:{"disabled":""}},[_vm._v("Getting domain...")])])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"title"},[_c('span',[_vm._v("Recover SGas")])]),_vm._v(" "),_c('div',{staticClass:"form-box"},[_c('div',{staticClass:"bid-msg"},[_vm._v("My cumulative bid  : 10 SGas")]),_vm._v(" "),_c('div',{staticClass:"fee-msg"},[_vm._v("Fee : 0.5 SGas")]),_vm._v(" "),_c('div',{staticClass:"remain-msg"},[_vm._v("Remaining SGas : 9.5 SGas")]),_vm._v(" "),_c('div',{staticClass:"btn-center"},[_c('button',{staticClass:"btn btn-nel btn-bid"},[_vm._v("Recover SGas")]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel btn-bid btn-disable",attrs:{"disabled":""}},[_vm._v("Recoverring SGas...")])])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"title"},[_c('span',[_vm._v("Raise my bid")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-box"},[_c('div',[_c('div',{staticClass:"input-msg"},[_vm._v("Raise my bid : ")]),_vm._v(" "),_c('div',{staticClass:"input-box"},[_c('input',{attrs:{"type":"text","placeholder":"Enter a raise"}}),_vm._v(" "),_c('span',[_vm._v("SGas")])]),_vm._v(" "),_c('div',{staticClass:"err-msg status-ended"},[_vm._v("Only 90 SGas is available.")])]),_vm._v(" "),_c('div',{staticClass:"my-sgas"},[_vm._v("My cumulative bid will be : "),_c('span',{staticClass:"status-ended"},[_vm._v("8")]),_vm._v(" SGas")]),_vm._v(" "),_c('div',{staticClass:"tips-msg"},[_vm._v("\n            Tips : The minimum value for your raise is 0.1 SGas. When your cumulative bid is less than the  highest bid price, The raise will be unsuccessful. \n        ")]),_vm._v(" "),_c('div',{staticClass:"btn-bid-box"},[_c('button',{staticClass:"btn btn-bid btn-disable",attrs:{"disabled":"disabled"}},[_vm._v("Bid")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"title"},[_c('span',[_vm._v("Timeline")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-box"},[_c('div',{staticClass:"status-box"},[_vm._v("sdfasf")]),_vm._v(" "),_c('div',{staticClass:"vertical-box"},[_c('div',{staticClass:"vertical"}),_vm._v(" "),_c('div',{staticClass:"left-box"}),_vm._v(" "),_c('div',{staticClass:"right-box"})])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var bid_auctioninfo = (esExports);
// CONCATENATED MODULE: ./src/pages/bid/auctioninfo.vue
function injectStyle (ssrContext) {
  __webpack_require__("vQak")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2d5c80ea"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  auctioninfo_default.a,
  bid_auctioninfo,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_bid_auctioninfo = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "NLED":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "NmuQ":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA11JREFUWAnNWT1II0EUfgkiiNqk8CRgIYmdVhFFsU+6iFjZBK3vQAwErJa7q0QrOewsRbgmHhaCVtZqEy0UPEQUzR0EiTlEUG7v+2ZN2MQz2b/EffBt3s7Me/Ptm53ZN5OAOBRd1yMwTQIxIGwCVLkx4Qj6j0Ag8JMVTRWQ6gG+AMeAXaENbXs8JwmnXYAGlAC3Qh8a0OUJUTiaAvKA10KfU45JwjgAaMBfoFlC3xoQsEUUBh3Ad6BVwr46LJFEQ0auleTKQWCfjSOJRlrZ4h1+tbpRBCFOiGa+c42emX1XTZxKSFHBaX8OfKj7FM2v/IUuoljY/7CrNlN/aeiOyD09PUk2m5WdnR25vLwUOJf+/n6Jx+MyPT2t7k39NFLJgVw+s6GKIKLH1Z2fItuL59XVlSwsLMjFxQX9vZLh4WFZW1uTYDD4qq5OAaMXwYP+Llt9QoFtcuxgaWlJkRsaGpLl5WXZ3d2Vra0tmZmZYbUcHh7KxsaG0m1cyOVjpT0i6OTbCjNdv7+/19fX13UMs7o3X+bn5/VYLKanUilzsVX9mASDaM2sZLDC1qbS3d0tc3Nz0tZmfp0NJ+Pj40p5a/gbdDVIbhxipkxNkYeHB+WXD+FQkiTIfK4psre3p/yOjY059R8jQSabnsvm5qacnp5KZ2enzM7OOvUfFozzmdW31mq7XC6nj46OqgmCtdGq2f/anXkewVKpJIuLi/L8/CyTk5OSSCScRo92YRLU3XiotV1dXZV8Pi+RSEQymUxttd17nQRv7Vq91b5QKMj29raqTqfT0t7e/lZTq+W3JMgdmCdycHCghra3t1dGRka88HnjKcFisahI9fX1eUGOPm64/HPfanw4WeRCJiYmhNELhUIuvFSZHjG956eOeaAfJRpESsM068QrdtfX1/L4+OiFuxNy4ztIyRo/7q5Mvbj2JZNJtdS482ZwKhP8BmcqxXbjlFk1hcvN/v6+G1fkQk6iCDJzhb7CAjcSjUYr5gMDAxXdgbLywslI+ekAk4VZrKtN093dndqXkKiLdbBq01T1cCDpu21nFUHegKQGvJfU37i/EPT30ccLSf8eHpEgBWPs3+M3g6JxBVF/HmDWkPTvEXANUR6ifwWcbPRpY/sQXZ3NmElY1dFZS/6G+AfBNJPrQJbG6AAAAABJRU5ErkJggg=="

/***/ }),

/***/ "Oz3I":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/transfer/transfer.ts
var transfer = __webpack_require__("82a0");
var transfer_default = /*#__PURE__*/__webpack_require__.n(transfer);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-164a7f26","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/transfer/transfer.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('transfer.transfer')))])])]),_vm._v(" "),_c('div',{staticClass:"container"},[_c('div',{staticClass:"transfer-panel"},[_c('div',{staticClass:"form-horizontal"},[_c('div',{staticClass:"col-sm-12"},[_c('label',{staticClass:"col-sm-2 control-label",staticStyle:{"padding-top":"20px"},attrs:{"for":"firstname"}},[_vm._v(_vm._s(_vm.$t('transfer.title1'))+":")]),_vm._v(" "),_c('div',{staticClass:"col-sm-3"},[_c('div',{staticClass:"dropdown"},[_c('div',{staticClass:"btn dropdown-toggle select-nel",class:_vm.balances.length>0 ? '' : 'select-disabled',attrs:{"type":"button","id":"assets","data-toggle":"dropdown"}},[_c('div',{staticClass:"select-title"},[_vm._v(_vm._s(_vm.balance.names))]),_vm._v(" "),_c('div',{staticClass:"select-caret"},[_c('span',{staticClass:"caret"})])]),_vm._v(" "),_c('ul',{staticClass:"dropdown-menu dropdown-nel",attrs:{"role":"menu","aria-labelledby":"assets"}},_vm._l((_vm.balances),function(balance){return _c('li',{key:balance.asset,class:_vm.asset==balance.asset?'active':'',attrs:{"role":"presentation","value":balance.asset}},[_c('a',{attrs:{"role":"menuitem","tabindex":"-1"},on:{"click":function($event){_vm.choose(balance.asset)}}},[_vm._v(_vm._s(balance.names))])])}))])]),_vm._v(" "),_c('div',{staticClass:"col-sm-4",staticStyle:{"padding-top":"20px"}},[_c('span',[_vm._v("      "+_vm._s(_vm.balance.balance)+" "+_vm._s(_vm.balance.names ? _vm.balance.names +" "+ _vm.$t('transfer.msg5') : "")+" ")])])]),_vm._v(" "),_c('div',{staticClass:"col-sm-12",class:_vm.addrerr!=''?(_vm.addrerr == 'true' ?'err':'success') :''},[_c('label',{staticClass:"col-sm-2 control-label",attrs:{"for":""}},[_c('div',{staticStyle:{"padding-top":"40px"}},[_vm._v(_vm._s(_vm.$t('transfer.title2'))+":")])]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('div',{staticStyle:{"padding-top":"30px"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.target),expression:"target"}],staticClass:"nel-input big",attrs:{"type":"text","placeholder":_vm.$t('transfer.placeholder')},domProps:{"value":(_vm.target)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.target=$event.target.value},_vm.verify_addr]}})]),_vm._v(" "),(_vm.isDomain)?_c('p',[_vm._v(_vm._s(_vm.toaddress))]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-sm-3 mess"},[(_vm.addrerr=='true')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("7vgD"),"alt":""}}),_vm._v("  "+_vm._s(_vm.$t('transfer.msg1'))+" ")]):_vm._e(),_vm._v(" "),(_vm.addrerr=='false')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}})]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"col-sm-12",class:_vm.amounterr!=''?(_vm.amounterr == 'true' ?'err':'success') :''},[_c('label',{staticClass:"col-sm-2 control-label",attrs:{"for":""}},[_c('div',{staticStyle:{"padding-top":"40px"}},[_vm._v(_vm._s(_vm.$t('transfer.title3'))+":")])]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('div',{staticStyle:{"padding-top":"30px"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.amount),expression:"amount"}],staticClass:"nel-input big",attrs:{"type":"number"},domProps:{"value":(_vm.amount)},on:{"change":_vm.verify_Amount,"input":[function($event){if($event.target.composing){ return; }_vm.amount=$event.target.value},_vm.verify_Amount]}})])]),_vm._v(" "),_c('div',{staticClass:"col-sm-3 mess"})]),_vm._v(" "),_c('div',{staticClass:"col-sm-12",staticStyle:{"padding-top":"30px"}},[_c('div',{staticClass:"col-sm-6"}),_vm._v(" "),_c('div',{staticClass:"col-sm-3"},[_c('button',{staticClass:"btn btn-link"},[_vm._v(_vm._s(_vm.$t('transfer.details')))]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.send}},[_vm._v(_vm._s(_vm.$t('transfer.send')))])])])])])]),_vm._v(" "),_c('div',{staticClass:"container"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('transfer.title4')))])])]),_vm._v(" "),_c('div',{staticClass:"container"},[_c('div',{staticClass:"history-panel"},[_c('div',[_c('div',{staticClass:"title"}),_vm._v(" "),_vm._l((_vm.txs),function(tx){return _c('div',{key:tx.index,staticClass:"history"},[_c('div',{staticClass:"number",class:tx.txtype},[_vm._v("\n                        "+_vm._s(tx.txtype == 'out'?'+ ':'- ')+_vm._s(tx.value)+" "+_vm._s(tx.assetname))]),_vm._v(" "),_c('div',{staticClass:"address"},[_vm._v(_vm._s(tx.txtype == 'out'?_vm.$t('transfer.from'):_vm.$t('transfer.to'))+" : "+_vm._s(tx.address))]),_vm._v(" "),_c('div',{staticClass:"time"},[_c('a',{attrs:{"href":'https://scan.nel.group/#testnet/transaction/'+tx.txid,"target":"_blank"}},[_vm._v("\n                            "+_vm._s(tx.txid.substring(0, 4) + '...' + tx.txid.substring(tx.txid.length - 4))+"\n                        ")]),_vm._v("  "+_vm._s(tx.time)+"\n                        "),(tx.waiting)?_c('div',[_vm._v("("+_vm._s(_vm.$t('nns.waiting'))+")")]):_vm._e()])])})],2)]),_vm._v(" "),(_vm.cutshow)?_c('div',{staticClass:"page"},[_c('div',{staticClass:"page-previous",class:_vm.txpage<=1?'disabled':'',on:{"click":function($event){_vm.cutPage('pre')}}},[_c('img',{attrs:{"src":__webpack_require__("tt5S"),"alt":""}})]),_vm._v(" "),_c('div',{staticStyle:{"width":"1px"}}),_vm._v(" "),_c('div',{staticClass:"page-next",class:_vm.nextpage?'':'disabled',on:{"click":function($event){_vm.cutPage('next')}}},[_c('img',{attrs:{"src":__webpack_require__("pp3u"),"alt":""}})])]):_vm._e()])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var transfer_transfer = (esExports);
// CONCATENATED MODULE: ./src/pages/transfer/transfer.vue
function injectStyle (ssrContext) {
  __webpack_require__("BXPd")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-164a7f26"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  transfer_default.a,
  transfer_transfer,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_transfer_transfer = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "PPZq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/layouts/wallet.ts
var wallet = __webpack_require__("YRcM");
var wallet_default = /*#__PURE__*/__webpack_require__.n(wallet);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-596bb77f","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/layouts/wallet.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main-layout',[_c('nav',{staticClass:"navbar navbar-wallet"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"navbar-collapse collapse",attrs:{"id":"navbar"}},[_c('ul',{staticClass:"nav navbar-nav navbar-left"},[_c('li',[_c('v-link',{ref:"balance",attrs:{"href":"#balance"}},[_c('span',{class:[_vm.balance]}),_vm._v(" "+_vm._s(_vm.$t('balance.balance'))+"\n            ")])],1),_vm._v(" "),_c('li',[_c('v-link',{ref:"transfer",attrs:{"href":"#transfer"}},[_c('span',{class:[_vm.transfer]}),_vm._v(" "+_vm._s(_vm.$t('transfer.transfer'))+"\n            ")])],1),_vm._v(" "),_c('li',[_c('v-link',{ref:"nnsneo",attrs:{"href":"#nnsneo"}},[_c('span',{class:[_vm.nns]}),_vm._v(" "+_vm._s(_vm.$t('nns.nns'))+"(.neo)\n            ")])],1),_vm._v(" "),_c('li',[_c('v-link',{ref:"nns",attrs:{"href":"#nns"}},[_c('span',{class:[_vm.nns]}),_vm._v(" "+_vm._s(_vm.$t('nns.nns'))+"(.test)\n            ")])],1),_vm._v(" "),_c('li',[_c('v-link',{ref:"setting",attrs:{"href":"#settings"}},[_c('span',{class:[_vm.setting]}),_vm._v(" "+_vm._s(_vm.$t('setting.settings'))+"\n            ")])],1)]),_vm._v(" "),_c('div',{staticClass:"blockheight"},[_vm._v(_vm._s(_vm.$t('navbar.blockheight'))+"："+_vm._s(_vm.blockheight))])])])]),_vm._v(" "),_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var layouts_wallet = (esExports);
// CONCATENATED MODULE: ./src/layouts/wallet.vue
function injectStyle (ssrContext) {
  __webpack_require__("r7o2")
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

/***/ "RN/i":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/nns/nns.ts
var nns = __webpack_require__("+Xm1");
var nns_default = /*#__PURE__*/__webpack_require__.n(nns);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-31ab617a","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/nns/nns.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container "},[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('nns.title1')))])]),_vm._v(" "),_c('div',{staticClass:"form-inline"},[_c('div',{staticClass:"input-group nns-register",class:_vm.domainerr?'input-err':'input-success'},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.nnsstr),expression:"nnsstr"}],staticClass:"nel",attrs:{"type":"text","placeholder":_vm.$t('nns.placeholder1')},domProps:{"value":(_vm.nnsstr)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.nnsstr=$event.target.value},_vm.verifyDomain]}}),_vm._v(" "),_c('span',{staticClass:"input-group-addon nel "},[_c('span',[_vm._v(_vm._s(_vm.network))])])]),_vm._v(" "),(_vm.btn_register)?_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.nnsRegister}},[_vm._v(_vm._s(_vm.$t('nns.register')))]):_c('spinner-wrap',{staticStyle:{"margin-left":"20px"}}),_vm._v(" "),_c('div',{staticClass:"err-color",staticStyle:{"padding-left":"50px","padding-top":"10px"}},[_c('span',[_vm._v(_vm._s(_vm.errmsg))])])],1),_vm._v(" "),_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('nns.title2')))]),_vm._v(" "),_c('div',{staticStyle:{"display":"inline-block"}},[_c('bubble-wrap',{attrs:{"isdisable":_vm.receive_disable}})],1)]),_vm._v(" "),_vm._l((_vm.domainarr),function(domain){return _c('div',{key:domain.index,staticClass:"form-inline"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-md-10"},[_c('span',{staticClass:"domainname"},[_vm._v("\n            "+_vm._s(domain.domainname)+"\n          ")]),_vm._v(" "),_c('br'),_vm._v(" "),_c('span',{staticClass:"msg-resolver"},[_vm._v("( "+_vm._s(_vm.$t('nns.text1'))+" : "+_vm._s(domain.resolver)+") "),_c('br')]),_vm._v(" "),_c('span',{staticClass:"msg-resolver"},[_vm._v("( "+_vm._s(_vm.$t('nns.text2'))+" : "+_vm._s(domain.mapping)+")"),_c('br')]),_vm._v(" "),_c('span',{staticClass:"msg-resolver"},[_vm._v("( "+_vm._s(_vm.$t('nns.text3'))+" : "+_vm._s(domain.time)+")\n          ")]),_vm._v(" "),_c('span',{staticClass:"msg-resolver state-lable"},[_vm._v(_vm._s(domain.isExpiration?"("+_vm.$t('nns.text4')+")":"")+" "+_vm._s(domain.await_register?"("+_vm.$t('nns.waiting')+")":""))])]),_vm._v(" "),_c('div',{staticClass:"col-md-2"},[(!domain.await_register)?_c('button',{staticClass:"btn btn-nel",on:{"click":function($event){_vm.resolve(domain)}}},[_vm._v(_vm._s(_vm.$t('nns.edit')))]):_vm._e()])])])})],2),_vm._v(" "),_c('v-alert',{ref:"alert"},[_c('div',{staticClass:"content content-file"},[_c('span',{staticClass:"content-des"},[_vm._v(_vm._s(_vm.$t('nns.alerttitle1'))+" : "+_vm._s(_vm.alert_domain))]),_vm._v(" "),_c('span',{staticClass:"content-msg"})]),_vm._v(" "),_c('div',{staticClass:"content content-verify"},[_c('span',{staticClass:"content-des"},[_vm._v(_vm._s(_vm.$t('nns.alerttitle2'))+" : ")]),_vm._v(" "),_c('span',{staticClass:"content-msg warning-msg"},[_vm._v("( "+_vm._s(_vm.$t('nns.alertmessage1'))+" )")]),_vm._v(" "),_c('div',{staticClass:"input-warp"},[_c('input',{staticClass:"input-ico input-disabled",attrs:{"type":"text","disabled":"disable"},domProps:{"value":_vm.alert_contract}}),_vm._v(" "),(_vm.alert_resolver_state==2)?_c('span',{staticClass:"correct-icon"},[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"btn-verify-warp"},[(_vm.alert_resolver_state==0)?_c('button',{staticClass:"btn-nel btn-verify ",on:{"click":function($event){_vm.setresolve()}}},[_vm._v(_vm._s(_vm.$t('btn.confirm')))]):_vm._e(),_vm._v(" "),(_vm.alert_resolver_state==1)?_c('spinner-wrap'):_vm._e(),_vm._v(" "),(_vm.alert_resolver_state==2)?_c('button',{staticClass:"btn-nel btn-verify ",on:{"click":function($event){_vm.setresolve()}}},[_vm._v(_vm._s(_vm.$t('btn.reset')))]):_vm._e()],1)])]),_vm._v(" "),_c('div',{staticClass:"content content-verify"},[_c('span',{staticClass:"content-des"},[_vm._v(_vm._s(_vm.$t('nns.alerttitle3'))+" : ")]),_vm._v(" "),_c('span',{staticClass:"content-msg"}),_vm._v(" "),_c('div',{staticClass:"input-warp"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.alert_addr),expression:"alert_addr"}],staticClass:"input-ico",class:_vm.mapping_err=='0'?'input-success':_vm.mapping_err=='1'?'input-err':'',attrs:{"type":"text"},domProps:{"value":(_vm.alert_addr)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.alert_addr=$event.target.value},_vm.verifyMappingAddress]}}),_vm._v(" "),(_vm.alert_config_state==2)?_c('span',{staticClass:"correct-icon"},[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"btn-verify-warp",staticStyle:{"margin-left":"25px"}},[(_vm.alert_config_state==0)?_c('button',{staticClass:"btn-nel btn-verify",on:{"click":function($event){_vm.configResolve()}}},[_vm._v(_vm._s(_vm.$t('btn.confirm')))]):_vm._e(),_vm._v(" "),(_vm.alert_config_state==2)?_c('button',{staticClass:"btn-nel btn-verify",on:{"click":function($event){_vm.configResolve()}}},[_vm._v(_vm._s(_vm.$t('btn.reset')))]):_vm._e(),_vm._v(" "),(_vm.alert_config_state==1)?_c('spinner-wrap'):_vm._e()],1)]),_vm._v(" "),(_vm.mapping_err=='1')?_c('div',{staticClass:"err-color"},[_vm._v(_vm._s(_vm.$t('nns.alertmessage2'))+" ")]):_vm._e()])])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var nns_nns = (esExports);
// CONCATENATED MODULE: ./src/pages/nns/nns.vue
function injectStyle (ssrContext) {
  __webpack_require__("um8m")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-31ab617a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  nns_default.a,
  nns_nns,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_nns_nns = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "STkM":
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
        this.address = tools.LoginInfo.getCurrentAddress();
    };
    Settings.prototype.visibleWif = function () {
        this.wifshow = (this.wifshow == true ? false : true);
        var msg = tools.LoginInfo.getCurrentLogin();
        var wif = ThinNeo.Helper.GetWifFromPrivateKey(msg.prikey);
        this.wif = (this.wifshow == true ? wif : "");
    };
    Settings.prototype.download = function () {
        var _this = this;
        this.walletname = tools.LoginInfo.getCurrentAddress() + ".json";
        var wallet = new ThinNeo.nep6wallet();
        wallet.scrypt = new ThinNeo.nep6ScryptParameters();
        wallet.scrypt.N = 16384;
        wallet.scrypt.r = 8;
        wallet.scrypt.p = 8;
        wallet.accounts = [];
        wallet.accounts[0] = new ThinNeo.nep6account();
        wallet.accounts[0].address = tools.LoginInfo.getCurrentAddress();
        mui.prompt("" + this.$t("setting.msg3"), "" + this.$t("setting.msg4"), "" + this.$t("setting.msg5"), ["" + this.$t("btn.cancel"), "" + this.$t("btn.confirm")], function (e) {
            if (e.index == 1) {
                ThinNeo.Helper.GetNep2FromPrivateKey(tools.LoginInfo.getCurrentLogin().prikey, e.value, wallet.scrypt.N, wallet.scrypt.r, wallet.scrypt.p, function (info, result) {
                    if (info == "finish") {
                        wallet.accounts[0].nep2key = result;
                        wallet.accounts[0].contract = new ThinNeo.contract();
                        wallet.accounts[0].contract.script = ThinNeo.Helper.GetAddressCheckScriptFromPublicKey(tools.LoginInfo.getCurrentLogin().pubkey).toHexString();
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

/***/ "VbKi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/bubble.vue
var bubble = __webpack_require__("VvEX");
var bubble_default = /*#__PURE__*/__webpack_require__.n(bubble);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-24d1ff03","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/bubble.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bubble-box"},[_vm._m(0,false,false),_vm._v(" "),_c('div',{staticClass:"bubble-msg disable"},[_vm._v("\n    "+_vm._s(_vm.$t('nns.msg1')))]),_vm._v(" "),_c('div',{staticClass:"help-icon"},[_c('img',{attrs:{"src":__webpack_require__("NmuQ"),"alt":""}}),_vm._v(" "),_c('div',{staticClass:"help-msg"},[_vm._v("\n      "+_vm._s(_vm.$t('nns.msg2'))+"\n      "),_c('div',{staticClass:"triangle-box"})])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bubble-png"},[_c('img',{attrs:{"src":__webpack_require__("JPeH"),"alt":""}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_bubble = (esExports);
// CONCATENATED MODULE: ./src/components/bubble.vue
function injectStyle (ssrContext) {
  __webpack_require__("mN2x")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-24d1ff03"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  bubble_default.a,
  components_bubble,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_bubble = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "VvEX":
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
/// <reference path="../tools/importpack.ts"/>
var Bubble = /** @class */ (function (_super) {
    __extends(Bubble, _super);
    function Bubble() {
        return _super.call(this) || this;
    }
    Bubble.prototype.mounted = function () { };
    Bubble.prototype.eventCut = function () {
        // if (!this.isdisable) {
        //   window.open(
        //     "../../static/event/index.html?walletAddress=" +
        //       LoginInfo.getCurrentAddress()
        //   );
        // }
    };
    __decorate([
        vue_property_decorator_1.Prop({ default: true }),
        __metadata("design:type", Boolean)
    ], Bubble.prototype, "isdisable", void 0);
    Bubble = __decorate([
        vue_property_decorator_1.Component({
            components: {}
        }),
        __metadata("design:paramtypes", [])
    ], Bubble);
    return Bubble;
}(vue_property_decorator_1.Vue));
exports.default = Bubble;


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
/// <reference path="../tools/importpack.ts"/>
var FeatureComponent = /** @class */ (function (_super) {
    __extends(FeatureComponent, _super);
    function FeatureComponent() {
        var _this = _super.call(this) || this;
        _this.balance = "";
        _this.nnsneo = "";
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
        this.nnsneo = this.$refs["nnsneo"]["isActive"]
            ? "icon-nnsneo-select"
            : "icon-nnsneo-unselect";
        this.nns = this.$refs["nns"]["isActive"]
            ? "icon-nns-select"
            : "icon-nns-unselect";
        this.setting = this.$refs["setting"]["isActive"]
            ? "icon-setting-select"
            : "icon-setting-unselect";
        this.getHeight();
        var arr = tools.StorageTool.getLoginArr();
        if (arr.length == 0) {
            window.location.hash = "#login";
        }
    };
    FeatureComponent.prototype.getHeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                tools.WWW.api_getHeight()
                    .then(function (res) {
                    _this.blockheight = res;
                });
                setTimeout(function () { _this.getHeight(); }, 30000);
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

/***/ "hZlE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/setting/settings.ts
var settings = __webpack_require__("STkM");
var settings_default = /*#__PURE__*/__webpack_require__.n(settings);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-66e4ad86","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/setting/settings.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('setting.settings')))])]),_vm._v(" "),_c('div',{staticClass:"panel panel-default settings"},[_c('div',[_c('div',{staticStyle:{"padding-top":"2.8%","padding-bottom":"0.9%","padding-left":"2.3%"}},[_c('span',[_vm._v(_vm._s(_vm.$t('setting.title1'))+" :  "),_c('span',{staticClass:"user-select-ok"},[_vm._v(_vm._s(_vm.address))])])]),_vm._v(" "),_c('div',{staticStyle:{"padding-top":"2.8%","padding-bottom":"0.9%","padding-left":"2.3%"}},[_c('span',[_vm._v(_vm._s(_vm.$t('setting.title2'))+" :   ")]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel",on:{"click":_vm.visibleWif}},[_vm._v(_vm._s(_vm.$t('setting.btn1')))]),_vm._v(" "),_c('span',{staticClass:"user-select-ok"},[_vm._v("  "+_vm._s(_vm.wif))])]),_vm._v(" "),_c('div',{staticStyle:{"padding-top":"2.8%","padding-bottom":"0.9%","padding-left":"2.3%"}},[_c('span',[_vm._v(_vm._s(_vm.$t('setting.title3'))+" :   ")]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel",on:{"click":_vm.download}},[_vm._v(_vm._s(_vm.$t('setting.btn2')))]),_vm._v("   \n                    "),(_vm.href!='')?_c('a',{attrs:{"download":_vm.walletname,"href":_vm.href}},[_vm._v(_vm._s(_vm.$t('setting.btn3')))]):_vm._e()]),_vm._v(" "),_c('div',{staticStyle:{"padding-top":"2.8%","padding-bottom":"0.9%","padding-left":"2.3%"}},[_c('p',[_vm._v(_vm._s(_vm.$t('setting.msg1'))+" "),_c('br'),_vm._v(" "+_vm._s(_vm.$t('setting.msg2'))+" \n                    ")])])])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var setting_settings = (esExports);
// CONCATENATED MODULE: ./src/pages/setting/settings.vue
function injectStyle (ssrContext) {
  __webpack_require__("l1Pm")
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
  setting_settings,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_setting_settings = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "jrmo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/bid/neoauction.ts
var neoauction = __webpack_require__("8KnJ");
var neoauction_default = /*#__PURE__*/__webpack_require__.n(neoauction);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-761cd417","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/bid/neoauction.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"box-warp"},[(!_vm.auctionPage)?_c('div',{staticClass:"page-one"},[_vm._m(0,false,false),_vm._v(" "),_c('div',{staticClass:"form-box ptop"},[_vm._m(1,false,false),_vm._v(" "),_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":function($event){_vm.auctionShow = !_vm.auctionShow}}},[_vm._v("Open Auction")]),_vm._v(" "),_c('spinner-wrap',{staticStyle:{"margin-left":"20px"}}),_vm._v(" "),_c('button',{staticClass:"btn btn-nel btn-big btn-disable",attrs:{"disabled":"disabled"}},[_vm._v("New Bid")]),_vm._v(" "),_c('span',{staticClass:"waiting-msg"},[_vm._v("We're sending a transacton,please wait patiently...")]),_vm._v(" "),_vm._m(2,false,false),_vm._v(" "),_vm._m(3,false,false)],1),_vm._v(" "),_vm._m(4,false,false),_vm._v(" "),_c('div',{staticClass:"form-box mbottom"},[_vm._m(5,false,false),_vm._v(" "),_c('div',{staticClass:"btn-right"},[_c('button',{staticClass:"btn btn-nel btn-bid",on:{"click":function($event){_vm.auctionPage = !_vm.auctionPage}}},[_vm._v("Bid")]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel btn-bid"},[_vm._v("Get domain")]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel btn-bid"},[_vm._v("Recover SGas")]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel btn-bid btn-disable",attrs:{"disabled":""}},[_vm._v("Getting domain...")]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel btn-bid btn-disable",attrs:{"disabled":""}},[_vm._v("Recoverring SGas...")])])])]):_vm._e(),_vm._v(" "),(_vm.auctionPage)?_c('auction-info',{on:{"onBack":_vm.onBack}}):_vm._e(),_vm._v(" "),(_vm.auctionShow)?_c('div',{staticClass:"auction-wrap"},[_c('div',{staticClass:"auction-box"},[_c('div',{staticClass:"auction-title"},[_vm._v("Auction")]),_vm._v(" "),_vm._m(6,false,false),_vm._v(" "),_vm._m(7,false,false),_vm._v(" "),_c('div',{staticClass:"tips-msg"},[_vm._v("\n          Tips : The minimum value for each increase is 0.1 SGas. When your cumulative bid is less than the  highest bid price, The raise will be unsuccessful.\n        ")]),_vm._v(" "),_vm._m(8,false,false),_vm._v(" "),_c('div',{staticClass:"auction-close"},[_c('span',{attrs:{"aria-hidden":"true"},on:{"click":function($event){_vm.auctionShow = !_vm.auctionShow}}},[_vm._v("×")])])])]):_vm._e()],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"title"},[_c('span',[_vm._v("Neo Name Auction")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"input-box"},[_c('input',{attrs:{"type":"text","placeholder":"type a name"}}),_vm._v(" "),_c('span',[_vm._v(".neo")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"msg-box"},[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}}),_vm._v(" "),_c('span',[_vm._v("bunnyrepublic is available.")]),_vm._v(" "),_c('span',[_vm._v("///bunnyrepublic is being auctioned.")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"msg-box status-ended"},[_c('span',[_vm._v("Please enter the domain according to the format.")]),_vm._v(" "),_c('span',[_vm._v("///This domain name has already been auctioned off by others.")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"title"},[_c('span',[_vm._v("My Auction")]),_vm._v(" "),_c('div',{staticClass:"seach-box"},[_c('input',{attrs:{"type":"search","name":"","id":"","placeholder":"Search by domain"}}),_vm._v(" "),_c('img',{attrs:{"src":__webpack_require__("zH9E"),"alt":""}})])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"msg-list"},[_c('div',{staticClass:"msg-neoname"},[_vm._v("\n                    BunnyRepublic.neo\n                ")]),_vm._v(" "),_c('div',{staticClass:"msg-status"},[_vm._v("\n                    Status : "),_c('span',{staticClass:"status-being"},[_vm._v("Fixed period")])]),_vm._v(" "),_c('div',{staticClass:"msg-status"},[_vm._v("\n                    Status : "),_c('span',{staticClass:"status-random"},[_vm._v("Random period")])]),_vm._v(" "),_c('div',{staticClass:"msg-status"},[_vm._v("\n                    Status : "),_c('span',{staticClass:"status-ended"},[_vm._v("Ended")])]),_vm._v(" "),_c('div',{staticClass:"msg-price"},[_vm._v("\n                    Last auction price : "),_c('span',[_vm._v("10 SGas")])]),_vm._v(" "),_c('div',{staticClass:"msg-bidder"},[_vm._v("\n                    Current bidder : "),_c('span',[_vm._v("Other people （ AYMa5TcgVfvPxBxzzfYswUHAvXLyaptquh ）")])]),_vm._v(" "),_c('div',{staticClass:"msg-bidder"},[_vm._v("\n                    Current bidder : "),_c('span',{staticClass:"bidder-me"},[_vm._v("Me （ AYMa5TcgVfvPxBxzzfYswUHAvXLyaptquh ）")])]),_vm._v(" "),_c('div',{staticClass:"msg-time"},[_vm._v("\n                    Bid start time : "),_c('span',[_vm._v("2018/05/24 16:00:00")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wrap-msg"},[_c('div',{staticClass:"domain-name"},[_vm._v("Domain : Bennyrepublic1234.test")]),_vm._v(" "),_c('div',{staticClass:"auction-status"},[_vm._v("Status : "),_c('span',{staticClass:"status-being"},[_vm._v("Fixed period （ 47:56:30 ）")])]),_vm._v(" "),_c('div',{staticClass:"auction-price"},[_vm._v("Highest bid price : 9 SGas")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wrap-msg"},[_c('div',{staticClass:"my-bid"},[_c('span',[_vm._v("Raise my bid : ")]),_vm._v(" "),_c('input',{staticClass:"bid-input",attrs:{"type":"text","placeholder":"Enter a raise"}})]),_vm._v(" "),_c('div',{staticClass:"my-bid"},[_vm._v("\n            Your cumulative bid : "),_c('span',{staticClass:"status-ended"},[_vm._v("0")]),_vm._v(" SGas\n          ")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"btn-bid-box"},[_c('button',{staticClass:"btn btn-nel btn-big btn-disable",attrs:{"disabled":"disabled"}},[_vm._v("Bid")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var bid_neoauction = (esExports);
// CONCATENATED MODULE: ./src/pages/bid/neoauction.vue
function injectStyle (ssrContext) {
  __webpack_require__("qk/j")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-761cd417"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  neoauction_default.a,
  bid_neoauction,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_bid_neoauction = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "l1Pm":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "l7Tq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/layouts/Main.vue
var Main = __webpack_require__("Gc41");
var Main_default = /*#__PURE__*/__webpack_require__.n(Main);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4768e130","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/layouts/Main.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[_c('nav',{staticClass:"navbar navbar-nel navbar-fixed-top"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"navbar-header"},[_c('button',{staticClass:"navbar-toggle collapsed",attrs:{"type":"button","data-toggle":"collapse","data-target":"#navbar","aria-expanded":"false","aria-controls":"navbar"}},[_c('span',{staticClass:"sr-only"},[_vm._v(_vm._s(_vm.$t('navbar.toggle')))]),_vm._v(" "),_c('span',{staticClass:"icon-bar"}),_vm._v(" "),_c('span',{staticClass:"icon-bar"}),_vm._v(" "),_c('span',{staticClass:"icon-bar"})])]),_vm._v(" "),_c('div',{staticClass:"navbar-collapse collapse",attrs:{"id":"navbar"}},[_c('div',{staticClass:"logo"}),_vm._v(" "),_c('ul',{staticClass:"nav navbar-nav navbar-left"},[_c('li',[_c('a',{attrs:{"href":"https://scan.nel.group/#mainnet","target":"_blank"}},[_vm._v(_vm._s(_vm.$t('navbar.explorer')))])]),_vm._v(" "),_c('li',[_c('a',{staticClass:"active-nel",attrs:{"href":"#wallet"}},[_vm._v(_vm._s(_vm.$t('navbar.wallet')))])])]),_vm._v(" "),_c('ul',{staticClass:"nav navbar-nav navbar-right"},[_c('li',{staticClass:"dropdown"},[_c('a',{staticClass:"dropdown-toggle",attrs:{"data-toggle":"dropdown","role":"button","aria-haspopup":"true","aria-expanded":"false"}},[_c('span',{staticClass:"text",attrs:{"id":"network"}},[_vm._v(_vm._s(_vm.$t('navbar.testnet')))]),_vm._v(" "),_c('span',{staticClass:" caret"})]),_vm._v(" "),_c('ul',{staticClass:"dropdown-menu dropdown-nel"},[_c('li',{staticClass:"active",attrs:{"id":"testnet-btn"}},[_c('a',{attrs:{"id":"testa"}},[_vm._v(_vm._s(_vm.$t('navbar.testnet')))])]),_vm._v(" "),_c('li',{attrs:{"id":"mainnet-btn"}},[_c('a',{attrs:{"target":"_blank","href":"https://wallet.nel.group/#login","id":"maina"}},[_vm._v(_vm._s(_vm.$t('navbar.mainnet')))])])])]),_vm._v(" "),(_vm.loginshow)?_c('li',[_c('v-link',{ref:"login",attrs:{"href":"#login"}},[_vm._v(_vm._s(_vm.$t('navbar.logout')))])],1):_vm._e()]),_vm._v(" "),_c('ul',{staticClass:"nav navbar-nav navbar-right"},[_c('li',{staticClass:"dropdown"},[_c('a',{staticClass:"dropdown-toggle",attrs:{"data-toggle":"dropdown","role":"button","aria-haspopup":"true","aria-expanded":"false"}},[_c('span',{staticClass:"text"},[_vm._v(_vm._s(_vm.currentLanguage))]),_vm._v(" "),_c('span',{staticClass:" caret"})]),_vm._v(" "),_c('ul',{staticClass:"dropdown-menu dropdown-nel"},[_c('li',{class:_vm.currentLanguage=='English'?'active':'',attrs:{"id":"testnet-btn"}},[_c('a',{on:{"click":function($event){_vm.cutLanguage(1)}}},[_vm._v("English")])]),_vm._v(" "),_c('li',{class:_vm.currentLanguage!='English'?'active':'',attrs:{"id":"mainnet-btn"}},[_c('a',{on:{"click":function($event){_vm.cutLanguage(2)}}},[_vm._v("中文")])])])])])])])]),_vm._v(" "),_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var layouts_Main = (esExports);
// CONCATENATED MODULE: ./src/layouts/Main.vue
function injectStyle (ssrContext) {
  __webpack_require__("Gdp8")
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

/***/ "mN2x":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "mcrB":
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
var vue_property_decorator_1 = __webpack_require__("EOM2");
var Valert_vue_1 = __webpack_require__("Gieu");
var Spinner_vue_1 = __webpack_require__("+jyM");
/// <reference path="../tools/importpack.ts"/>
var Auction = /** @class */ (function (_super) {
    __extends(Auction, _super);
    function Auction() {
        return _super.call(this) || this;
    }
    Auction.prototype.onBack = function () {
        console.log("dddd");
        this.$emit('onBack');
    };
    Auction = __decorate([
        vue_property_decorator_1.Component({
            components: {
                "v-alert": Valert_vue_1.default,
                "spinner-wrap": Spinner_vue_1.default
            }
        }),
        __metadata("design:paramtypes", [])
    ], Auction);
    return Auction;
}(vue_1.default));
exports.default = Auction;


/***/ }),

/***/ "pKg8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    language: {
        name: 'English'
    },
    navbar: {
        explorer: 'Explorer',
        wallet: 'Wallet',
        mainnet: 'MainNet',
        testnet: "TestNet",
        logout: "logout",
        blockheight: "Block Height",
        toggle: "Toggle navigation"
    },
    btn: {
        confirm: "Confirm",
        reset: "Reset",
        close: "Close",
        transfer: "Transfer",
        switch: "Switch",
        claim: "Claim",
        cancel: "Cancel"
    },
    toast: {
        msg1: "Landing ...",
        msg2: "Authentication passed...",
        msg3: "Login failed. Please check your password or file",
        msg4: "Please enter the correct string"
    },
    login: {
        login: "Login",
        title: "Login your wallet",
        selectplaceholder: "Select keystore file.",
        selectbtn: "Select",
        passwordholder: "Enter password.",
        loginbtn: "Login",
        cutlinemsg: "or you can",
        wifmsg: "Import key from WIF String",
        nep2msg: "Import key from Nep2 String"
    },
    wif: {
        title: "WIF Private Key",
        wifplaceholder: "Enter your private key.",
        back: "Back"
    },
    nep2: {
        title: "Nep2",
        placeholder: "Enter your Nep2.",
        password: "Enter password."
    },
    generate: {
        generate: "Generate",
        title: "Generate a new wallet",
        name: "Name your wallet",
        password: "Enter password",
        passwordagain: "Confirm password",
        nameempty: "Wallet name cannot be empty.",
        namepass: "Verification pass.",
        pwderrmsg1: "Please enter a password of at least eight characters",
        pwderrmsg2: "Use at least one character and one number",
        pwderrmsg3: "Please enter the same password as above.",
        createmsg: "Your keystore file has been created.",
        downloadmsg: "You can click the ‘download’ button to save your keystore file!",
        download: "Download",
        msg: "Do not lose it!",
        msg2: "It can’t be recovered if you lose it."
    },
    balance: {
        balance: "Balance",
        title1: "NEO Balance",
        title2: "Key Address",
        title3: "GAS available to claim",
        title4: "Asset",
        title5: "Choose address",
        title6: "Select Nep6 File",
        msg1: "Sending NEO to account address…",
        msg2: "Waiting for confirmation of transfer…",
        msg3: "Claiming GAS…",
        msg4: "Your GAS claim is successful!"
    },
    transfer: {
        transfer: "Transfer",
        title1: "Asset",
        title2: "Address",
        title3: "Amount",
        title4: "History",
        msg1: "Your address is incorrect.",
        send: "Send",
        from: "from",
        to: "to",
        details: "Details",
        placeholder: "Please enter an address or domain name",
        msg2: "Your transaction has been sent, please check it later",
        msg3: "Transaction failure",
        msg4: "-_-!!!You don't have enough change, you have to wait for the block height to change before you can make the next transaction.",
        msg5: "available"
    },
    nns: {
        nns: "NNS",
        title1: "Register Neo Name",
        placeholder1: "enter a name",
        register: "Register",
        title2: "My Neo Name",
        msg1: "The testing has ended. Thanks for your participation. ",
        msg2: 'You will be rewarded with 50 NNCs on Mainnet for the first time you map your wallet address to an ending in ".test"  name successfully.',
        msg3: "Register your domain name and collect the reward.",
        err1: "The domain name has been registered.",
        text1: "Address resolver",
        text2: "Address mapping",
        text3: "Expiration Time",
        text4: "Expiration",
        waiting: "Try to refresh the page after the NEO block height is updated.",
        edit: "Edit",
        alerttitle: "Edit information",
        alerttitle1: "Neo Name",
        alerttitle2: "Adrress Resolver",
        alerttitle3: "Adrress Mapping",
        alertmessage1: "It is the official address resolver , you have to confirm this address resolver first to map your address.",
        alertmessage2: "Please enter the correct format of the address.",
    },
    setting: {
        settings: "Settings",
        title1: "My Wallet Address",
        title2: "My WIF",
        title3: "My Wallet file",
        msg1: "This information is very important . It may cause your loss if you lose it . ",
        msg2: "Save your keystore file and make copies of your wallet address and your WIF . Don't lose them .",
        msg3: "Set the password ",
        msg4: "Enter your password",
        msg5: "Create a wallet",
        btn1: "Visible",
        btn2: "Create",
        btn3: "download"
    }
};


/***/ }),

/***/ "pp3u":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,DQo8c3ZnIHdpZHRoPSIxNXB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNSAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5ICg1MTAwMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+PC9kZWZzPg0KICAgIDxnIGlkPSLmtY/op4jlmag0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9ImJsb2Nrcy1oYW5nb3ZlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTY1OC4wMDAwMDAsIC0xMTY1LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPg0KICAgICAgICAgICAgPGcgaWQ9InN3dGljaCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTkwLjAwMDAwMCwgMTE1NC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTEuMDAwMDAwLCAwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUuMjc2MzkzMiwxMi4xNzEwMzk0IEwzMS42NTgzNTkyLDI0LjkzNDk3MTUgQzMxLjkwNTM0ODUsMjUuNDI4OTUgMzEuNzA1MTI0MSwyNi4wMjk2MjMgMzEuMjExMTQ1NiwyNi4yNzY2MTIzIEMzMS4wNzIyOTAyLDI2LjM0NjA0IDMwLjkxOTE3NzEsMjYuMzgyMTg1MSAzMC43NjM5MzIsMjYuMzgyMTg1MSBMMTgsMjYuMzgyMTg1MSBDMTcuNDQ3NzE1MywyNi4zODIxODUxIDE3LDI1LjkzNDQ2OTggMTcsMjUuMzgyMTg1MSBDMTcsMjUuMjI2OTQgMTcuMDM2MTQ1MSwyNS4wNzM4MjY5IDE3LjEwNTU3MjgsMjQuOTM0OTcxNSBMMjMuNDg3NTM4OCwxMi4xNzEwMzk0IEMyMy43MzQ1MjgxLDExLjY3NzA2MSAyNC4zMzUyMDExLDExLjQ3NjgzNjYgMjQuODI5MTc5NiwxMS43MjM4MjU5IEMyNS4wMjI3MDcsMTEuODIwNTg5NiAyNS4xNzk2Mjk1LDExLjk3NzUxMiAyNS4yNzYzOTMyLDEyLjE3MTAzOTQgWiIgaWQ9IlRyaWFuZ2xlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNC4zODIwNzYsIDE5LjAwMDExMCkgcm90YXRlKDkwLjAwMDAwMCkgdHJhbnNsYXRlKC0yNC4zODIwNzYsIC0xOS4wMDAxMTApICI+PC9wYXRoPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg=="

/***/ }),

/***/ "qk/j":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "r7o2":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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
/// <reference path="../tools/importpack.ts"/>
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

/***/ "tt5S":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,DQo8c3ZnIHdpZHRoPSIxNXB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNSAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5ICg1MTAwMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+PC9kZWZzPg0KICAgIDxnIGlkPSLmtY/op4jlmag0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9ImJsb2Nrcy1oYW5nb3ZlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTYwOC4wMDAwMDAsIC0xMTY1LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPg0KICAgICAgICAgICAgPGcgaWQ9InN3dGljaCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTkwLjAwMDAwMCwgMTE1NC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiPg0KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUuODk0NDI3MiwxMi43ODg4NTQ0IEwzMi4yNzYzOTMyLDI1LjU1Mjc4NjQgQzMyLjUyMzM4MjUsMjYuMDQ2NzY0OSAzMi4zMjMxNTgxLDI2LjY0NzQzNzkgMzEuODI5MTc5NiwyNi44OTQ0MjcyIEMzMS42OTAzMjQyLDI2Ljk2Mzg1NDkgMzEuNTM3MjExMSwyNyAzMS4zODE5NjYsMjcgTDE4LjYxODAzNCwyNyBDMTguMDY1NzQ5MiwyNyAxNy42MTgwMzQsMjYuNTUyMjg0NyAxNy42MTgwMzQsMjYgQzE3LjYxODAzNCwyNS44NDQ3NTQ5IDE3LjY1NDE3OTEsMjUuNjkxNjQxOCAxNy43MjM2MDY4LDI1LjU1Mjc4NjQgTDI0LjEwNTU3MjgsMTIuNzg4ODU0NCBDMjQuMzUyNTYyMSwxMi4yOTQ4NzU5IDI0Ljk1MzIzNTEsMTIuMDk0NjUxNSAyNS40NDcyMTM2LDEyLjM0MTY0MDggQzI1LjY0MDc0MSwxMi40Mzg0MDQ1IDI1Ljc5NzY2MzUsMTIuNTk1MzI3IDI1Ljg5NDQyNzIsMTIuNzg4ODU0NCBaIiBpZD0iVHJpYW5nbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1LjAwMDAwMCwgMTkuMDAwMDAwKSBzY2FsZSgtMSwgMSkgcm90YXRlKDkwLjAwMDAwMCkgdHJhbnNsYXRlKC0yNS4wMDAwMDAsIC0xOS4wMDAwMDApICI+PC9wYXRoPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg=="

/***/ }),

/***/ "uRES":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "um8m":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "v8qo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/balance/balance.ts
var balance = __webpack_require__("5smL");
var balance_default = /*#__PURE__*/__webpack_require__.n(balance);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-65556828","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/balance/balance.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container"},[_c('div',{staticClass:"title",staticStyle:{"padding-bottom":"28px"}},[_c('span',[_vm._v(_vm._s(_vm.$t('balance.title1')))]),_vm._v(" "),_c('div',{staticStyle:{"float":"right"}},[_c('span',{staticClass:"user-select-ok",staticStyle:{"margin-right":"11px","color":"#fff"}},[_vm._v(_vm._s(_vm.$t('balance.title2'))+" ："+_vm._s(_vm.currentAddress))]),_vm._v(" "),(_vm.chooseAddressarr &&_vm.chooseAddressarr.length>1)?_c('button',{staticClass:"btn",attrs:{"data-toggle":"modal","data-target":"#selectAddr"}},[_vm._v(_vm._s(_vm.$t('btn.switch')))]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"neobalance",staticStyle:{"background":"#454F60","border-radius":"5px"}},[_c('div',[_c('div',{staticStyle:{"padding":"30px","padding-bottom":"40px"}},[_c('span',{staticClass:"balance-type"},[_vm._v("NEO ")]),_vm._v(" "),_c('span',{staticClass:"balance-amount"},[_vm._v(_vm._s(_vm.neoasset.neo))])]),_vm._v(" "),_c('div',{staticStyle:{"padding-left":"30px","padding-bottom":"30px"}},[_c('span',{staticClass:"balance-type"},[_vm._v("GAS ")]),_vm._v(" "),_c('span',{staticClass:"balance-amount"},[_vm._v(_vm._s(_vm.neoasset.gas))])]),_vm._v(" "),_c('div',{staticClass:"claim",staticStyle:{"padding":"30px","padding-left":"2.3%"}},[_c('span',{staticStyle:{"margin-right":"17px"}},[_vm._v(_vm._s(_vm.$t('balance.title3'))+" : "+_vm._s(_vm.neoasset.claim))]),_vm._v(" "),(_vm.neoasset.claim!='0'&&_vm.claimbtn)?_c('button',{staticClass:"btn btn-nel",on:{"click":_vm.toClaimGas}},[_vm._v(_vm._s(_vm.$t('btn.claim')))]):_vm._e(),_vm._v(" "),(!_vm.claimbtn)?_c('span',[_c('spinner-wrap',{attrs:{"isbig":false}})],1):_vm._e(),_vm._v(" "),_c('span',{staticClass:"loadmsg"},[_vm._v(" "+_vm._s(_vm.loadmsg))])])])]),_vm._v(" "),(_vm.balances.length)?_c('div',{staticClass:"balance-asset"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('balance.title4')))])]),_vm._v(" "),_vm._l((_vm.balances),function(balance){return _c('div',{key:balance.asset,staticClass:"assetrow"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-sm-2 info"},[_c('span',[_vm._v(_vm._s(balance.names))])]),_vm._v(" "),_c('div',{staticClass:"col-sm-8 info"},[_c('span',[_vm._v(" "+_vm._s(balance.balance))])]),_vm._v(" "),_c('div',{staticClass:"col-sm-2 transfer-btn"},[_c('span',{staticClass:"btn btn-transfer",on:{"click":function($event){_vm.toTransfer(balance.asset)}}},[_vm._v(_vm._s(_vm.$t('btn.transfer')))])])])])})],2):_vm._e(),_vm._v(" "),_c('div',{staticStyle:{"height":"30px"}})]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"selectAddr","tabindex":"-1"}},[_c('div',{staticClass:"modal-dialog",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"modal-header"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]),_vm._v(" "),_c('h4',{staticClass:"modal-title",attrs:{"id":"exampleModalLabel"}},[_vm._v(_vm._s(_vm.$t('balance.title5')))])]),_vm._v(" "),_c('div',{staticClass:"modal-body"},[_c('form',[_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"exampleInputFile"}},[_vm._v(_vm._s(_vm.$t('balance.title6'))+":")]),_vm._v(" "),_c('div',{staticClass:"radio",attrs:{"id":"selectAddress"}},_vm._l((_vm.chooseAddressarr),function(item){return _c('label',{key:item.address},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.chooseAddress),expression:"chooseAddress"}],attrs:{"type":"radio"},domProps:{"value":item.address,"checked":_vm._q(_vm.chooseAddress,item.address)},on:{"change":function($event){_vm.chooseAddress=item.address}}}),_vm._v(_vm._s(item.address)+"\n                ")])}))])])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-default",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v(_vm._s(_vm.$t('btn.close')))]),_vm._v(" "),_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button","data-dismiss":"modal"},on:{"click":function($event){_vm.addressSwitch()}}},[_vm._v(_vm._s(_vm.$t('btn.confirm')))])])])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var balance_balance = (esExports);
// CONCATENATED MODULE: ./src/pages/balance/balance.vue
function injectStyle (ssrContext) {
  __webpack_require__("B+db")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-65556828"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  balance_default.a,
  balance_balance,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_balance_balance = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "vQak":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "wOXa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    language: {
        name: '中文'
    },
    navbar: {
        explorer: '浏览器',
        wallet: '钱包',
        mainnet: '主网',
        testnet: "测试网",
        logout: "退出",
        blockheight: "高度",
        toggle: "切换导航"
    },
    btn: {
        confirm: "提交",
        reset: "重置",
        close: "关闭",
        transfer: "转账",
        switch: "切换",
        claim: "提取",
        cancel: "取消",
    },
    toast: {
        msg1: "登陆中...",
        msg2: "登陆成功...",
        msg3: "登陆失败，请重新尝试",
        msg4: "请输入正确的字符串"
    },
    login: {
        login: "登陆",
        title: "登陆你的钱包",
        selectplaceholder: "选择密钥存储库文件",
        selectbtn: "选择",
        passwordholder: "输入密码",
        loginbtn: "登陆",
        cutlinemsg: "或者",
        wifmsg: "从WIF字符串导入密钥",
        nep2msg: "从nep2字符串导入密钥"
    },
    wif: {
        title: "WIF 密钥",
        wifplaceholder: "输入您的密钥",
        back: "返回"
    },
    nep2: {
        title: "Nep2",
        placeholder: "输入您的Nep2",
        password: "输入密码"
    },
    generate: {
        generate: "新建",
        title: "创建一个新的钱包",
        name: "您的钱包名",
        password: "输入密码",
        passwordagain: "重复密码",
        nameempty: "钱包名不能为空",
        namepass: "验证通过",
        pwderrmsg1: "请输入至少8个字符的密码",
        pwderrmsg2: "至少使用一个字符和一个数字",
        pwderrmsg3: "请输入与上面相同的密码",
        createmsg: "您的密钥库文件已经创建。",
        downloadmsg: "你可以点击“下载”按钮来保存你的密钥库文件！",
        download: "下载",
        msg: "不要丢失它!",
        msg2: "如果你失去了它，它是无法恢复的。"
    },
    balance: {
        balance: "资产",
        title1: "NEO 资产余额",
        title2: "当前地址",
        title3: "可提取的GAS",
        title4: "资产",
        title5: "选择地址",
        title6: "选择 NEP6 钱包文件",
        msg1: "向自己的地址进行转账…",
        msg2: "等待交易确认…",
        msg3: "提取 GAS 中…",
        msg4: "Gas提取成功!"
    },
    transfer: {
        transfer: "转账",
        title1: "资产",
        title2: "地址",
        title3: "余额",
        title4: "历史记录",
        msg1: "您的地址不正确",
        send: "发送",
        from: "来自",
        to: "发往",
        details: "详情",
        placeholder: "请输入地址或域名",
        msg2: "您的交易已发送，请稍后查验",
        msg3: "交易失败",
        msg4: "您没有足够的utxo进行交易，请等待高度变化后再尝试下笔交易",
        msg5: "可用"
    },
    nns: {
        nns: "NNS",
        title1: "注册NEO域名",
        placeholder1: "输入名称",
        register: "注册",
        title2: "我的NEO域名",
        msg1: "活动已结束，谢谢大家的参与。",
        msg2: '我们将会在NNS在主网上线后的一个月内给予你主网钱包50NNC的奖励！',
        msg3: "注册你的域名并收集奖励。",
        err1: "当前域名已经被注册。",
        text1: "地址解析器",
        text2: "地址映射",
        text3: "域名到期时间",
        text4: "已到期",
        waiting: "等待NEO区块高度更新后，尝试刷新页面",
        edit: "编辑",
        alerttitle: "编辑信息",
        alerttitle1: "注册Neo域名",
        alerttitle2: "地址解析器",
        alerttitle3: "地址映射",
        alertmessage1: "这是官方地址解析器，你必须先确认此地址解析器才能映射你的地址。",
        alertmessage2: "请输入正确格式的地址",
    },
    setting: {
        settings: "设置",
        title1: "我的钱包地址",
        title2: "我的私钥",
        title3: "我的钱包文件",
        msg1: "这些信息非常重要。如果你失去了它，它可能会导致你的损失。",
        msg2: "保存您的密钥库文件并复制您的钱包地址和您的WIF。不要失去他们。",
        msg3: "设置密码 ",
        msg4: "输入你的密码",
        msg5: "创建钱包",
        btn1: "查看",
        btn2: "创建",
        btn3: "下载"
    }
};


/***/ }),

/***/ "wtuE":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,DQo8c3ZnIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5ICg1MTAwMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+PC9kZWZzPg0KICAgIDxnIGlkPSJiYWxhbmNlNC10ZXN0bmV0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9IummlumhtS10cmFuc2Zlci1pbnB1dCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTkyMi4wMDAwMDAsIC0zNzguMDAwMDAwKSI+DQogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAwLjAwMDAwMCwgMjI2LjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgIDxnIGlkPSLmiZPli74iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgyMi4wMDAwMDAsIDE1Mi4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTI0LDEyLjE0ODE0ODEgQzI0LDUuMzcyNDQ0NDQgMTguNjI3NTU1NiwwIDExLjg1MTg1MTksMCBDNS4zNzI0NDQ0NCwwIDAsNS4zNzI0NDQ0NCAwLDEyLjE0ODE0ODEgQzAsMTguNjI3NTU1NiA1LjM3MjQ0NDQ0LDI0IDExLjg1MTg1MTksMjQgQzE4LjYyNzU1NTYsMjQgMjQsMTguNjI3NTU1NiAyNCwxMi4xNDgxNDgxIFoiIGlkPSJGaWxsLSIgZmlsbD0iIzJEREU0RiI+PC9wYXRoPg0KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNi4yNDQ5NTE3MywxMi44NDYzNTA0IEM1Ljg1NjI5Mzc1LDEyLjQ0NjI2NzIgNS44MDk5NDA0OCwxMS43NTgyNjA2IDYuMTMyMDI0OTksMTEuMzIyMzU4MiBMNS42NTA2MzE3NSwxMS45NzM4NjU3IEM1Ljk3NjkyMjAyLDExLjUzMjI3MTMgNi41OTc0OTM2MiwxMS40NDU3MjQzIDcuMDQxMjU0NzcsMTEuNzg0MDE2NiBMOC44OTAxMDY5NywxMy4xOTM0NTE2IEM5LjMzMTgzNjU5LDEzLjUzMDE5NTIgMTAuMDM3NTcyNSwxMy41MTUxMTkgMTAuNDY1NjkwNiwxMy4xNjAzNzU5IEwxNy4wMDQ3NzQ2LDcuNzQyMDIzMTIgQzE3LjQzMzIxNTgsNy4zODcwMTIzMiAxOC4wOTc4NjA3LDcuNDEwOTI2MjQgMTguNDgwNzQ0NCw3Ljc4NzAzMTc1IEwxNy43ODA1MzYsNy4wOTkyMTkxOSBDMTguMTY3MjUwNCw3LjQ3OTA4NzU4IDE4LjE2Nzg2NTQsOC4wOTMyOTg5OSAxNy43NjEzMzQsOC40OTEyMzk2OSBMMTAuNDA5MDgxOSwxNS42ODgxMjUzIEMxMC4wMTE3NjI1LDE2LjA3NzA0ODYgOS4zNzc4NjM2OSwxNi4wNzEzNTk0IDguOTg1OTQzOTUsMTUuNjY3OTE4NSBMNi4yNDQ5NTE3MywxMi44NDYzNTA0IFoiIGlkPSJGaWxsLSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg=="

/***/ }),

/***/ "x35b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __webpack_require__("/5sW");
var vue_i18n_1 = __webpack_require__("TXmL");
var cn_1 = __webpack_require__("wOXa");
var en_1 = __webpack_require__("pKg8");
var login_vue_1 = __webpack_require__("Luci");
var balance_vue_1 = __webpack_require__("v8qo");
var transfer_vue_1 = __webpack_require__("Oz3I");
var nnsneo_vue_1 = __webpack_require__("C0Cu");
var nns_vue_1 = __webpack_require__("RN/i");
var settings_vue_1 = __webpack_require__("hZlE");
vue_1.default.use(vue_i18n_1.default);
vue_1.default.config.productionTip = false;
var notFound = vue_1.default.component('notFound', function (resolve) { return __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("c5Mg")]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe); });
var language = sessionStorage.getItem("language");
!!language ? language : language = 'en';
/*---------使用语言包-----------*/
var i18n = new vue_i18n_1.default({
    locale: language,
    messages: {
        'cn': cn_1.default,
        'en': en_1.default // 英文语言包
    },
});
// i18n.locale = language;
// app.$i18n.locale = language;
var app = new vue_1.default({
    el: '#app',
    i18n: i18n,
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
                case "#nnsneo":
                    return nnsneo_vue_1.default;
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


/***/ }),

/***/ "zH9E":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABKpJREFUaAXtmUmPTUEYhl1TG9ocaUMMbSZEiCHYIGIMC3/AGBuWgj+ABRvzhlhgIXojIoJEEDFFLEydRjohtI4miG4z7Xk79151v3vO7TMSSX/Jk1Pj+1XVOVW3qm67dm3WNgKxRiATqzaVm5ub2/MYCZNgPAyGXiDtRqiHx3AfajKZzBee/95o+AjYAtehEVqzbxS4D7th6j/rAc6HwR54C1HtCxVPwbS/2hEcroc6SMqaENoB3aJ2JNAcwEE5DvbCmlYcNZD/Ct7DL+gBA6ECOoCfXSFjLfOj1q9A5HQa3xfOg59Vk7ET5kIFdMo5I9wB+sB02Aw3wM8ek6GFIDlDsBwu+HiUw7WgUQ5klO0IS+AaeFktiaMDibVWCKEMHAUvO0xi/9Y0/PKpWwbbQJPZ2m0StAzHM0TWWWXiP2FLPOU/tdFaAe/A2qE/pSKEUBsC9VaVeGKNzzULTX1SWo1c+0FkQa5M6CeV97pq2fCR0EIBK6C/0cOf5kl+QQgo1bI1GE5F+1qfkNYvsEjIgmi3hzNgbWlIqZYObLUqxFeHFgpZAR9T4LPxXRVKhspat28akRri3UMJRSyMnyrjW9uVQaXktJN0rZKI/TGp4heyyS2UYvi40e5LfKZJK4jaDkwm192XNBM/X1Aj3ch15LUdcS1UB7Sfd+0NkWo3IeWwGl9jfNg2FWTbN6DDiGt1RN65CWmG+VT1xu2GbgDzwHfTaTvQ0zTwA6I/TFraUb1117SAdHYT3LDtgI1rS/y3zfr0HX01zDZYZ1jXtBu1Zdz8NMK9jehn4t9NWj5qG6cDuGs6jNjPys1PIzzMiL7hM7ZvJV/EdsCuABWUHJEvnXKAt63BGmfc6EbD12wH7lHSfV0dic/zrZ18hm4r7Ep4J7AbRqALPATXtLVQR1I3/BxyHRPWNntUKMdU2GVEdIhZHEokQmF8DAV7VXOJNPuVlFanwmT4Cq7pMO67FpdWDJaL/n7XYTa8KlhtU4rKdlcovW2mWGJRtBeBHTTtggNfGBQ0horam38C13QAX15QMIEImmPhuesoG442+rk2IbLdQ1QntfCnpJyoeaI1Dh55+DlHWryFA4HucNVDXCvDJij5E2/aWhSlvg7zz8DaSxKS+e1BqBJ0Hvay0ySGvpyljs7c+0C31dY+krCgqLdxEhCcCE+tp2xc80K3zCthgJ8f8nrDPDgIr8HL1PiV0uDZFdTRMj/NXHqgzwAhXfcdg1Kno9xhRPt5bYm1f9HGbDiMgaHgZy/I0OXuRXzNIXwAKkHbiE2k3+IZzxDWKB4AXTolaWcRa/m15al598CI1xOfHa/1Tm3EFsJl4yRKVKvPashfuxPWnLNXKyS13BIm2gndMi+Dk9AAQU3fubYHanjRjxRp+vbvgpe9IrGoE4HmgPMCioKIavc4I4sO4JrM5SBtHUY0N56AdpU3+Z71Xfsaeppnp0FbeWs6r8xHo9pmJBqnEWVZwm3Esq2g7izQt+9l+9zGRnLgCniFGaGvWXxPUl71cmnUvUFYS6o9IaqIDvn/hzH8s8H9U1H7s7lu62PPAVcsjTANnoDuBtDIn+DtXObZZm0jkNQI/AaeFfcaT01x6QAAAABJRU5ErkJggg=="

/***/ })

},["x35b"]);