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
var entity_1 = __webpack_require__("6nHw");
var importpack_1 = __webpack_require__("VKSY");
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
                    case 0: return [4 /*yield*/, importpack_1.tools.nnstool.initRootDomain("test")];
                    case 1:
                        _a.sent();
                        importpack_1.tools.nnstool.initStatus();
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
                        return [4 /*yield*/, importpack_1.tools.nnstool.queryDomainInfo(this.nnsstr + ".test")];
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
        var res = importpack_1.tools.neotool.verifyAddress(this.alert_addr);
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
                        return [4 /*yield*/, importpack_1.tools.nnstool.registerDomain(this.nnsstr)];
                    case 2:
                        res = _a.sent();
                        if (res.err) {
                            console.error(res.info);
                        }
                        else {
                            state = new entity_1.DomainStatus();
                            state.await_register = true;
                            state.domainname = this.nnsstr + ".test";
                            entity_1.DomainStatus.setStatus(state);
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
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.getnnsinfo(entity_1.LoginInfo.getCurrentAddress())];
                    case 1:
                        res = _c.sent();
                        console.log(res);
                        arrdomain = res ? res.map(function (dom) { return dom["domain"]; }) : [];
                        arr = new Array();
                        state = entity_1.DomainStatus.getStatus();
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
                        a = state[domain] ? state[domain] : new entity_1.DomainStatus();
                        return [4 /*yield*/, this.queryDomainInfo(domain)];
                    case 3:
                        msg = _c.sent();
                        if (a.await_resolver) {
                            //与缓存进行对比
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
            var dommsg, msg, timestamp, copare, resolver_str, addr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dommsg = new entity_1.Domainmsg();
                        dommsg.domainname = domain;
                        return [4 /*yield*/, importpack_1.tools.nnstool.queryDomainInfo(domain)];
                    case 1:
                        msg = _a.sent();
                        if (!(msg.ttl && msg.ttl != '0')) return [3 /*break*/, 5];
                        this.receive_disable = false;
                        timestamp = new Date().getTime();
                        copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(msg.ttl).multiply(1000));
                        copare < 0 ? dommsg.isExpiration = false : dommsg.isExpiration = true;
                        dommsg.time = importpack_1.tools.timetool.getTime(parseInt(msg.ttl));
                        dommsg.await_resolver = false;
                        if (!msg["resolver"]) return [3 /*break*/, 3];
                        resolver_str = msg["resolver"].toString();
                        return [4 /*yield*/, importpack_1.tools.nnstool.resolveData(domain)];
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
            var contract, res, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.alert_resolve = false;
                        this.alert_resolver_state = 1;
                        contract = this.alert_contract.hexToBytes().reverse();
                        return [4 /*yield*/, importpack_1.tools.nnstool.setResolve(this.alert_domain, contract)];
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
            var res, state;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.verifyMappingAddress()) return [3 /*break*/, 2];
                        return [4 /*yield*/, importpack_1.tools.nnstool.setResolveData(this.alert_domain, this.alert_addr, this.alert_domainmsg.resolver)];
                    case 1:
                        res = _a.sent();
                        this.alert_config_state = 1;
                        state = new entity_1.DomainStatus();
                        state.await_mapping = true;
                        state.domainname = this.alert_domain;
                        state.mapping = this.alert_addr;
                        entity_1.DomainStatus.setStatus(state);
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
                        str = importpack_1.tools.storagetool.getStorage("current-height");
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
                    case 1:
                        currentheight = _a.sent();
                        oldheight = currentheight;
                        str ? oldheight = parseInt(str) : importpack_1.tools.storagetool.setStorage("current-height", currentheight + "");
                        if (oldheight < currentheight) {
                            this.getDomainsByAddr();
                            oldheight++;
                            importpack_1.tools.storagetool.setStorage("current-height", oldheight + "");
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
                "wallet-layout": wallet_vue_1.default
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

/***/ "06vt":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "0rEL":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAmCAYAAAC29NkdAAAAAXNSR0IArs4c6QAABNNJREFUWAnFWG9sU1UU/93Xt27t2GbBOLZ1k0lcTBQMYMQMEsIXpgEXNSEKivrFEE0MyIaJiQrEr1SHJP6JHxYcIiqJCaKbfBiQKJHwASPxT2ZMtzEYGGO7Ddau7XvXc/q2t1deS99rS73J6zs995zf+d1/5953BQoswZ5/l2saNgqIFQSxmJ4GCclvkO4qvcbpuUq6Cx4Pvh3bufAXrnNbhBuHptBkm5T6Dgj9cSnR7MZXCFyCVL4RQjlwuat2yKmvI4JL3ossSejYI4FtkNLjFDyrnRAaBe3zKtg3/FpgOKuNRalYZJu4V0qlMRTZS+SGpJQvFk2OI1ADGYsxGZtj2AJbFDl7sOWDaCA5rX9Gto9Z7G+H2F/hV54dfeWOSDbwrAR5rulSG6DmtmZzKr1OhBXheTTb3LR179IPp+4qLzlurmzlmBz75sZnEAy+K32xG8nj5es5Kx3ZyrGZg1WbQVDTox/TSl1tNSinzLGZgzWmOQcbQ5PtUqZ+tFY6latUoL1ZRUudByyPRHX88Y+GML0LKUKoa6501Z5lX4LjlS9FYyjaw7KbUl0B7F7jw9ZllVjgNdtqQnz3ZwLvnIlhZMIdUSm1HuK0Wggh06iN+ye2SGhHTGQHQtsiBYefqkGwNmOW2DxHJzRs6JvC5AwNoIsi4Nl6pbvucwNdaC+48E2bvrHWZ5I7MZTAk0encO/7Eaz4KIrukzdMQjzsu9ur3MLThm5wEpyQUzF5jbqUBsx58dKGF9rgx5mRFI79lrA5bnnAi1BHdVp/8VoKHYenbDa3UtDwJlWfqFe1uOx0S46BExrwav90zhhnL6XMuqUL3W/fzEmLo1OROtabSCUU7gnMz81whFpTQGFuCh3eggX43tKFV/db6/ymTe/PM6bsSiBu1EzZ5Mopj3FtpcAXm2tw353GsH79ewJHLtrnaB6Y2WrZpNLBs2QE64jcl5sXYFl9Or3iq19nsOv73PM0H0nmNj9R8lnnqVcoo/Y+UW2S670Qx46BaWju0p8tikJH8cs2bQGKp+/34pGgkalODyfx5mCsAJRMF+ZGPShKQnBjm9dEP/BTHEV23CyWIIISYyZyEYLf6Lw0QjhaWFqxhSduqlBwivKN663uZrBnjl0Hz0Mu8fkcbSgK/GVuqqdKHJcxJAvZTaxxeWcpZeGtjrkpxseKHCwG3EdZZc86Hwaeq8EhWsnL691vbfb4cpC5GQlLeg4BWofdyJnmdToTbn9o9sRSD6xsUPHwJxOIFTPUaU5AOg/S19RRWs3nndGxWz24OLPHFvkVNNcVk2LFeYPTLMH0yVV4dtpDO9P8MJrZVWOTOsIRd6doayRBXJgT62bXnVHdsD/yKe3N26zGTmSVOuullZVY21KB8es6Dp6Luz7mz8cRfePdgefn/mcQ5E8+XY+cIur/y5cdkTmnKIH1Y7uEuQ1lTBSu8FVXdFLHhudaUL63CHNsKzmOnUGQFX+9XPM3X0OUl6Rx9cGxmYO12AhyJd+RVPjFKhL7rca3SabLI7Eq270Mx8tKkCs4SW7vCmyi1bSPniTrSlkYk7E5Rq6bLY6XsUhyEbj7YLQ1mZBv0+Ip+wWmI4JzxNNXwEhxvtxEp93mOb2Td/oKGDghoPbkGs5sOK4IWgHKdYn+H1JhunGYOW88AAAAAElFTkSuQmCC"

/***/ }),

/***/ "1Mcy":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "2v9N":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/Selected.vue
var Selected = __webpack_require__("TaBq");
var Selected_default = /*#__PURE__*/__webpack_require__.n(Selected);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-cd4756de","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Selected.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"asset-select-box"},[_c('div',{staticClass:"btn dropdown-toggle select-nel",attrs:{"type":"button","id":"assets","data-toggle":"dropdown"}},[_c('div',{staticClass:"select-title"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_vm._m(0,false,false)]),_vm._v(" "),_c('ul',{staticClass:"dropdown-menu dropdown-nel",attrs:{"role":"menu","aria-labelledby":"assets"}},_vm._l((_vm.list),function(val,key){return _c('li',{key:key,class:_vm.selection==key?'active':'',attrs:{"role":"presentation"},on:{"click":function($event){_vm.switchVal(key)}}},[_c('a',{attrs:{"role":"menuitem","tabindex":"-1"}},[_vm._v(_vm._s(val))])])}))])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"select-caret"},[_c('span',{staticClass:"caret"})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_Selected = (esExports);
// CONCATENATED MODULE: ./src/components/Selected.vue
function injectStyle (ssrContext) {
  __webpack_require__("UOl0")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-cd4756de"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  Selected_default.a,
  components_Selected,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_Selected = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "3YjA":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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
    DateTool.getTime = function (date) {
        date = date.toString().length == 10 ? date * 1000 : date;
        var time = new Date(date);
        var language = sessionStorage.getItem("language");
        if (!language || language == 'en') {
            return new Date(time).toUTCString();
        }
        else {
            return this.dateFtt("yyyy/MM/dd hh:mm:ss", new Date(time));
        }
    };
    return DateTool;
}());
exports.default = DateTool;


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
            var str, result, json, r, time;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "getblocktime", index);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"];
                        time = parseInt(r[0]["time"]);
                        return [2 /*return*/, time];
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
    /**判断是否可以获取gas */
    WWW.api_hasclaimgas = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("hasclaimgas", address);
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
    /**
     * 获取gas
     */
    WWW.api_claimgas = function (address, num) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("claimgas", address, num);
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
    /**
     * @method 获得nep5资产信息
     * @param asset 资产id
     */
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
    /**
     * 跟地址获取nep资产id对应的余额
     * @param asset 资产id
     * @param address 地址
     */
    WWW.getnep5balanceofaddress = function (asset, address) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("getnep5balanceofaddress", asset, address);
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
                        if (json["result"]) {
                            r = json["result"][0];
                            return [2 /*return*/, r];
                        }
                        else {
                            throw json['error'];
                        }
                        return [2 /*return*/];
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
    //获取nep5的交易详情
    WWW.getnep5transferbytxid = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var str, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "getnep5transferbytxid", txid);
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
    //获取地址下所有的域名
    WWW.getnnsinfo = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody.apply(WWW, ["getdomainbyaddress"].concat(params));
                        return [4 /*yield*/, fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
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
    /**
     * 发送合约调用
     * @param scriptaddr 合约参数脚本
     */
    WWW.api_getcontractstate = function (scriptaddr) {
        return __awaiter(this, void 0, void 0, function () {
            var str, value, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        str = WWW.makeRpcUrl(WWW.api, "getcontractstate", scriptaddr);
                        return [4 /*yield*/, fetch(str, { "method": "get" })];
                    case 1:
                        value = _a.sent();
                        return [4 /*yield*/, value.json()];
                    case 2:
                        json = _a.sent();
                        r = json["result"][0];
                        return [2 /*return*/, r];
                }
            });
        });
    };
    /**
     * 根据地址查询参与竞拍的域名列表
     * @param address 要查询的地址
     */
    WWW.api_getBidListByAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("getbidlistbyaddress", address);
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
    /**
     * 获得时间轴的域名详情
     * @param domain 域名
     * @param currentpage 当前页码
     * @param pagesize 条数
     */
    WWW.api_getBidDetail = function (id, currentpage, pagesize) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("getbiddetailbydomain", id, currentpage, pagesize);
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
    /**
     * 获得bonus 历史记录
     * @param address 地址
     * @param currentpage 当前页码
     * @param pagesize 条数
     */
    WWW.api_getbonushistbyaddress = function (address, currentpage, pagesize) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("getbonushistbyaddress", address, currentpage, pagesize);
                        return [4 /*yield*/, fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
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
    /**
     * 两笔交易提交给服务器发送
     * @param data1 第一笔交易数据
     * @param data2 第二笔交易数据
     */
    WWW.rechargeandtransfer = function (data1, data2) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("rechargeandtransfer", data1.toHexString(), data2.toHexString());
                        return [4 /*yield*/, fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
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
    /**
     * 查询合约调用状态
     * @param txid 交易id
     */
    WWW.getrechargeandtransfer = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("getrechargeandtransfer", txid);
                        return [4 /*yield*/, fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
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
    /**
     * 我的域名的状态
     * @param address 地址
     * @param domain 域名
     */
    WWW.getDomainState = function (address, id) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("getdomainstate", address, id);
                        return [4 /*yield*/, fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, result.json()];
                    case 2:
                        json = _a.sent();
                        if (json["result"]) {
                            r = json["result"][0];
                            return [2 /*return*/, r];
                        }
                        else {
                            throw "not data";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WWW.getNotify = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("getnotify", txid);
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
    WWW.hastx = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("hastx", txid);
                        return [4 /*yield*/, fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
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
    WWW.hascontract = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var postdata, result, json, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postdata = WWW.makeRpcPostBody("hascontract", txid);
                        return [4 /*yield*/, fetch(WWW.apiaggr, { "method": "post", "body": JSON.stringify(postdata) })];
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
    WWW.api = "https://api.nel.group/api/testnet";
    WWW.apiaggr = "https://apiwallet.nel.group/api/testnet";
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
var importpack_1 = __webpack_require__("VKSY");
var entity_1 = __webpack_require__("6nHw");
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
    StorageTool.storageArrayPush = function (key, value) {
        var arr = sessionStorage.getItem(key);
        arr ? arr : arr = "[]";
        var obj = JSON.parse(arr);
        obj.push(value);
        sessionStorage.setItem(key, JSON.stringify(obj));
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
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
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
                    case 0: return [4 /*yield*/, importpack_1.tools.coinTool.getassets()];
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
/**
 * @class localStorage工具类
 */
var LocalStoreTool = /** @class */ (function () {
    //初始化对象
    function LocalStoreTool(table) {
        this.table = table;
    }
    /**
     * 添加数据
     * @param key
     * @param value param[0]:value,param[1]:key
     */
    LocalStoreTool.prototype.put = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var value = param[0]; //第零位是value
        var item = this.getList();
        var obj = item ? item : {};
        if (param.length == 1) {
            obj[key] = value;
        }
        else {
            var index = param[1];
            if (obj[key]) {
                obj[key][index] = value;
            }
            else {
                obj[key] = {};
                obj[key][index] = value;
            }
        }
        localStorage.setItem(this.table, JSON.stringify(obj));
    };
    /**
     * 往key对应的对象里塞数据，如果有相同的值则，往数组中push
     * @param key
     * @param value
     */
    LocalStoreTool.prototype.push = function (key, value) {
        var item = this.getList();
        var list = item ? item : {};
        var arr = (list[key] ? list[key] : []);
        arr.push(value);
        list[key] = arr;
        localStorage.setItem(this.table, JSON.stringify(list));
    };
    /**
     * 查找数据
     * @param key
     */
    LocalStoreTool.prototype.select = function (key) {
        var item = LocalStoreTool.getTable(this.table);
        if (item) {
            return item[key];
        }
        return undefined;
    };
    /**
     * 根据下标删除对应缓存数组中的数据
     * @param key 主键
     * @param index 下标
     */
    LocalStoreTool.prototype.deleteByIndex = function (key, index) {
        var item = this.getList();
        if (item && item[key]) {
            var arr = [];
            arr = item[key];
            arr.splice(index, 1);
            console.log(arr);
            item[key] = arr;
            localStorage.setItem(this.table, JSON.stringify(item));
        }
    };
    /**
     * 删除数据
     * @param key key:param[0],要删除的列名
     * @param index index:param[1] 要删除的字段名
     */
    LocalStoreTool.prototype.delete = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var item = this.getList();
        var key = param[0];
        if (param.length == 1) {
            if (item && item[key]) {
                delete item[key];
                localStorage.setItem(this.table, JSON.stringify(item));
            }
        }
        else {
            var index = param[1];
            if (item && item[key] && item[key][index]) {
                delete item[key][index];
                localStorage.setItem(this.table, JSON.stringify(item));
            }
        }
    };
    /**
     * 更新数据(其实put就可以了直接覆盖掉已有的数据)
     * @param key
     * @param value
     */
    LocalStoreTool.prototype.update = function (key, value) {
        var item = LocalStoreTool.getTable(this.table);
        if (item && item[key]) {
            item[key] = value;
        }
    };
    LocalStoreTool.prototype.getList = function () {
        return LocalStoreTool.getTable(this.table);
    };
    /**
     * 获得整张表的数据
     * @param table
     */
    LocalStoreTool.getTable = function (table) {
        var item = localStorage.getItem(table);
        if (item) {
            var obj = JSON.parse(item);
            return obj;
        }
        return undefined;
    };
    return LocalStoreTool;
}());
exports.LocalStoreTool = LocalStoreTool;
/**
 * @class sessionStorage工具类
 */
var sessionStoreTool = /** @class */ (function () {
    //初始化对象
    function sessionStoreTool(table) {
        this.table = table;
    }
    /**
     * 添加数据
     * @param key
     * @param value param[0]:value,param[1]:key
     */
    sessionStoreTool.prototype.put = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var value = param[0]; //第零位是value
        var item = this.getList();
        var obj = item ? item : {};
        if (param.length == 1) {
            obj[key] = value;
        }
        else {
            var index = param[1];
            if (obj[key]) {
                obj[key][index] = value;
            }
            else {
                obj[key] = {};
                obj[key][index] = value;
            }
        }
        sessionStorage.setItem(this.table, JSON.stringify(obj));
    };
    /**
     * 往key对应的对象里塞数据，如果有相同的值则，往数组中push
     * @param key
     * @param value
     */
    sessionStoreTool.prototype.push = function (key, value) {
        var item = this.getList();
        var list = item ? item : {};
        var arr = (list[key] ? list[key] : []);
        arr.push(value);
        list[key] = arr;
        sessionStorage.setItem(this.table, JSON.stringify(list));
    };
    /**
     * 查找数据
     * @param key
     */
    sessionStoreTool.prototype.select = function (key) {
        var item = this.getList();
        if (item) {
            return item[key];
        }
        return undefined;
    };
    /**
     * 删除数据
     * @param key key:param[0],要删除的列名
     * @param index index:param[1] 要删除的字段名
     */
    sessionStoreTool.prototype.delete = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var item = this.getList();
        var key = param[0];
        if (param.length == 1) {
            if (item && item[key]) {
                delete item[key];
                sessionStorage.setItem(this.table, JSON.stringify(item));
            }
        }
        else {
            var index = param[1];
            if (item && item[key] && item[key][index]) {
                delete item[key][index];
                sessionStorage.setItem(this.table, JSON.stringify(item));
            }
        }
    };
    /**
     * 更新数据(其实put就可以了直接覆盖掉已有的数据)
     * @param key
     * @param value
     */
    sessionStoreTool.prototype.update = function (key, value) {
        var item = sessionStoreTool.getTable(this.table);
        if (item && item[key]) {
            item[key] = value;
        }
    };
    /**
     * 获得整张表的数据
     * @param table
     */
    sessionStoreTool.getTable = function (table) {
        var item = sessionStorage.getItem(table);
        if (item) {
            var obj = JSON.parse(item);
            return obj;
        }
        return undefined;
    };
    sessionStoreTool.prototype.getList = function () {
        return sessionStoreTool.getTable(this.table);
    };
    return sessionStoreTool;
}());
exports.sessionStoreTool = sessionStoreTool;
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

/***/ "5bIc":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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
var entity_1 = __webpack_require__("6nHw");
var vue_1 = __webpack_require__("/5sW");
var vue_property_decorator_1 = __webpack_require__("EOM2");
var wallet_vue_1 = __webpack_require__("PPZq");
var Spinner_vue_1 = __webpack_require__("+jyM");
var importpack_1 = __webpack_require__("VKSY");
var balance = /** @class */ (function (_super) {
    __extends(balance, _super);
    function balance() {
        var _this = _super.call(this) || this;
        _this.currentAddress = "";
        _this.chooseAddress = "";
        _this.loadmsg = "";
        _this.claimbtn = true;
        _this.isgetGas = false; //是否可领取gas false为可领取状态，true为不可以领取
        _this.neoasset = new entity_1.NeoAsset();
        _this.balances = new Array();
        _this.neoasset.gas = 0;
        _this.neoasset.neo = 0;
        _this.neoasset.claim = '';
        _this.chooseAddressarr = new Array();
        _this.gettingGas = true;
        return _this;
        // this.chooseAddressarr = tools.storagetool.getLoginArr();
    }
    // Component method
    balance.prototype.mounted = function () {
        var _this = this;
        this.currentAddress = entity_1.LoginInfo.getCurrentAddress();
        this.isGetGas(this.currentAddress);
        this.getBalances();
        this.openToast = this.$refs.toast["isShow"];
        this.isGetTestGasSuccess();
        setInterval(function () {
            _this.isGetTestGasSuccess();
        }, 30000);
    };
    //判断是否可以领取gas
    balance.prototype.isGetGas = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var testgas, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testgas = sessionStorage.getItem("getTestGas");
                        if (!testgas) return [3 /*break*/, 1];
                        this.isGetTestGasSuccess();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, importpack_1.tools.wwwtool.api_hasclaimgas(address)];
                    case 2:
                        res = _a.sent();
                        if (res) {
                            if (res[0].flag) {
                                this.isgetGas = false;
                            }
                            else {
                                this.isgetGas = true;
                            }
                            return [2 /*return*/, res[0].flag];
                        }
                        this.isgetGas = true;
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //手动领取测试gas
    balance.prototype.getTestGas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isOk, res, oldBlock, height, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isGetGas(this.currentAddress)];
                    case 1:
                        isOk = _a.sent();
                        if (!isOk) return [3 /*break*/, 3];
                        this.gettingGas = false;
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_claimgas(this.currentAddress, 10)];
                    case 2:
                        res = _a.sent();
                        console.log(res);
                        if (res) {
                            if (res[0].code == "0000") {
                                console.log(res[0].codeMessage);
                                oldBlock = new importpack_1.tools.sessionstoretool("block");
                                height = oldBlock.select('height');
                                task = new entity_1.Task(height, entity_1.ConfirmType.tranfer, res[0].txid);
                                importpack_1.tools.taskManager.addTask(task, entity_1.TaskType.getGasTest);
                                sessionStorage.setItem("getTestGas", "waitting");
                            }
                            else if (res[0].code == "3001") {
                                console.log(res[0].codeMessage);
                                this.openToast("error", "" + this.$t("balance.errmsg1"), 4000);
                            }
                            else if (res[0].code == "3002") {
                                this.openToast("error", "" + this.$t("balance.errmsg2"), 4000);
                                console.log(res[0].codeMessage);
                                this.isgetGas = true;
                            }
                            else {
                                this.openToast("error", "" + this.$t("balance.errmsg1"), 4000);
                                this.isgetGas = true;
                            }
                        }
                        else {
                            this.openToast("error", "" + this.$t("balance.errmsg1"), 4000);
                            this.isgetGas = true;
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        this.openToast("error", "" + this.$t("balance.errmsg1"), 4000);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //领取测试gas成功
    balance.prototype.doGetTestGasSuccess = function () {
        this.openToast("success", "" + this.$t("balance.successmsg"), 4000);
        this.getBalances();
        this.gettingGas = true; //停止转动
        this.isgetGas = true; //不可点击
    };
    balance.prototype.isGetTestGasSuccess = function () {
        var testgas = sessionStorage.getItem("getTestGas");
        if (testgas == "true") {
            this.doGetTestGasSuccess();
            sessionStorage.removeItem("getTestGas");
        }
        else if (testgas == "waitting") {
            this.gettingGas = false; //转动
        }
        else if (testgas == "fail") {
            this.openToast("error", "" + this.$t("balance.errmsg2"), 4000);
            this.isgetGas = true;
            sessionStorage.removeItem("getTestGas");
        }
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
                        importpack_1.tools.coinTool.initAllAsset();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getBalance(this.currentAddress)];
                    case 1:
                        balances = _b.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getclaimgas(this.currentAddress, 0)];
                    case 2:
                        clamis = _b.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getclaimgas(this.currentAddress, 1)];
                    case 3:
                        clamis2 = _b.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getnep5Balance(this.currentAddress)];
                    case 4:
                        nep5balances = _b.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
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
                                if (balance.asset == importpack_1.tools.coinTool.id_NEO) {
                                    _this.neoasset.neo = balance.balance;
                                }
                                if (balance.asset == importpack_1.tools.coinTool.id_GAS) {
                                    _this.neoasset.gas = balance.balance;
                                }
                            });
                        }
                        _a = this;
                        return [4 /*yield*/, entity_1.BalanceInfo.getBalancesByArr(balances, nep5balances, height)];
                    case 6:
                        _a.balances = _b.sent();
                        importpack_1.tools.storagetool.setStorage("balances_asset", JSON.stringify(this.balances));
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
                        return [4 /*yield*/, importpack_1.tools.coinTool.rawTransaction(this.currentAddress, importpack_1.tools.coinTool.id_NEO, this.neoasset.neo.toString())];
                    case 1:
                        res = _a.sent();
                        if (res.info) {
                            this.loadmsg = "" + this.$t("balance.msg2");
                            this.queryNEOTx(res.info);
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        this.loadmsg = "" + this.$t("balance.msg3");
                        return [4 /*yield*/, importpack_1.tools.coinTool.claimGas()];
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
                            case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.getrawtransaction(txid)];
                            case 1:
                                res = _a.sent();
                                if (!res) {
                                    this.queryNEOTx(txid);
                                    return [2 /*return*/];
                                }
                                this.loadmsg = "" + this.$t("balance.msg3");
                                return [4 /*yield*/, importpack_1.tools.coinTool.claimGas()];
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
                            case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.getrawtransaction(txid)];
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
        importpack_1.tools.storagetool.setStorage("transfer_choose", asset);
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

/***/ "6M52":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/bid/bonus.ts
var bonus = __webpack_require__("DaUf");
var bonus_default = /*#__PURE__*/__webpack_require__.n(bonus);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3c6a7c2c","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/bid/bonus.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bonus-wrap"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('bonus.title1')))])]),_vm._v(" "),_c('div',{staticClass:"form-box"},[_c('div',{staticClass:"bonus-msg"},[_c('span',[_vm._v(_vm._s(_vm.$t('bonus.msg'))+": "+_vm._s(_vm.claimNum))]),_vm._v(" "),(!_vm.isClaim)?_c('button',{staticClass:"btn btn-nel",class:{'btn-disabled':(_vm.claimNum || _vm.claimNum=='0')},attrs:{"disabled":(_vm.claimNum || _vm.claimNum=='0')},on:{"click":_vm.getClaim}},[_vm._v(_vm._s(_vm.$t('btn.claim')))]):_vm._e(),_vm._v(" "),(_vm.isClaim)?_c('spinner-wrap',{attrs:{"isbig":false}}):_vm._e(),_vm._v(" "),(_vm.isClaim && _vm.claimState==1)?_c('span',{staticClass:"wait-msg"},[_vm._v(_vm._s(_vm.$t('bonus.wait1')))]):_vm._e(),_vm._v(" "),(_vm.isClaim && _vm.claimState==2)?_c('span',{staticClass:"wait-msg"},[_vm._v(_vm._s(_vm.$t('bonus.wait2')))]):_vm._e(),_vm._v(" "),(_vm.isClaim && _vm.claimState==3)?_c('span',{staticClass:"wait-msg"},[_vm._v(_vm._s(_vm.$t('bonus.wait3')))]):_vm._e(),_vm._v(" "),(_vm.claimState==4)?_c('span',{staticClass:"wait-msg"},[_vm._v(_vm._s(_vm.$t('bonus.wait4')))]):_vm._e()],1)]),_vm._v(" "),(_vm.historyList)?_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('bonus.title2')))])]):_vm._e(),_vm._v(" "),(_vm.historyList)?_c('div',{staticClass:"form-box"},[(_vm.isClaim)?_c('div',{staticClass:"history-box"},[_vm._v(_vm._s(_vm.$t('bonus.wait2')))]):_vm._e(),_vm._v(" "),_vm._l((_vm.historyList),function(item,index){return _c('div',{key:index,staticClass:"history-wrap"},[_c('div',{staticClass:"history-box"},[_c('div',{staticClass:"history-number dde"},[_vm._v("+ "+_vm._s(item.value)+" SGas")]),_vm._v(" "),_c('hr'),_vm._v(" "),_c('div',{staticClass:"history-time"},[_vm._v(_vm._s(item.blocktime))])])])}),_vm._v(" "),(_vm.isPage)?_c('div',{staticClass:"page-msg"},[_vm._v(_vm._s(_vm.pageMsg))]):_vm._e(),_vm._v(" "),(_vm.isPage)?_c('div',{staticClass:"page"},[_c('div',{staticClass:"page-previous",on:{"click":_vm.previous}},[_c('img',{attrs:{"src":__webpack_require__("tt5S"),"alt":""}})]),_vm._v(" "),_c('div',{staticStyle:{"width":"1px"}}),_vm._v(" "),_c('div',{staticClass:"page-next",on:{"click":_vm.next}},[_c('img',{attrs:{"src":__webpack_require__("pp3u"),"alt":""}})])]):_vm._e()],2):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var bid_bonus = (esExports);
// CONCATENATED MODULE: ./src/pages/bid/bonus.vue
function injectStyle (ssrContext) {
  __webpack_require__("eY8M")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3c6a7c2c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  bonus_default.a,
  bid_bonus,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_bid_bonus = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "6Trz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/hint.vue
var hint = __webpack_require__("lXdV");
var hint_default = /*#__PURE__*/__webpack_require__.n(hint);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-613f161c","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/hint.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"hint-box"},[_c('div',{staticClass:"hint-msg"},[_vm._t("default")],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_hint = (esExports);
// CONCATENATED MODULE: ./src/components/hint.vue
function injectStyle (ssrContext) {
  __webpack_require__("5bIc")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-613f161c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  hint_default.a,
  components_hint,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_hint = __webpack_exports__["default"] = (Component.exports);


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
var importpack_1 = __webpack_require__("VKSY");
var buffer_1 = __webpack_require__("63KW");
var LoginType;
(function (LoginType) {
    LoginType[LoginType["wif"] = 0] = "wif";
    LoginType[LoginType["nep2"] = 1] = "nep2";
    LoginType[LoginType["nep6"] = 2] = "nep6";
    LoginType[LoginType["otcgo"] = 3] = "otcgo";
})(LoginType = exports.LoginType || (exports.LoginType = {}));
var alert = /** @class */ (function () {
    function alert() {
    }
    alert.show = function (title, inputType, btnText, call) {
        var _this = this;
        // btn btn-nel btn-big
        this.btn_confirm.classList.add("btn", "btn-nel", "btn-big");
        this.btn_confirm.textContent = btnText;
        this.input.type = inputType;
        this.title.innerText = title;
        this.alertError.textContent = "";
        this.alert.hidden = false;
        this.btn_confirm.onclick = function () {
            call(_this.input.value);
        };
        this.btn_close.onclick = function () {
            _this.alert.hidden = true;
            return;
        };
    };
    alert.close = function () {
        this.alert.hidden = true;
        this.input.textContent = "";
        this.input.value = "";
    };
    alert.error = function (msg) {
        this.alertError.textContent = msg;
    };
    alert.alert = document.getElementById("alertview");
    alert.title = document.getElementById("alert-title");
    alert.alertBox = document.getElementById("alert-box");
    alert.alertError = document.getElementById("alert-error");
    alert.btn_close = document.getElementById("alert-close");
    alert.input = document.getElementById("alert-input");
    alert.btn_confirm = document.getElementById("alert-confirm");
    return alert;
}());
exports.alert = alert;
var LoginInfo = /** @class */ (function () {
    function LoginInfo() {
    }
    LoginInfo.alert = function (call) {
        // btn btn-nel btn-big
        var alert = document.getElementById("alertview");
        var title = document.getElementById("alert-title");
        var alertBox = document.getElementById("alert-box");
        var close = document.getElementById("alert-close");
        var input = document.getElementById("alert-input");
        var btn = document.getElementById("alert-confirm");
        btn.classList.add("btn", "btn-nel", "btn-big");
        btn.textContent = "确认";
        input.type = "password";
        title.innerText = "请输入密码";
        alert.hidden = false;
        btn.onclick = function () {
            call(input.value);
        };
        close.onclick = function () {
            alert.hidden = true;
            return;
        };
    };
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
        var arr = importpack_1.tools.storagetool.getLoginArr();
        var n = arr.findIndex(function (info) { return info.address == address; });
        return arr[n];
    };
    LoginInfo.getCurrentAddress = function () {
        return importpack_1.tools.storagetool.getStorage("current-address");
    };
    LoginInfo.setCurrentAddress = function (str) {
        importpack_1.tools.storagetool.setStorage("current-address", str);
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
                item.names = importpack_1.tools.coinTool.assetID2name[item.asset];
                var a = importpack_1.tools.storagetool.getStorage(item.asset);
                if (a) {
                    var obj = JSON.parse(a);
                    var h = obj["height"];
                    height - h > 1 ? importpack_1.tools.storagetool.delStorage(item.asset) : item.balance = obj["balance"]["balance"];
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
        importpack_1.tools.storagetool.setStorage(balance.asset, JSON.stringify({ height: height, balance: balance }));
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
        importpack_1.tools.storagetool.setStorage("old-utxos", JSON.stringify(arr.concat(olds)));
    };
    OldUTXO.setOldutxos = function (olds) {
        // let arr: OldUTXO[] = this.getOldutxos();
        importpack_1.tools.storagetool.setStorage("old-utxos", JSON.stringify(olds));
    };
    OldUTXO.getOldutxos = function () {
        var arr = new Array();
        var str = importpack_1.tools.storagetool.getStorage("old-utxos");
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
    // static baseContract = "0x2172f8d5b17c2d45fa3ff58dee8e8a4c3f51ef72";0x954f285a93eed7b4aed9396a7806a5812f1a5950;0x537758fbe85505801faa7d7d7b75b37686ad7e2d;
    Consts.baseContract = Neo.Uint160.parse("77e193f1af44a61ed3613e6e3442a0fc809bb4b8");
    Consts.registerContract = Neo.Uint160.parse("d6a5e965f67b0c3e5bec1f04f028edb9cb9e3f7c");
    return Consts;
}());
exports.Consts = Consts;
var DomainInfo = /** @class */ (function () {
    function DomainInfo() {
    }
    return DomainInfo;
}());
exports.DomainInfo = DomainInfo;
/**
 * 竞拍合约域名
 * @param startBlockSelling 开始竞标高度
 * @param endBlock 拍卖结束
 * @param lastBlock 最后出价高度
 * @param maxPrice 最大出价
 * @param maxBuyer 最大出价者(地址)
 */
var SellDomainInfo = /** @class */ (function (_super) {
    __extends(SellDomainInfo, _super);
    function SellDomainInfo() {
        return _super.call(this) || this;
    }
    SellDomainInfo.prototype.copyDomainInfoToThis = function (info) {
        this.owner = info.owner;
        this.ttl = info.ttl;
        this.register = info.register;
        this.resolver = info.resolver;
    };
    return SellDomainInfo;
}(DomainInfo));
exports.SellDomainInfo = SellDomainInfo;
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
        importpack_1.tools.storagetool.setStorage("history-txs", JSON.stringify(arr));
    };
    History.getHistoryStore = function () {
        var str = importpack_1.tools.storagetool.getStorage("history-txs");
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
            importpack_1.tools.storagetool.setStorage("history-txs", JSON.stringify(newarr_1));
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
        var obj = {};
        str ? obj = JSON.parse(sessionStorage.getItem("domain-status")) : {};
        return obj;
    };
    return DomainStatus;
}());
exports.DomainStatus = DomainStatus;
var WalletOtcgo = /** @class */ (function () {
    function WalletOtcgo() {
    }
    WalletOtcgo.prototype.fromJsonStr = function (str) {
        var json = JSON.parse(str);
        var otcgo = new WalletOtcgo();
        this.address = json["address"];
        this.publicKey = json["publicKey"];
        this.publicKeyCompressed = json["publicKeyCompressed"];
        this.privateKeyEncrypted = json["privateKeyEncrypted"];
    };
    WalletOtcgo.prototype.toJson = function () {
        var json = {};
        json['address'] = this.address;
        json['publicKey'] = this.publicKey;
        json['publicKeyCompressed'] = this.publicKeyCompressed;
        json["privateKeyEncrypted"] = this.privateKeyEncrypted;
        return json;
    };
    WalletOtcgo.prototype.otcgoDecrypt = function (pwd) {
        try {
            this.privatekey = CryptoJS.AES.decrypt(this.privateKeyEncrypted, pwd).toString(CryptoJS.enc.Utf8);
            this.prikey = this.privatekey.hexToBytes();
            this.pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(this.prikey);
        }
        catch (error) {
            console.error(error);
        }
    };
    // 签名
    WalletOtcgo.prototype.doSign = function (prvkey, msg) {
        var sig = new KJUR.crypto.Signature({ 'alg': 'SHA256withECDSA' });
        sig.initSign({
            'ecprvhex': prvkey,
            'eccurvename': 'secp256r1'
        });
        sig.updateString(msg);
        return sig.sign();
    };
    WalletOtcgo.prototype.doVerify = function (pubkey, msg, sigval) {
        var sig = new KJUR.crypto.Signature({
            'alg': 'SHA256withECDSA',
            'prov': 'cryptojs/jsrsa'
        });
        sig.initVerifyByPublicKey({
            'ecpubhex': pubkey,
            'eccurvename': 'secp256r1'
        });
        sig.updateString(msg);
        return sig.verify(sigval);
    };
    WalletOtcgo.prototype.doValidatePwd = function () {
        if (this.prikey.length === 0)
            return false;
        var msg = 'aaa';
        var sigval = this.doSign(this.privatekey, msg);
        return this.doVerify(this.publicKey, msg, sigval);
    };
    return WalletOtcgo;
}());
exports.WalletOtcgo = WalletOtcgo;
var MyAuction = /** @class */ (function () {
    function MyAuction() {
        this.id = "";
        this.auctionSpentTime = "";
        this.auctionState = "";
        this.expire = false;
        this.blockindex = "";
        this.maxBuyer = "";
        this.maxPrice = "";
        this.owner = "";
        this.endedState = 0;
        this.endTime = 0;
        this.startAuctionTime = 0;
        this.startTimeStr = "";
    }
    MyAuction.prototype.initSelling = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.id = info.id.toString();
                this.domain = info.domain;
                this.endBlock = parseInt(info.endBlock.toString());
                this.maxBuyer = ThinNeo.Helper.GetAddressFromScriptHash(info.maxBuyer);
                this.maxPrice = info.maxPrice.toString();
                this.owner = info.owner ? ThinNeo.Helper.GetAddressFromScriptHash(info.owner) : "";
                return [2 /*return*/];
            });
        });
    };
    return MyAuction;
}());
exports.MyAuction = MyAuction;
var DataType = /** @class */ (function () {
    function DataType() {
    }
    DataType.Array = 'Array';
    DataType.ByteArray = 'ByteArray';
    DataType.Integer = 'Integer';
    DataType.Boolean = 'Boolean';
    DataType.String = 'String';
    return DataType;
}());
exports.DataType = DataType;
var ResultItem = /** @class */ (function () {
    function ResultItem() {
    }
    ResultItem.FromJson = function (type, value) {
        var item = new ResultItem();
        if (type === DataType.Array) {
            item.subItem = []; //new ResultItem[(value as Array<any>).length];
            for (var i = 0; i < value.length; i++) {
                var subjson = value[i];
                var subtype = subjson["type"];
                item.subItem.push(ResultItem.FromJson(subtype, subjson["value"]));
            }
        }
        else if (type === DataType.ByteArray) {
            item.data = value.hexToBytes();
        }
        else if (type === DataType.Integer) {
            item.data = Neo.BigInteger.parse(value).toUint8Array();
        }
        else if (type === DataType.Boolean) {
            if (value != 0)
                item.data = new Uint8Array(0x01);
            else
                item.data = new Uint8Array(0x00);
        }
        else if (type === DataType.String) {
            item.data = new buffer_1.default(value);
        }
        else {
            console.log("not support type:" + type);
        }
        return item;
    };
    ResultItem.prototype.AsHexString = function () {
        return (this.data).toHexString();
    };
    ResultItem.prototype.AsHashString = function () {
        return "0x" + this.data.reverse().toHexString();
    };
    ResultItem.prototype.AsString = function () {
        return String.fromCharCode.apply(null, this.data);
    };
    ResultItem.prototype.AsHash160 = function () {
        if (this.data.length === 0)
            return null;
        return new Neo.Uint160(this.data.buffer);
    };
    ResultItem.prototype.AsHash256 = function () {
        if (this.data.length === 0)
            return null;
        return new Neo.Uint256(this.data.buffer);
    };
    ResultItem.prototype.AsBoolean = function () {
        if (this.data.length === 0 || this.data[0] === 0)
            return false;
        return true;
    };
    ResultItem.prototype.AsInteger = function () {
        return new Neo.BigInteger(this.data);
    };
    return ResultItem;
}());
exports.ResultItem = ResultItem;
var NNSResult = /** @class */ (function () {
    function NNSResult() {
    }
    return NNSResult;
}());
exports.NNSResult = NNSResult;
var PageUtil = /** @class */ (function () {
    /**
     *
     * @param total 总记录数
     * @param pageSize 每页条数
     */
    function PageUtil(total, pageSize) {
        this._currentPage = 1;
        this._totalCount = total;
        this._pageSize = pageSize;
        this._totalPage = total % pageSize == 0 ? total / pageSize : Math.ceil((total / pageSize));
    }
    ;
    Object.defineProperty(PageUtil.prototype, "currentPage", {
        /**
         * currentPage 返回当前页码
         */
        get: function () {
            this._totalPage = this.totalCount % this.pageSize == 0 ? this.totalCount / this.pageSize : Math.ceil((this.totalCount / this.pageSize));
            return this._currentPage;
        },
        /**
         *
         */
        set: function (currentPage) {
            this._currentPage = currentPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageUtil.prototype, "pageSize", {
        /**
         * pageSize 每页条数
         */
        get: function () {
            return this._pageSize;
        },
        /**
         * set count
         */
        set: function (pageSize) {
            this._pageSize = pageSize;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageUtil.prototype, "totalCount", {
        /**
         * pageSize 每页条数
         */
        get: function () {
            return this._totalCount;
        },
        /**
         * set count
         */
        set: function (totalCount) {
            this._totalCount = totalCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageUtil.prototype, "totalPage", {
        /**
     * pageSize 总页数
     */
        get: function () {
            this._totalPage = this._totalCount % this._pageSize == 0 ? this._totalCount / this._pageSize : Math.ceil(this._totalCount / this._pageSize);
            return this._totalPage;
        },
        enumerable: true,
        configurable: true
    });
    return PageUtil;
}());
exports.PageUtil = PageUtil;
var Task = /** @class */ (function () {
    function Task(height, type, txid) {
        this.txid = "";
        this.height = height;
        this.type = type;
        this.confirm = 0;
        this.txid = txid;
        this.state = TaskState.watting;
    }
    Task.prototype.toString = function () {
        return JSON.stringify(this);
    };
    return Task;
}());
exports.Task = Task;
var Process = /** @class */ (function () {
    function Process(start) {
        this.timearr = [];
        this.startTime = typeof start == "string" ? new Date(start).getTime() : start;
        this.date = importpack_1.tools.timetool.dateFtt("yyyy/MM/dd", new Date(this.startTime));
        this.time = importpack_1.tools.timetool.dateFtt("hh:mm:ss", new Date(this.startTime));
        this.width = 0;
        this.state = "";
        for (var i = 1; i <= 5; i++) {
            var element = { msg: "", date: "", time: "" };
            switch (i) {
                case 1:
                    element.msg = "1";
                    break;
                case 3:
                    element.msg = "2";
                    break;
                case 5:
                    element.msg = "3";
                    break;
                default:
                    break;
            }
            var time = this.startTime + 300000 * i;
            var date = importpack_1.tools.timetool.dateFtt("yyyy/MM/dd", new Date(time));
            var times = importpack_1.tools.timetool.dateFtt("hh:mm:ss", new Date(time));
            element.date = date;
            element.time = times;
            this.timearr.push(element);
        }
    }
    return Process;
}());
exports.Process = Process;
var NeoAuction_TopUp = /** @class */ (function () {
    function NeoAuction_TopUp() {
        this.input = "";
        this.watting = false;
        this.isShow = false;
        this.error = false;
    }
    return NeoAuction_TopUp;
}());
exports.NeoAuction_TopUp = NeoAuction_TopUp;
var NeoAuction_Withdraw = /** @class */ (function () {
    function NeoAuction_Withdraw() {
        this.input = "";
        this.watting = false;
        this.isShow = false;
        this.error = false;
    }
    return NeoAuction_Withdraw;
}());
exports.NeoAuction_Withdraw = NeoAuction_Withdraw;
/**
 * 任务状态
 */
var TaskState;
(function (TaskState) {
    TaskState[TaskState["watting"] = 0] = "watting";
    TaskState[TaskState["success"] = 1] = "success";
    TaskState[TaskState["fail"] = 2] = "fail";
})(TaskState = exports.TaskState || (exports.TaskState = {}));
/**
 * 任务类型
 */
var TaskType;
(function (TaskType) {
    TaskType[TaskType["tranfer"] = 0] = "tranfer";
    TaskType[TaskType["openAuction"] = 1] = "openAuction";
    TaskType[TaskType["addPrice"] = 2] = "addPrice";
    TaskType[TaskType["topup"] = 3] = "topup";
    TaskType[TaskType["withdraw"] = 4] = "withdraw";
    TaskType[TaskType["getGasTest"] = 5] = "getGasTest";
})(TaskType = exports.TaskType || (exports.TaskType = {}));
/**
 * 确认的操作类型
 */
var ConfirmType;
(function (ConfirmType) {
    ConfirmType[ConfirmType["tranfer"] = 0] = "tranfer";
    ConfirmType[ConfirmType["contract"] = 1] = "contract";
})(ConfirmType = exports.ConfirmType || (exports.ConfirmType = {}));
/**
 * @param open 开标或者重新开标
 * @param fixed 确定期
 * @param random 随机期
 * @param end 结束
 */
var DomainState;
(function (DomainState) {
    DomainState[DomainState["open"] = 0] = "open";
    DomainState[DomainState["fixed"] = 1] = "fixed";
    DomainState[DomainState["random"] = 2] = "random";
    DomainState[DomainState["end1"] = 3] = "end1";
    DomainState[DomainState["end2"] = 4] = "end2";
    DomainState[DomainState["expire"] = 5] = "expire";
    DomainState[DomainState["pass"] = 6] = "pass";
})(DomainState = exports.DomainState || (exports.DomainState = {}));


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
var entity_1 = __webpack_require__("6nHw");
var wallet_vue_1 = __webpack_require__("PPZq");
var vue_1 = __webpack_require__("/5sW");
var vue_class_component_1 = __webpack_require__("c+8m");
var importpack_1 = __webpack_require__("VKSY");
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
        // this.openToast = this.$refs.toast[ "isShow" ];
    }
    transfer.prototype.mounted = function () {
        var _this = this;
        this.openToast = this.$refs.toast["isShow"];
        var str = importpack_1.tools.storagetool.getStorage("balances_asset");
        if (str == null)
            this.balances = new Array();
        else {
            this.balances = JSON.parse(str);
            var choose = importpack_1.tools.storagetool.getStorage("transfer_choose");
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
        importpack_1.tools.storagetool.setStorage("transfer_choose", assetid);
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
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getBalance(currcountAddr)];
                    case 1:
                        balances = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getnep5Balance(currcountAddr)];
                    case 2:
                        nep5balances = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
                    case 3:
                        height = _a.sent();
                        this.balances = entity_1.BalanceInfo.getBalancesByArr(balances, nep5balances, height);
                        importpack_1.tools.storagetool.setStorage("balances_asset", JSON.stringify(this.balances));
                        return [2 /*return*/];
                }
            });
        });
    };
    transfer.prototype.verify_addr = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isDomain, isAddress, neoDomain, addr, mapping;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isDomain = importpack_1.tools.nnstool.verifyDomain(this.target);
                        isAddress = importpack_1.tools.nnstool.verifyAddr(this.target);
                        neoDomain = importpack_1.tools.nnstool.verifyNeoDomain(this.target);
                        if (!isDomain) return [3 /*break*/, 2];
                        this.target = this.target.toLowerCase();
                        return [4 /*yield*/, importpack_1.tools.nnstool.resolveData(this.target)];
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
                        return [3 /*break*/, 6];
                    case 2:
                        if (!isAddress) return [3 /*break*/, 3];
                        if (importpack_1.tools.neotool.verifyPublicKey(this.target)) {
                            this.toaddress = this.target;
                            this.addrerr = 'false';
                            return [2 /*return*/, true];
                        }
                        return [3 /*break*/, 6];
                    case 3:
                        if (!neoDomain) return [3 /*break*/, 5];
                        console.log(neoDomain);
                        return [4 /*yield*/, importpack_1.tools.nnstool.resolveData(this.target)];
                    case 4:
                        mapping = _a.sent();
                        console.log(mapping);
                        if (mapping.length) {
                            this.toaddress = mapping;
                            this.addrerr = 'false';
                            this.isDomain = true;
                            return [2 /*return*/, true];
                        }
                        else {
                            this.toaddress = "";
                            this.addrerr = 'true';
                            this.isDomain = false;
                            return [2 /*return*/, false];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        this.addrerr = 'true';
                        this.toaddress = "";
                        return [2 /*return*/, false];
                    case 6: return [2 /*return*/];
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
                        return [4 /*yield*/, importpack_1.tools.coinTool.nep5Transaction(entity_1.LoginInfo.getCurrentAddress(), this.toaddress, this.asset, this.amount)];
                    case 1:
                        res = _a.sent();
                        if (!!res["err"]) return [3 /*break*/, 3];
                        mui.toast("" + this.$t("transfer.msg2"));
                        his = new entity_1.History();
                        his.address = this.toaddress;
                        his.asset = this.asset;
                        his.value = this.amount;
                        his.txtype = "in";
                        his["waiting"] = true;
                        his.time = importpack_1.tools.timetool.getTime(new Date().getTime());
                        his.assetname = this.balance.names;
                        his.txid = res.info;
                        this.txs = [his].concat(this.txs);
                        num = parseFloat(this.balance.balance + "");
                        bear = num - parseFloat(this.amount);
                        this.balance.balance = bear;
                        this.amount = "";
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
                    case 2:
                        height = _a.sent();
                        entity_1.BalanceInfo.setBalanceSotre(this.balance, height);
                        entity_1.History.setHistoryStore(his, height);
                        importpack_1.tools.storagetool.setStorage("current-height", height + "");
                        return [3 /*break*/, 4];
                    case 3:
                        mui.alert("" + this.$t("transfer.msg3"));
                        _a.label = 4;
                    case 4: return [3 /*break*/, 8];
                    case 5: return [4 /*yield*/, importpack_1.tools.coinTool.rawTransaction(this.toaddress, this.asset, this.amount)];
                    case 6:
                        res = _a.sent();
                        if (res.err) {
                            this.openToast("error", "交易失败 " + res.info, 3000);
                        }
                        else {
                            this.openToast("success", "交易成功，请等待区块变化后确认是否到账", 3000);
                        }
                        his = new entity_1.History();
                        his.address = this.toaddress;
                        his.asset = this.asset;
                        his.value = this.amount;
                        his.txtype = "in";
                        his["waiting"] = true;
                        his.time = importpack_1.tools.timetool.getTime(new Date().getTime());
                        his.assetname = this.balance.names;
                        his.txid = res.info;
                        this.txs = [his].concat(this.txs);
                        num = parseFloat(this.balance.balance + "");
                        bear = num - parseFloat(this.amount);
                        this.amount = "";
                        this.balance.balance = bear;
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
                    case 7:
                        height = _a.sent();
                        entity_1.BalanceInfo.setBalanceSotre(this.balance, height);
                        entity_1.History.setHistoryStore(his, height);
                        importpack_1.tools.storagetool.setStorage("current-height", height + "");
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
                    case 0: return [4 /*yield*/, importpack_1.tools.coinTool.initAllAsset()];
                    case 1:
                        _f.sent();
                        currentAddress = entity_1.LoginInfo.getCurrentAddress();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.gettransbyaddress(currentAddress, 5, this.txpage)];
                    case 2:
                        res = _f.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
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
                        date = importpack_1.tools.timetool.getTime(time);
                        if (!(type == "out")) return [3 /*break*/, 9];
                        if (!(vins && vins.length == 1)) return [3 /*break*/, 8];
                        assetname = "";
                        vin = vins[0];
                        asset = vin["asset"];
                        amount = value[asset];
                        address = vin["address"];
                        if (!(assetType == "utxo")) return [3 /*break*/, 5];
                        assetname = importpack_1.tools.coinTool.assetID2name[asset];
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, importpack_1.tools.wwwtool.getNep5Asset(asset)];
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
                        assetname = importpack_1.tools.coinTool.assetID2name[asset];
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, importpack_1.tools.wwwtool.getNep5Asset(asset)];
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
                        assetname = importpack_1.tools.coinTool.assetID2name[asset];
                        return [3 /*break*/, 20];
                    case 18: return [4 /*yield*/, importpack_1.tools.wwwtool.getNep5Asset(asset)];
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
                        str = importpack_1.tools.storagetool.getStorage("current-height");
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
                    case 1:
                        currentheight = _a.sent();
                        oldheight = currentheight;
                        str ? oldheight = parseInt(str) : importpack_1.tools.storagetool.setStorage("current-height", currentheight + "");
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
var auctioninfo_vue_1 = __webpack_require__("NH4h");
var importpack_1 = __webpack_require__("VKSY");
var entity_1 = __webpack_require__("6nHw");
var neoauctionDataModel_1 = __webpack_require__("Zz8u");
var taskmanager_1 = __webpack_require__("XfB5");
var NeoAuction = /** @class */ (function (_super) {
    __extends(NeoAuction, _super);
    function NeoAuction() {
        var _this = _super.call(this) || this;
        _this.myAuctionList = [];
        _this.domainInfo = [];
        _this.btn_start = 4;
        _this.auctionShow = false;
        _this.auctionPage = false;
        _this.auctionMsg_alert = new entity_1.MyAuction();
        _this.myAuctionList = [];
        _this.domainInfo = [];
        _this.domain = "";
        _this.alert_myBid = "";
        _this.address = entity_1.LoginInfo.getCurrentAddress();
        _this.regBalance = '0';
        var SGas = importpack_1.tools.coinTool.id_SGAS.toString();
        var Gas = importpack_1.tools.coinTool.id_GAS;
        _this.selectList = {};
        _this.selectList[Gas] = "Gas";
        _this.selectList[SGas] = "SGas";
        _this.alert_available = "";
        _this.checkState = 0;
        _this.alert_withdraw = new entity_1.NeoAuction_Withdraw();
        _this.alert_TopUp = new entity_1.NeoAuction_TopUp();
        _this.refresh = new importpack_1.tools.sessionstoretool("refresh_auction");
        _this.sessionWatting = new importpack_1.tools.sessionstoretool("session_watting");
        _this.auctionPageSession = new importpack_1.tools.sessionstoretool("auctionPage");
        if (_this.auctionPageSession.select("show")) {
            _this.auctionPage = true;
        }
        else {
            _this.auctionPage = false;
        }
        _this.canAdded = false;
        _this.myBalanceOfSelling = "";
        return _this;
    }
    NeoAuction.prototype.mounted = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nep5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.nnstool.initRootDomain("neo")];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, importpack_1.tools.nnssell.getBalanceOf()];
                    case 2:
                        _a.regBalance = _b.sent();
                        this.openToast = this.$refs.toast["isShow"];
                        this.getBidList(this.address);
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getnep5balanceofaddress(importpack_1.tools.coinTool.id_SGAS.toString(), entity_1.LoginInfo.getCurrentAddress())];
                    case 3:
                        nep5 = _b.sent();
                        this.sgasAvailable = nep5["nep5balance"];
                        this.alert_available = this.sgasAvailable.toString() + " SGas";
                        // this.refreshPage();
                        taskmanager_1.TaskManager.functionList = [];
                        taskmanager_1.TaskManager.functionList.push(this.refreshPage);
                        return [2 /*return*/];
                }
            });
        });
    };
    NeoAuction.prototype.refreshPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var oldheight, height, _a, nep5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        oldheight = this.refresh.select("height");
                        height = taskmanager_1.TaskManager.oldBlock.select('height');
                        if (!oldheight) return [3 /*break*/, 3];
                        _a = this;
                        return [4 /*yield*/, importpack_1.tools.nnssell.getBalanceOf()];
                    case 1:
                        _a.regBalance = _b.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getnep5balanceofaddress(importpack_1.tools.coinTool.id_SGAS.toString(), entity_1.LoginInfo.getCurrentAddress())];
                    case 2:
                        nep5 = _b.sent();
                        this.sgasAvailable = nep5["nep5balance"];
                        this.refresh.put("withdraw", false);
                        this.alert_withdraw.watting = false;
                        if (oldheight < height) {
                            this.getBidList(this.address);
                            setTimeout(function () {
                                _this.getBidList(_this.address);
                                _this.refresh.put("bidlist", false);
                                _this.refresh.put("height", height);
                            }, 8000);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        this.refresh.put("height", height);
                        this.getBidList(this.address);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获得参与过竞拍的域名列表
     * @param address 地址
     */
    NeoAuction.prototype.getBidList = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, neoauctionDataModel_1.NeoaucionData.getBidList(address)];
                    case 1:
                        _a.myAuctionList = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 显示竞拍详情
     * @param item 域名的竞拍信息
     */
    NeoAuction.prototype.onGoBidInfo = function (item) {
        this.domainInfo = item;
        this.auctionPageSession.put("domain", item.domain);
        this.auctionPageSession.put('show', true);
        this.auctionPage = !this.auctionPage;
    };
    /**
     * 控制详情页的显示
     */
    NeoAuction.prototype.onBack = function () {
        taskmanager_1.TaskManager.functionList = [];
        taskmanager_1.TaskManager.functionList.push(this.refreshPage);
        this.refreshPage();
        console.log("刷新");
        this.auctionPageSession.put('show', false);
        this.auctionPage = false;
    };
    /**
     * 验证充值金额
     */
    NeoAuction.prototype.verifToupAmount = function () {
        if (/\./.test(this.alert_TopUp.input)) {
            this.alert_TopUp.input = this.alert_TopUp.input.toString().substr(0, (this.alert_TopUp.input.toString().indexOf(".")) + 9);
        }
        var amount = Neo.Fixed8.parse(this.alert_TopUp.input);
        var balance = Neo.Fixed8.parse(this.sgasAvailable + "");
        if (balance.compareTo(amount) <= 0) {
            this.alert_TopUp.input = balance.toString();
            this.alert_TopUp.error = true;
        }
        else {
            this.alert_TopUp.error = false;
        }
    };
    /**
     * 验证退款金额是否合法
     */
    NeoAuction.prototype.verifWithdraw = function () {
        if (/\./.test(this.alert_withdraw.input)) {
            this.alert_withdraw.input = this.alert_withdraw.input.toString().substr(0, (this.alert_withdraw.input.toString().indexOf(".")) + 9);
        }
        var amount = Neo.Fixed8.parse(this.alert_withdraw.input);
        var balance = Neo.Fixed8.parse(this.regBalance);
        if (balance.compareTo(amount) <= 0) {
            this.alert_withdraw.input = balance.toString();
            this.alert_withdraw.error = true;
        }
        else {
            this.alert_withdraw.error = false;
        }
    };
    /**
     * 充值到注册器
     */
    NeoAuction.prototype.openTopUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nep5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, importpack_1.tools.nnssell.getBalanceOf()];
                    case 1:
                        _a.regBalance = _b.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getnep5balanceofaddress(importpack_1.tools.coinTool.id_SGAS.toString(), entity_1.LoginInfo.getCurrentAddress())];
                    case 2:
                        nep5 = _b.sent();
                        this.sgasAvailable = nep5["nep5balance"];
                        this.alert_available = this.sgasAvailable + " SGas";
                        this.alert_TopUp.isShow = true;
                        this.alert_TopUp.input = "";
                        this.alert_TopUp.error = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 从注册器退币
     */
    NeoAuction.prototype.openWithdraw = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nep5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, importpack_1.tools.nnssell.getBalanceOf()];
                    case 1:
                        _a.regBalance = _b.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getnep5balanceofaddress(importpack_1.tools.coinTool.id_SGAS.toString(), entity_1.LoginInfo.getCurrentAddress())];
                    case 2:
                        nep5 = _b.sent();
                        this.sgasAvailable = nep5["nep5balance"];
                        this.alert_available = this.sgasAvailable + " SGas";
                        this.alert_withdraw.isShow = true;
                        this.alert_withdraw.input = "";
                        this.alert_withdraw.error = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 退回sgas
     */
    NeoAuction.prototype.withdraw = function () {
        return __awaiter(this, void 0, void 0, function () {
            var amount, res, oldBlock, height, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amount = parseFloat(this.alert_withdraw.input);
                        this.alert_withdraw.watting = true;
                        return [4 /*yield*/, importpack_1.tools.nnssell.getMoneyBack(amount)];
                    case 1:
                        res = _a.sent();
                        if (!res.err) {
                            this.openToast("success", amount + "" + this.$t("auction.successwithdraw2"), 4000);
                            this.sessionWatting.put("withdraw", res.info);
                            this.alert_withdraw.isShow = false;
                            oldBlock = new importpack_1.tools.sessionstoretool("block");
                            height = oldBlock.select('height');
                            task = new entity_1.Task(height, entity_1.ConfirmType.tranfer, res.info);
                            importpack_1.tools.taskManager.addTask(task, entity_1.TaskType.withdraw);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * gas->sgas->充值注册器
     */
    NeoAuction.prototype.toRecharge = function () {
        return __awaiter(this, void 0, void 0, function () {
            var amount, data, res, txid, oldBlock, height, task, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amount = this.alert_TopUp.input;
                        this.alert_TopUp.watting = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, importpack_1.tools.nnssell.rechargeReg(parseFloat(this.alert_TopUp.input).toFixed(8))];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_postRawTransaction(data)];
                    case 3:
                        res = _a.sent();
                        txid = res["txid"];
                        this.sessionWatting.put("recharge-sgas", { txid: txid, amount: amount });
                        oldBlock = new importpack_1.tools.sessionstoretool("block");
                        height = oldBlock.select('height');
                        task = new entity_1.Task(height, entity_1.ConfirmType.tranfer, txid);
                        importpack_1.tools.taskManager.addTask(task, entity_1.TaskType.topup);
                        this.openToast("success", "" + this.$t("auction.successtopup") + amount + "" + this.$t("auction.successtopup3"), 4000);
                        this.alert_TopUp.isShow = false;
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        this.openToast("error", "" + this.$t("auction.fail"), 4000);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 显示加价弹框
     */
    NeoAuction.prototype.addBid = function () {
        return __awaiter(this, void 0, void 0, function () {
            var msg, auction, time;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.nnssell.getSellingStateByDomain(this.domain + ".neo")];
                    case 1:
                        msg = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.nnssell.getMyAuctionState(msg)];
                    case 2:
                        auction = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getBlockInfo(msg.startBlockSelling.toInt32())];
                    case 3:
                        time = _a.sent();
                        auction.startAuctionTime = time * 1000;
                        auction.startTimeStr = importpack_1.tools.timetool.getTime(time);
                        auction.maxBuyer = msg.maxBuyer ? msg.maxBuyer.toString() : "";
                        auction.maxPrice = accDiv(msg.maxPrice.toString(), 100000000).toString();
                        auction.domain = this.domain + ".neo";
                        auction.balanceOfSelling = accDiv(msg.balanceOfSelling.toString(), 100000000).toString();
                        this.myBalanceOfSelling = auction.balanceOfSelling;
                        this.auctionMsg_alert = auction;
                        this.auctionShow = !this.auctionShow;
                        return [2 /*return*/];
                }
            });
        });
    };
    NeoAuction.prototype.verifBidAmount = function () {
        if (!!this.alert_myBid) {
            if (/\./.test(this.alert_myBid)) {
                this.alert_myBid = this.alert_myBid.toString().substr(0, (this.alert_myBid.toString().indexOf(".")) + 2);
            }
        }
        var myBid = !!this.alert_myBid ? parseFloat(this.alert_myBid) : 0;
        if (parseFloat(this.regBalance) < myBid) {
            this.canAdded = false;
            this.alert_myBid = this.regBalance;
            myBid = parseFloat(this.regBalance);
        }
        var amount = accAdd(this.auctionMsg_alert.balanceOfSelling, myBid);
        this.myBalanceOfSelling = amount.toString();
        if (amount > parseFloat(this.auctionMsg_alert.maxPrice)) {
            this.canAdded = true;
        }
        else {
            this.canAdded = false;
        }
    };
    /**
     * 加价
     */
    NeoAuction.prototype.bidDomain = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, oldBlock, height, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.nnssell.raise(this.auctionMsg_alert.domain, Neo.Fixed8.parse(this.alert_myBid).getData().toNumber())];
                    case 1:
                        res = _a.sent();
                        if (!res.err) {
                            this.openToast("success", "" + this.$t("auction.successbid2"), 3000);
                            this.alert_myBid = "";
                            this.auctionShow = !this.auctionShow;
                            neoauctionDataModel_1.NeoaucionData.setBidSession(this.auctionMsg_alert, this.alert_myBid, res.info);
                            oldBlock = new importpack_1.tools.sessionstoretool("block");
                            height = oldBlock.select('height');
                            task = new entity_1.Task(height, entity_1.ConfirmType.tranfer, res.info);
                            importpack_1.tools.taskManager.addTask(task, entity_1.TaskType.addPrice);
                        }
                        else {
                            console.log(res.info);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 开标
     */
    NeoAuction.prototype.openAuction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, auction, oldBlock, height, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.domain || !this.domain.length) {
                            this.btn_start = 4;
                            this.checkState = 0;
                            return [2 /*return*/];
                        }
                        this.btn_start = 0;
                        return [4 /*yield*/, importpack_1.tools.nnssell.openbid(this.domain)];
                    case 1:
                        res = _a.sent();
                        auction = new entity_1.MyAuction();
                        auction.domain = this.domain + ".neo";
                        auction.startAuctionTime = new Date().getTime();
                        auction.startTimeStr = importpack_1.tools.timetool.getTime(auction.startAuctionTime);
                        auction.auctionState = '3';
                        auction.maxPrice = "0";
                        // this.myAuctionList.unshift(auction);
                        neoauctionDataModel_1.NeoaucionData.setOpenSession(auction);
                        oldBlock = new importpack_1.tools.sessionstoretool("block");
                        height = oldBlock.select('height');
                        task = new entity_1.Task(height, entity_1.ConfirmType.tranfer, res.info);
                        importpack_1.tools.taskManager.addTask(task, entity_1.TaskType.openAuction);
                        this.openToast("success", "" + this.$t("auction.sendingmsg"), 3000);
                        this.getBidList(this.address);
                        this.btn_start = 1;
                        this.domain = "";
                        this.checkState = 0;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 查询域名状态
     */
    NeoAuction.prototype.queryDomainState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var verify, info, sellstate, startTime, currentTime, dtime, lastTime, dlast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.domain || !this.domain.length) {
                            this.btn_start = 4;
                            this.checkState = 0;
                            return [2 /*return*/];
                        }
                        this.domain = this.domain.toLowerCase();
                        this.domain = this.domain.trim();
                        verify = /^[a-zA-Z0-9]{2,32}$/;
                        if (!verify.test(this.domain)) {
                            this.checkState = 4;
                            this.btn_start = 4;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, importpack_1.tools.nnssell.getSellingStateByDomain(this.domain + ".neo")];
                    case 1:
                        info = _a.sent();
                        sellstate = (info.startBlockSelling.compareTo(Neo.BigInteger.Zero));
                        if (sellstate == 0) {
                            this.btn_start = 1;
                            this.checkState = 1;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getBlockInfo(parseInt(info.startBlockSelling.toString()))];
                    case 2:
                        startTime = _a.sent();
                        currentTime = new Date().getTime();
                        dtime = currentTime - startTime * 1000;
                        if (!(dtime > 900000)) return [3 /*break*/, 6];
                        if (info.maxPrice.compareTo(Neo.BigInteger.Zero) == 0 || dtime > 109500000) {
                            this.checkState = this.btn_start = 1;
                            return [2 /*return*/];
                        }
                        //判断是否已有结束竞拍的区块高度。如果结束区块大于零则状态为结束
                        if (info.endBlock.compareTo(Neo.BigInteger.Zero) > 0) {
                            this.checkState = this.btn_start = 3;
                            return [2 /*return*/];
                        }
                        if (!(dtime > 1500000)) return [3 /*break*/, 3];
                        this.checkState = this.btn_start = 3;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, importpack_1.tools.wwwtool.api_getBlockInfo(parseInt(info.lastBlock.toString()))];
                    case 4:
                        lastTime = _a.sent();
                        dlast = lastTime - startTime;
                        if (dlast < 600) {
                            this.checkState = this.btn_start = 3;
                        }
                        else {
                            this.checkState = this.btn_start = 2;
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        this.checkState = this.btn_start = 2;
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    NeoAuction = __decorate([
        vue_property_decorator_1.Component({
            components: {
                "auction-info": auctioninfo_vue_1.default
            }
        }),
        __metadata("design:paramtypes", [])
    ], NeoAuction);
    return NeoAuction;
}(vue_1.default));
exports.default = NeoAuction;


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
var myneo_vue_1 = __webpack_require__("ogHy");
var bonus_vue_1 = __webpack_require__("6M52");
var NNSNeo = /** @class */ (function (_super) {
    __extends(NNSNeo, _super);
    function NNSNeo() {
        var _this = _super.call(this) || this;
        _this.showType = 1;
        var routeArray = location.hash.replace("#", "").split("/");
        var route = routeArray[0];
        var subroute = routeArray.length > 1 ? routeArray[1] : undefined;
        switch (subroute) {
            case "auction":
                _this.showType = 1;
                break;
            case "myneoname":
                _this.showType = 3;
                break;
            case "bonus":
                _this.showType = 4;
                break;
        }
        return _this;
    }
    NNSNeo.prototype.mounted = function () { };
    NNSNeo.prototype.switchRoute = function (subroute) {
        switch (subroute) {
            case "auction":
                this.showType = 1;
                location.hash = "#nnsneo/auction";
                break;
            case "myneoname":
                this.showType = 3;
                location.hash = "#nnsneo/myneoname";
                break;
            case "bonus":
                this.showType = 4;
                location.hash = "#nnsneo/bonus";
                break;
        }
    };
    NNSNeo = __decorate([
        vue_class_component_1.default({
            components: {
                "wallet-layout": wallet_vue_1.default,
                "neo-auction": neoauction_vue_1.default,
                "my-neo": myneo_vue_1.default,
                "bonus": bonus_vue_1.default
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

/***/ "8Xo2":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAGCAYAAADdXo4uAAAAAXNSR0IArs4c6QAAAEhJREFUKBVjYKATYPyfkxHM8O+/BQ3tO8c4beZyFoa//90YGP6n0cwiRsYlQLOXM9HMAjSD6WYRC9Di8wyMjOvRHEBN7hmQYQBwIg5O9EaNCgAAAABJRU5ErkJggg=="

/***/ }),

/***/ "9Jd1":
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
var importpack_1 = __webpack_require__("VKSY");
var entity_1 = __webpack_require__("6nHw");
/**
 * @name Sgas兑换Gas工具类
 */
var SgasTool = /** @class */ (function () {
    function SgasTool() {
    }
    /**
     * gas -> sgas
     * @param transcount 兑换的数量
     */
    SgasTool.makeMintTokenTransaction = function (transcount) {
        return __awaiter(this, void 0, void 0, function () {
            var login, script, sgasaddr, txid, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        login = entity_1.LoginInfo.getCurrentLogin();
                        script = importpack_1.tools.contract.buildScript(importpack_1.tools.coinTool.id_SGAS, "mintTokens", []);
                        sgasaddr = ThinNeo.Helper.GetAddressFromScriptHash(importpack_1.tools.coinTool.id_SGAS);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, importpack_1.tools.contract.contractInvokeTrans(script, sgasaddr, importpack_1.tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(transcount))];
                    case 2:
                        txid = _a.sent();
                        return [2 /*return*/, txid];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * sgas -> gas
     * @param transcount 兑换数量
     */
    SgasTool.makeRefundTransaction = function (transcount) {
        return __awaiter(this, void 0, void 0, function () {
            var login, utxos_assets, us, i, script, r, stack, value, nepAddress, makeTranRes, r, sgasScript, scriptHash, tran, sb, signdata, trandata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        login = entity_1.LoginInfo.getCurrentLogin();
                        return [4 /*yield*/, importpack_1.tools.coinTool.getsgasAssets()];
                    case 1:
                        utxos_assets = _a.sent();
                        us = utxos_assets[importpack_1.tools.coinTool.id_GAS];
                        if (us == undefined) {
                            return [2 /*return*/];
                        }
                        i = us.length - 1;
                        _a.label = 2;
                    case 2:
                        if (!(i >= 0)) return [3 /*break*/, 5];
                        if (us[i].n > 0) {
                            return [3 /*break*/, 4];
                        }
                        script = importpack_1.tools.contract.buildScript(importpack_1.tools.coinTool.id_SGAS, "getRefundTarget", ["(hex256)" + us[i].txid.toString()]);
                        return [4 /*yield*/, importpack_1.tools.wwwtool.rpc_getInvokescript(script)];
                    case 3:
                        r = _a.sent();
                        if (r) {
                            stack = r['stack'];
                            value = stack[0]["value"].toString();
                            if (value.length > 0) {
                                delete us[i];
                            }
                        }
                        _a.label = 4;
                    case 4:
                        i--;
                        return [3 /*break*/, 2];
                    case 5:
                        //sgas 自己给自己转账   用来生成一个utxo  合约会把这个utxo标记给发起的地址使用
                        try {
                            nepAddress = ThinNeo.Helper.GetAddressFromScriptHash(importpack_1.tools.coinTool.id_SGAS);
                            makeTranRes = importpack_1.tools.coinTool.makeTran(utxos_assets, nepAddress, importpack_1.tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(transcount));
                        }
                        catch (e) {
                            // this.makeRefundTransaction_error("SGAS余额不足")
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getcontractstate(importpack_1.tools.coinTool.id_SGAS.toString())];
                    case 6:
                        r = _a.sent();
                        if (!(r && r['script'])) return [3 /*break*/, 8];
                        sgasScript = r['script'].hexToBytes();
                        scriptHash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(login.address);
                        tran = makeTranRes.info.tran;
                        tran.type = ThinNeo.TransactionType.InvocationTransaction;
                        tran.extdata = new ThinNeo.InvokeTransData();
                        (tran.extdata).script = importpack_1.tools.contract.buildScript(importpack_1.tools.coinTool.id_SGAS, "refund", ["(bytes)" + scriptHash.toHexString()]);
                        //附加鉴证
                        tran.attributes = new Array(1);
                        tran.attributes[0] = new ThinNeo.Attribute();
                        tran.attributes[0].usage = ThinNeo.TransactionAttributeUsage.Script;
                        tran.attributes[0].data = scriptHash; // ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);
                        sb = new ThinNeo.ScriptBuilder();
                        sb.EmitPushString("whatever");
                        sb.EmitPushNumber(new Neo.BigInteger(250));
                        tran.AddWitnessScript(sgasScript, sb.ToArray());
                        signdata = ThinNeo.Helper.Sign(tran.GetMessage(), login.prikey);
                        tran.AddWitness(signdata, login.pubkey, login.address);
                        trandata = tran.GetRawData();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_postRawTransaction(trandata)];
                    case 7:
                        // 发送交易请求
                        r = _a.sent();
                        if (!!r && r["txid"]) {
                            return [2 /*return*/, r["txid"]];
                        }
                        else {
                            throw "Transaction send failed";
                        }
                        return [3 /*break*/, 9];
                    case 8: throw "Contract acquisition failure";
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param utxo 兑换gas的utxo
     * @param transcount 兑换的数量
     */
    SgasTool.makeRefundTransaction_tranGas = function (utxo, transcount) {
        return __awaiter(this, void 0, void 0, function () {
            var utxos_assets, addr, makeTranRes, tran, r, sgasScript, sb, trandata, list, tranlist, tranObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        utxos_assets = {};
                        utxos_assets[importpack_1.tools.coinTool.id_GAS] = [];
                        utxos_assets[importpack_1.tools.coinTool.id_GAS].push(utxo);
                        try {
                            addr = entity_1.LoginInfo.getCurrentAddress();
                            makeTranRes = importpack_1.tools.coinTool.makeTran(utxos_assets, addr, importpack_1.tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(transcount));
                        }
                        catch (e) {
                            return [2 /*return*/];
                        }
                        tran = makeTranRes.info.tran;
                        tran.type = ThinNeo.TransactionType.ContractTransaction;
                        tran.version = 0;
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getcontractstate(importpack_1.tools.coinTool.id_SGAS.toString())];
                    case 1:
                        r = _a.sent();
                        if (!(r && r['script'])) return [3 /*break*/, 3];
                        sgasScript = r['script'].hexToBytes();
                        sb = new ThinNeo.ScriptBuilder();
                        sb.EmitPushNumber(new Neo.BigInteger(0));
                        sb.EmitPushNumber(new Neo.BigInteger(0));
                        tran.AddWitnessScript(sgasScript, sb.ToArray());
                        trandata = tran.GetRawData();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_postRawTransaction(trandata)];
                    case 2:
                        // 发送转换请求
                        r = _a.sent();
                        if (!!r && !!r["txid"]) {
                            list = '';
                            tranlist = localStorage.getItem('exchangelist');
                            tranlist = tranlist.replace('[', '').replace(']', '');
                            tranObj = JSON.stringify({ 'trancount': transcount, 'txid': r.txid, 'trantype': 'SGas' });
                            list = '[' + tranlist + ',' + tranObj + ']';
                            localStorage.setItem('exchangelist', list);
                        }
                        else {
                            // this.makeRefundTransaction_error("发送转换请求失败！")
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SgasTool.canClaimCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var who, data, res, stack, amount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(entity_1.LoginInfo.getCurrentAddress()).buffer);
                        data = importpack_1.tools.contract.buildScript(importpack_1.tools.coinTool.dapp_nnc, "canClaimCount", ["(hex160)" + who.toString()]);
                        return [4 /*yield*/, importpack_1.tools.wwwtool.rpc_getInvokescript(data)];
                    case 1:
                        res = _a.sent();
                        stack = res["stack"][0];
                        amount = entity_1.ResultItem.FromJson(stack["type"], stack["value"]);
                        //console.log(amount.AsInteger().toString());
                        return [2 /*return*/, amount.AsInteger().toString()];
                }
            });
        });
    };
    SgasTool.claim = function () {
        return __awaiter(this, void 0, void 0, function () {
            var who, data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(entity_1.LoginInfo.getCurrentAddress()).buffer);
                        data = importpack_1.tools.contract.buildScript(importpack_1.tools.coinTool.dapp_nnc, "claim", ["(hex160)" + who.toString()]);
                        return [4 /*yield*/, importpack_1.tools.contract.contractInvokeTrans(data)];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return SgasTool;
}());
exports.default = SgasTool;


/***/ }),

/***/ "AU0D":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/toast.vue
var toast = __webpack_require__("vcAA");
var toast_default = /*#__PURE__*/__webpack_require__.n(toast);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-34d787b3","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/toast.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isshow)?_c('div',{staticClass:"comp-toast"},[_c('div',{staticClass:"img-box"},[(_vm.type == 'error')?_c('img',{attrs:{"src":__webpack_require__("lJF1"),"alt":""}}):_vm._e(),_vm._v(" "),(_vm.type == 'success')?_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}}):_vm._e()]),_vm._v(" "),_c('span',{staticClass:"text"},[_vm._v(_vm._s(_vm.msg))])]):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_toast = (esExports);
// CONCATENATED MODULE: ./src/components/toast.vue
function injectStyle (ssrContext) {
  __webpack_require__("S2Vl")
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
  toast_default.a,
  components_toast,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_toast = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "Az9s":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAADPVJREFUaAXlW2mMltUVPt8yK4yMswNSBlQQNAhBFmVUxmIojbYN6YaNxTbGNk3tj2LtktAfavrDJTFKrLV/Sq1ibUNjSlgqFQQUIcVWWsEpIirKDDMDDs7CLN/S57n3nu97v+X9lpFBQ8/kfueu557nnnPue99lAjJGFI/HK4eGhlrA58disZmBQGAmpmpCuQr5Kk6LfC/yvch2IN8WDAbbUD5QVla2B3yAfc41Bc6lQCjdcPbs2dsgcyXSIpRLRyMfYIcxbh/SxoqKimdR7hyNnGxjzglggLwBVvwJFPsCQIZ1IlhMNKFNNGk7OfonEmSIJu2DMRH02Qo5DwH8Lq0fLf9EgAG0Fcrch9SiCoRCIdFEgKMhLkI0Gk0klQF5dPW1AL5T64rlo9IICk0E2EfAV+mE4XBYSkpKjBW17lxwgh8ZGZFIJJIQB9AbAHoNeHuissBM0YAHBwdXYPU3QP4EzkFrEihddyyJrk7gtLyjM5h7VXl5+RatKIQXBXhgYGANhD6IVQe+oJSWlo450HQQBD48PGxiHRaOof3eysrKR9L7+ZULAgyAZQD7GwhZTUG0KNOnSbQ2k6P1AP09LMCQVvjxvIABth7x+gL4tRRCqzJePwvEuKa1SQC7F3H9ZfCuXLrlBEzLAuwOgoUgwYHgvLtwLuXZRhfHAcdc2hzoVnBfS+cE3N/f/zvIXE2w2BzO6Q78bl+b7D35orzWuUOmVc2WrzR/W5rHX04MRRMMIthMDWgMXj9u3Lg7/IT4AuYGBUEPcyDBnotduH3gmOzvAsiT2+XEwAcSk4DE4iJRl+bVXScrm1fLFROu8tPXt56WJmgSDHSP30aWFTAvPRCwCYCDnzRmuwc/lNe7X5T9nS/K8b6jBhyBRuNJsDEJeupFZl88T74+bbXMrZnvCzBbg8Y0AMdgoFuyXbIyAAPkRFj3MAROGO1ufGa4U/51aru83rVN3u19S6K4eBiQEBqNASh4DICNZRNWZj3qtC+sftmE2bJq+u2yuH5JNnxZ6zy79xlYeRbApxxOMgAD7LMAvYouTFculPojH8l/Tv1d3ujeJkd73zCKE5C1pnVbA9IDisAVYLIfLQ/gaNNFmTr+Uvnm9G9J68RW+EL+Aw5dmy4OsBsAmjczCUoBjB15KTruYGshcTsU7ZPDH70k/+7eKkc/PiAjsQgAwj2BRMGmW83W04XjBhDbI1iYOLnHugpWF4J8UuUlsPhtsmLycgkFQgkQ6RlvPMNwrd6zd8oFFZa9n4N5XPTbpCKxQXm7Z6e8eXqrHDnzqoxECdLGI+6H7E7JOyP8AYUlLqvLY9V5i2TbXTWbuXmZNoA2Y1lJMuNs4XjfB/LsO3/E8IDcOmWFbc/yS92JgcdQh+l67ZYADOveiJUxdz25TlG9wx/KQKRHus6+DYE86TjNoBh1Y4kJN30mhwldDRhIy6xlsuRksMYsCGqZxR+HN1U2ydKmz8Olb5K6slrZ1bFHjvW9K9PGN7vxmYwYHOAWYoOVX2YvnUlwzf0ryrfwFMWd2Y+e/OdlMr36izK38U45Ndghr3Y8Lcd733RWtu5pLW43JXPZwTTq4tli1rRx12Y/DCCvLq+XJQ2tciOA1pU3AOQukw6ePghviMmDCx6UhfUL/dQ09TyFubusTbg238pKY2GsOp9U8OY97xk5Ho/KOz2bTJo8frHcfMldEscTm90nfi9v9bxKE5rJrIWRDWCTUTe1TbYd/eiaXHH7K3JR6QRZVLdUWpqWSS1A7gbIdYcel8M9h4xncLjtTxEeYSxmIVqZgBEqxNYA3mkAA+xtqAjT700cZRmsVSG6nKP2vn3S3veaXFwxQxY03Ck3T/mB7Ol4Xg50bZEY3N3IyqqXlUFR5aHxMr/uBrm2cZnUlDbKK5275YnD67A/tBlICtAzrZk9vaw6eTnnd7EcJka0PaoxzGdQptE7IFs+CCHOiABEgwbkzOAR2f3+T6WypF6urL9Dlk56RvZ1bpY97Rulb6QXZnGbGW2JfFmwXObUtMjChmXSUDFVdrRvlycOrcM1+ximtHYk0KCRbzl1oQdyPHkhFuYY3byQJcZHwxhcCfSLtJE8F9H99F6f8zKvCzAY6ZZ/nHhYDnY+ITNqvib3zH1KDp7aLy+deE56hk7LrJolsqDuZplT2yKlwTIzzW/bHpeNx54z+WDA7t6MYhJBYz0NtxWsYXxoEJjanD8E7IgPFSvD7lFqKbdy44La7MO9Lm3OAFxsdxbgygdhlkh0QA51rZe3up+RqROWy91X3idVpZfDfSszpMJesKQFaBsp0BGzBrW3gnkuTGFETMSGK1ApsdLC5sDqd91NF2smcrNxnePOKuxn9SMES9x33+vZLB8PHZEvzdjsalNZkIATI1LbBLINYsPZpuiVp/X3KTrADIX5YSCfyX6FAjYWxqolyZPXeuUEgl06UUwOSuTYFkoASlR7Mrp8XFBesLig5IWTYiPWMEw+k65YiDtzCvbTydz6+9nH9DVxrgOy6GhcmnEJyifPbmIMAeqRXIgsYlOqFBuxcpduYqtWpvTMUuAunUP/lBFUySiXYwRlcbMqmAqd3CPQg62JMWze83gqPV0zs3RpegSJY7zeoXltt5cwxqi/lgSLLaUgeZgQboC5i1h01ZMcelXRpatUQTNrnh+CwIymF09TQcSonqo0T27IdMMuacbYqvRf49IJCzO02MMuqHFhM4cbpW3gJpsuLE+ZWPXgkadrspkTpXqDZ2pqS10dQGNxaO3pkRTkcgSce9PyDDHWRdl4mF0UT2tBWbo0jkJSW1BvdLIxbCEYbICTMrXHmsal3Rg/+SkWdu5qAXEE57GzmPG6cuCaNfUF/hArXboXmVpjDY+yfjJSDh6Jae306foag0PfnC6NoSkxzEuOeoi5/HBJXIybxbWnsWJ2aWIjEStdugOpWSvZkIu8yusi6VhrUca1Z/0NIH+JjFN1acoxcesU1Dy5IbOiyLl2V5uXqX7o2EGXbkNmsacypwDuuDk3Ke/h13mjWiybYOPSGhQKzI9TgGvTLtlkptcpNmIN4xTShhOIeeiV3jFbmRPpLmx2aXMwtC6TCDdXNOORz6WcAezZpW3v3PKsXt5JsmmarCM+ErHC+wIHWNBK5nMRY5guxhTC5Uc582xLcuTRaOv8Ic+svkZqy+olhDgNUaZyMwd3cM5FV7e7uXJ/iZnaKzZiDboPSIZZqabPHJKsYXwm/2gPe9mhArbNcu2nPCkhNTen9iZ5YPF2uf2KB2Ri5VRIAziAZmJsK2eebcqZL4SIidgAdphYoY/5WoYfkHhfNvvKQn9MahPBWIvbwwXL3uRt8xWIhlCgRK5r+qqsXbBF7rrqMWnGuyYLWsGTA2wwyYG+IPK8QN9HrHrw2IjR17Mx36tQgvAjriYBJzyFfVHHRSqE6Ctz65ab9N+eV+Rv7z+JR8KvAaqNQSPDiSpMYooRiRELB8IjTH4aFHGPNVnlS5xIEwczT24SgCU48nhCZi2O9mJpRvUS+eGcp+XH8/4sV+MpSSKWAZ9xXIhLc+GJidiIkTpQP1Z0onEr85636ixmkHVjblD2kyTlvOfUvN247H0w8wUaOGMuVnyu6mr57uxfy8+u2SaLG1dKaSiMhSwsfhULsREj5RnAJoPvoMj5WFN3NZbTiddh3aWNdfGjFk/ndH/W5QqDdPl+5YaKS+UbMx6Sn1+zQ26YfAeA537vRQzumTQvRwYbZVOfBOFF2m6sRgsffPFtfzY6fPJHcubs3mxNGXXwKGPdipJpcvXk5zPax7KCXwU4d96DF2qJVy0JC3NymP2X5OzoZ+VZjY/JnEl/kLpxiKsgoxRuwth11lSultV2yj1fRN2JgQRMa73zpgBGYO9Ahw3soB+LeDtrvrJ0plxW/ysA/5M0XrQSLosP0tBo4tVxE89YBMNTHUnFjBlX3YkFmHZ6J6KeKQSXLvqF+Ei0Wzp7N0h331/wbqgf8qxYyOIKS3m4WWZPss+eUyYbg0K+F+IpFub8ULAdMbwKPMbBGvi5dCsJ1cnk6rvlqkkvgH9fSkLV1uLY3YxLc5c7D0RdqTN1dxja06fNAMwO7tuIe5mne/jFM9u9FApWwcW/Y4BPqVkj5SUTXXx7e41NnjqqK2OGe7N935F3Zn62hBTH7h2HQHhosRSJf9S/Jf7eqV8UO7Co/tSNOlJX6pwLWE5fw6wX3IdpWV1aVwixMIRdjp/z7QV48x1UITGt48eaUxf9II06Ol19v8KjPjkBswMEdUFQK7LrWWac6JGN5U+LqIMnZtdTR+qaT5+cLp0+GHGyBnUX/ufDXuD8Sg+nGB5OLvwPxBU44vn/518AFDQ5vhxYCvD3I13Y/+ThBe2A8xuve7BpjOW/8TyMjenl9LmLLRe1aeUTDks3wuqr0O/C/ketbAsB8J/Jf8X7H99c7CZVbaLrAAAAAElFTkSuQmCC"

/***/ }),

/***/ "C0Cu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/bid/nnsneo.ts
var nnsneo = __webpack_require__("8L/I");
var nnsneo_default = /*#__PURE__*/__webpack_require__.n(nnsneo);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-42c67861","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/bid/nnsneo.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container "},[_c('div',{staticClass:"title-menu"},[_c('ul',{staticClass:"menu-box"},[_c('li',{class:{'active' : _vm.showType == 1},on:{"click":function($event){_vm.switchRoute('auction')}}},[_vm._v(_vm._s(_vm.$t('nnsneo.auction')))]),_vm._v(" "),_c('li',{class:{'active' : _vm.showType == 3},on:{"click":function($event){_vm.switchRoute('myneoname')}}},[_vm._v(_vm._s(_vm.$t('nnsneo.myneoname')))]),_vm._v(" "),_c('li',{class:{'active' : _vm.showType == 4},on:{"click":function($event){_vm.switchRoute('bonus')}}},[_vm._v(_vm._s(_vm.$t('nnsneo.bonus')))])])]),_vm._v(" "),_c('div',{staticClass:"content-box"},[(_vm.showType == 1)?_c('neo-auction'):_vm._e(),_vm._v(" "),(_vm.showType == 3)?_c('my-neo'):_vm._e(),_vm._v(" "),(_vm.showType == 4)?_c('bonus'):_vm._e()],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var bid_nnsneo = (esExports);
// CONCATENATED MODULE: ./src/pages/bid/nnsneo.vue
function injectStyle (ssrContext) {
  __webpack_require__("1Mcy")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-42c67861"
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

/***/ "DaUf":
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
var importpack_1 = __webpack_require__("VKSY");
var entity_1 = __webpack_require__("6nHw");
var Bonus = /** @class */ (function (_super) {
    __extends(Bonus, _super);
    function Bonus() {
        var _this = _super.call(this) || this;
        _this.currentAddress = entity_1.LoginInfo.getCurrentAddress();
        // this.currentAddress = 'AeYiwwjiy2nKXoGLDafoTXc1tGvfgUuKdY';
        _this.claimNum = '0';
        _this.isClaim = false;
        _this.claimState = 1;
        _this.historyList = null;
        _this.isPage = false;
        _this.pageMsg = "";
        _this.initHistory(_this.currentAddress);
        return _this;
    }
    Bonus.prototype.mounted = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.getClaimNum();
                return [2 /*return*/];
            });
        });
    };
    //初始化History
    Bonus.prototype.initHistory = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var res, list, i, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.api_getbonushistbyaddress(address, 1, 5)];
                    case 1:
                        res = _a.sent();
                        list = res.list;
                        if (list.length) {
                            for (i in list) {
                                list[i].blocktime = importpack_1.tools.timetool.getTime(list[i].blocktime);
                            }
                            this.historyList = list;
                            count = res.count;
                            this.isPage = true;
                            count > 5 ? this.isPage = true : this.isPage = false;
                            this.pageUtil = new entity_1.PageUtil(count, 5);
                            // this.pageUtil = new PageUtil(20, 5);
                            this.pageMsg = "History " + this.pageUtil.currentPage + " to 5 of " + this.pageUtil.totalCount;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //获取claimNumber
    Bonus.prototype.getClaimNum = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.sgastool.canClaimCount()];
                    case 1:
                        res = _a.sent();
                        this.claimNum = res;
                        console.log(res);
                        return [2 /*return*/];
                }
            });
        });
    };
    //提取claim
    Bonus.prototype.getClaim = function () {
        return __awaiter(this, void 0, void 0, function () {
            var txid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isClaim = true;
                        this.claimState = 1;
                        return [4 /*yield*/, importpack_1.tools.sgastool.claim()];
                    case 1:
                        txid = _a.sent();
                        console.log(txid);
                        this.checkClaim(txid);
                        return [2 /*return*/];
                }
            });
        });
    };
    //提取claim过程
    Bonus.prototype.checkClaim = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.getrawtransaction(txid)];
                    case 1:
                        res = _a.sent();
                        console.log(res);
                        if (res) {
                            this.checkClaimAgain(txid);
                        }
                        else {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    this.claimState = 2;
                                    this.checkClaim(txid);
                                    return [2 /*return*/];
                                });
                            }); }, 10000);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Bonus.prototype.checkClaimAgain = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.getnep5transferbytxid(txid)];
                    case 1:
                        res = _a.sent();
                        console.log("nep5 tran----------");
                        console.log(res);
                        if (res) {
                            this.isClaim = false;
                            this.claimState = 4;
                            this.getClaimNum();
                        }
                        else {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    this.claimState = 3;
                                    this.checkClaimAgain(txid);
                                    return [2 /*return*/];
                                });
                            }); }, 10000);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Bonus.prototype.getHistory = function (address, pageUtil) {
        return __awaiter(this, void 0, void 0, function () {
            var res, list, i, minNum, maxNum, diffNum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.api_getbonushistbyaddress(address, pageUtil.currentPage, pageUtil.pageSize)];
                    case 1:
                        res = _a.sent();
                        list = res.list;
                        for (i in list) {
                            list[i].blocktime = importpack_1.tools.timetool.getTime(list[i].blocktime);
                        }
                        this.historyList = list;
                        minNum = pageUtil.currentPage * pageUtil.pageSize - pageUtil.pageSize;
                        maxNum = pageUtil.totalCount;
                        diffNum = maxNum - minNum;
                        if (diffNum > 5) {
                            maxNum = pageUtil.currentPage * pageUtil.pageSize;
                        }
                        this.pageMsg = "History " + (minNum + 1) + " to " + maxNum + " of " + pageUtil.totalCount;
                        return [2 /*return*/];
                }
            });
        });
    };
    //排行翻页
    Bonus.prototype.next = function () {
        if (this.pageUtil.currentPage == this.pageUtil.totalPage) {
            this.pageUtil.currentPage = this.pageUtil.totalPage;
        }
        else {
            this.pageUtil.currentPage += 1;
            this.getHistory(this.currentAddress, this.pageUtil);
        }
    };
    Bonus.prototype.previous = function () {
        if (this.pageUtil.currentPage <= 1) {
            this.pageUtil.currentPage = 1;
        }
        else {
            this.pageUtil.currentPage -= 1;
            this.getHistory(this.currentAddress, this.pageUtil);
        }
    };
    Bonus = __decorate([
        vue_property_decorator_1.Component({
            components: {}
        }),
        __metadata("design:paramtypes", [])
    ], Bonus);
    return Bonus;
}(vue_1.default));
exports.default = Bonus;


/***/ }),

/***/ "GEdN":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABIlJREFUWAnNWV1sVEUU/ube7d7bFkQtaKlRU7q8YHmRhBB/UGP0xQfQANaGlvhKxPiXmGgESuIbRh8MT0bTVrEiEXkwPhBjTIgBSV+kalCqAU35UVuFdv/u3jucM917uz93253du6uTTubMzDlnvnt2zsyZU4EaS3psV4+XyW6BkBtIRVdBZY1TQZVi3LDix+2+4Ume0C1CR0CODNyWFM5zkHiSaq+OLAQmqB5rky3visHRq9XKVgVQHtm9LJ2ZfllKvEJ1WbXKw/iEwCzVg7Z161tix6HZMJ7CsSUBJkf6n5KQhyDl7YWCddNCXBEQu9sGD3+2mC6j0qSUUqRG+/YB3tHIwfGi6oO9o7wGr1UJR+iEPPJiayp9eZgEt1cSjHJcCPFpq925S+x4O1Wqt8yCynJNBMeA2BB5g5QZrAxg+sNn9jbLcoXW4jV57cIxposQs0PwniNPLRovFWpUn7xbAsa2QscJgPBRkkzPnG+IQ+h8EXl3m31Lwj+CYr4sn3OEX/8osZYjlngI5l0bYSwncTMOef0yvOkLcCaOQ1675C9RXUverbAAQyygLMg3RArOpO4hbHbfh/jGZyGs8LNbei6c8Y+Q++nL6sDlufgwb0VLD984ykmScPfogov1boH14J4AnDf7J3IXz8C9NAHpzJ8WwjDRsmEnjFVrtQAyFnWlklT+J/a2amlgZukpEZm+huzpD+BeOLWgwl4B+9FXYXR0QxgGYuueQPabdxbmq6H4vgf2Co5K3EzmfDUypTzmmgfg/TUZus+M1ethP/aaEvGuX0H62Aul4kv2TctKxFTItCRrOIP768nwCRqVBMovwr7JJ7Vaxmbk4zktwWqYjVWJgM2buRjQWgTFmuwkHGxGW2gPttzbH+jM/fhFQGsSXdEDZAd5/A0Y7R0Ki3PuBFzy7hpLxADj7QTudRg336Hw5H75Gg55eB2lKwYp6P6jvwiK9fBLBO5OpSn381fInnqvPq2EjZ1E8y4KX9Psvh9m5zo16V49R2fj++GMOqOEjfcgv8DqLubdmwIdzvcUxecP8mCwNmIqMoDCag8gyJnfA7pOYor34Dh97sKZUKPG7HfDEPE2Jc3XXySFsNV11UUCYhElfNWpcGtupO+s9kO8RLGxMgGj8x7I5DTc376lH8Ut4dDs0kO/fXBs/Xw0Qy/+egCyg8Q3Pw96nSkUbs9mZE68qYmohJ0xUWEngUpHUJDIdC0ltvaRABzLm6t7ITi6rrFwwMqYWFwB5MiVBg/WqA8ylykTDRsrY6owwFj8/I0CyHycKyEzLMRIFYTDhnNnP4fMzgVTzg8UHKT+CfpaBGFQWPJC85sm36nr2UnvEqOjB3Lub8h//9DC5DOT5So/O30mzpV4Hvb7/Wa29DrY3zowNlS4ZpEFeUKlPkb7P2l2dkHlZwYOP01tUeQS7EEfNTOoRA4ldPyxRrcKHCePSsDxumUW9MGwJefzNNjXqFQI7zmqQ/bOjw+EgVsUoA/0v05gVrSgD5Db/3UKuAgoJ9EpC0EZsK3aV2Mjk+iFIH26Wf+GuAHWXtGCzfAaKQAAAABJRU5ErkJggg=="

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

/***/ "Gieu":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/Valert.vue
var Valert = __webpack_require__("shbj");
var Valert_default = /*#__PURE__*/__webpack_require__.n(Valert);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-d8a19e9e","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Valert.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.show)?_c('div',{staticClass:"alert-box"},[_c('div',{staticClass:"alert-warp"},[_c('div',{staticClass:"alert-title"},[_vm._v(_vm._s(_vm.$t('nns.alerttitle')))]),_vm._v(" "),_c('div',{staticClass:"alert-content"},[_vm._t("default")],2),_vm._v(" "),_c('div',{staticClass:"alert-close",on:{"click":function($event){_vm.closemudloe()}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])]):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_Valert = (esExports);
// CONCATENATED MODULE: ./src/components/Valert.vue
function injectStyle (ssrContext) {
  __webpack_require__("cou+")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d8a19e9e"
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

/***/ "HWxh":
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
var importpack_1 = __webpack_require__("VKSY");
var entity_1 = __webpack_require__("6nHw");
var cointool_1 = __webpack_require__("pLPz");
var Contract = /** @class */ (function () {
    function Contract() {
    }
    /**
     * @method buildScript 构建script
     * @param appCall 合约地址
     * @param method 方法名
     * @param param 参数
     */
    Contract.buildScript = function (appCall, method, param) {
        var sb = new ThinNeo.ScriptBuilder();
        sb.EmitParamJson(param); //第二个参数是个数组
        sb.EmitPushString(method);
        sb.EmitAppCall(appCall);
        return sb.ToArray();
    };
    /**
     * @method buildScript 构建script
     * @param appCall 合约地址
     * @param method 方法名
     * @param param 参数
     */
    Contract.buildScript_random = function (appCall, method, param) {
        var sb = new ThinNeo.ScriptBuilder();
        //生成随机数
        var random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues(new Uint8Array(32));
        var random_int = Neo.BigInteger.fromUint8Array(random_uint8);
        //塞入随机数
        sb.EmitPushNumber(random_int);
        sb.Emit(ThinNeo.OpCode.DROP);
        sb.EmitParamJson(param); //第二个参数是个数组
        sb.EmitPushString(method);
        sb.EmitAppCall(appCall);
        return sb.ToArray();
    };
    Contract.buildInvokeTransData_attributes = function (script) {
        return __awaiter(this, void 0, void 0, function () {
            var addr, tran, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addr = entity_1.LoginInfo.getCurrentAddress();
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
                        return [4 /*yield*/, cointool_1.CoinTool.signData(tran)];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * invokeTrans 调用合约，允许转账
     * @param param[0]:script
     * @param param[1]:address
     * @param param[2]:assetid
     * @param param[3]:count
     */
    Contract.buildInvokeTransData = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var address, script, have, addr, assetid, count, utxos, tranmsg, tran, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        address = entity_1.LoginInfo.getCurrentAddress();
                        script = param[0];
                        have = param.length > 1;
                        addr = have ? param[1] : address;
                        assetid = have ? param[2] : importpack_1.tools.coinTool.id_GAS;
                        count = have ? param[3] : Neo.Fixed8.Zero;
                        return [4 /*yield*/, importpack_1.tools.coinTool.getassets()];
                    case 1:
                        utxos = _a.sent();
                        tranmsg = importpack_1.tools.coinTool.makeTran(utxos, addr, assetid, count);
                        tran = tranmsg.info['tran'];
                        //Parameter inversion 
                        tran.type = ThinNeo.TransactionType.InvocationTransaction;
                        tran.extdata = new ThinNeo.InvokeTransData();
                        //塞入脚本
                        tran.extdata.script = script;
                        tran.extdata.gas = Neo.Fixed8.fromNumber(1.0);
                        return [4 /*yield*/, cointool_1.CoinTool.signData(tran)];
                    case 2:
                        data = _a.sent();
                        return [2 /*return*/, { data: data, tranmsg: tranmsg }];
                }
            });
        });
    };
    Contract.contractInvokeScript = function (appCall, method) {
        var param = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            param[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = this.buildScript(appCall, method, param);
                        return [4 /*yield*/, importpack_1.tools.wwwtool.rpc_getInvokescript(data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * invokeTrans 方式调用合约塞入attributes
     * @param script 合约的script
     */
    Contract.contractInvokeTrans_attributes = function (script) {
        return __awaiter(this, void 0, void 0, function () {
            var addr, tran, data, res, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addr = entity_1.LoginInfo.getCurrentAddress();
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
                        return [4 /*yield*/, cointool_1.CoinTool.signData(tran)];
                    case 1:
                        data = _a.sent();
                        res = new entity_1.Result();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_postRawTransaction(data)];
                    case 2:
                        result = _a.sent();
                        res.err = !result["sendrawtransactionresult"];
                        res.info = result["txid"];
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * invokeTrans 调用合约，允许转账
     * @param param[0]:script
     * @param param[1]:address
     * @param param[2]:assetid
     * @param param[3]:count
     */
    Contract.contractInvokeTrans = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var address, script, have, addr, assetid, count, utxos, tranmsg, tran, data, height, result, olds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        address = entity_1.LoginInfo.getCurrentAddress();
                        script = param[0];
                        have = param.length > 1;
                        addr = have ? param[1] : address;
                        assetid = have ? param[2] : importpack_1.tools.coinTool.id_GAS;
                        count = have ? param[3] : Neo.Fixed8.Zero;
                        return [4 /*yield*/, importpack_1.tools.coinTool.getassets()];
                    case 1:
                        utxos = _a.sent();
                        tranmsg = importpack_1.tools.coinTool.makeTran(utxos, addr, assetid, count);
                        tran = tranmsg.info['tran'];
                        //Parameter inversion 
                        tran.type = ThinNeo.TransactionType.InvocationTransaction;
                        tran.extdata = new ThinNeo.InvokeTransData();
                        //塞入脚本
                        tran.extdata.script = script;
                        tran.extdata.gas = Neo.Fixed8.fromNumber(1.0);
                        return [4 /*yield*/, cointool_1.CoinTool.signData(tran)];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
                    case 3:
                        height = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_postRawTransaction(data)];
                    case 4:
                        result = _a.sent();
                        if (result["sendrawtransactionresult"]) {
                            olds = tranmsg.info['oldarr'];
                            olds.map(function (old) { return old.height = height; });
                            entity_1.OldUTXO.oldutxosPush(olds);
                            return [2 /*return*/, result["txid"]];
                        }
                        else {
                            throw "Transaction send failure";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获得notify通知出去的名称
     * @param txid 交易id
     */
    Contract.getNotifyNames = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var res, notifications, methodnames, index, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.getNotify(txid)];
                    case 1:
                        res = _a.sent();
                        notifications = res["notifications"];
                        methodnames = [];
                        for (index = 0; index < notifications.length; index++) {
                            value = notifications[index].state.value[0].value;
                            methodnames.push(ThinNeo.Helper.Bytes2String(value.hexToBytes()));
                        }
                        return [2 /*return*/, methodnames];
                }
            });
        });
    };
    return Contract;
}());
exports.default = Contract;


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
var entity_1 = __webpack_require__("6nHw");
var importpack_1 = __webpack_require__("VKSY");
var login = /** @class */ (function (_super) {
    __extends(login, _super);
    function login() {
        var _this = _super.call(this) || this;
        // Data property
        _this.Message = "hello world";
        _this.wallet = new ThinNeo.nep6wallet();
        _this.otcgo = new entity_1.WalletOtcgo();
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
        if (importpack_1.tools.storagetool.getLoginArr().length > 0) {
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
            var loginarray, data_1, error_1, result, info, data;
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
                        return [4 /*yield*/, importpack_1.tools.neotool.nep6Load(this.wallet, this.password)];
                    case 2:
                        loginarray = _a.sent();
                        data_1 = {};
                        data_1.type = entity_1.LoginType.nep6;
                        data_1.msg = {};
                        this.wallet.accounts.map(function (account) {
                            data_1["msg"][account.address] = account.nep2key;
                        });
                        entity_1.LoginInfo.info = loginarray[this.wallet.accounts[0].address];
                        sessionStorage.setItem('login-info-arr', JSON.stringify(data_1));
                        entity_1.LoginInfo.setCurrentAddress(this.wallet.accounts[0].address);
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
                                    info = new entity_1.LoginInfo();
                                    info.address = this.otcgo.address;
                                    info.prikey = this.otcgo.prikey;
                                    info.pubkey = this.otcgo.pubkey;
                                    data = {};
                                    data.type = entity_1.LoginType.otcgo;
                                    data.msg = this.otcgo.toJson();
                                    entity_1.LoginInfo.info = info;
                                    entity_1.LoginInfo.setCurrentAddress(info.address);
                                    sessionStorage.setItem('login-info-arr', JSON.stringify(data));
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
            var res, login, data;
            return __generator(this, function (_a) {
                mui.toast("" + this.$t("toast.msg1"));
                res = importpack_1.tools.neotool.wifDecode(this.wif);
                if (res.err) {
                    mui.toast("" + this.$t("toast.msg4"));
                }
                else {
                    login = res.info;
                    entity_1.LoginInfo.info = res.info;
                    data = {};
                    data.type = entity_1.LoginType.wif;
                    data.msg = { wif: this.wif };
                    sessionStorage.setItem('login-info-arr', JSON.stringify(data));
                    entity_1.LoginInfo.setCurrentAddress(login.address);
                    mui.toast("" + this.$t("toast.msg2"), { duration: 'long', type: 'div' });
                    window.location.hash = "#balance";
                }
                return [2 /*return*/];
            });
        });
    };
    login.prototype.loginNep2 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, login;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mui.toast("" + this.$t("toast.msg1"));
                        return [4 /*yield*/, importpack_1.tools.neotool.nep2ToWif(this.nep2, this.nep2pwd)];
                    case 1:
                        res = _a.sent();
                        if (res.err) {
                            mui.toast("" + this.$t("toast.msg4"));
                        }
                        else {
                            entity_1.LoginInfo.info = res.info;
                            data = {};
                            data.type = entity_1.LoginType.nep2;
                            data.msg = {};
                            login = res.info;
                            data.msg[login.address] = this.nep2;
                            sessionStorage.setItem('login-info-arr', JSON.stringify(data));
                            entity_1.LoginInfo.setCurrentAddress(login.address);
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
                "main-layout": Main_vue_1.default
            }
        }),
        __metadata("design:paramtypes", [])
    ], login);
    return login;
}(vue_1.default));
exports.default = login;


/***/ }),

/***/ "Iced":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABNBJREFUWAnNWW9oW1UUP/c1Tdo1WUbK2mzQsa0VRdr0QxE3BJkM/eDmlroFQfAPiIKiIHYgfnBdNwTFf19UnE7Zxr64dGvHBo4NZSDi/DDEOHCMzdZ1dE1puzWma5c/73rOTe5L2ryXvD9p9H659917/vxy7rnnnnvCwGbruRFuz6hsJ+e8hwOsZRzWUk/iGMA4ZzBOPWPskkvhpy6tG75uRxXKMN9CE70tfIG/zlTo5cA7zXMSaHaZKzDEGthnseDQpFleUwC3TEa8M3PpPs5hDwD3mhWuT8eSjMFHgab6jy+0RJP6NIXZigC7R3ufVlX1C2RpLbBVZRRXFOW139cPnSwnTTFaRN9ioZFwv8rVQaSpNjhS20qySQfpMsKhu7B5LNKYTKeP4HZGjBirO8+i3vr6F35pi84vlVtiQfo1tQVHkHiEdOpZsgQg+tze2lmu2F48ktNdPCdCVmFCHAjyOU6h7D9oDLjClN3FB0cDQqFkOpm6hrCW40BY+bXxZq+7Q4Ygl+SkOGcH3CrFB2HfVti6YjO01QehgbnhRvoWXEmNwLezJ2A0PS5VmO1b81gGiEFYUNwQdzleRdaC8JNNj8I7zS+Dv86nqzzDs/DJzGE4ljitu248icF8BWunG0ccErbA37AK7iX/Lni/5S0N3Hh6En6cuwi/zsdgTs1FCxerg77Ai9DtecAYi+4K99KVSktii7kKYV26MpMqqGL1djYB700fhHNzP2vUzXWr4PPWd+FBTzvUIcjn/Tugb/KKtm5mQPc90u1llJWkMpwOh+W23bsFLt+7qutnmxq64as1wo1gDH1y281XLct3u1iHi1Im3F7LzMRwJnnBkO9mZkJbC6BF7TTCpmD07rHDXIkn5LlfI7maGtXGVgaETZFJphXGSrTkg28GntPIjs6e0sZWBoRNoUzYClMl2oDih2+CByDoWi1IjyfOwg93L1Zi010nbFW14ErFC4fWHICN7jah8OQ/58UJ19VuYpIsiGEG8+QqtU9b3oYO9zohbTBxDvZPU57rpHG8m4HdciJC8tKt8lBjl/j8beFPtNyXcsl2T9gUen3ZllDE+ETTI9rXwTvHIZsP5NqkjQFhQwtWByD5n2zXUn/LoaOesLno3Yrx5llHkpD5g5lD4FOahJiZ7KxTcYKfsDm66qqCoowQuurQigChv8J/WH2IL5Xb5bkPHsb7N56dgu+TP0EGvdBJo4d+bONwVy6bwRc/+nSnXYF0QD5cvQdwS4SIp7yPwSsT/XbFCT6qQtAglw9iOQJz14qvfCONu3yPa+CIZlNjN7S5gkbkJuYxYRWY8gApc6VyhAlOXZJ5daFkfp7fK5kzO0FYZP1Ge3ZSrQQFxM0KKab7+s4gJLKFDaDkYCp7u5jEyjiexyJ4ck6TZ3fy7PTj46nT0wETmSm4nh6zAqhAW+7ZKanytZJ98ruWPR6yfbENwwPFOhdZkBao/BAa6f0ORzWqy0g4LBrbMPQMglyUvGg+qJEhARVy8FRH5dzy97ni0VJwpLfEghIMWZJqJRjA+5etFII+hwF5AEsd+/XAlQUogYqD838sYEqAVMihWgk5sJNgLuWRDJJFMouLRIX1xSPDLV5MlvuiEglVIeihb/Xuprt12YroemBr9TfEvwXwzrg+QJoTAAAAAElFTkSuQmCC"

/***/ }),

/***/ "IjLt":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAYJJREFUaAXt2UFOwzAQBdBxhJC4AyvoZdizAtQl12i5BkvUwqUQK+7AihgPUiWLGDd2bWVm9GeVxorj90dqU4cIhQSQABJAAkgACSABJIAEbCawevO3Vzt/10s39Jq4dt5xpJdw7X6199vaOXLXiQOTpwte8Ohp0wMtDxy1pwdaNLhHp8WDW6NVgFui1YBboVWBW6AdTxLX9c7fhM/PnugyPi/teHD09H7vtqXrSnVYPJaRtT9ZE7D0zsYdrUFPwPGEGo5L0erB3JQStAlwCdoMeC7aFHgO2hz4GNok+IBO7ZyYBTM6VWbB/Oj58eBe/6JNgnPP2ebAOSx32xT4GNYUeA7WDHgu1gS4BJsEhy2QTx7QUKVYNqW+tB41oGuwDJ7safHJJSs8DoZNl3zVYnnWVIfzd1t49BSsOvCpWFXgFlg14FZYFeCWWPHg1liZYEdfvwurfJXC1+bqLDe4xNgw0Hr8pvPw3mjy532J9eCeSAAJIAEkgASQABJAAkjgnwR+AB+ukFQ0k5GnAAAAAElFTkSuQmCC"

/***/ }),

/***/ "JPeH":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABoCAYAAAAOy/VVAAAAAXNSR0IArs4c6QAAGItJREFUeAHtnX+wVdV1xw/wFESRnyo/Hrwr8mMQRIcmEydtUTGZ6UyaxDSVSdsYTcaJNQbT0jRYRgF/4I9M0jombeI06UxD/5Jpa5KmrTYxajqTZDpRQFNRQC8/VERRFJRfIv1+jm8d1t13n3fPOffeB7bdM+ftffbZe+21v9+11t7n3HPvG5KcgOm+++4b9sQTT3xwyJAh86TegZNPPvnBG2+88fkTUNW2VRrStoQOCli1atWYd955Z8nRo0eXSOwZTvRhlb9y66233u3q/lcUTwgCbr/99vEHDhz4UwH/RaE6OgfZI6r/gEj4Vc7192R1z/HUevXq1WcdPHjwzwT+tQL/tBa6DFNIulZtrm7RruXl2267beqhQ4d+X/J6daxXiPvR8uXLd7fs2IUGx8UDBMAUAfDnAv3zmtMpsXn19PQkp512WrJnzx5/ee+wYcMmKlS95SvLlNX3g0eOHPmB+oy3fiLh1aFDhy7Tte9Y3WDlg0qAgO8T8MsE/Oc0weGxSQL8xIkTkzPPPDMRKMmGDRsS9cmaCqzP3HLLLWuyihIFATxG4G9Ql6mxbpL99xrz82p3bMBYww7WDe2grFxRmtCMm2666bsKN5sEPmGkCfyTTjopmTp1anL++ecnkyZNSmTpiQBJxo/PDNXkf9YKZXMt8N9Unyj4yJJuV6rNT6TvhLKyq7bvqgdowZwj610u5f5Ax7CYkoq/qcWfccYZqcWHbbQ+JNqS+uqjIme6QKr7ylblFStWXC6A7/PtxowZk+zbty95++23fTXl52QQH1WfX4cXOn0eBaXdQQTO/IULF36j3+LOl7wmTxs+fHhq8bVaLRk1alRq7bFxCUlvvPGGD0MYzZ5HlGLtY3Va7Ccp9PyrrmXrzSmnnJLMnj079bDXX389JGGsyPr0RRddtF7DbI7J7FRdEzDtCBbwI1euXPktTXadJoDFNckfMWJEcvbZZyfnnXdekmf1oQ5hGJLcK3UU9l550d+p/TiTS2g755xzUo/DEM4999zk9NNPt8tprvan6/ihQuf1DRc6fFJ4Eq3GFfgjZPE/l9IXxNpiccT2cePG5Vp7rB91IjRZt25dIvlZE4G4SIvxT7OKnILCCFvcv/GXWWtY6H1Sm2Tbtm3Jrl27fHVa1lj3anH+oubYFKuaGpesaLLQkv2z5prA6hj4I0eOTGbMmJHMmzcvdXesr2xiQR47dmzY7bNhRXiuNWim6r7m6wl3Z511lq9Ky+jV19eXTJs2rclANK9rRP6/33HHHU1KNAkqWdFJAhb7sQF+5syZydy5c2Pg+aaFyhMmNG1MPnnXXXeNyuvM86TDhw9/T+CNtDYQOX369CaA7To55KA3bX2SnEv379//i35S/aW2yh0hQK6JnIYgSrhhl9GphOWyY7IEsG+++WYD6XaN/Mknn1yuNhf6Oqzby/DXfHn06NHJnDlzEtYHnyRvlnZ1v9R8F/n6dsqdIoDg/B9eke3bt6ex29fllXV/kLz44otpDN65c6ff8WRdCBERL4iGIS2cvyGwbso6q4AxRPr7Jg1l1iwWZ+7GgzRW4egBjcFdfNupfEDOGVKuOVsuv0ETz8yUhY4Fb6D06quvJs8991zDAssdcK1Wa7oJgyjujH2SRc8SGJusjs2AFu3HdD7H6rjJYw1iS1s2sfBv3bo1eeWVV5q6Ss+7FWK/vHjx4iNNFwtWdMQDGEsgPC0r/aof96WXXkreeustX9VQZv+9ZcuWBvBpwKSfffbZ5PnnGz8CICQQinzSTdRV/lwGcJfOM/C5BplVwKcvxsC2ube3t2ntkJ5/olD3jyK9PLMIV+oYAQhT7LxdJNQpkwRGGlbePWv+S7gZKL3wwgsJHuJTGEY0xmcEQDoPbTkvFShLwvZ5axH6QXaRxJrGbg5CfJKMj8vjvuXrypQbl/oyPSNtH3jggbcvueSSLVLqD+0yD9KwXHZFPrG3r9frDVWa3FfVd64qszvWvXv3prHbdiXcyLFXB7z+xOL/c427W3UPqpx9nsC47GhC0HjCSlhhfEjevXt3at2nnnqqyYzmjA2ZeC76u7Rg0aJFP3z44YdfdHWFio10FuoycCNZ47/IC77vW7Egh89bIpb3xs033/wXiteXqu9B60+/HTt22GkKZuyeQPK+KQJ6rSGLNqHDiKOeMQltmzZtSh9vGImsLUaI9c/LMSQWZxZpnyT70/68aLnjBDCwFsYvCYAs+Icg0oaYDEgujdUnY7MURh7XtZWuPl0AteXMqsIwpAufEJh/lDVQgQ2AXy/QYePGjam1+3a+/PLLL6fW7etiZfQOdMcjGxenWMdIXVcI0AfoW6XQrX48JseTR0tMwANEvXZRqRWp79d12vAI1C/I9PN7dLXPdl7IwTonT55MMU2A//TTTyeeRLumPItl1IVrjmuXFk1WuLnQfP4zbFvkvCsEMLB2DV+XUhu9Eri5wMqqwlCiyV2tEHayjrcVOr6cNVSBuMt6YCniBekliLUHbVQQdp555pmm3ZjWhf9WuFug9jwqz5L/8Cer7C8MAP5PJW9N2L7IedP2SSHgk+r4JR1TBdZ+KfisDiy6rkG2avHZqsVomz5D3an6Y2gGo11zzTWHJesLqn7ILmE1LKD2LIannMR3t6BNkswr1f5vRcKD6v+Ixr3I+nOzZl4DASygnlDasV20+Mw1trkRy/+xxvmE5O/TcYXJJ+eeIZYAnxCmxxHh5YeEy0elb7HtVNC7IQhrL8+HJ6uDNnmnLJR1HVs1mZQgckiiXgvVi9ygaIL/ICCy+MyiyKNomyhPILlfcGm7HlPPvP766w9qUgtFziPuWnpDZQBj2XiGJR4zzJ8/P4vPEdk0fUie97tLly7drzXnXD2qflz6ZSGMhTv0LoXGNIRFwP+xZH0MWaZD2TwjQJOdpsnWJSCrKyvMtxcZPLpl+/K8Jvh+5dkk2cpZmGBy3N0SKiyp71I9av4rzkXgz9T/t+waj7PpSyJeY+GWWNgvuOCClADuXLnDDtLjMoCFmus+HSM1Jo/P51sbCMQ4ZERWxbqUWj6fzAXpQcn6uOQ0XQjaDXiajSTwL1PLjoDPiJpYj46ajt/UaQY+19iHP/bYY8n69euTzZs3Zw/I2A4yUbn7iiVLlvTSVpNseJz82muvZc+KIBKPskSYsLWC9SZIhM6PAL50GiLwv6M8A5+2PKwrAr4M5N86AT5jZtpffPHFxF4sNU1TpkxJn+PwZJAbFNyesKHB07gr5a1p5ZzYz6IHcCTAI17rGKFt5FLd3KwUIJdrzKNqO5R2WCRt2I+zE4I0vyNBJusMuUtvSvcPK8Ru7q+7Q/pf666nz538zolxnnrqqVS+byddfqQQ9XvLli3L7lX89bJlvwjXfGcAB/i8u0MmyOQBMJYbqF5mq7IHDUsUCHhkqiPE27pBLAYcrJ962tKXA/Ctrv/5z1H1u1qhbD3jywOuV7sbvC7MtVarZVXMiW0r8wrSDzAIrU+HgvrKp56APi/F77N9vZWZPFYYPmKw68R0I8cThGX1h5mmHYwnwK8JJjPMfXtAB/B+0NOmECM9cdXvak35mu5Dtum4EN1px3VI9Y8r0JndTgT8+7XDWszuLtSjnfOMALlkAwEsSO0kJsezE45YIoQZMUyaMMIBQXiPBzfWv0gdJOpgneNBFIvuFHvTju0sz/rRk/WC+UIKizc6BOmfBP6nOg0+Y6SLrtxygib8sg2KhSxYsMBOByXHK+yZD+QYUAyOlfKmHISZB5EX8RKvPGuMrRfcBOYZh++jMrfv/6XjOR1b5WnpllsYscrvEHbvLmA6qZJSDxD4HbX+Kor4NQMCfAIov0DaNUgwL4rlIUF4miWMrGDiI7FL+o8sbPZ7KPc5fGgBGXXI4aAMQdrAbON+Rue5yRY4totZo1bxP2vYwYJ3+xC4vHCIZ3DEEjLY6vp58e4PJDBWXr+YrAHqhkn+NF3n+G0/FgTp+ddR7bx4YpB6jdr8TAv+Wj1FyKJNSoA6nlAeEE64ikEAsgcEwO3ZkwBJb+YACc+JeQ9Eea8MdSp4PkTtJkmPScov1PEphdqbFbZ4dPELZKQEaCHq81ZXZcIIayd5D/DAITPPAwYaD1B98rsjKxOGWu3k8sih3uvsxxqorLlNENZr77nnnhmEp5QAVdR8pyoT9v2rlL219cfXTEwVg/DxHkHsdiwVDT/04R6BI5YwFIgwMthIMK6RFnqhyVC/Xu22fkfn308JUOGECkGeDJSuYhCA4FMVAnz/WJlQ1mqrDSEcPLnlJWNLIiF9PS8lQIL6YNNSFYuzvlVyLN5CIHp0gwCvl4UgX9eNMgSBJUe469K19MONoXfeeedoTTp7hQ1LKeqinVLaAw4B3hiwfm+9RcfsRAgqOlaRdqFHao51+vUobh338OMXM7wB8AC9HWMIJ4w1WhosD7DxyEOD4D6BelamGgVLVeKt9a2aewLwBsDjgRtPPSnzCNoeM3Mna4sdbS10+bHxIC/TX6M82ARgVN7LZQyH9D2K9BWWHk2gwQMGO/4DiFcu3AERDgE5BjR9SVg3Mda8BnmhF5kHWNt3ew7O39D6Neo26ZEuuizCDQQcDw/wBPgy8BTRB4v3/fAcvMQSe337LBnrNzLserfzMBxqvDT8MG5TCDreHhBaehECQgBDi/MhZ7A3GOgW6qOqOvUkPjZseJjCqx9YCBOHjMFQ2MfrUNlOEOB3UZ6MdyHo/t+BPKBHYG/HhS3xAhWHJZQ3MmI5BLXj0v4eAOv3oQQdqhDgCUWGB92XuTYYKTQqYZqFoB4B+A01+GMpEn0+CyjEUx9TvdLmLTFyzIO8Bfq+lD3gGIIPQSysVcgNLc6PPxgeHc4xJEDX69amh/f69Uz7clXw/k7jK8zWaoAc0Jgwh39zzXcJyQEEbuGp99Ya7oCqrkdeJnr4u9Dj4QGhQUiHYx6Agvq89J/1eHSKih8ToHy9p0+W+X5ZzuQqFohMn7CAiBWkTdixsLcHmPDz5arWGhLgPWCwCcCjA32OzJo1a4fhYw/jEhGwR5Xf6z8Sff7517LIL0AASvMsnc9QsXgs1ecmrEqOLMIQR2jxVeI/cnwYQ/fj6QERw9vhv9KUERCCp0nwKU8KNAwykdhnqBDBhPMOrnPkJR92AMqfVyEgnLC3eMqd8Oi8ucTqQ300fhZ+aJ9LgBrycm4mMw8MJgRw3sqyTv0FyPFewzmyqaNsKQQnb0xrH8vDCSOfd4gIZ/aNR+RiTNTZRiEcOya7Sl0Y/zXvupeTS4AasiZkyVtSVlmwQAz2cdh34zsDAGKk+GtV1oCQAIjmoJ7nS36LbWMBPjpARiynripBoT6S09oDrrrqqhFSerwpSF4FDN8/VgZ0DiaHBxG/fWLiZVOw4DXIzPNSCLKdXGw89DNvQScO70Gc5xlY6AGS35oAfSNwmpQaQojgQHGepQAQE6SuEymUAxmWGDMPMGsTy8MJe1KryGMM86DQmv34niDvSZFX2uu+XzQESVgfg5rVA77/dRGuQQSTM1L8uZ+0HywsewKwMuRasrHtvGgegoR1AjyyedGYUEoZshnfykXl57Vj/hwt0lF5yq99mygBatTnwWESPgEWdWG9tWFSRownycrk1sb6AIwHL9ySWrtWeQiChTh0JmzE1jIjgbbhYSS1GrfIdenw6KpVq3b6tlECpETNNyoLBpPFgvOs2MDnTWZip5HlCcjr6/UKy4AFgJaw/PDcrvkcfWk7UIiKEUMdOufF/2CMXWr3OV9HOUqAAOrzDcsS4PvGykYQE7a7Xx5jcFdsKc+77HosD+O/9yrGYtyqCZBjQPM1KQzICNTbd1+R8fAeCxhO05i8nrFOfe+W9Tf94ESUAHWqYaWWqoBhfQfKUdySL1NXZcww/HjAYqHHxq6a4wGmN96n44i+MvWXa9euLbxLiRLQbQ+wCXvAfPjhepUQFJPBzRfg4MWUAYxxqWs3GfgmR4a7swz49GsiQG7SI+Umm1DyKtbo+8fKeJgHwZNB+yphL0aAvdXGsyz/439mvYBopKCDlb1uMf2pC8dTFW9Kl0pNBCiWTdXg2WcDWGI7sTNPG289TBZALBE6iKllUwiIlxF6FGNgWHnGhYEYGT63MjqH40nf7WV1biJAgru6AJuC3uI9GVzPA8X65uVeJm284ZRdA+gLaSFxNjYEQTBjQgZzUJ19CdCatcybCJAlNhBQFYxWI3vQmYxPeZP2bWLl0CI96L4c61u2DoIA3uMjQp4pK4e3IsJU8xVVYrHvn1f21spEfKoyJiHMyyHEdHsXFBKuOdT9PIqUYwQMugd44FC6igeEYCDDQhChwpNRBJgibcL7Do3T8KCtiIwYATXfsYo1+v55ZR+CQgK8W+f1D+tjBFibKoRa37zcFml3nS+Tl16EYwQMigf4EOTJYEKdIMDHfF92gLVVhPBg7XpBW/hj3wIsKL2BAAngvNf37YYHoLi3+tB6O0GADzndICAMPwp3pcMPODcQoPPJAid79InifiKemHbK/Vu2VAREeDKI21UAC0kk7lvqRggKxxNudRuvTN5AgIAYlPDjQ46/AUPxqmCFgHjDqUJoKxC74gGymgYCuhF+mJiP/976uVZ1zJAAD7ovM0YnUjieZLYfggRGzStXFQwvI1b2HhASUMUDwjWFMGZbUMbvBgGhB2iYOmOVTQ0hSJ0bPKDKYlhEAU9AGIKqjBmCgQwLQeR+PSiiX5E2oQdonPY9QAPX/ODHwwOqEOBDGvp7L/JlP7d2ynhcSIDkbasic0AP6BYBHjDvDUygCgEhGGb9yOtG+EF/SLCkcLdLW/jsh2qtvkgeEjDNd6oChu+fV/agh+BVGTOU4UH35Tx9ytaHIU/9K4Ufxs0I4P866jz7Tj5xsxuxE/DNeoj/noz36j2AcKvrqJQyAuRWDQtwt8KPBzy2A/K7l6Iz8iGNPt5wBsMDpHP7HiBrbCCgSigoApgHK0ZAERlhmzAkeBK7sQiH4wm79gnQpGp+YoPhARaKbNwqYyLDe1UYxrrhAeGaI4+r2xzK5lkIUsdB8QAPVic8wHsUkwdw8wByH47KgpPXPvSAqvcAyPcE1PyAVazR988re8A8GbSvEvZCa/QyuhF+0DMcs1MhaFA8oNsEeIvvRvhB/yB0vqZ7gGM/BARDJVLmARLaQEC3PMBbvScDnb31Fp1DaI0e9G54QBh+FOYqL8DMMSVADI5TOfsXHNxJ+okUBaNVO2K+WU9s8awCWEhAtz0gHE/zqLea90DXUwIEeIP1V7HEgQaxa976KRsZXAc4WzytfZE8BMTLqEJoqzG74gECo+FVxG6FHx9yuAv2qeqYIQHvNQ9IX8ySB+z1W0J+XI5/qoAnAEyYY1mEqbJpIAKqWGsYxtCn2wR02gNSAvTNkfX6tvoeTSj97TgmxkAceT8/AGD2RTXLIcsIixHkQ5AnHOCqhL1wR+INg1DUjXUs9DjNs61FOCXghhtueF2/GbFMOHxbxxAAaZWYvLfosD1ghJ7DT49BAtc6RYAfF7mWugE+skMPUFWd+qope3Xg0Ucf/dWiRYv4JwdTZD1TlRciIm9gYjwE8S1BvgvMb77x6+j820B+Ih5yPAmAh+fRD++JeVA4FnL9b3HyKjreSCK3X8kK+1U9x3j4T06WhNM+/fe/FXZeJU89wDpqO3q/yvcrZxY1DgHCDomD8z6B1KeB+T3k0ouABxywfYIYDksQAEkQQ1gj59wOLDz0QG/1vmwy281D69cctrYrs4EAEyYCDqi8sf+w6iy/9957T9IX7KYJgJqA6pMi/PZ0TcSkZOmcb9kfiwc6wbJVn8ogD8HLhPcXaG+/UxRbhzRW07YVC+WXVyCrGwSE8V861EO9y55HCWglpP8/SWxRO46mJALxDt6wSz2on6DpUniWyr0CZ6Ly4U0dS1RAIodP/Fsr+2EpwhzfC7ZNAZ7jNwmcQ2KZFHqA+nfHA8ooFWsrAtjkb+s/mpoIuCHXXXfd+2SpC3W8T9Y+R9tH/oveKIhRqOLfTJVDR6N4ryKEAVgImikD+BbWjKQwD9eh0AOk44lJgE0yL9fkMV3+LQhHNF1xxRXz9JXPRSLmAzpmC4zJ8pzRmjQEDY0R5NcYfz8QGwDvAVAOFvNYgiBPShgKNUY91q9MXaUQVGaAqm3XrFnzpPpyRNNll11W0/+r/7B2O/yzm7kQpPi/ScT0qjxFx9hoxxKVeJT3qrCrDOKXYV3Z89JuXnaA49VeYZDfv8vWIBGSbRRk/TVdm6ij8vzlxT/RT719SDLaSpUVaGvUE6Cz/oPFcN2b8P8zIYatdU3EpLs4qUeZnVx2n+RVVtsN8rwP+f8F46+XKf+fJaAVSPIgwnMvBCnWpySJlCMqsz3nXqnxaWIrgf9//cRE4H8AswWGKOs9Gq8AAAAASUVORK5CYII="

/***/ }),

/***/ "JxTv":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAACJdJREFUaAXlW2tsVEUUPnP3blu2LWV5lrYgPsBgfBAECQooP4wiGhH1B/4QNRokKrFUjVERxegPobYxGsAooSaKxkhqfBtDeSnxLTGC5aFgHxQQtmW72253917Pd29vvd3ubu+LtupJ2vuaOXO+OTNnzpw5K+gsUclGNUCRtjmqqlwuVHEhCfVClUSxUKmQm8QfKKwKCgtSW0gV9apQ64WQfqD8ot3Ny0RUL+Ltf+Elu/PXh8dGo4k7mOliUmmWSmqOE/6CRBcJ+kYl2hoIyG8fXl54wgmfdHU8ATyhOjQvmaRHVZWuJ1LldA05fycSQtBnPh+tbXg4uNM5H72mK8CllaH5rMU1DHSOW0Gs1GfguyVJrGosD263Uj5dGUeAz6mKjI8rsUoGuiQd07P9joFv8Uu5FUfL84/Zbcs24LKqtgVKMrmF51eR3ca8LM+Ct0k+35LG8qJP7fCV7BQufSlUkUwqHw02WMgMGSALZLKDwZKGL3hZzY12tW7k+brUDvOBKstWvSaQM2LZoRUi1l+b/QK+4OXwmGhX/APu0dn9MRvM7wxkTyDHf/OhFYUns8mRFbCu2VDdUAdrANRBB+dn03TWOawP46GtWQMsrlAMZDa/S73PCBjGYKjO2VQQ5mfInM2QpR3SWHpgAbnPMnaIuREv7ksKJepIqBTqYD25JqH4fNKN6ZasPoA1pyIZ28/NDtg6e/FYH717WyGFOhW678MI7T+ZdA+Z12m/L3dqqnPSR4OaBzWAYIEs4BcUHCbovKCPahYV0NQxPteAoTBgSWXUC3BZVeiawXAXv2tK0Kq6KCksZdlwSQN9kReg2fUFJjPoXoAVRX3O/HGg7jFr3/gxRqu3/wN6M2vaC9CpmHoAl70Uunqgdj2ZOhKgV22LUlzRNe0FaGACNqPNnr0rD6dHjJdeXDEvhzF3ibc2dqi2vovGFUj04BV52vAG6Ltq22mfC0PWjW0H5NCk0SIVkUST28375JE+WjDZT1dNkGniCB8V5AjqGUIWUWN4J1kto4ZJ3Fl6pYYzCi16J0zHwqx6RyQSgXy5FJETTcMIy7gBW8waKZ+dR4un5lA+a9Y99eYxgQ3Z6IBgwE45q7KOkao1wMx+MXrWCc0qk6nqunyaNELXZYydhx9bkrS3JUHH21Wejxy66y1/1mYSvARPGe2jOy/LJV93ved3ddCvJ9ytzcDIDVcLLboYbg2xS2Y74DabwW66uYCK8nTJ3tvXRRu+73TlOIxnjwtrMZwREMC++m2ndu/mnxYYLBwRlLVQqgOwWC9fuSFfA9sRV+nxL6MEwG7ofLYBNYvyNQcEfLwCC15QqOCwsYy4MV7YpSfmDiNoI8F2pOKLKNX+5i3YFzzSrBkXsEpakNz81sL9tGKZFk7RZ8Bbv8Rcgy3VvKvemn3Fg2GcCgVYJZwIpH7o7/lWtsZ+tlFtnSp5IdgUHsrwo0FeDuM+OBirjOMPjHCrBKBX8joL2t0QpyZeI93S140JemZ7B52KKvT+/uxTQ+b2MbrCMZW2/RG31TSwyjjrsQ6XaGRAIgxB0Lfs9HtBWMpe+8GaJZ5RItP6hfmEOldvPkN/tlnvcGCF5MbBliXZi3LhMurL0LGwna6yxL7fQsYSKPMiXciy2CQNsK06fp5qkq5gzamwVdmDwv5uf1NhxcYd+CIQ3ZbD1s5zJ5HUNdvKRmugCaEgEMJBbSyLTQrLOJ9lmzXKasWjPGfu+SCiDafvLcxhWPRRPO9r9sa0eWe1nUzlZpbq1hzG8jQbOTsErDwb1Rbup0l2KtYdsWYdH+At3pPsoIAOnkqS1XqZZIF3N3eiX/v8VUNC2zdnKpvuPbBKOHlP99HtOzPY30NJqmfAbgl75OFsqBAg2NrP8pW2LcYqIc0g7UcXL1PBLq2NULPjvawuyC08Ne64JFd7+PhAF/3MuzG7BKwckOCcCg8pHdjDp91p9/aLcmjttQGC04GOgzfmhIBVRgKJCLd2OdkepjZqBov961IOzbjRLIJ4y2bkEQCD4Mo+9EnEkXenbQ+BFYxKKkM7VVWdi3snhKXxfhbsqXm6gcKq9SZb5QN/JUnWjaolthzZYR9dUHGhoEvHyTS92Ee53U7OkVaFyj+P0DfshjohIcSu5orgPM0p5na2MhPHgLFZN8BCGEQq7p6mzzcnwpnrRHivDQNVtaeTWtrtLUNmPt0YSQOM1KBoJLHWaVzrZFTVfNqJRbpTgID6qQ6FgfNAMrdq4R6Q2nmCHW1N0te89Hx6ME4HXdoAjlUmgBHN98jDw/pDHtY3WpApbREcjyCkioAbACMss4E3BLKdgBZzVnhcd/CojbJmvSIezh/xcL4J/PR9Ht8gDyqRIMeAcQCG+LEBevnMPDoeUWjTTzGv5HbMB9iMyj0axouSytO7EKk3Pjq5mjUNHa3mM6PX+URhsIgH2O7mipE99kmfdN3S8Ix72q1ghqYRPEdvPjs/QPdOz/1n7rhtwGZ9JLKZq/QC3FQRrOMe2WIu4OQ+FfQaBj2ztGf2OGHpqA6wpGbt9QIMrshwY820OWrBVMkADT8ap/peGiFTMxlvgQFYUgv0msPGRy9THnDQjQiJG4/LkMv6NXPKQx8NgylyIziq8Zj1BjKXhHYHFqwWkXksXX4HpEyrYUP8knWhzciKMZ7/DVc2vDXNjwTvyiRrWg0bhZHOxz2yx3ge6lfICpmzyZkVMDLakM73bwCtg0XqYfZ8y6yA0VPIXQzkBOdjqGTrucH8BtkgY395lpCRO8Y6IcONw6Mv8iaj346yztVNSaHAuDatDFZa5WILMJj+rxLEARjmHhluXnhk4OeE0DZkyLT0ZONpW8NmZkj6Qh6U2w2HmWe2ewY6OD/ySBUKeVBIDWLgZ+1nPBz5Wde4MrgjtW27z640nNrYudXt4zqT8SXM9L/9Q61U4Hgeqj/F+xv6SI5WXEpZnwAAAABJRU5ErkJggg=="

/***/ }),

/***/ "KWej":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Luci":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/login.ts
var login = __webpack_require__("ILH5");
var login_default = /*#__PURE__*/__webpack_require__.n(login);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-f4e76bc8","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/login.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main-layout',[_c('div',{staticStyle:{"height":"180px"}}),_vm._v(" "),_c('div',{staticClass:"container-box"},[_c('div',{staticClass:"row login-container"},[_c('div',{staticClass:"container-left"},[_c('div',{staticClass:"container-icon"},[_c('img',{attrs:{"src":__webpack_require__("4+Dl"),"alt":""}})]),_vm._v(" "),_c('div',{staticClass:"container-title",class:{'active':!(_vm.moudle_generate||_vm.moudle_download)},on:{"click":function($event){_vm.cutModual('nep6')}}},[_c('span',{ref:"login"},[_vm._v(_vm._s(_vm.$t("login.login")))])]),_vm._v(" "),_c('div',{staticClass:"container-title",class:{'active':(_vm.moudle_generate || _vm.moudle_download)},on:{"click":function($event){_vm.cutModual('generate')}}},[_c('span',{ref:"login"},[_vm._v(_vm._s(_vm.$t("generate.generate")))])])]),_vm._v(" "),_c('div',{staticClass:"container-right"},[(_vm.moudle_nep6)?_c('div',{staticClass:"nep6-imp"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v("\n              "+_vm._s(_vm.$t("login.title"))+"\n            ")])]),_vm._v(" "),_c('div',{staticClass:"input-login"},[_c('div',{staticClass:"input-group nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filename),expression:"filename"}],staticClass:"form-control",attrs:{"type":"text","placeholder":_vm.$t('login.selectplaceholder'),"disabled":"true","autocomplete":"off"},domProps:{"value":(_vm.filename)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filename=$event.target.value}}}),_vm._v(" "),_c('span',{staticClass:"input-group-addon"},[_c('button',{staticClass:"btn btn-nel fileinput-button"},[_c('span',[_vm._v(_vm._s(_vm.$t("login.selectbtn")))])]),_vm._v(" "),_c('input',{staticClass:"select-file",attrs:{"type":"file"},on:{"change":_vm.fileChange}})])])]),_vm._v(" "),_c('div',{staticClass:"input-login",staticStyle:{"padding-top":"40px"}},[_c('div',{staticClass:"input-group nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.password),expression:"password"}],staticClass:"form-control",attrs:{"placeholder":_vm.$t('login.passwordholder'),"type":"password","autocomplete":"off"},domProps:{"value":(_vm.password)},on:{"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }_vm.loginFile($event)},"input":function($event){if($event.target.composing){ return; }_vm.password=$event.target.value}}}),_vm._v(" "),_c('span',{staticClass:"input-group-addon"},[_c('button',{staticClass:"btn btn-nel fileinput-button",on:{"click":_vm.loginFile}},[_vm._v("\n                  "+_vm._s(_vm.$t("login.login"))+"\n                ")])])])]),_vm._v(" "),_c('div',{staticStyle:{"height":"36px","padding-top":"80px","padding-bottom":"30px","text-align":"center"}},[_c('hr',{attrs:{"width":"80%","color":"#987cb9"}}),_vm._v(" "),_c('div',{staticClass:"hr-more"},[_vm._v(_vm._s(_vm.$t("login.cutlinemsg")))])]),_vm._v(" "),_c('div',{staticStyle:{"width":"417px","margin":"0 auto","padding-top":"30px"}},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":function($event){_vm.cutModual('wif')}}},[_vm._v(_vm._s(_vm.$t("login.wifmsg")))])]),_vm._v(" "),_c('div',{staticStyle:{"width":"417px","margin":"0 auto","padding-top":"20px","padding-bottom":"5.9%"}},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":function($event){_vm.cutModual('nep2')}}},[_vm._v(_vm._s(_vm.$t("login.nep2msg")))])])]):_vm._e(),_vm._v(" "),(_vm.moudle_wif)?_c('div',{staticClass:"wif_imp"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v(_vm._s(_vm.$t("wif.title")))])]),_vm._v(" "),_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.wif),expression:"wif"}],attrs:{"type":"text","placeholder":_vm.$t('wif.wifplaceholder'),"autocomplete":"off"},domProps:{"value":(_vm.wif)},on:{"input":function($event){if($event.target.composing){ return; }_vm.wif=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"login-btn"},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":_vm.loginWif}},[_vm._v(_vm._s(_vm.$t("login.login")))])]),_vm._v(" "),_c('div',{staticClass:"back"},[_c('a',{on:{"click":function($event){_vm.cutModual('nep6')}}},[_vm._v("< "+_vm._s(_vm.$t("wif.back")))])])]):_vm._e(),_vm._v(" "),(_vm.moudle_nep2)?_c('div',{staticClass:"nep2_imp"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v("Nep2")])]),_vm._v(" "),_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.nep2),expression:"nep2"}],attrs:{"type":"text","placeholder":_vm.$t('nep2.placeholder'),"autocomplete":"off"},domProps:{"value":(_vm.nep2)},on:{"input":function($event){if($event.target.composing){ return; }_vm.nep2=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.nep2pwd),expression:"nep2pwd"}],attrs:{"type":"password","placeholder":_vm.$t('nep2.password'),"autocomplete":"off"},domProps:{"value":(_vm.nep2pwd)},on:{"input":function($event){if($event.target.composing){ return; }_vm.nep2pwd=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"login-btn"},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":_vm.loginNep2}},[_vm._v(_vm._s(_vm.$t("login.login")))])]),_vm._v(" "),_c('div',{staticClass:"back"},[_c('a',{on:{"click":function($event){_vm.cutModual('nep6')}}},[_vm._v("< "+_vm._s(_vm.$t("wif.back")))])])]):_vm._e(),_vm._v(" "),(_vm.moudle_generate)?_c('div',{staticClass:"generate"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v(_vm._s(_vm.$t("generate.title")))])]),_vm._v(" "),_c('div',{class:_vm.nameerr!=''?( _vm.nameerr == 'true' ?'err':'success') :''},[_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.walletname),expression:"walletname"}],attrs:{"type":"text","placeholder":_vm.$t('generate.name'),"autocomplete":"off"},domProps:{"value":(_vm.walletname)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.walletname=$event.target.value},_vm.verifyName],"blur":_vm.verifyName}})]),_vm._v(" "),_c('div',{staticClass:"message"},[(_vm.nameerr=='true')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("7vgD"),"alt":""}}),_vm._v("   "+_vm._s(_vm.$t('generate.nameempty')))]):_vm._e(),_vm._v(" "),(_vm.nameerr=='false')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}}),_vm._v("   "+_vm._s(_vm.$t('generate.namepass')))]):_vm._e()])]),_vm._v(" "),_c('div',{class:_vm.pwderr!=''?( _vm.pwderr == 'true' ?'err':'success') :''},[_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.walletpwd),expression:"walletpwd"}],attrs:{"type":"password","placeholder":_vm.$t('generate.password'),"autocomplete":"off"},domProps:{"value":(_vm.walletpwd)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.walletpwd=$event.target.value},_vm.verifypwd],"blur":_vm.verifypwd}})]),_vm._v(" "),_c('div',{staticClass:"message"},[(_vm.pwderr=='true')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("7vgD"),"alt":""}}),_vm._v("   "+_vm._s(_vm.pwdmsg)+"\n              ")]):_vm._e(),_vm._v(" "),(_vm.pwderr=='false')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}}),_vm._v("   "+_vm._s(_vm.$t('generate.namepass'))+"\n              ")]):_vm._e()])]),_vm._v(" "),_c('div',{class:_vm.confirmerr!=''?( _vm.confirmerr == 'true' ?'err':'success') :''},[_c('div',{staticClass:"nel-input-blg"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.confirmpwd),expression:"confirmpwd"}],attrs:{"type":"password","placeholder":_vm.$t('generate.passwordagain'),"autocomplete":"off"},domProps:{"value":(_vm.confirmpwd)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.confirmpwd=$event.target.value},_vm.verifyConfirm],"blur":_vm.verifyConfirm}})]),_vm._v(" "),_c('div',{staticClass:"message"},[(_vm.confirmerr=='true')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("7vgD"),"alt":""}}),_vm._v("   "+_vm._s(_vm.$t('generate.pwderrmsg3'))+"\n              ")]):_vm._e(),_vm._v(" "),(_vm.confirmerr=='false')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}}),_vm._v("   "+_vm._s(_vm.$t('generate.namepass'))+"\n              ")]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"login-btn"},[_c('button',{staticClass:"btn btn-nel btn-import",on:{"click":function($event){_vm.generate()}}},[_vm._v(_vm._s(_vm.$t("generate.generate")))])])]):_vm._e(),_vm._v(" "),(_vm.moudle_download)?_c('div',{staticClass:"generate download"},[_c('div',{staticClass:"title-login"},[_c('span',[_vm._v(_vm._s(_vm.$t("generate.createmsg")))])]),_vm._v(" "),_c('p',{staticClass:"guide"},[_vm._v(_vm._s(_vm.$t("generate.downloadmsg")))]),_vm._v(" "),_c('div',{staticClass:"login-btn"},[_c('a',{staticClass:"btn btn-nel btn-import",attrs:{"download":_vm.download_name,"href":_vm.download_href}},[_vm._v(_vm._s(_vm.$t("generate.download")))])]),_vm._v(" "),_c('div',{staticClass:"remind"},[_c('p',{staticClass:"title-remind"},[_vm._v(_vm._s(_vm.$t("generate.msg")))]),_vm._v(" "),_c('p',{staticClass:"content-remind"},[_vm._v(_vm._s(_vm.$t("generate.msg2")))])])]):_vm._e()])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var pages_login = (esExports);
// CONCATENATED MODULE: ./src/pages/login.vue
function injectStyle (ssrContext) {
  __webpack_require__("KWej")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f4e76bc8"
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

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-f429f84c","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/bid/auctioninfo.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page-two"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('auction.title3')))]),_vm._v(" "),_c('div',{staticClass:"goback",on:{"click":_vm.onBack}},[_vm._v("<<<"+_vm._s(_vm.$t('auction.goback')))])]),_vm._v(" "),_c('div',{staticClass:"form-box"},[_c('div',{staticClass:"filename"},[_vm._v(_vm._s(_vm.$t('auction.domain'))+": "+_vm._s(_vm.domainAuctionInfo.domain))]),_vm._v(" "),(_vm.domainAuctionInfo.auctionState=='1')?_c('div',{staticClass:"status"},[_vm._v(_vm._s(_vm.$t('auction.status'))+": "),_c('span',{staticClass:"status-being"},[_vm._v(_vm._s(_vm.$t('auction.fixedperiod')))])]):_vm._e(),_vm._v(" "),(_vm.domainAuctionInfo.auctionState=='2')?_c('div',{staticClass:"status"},[_vm._v(_vm._s(_vm.$t('auction.status'))+": "),_c('span',{staticClass:"status-random"},[_vm._v(_vm._s(_vm.$t('auction.randomperiod')))])]):_vm._e(),_vm._v(" "),(_vm.domainAuctionInfo.auctionState=='0')?_c('div',{staticClass:"status"},[_vm._v(_vm._s(_vm.$t('auction.status'))+": "),_c('span',{staticClass:"status-ended"},[_vm._v(_vm._s(_vm.$t('auction.ended')))])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"highest-price"},[_vm._v(_vm._s(_vm.$t('auction.highest'))+": "+_vm._s(_vm.domainAuctionInfo.maxPrice)+" SGas")]),_vm._v(" "),(_vm.domainAuctionInfo.maxBuyer != _vm.address)?_c('div',{staticClass:"bidder"},[_vm._v(_vm._s(_vm.$t('auction.currentbidder'))+": "),_c('span',[_vm._v(_vm._s(_vm.$t('auction.other'))+"（ "+_vm._s(_vm.domainAuctionInfo.maxBuyer)+" ）")])]):_vm._e(),_vm._v(" "),(_vm.domainAuctionInfo.maxBuyer == _vm.address)?_c('div',{staticClass:"bidder"},[_vm._v(_vm._s(_vm.$t('auction.currentbidder'))+": "),_c('span',{staticClass:"bidder-me"},[_vm._v(_vm._s(_vm.$t('auction.me'))+"（ "+_vm._s(_vm.domainAuctionInfo.maxBuyer)+" ）")])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"my-bid-sgas"},[_vm._v(_vm._s(_vm.$t('auction.mybidmsg'))+": "),_c('span',{staticClass:"status-ended"},[_vm._v(_vm._s(_vm.myBidPrice))]),_vm._v("  SGas")])]),_vm._v(" "),(_vm.domainAuctionInfo.auctionState==0&& _vm.domainAuctionInfo.maxBuyer == _vm.address)?_c('div',[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('auction.title6')))])]),_vm._v(" "),_c('div',{staticClass:"form-box"},[_c('div',{staticClass:"neoname"},[_vm._v(" "+_vm._s(_vm.domainAuctionInfo.domain))]),_vm._v(" "),_c('div',{staticClass:"neoname-tips"},[_vm._v(_vm._s(_vm.$t('auction.getdomaintips')))]),_vm._v(" "),_c('div',{staticClass:"btn-center"},[(_vm.state_getDomain==0)?_c('button',{staticClass:"btn btn-nel btn-bid",on:{"click":_vm.getDomain}},[_vm._v(_vm._s(_vm.$t('btn.getdomain')))]):_vm._e(),_vm._v(" "),(_vm.state_getDomain==1)?_c('button',{staticClass:"btn btn-nel btn-bid btn-disable",attrs:{"disabled":""}},[_vm._v(_vm._s(_vm.$t('btn.gettingdomain')))]):_vm._e(),_vm._v(" "),(_vm.state_getDomain==2)?_c('button',{staticClass:"btn btn-nel btn-bid btn-disable",attrs:{"disabled":""}},[_vm._v(_vm._s(_vm.$t('btn.receivednns')))]):_vm._e()])])]):_vm._e(),_vm._v(" "),(_vm.myBidPrice!='0'&&_vm.domainAuctionInfo.auctionState==0&& _vm.domainAuctionInfo.maxBuyer != _vm.address)?_c('div',[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('auction.title7')))])]),_vm._v(" "),_c('div',{staticClass:"form-box"},[_c('div',{staticClass:"cumulative-msg"},[_vm._v(_vm._s(_vm.$t('auction.mybidmsg'))+": "+_vm._s(_vm.myBidPrice)+" SGas")]),_vm._v(" "),_c('div',{staticClass:"fee-msg"},[_vm._v(_vm._s(_vm.$t('auction.fee'))+": "+_vm._s(_vm.fee)+" SGas")]),_vm._v(" "),_c('div',{staticClass:"remain-msg"},[_vm._v(_vm._s(_vm.$t('auction.remainingsgas'))+": "+_vm._s(_vm.remaining)+" SGas")]),_vm._v(" "),_c('div',{staticClass:"btn-center"},[(_vm.state_recover==0)?_c('button',{staticClass:"btn btn-nel btn-bid",on:{"click":_vm.recoverSgas}},[_vm._v(_vm._s(_vm.$t('btn.recoversgas')))]):_vm._e(),_vm._v(" "),(_vm.state_recover==1)?_c('button',{staticClass:"btn btn-nel btn-bid btn-disable",attrs:{"disabled":""}},[_vm._v(_vm._s(_vm.$t('btn.recoveringsgas')))]):_vm._e(),_vm._v(" "),(_vm.state_recover==2)?_c('button',{staticClass:"btn btn-nel btn-bid btn-disable",attrs:{"disabled":""}},[_vm._v(_vm._s(_vm.$t('btn.receivedsgas')))]):_vm._e()])])]):_vm._e(),_vm._v(" "),(_vm.domainAuctionInfo.auctionState>0)?_c('div',[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('auction.title4')))])]),_vm._v(" "),_c('div',{staticClass:"form-box"},[_c('div',[_c('div',{staticClass:"input-msg"},[_vm._v(_vm._s(_vm.$t('auction.raisebid'))+": ")]),_vm._v(" "),_c('div',{staticClass:"input-box"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.bidPrice),expression:"bidPrice"}],attrs:{"type":"number","placeholder":_vm.$t('auction.enterbid'),"autocomplete":"off"},domProps:{"value":(_vm.bidPrice)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.bidPrice=$event.target.value},_vm.myBidInput]}}),_vm._v(" "),_c('span',[_vm._v("SGas")])]),_vm._v(" "),(_vm.inputErrorCode==1)?_c('div',{staticClass:"err-msg status-ended"},[_vm._v(_vm._s(_vm.$t('auction.errmsg1'))+" "+_vm._s(_vm.balanceOf)+" "+_vm._s(_vm.$t('auction.errmsg2')))]):_vm._e(),_vm._v(" "),(_vm.inputErrorCode==2)?_c('div',{staticClass:"err-msg status-ended"},[_vm._v(_vm._s(_vm.$t('auction.errmsg4')))]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"my-sgas"},[_vm._v(_vm._s(_vm.$t('auction.mywillbid'))+": "),_c('span',{class:_vm.updatePrice<=_vm.domainAuctionInfo.maxPrice||_vm.inputErrorCode==1?'status-ended':'status-being'},[_vm._v(_vm._s(_vm.updatePrice))]),_vm._v(" SGas")]),_vm._v(" "),_c('div',{staticClass:"tips-msg"},[_vm._v("\n            "+_vm._s(_vm.$t('auction.tips1'))+" \n        ")]),_vm._v(" "),_c('div',{staticClass:"btn-bid-box"},[(_vm.bidState==2)?_c('button',{staticClass:"btn btn-bid btn-disable",attrs:{"disabled":"disabled"}},[_vm._v(_vm._s(_vm.$t('btn.bid')))]):_vm._e(),_vm._v(" "),(_vm.bidState==0)?_c('button',{staticClass:"btn btn-bid ",on:{"click":_vm.bidDomain}},[_vm._v(_vm._s(_vm.$t('btn.bid')))]):_vm._e()])])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('auction.title5')))])]),_vm._v(" "),_c('div',{staticClass:"form-box"},[_c('div',{staticClass:"process-wrapper"},[_c('label',[_vm._v(_vm._s(_vm.$t('auction.status')))]),_vm._v(" "),_c('div',{staticClass:"process-box"},[_c('div',{class:_vm.process.timearr.length==3?'process':'process long',style:('width:'+_vm.width+'%')},[_c('div',{staticClass:"process-tips"},[_vm._v(_vm._s(_vm.process.state)+" ")])]),_vm._v(" "),_c('div',{staticClass:"starts"},[_vm._v(_vm._s(_vm.process.date)+"\n            "),_c('br'),_vm._v(_vm._s(_vm.process.time))]),_vm._v(" "),_vm._l((_vm.process.timearr),function(days){return _c('div',{key:days.msg,staticClass:"days"},[(days.msg!=''&&days.msg=='1')?_c('em',[_vm._v(_vm._s(_vm.$t('auction.bidstarttimemsg')))]):_vm._e(),_vm._v(" "),(days.msg!=''&&days.msg=='2')?_c('em',[_vm._v(_vm._s(_vm.$t('auction.endtimemsg')))]):_vm._e(),_vm._v(" "),(days.msg!=''&&days.msg=='3')?_c('em',[_vm._v(_vm._s(_vm.$t('auction.maxtimemsg')))]):_vm._e(),_vm._v(" "),_c('span',[_vm._v(_vm._s(days.date)+"\n              "),_c('br'),_vm._v(_vm._s(days.time))])])})],2)]),_vm._v(" "),_c('div',{staticClass:"auction-tips"},[_vm._v(_vm._s(_vm.$t('auction.tips'))+" "),_c('p',[_vm._v(" "+_vm._s(_vm.$t('auction.statustips')))]),_c('p',{},[_vm._v(_vm._s(_vm.$t('auction.statustips2')))])]),_vm._v(" "),_c('div',{staticClass:"timeling-wrapper"},[_c('div',{staticClass:"first"}),_vm._v(" "),_vm._l((_vm.bidDetailList),function(item,index){return _c('div',{key:index,staticClass:"list"},[_c('div',{staticClass:"line"}),_vm._v(" "),_c('div',{staticClass:"infos"},[_c('span',[_vm._v(_vm._s(item.addPriceTime))]),_vm._v(" "),(!item.maxBuyer)?_c('p',[_vm._v(_vm._s(_vm.$t('auction.auctionopen')))]):_vm._e(),_vm._v(" "),(item.maxBuyer != _vm.address && item.maxBuyer)?_c('p',{staticStyle:{"font-size":"12px"}},[_vm._v(_vm._s(_vm.$t('auction.other'))+"（ "),_c('span',{staticStyle:{"font-size":"12px"}},[_vm._v(_vm._s(item.maxBuyer))]),_vm._v("  ）")]):_vm._e(),_vm._v(" "),(item.maxBuyer == _vm.address)?_c('p',{staticClass:"bidder-me"},[_vm._v(_vm._s(_vm.$t('auction.me'))+"（ "),_c('span',[_vm._v(_vm._s(item.maxBuyer))]),_vm._v(" ）")]):_vm._e(),_vm._v(" "),(item.maxBuyer!='')?_c('em',[_vm._v(_vm._s(_vm.$t('auction.price'))+" "+_vm._s(item.maxPrice)+" SGas")]):_vm._e()])])})],2),_vm._v(" "),_c('div',{staticClass:"viewmore"},[(_vm.btnShowmore)?_c('button',{staticClass:"btn btn-nel",on:{"click":_vm.getMoreBidDetail}},[_vm._v(_vm._s(_vm.$t('btn.viewmore')))]):_vm._e()])]),_vm._v(" "),_c('v-toast',{ref:"toast"})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var bid_auctioninfo = (esExports);
// CONCATENATED MODULE: ./src/pages/bid/auctioninfo.vue
function injectStyle (ssrContext) {
  __webpack_require__("ndh4")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f429f84c"
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

/***/ "NXVv":
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
var importpack_1 = __webpack_require__("VKSY");
var entity_1 = __webpack_require__("6nHw");
var storagetool_1 = __webpack_require__("5LD5");
var MyNeo = /** @class */ (function (_super) {
    __extends(MyNeo, _super);
    function MyNeo() {
        var _this = _super.call(this) || this;
        _this.currentAddress = ""; //获取当前地址
        _this.isShowEdit = false;
        _this.currentAddress = entity_1.LoginInfo.getCurrentAddress();
        _this.neonameList = null;
        _this.set_contract = "cf0d21eaa1803f63704ddb06c373c22d815b7ca2";
        _this.resolverSession = new storagetool_1.sessionStoreTool("resolverSession");
        _this.mappingSession = new storagetool_1.sessionStoreTool("mappingSession");
        _this.renewalWatting = false;
        _this.resolverAddress = "";
        _this.mappingState = 0;
        _this.resolverState = 0;
        _this.mappingistrue = false;
        _this.currentdomain = "";
        return _this;
    }
    MyNeo.prototype.mounted = function () {
        this.getAllNeoName(this.currentAddress);
    };
    MyNeo.prototype.verifyMapping = function () {
        if (!this.resolverAddress) {
            this.mappingistrue = false;
            return;
        }
        var res = importpack_1.tools.neotool.verifyAddress(this.resolverAddress);
        this.mappingistrue = res;
    };
    MyNeo.prototype.getAllNeoName = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var res, arrdomain, arr, state, key, inculde, i, n, domain, a, list, _a, _b, _i, i, isshow, expired, mapping;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.getnnsinfo(address, '.neo')];
                    case 1:
                        res = _c.sent();
                        arrdomain = res ? res.map(function (dom) { return dom["domain"]; }) : [];
                        arr = new Array();
                        state = entity_1.DomainStatus.getStatus();
                        if (state) {
                            for (key in state) {
                                if (state.hasOwnProperty(key)) {
                                    inculde = arrdomain.includes(key);
                                    inculde ? "" : arrdomain.push(key);
                                }
                            }
                        }
                        for (i in arrdomain) {
                            if (arrdomain.hasOwnProperty(i)) {
                                n = parseInt(i);
                                domain = arrdomain[n];
                                a = state[domain] ? state[domain] : new entity_1.DomainStatus();
                                if (!a.await_resolver) {
                                    if (!a.await_mapping) {
                                    }
                                }
                            }
                        }
                        list = res;
                        if (!(list && list.length)) return [3 /*break*/, 11];
                        _a = [];
                        for (_b in list)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 10];
                        i = _a[_i];
                        return [4 /*yield*/, this.checkExpiration(list[i])];
                    case 3:
                        isshow = _c.sent();
                        if (!!isshow) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.checkExpirationSoon(list[i])];
                    case 4:
                        expired = _c.sent();
                        list[i]["expired"] = isshow;
                        list[i]["expiring"] = expired;
                        return [3 /*break*/, 6];
                    case 5:
                        list[i]["expiring"] = false;
                        list[i]["expired"] = true;
                        _c.label = 6;
                    case 6:
                        if (!list[i]["resolver"]) return [3 /*break*/, 8];
                        return [4 /*yield*/, importpack_1.tools.nnstool.resolveData(list[i]['domain'])];
                    case 7:
                        mapping = _c.sent();
                        list[i]["resolverAddress"] = mapping;
                        _c.label = 8;
                    case 8:
                        list[i]["ttl"] = importpack_1.tools.timetool.getTime(res[i]["ttl"]);
                        _c.label = 9;
                    case 9:
                        _i++;
                        return [3 /*break*/, 2];
                    case 10:
                        this.neonameList = list;
                        _c.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    MyNeo.prototype.checkExpiration = function (domain) {
        var timestamp = new Date().getTime();
        var copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(domain["ttl"]).multiply(1000));
        return copare < 0 ? false : true; //小于0未过期false，大于0已过期true
    };
    MyNeo.prototype.checkExpirationSoon = function (domain) {
        var timestamp = new Date().getTime();
        var copare = (new Neo.BigInteger(domain["ttl"]).multiply(1000)).subtract(new Neo.BigInteger(timestamp));
        var threeMonth = (5 * 60 * 1000) * 90;
        return copare.compareTo(threeMonth) < 0 ? false : true; //小于threeMonth即将过期false
    };
    MyNeo.prototype.onShowEdit = function (item) {
        this.domainInfo = item;
        this.resolverAddress = item.resolverAddress;
        this.mappingistrue = importpack_1.tools.neotool.verifyAddress(this.resolverAddress);
        var sessionMap = this.mappingSession.select(item.domain);
        var sessionRes = this.resolverSession.select(item.domain);
        this.mappingState = this.domainInfo.resolverAddress ? 1 : 0;
        this.resolverState = this.domainInfo.resolver ? 1 : 0;
        if (sessionMap && sessionMap["txid"]) {
            var txid = sessionMap["txid"];
            var value = sessionMap["value"];
            this.resolverAddress = value;
            this.setConfirm(txid, 2, item.domain);
        }
        if (sessionRes && sessionRes["txid"]) {
            var txid = sessionRes["txid"];
            this.setConfirm(txid, 1, item.domain);
        }
        this.isShowEdit = !this.isShowEdit;
        this.currentdomain = item.domain;
    };
    MyNeo.prototype.setConfirm = function (txid, medth, domain) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.getrawtransaction(txid)];
                    case 1:
                        res = _a.sent();
                        if (!!res) {
                            if (medth == 1) {
                                if (this.currentdomain == domain) {
                                    this.resolverState = 1;
                                }
                                this.getAllNeoName(this.currentAddress);
                                // this.resolverState = 1;
                                this.resolverSession.delete(domain);
                            }
                            if (medth == 2) {
                                if (this.currentdomain == domain) {
                                    this.mappingState = 1;
                                }
                                this.getAllNeoName(this.currentAddress);
                                // this.mappingState = 1;
                                this.mappingSession.delete(domain);
                            }
                        }
                        else {
                            if (medth == 1) {
                                if (this.currentdomain == domain) {
                                    this.resolverState = 2;
                                }
                                // this.resolverState = 2;
                            }
                            if (medth == 2) {
                                if (this.currentdomain == domain) {
                                    this.mappingState = 2;
                                }
                                // this.mappingState = 2;
                            }
                            setTimeout(function () {
                                _this.setConfirm(txid, medth, domain);
                            }, 5000);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 注册解析器
     */
    MyNeo.prototype.setresolve = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contract, res, txid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.resolverState = 2;
                        contract = this.set_contract.hexToBytes().reverse();
                        return [4 /*yield*/, importpack_1.tools.nnstool.setResolve(this.domainInfo["domain"], contract)];
                    case 1:
                        res = _a.sent();
                        if (!res.err) {
                            txid = res.info;
                            this.resolverSession.put(this.domainInfo.domain, { txid: txid, value: this.set_contract });
                            this.setConfirm(txid, 1, this.domainInfo.domain);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyNeo.prototype.resetresolve = function () {
        this.resolverState = 0;
        this.resolverAddress = "";
        this.mappingState = 0;
        this.mappingistrue = false;
        console.log("------------");
    };
    /**
     * 映射地址
     */
    MyNeo.prototype.mappingData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, txid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.mappingState = 2;
                        return [4 /*yield*/, importpack_1.tools.nnstool.setResolveData(this.domainInfo.domain, this.resolverAddress, this.domainInfo.resolver)];
                    case 1:
                        res = _a.sent();
                        if (!res.err) {
                            txid = res.info;
                            this.mappingSession.put(this.domainInfo.domain, { txid: txid, value: this.resolverAddress });
                            this.setConfirm(txid, 2, this.domainInfo.domain);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyNeo.prototype.resetmappingData = function () {
        this.resolverAddress = "";
        this.mappingState = 0;
    };
    MyNeo.prototype.renewalDomain = function () {
        return __awaiter(this, void 0, void 0, function () {
            var renewalsession, domain, res, txid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        renewalsession = new importpack_1.tools.sessionstoretool("renewalsession");
                        domain = this.domainInfo.domain;
                        return [4 /*yield*/, importpack_1.tools.nnssell.renewDomain(domain)];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            txid = res["txid"];
                            console.log("--------------------------------------renewalDomain--------------------------------");
                            console.log(txid);
                            renewalsession.put(domain, { txid: txid });
                            this.renewalConfirm(txid, domain);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyNeo.prototype.renewalConfirm = function (txid, domain) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var renewalsession, res, session;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        renewalsession = new importpack_1.tools.sessionstoretool("renewalsession");
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getrawtransaction(txid)];
                    case 1:
                        res = _a.sent();
                        if (!!res) {
                            session = renewalsession.select(domain);
                            if (session) {
                                renewalsession.delete(domain);
                            }
                        }
                        else {
                            this.renewalWatting = true;
                            setTimeout(function () {
                                _this.renewalConfirm(txid, domain);
                            }, 5000);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyNeo = __decorate([
        vue_property_decorator_1.Component({
            components: {}
        }),
        __metadata("design:paramtypes", [])
    ], MyNeo);
    return MyNeo;
}(vue_1.default));
exports.default = MyNeo;


/***/ }),

/***/ "NmuQ":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA11JREFUWAnNWT1II0EUfgkiiNqk8CRgIYmdVhFFsU+6iFjZBK3vQAwErJa7q0QrOewsRbgmHhaCVtZqEy0UPEQUzR0EiTlEUG7v+2ZN2MQz2b/EffBt3s7Me/Ptm53ZN5OAOBRd1yMwTQIxIGwCVLkx4Qj6j0Ag8JMVTRWQ6gG+AMeAXaENbXs8JwmnXYAGlAC3Qh8a0OUJUTiaAvKA10KfU45JwjgAaMBfoFlC3xoQsEUUBh3Ad6BVwr46LJFEQ0auleTKQWCfjSOJRlrZ4h1+tbpRBCFOiGa+c42emX1XTZxKSFHBaX8OfKj7FM2v/IUuoljY/7CrNlN/aeiOyD09PUk2m5WdnR25vLwUOJf+/n6Jx+MyPT2t7k39NFLJgVw+s6GKIKLH1Z2fItuL59XVlSwsLMjFxQX9vZLh4WFZW1uTYDD4qq5OAaMXwYP+Llt9QoFtcuxgaWlJkRsaGpLl5WXZ3d2Vra0tmZmZYbUcHh7KxsaG0m1cyOVjpT0i6OTbCjNdv7+/19fX13UMs7o3X+bn5/VYLKanUilzsVX9mASDaM2sZLDC1qbS3d0tc3Nz0tZmfp0NJ+Pj40p5a/gbdDVIbhxipkxNkYeHB+WXD+FQkiTIfK4psre3p/yOjY059R8jQSabnsvm5qacnp5KZ2enzM7OOvUfFozzmdW31mq7XC6nj46OqgmCtdGq2f/anXkewVKpJIuLi/L8/CyTk5OSSCScRo92YRLU3XiotV1dXZV8Pi+RSEQymUxttd17nQRv7Vq91b5QKMj29raqTqfT0t7e/lZTq+W3JMgdmCdycHCghra3t1dGRka88HnjKcFisahI9fX1eUGOPm64/HPfanw4WeRCJiYmhNELhUIuvFSZHjG956eOeaAfJRpESsM068QrdtfX1/L4+OiFuxNy4ztIyRo/7q5Mvbj2JZNJtdS482ZwKhP8BmcqxXbjlFk1hcvN/v6+G1fkQk6iCDJzhb7CAjcSjUYr5gMDAxXdgbLywslI+ekAk4VZrKtN093dndqXkKiLdbBq01T1cCDpu21nFUHegKQGvJfU37i/EPT30ccLSf8eHpEgBWPs3+M3g6JxBVF/HmDWkPTvEXANUR6ifwWcbPRpY/sQXZ3NmElY1dFZS/6G+AfBNJPrQJbG6AAAAABJRU5ErkJggg=="

/***/ }),

/***/ "OrGm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bubble_vue_1 = __webpack_require__("VbKi");
var hint_vue_1 = __webpack_require__("6Trz");
var Selected_vue_1 = __webpack_require__("2v9N");
var Spinner_vue_1 = __webpack_require__("+jyM");
var toast_vue_1 = __webpack_require__("AU0D");
var Valert_vue_1 = __webpack_require__("Gieu");
var VLink_vue_1 = __webpack_require__("N5E8");
exports.default = {
    install: function (Vue) {
        Vue.component('bubble-wrap', bubble_vue_1.default);
        Vue.component('v-hint', hint_vue_1.default);
        Vue.component('v-selected', Selected_vue_1.default);
        Vue.component('spinner-wrap', Spinner_vue_1.default);
        Vue.component('v-toast', toast_vue_1.default);
        Vue.component('v-alert', Valert_vue_1.default);
        Vue.component('v-link', VLink_vue_1.default);
    }
};


/***/ }),

/***/ "Oz3I":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/transfer/transfer.ts
var transfer = __webpack_require__("82a0");
var transfer_default = /*#__PURE__*/__webpack_require__.n(transfer);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-417aa572","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/transfer/transfer.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('transfer.transfer')))])])]),_vm._v(" "),_c('div',{staticClass:"container"},[_c('div',{staticClass:"transfer-panel"},[_c('div',{staticClass:"form-horizontal"},[_c('div',{staticClass:"col-sm-12"},[_c('label',{staticClass:"col-sm-2 control-label",staticStyle:{"padding-top":"20px"},attrs:{"for":"firstname"}},[_vm._v(_vm._s(_vm.$t('transfer.title1'))+":")]),_vm._v(" "),_c('div',{staticClass:"col-sm-3"},[_c('div',{staticClass:"dropdown"},[_c('div',{staticClass:"btn dropdown-toggle select-nel",class:_vm.balances.length>0 ? '' : 'select-disabled',attrs:{"type":"button","id":"assets","data-toggle":"dropdown"}},[_c('div',{staticClass:"select-title"},[_vm._v(_vm._s(_vm.balance.names))]),_vm._v(" "),_c('div',{staticClass:"select-caret"},[_c('span',{staticClass:"caret"})])]),_vm._v(" "),_c('ul',{staticClass:"dropdown-menu dropdown-nel",attrs:{"role":"menu","aria-labelledby":"assets"}},_vm._l((_vm.balances),function(balance){return _c('li',{key:balance.asset,class:_vm.asset==balance.asset?'active':'',attrs:{"role":"presentation","value":balance.asset}},[_c('a',{attrs:{"role":"menuitem","tabindex":"-1"},on:{"click":function($event){_vm.choose(balance.asset)}}},[_vm._v(_vm._s(balance.names))])])}))])]),_vm._v(" "),_c('div',{staticClass:"col-sm-4",staticStyle:{"padding-top":"20px"}},[_c('span',[_vm._v("      "+_vm._s(_vm.balance.balance)+" "+_vm._s(_vm.balance.names ? _vm.balance.names +" "+ _vm.$t('transfer.msg5') : "")+" ")])])]),_vm._v(" "),_c('div',{staticClass:"col-sm-12",class:_vm.addrerr!=''?(_vm.addrerr == 'true' ?'err':'success') :''},[_c('label',{staticClass:"col-sm-2 control-label",attrs:{"for":""}},[_c('div',{staticStyle:{"padding-top":"40px"}},[_vm._v(_vm._s(_vm.$t('transfer.title2'))+":")])]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('div',{staticStyle:{"padding-top":"30px"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.target),expression:"target"}],staticClass:"nel-input big",attrs:{"type":"text","placeholder":_vm.$t('transfer.placeholder'),"autocomplete":"off"},domProps:{"value":(_vm.target)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.target=$event.target.value},_vm.verify_addr]}})]),_vm._v(" "),(_vm.isDomain)?_c('p',[_vm._v(_vm._s(_vm.toaddress))]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"col-sm-3 mess"},[(_vm.addrerr=='true')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("7vgD"),"alt":""}}),_vm._v("  "+_vm._s(_vm.$t('transfer.msg1'))+" ")]):_vm._e(),_vm._v(" "),(_vm.addrerr=='false')?_c('p',[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}})]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"col-sm-12",class:_vm.amounterr!=''?(_vm.amounterr == 'true' ?'err':'success') :''},[_c('label',{staticClass:"col-sm-2 control-label",attrs:{"for":""}},[_c('div',{staticStyle:{"padding-top":"40px"}},[_vm._v(_vm._s(_vm.$t('transfer.title3'))+":")])]),_vm._v(" "),_c('div',{staticClass:"col-sm-7"},[_c('div',{staticStyle:{"padding-top":"30px"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.amount),expression:"amount"}],staticClass:"nel-input big",attrs:{"type":"number","autocomplete":"off"},domProps:{"value":(_vm.amount)},on:{"change":_vm.verify_Amount,"input":[function($event){if($event.target.composing){ return; }_vm.amount=$event.target.value},_vm.verify_Amount]}})])]),_vm._v(" "),_c('div',{staticClass:"col-sm-3 mess"})]),_vm._v(" "),_c('div',{staticClass:"col-sm-12",staticStyle:{"padding-top":"30px"}},[_c('div',{staticClass:"col-sm-6"}),_vm._v(" "),_c('div',{staticClass:"col-sm-3"},[_c('button',{staticClass:"btn btn-link"},[_vm._v(_vm._s(_vm.$t('transfer.details')))]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.send}},[_vm._v(_vm._s(_vm.$t('transfer.send')))])])])])])]),_vm._v(" "),_c('div',{staticClass:"container"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('transfer.title4')))])])]),_vm._v(" "),_c('div',{staticClass:"container"},[_c('div',{staticClass:"history-panel"},[_c('div',[_c('div',{staticClass:"title"}),_vm._v(" "),_vm._l((_vm.txs),function(tx){return _c('div',{key:tx.index,staticClass:"history"},[_c('div',{staticClass:"number",class:tx.txtype},[_vm._v("\n                        "+_vm._s(tx.txtype == 'out'?'+ ':'- ')+_vm._s(tx.value)+" "+_vm._s(tx.assetname))]),_vm._v(" "),_c('div',{staticClass:"address"},[_vm._v(_vm._s(tx.txtype == 'out'?_vm.$t('transfer.from'):_vm.$t('transfer.to'))+" : "+_vm._s(tx.address))]),_vm._v(" "),_c('div',{staticClass:"time"},[_c('a',{attrs:{"href":'https://scan.nel.group/#testnet/transaction/'+tx.txid,"target":"_blank"}},[_vm._v("\n                            "+_vm._s(tx.txid.substring(0, 4) + '...' + tx.txid.substring(tx.txid.length - 4))+"\n                        ")]),_vm._v("  "+_vm._s(tx.time)+"\n                        "),(tx.waiting)?_c('div',[_vm._v("("+_vm._s(_vm.$t('nns.waiting'))+")")]):_vm._e()])])})],2)]),_vm._v(" "),(_vm.cutshow)?_c('div',{staticClass:"page"},[_c('div',{staticClass:"page-previous",class:_vm.txpage<=1?'disabled':'',on:{"click":function($event){_vm.cutPage('pre')}}},[_c('img',{attrs:{"src":__webpack_require__("tt5S"),"alt":""}})]),_vm._v(" "),_c('div',{staticStyle:{"width":"1px"}}),_vm._v(" "),_c('div',{staticClass:"page-next",class:_vm.nextpage?'':'disabled',on:{"click":function($event){_vm.cutPage('next')}}},[_c('img',{attrs:{"src":__webpack_require__("pp3u"),"alt":""}})])]):_vm._e()]),_vm._v(" "),_c('v-toast',{ref:"toast"})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var transfer_transfer = (esExports);
// CONCATENATED MODULE: ./src/pages/transfer/transfer.vue
function injectStyle (ssrContext) {
  __webpack_require__("Wyq9")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-417aa572"
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
var neotools = /** @class */ (function () {
    function neotools() {
    }
    /**
     * verifyAddress
     * @param addr
     */
    neotools.verifyAddress = function (addr) {
        var verify = /^[a-zA-Z0-9]{34,34}$/;
        var res = verify.test(addr) ? neotools.verifyPublicKey(addr) : verify.test(addr);
        return res;
    };
    /**
     * verifyPublicKey 验证地址
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
                        if ("nep2 hash not match." == result)
                            reject(result);
                        login.prikey = result;
                        res.info = {};
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
                        _a.trys.push([0, 9, , 10]);
                        istart = 0;
                        res = new entity_1.Result();
                        arr = {};
                        if (!wallet.accounts) return [3 /*break*/, 7];
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
                        arr[account.address] = (result.info);
                        return [2 /*return*/, arr];
                    case 4:
                        error_1 = _a.sent();
                        throw error_1;
                    case 5:
                        keyindex++;
                        return [3 /*break*/, 1];
                    case 6: return [3 /*break*/, 8];
                    case 7: throw console.error("The account cannot be empty");
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_1 = _a.sent();
                        throw e_1.result;
                    case 10: return [2 /*return*/];
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

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-69efc554","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/layouts/wallet.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('main-layout',[_c('nav',{staticClass:"navbar navbar-wallet"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"navbar-collapse collapse",attrs:{"id":"navbar"}},[_c('ul',{staticClass:"nav navbar-nav navbar-left"},[_c('li',[_c('v-link',{ref:"balance",attrs:{"href":"#balance"}},[_c('span',{class:[_vm.balance]}),_vm._v(" "+_vm._s(_vm.$t('balance.balance'))+"\n            ")])],1),_vm._v(" "),_c('li',[_c('v-link',{ref:"transfer",attrs:{"href":"#transfer"}},[_c('span',{class:[_vm.transfer]}),_vm._v(" "+_vm._s(_vm.$t('transfer.transfer'))+"\n            ")])],1),_vm._v(" "),_c('li',[_c('v-link',{ref:"exchange",attrs:{"href":"#exchange"}},[_c('span',{class:[_vm.exchange]}),_vm._v(" "+_vm._s(_vm.$t('exchange.title'))+"\n            ")])],1),_vm._v(" "),_c('li',[_c('v-link',{ref:"nnsneo",attrs:{"href":"#nnsneo"}},[_c('span',{class:[_vm.nnsneo]}),_vm._v(" "+_vm._s(_vm.$t('nns.nns'))+"(.neo)\n            ")])],1),_vm._v(" "),_c('li',[_c('v-link',{ref:"nns",attrs:{"href":"#nns"}},[_c('span',{class:[_vm.nns]}),_vm._v(" "+_vm._s(_vm.$t('nns.nns'))+"(.test)\n            ")])],1),_vm._v(" "),_c('li',[_c('v-link',{ref:"setting",attrs:{"href":"#settings"}},[_c('span',{class:[_vm.setting]}),_vm._v(" "+_vm._s(_vm.$t('setting.settings'))+"\n            ")])],1)]),_vm._v(" "),_c('div',{staticClass:"blockheight"},[_vm._v(_vm._s(_vm.$t('navbar.blockheight'))+"："+_vm._s(_vm.blockheight))])])])]),_vm._v(" "),_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var layouts_wallet = (esExports);
// CONCATENATED MODULE: ./src/layouts/wallet.vue
function injectStyle (ssrContext) {
  __webpack_require__("XsKB")
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

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-f1c4643a","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/nns/nns.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container "},[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('nns.title1')))])]),_vm._v(" "),_c('div',{staticClass:"form-inline"},[_c('div',{staticClass:"input-group nns-register",class:_vm.domainerr?'input-err':'input-success'},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.nnsstr),expression:"nnsstr"}],staticClass:"nel",attrs:{"type":"text","placeholder":_vm.$t('nns.placeholder1'),"autocomplete":"off"},domProps:{"value":(_vm.nnsstr)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.nnsstr=$event.target.value},_vm.verifyDomain]}}),_vm._v(" "),_c('span',{staticClass:"input-group-addon nel "},[_c('span',[_vm._v(_vm._s(_vm.network))])])]),_vm._v(" "),(_vm.btn_register)?_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.nnsRegister}},[_vm._v(_vm._s(_vm.$t('nns.register')))]):_c('spinner-wrap',{staticStyle:{"margin-left":"20px"}}),_vm._v(" "),_c('div',{staticClass:"err-color",staticStyle:{"padding-left":"50px","padding-top":"10px"}},[_c('span',[_vm._v(_vm._s(_vm.errmsg))])])],1),_vm._v(" "),_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('nns.title2')))]),_vm._v(" "),_c('div',{staticStyle:{"display":"inline-block"}},[_c('bubble-wrap',{attrs:{"isdisable":_vm.receive_disable}})],1)]),_vm._v(" "),_vm._l((_vm.domainarr),function(domain){return _c('div',{key:domain.index,staticClass:"form-inline"},[_c('div',{staticClass:"left-box"},[_c('span',{staticClass:"domainname"},[_vm._v("\n            "+_vm._s(domain.domainname)+"\n          ")]),_vm._v(" "),_c('br'),_vm._v(" "),_c('span',{staticClass:"msg-resolver"},[_vm._v("( "+_vm._s(_vm.$t('nns.text1'))+" : "+_vm._s(domain.resolver)+") "),_c('br')]),_vm._v(" "),_c('span',{staticClass:"msg-resolver"},[_vm._v("( "+_vm._s(_vm.$t('nns.text2'))+" : "+_vm._s(domain.mapping)+")"),_c('br')]),_vm._v(" "),_c('span',{staticClass:"msg-resolver"},[_vm._v("( "+_vm._s(_vm.$t('nns.text3'))+" : "+_vm._s(domain.time)+")\n          ")]),_vm._v(" "),_c('span',{staticClass:"msg-resolver state-lable"},[_vm._v(_vm._s(domain.isExpiration?"("+_vm.$t('nns.text4')+")":"")+" "+_vm._s(domain.await_register?"("+_vm.$t('nns.waiting')+")":""))])]),_vm._v(" "),_c('div',{staticClass:"right-box"},[(!domain.await_register)?_c('button',{staticClass:"btn btn-nel",on:{"click":function($event){_vm.resolve(domain)}}},[_vm._v(_vm._s(_vm.$t('nns.edit')))]):_vm._e()])])})],2),_vm._v(" "),_c('v-alert',{ref:"alert"},[_c('div',{staticClass:"content content-file"},[_c('span',{staticClass:"content-des"},[_vm._v(_vm._s(_vm.$t('nns.alerttitle1'))+" : "+_vm._s(_vm.alert_domain))]),_vm._v(" "),_c('span',{staticClass:"content-msg"})]),_vm._v(" "),_c('div',{staticClass:"content content-verify"},[_c('span',{staticClass:"content-des"},[_vm._v(_vm._s(_vm.$t('nns.alerttitle2'))+" : ")]),_vm._v(" "),_c('span',{staticClass:"content-msg warning-msg"},[_vm._v("( "+_vm._s(_vm.$t('nns.alertmessage1'))+" )")]),_vm._v(" "),_c('div',{staticClass:"input-warp"},[_c('input',{staticClass:"input-ico input-disabled",attrs:{"type":"text","disabled":"disable","autocomplete":"off"},domProps:{"value":_vm.alert_contract}}),_vm._v(" "),(_vm.alert_resolver_state==2)?_c('span',{staticClass:"correct-icon"},[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"btn-verify-warp"},[(_vm.alert_resolver_state==0)?_c('button',{staticClass:"btn-nel btn-verify ",on:{"click":function($event){_vm.setresolve()}}},[_vm._v(_vm._s(_vm.$t('btn.confirm')))]):_vm._e(),_vm._v(" "),(_vm.alert_resolver_state==1)?_c('spinner-wrap'):_vm._e(),_vm._v(" "),(_vm.alert_resolver_state==2)?_c('button',{staticClass:"btn-nel btn-verify ",on:{"click":function($event){_vm.setresolve()}}},[_vm._v(_vm._s(_vm.$t('btn.reset')))]):_vm._e()],1)])]),_vm._v(" "),_c('div',{staticClass:"content content-verify"},[_c('span',{staticClass:"content-des"},[_vm._v(_vm._s(_vm.$t('nns.alerttitle3'))+" : ")]),_vm._v(" "),_c('span',{staticClass:"content-msg"}),_vm._v(" "),_c('div',{staticClass:"input-warp"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.alert_addr),expression:"alert_addr"}],staticClass:"input-ico",class:_vm.mapping_err=='0'?'input-success':_vm.mapping_err=='1'?'input-err':'',attrs:{"type":"text","autocomplete":"off"},domProps:{"value":(_vm.alert_addr)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.alert_addr=$event.target.value},_vm.verifyMappingAddress]}}),_vm._v(" "),(_vm.alert_config_state==2)?_c('span',{staticClass:"correct-icon"},[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"btn-verify-warp",staticStyle:{"margin-left":"25px"}},[(_vm.alert_config_state==0)?_c('button',{staticClass:"btn-nel btn-verify",on:{"click":function($event){_vm.configResolve()}}},[_vm._v(_vm._s(_vm.$t('btn.confirm')))]):_vm._e(),_vm._v(" "),(_vm.alert_config_state==2)?_c('button',{staticClass:"btn-nel btn-verify",on:{"click":function($event){_vm.configResolve()}}},[_vm._v(_vm._s(_vm.$t('btn.reset')))]):_vm._e(),_vm._v(" "),(_vm.alert_config_state==1)?_c('spinner-wrap'):_vm._e()],1)]),_vm._v(" "),(_vm.mapping_err=='1')?_c('div',{staticClass:"err-color"},[_vm._v(_vm._s(_vm.$t('nns.alertmessage2'))+" ")]):_vm._e()])])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var nns_nns = (esExports);
// CONCATENATED MODULE: ./src/pages/nns/nns.vue
function injectStyle (ssrContext) {
  __webpack_require__("06vt")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f1c4643a"
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

/***/ "S2Vl":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "S2mm":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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
        var msg = entity_1.LoginInfo.info;
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
        mui.prompt("" + this.$t("setting.msg3"), "" + this.$t("setting.msg4"), "" + this.$t("setting.msg5"), ["" + this.$t("btn.cancel"), "" + this.$t("btn.confirm")], function (e) {
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

/***/ "TaBq":
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
var Selected = /** @class */ (function (_super) {
    __extends(Selected, _super);
    function Selected() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.title = "";
        _this.selection = "";
        return _this;
    }
    Selected.prototype.mounted = function () {
        this.selection = Object.keys(this.list)[0];
        this.switchVal(this.selection);
    };
    Selected.prototype.switchVal = function (key) {
        this.selection = key;
        this.title = this.list[key];
        this.$emit("selected", this.selection);
    };
    __decorate([
        vue_property_decorator_1.Prop(),
        __metadata("design:type", Object)
    ], Selected.prototype, "list", void 0);
    Selected = __decorate([
        vue_property_decorator_1.Component
    ], Selected);
    return Selected;
}(vue_1.default));
exports.default = Selected;


/***/ }),

/***/ "UOl0":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Uyb2":
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
var importpack_1 = __webpack_require__("VKSY");
var entity_1 = __webpack_require__("6nHw");
var Exchange = /** @class */ (function (_super) {
    __extends(Exchange, _super);
    function Exchange() {
        var _this = _super.call(this) || this;
        _this.currentAddress = ""; //获取当前地址
        _this.changeSGas = false;
        _this.transcount = "";
        _this.myGas = 0;
        _this.mySGas = 0;
        _this.exMaxcount = 0;
        _this.exchangebtn = false;
        _this.exchangeList = null;
        _this.isCheckingTran = false;
        importpack_1.tools.coinTool.initAllAsset();
        return _this;
    }
    Exchange.prototype.mounted = function () {
        this.currentAddress = entity_1.LoginInfo.getCurrentAddress();
        this.getMyGas();
        this.getMySGas();
        this.isShowTranLog();
    };
    //切换转换模式
    Exchange.prototype.exchangeTranType = function () {
        this.transcount = "";
        this.changeSGas = !this.changeSGas;
        this.changeSGas ? this.exMaxcount = this.mySGas : this.exMaxcount = this.myGas;
        this.exchangeList ? this.exchangebtn = true : this.exchangebtn = false;
    };
    /**
     * 获取当前地址的Gas
     */
    Exchange.prototype.getMyGas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var balances;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.api_getBalance(this.currentAddress)];
                    case 1:
                        balances = _a.sent();
                        this.myGas = 0;
                        if (balances) {
                            balances.forEach //取GAS
                            (function (balance) {
                                if (balance.asset == importpack_1.tools.coinTool.id_GAS) {
                                    _this.myGas = balance.balance;
                                    _this.exMaxcount = _this.myGas;
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获取当前地址的SGas
     */
    Exchange.prototype.getMySGas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.getnep5balanceofaddress('0x' + importpack_1.tools.coinTool.id_SGAS.toString(), this.currentAddress)];
                    case 1:
                        res = _a.sent();
                        if (res && res.nep5balance) {
                            this.mySGas = parseFloat(res.nep5balance);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 交易金额的输入确认
     */
    Exchange.prototype.exchangeCount = function () {
        if (this.transcount) {
            if (!/^0|^\.\d/.test(this.transcount) || /^[0-9]\.[0-9]/.test(this.transcount)) {
                if (/\./.test(this.transcount)) {
                    this.transcount = this.transcount.toString().substr(0, (this.transcount.toString().indexOf(".")) + 9);
                }
                this.exchangeList ? this.exchangebtn = false : this.exchangebtn = true;
            }
            else {
                this.exchangebtn = false;
            }
        }
        else {
            this.exchangebtn = false;
        }
    };
    /**
     * exchange提交
     */
    Exchange.prototype.exChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var txid, tranObj, txid, tranObj, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.changeSGas) return [3 /*break*/, 2];
                        this.isCheckingTran = true;
                        return [4 /*yield*/, importpack_1.tools.sgastool.makeRefundTransaction(parseFloat(this.transcount))];
                    case 1:
                        txid = _a.sent();
                        tranObj = [{ 'trancount': this.transcount, 'txid': txid, 'trantype': 'SGas' }];
                        localStorage.setItem('exchangelist', JSON.stringify(tranObj));
                        this.isShowTranLog();
                        return [3 /*break*/, 5];
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        this.isCheckingTran = true;
                        return [4 /*yield*/, importpack_1.tools.sgastool.makeMintTokenTransaction(parseFloat(this.transcount))];
                    case 3:
                        txid = _a.sent();
                        tranObj = [{ 'trancount': this.transcount, 'txid': txid, 'trantype': 'Gas' }];
                        localStorage.setItem('exchangelist', JSON.stringify(tranObj));
                        this.isShowTranLog();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 等待转账确认
     * @param txid 交易id
     */
    Exchange.prototype.checkTranisOK = function (txid, trancount, trantype) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var res, utxo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.exchangebtn = false;
                        this.isCheckingTran = true;
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getrawtransaction(txid)];
                    case 1:
                        res = _a.sent();
                        if (!res) return [3 /*break*/, 5];
                        if (!(trantype == "SGas")) return [3 /*break*/, 3];
                        utxo = new entity_1.UTXO();
                        utxo.addr = entity_1.LoginInfo.getCurrentAddress();
                        utxo.txid = txid;
                        utxo.asset = importpack_1.tools.coinTool.id_GAS;
                        utxo.count = Neo.Fixed8.parse(trancount.toString());
                        utxo.n = 0;
                        //把这个txid里的utxo[0]的value转给自己
                        return [4 /*yield*/, importpack_1.tools.sgastool.makeRefundTransaction_tranGas(utxo, trancount.toString())];
                    case 2:
                        //把这个txid里的utxo[0]的value转给自己
                        _a.sent();
                        // console.log("restxid: " + restxid);
                        this.exchangeList = localStorage.getItem('exchangelist');
                        this.exchangeList = JSON.parse(this.exchangeList);
                        this.checkAgainTranisOK(this.exchangeList[1].txid);
                        return [3 /*break*/, 4];
                    case 3:
                        this.isTranClose();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                this.checkTranisOK(txid, trancount, trantype);
                                return [2 /*return*/];
                            });
                        }); }, 10000);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Exchange.prototype.checkAgainTranisOK = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.exchangebtn = false;
                        this.isCheckingTran = true;
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getrawtransaction(txid)];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            this.isTranClose();
                        }
                        else {
                            setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    this.checkAgainTranisOK(txid);
                                    return [2 /*return*/];
                                });
                            }); }, 10000);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**转账记录 */
    Exchange.prototype.isShowTranLog = function () {
        this.exchangeList = localStorage.getItem('exchangelist');
        if (this.exchangeList) {
            this.exchangeList = JSON.parse(this.exchangeList);
            this.checkTranisOK(this.exchangeList[0].txid, this.exchangeList[0].trancount, this.exchangeList[0].trantype);
        }
    };
    /**交易结束 */
    Exchange.prototype.isTranClose = function () {
        localStorage.removeItem("exchangelist");
        this.isCheckingTran = false;
        this.transcount = "";
        this.getMyGas();
        this.getMySGas();
        this.exchangeList = null;
    };
    Exchange = __decorate([
        vue_class_component_1.default({
            components: {
                "wallet-layout": wallet_vue_1.default
            }
        }),
        __metadata("design:paramtypes", [])
    ], Exchange);
    return Exchange;
}(vue_1.default));
exports.default = Exchange;


/***/ }),

/***/ "VKSY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cointool_1 = __webpack_require__("pLPz");
var neotools_1 = __webpack_require__("PMwo");
var nnstool_1 = __webpack_require__("ar5l");
var storagetool_1 = __webpack_require__("5LD5");
var wwwtool_1 = __webpack_require__("50aY");
var timetool_1 = __webpack_require__("48oz");
var contract_1 = __webpack_require__("HWxh");
var sgastool_1 = __webpack_require__("9Jd1");
var nnssell_1 = __webpack_require__("s6Yv");
var taskmanager_1 = __webpack_require__("XfB5");
var tools;
(function (tools) {
    tools.coinTool = cointool_1.CoinTool; //构造交易，UTXO排序
    tools.neotool = neotools_1.neotools; //NEO的算法工具类
    tools.nnstool = nnstool_1.NNSTool; //nns域名处理工具类
    tools.storagetool = storagetool_1.StorageTool; //sessionStory
    tools.wwwtool = wwwtool_1.WWW; //api请求工具类
    tools.timetool = timetool_1.default; //时间工具类
    tools.contract = contract_1.default; //智能合约调用方法封装
    tools.sgastool = sgastool_1.default; //Sgas兑换方法
    tools.nnssell = nnssell_1.default;
    tools.localstoretool = storagetool_1.LocalStoreTool;
    tools.sessionstoretool = storagetool_1.sessionStoreTool;
    tools.taskManager = taskmanager_1.TaskManager;
})(tools = exports.tools || (exports.tools = {}));


/***/ }),

/***/ "VbKi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/bubble.vue
var bubble = __webpack_require__("VvEX");
var bubble_default = /*#__PURE__*/__webpack_require__.n(bubble);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6b8831e2","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/bubble.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bubble-box"},[_vm._m(0,false,false),_vm._v(" "),_c('div',{staticClass:"bubble-msg disable"},[_vm._v("\n    "+_vm._s(_vm.$t('nns.msg1')))]),_vm._v(" "),_c('div',{staticClass:"help-icon"},[_c('img',{attrs:{"src":__webpack_require__("NmuQ"),"alt":""}}),_vm._v(" "),_c('div',{staticClass:"help-msg"},[_vm._v("\n      "+_vm._s(_vm.$t('nns.msg2'))+"\n      "),_c('div',{staticClass:"triangle-box"})])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bubble-png"},[_c('img',{attrs:{"src":__webpack_require__("JPeH"),"alt":""}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var components_bubble = (esExports);
// CONCATENATED MODULE: ./src/components/bubble.vue
function injectStyle (ssrContext) {
  __webpack_require__("XN34")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6b8831e2"
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

/***/ "Wyq9":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "XN34":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "XfB5":
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
var storagetool_1 = __webpack_require__("5LD5");
var entity_1 = __webpack_require__("6nHw");
var importpack_1 = __webpack_require__("VKSY");
var TaskManager = /** @class */ (function () {
    function TaskManager() {
    }
    TaskManager.getBlockHeight = function () {
        var height = this.oldBlock.select('height');
        return height;
    };
    TaskManager.update = function () {
        for (var index in this.functionList) {
            if (this.functionList.hasOwnProperty(index)) {
                var element = this.functionList[index];
                element();
            }
        }
        var taskList = this.taskStore.getList();
        for (var type in taskList) {
            if (taskList.hasOwnProperty(type)) {
                var task = taskList[type];
                if (task.state == entity_1.TaskState.watting) {
                    switch (parseInt(type)) {
                        case entity_1.TaskType.tranfer:
                            break;
                        case entity_1.TaskType.openAuction:
                            this.confirm_open(task);
                            break;
                        case entity_1.TaskType.addPrice:
                            this.confirm_bid(task);
                            break;
                        case entity_1.TaskType.topup:
                            this.confirm_topup(task);
                            break;
                        case entity_1.TaskType.withdraw:
                            this.confirm_withdraw(task);
                            break;
                        case entity_1.TaskType.getGasTest:
                            this.confirm_tranfer(entity_1.TaskType.getGasTest, task, "getTestGas");
                        default:
                            break;
                    }
                }
            }
        }
    };
    TaskManager.addTask = function (task, type) {
        this.taskStore.put(type.toString(), task);
    };
    TaskManager.confirm_tranfer = function (TaskType, task, name) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(task.confirm < 3)) return [3 /*break*/, 2];
                        return [4 /*yield*/, importpack_1.tools.wwwtool.hastx(task.txid)];
                    case 1:
                        data = _a.sent();
                        if (data.issucces) {
                            task.state = entity_1.TaskState.success;
                            sessionStorage.setItem("" + name, "true");
                        }
                        else {
                            task.state = entity_1.TaskState.watting;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        task.state = entity_1.TaskState.fail;
                        sessionStorage.setItem("" + name, "fail");
                        _a.label = 3;
                    case 3:
                        task.confirm++;
                        this.taskStore.put(TaskType.toString(), task);
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskManager.confirm_withdraw = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(task.confirm < 3)) return [3 /*break*/, 2];
                        return [4 /*yield*/, importpack_1.tools.wwwtool.hastx(task.txid)];
                    case 1:
                        data = _a.sent();
                        if (data.issucces) {
                            task.state = entity_1.TaskState.success;
                            this.refresh.put("withdraw", true);
                        }
                        else {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        task.state = entity_1.TaskState.fail;
                        this.refresh.put("withdraw", true);
                        _a.label = 3;
                    case 3:
                        task.confirm += 1;
                        this.taskStore.put(entity_1.TaskType.withdraw.toString(), task);
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskManager.confirm_topup = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(task.confirm < 3)) return [3 /*break*/, 2];
                        return [4 /*yield*/, importpack_1.tools.wwwtool.hastx(task.txid)];
                    case 1:
                        data = _a.sent();
                        if (data.issucces) {
                            task.state = entity_1.TaskState.success;
                            this.refresh.put("topup", true);
                        }
                        else {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        task.state = entity_1.TaskState.fail;
                        this.refresh.put("topup", true);
                        _a.label = 3;
                    case 3:
                        task.confirm += 1;
                        this.taskStore.put(entity_1.TaskType.topup.toString(), task);
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskManager.confirm_open = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(task.confirm < 3)) return [3 /*break*/, 2];
                        return [4 /*yield*/, importpack_1.tools.wwwtool.hastx(task.txid)];
                    case 1:
                        data = _a.sent();
                        if (data.issucces) {
                            // let session_open = new tools.sessionstoretool("auction-openSession");
                            task.state = entity_1.TaskState.success;
                            // session_open.delete()
                            // sessionStorage.removeItem("auction-openSession");
                            this.refresh.put("bidlist", true);
                        }
                        else {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        task.state = entity_1.TaskState.fail;
                        this.refresh.put("bidlist", true);
                        _a.label = 3;
                    case 3:
                        task.confirm += 1;
                        this.taskStore.put(entity_1.TaskType.openAuction.toString(), task);
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskManager.confirm_bid = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(task.confirm < 3)) return [3 /*break*/, 2];
                        return [4 /*yield*/, importpack_1.tools.wwwtool.hastx(task.txid)];
                    case 1:
                        data = _a.sent();
                        if (data) {
                            task.state = entity_1.TaskState.success;
                            this.refresh.put("bidlist", true);
                        }
                        else {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        task.state = entity_1.TaskState.fail;
                        this.refresh.put("bidlist", true);
                        _a.label = 3;
                    case 3:
                        task.confirm += 1;
                        this.taskStore.put(entity_1.TaskType.addPrice.toString(), task);
                        return [2 /*return*/];
                }
            });
        });
    };
    TaskManager.taskStore = new storagetool_1.sessionStoreTool("task-manager");
    TaskManager.refresh = new storagetool_1.sessionStoreTool("refresh_auction");
    TaskManager.oldBlock = new storagetool_1.sessionStoreTool("block");
    TaskManager.functionList = [];
    return TaskManager;
}());
exports.TaskManager = TaskManager;


/***/ }),

/***/ "XsKB":
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
var importpack_1 = __webpack_require__("VKSY");
var storagetool_1 = __webpack_require__("5LD5");
var FeatureComponent = /** @class */ (function (_super) {
    __extends(FeatureComponent, _super);
    function FeatureComponent() {
        var _this = _super.call(this) || this;
        _this.balance = "";
        _this.exchange = "";
        _this.nnsneo = "";
        _this.nns = "";
        _this.transfer = "";
        _this.setting = "";
        _this.blockheight = 0;
        Neo.Cryptography.RandomNumberGenerator.startCollectors();
        return _this;
    }
    FeatureComponent.prototype.mounted = function () {
        this.balance = this.$refs["balance"]["isActive"]
            ? "icon-balance-select"
            : "icon-balance-unselect";
        this.transfer = this.$refs["transfer"]["isActive"]
            ? "icon-transfer-select"
            : "icon-transfer-unselect";
        this.exchange = this.$refs["exchange"]["isActive"]
            ? "icon-exchange-select"
            : "icon-exchange-unselect";
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
        var arr = sessionStorage.getItem("login-info-arr");
        if (arr.length == 0) {
            window.location.hash = "#login";
        }
    };
    FeatureComponent.prototype.getHeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, oldBlock;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
                    case 1:
                        _a.blockheight = _b.sent();
                        oldBlock = new storagetool_1.sessionStoreTool("block");
                        setInterval(function () {
                            var height = oldBlock.select("height");
                            _this.blockheight = height;
                        }, 5000);
                        return [2 /*return*/];
                }
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

/***/ "Zz8u":
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
var importpack_1 = __webpack_require__("VKSY");
var NeoaucionData = /** @class */ (function () {
    function NeoaucionData() {
    }
    NeoaucionData.getBidList = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var res, arr, obj, list, ids, amounts, i, element, current, balanceOfSelling, _a, _b, _i, key, element, info, bidSession, bidlist, _c, _d, _e, key_1, element_1, res_1, error_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 12, , 13]);
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getBidListByAddress(address)];
                    case 1:
                        res = _f.sent();
                        arr = new Array();
                        obj = this.session_open.getList();
                        list = res ? res[0]["list"] : [];
                        ids = list.map(function (auction) {
                            return auction.id;
                        });
                        return [4 /*yield*/, importpack_1.tools.nnssell.getBalanceOfSelingArray(ids)];
                    case 2:
                        amounts = _f.sent();
                        if (res) {
                            for (i in list) {
                                element = list[i];
                                element.receivedState = 0;
                                //根据余额和所有者判断当前账户是否领取过了域名或退币
                                if (element.auctionState == '0') {
                                    current = entity_1.LoginInfo.getCurrentAddress();
                                    balanceOfSelling = amounts[element.id];
                                    if (element.maxBuyer == current) {
                                        //  判断所有者是不是自己并且余额为0
                                        element.receivedState = (balanceOfSelling.compareTo(Neo.BigInteger.Zero) == 0 && element.owner == current) ? 1 : 0;
                                    }
                                    else {
                                        element.receivedState = balanceOfSelling.compareTo(Neo.BigInteger.Zero) == 0 ? 2 : 0;
                                    }
                                }
                                //开始时间日期格式化
                                element.startTimeStr = importpack_1.tools.timetool.getTime(element.startAuctionTime);
                                if (obj && obj[element.domain]) {
                                    this.session_open.delete(element.domain); //如果存在就删除该域名的缓存
                                }
                            }
                        }
                        obj = this.session_open.getList();
                        _a = [];
                        for (_b in obj)
                            _a.push(_b);
                        _i = 0;
                        _f.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 11];
                        key = _a[_i];
                        if (!obj.hasOwnProperty(key)) return [3 /*break*/, 10];
                        element = obj[key];
                        element.endedState = 0;
                        element.auctionState = '3';
                        element.maxBuyer = null;
                        element.maxPrice = '0';
                        return [4 /*yield*/, importpack_1.tools.nnssell.getSellingStateByDomain(element.domain)];
                    case 4:
                        info = _f.sent();
                        if (info.startBlockSelling.compareTo(Neo.BigInteger.Zero) > 0) {
                            if (info.maxPrice.compareTo(Neo.BigInteger.Zero) > 0) {
                                element.maxBuyer = ThinNeo.Helper.GetAddressFromScriptHash(info.maxBuyer);
                                element.maxPrice = accDiv(parseInt(info.maxPrice.toString()), 100000000).toString();
                            }
                            // element.auctionState = '1';
                        }
                        bidSession = new importpack_1.tools.sessionstoretool("bidInfo-" + element.domain);
                        bidlist = bidSession.getList();
                        if (!bidlist) return [3 /*break*/, 9];
                        _c = [];
                        for (_d in bidlist)
                            _c.push(_d);
                        _e = 0;
                        _f.label = 5;
                    case 5:
                        if (!(_e < _c.length)) return [3 /*break*/, 8];
                        key_1 = _c[_e];
                        if (!bidlist.hasOwnProperty(key_1)) return [3 /*break*/, 7];
                        element_1 = bidlist[key_1];
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getrawtransaction(key_1)];
                    case 6:
                        res_1 = _f.sent();
                        if (res_1) {
                            bidSession.delete(key_1);
                        }
                        _f.label = 7;
                    case 7:
                        _e++;
                        return [3 /*break*/, 5];
                    case 8:
                        element.bidListSession = bidlist;
                        _f.label = 9;
                    case 9:
                        arr.push(element);
                        _f.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 3];
                    case 11:
                        arr = arr.concat(list);
                        return [2 /*return*/, arr];
                    case 12:
                        error_1 = _f.sent();
                        console.error(error_1);
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    NeoaucionData.setOpenSession = function (auction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.session_open.put(auction.domain, auction);
                return [2 /*return*/];
            });
        });
    };
    NeoaucionData.setBidSession = function (auction, amount, txid) {
        return __awaiter(this, void 0, void 0, function () {
            var session_bid, domaininfo;
            return __generator(this, function (_a) {
                session_bid = new importpack_1.tools.sessionstoretool("bidSession");
                session_bid.put(auction.domain, { txid: txid, amount: amount }, txid);
                domaininfo = this.session_open.select(auction.domain);
                if (!domaininfo) {
                    this.session_open.put(auction.domain, auction);
                }
                return [2 /*return*/];
            });
        });
    };
    NeoaucionData.getAssetBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sgas, gas, obj, nep5, res, balances, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sgas = importpack_1.tools.coinTool.id_SGAS.toString();
                        gas = importpack_1.tools.coinTool.id_GAS;
                        obj = {};
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getnep5balanceofaddress(sgas, entity_1.LoginInfo.getCurrentAddress())];
                    case 1:
                        nep5 = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getBalance(entity_1.LoginInfo.getCurrentAddress())];
                    case 2:
                        res = _a.sent();
                        balances = res;
                        balances.map(function (item, index, array) {
                            if (item.asset == gas) {
                                balance = item.balance;
                                return;
                            }
                        });
                        obj[gas] = balance;
                        obj[sgas] = nep5["nep5balance"];
                        return [2 /*return*/, obj];
                }
            });
        });
    };
    NeoaucionData.session_open = new importpack_1.tools.sessionstoretool("auction-openSession");
    return NeoaucionData;
}());
exports.NeoaucionData = NeoaucionData;


/***/ }),

/***/ "aLFK":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAPdJREFUSA3tVsFqwkAUnAn5kdCLpxR6ErwJeipo6ak/4NF/8R8Evakg+BEt1eZQetNCv+ONyWH3EFiyFBSR7OW92TfJZOdtsgGuNBir8/j78mxmPccnkq8iWy0dboppE8HVZTaAMHUYtEokWijxF144aYX+bXBr3e1bx/w0fgXYbXxUqS/pyfOIHzLZehxKpM8iWy9SCUPIJiFecF7oSNYJ1n2B8zJd3N+uSxNwb9TKrzSYMIf04MoE/0S9OxyK5fHwUdWij4n8OJqV/fRfbxLLItu8hQTq8/fXo3ZF9R5H49a6aKvqxOjfrfLN/ga5czcQdHB5TDwD/n49HBmnxzQAAAAASUVORK5CYII="

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
var importpack_1 = __webpack_require__("VKSY");
var entity_1 = __webpack_require__("6nHw");
/**
 * @name NEONameServiceTool
 * @method initRootDomain_初始化根域名信息
 */
var NNSTool = /** @class */ (function () {
    function NNSTool() {
        Neo.Cryptography.RandomNumberGenerator.startCollectors();
    }
    /**
     * @method 初始化根域名信息
     */
    NNSTool.initRootDomain = function (root) {
        return __awaiter(this, void 0, void 0, function () {
            var test, scriptaddress, domain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        test = new entity_1.RootDomainInfo();
                        test.roothash = NNSTool.nameHash(root);
                        test.rootname = root;
                        scriptaddress = entity_1.Consts.baseContract;
                        return [4 /*yield*/, NNSTool.getOwnerInfo(test.roothash, scriptaddress)];
                    case 1:
                        domain = _a.sent();
                        test.owner = domain.owner;
                        test.register = domain.register;
                        test.resolver = domain.resolver;
                        test.ttl = domain.ttl;
                        //判断根域名进行初始化
                        root == "test" ? NNSTool.root_test = test : NNSTool.root_neo = test;
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
            var domainarr, nnshash, doamininfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        domainarr = doamin.split('.');
                        nnshash = NNSTool.nameHashArray(domainarr);
                        return [4 /*yield*/, NNSTool.getOwnerInfo(nnshash, entity_1.Consts.baseContract)];
                    case 1:
                        doamininfo = _a.sent();
                        // let info = await NNSTool.getNameInfo(nnshash)
                        // var owner = doamininfo.owner.toHexString();
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
                        sb.EmitParamJson(["(addr)" + address, "(hex256)" + nnshash.toString(), "(str)" + doamin]); //第二个参数是个数组
                        sb.EmitPushString("requestSubDomain");
                        sb.EmitAppCall(scriptaddress);
                        data = sb.ToArray();
                        return [4 /*yield*/, importpack_1.tools.coinTool.contractInvokeTrans_attributes(data)];
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
                        scriptaddress = entity_1.Consts.baseContract;
                        sb.EmitAppCall(scriptaddress);
                        data = sb.ToArray();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.rpc_getInvokescript(data)];
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
                        scriptaddress = entity_1.Consts.baseContract;
                        sb.EmitAppCall(scriptaddress);
                        data = sb.ToArray();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.rpc_getInvokescript(data)];
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
            var info, data, result, state, rest, stackarr, stack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        info = new entity_1.DomainInfo();
                        data = importpack_1.tools.contract.buildScript(scriptaddress, "getOwnerInfo", ["(hex256)" + domain.toString()]);
                        return [4 /*yield*/, importpack_1.tools.wwwtool.rpc_getInvokescript(data)];
                    case 1:
                        result = _a.sent();
                        try {
                            state = result.state;
                            // info2.textContent = "";
                            if (state.includes("HALT, BREAK")) {
                                // info2.textContent += "Succ\n";
                            }
                            rest = new entity_1.NNSResult();
                            rest.textInfo = result;
                            stackarr = result["stack"];
                            stack = entity_1.ResultItem.FromJson(entity_1.DataType.Array, stackarr).subItem[0].subItem;
                            if (stackarr[0].type == "Array") {
                                info.owner = stack[0].AsHash160();
                                info.register = stack[1].AsHash160();
                                info.resolver = stack[2].AsHash160();
                                info.ttl = stack[3].AsInteger().toString();
                                // console.log(info.register.toString() + " ：" + "0xd90d82bf64083312b0b7b8dc668d633cf56899ec");
                                // let parentOwner = (stack[ 5 ].value as string).hexToBytes();
                                // let domainstr = stack[ 5 ].value as string;
                                // let parentHash = (stack[ 6 ].value as string).hexToBytes();
                                // let bt = (stack[ 7 ].value as string).hexToBytes();
                                // let root = Neo.BigInteger.fromUint8ArrayAutoSign(bt);
                                // let a = new Neo.BigInteger(stack[ 7 ].value as string);
                            }
                        }
                        catch (e) {
                            console.error(e);
                        }
                        return [2 /*return*/, info];
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
    NNSTool.setResolve = function (domain, resolverhash) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, hashstr, arr, nnshash, resolvestr, scriptaddress, sb, random_uint8, random_int, data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(entity_1.LoginInfo.getCurrentAddress());
                        hashstr = hash.reverse().toHexString();
                        arr = domain.split(".");
                        nnshash = importpack_1.tools.nnstool.nameHashArray(arr);
                        resolvestr = resolverhash.reverse().toHexString();
                        scriptaddress = entity_1.Consts.baseContract;
                        sb = new ThinNeo.ScriptBuilder();
                        random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues(new Uint8Array(32));
                        random_int = Neo.BigInteger.fromUint8Array(random_uint8);
                        //塞入随机数
                        sb.EmitPushNumber(random_int);
                        sb.Emit(ThinNeo.OpCode.DROP);
                        sb.EmitParamJson([
                            "(hex160)" + hashstr,
                            "(hex256)" + nnshash.toString(),
                            "(hex160)" + resolvestr
                        ]); //第二个参数是个数组
                        sb.EmitPushString("owner_SetResolver");
                        sb.EmitAppCall(scriptaddress);
                        data = sb.ToArray();
                        return [4 /*yield*/, importpack_1.tools.coinTool.contractInvokeTrans_attributes(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    NNSTool.setResolveData = function (domain, str, resolve) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, hashstr, arr, nnshash, scriptaddress, sb, random_uint8, random_int, data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(entity_1.LoginInfo.getCurrentAddress());
                        hashstr = hash.reverse().toHexString();
                        arr = domain.split(".");
                        nnshash = importpack_1.tools.nnstool.nameHashArray(arr);
                        scriptaddress = resolve.hexToBytes();
                        sb = new ThinNeo.ScriptBuilder();
                        random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues(new Uint8Array(32));
                        random_int = Neo.BigInteger.fromUint8Array(random_uint8);
                        //塞入随机数
                        sb.EmitPushNumber(random_int);
                        sb.Emit(ThinNeo.OpCode.DROP);
                        sb.EmitParamJson([
                            "(hex160)" + hashstr,
                            "(hex256)" + nnshash.toString(),
                            "(str)",
                            "(str)addr",
                            "(str)" + str
                        ]);
                        sb.EmitPushString("setResolveData");
                        sb.EmitAppCall(scriptaddress.reverse());
                        data = sb.ToArray();
                        console.log(data.toHexString());
                        return [4 /*yield*/, importpack_1.tools.coinTool.contractInvokeTrans_attributes(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
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
                        scriptaddress = entity_1.Consts.baseContract;
                        arr = domain.split(".");
                        nnshash = NNSTool.nameHashArray(arr);
                        nnshashstr = nnshash;
                        sb = new ThinNeo.ScriptBuilder();
                        sb.EmitParamJson([
                            "(str)addr",
                            "(hex256)" + nnshashstr,
                            "(str)" + ""
                        ]);
                        sb.EmitPushString("resolve");
                        sb.EmitAppCall(scriptaddress);
                        data = sb.ToArray();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.rpc_getInvokescript(data)];
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
     * 域名转hash
     * #region 域名转hash算法
     * 域名转hash算法
     * aaa.bb.test =>{"test","bb","aa"}
     * @param domain 域名
     */
    NNSTool.nameHash = function (domain) {
        var domain_bytes = ThinNeo.Helper.String2Bytes(domain);
        var hashd = Neo.Cryptography.Sha256.computeHash(domain_bytes);
        return new Neo.Uint256(hashd);
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
        var domainUint8arry = domain_bytes.concat(new Uint8Array(roothash.bits.buffer));
        var sub = Neo.Cryptography.Sha256.computeHash(domainUint8arry);
        return new Neo.Uint256(sub);
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
        var reg = /^(.+\.)(test|TEST|[a-z][a-z])$/;
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
    NNSTool.verifyNeoDomain = function (domain) {
        //check domain valid
        var reg = /^(.+\.)(neo|Neo)$/;
        if (!reg.test(domain)) {
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

/***/ "cou+":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "d1Rh":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "eL9F":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/exchange/exchange.ts
var exchange = __webpack_require__("Uyb2");
var exchange_default = /*#__PURE__*/__webpack_require__.n(exchange);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3b7c2d64","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/exchange/exchange.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container exchange-box"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('exchange.title')))])]),_vm._v(" "),_c('div',{staticClass:"form-box"},[_c('div',{staticClass:"exchange-sgas"},[(!_vm.changeSGas)?_c('div',{staticClass:"gas-sgas"},[_c('div',{staticClass:"choose-wrap wrap-left"},[_c('img',{attrs:{"src":__webpack_require__("Az9s"),"alt":"gas-nomal.png"}}),_vm._v(" "),_c('div',{staticClass:"change-type"},[_c('span',[_vm._v("Gas")]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t('exchange.balance'))+": "),_c('span',[_vm._v(_vm._s(_vm.myGas))])])])]),_vm._v(" "),_c('div',{staticClass:"guid-img"},[_c('img',{attrs:{"src":__webpack_require__("IjLt"),"alt":"guiding.png"}})]),_vm._v(" "),_c('div',{staticClass:"choose-wrap wrap-right"},[_c('img',{attrs:{"src":__webpack_require__("qrTz"),"alt":"sgas-nomal.png"}}),_vm._v(" "),_c('div',{staticClass:"change-type"},[_c('span',[_vm._v("SGas")]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t('exchange.balance'))+": "),_c('span',[_vm._v(_vm._s(_vm.mySGas))])])])])]):_vm._e(),_vm._v(" "),(_vm.changeSGas)?_c('div',{staticClass:"gas-sgas"},[_c('div',{staticClass:"choose-wrap wrap-left"},[_c('img',{attrs:{"src":__webpack_require__("qrTz"),"alt":"sgas-nomal.png"}}),_vm._v(" "),_c('div',{staticClass:"change-type"},[_c('span',[_vm._v("SGas")]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t('exchange.balance'))+": "),_c('span',[_vm._v(_vm._s(_vm.mySGas))])])])]),_vm._v(" "),_c('div',{staticClass:"guid-img"},[_c('img',{attrs:{"src":__webpack_require__("IjLt"),"alt":"guiding.png"}})]),_vm._v(" "),_c('div',{staticClass:"choose-wrap wrap-right"},[_c('img',{attrs:{"src":__webpack_require__("Az9s"),"alt":"gas-nomal.png"}}),_vm._v(" "),_c('div',{staticClass:"change-type"},[_c('span',[_vm._v("Gas")]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t('exchange.balance'))+": "),_c('span',[_vm._v(_vm._s(_vm.myGas))])])])])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"exchange-img",on:{"click":_vm.exchangeTranType}},[_c('img',{attrs:{"src":__webpack_require__("JxTv"),"alt":"exchange.png"}})])]),_vm._v(" "),_c('div',{staticClass:"sgas-tip"},[_vm._v("\n            "+_vm._s(_vm.$t('exchange.tips'))+"\n          ")]),_vm._v(" "),_c('div',{staticClass:"trans-box"},[_c('div',{staticClass:"spent-box"},[_c('div',{staticClass:"spent-msg"},[_vm._v("\n                  "+_vm._s(_vm.$t('exchange.spend'))+" \n                ")]),_vm._v(" "),_c('div',{staticClass:"spent-input"},[_c('div',{staticClass:"img-icon"},[_c('img',{attrs:{"src":__webpack_require__("8Xo2"),"alt":"plus.png"}})]),_vm._v(" "),_c('div',{staticClass:"input-icon"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.transcount),expression:"transcount"}],attrs:{"type":"number","placeholder":"0","autocomplete":"off"},domProps:{"value":(_vm.transcount)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.transcount=$event.target.value},_vm.exchangeCount]}})]),_vm._v(" "),_c('div',{staticClass:"msg-icon"},[_vm._v("\n                    "+_vm._s(_vm.changeSGas?"SGas":"Gas")+"\n                  ")])])]),_vm._v(" "),_c('div',{staticClass:"spent-box"},[_c('div',{staticClass:"spent-msg"},[_vm._v("\n                  "+_vm._s(_vm.$t('exchange.receive'))+"  \n                ")]),_vm._v(" "),_c('div',{staticClass:"spent-input disable-input"},[_c('div',{staticClass:"img-icon"},[_c('img',{attrs:{"src":__webpack_require__("aLFK"),"alt":"minus.png"}})]),_vm._v(" "),_c('div',{staticClass:"input-icon"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.transcount),expression:"transcount"}],attrs:{"type":"number","placeholder":_vm.$t('exchange.amount'),"disabled":""},domProps:{"value":(_vm.transcount)},on:{"input":function($event){if($event.target.composing){ return; }_vm.transcount=$event.target.value}}})]),_vm._v(" "),_c('div',{staticClass:"msg-icon"},[_vm._v("\n                    "+_vm._s(_vm.changeSGas?"Gas":"SGas")+"\n                  ")])])])]),_vm._v(" "),(_vm.transcount > _vm.exMaxcount)?_c('div',{staticClass:"spent-tip ff6"},[_vm._v("\n            "+_vm._s(_vm.$t('exchange.warnmsg'))+" \n          ")]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"btn-right"},[(!_vm.isCheckingTran)?_c('button',{staticClass:"btn btn-nel btn-big",class:{'btn-disable':(_vm.transcount > _vm.exMaxcount || !_vm.exchangebtn)},attrs:{"disabled":_vm.transcount > _vm.exMaxcount || !_vm.exchangebtn},on:{"click":function($event){_vm.exChange()}}},[_vm._v(_vm._s(_vm.$t('btn.exchange')))]):_vm._e(),_vm._v(" "),(_vm.isCheckingTran)?_c('spinner-wrap',{staticStyle:{"margin-left":"20px"}}):_vm._e()],1)]),_vm._v(" "),(_vm.exchangeList)?_c('div',{staticClass:"form-box tran-list"},[_c('h3',{staticClass:"tran-title"},[_vm._v(_vm._s(_vm.$t('exchange.waittitle')))]),_vm._v(" "),_vm._l((_vm.exchangeList),function(item,index){return _c('div',{key:index,staticClass:"tran-history"},[(item.trantype == 'Gas')?_c('p',[_vm._v(_vm._s(_vm.$t('exchange.tosgas'))+"："+_vm._s(item.trancount)+" "+_vm._s(item.trantype)+", TXID: "+_vm._s(item.txid))]):_vm._e(),_vm._v(" "),(item.trantype == 'SGas')?_c('p',[_vm._v(_vm._s(_vm.$t('exchange.togas'))+"："+_vm._s(item.trancount)+" "+_vm._s(item.trantype)+", TXID: "+_vm._s(item.txid))]):_vm._e()])})],2):_vm._e()])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var exchange_exchange = (esExports);
// CONCATENATED MODULE: ./src/pages/exchange/exchange.vue
function injectStyle (ssrContext) {
  __webpack_require__("S2mm")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3b7c2d64"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  exchange_default.a,
  exchange_exchange,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_exchange_exchange = __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "eY8M":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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

/***/ "j5wB":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "jrmo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/bid/neoauction.ts
var neoauction = __webpack_require__("8KnJ");
var neoauction_default = /*#__PURE__*/__webpack_require__.n(neoauction);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7eca8455","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/bid/neoauction.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"box-warp"},[(!_vm.auctionPage)?_c('div',{staticClass:"page-one"},[_c('div',{staticClass:"tips-box"},[_vm._v("\n          "+_vm._s(_vm.$t('auction.tipsmsg1'))),_c('br'),_vm._v(" "),_c('ol',[_c('li',[_vm._v(_vm._s(_vm.$t('auction.tipsmsg2')))]),_vm._v(" "),_c('li',[_vm._v(_vm._s(_vm.$t('auction.tipsmsg3')))])])]),_vm._v(" "),_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('auction.titleaccount')))])]),_vm._v(" "),_c('div',{staticClass:"form-box pall"},[_c('div',{staticClass:"msg-list"},[_c('div',{staticClass:"sgas-count"},[_c('span',[_vm._v("SGas")]),_c('span',{staticClass:"num"},[_vm._v(" "+_vm._s(_vm.regBalance))])])]),_vm._v(" "),_c('div',{staticClass:"btn-right"},[_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.openWithdraw}},[_vm._v(_vm._s(_vm.$t('btn.withdraw')))]),_vm._v(" "),_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.openTopUp}},[_vm._v(_vm._s(_vm.$t('btn.topup')))])])]),_vm._v(" "),_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('auction.title1')))])]),_vm._v(" "),_c('div',{staticClass:"form-box ptop"},[_c('div',{staticClass:"input-box"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.domain),expression:"domain"}],attrs:{"type":"text","placeholder":_vm.$t('auction.entername'),"autocomplete":"off"},domProps:{"value":(_vm.domain)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.domain=$event.target.value},_vm.queryDomainState]}}),_vm._v(" "),_c('span',[_vm._v(".neo")])]),_vm._v(" "),(_vm.btn_start==0)?_c('spinner-wrap',{staticStyle:{"margin-left":"20px"}}):_vm._e(),_vm._v(" "),(_vm.btn_start==1 && !!_vm.domain.length)?_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.openAuction}},[_vm._v(_vm._s(_vm.$t('btn.openauction')))]):_vm._e(),_vm._v(" "),(_vm.btn_start==2)?_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.addBid}},[_vm._v(_vm._s(_vm.$t('btn.newbid')))]):_vm._e(),_vm._v(" "),(_vm.btn_start==3)?_c('button',{staticClass:"btn btn-nel btn-big btn-disable",attrs:{"disabled":"disabled"}},[_vm._v(_vm._s(_vm.$t('btn.newbid')))]):_vm._e(),_vm._v(" "),(!_vm.domain.length||_vm.btn_start==4)?_c('button',{staticClass:"btn btn-nel btn-big btn-disable",attrs:{"disabled":"disabled"}},[_vm._v(_vm._s(_vm.$t('btn.openauction')))]):_vm._e(),_vm._v(" "),(_vm.checkState==1 && !!_vm.domain.length)?_c('div',{staticClass:"msg-box status-being"},[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.$t('auction.checkavailable')))])]):_vm._e(),_vm._v(" "),(_vm.checkState==2)?_c('div',{staticClass:"msg-box status-being"},[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.$t('auction.checkbeing')))])]):_vm._e(),_vm._v(" "),(_vm.checkState==3)?_c('div',{staticClass:"msg-box status-ended"},[_c('span',[_vm._v(_vm._s(_vm.$t('auction.checkbuyer')))])]):_vm._e(),_vm._v(" "),(_vm.checkState==4)?_c('div',{staticClass:"msg-box status-ended"},[_c('span',[_vm._v(_vm._s(_vm.$t('auction.checkformat')))])]):_vm._e()],1),_vm._v(" "),_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('auction.title2')))]),_vm._v(" "),_c('div',{staticClass:"seach-box"},[_c('input',{attrs:{"type":"search","name":"","id":"","placeholder":_vm.$t('auction.searchmsg'),"autocomplete":"off"}}),_vm._v(" "),_c('img',{attrs:{"src":__webpack_require__("zH9E"),"alt":""}})])]),_vm._v(" "),_vm._l((_vm.myAuctionList),function(item,index){return (_vm.myAuctionList)?_c('div',{key:index,staticClass:"form-box mbottom"},[_c('div',{staticClass:"msg-list"},[_c('div',{staticClass:"msg-neoname"},[_vm._v("\n                    "+_vm._s(item.domain)+"\n                ")]),_vm._v(" "),_c('div',{staticClass:"msg-status"},[_vm._v("\n                    "+_vm._s(_vm.$t('auction.status'))+": \n                    "),(item.auctionState=='1')?_c('span',{staticClass:"status-being"},[_vm._v(_vm._s(_vm.$t('auction.fixedperiod')))]):_vm._e(),_vm._v(" "),(item.auctionState=='2')?_c('span',{staticClass:"status-random"},[_vm._v(_vm._s(_vm.$t('auction.randomperiod')))]):_vm._e(),_vm._v(" "),(item.auctionState=='3')?_c('span',{staticClass:"status-random"},[_vm._v(_vm._s(_vm.$t('auction.waiting')))]):_vm._e(),_vm._v(" "),(item.auctionState=='0')?_c('span',{staticClass:"status-ended"},[_vm._v(_vm._s(_vm.$t('auction.ended')))]):_vm._e(),_vm._v(" "),_c('v-hint',[_c('div',{staticClass:"hint-img"},[(item.auctionState=='1')?_c('img',{attrs:{"src":__webpack_require__("Iced"),"alt":""}}):_vm._e(),_vm._v(" "),(item.auctionState=='2')?_c('img',{attrs:{"src":__webpack_require__("GEdN"),"alt":""}}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"hint-content"},[_c('p',[_vm._v(_vm._s(_vm.$t('auction.statustips')))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t('auction.statustips2')))])])])],1),_vm._v(" "),_c('div',{staticClass:"msg-price"},[_vm._v("\n                    "+_vm._s(_vm.$t('auction.lastauctionprice'))+": "),_c('span',[_vm._v(_vm._s(item.maxPrice))]),_vm._v(" SGas\n                ")]),_vm._v(" "),(item.maxBuyer != _vm.address)?_c('div',{staticClass:"msg-bidder"},[_vm._v("\n                    "+_vm._s(item.auctionState>0?_vm.$t('auction.currentbidder'):_vm.$t('auction.buyer'))+": "),_c('span',[_vm._v(_vm._s(_vm.$t('auction.other'))+" （ "+_vm._s(item.maxBuyer)+" ）")])]):_vm._e(),_vm._v(" "),(item.maxBuyer == _vm.address)?_c('div',{staticClass:"msg-bidder"},[_vm._v("\n                    "+_vm._s(item.auctionState>0?_vm.$t('auction.currentbidder'):_vm.$t('auction.buyer'))+": "),_c('span',{staticClass:"bidder-me"},[_vm._v(_vm._s(_vm.$t('auction.me'))+" （ "+_vm._s(_vm.address)+" ）")])]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"msg-time"},[_vm._v("\n                    "+_vm._s(_vm.$t('auction.bidstarttimemsg'))+": "),_c('span',[_vm._v(_vm._s(item.startTimeStr))])]),_vm._v(" "),_vm._l((item.bidListSession),function(value,key){return (item.bidListSession)?_c('div',{key:key},[_vm._v("\n                  "+_vm._s(value)+"\n                ")]):_vm._e()})],2),_vm._v(" "),_c('div',{staticClass:"btn-right"},[(item.auctionState=='1'||item.auctionState=='2')?_c('button',{staticClass:"btn btn-nel btn-bid",on:{"click":function($event){_vm.onGoBidInfo(item)}}},[_vm._v(_vm._s(_vm.$t('btn.bid')))]):_vm._e(),_vm._v(" "),(item.auctionState=='0' && item.maxBuyer==_vm.address && item.receivedState==0)?_c('button',{staticClass:"btn btn-nel btn-bid",on:{"click":function($event){_vm.onGoBidInfo(item)}}},[_vm._v(_vm._s(_vm.$t('btn.getdomain')))]):_vm._e(),_vm._v(" "),(item.auctionState=='0' && item.maxBuyer!=_vm.address && item.receivedState==0)?_c('button',{staticClass:"btn btn-nel btn-bid",on:{"click":function($event){_vm.onGoBidInfo(item)}}},[_vm._v(_vm._s(_vm.$t('btn.recoversgas')))]):_vm._e(),_vm._v(" "),(item.auctionState=='0' && item.maxBuyer!=_vm.address && item.receivedState>0)?_c('button',{staticClass:"btn btn-nel btn-bid",on:{"click":function($event){_vm.onGoBidInfo(item)}}},[_vm._v(_vm._s(_vm.$t('btn.receivedsgas')))]):_vm._e(),_vm._v(" "),(item.auctionState=='0' && item.maxBuyer==_vm.address && item.receivedState>0)?_c('button',{staticClass:"btn btn-nel btn-bid",on:{"click":function($event){_vm.onGoBidInfo(item)}}},[_vm._v(_vm._s(_vm.$t('btn.receivednns')))]):_vm._e()])]):_vm._e()})],2):_vm._e(),_vm._v(" "),(_vm.auctionPage)?_c('auction-info',{attrs:{"item":_vm.domainInfo},on:{"onBack":_vm.onBack}}):_vm._e(),_vm._v(" "),(_vm.auctionShow)?_c('div',{staticClass:"auction-wrap"},[_c('div',{staticClass:"auction-box"},[_c('div',{staticClass:"auction-title"},[_vm._v(_vm._s(_vm.$t('auction.acutiontitle')))]),_vm._v(" "),_c('div',{staticClass:"wrap-msg"},[_c('div',{staticClass:"domain-name"},[_vm._v(_vm._s(_vm.$t('auction.domain'))+": "+_vm._s(_vm.auctionMsg_alert.domain))]),_vm._v(" "),_c('div',{staticClass:"auction-status"},[_vm._v(_vm._s(_vm.$t('auction.status'))+":                \n            "),(_vm.auctionMsg_alert.auctionState=='1')?_c('span',{staticClass:"status-being"},[_vm._v(_vm._s(_vm.$t('auction.fixedperiod')))]):_vm._e(),_vm._v(" "),(_vm.auctionMsg_alert.auctionState=='2')?_c('span',{staticClass:"status-random"},[_vm._v(_vm._s(_vm.$t('auction.randomperiod')))]):_vm._e(),_vm._v(" "),(_vm.auctionMsg_alert.auctionState=='3')?_c('span',{staticClass:"status-random"},[_vm._v(_vm._s(_vm.$t('auction.waiting')))]):_vm._e(),_vm._v(" "),(_vm.auctionMsg_alert.auctionState=='0')?_c('span',{staticClass:"status-ended"},[_vm._v(_vm._s(_vm.$t('auction.ended')))]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"auction-price"},[_vm._v(_vm._s(_vm.$t('auction.highest'))+": "+_vm._s(_vm.auctionMsg_alert.maxPrice)+" SGas")])]),_vm._v(" "),_c('div',{staticClass:"wrap-msg"},[_c('div',{staticClass:"my-bid"},[_c('span',[_vm._v(_vm._s(_vm.$t('auction.raisebid'))+": ")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.alert_myBid),expression:"alert_myBid"}],staticClass:"bid-input",attrs:{"type":"number","placeholder":_vm.$t('auction.enterbid'),"autocomplete":"off"},domProps:{"value":(_vm.alert_myBid)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.alert_myBid=$event.target.value},_vm.verifBidAmount]}})]),_vm._v(" "),_c('div',{staticClass:"my-bid"},[_vm._v("\n            "+_vm._s(_vm.$t('auction.yourbidmsg'))+": "),_c('span',{class:{'status-being':_vm.canAdded,'status-ended':!_vm.canAdded}},[_vm._v(_vm._s(_vm.myBalanceOfSelling))]),_vm._v(" SGas\n          ")])]),_vm._v(" "),_c('div',{staticClass:"tips-msg"},[_vm._v("\n          "+_vm._s(_vm.$t('auction.tips1'))+"\n        ")]),_vm._v(" "),_c('div',{staticClass:"btn-bid-box"},[(_vm.canAdded)?_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":function($event){_vm.bidDomain()}}},[_vm._v(_vm._s(_vm.$t('btn.bid')))]):_c('button',{staticClass:"btn btn-nel btn-big btn-disable",attrs:{"disabled":"disabled"}},[_vm._v(_vm._s(_vm.$t('btn.bid')))])]),_vm._v(" "),_c('div',{staticClass:"auction-close"},[_c('span',{attrs:{"aria-hidden":"true"},on:{"click":function($event){_vm.auctionShow = !_vm.auctionShow}}},[_vm._v("×")])])])]):_vm._e(),_vm._v(" "),(_vm.alert_TopUp.isShow)?_c('div',{staticClass:"account-wrap"},[_c('div',{staticClass:"account-box"},[_c('div',{staticClass:"account-title"},[_c('span',[_vm._v(_vm._s(_vm.$t('auction.topup')))])]),_vm._v(" "),_c('div',{staticClass:"line-wrap"},[_c('div',{staticClass:"line-msg"},[_vm._v(_vm._s(_vm.$t('auction.from'))+":")]),_vm._v(" "),_c('div',{staticClass:"line-box"},[_c('input',{staticClass:"readonly-input",attrs:{"type":"text","disabled":""},domProps:{"value":_vm.$t('auction.yourbalance')}})]),_vm._v(" "),_c('div',{staticClass:"err-msg"},[_vm._v("\n            "+_vm._s(_vm.alert_available)+" "+_vm._s(_vm.$t('auction.isAvailable'))+".\n          ")])]),_vm._v(" "),_c('div',{staticClass:"line-wrap"},[_c('div',{staticClass:"line-msg"},[_vm._v(_vm._s(_vm.$t('auction.topupamount'))+":")]),_vm._v(" "),_c('div',{staticClass:"line-box"},[_c('div',{staticClass:"input-getall"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.alert_TopUp.input),expression:"alert_TopUp.input"}],attrs:{"type":"number","placeholder":_vm.$t('auction.amount'),"autocomplete":"off"},domProps:{"value":(_vm.alert_TopUp.input)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.alert_TopUp, "input", $event.target.value)},_vm.verifToupAmount]}}),_vm._v(" "),_c('span',{staticClass:"getall-msg",on:{"click":function($event){_vm.alert_TopUp.input = _vm.sgasAvailable}}},[_vm._v(_vm._s(_vm.$t('auction.getall')))])]),_vm._v(" "),(!_vm.alert_TopUp.watting)?_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.toRecharge}},[_vm._v(_vm._s(_vm.$t('btn.confirm')))]):_c('spinner-wrap')],1),_vm._v(" "),(_vm.alert_TopUp.error)?_c('div',{staticClass:"status-ended err-msg"},[_vm._v("\n            "+_vm._s(_vm.$t('auction.errmsg1'))+" "+_vm._s(_vm.alert_available)+" "+_vm._s(_vm.$t('auction.errmsg3'))+"\n          ")]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"account-tips"},[_vm._v("\n          "+_vm._s(_vm.$t('auction.toptips'))+"\n        ")]),_vm._v(" "),_c('div',{staticClass:"account-close",on:{"click":function($event){_vm.alert_TopUp.isShow=!_vm.alert_TopUp.isShow}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])]):_vm._e(),_vm._v(" "),(_vm.alert_withdraw.isShow)?_c('div',{staticClass:"account-wrap"},[_c('div',{staticClass:"account-box"},[_c('div',{staticClass:"account-title"},[_c('span',[_vm._v(_vm._s(_vm.$t('auction.withdraw')))])]),_vm._v(" "),_c('div',{staticClass:"line-wrap"},[_c('div',{staticClass:"line-msg"},[_vm._v(_vm._s(_vm.$t('auction.to'))+":")]),_vm._v(" "),_c('div',{staticClass:"line-box"},[_c('input',{staticClass:"readonly-input",attrs:{"type":"text","disabled":""},domProps:{"value":_vm.$t('auction.yourbalance')}})])]),_vm._v(" "),_c('div',{staticClass:"line-wrap"},[_c('div',{staticClass:"line-msg"},[_vm._v(_vm._s(_vm.$t('auction.withdrawamount'))+":")]),_vm._v(" "),_c('div',{staticClass:"line-box"},[_c('div',{staticClass:"input-getall"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.alert_withdraw.input),expression:"alert_withdraw.input"}],attrs:{"type":"number","placeholder":_vm.$t('auction.amount'),"autocomplete":"off"},domProps:{"value":(_vm.alert_withdraw.input)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.alert_withdraw, "input", $event.target.value)},_vm.verifWithdraw]}}),_vm._v(" "),_c('span',{staticClass:"getall-msg",on:{"click":function($event){_vm.alert_withdraw.input = _vm.regBalance}}},[_vm._v(_vm._s(_vm.$t('auction.getall')))])]),_vm._v(" "),(_vm.alert_withdraw.watting)?_c('spinner-wrap'):_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.withdraw}},[_vm._v(_vm._s(_vm.$t('btn.confirm')))])],1),_vm._v(" "),(_vm.alert_withdraw.error)?_c('div',{staticClass:"status-ended err-msg"},[_vm._v("\n            "+_vm._s(_vm.$t('auction.errmsg1'))+" "+_vm._s(_vm.regBalance)+" SGas "+_vm._s(_vm.$t('auction.errmsg3'))+"\n          ")]):_c('div',{staticClass:"err-msg"},[_vm._v("\n            "+_vm._s(_vm.regBalance)+" SGas "+_vm._s(_vm.$t('auction.isAvailable'))+"\n          ")])]),_vm._v(" "),_c('div',{staticClass:"account-tips"},[_vm._v("\n          "+_vm._s(_vm.$t('auction.withdrawtips'))+"\n        ")]),_vm._v(" "),_c('div',{staticClass:"account-close",on:{"click":function($event){_vm.alert_withdraw.isShow=!_vm.alert_withdraw.isShow}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])]):_vm._e(),_vm._v(" "),_c('v-toast',{ref:"toast"})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var bid_neoauction = (esExports);
// CONCATENATED MODULE: ./src/pages/bid/neoauction.vue
function injectStyle (ssrContext) {
  __webpack_require__("3YjA")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7eca8455"
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

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-8294d46a","hasScoped":false,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/layouts/Main.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[_c('nav',{staticClass:"navbar navbar-nel navbar-fixed-top"},[_c('div',{staticClass:"container"},[_c('div',{staticClass:"navbar-header"},[_c('button',{staticClass:"navbar-toggle collapsed",attrs:{"type":"button","data-toggle":"collapse","data-target":"#navbar","aria-expanded":"false","aria-controls":"navbar"}},[_c('span',{staticClass:"sr-only"},[_vm._v(_vm._s(_vm.$t('navbar.toggle')))]),_vm._v(" "),_c('span',{staticClass:"icon-bar"}),_vm._v(" "),_c('span',{staticClass:"icon-bar"}),_vm._v(" "),_c('span',{staticClass:"icon-bar"})])]),_vm._v(" "),_c('div',{staticClass:"navbar-collapse collapse",attrs:{"id":"navbar"}},[_c('div',{staticClass:"logo"}),_vm._v(" "),_c('ul',{staticClass:"nav navbar-nav navbar-left"},[_c('li',[_c('a',{attrs:{"href":"https://scan.nel.group/#mainnet","target":"_blank"}},[_vm._v(_vm._s(_vm.$t('navbar.explorer')))])]),_vm._v(" "),_c('li',[_c('a',{staticClass:"active-nel",attrs:{"href":"#wallet"}},[_vm._v(_vm._s(_vm.$t('navbar.wallet')))])])]),_vm._v(" "),_c('ul',{staticClass:"nav navbar-nav navbar-right"},[_c('li',{staticClass:"dropdown"},[_c('a',{staticClass:"dropdown-toggle",attrs:{"data-toggle":"dropdown","role":"button","aria-haspopup":"true","aria-expanded":"false"}},[_c('span',{staticClass:"text",attrs:{"id":"network"}},[_vm._v(_vm._s(_vm.$t('navbar.testnet')))]),_vm._v(" "),_c('span',{staticClass:" caret"})]),_vm._v(" "),_c('ul',{staticClass:"dropdown-menu dropdown-nel"},[_c('li',{staticClass:"active",attrs:{"id":"testnet-btn"}},[_c('a',{attrs:{"id":"testa"}},[_vm._v(_vm._s(_vm.$t('navbar.testnet')))])]),_vm._v(" "),_c('li',{attrs:{"id":"mainnet-btn"}},[_c('a',{attrs:{"target":"_blank","href":"https://wallet.nel.group/#login","id":"maina"}},[_vm._v(_vm._s(_vm.$t('navbar.mainnet')))])])])]),_vm._v(" "),(_vm.loginshow)?_c('li',[_c('v-link',{ref:"login",attrs:{"href":"#login"}},[_vm._v(_vm._s(_vm.$t('navbar.logout')))])],1):_vm._e()]),_vm._v(" "),_c('ul',{staticClass:"nav navbar-nav navbar-right"},[_c('li',{staticClass:"dropdown"},[_c('a',{staticClass:"dropdown-toggle",attrs:{"data-toggle":"dropdown","role":"button","aria-haspopup":"true","aria-expanded":"false"}},[_c('span',{staticClass:"text"},[_vm._v(_vm._s(_vm.currentLanguage))]),_vm._v(" "),_c('span',{staticClass:" caret"})]),_vm._v(" "),_c('ul',{staticClass:"dropdown-menu dropdown-nel"},[_c('li',{class:_vm.currentLanguage=='English'?'active':'',attrs:{"id":"testnet-btn"}},[_c('a',{on:{"click":function($event){_vm.cutLanguage(1)}}},[_vm._v("English")])]),_vm._v(" "),_c('li',{class:_vm.currentLanguage!='English'?'active':'',attrs:{"id":"mainnet-btn"}},[_c('a',{on:{"click":function($event){_vm.cutLanguage(2)}}},[_vm._v("中文")])])])])])])])]),_vm._v(" "),_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var layouts_Main = (esExports);
// CONCATENATED MODULE: ./src/layouts/Main.vue
function injectStyle (ssrContext) {
  __webpack_require__("mMCr")
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

/***/ "lJF1":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABuRJREFUaAXdW32IVFUUv+fO566uoOk/oW0Q+RVpYUIGyUKEf1Raiwl9ic6uG/jxh1mgmbEYkWTSH8qC686sSBGoaKUVJsFikAlJaVF+gkb0h0ZSurvzsfNOv/vWN3N35s3Mzs7c50z3n3veufeec3733HvfuffdR8JQ4o6OyUkr1WKxmEssZgri6SxoEgnRJJjHQ22ciW6h7F/QVwXRBdQ5L1l+H1i06DQtW5Y2YRr0Vy/FOzru43RqOQleLACUhRiTfDRCJ9AJKelAIBg+RF1dt6pl5ZgM0pUzMyVXRRbDkxvgucf1smrQRDTALA5KkttD0egvlcqsCHA8ElksBG9lwXMrNaRUexiKGUFHpJ/eDu6OnSlVv1D5mABzW1tzgq1dAPp0IcGm+DA4LaToCsngFuru/qdcPWUDTrSvXMoW78X8HFeusqrWJ/rT5xOtwe7eU+XIleVUBtjNALv/joNVRjPfbQ1xH2x6uRwMo/Iwr1sXig/ejApLvFSOcK/qYmF7PzSteRN1dlqldJYEzOtWTokPiM/QowtKCbuT5UTiixDLFygWu1nMjqJDmjs7g/UAVgHEq+upBFmfwOaimIoWJn6/0lXrntW9aYP+48o2nZdLFxzS8baVaxFU7MxtUA/PiNBeCfX0fuRmqyvgwfb2FuL0cQD2uzWqdR5AxRGgtLi9svIA85o1d8UHB37DrJhS68CK2of3dNgXmJ0bnOTN4US8/726B6t6Au/phJV8J7dTRng4GYk8YhGfwlDO64jchvXwDHBpGZDz9Nh7xBy11EbAMFg5a5bwP/uc3V9Dhw8L6xxmj6GEiNCHaGwrxC9xVGQ8nFy16qF0OvWjU2AkDwZFaMeHghobbfE8MCASG9YLkUwaUaeEAiDOGXxznK1lZuimOfW6Ma23BdOkSRmwtjEArngmkzqEsNh6w9FhA+ZIpIks0eowjeVDQ/mi3Xj5tSriIOxcyqtXq2Ml7CyRUsSt6IkGRZtM7DJ03XjVtgHrUmMqGbcdagPGYvV8tZW4ykul8tkunZBfqXKOZQ1jlLx/vw/DfGHlIkchwQ2cWyeMQlT5VXihwipTx47Ng8ubyhcwhhbptGAru2W1afC8SJiyExRWaYm0t/vcRCKLT6ezXGOURdajmMNyujENboL1IazTbnWrzWOaAcDWjGrLLSZPX5V1ulib6pVZCjA1V0/gKCTpC5dOj6JpxVWY7pGYzN4sWI61OkiddsoN5kxigkSs6S3glBY367RBoI5ohVVi3xhyGF7k+rzVaS90K6wq0ur3RJmjRB/GOu2Um8zxeVZi74RPkx6mpBZe6rQHJmC9uok5zH97oCujgpPZwEOnMxUMEgor5jC+vHuZBgez2nQ6yzVHASuGtDhnTkO+5PTp03Y8reJoRXuZFFY/XHw2G86bV8+XLorkNhyMqrOXS5fMK9Q0YP6e8QcbqS/Rj/2SbYJWapDky94CVVBU/wZloE/Szt7reDxrEF9tiIZ3cSj/l31Mi7F9RN268cSyiROF/4knbVVD3xwX4sYNT9TigsjnSpENmPy8j1PiLeOa/X4R3PimkJMn26rk/PkiuXmTEF4c5PkC+5RSFWmJ8O69FzGsv1O0yURTp2bAKj0KuOIZT0Tfhru7L9s6HWVS8g6HNpXztWuCtXevohXPdMLqnMGGxWs4YZ0mXBD5Gcv1Aw7PRC5nap9aPjX7qUXZT4LOhKKxh3EPBC8ie7VW2XBSV5JwnHnAef4/5CTkknAsZi9YCk/Gww44fPn/Gt4eXkYdZp3m8O7RcKz3Gd18e9HSGcLPa+D+bIQ/orB+HuDJ/hDJtbkW5wFWK7Yk6sitWE/PKqoiSSsoGr2aa3ceYFUh2BPbR1Jsz61cL88AuwWXWg662esKWFUMTb13o7rs5daopnlSfAyw7xaysSBgdY0v1Nj0Iib+r4Ua1xyf6GS4oamtmF15q3Ru5dtXhb/EVeHZuWU19azANoolw5uhwpYV9LDTRE380LjxC2p5eMNr0fC05pZSYBWmkh52gKs7jAlc62NLZK4POGV3Ksfrcwi614ejvbtGa8OoATsCk+2R5RZzN4ITT8+zHf3ZnK4L6VvW0NPTl+WVpkoO6VwR6pWF4ORB9C42s94n6LUwvfaEGxpnlQtWWVu2h3WIKvaGpztNbzgcnXhjfCUFfvKIxX5weOXmFQFWytQuK9nW1op7Iq/h6bFyDShVHwYO4l7gIR8FPgju2fNTqfqlyisGrCuIv7rifh6i5diIIWDnOWM9GMSwxa12PgFvHggwHSp1y123oRRdVcC6MvXrQHKAWyxBc0b8isc8AfXG4R+khPr0AQMUuKs4/ziPj/MXpPCdNPkr3n+RGniwgZPl9gAAAABJRU5ErkJggg=="

/***/ }),

/***/ "lXdV":
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
// import { LoginInfo } from "../tools/entity";
var Hint = /** @class */ (function (_super) {
    __extends(Hint, _super);
    //   @Prop({ default: true })
    function Hint() {
        return _super.call(this) || this;
    }
    Hint = __decorate([
        vue_property_decorator_1.Component({
            components: {}
        }),
        __metadata("design:paramtypes", [])
    ], Hint);
    return Hint;
}(vue_1.default));
exports.default = Hint;


/***/ }),

/***/ "mMCr":
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
/// <reference path="../../tools/number.d.ts"/>
var vue_1 = __webpack_require__("/5sW");
var vue_property_decorator_1 = __webpack_require__("EOM2");
var importpack_1 = __webpack_require__("VKSY");
var storagetool_1 = __webpack_require__("5LD5");
var entity_1 = __webpack_require__("6nHw");
var taskmanager_1 = __webpack_require__("XfB5");
var AuctionInfo = /** @class */ (function (_super) {
    __extends(AuctionInfo, _super);
    function AuctionInfo() {
        var _this = _super.call(this) || this;
        _this.address = entity_1.LoginInfo.getCurrentAddress();
        _this.domainAuctionInfo = new entity_1.MyAuction();
        _this.myBidPrice = "";
        _this.updatePrice = "0";
        _this.bidDetailList = [];
        _this.currentpage = 1;
        _this.pagesize = 5;
        _this.inputErrorCode = 0;
        _this.session_bid = new storagetool_1.sessionStoreTool("bidSession");
        _this.session_recover = new storagetool_1.sessionStoreTool("recoverSession");
        _this.session_getdomain = new storagetool_1.sessionStoreTool("getDomainSession");
        _this.fee = 0;
        _this.remaining = 0;
        _this.balanceOf = '';
        _this.bidState = 2;
        _this.btnShowmore = true;
        _this.fee = 0;
        _this.remaining = 0;
        _this.process = new entity_1.Process(new Date().getTime());
        _this.width = 0;
        _this.state_getDomain = 0;
        _this.state_recover = 0;
        _this.bidPrice = "";
        return _this;
    }
    AuctionInfo.prototype.mounted = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.session_bid = new storagetool_1.sessionStoreTool("bidSession");
                        this.session_recover = new storagetool_1.sessionStoreTool("recoverSession");
                        this.session_getdomain = new storagetool_1.sessionStoreTool("getDomainSession");
                        this.refresh = new importpack_1.tools.sessionstoretool("refresh_auction");
                        return [4 /*yield*/, this.init()];
                    case 1:
                        _a.sent();
                        if (!this.domainAuctionInfo.endTime) {
                            taskmanager_1.TaskManager.functionList = [];
                            taskmanager_1.TaskManager.functionList.push(this.init);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuctionInfo.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var auctionMsg, domain, _a, confirm_getDomain, confirm_recover, confirm_bid, txid, res, txid, method, txid;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        auctionMsg = new importpack_1.tools.sessionstoretool("auctionPage");
                        domain = auctionMsg.select("domain");
                        return [4 /*yield*/, importpack_1.tools.nnstool.initRootDomain("neo")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.initAuctionInfo(domain)];
                    case 2:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, importpack_1.tools.nnssell.getBalanceOf()];
                    case 3:
                        _a.balanceOf = _b.sent();
                        this.fee = accMul(this.myBidPrice, 0.10);
                        this.remaining = accSub(this.myBidPrice, this.fee);
                        this.initProcess();
                        this.bidDetailList = [];
                        return [4 /*yield*/, this.getSessionBidDetail(domain)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, this.getBidDetail(this.domainAuctionInfo.id, 1, 5)];
                    case 5:
                        _b.sent();
                        confirm_getDomain = this.session_getdomain.select(domain);
                        confirm_recover = this.session_recover.select(domain);
                        confirm_bid = this.session_bid.select(domain);
                        if (!confirm_recover) return [3 /*break*/, 7];
                        txid = confirm_recover["txid"];
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getrawtransaction(txid)];
                    case 6:
                        res = _b.sent();
                        if (!!res) {
                            if (parseFloat(this.domainAuctionInfo.balanceOfSelling) == 0) {
                                this.state_recover = 2;
                            }
                        }
                        else {
                            this.state_recover = 1;
                        }
                        _b.label = 7;
                    case 7:
                        if (confirm_getDomain) {
                            txid = confirm_getDomain["txid"];
                            method = confirm_getDomain["method"];
                            this.rechargConfirm(txid, method, domain);
                        }
                        if (confirm_bid) {
                            txid = confirm_bid["txid"];
                            this.bid_confirm(txid, domain);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // async refreshPage()
    // {
    //     let oldheight = this.refresh.select("height");
    //     let height = TaskManager.oldBlock.select('height');
    //     let bidlist = this.refresh.select("bidlist");
    //     let withdraw = this.refresh.select("withdraw");
    //     let topup = this.refresh.select("topup");
    //     if (oldheight)
    //     {
    //         if (oldheight < height)
    //         {
    //             setTimeout(() =>
    //             {
    //                 this.init();
    //                 this.refresh.put("bidlist", false);
    //                 this.refresh.put("height", height);
    //             }, 8000);
    //         }
    //     } else
    //     {
    //         this.refresh.put("height", height);
    //     }
    //     if (bidlist)
    //     {
    //         await this.init();
    //         this.refresh.put("bidlist", false);
    //     }
    // }
    /**
     * 初始化时间轴
     */
    AuctionInfo.prototype.initProcess = function () {
        this.process = new entity_1.Process(this.domainAuctionInfo.startAuctionTime);
        var currenttime = this.domainAuctionInfo.endTime > 0 ? this.domainAuctionInfo.endTime : new Date().getTime();
        var time = new Date(this.domainAuctionInfo.startAuctionTime).getTime();
        var oldtime = accSub(currenttime, this.domainAuctionInfo.startAuctionTime);
        var a = 0;
        switch (this.domainAuctionInfo.domainstate) {
            case entity_1.DomainState.end1://第五天结束或者随机期结束
                this.process.state = "" + this.$t('auction.ended');
                a = accDiv(oldtime, 5 * 5 * 60 * 1000);
                break;
            case entity_1.DomainState.end2://第三天结束
                this.process.state = "" + this.$t('auction.ended');
                a = accDiv(oldtime, 5 * 3 * 60 * 1000);
                this.process.timearr.length = 3;
                break;
            case entity_1.DomainState.fixed:
                this.process.state = "" + this.$t('auction.fixedperiod');
                a = accDiv(oldtime, 5 * 3 * 60 * 1000);
                this.process.timearr.length = 3;
                break;
            case entity_1.DomainState.random:
                this.process.state = "" + this.$t('auction.randomperiod');
                a = accDiv(oldtime, 5 * 5 * 60 * 1000);
                this.process.timearr.length = 5;
                break;
            default:
                break;
        }
        var width = a >= 1 ? 100 : accMul(a, 100);
        this.width = parseInt(width.toString());
    };
    /**
     * 初始化竞拍域名的详情状态信息
     */
    AuctionInfo.prototype.initAuctionInfo = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var info, myauction, balance, stateMsg, stateMsg_1, error_1, compare, mybidprice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.nnssell.getSellingStateByDomain(domain)];
                    case 1:
                        info = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.nnssell.getMyAuctionState(info)];
                    case 2:
                        myauction = _a.sent();
                        this.domainAuctionInfo = myauction;
                        return [4 /*yield*/, importpack_1.tools.nnssell.getBalanceOfBid(info.id)];
                    case 3:
                        balance = _a.sent();
                        this.domainAuctionInfo.balanceOfSelling = accDiv(balance.toString(), 100000000).toString();
                        this.myBidPrice = this.domainAuctionInfo.balanceOfSelling;
                        if (!(this.domainAuctionInfo.auctionState == "0")) return [3 /*break*/, 8];
                        stateMsg = undefined;
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getDomainState(this.address, "0x" + this.domainAuctionInfo.id)];
                    case 5:
                        stateMsg_1 = _a.sent();
                        this.myBidPrice = stateMsg_1["mybidprice"];
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        this.myBidPrice = "0";
                        return [3 /*break*/, 7];
                    case 7:
                        compare = Neo.Fixed8.parse(this.domainAuctionInfo.balanceOfSelling).compareTo(Neo.Fixed8.Zero);
                        this.domainAuctionInfo.receivedState = compare < 0 ? 0 : 1;
                        this.state_getDomain = 0;
                        this.state_recover = 0;
                        if (compare == 0 && this.domainAuctionInfo.owner == this.address) {
                            this.state_getDomain = 2;
                            this.state_recover = 2;
                        }
                        _a.label = 8;
                    case 8:
                        mybidprice = !!this.myBidPrice && this.myBidPrice != '' ? this.myBidPrice : 0;
                        this.updatePrice = mybidprice.toString();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 加价验证
     */
    AuctionInfo.prototype.myBidInput = function () {
        var mybidprice = !!this.myBidPrice && this.myBidPrice != '' ? this.myBidPrice : 0;
        if (!!this.bidPrice) {
            if (/\./.test(this.bidPrice)) {
                this.bidPrice = this.bidPrice.toString().substr(0, (this.bidPrice.toString().indexOf(".")) + 2);
            }
        }
        else {
            this.updatePrice = mybidprice.toString();
            this.bidState = 2;
            this.inputErrorCode = 2;
            return;
        }
        var bidPrice = Neo.Fixed8.parse(mybidprice + "");
        var balance = Neo.Fixed8.parse(!!this.balanceOf && this.balanceOf != '' ? this.balanceOf : '0');
        var sum = bidPrice.add(Neo.Fixed8.parse(this.bidPrice + ""));
        this.updatePrice = sum.toString();
        if (Neo.Fixed8.parse(this.updatePrice).compareTo(Neo.Fixed8.parse(this.domainAuctionInfo.maxPrice)) <= 0) {
            this.bidState = 2;
            // this.inputErrorCode = 1;
        }
        else {
            var result = balance.compareTo(sum);
            if (result < 0) {
                this.bidState = 2;
                this.inputErrorCode = 1;
            }
            else {
                this.bidState = 0;
                this.inputErrorCode = 0;
            }
        }
    };
    AuctionInfo.prototype.getDomain = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info, data1, data2, res, txid, data, res, txid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.state_getDomain = 1;
                        return [4 /*yield*/, importpack_1.tools.nnssell.getSellingStateByDomain(this.domainAuctionInfo.domain)];
                    case 1:
                        info = _a.sent();
                        if (!(!!info.balanceOfSelling && info.balanceOfSelling.compareTo(Neo.BigInteger.Zero) > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, importpack_1.tools.nnssell.bidSettlement(info.id.toString())];
                    case 2:
                        data1 = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.nnssell.collectDomain(info.id.toString())];
                    case 3:
                        data2 = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.rechargeandtransfer(data1, data2)];
                    case 4:
                        res = _a.sent();
                        txid = res["txid"];
                        this.session_getdomain.put(this.domainAuctionInfo.domain, { txid: txid, method: 1 });
                        this.rechargConfirm(txid, 1, this.domainAuctionInfo.domain);
                        return [3 /*break*/, 9];
                    case 5:
                        if (!(!!info.owner && ThinNeo.Helper.GetAddressFromScriptHash(info.owner) == this.address)) return [3 /*break*/, 6];
                        this.state_getDomain = 2;
                        return [2 /*return*/];
                    case 6: return [4 /*yield*/, importpack_1.tools.nnssell.collectDomain(info.id.toString())];
                    case 7:
                        data = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_postRawTransaction(data)];
                    case 8:
                        res = _a.sent();
                        txid = res["txid"];
                        this.session_getdomain.put(this.domainAuctionInfo.domain, { txid: txid, method: 2 });
                        this.rechargConfirm(txid, 2, this.domainAuctionInfo.domain);
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    AuctionInfo.prototype.rechargConfirm = function (txid, method, domain) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var res, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.openToast = this.$refs.toast["isShow"];
                        res = null;
                        if (!(method == 1)) return [3 /*break*/, 2];
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getrechargeandtransfer(txid)];
                    case 1:
                        res = _a.sent();
                        code = res['errCode'];
                        switch (code) {
                            case '0000':
                                this.openToast("success", "" + this.$t("auction.successgetdomain"), 3000);
                                this.state_getDomain = 2;
                                this.session_getdomain.delete(domain);
                                return [2 /*return*/];
                            case '3001':
                                this.openToast("error", "" + this.$t("auction.failgetdomain"), 3000);
                                this.state_getDomain = 1;
                                this.session_getdomain.delete(domain);
                                return [2 /*return*/];
                            case '3002':
                                this.openToast("error", "" + this.$t("auction.failgetdomain"), 3000);
                                this.state_getDomain = 1;
                                this.session_getdomain.delete(domain);
                                return [2 /*return*/];
                        }
                        this.state_getDomain = 1;
                        _a.label = 2;
                    case 2:
                        if (!(method == 2)) return [3 /*break*/, 4];
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getrawtransaction(txid)];
                    case 3:
                        res = _a.sent();
                        if (!!res) {
                            this.openToast("success", "" + this.$t("auction.successgetdomain"), 3000);
                            this.state_getDomain = 2;
                            this.session_getdomain.delete(domain);
                            return [2 /*return*/];
                        }
                        this.state_getDomain = 1;
                        _a.label = 4;
                    case 4:
                        setTimeout(function () {
                            _this.rechargConfirm(txid, method, domain);
                        }, 5000);
                        return [2 /*return*/];
                }
            });
        });
    };
    AuctionInfo.prototype.getSessionBidDetail = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var bidlist, arr, key, element, n, _a, _b, _i, index, i, amount, txid, txmsg, bidmsg;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.session_bid = new storagetool_1.LocalStoreTool("bidSession");
                        bidlist = this.session_bid.select(domain);
                        if (!(bidlist && Object.keys(bidlist).length > 0)) return [3 /*break*/, 4];
                        arr = [];
                        for (key in bidlist) {
                            if (bidlist.hasOwnProperty(key)) {
                                element = bidlist[key];
                                arr.push(element);
                            }
                        }
                        // arr = arr.reverse();
                        for (n = 0; n < arr.length; n++) {
                            if (n > 0) {
                                arr[n].amount = accAdd(parseFloat(arr[n].amount), parseFloat(arr[n - 1].amount));
                            }
                        }
                        arr = arr.reverse();
                        _a = [];
                        for (_b in arr)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        index = _a[_i];
                        i = parseInt(index);
                        amount = arr[i]["amount"];
                        txid = arr[i]["txid"];
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getrawtransaction(txid)];
                    case 2:
                        txmsg = _c.sent();
                        if (txmsg) {
                            this.session_bid.delete(domain, txid);
                        }
                        else {
                            bidmsg = { addPriceTime: "" + this.$t("auction.waitmsg1"), maxBuyer: '', maxPrice: '' };
                            this.bidDetailList.push(bidmsg);
                            bidmsg.maxBuyer = this.address;
                            bidmsg.maxPrice = accAdd(parseFloat(amount), parseFloat(this.myBidPrice ? this.myBidPrice : "0")).toString();
                        }
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 时间轴列表
     * @param domain 域名
     * @param currentpage 当前地址
     * @param pagesize 分页条数
     */
    AuctionInfo.prototype.getBidDetail = function (id, currentpage, pagesize) {
        return __awaiter(this, void 0, void 0, function () {
            var res, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.api_getBidDetail(id, currentpage, pagesize)];
                    case 1:
                        res = _a.sent();
                        if (res) {
                            if (res[0].count < pagesize) {
                                this.btnShowmore = false;
                            }
                            if (res[0].list.length < pagesize) {
                                this.btnShowmore = false;
                            }
                            for (i in res[0].list) {
                                res[0].list[i].addPriceTime = importpack_1.tools.timetool.getTime(res[0].list[i].addPriceTime);
                                this.bidDetailList.push(res[0].list[i]);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     */
    AuctionInfo.prototype.bidDomain = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count, res, txid, amount, oldBlock, height, task, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.openToast = this.$refs.toast["isShow"];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        count = Neo.Fixed8.parse(this.bidPrice).getData().toNumber();
                        return [4 /*yield*/, importpack_1.tools.nnssell.raise(this.domainAuctionInfo.domain, count)];
                    case 2:
                        res = _a.sent();
                        if (!res.err)
                            this.openToast("success", "" + this.$t("auction.waitmsg2"), 3000);
                        txid = res.info;
                        amount = this.bidPrice;
                        this.session_bid.put(this.domainAuctionInfo.domain, { txid: txid, amount: amount }, txid);
                        oldBlock = new importpack_1.tools.sessionstoretool("block");
                        height = oldBlock.select('height');
                        task = new entity_1.Task(height, entity_1.ConfirmType.tranfer, res.info);
                        importpack_1.tools.taskManager.addTask(task, entity_1.TaskType.addPrice);
                        this.bidPrice = "";
                        this.bidState = 2;
                        return [4 /*yield*/, this.getSessionBidDetail(this.domainAuctionInfo.domain)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuctionInfo.prototype.recoverSgas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, res, txid, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.state_recover = 1;
                        id = this.domainAuctionInfo.id;
                        return [4 /*yield*/, importpack_1.tools.nnssell.bidSettlement(id)];
                    case 1:
                        data = _a.sent();
                        this.state_recover = 1;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_postRawTransaction(data)];
                    case 3:
                        res = _a.sent();
                        if (res["txid"]) {
                            txid = res["txid"];
                            this.session_recover.put(this.domainAuctionInfo.domain, { txid: txid });
                            this.recoverConfirm(txid);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuctionInfo.prototype.recoverConfirm = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.getrawtransaction(txid)];
                    case 1:
                        res = _a.sent();
                        if (!!res) {
                            this.state_recover = 2;
                        }
                        else {
                            this.state_recover = 1;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 加价信息确认
     * @param txid 交易id
     * @param domain 域名
     */
    AuctionInfo.prototype.bid_confirm = function (txid, domain) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var session_bid, res, names, have;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        session_bid = new importpack_1.tools.localstoretool("bidSession");
                        return [4 /*yield*/, importpack_1.tools.wwwtool.getrawtransaction(txid)];
                    case 1:
                        res = _a.sent();
                        if (!!!res) return [3 /*break*/, 3];
                        session_bid.delete(domain, txid);
                        return [4 /*yield*/, importpack_1.tools.contract.getNotifyNames(txid)];
                    case 2:
                        names = _a.sent();
                        have = names.includes("addprice");
                        if (have) {
                            this.openToast("success", "" + this.$t("auction.domainname") + domain + " ：" + "" + this.$t("auction.successbid"), 3000);
                            return [2 /*return*/];
                        }
                        if (names.length == 0) {
                            this.openToast("error", "" + this.$t("auction.domainname") + domain + " ：" + "" + this.$t("auction.failbid"), 3000);
                            return [2 /*return*/];
                        }
                        if (names.includes("domainstate")) {
                            this.openToast("error", "" + this.$t("auction.domainname") + domain + " ：" + "" + this.$t("auction.failbid2"), 3000);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        setTimeout(function () {
                            _this.bid_confirm(txid, domain);
                        }, 5000);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuctionInfo.prototype.getMoreBidDetail = function () {
        this.currentpage += 1;
        this.getBidDetail(this.domainAuctionInfo.domain, this.currentpage, this.pagesize);
    };
    AuctionInfo.prototype.onBack = function () {
        this.$emit('onBack');
    };
    AuctionInfo = __decorate([
        vue_property_decorator_1.Component({
            components: {}
        }),
        __metadata("design:paramtypes", [])
    ], AuctionInfo);
    return AuctionInfo;
}(vue_1.default));
exports.default = AuctionInfo;


/***/ }),

/***/ "ndh4":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "ogHy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/bid/myneo.ts
var myneo = __webpack_require__("NXVv");
var myneo_default = /*#__PURE__*/__webpack_require__.n(myneo);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2690b044","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/bid/myneo.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"myneo-box"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('myneoname.title')))])]),_vm._v(" "),_vm._l((_vm.neonameList),function(item,index){return (_vm.neonameList)?_c('div',{key:index,staticClass:"form-box"},[_c('div',{staticClass:"neoname"},[_vm._v("\n            "+_vm._s(item.domain)+"\n        ")]),_vm._v(" "),_c('div',{staticClass:"addr-resolver"},[_vm._v("( "+_vm._s(_vm.$t('myneoname.resolver'))+": "+_vm._s(item.resolver ? item.resolver : _vm.$t('myneoname.notconfigure'))+" )")]),_vm._v(" "),_c('div',{staticClass:"addr-mapping"},[_vm._v("( "+_vm._s(_vm.$t('myneoname.mapping'))+": "+_vm._s(item.resolverAddress ? item.resolverAddress : _vm.$t('myneoname.notconfigure'))+" )")]),_vm._v(" "),(!item.expired)?_c('div',{staticClass:"time-msg"},[_vm._v("( "+_vm._s(_vm.$t('myneoname.time'))+": "+_vm._s(item.ttl)+" "),(!item.expiring)?_c('span',{staticClass:"ff6"},[_vm._v(_vm._s(_vm.$t('myneoname.expiring')))]):_vm._e(),_vm._v(" )")]):_vm._e(),_vm._v(" "),(item.expired)?_c('div',{staticClass:"time-msg"},[_vm._v("( "+_vm._s(_vm.$t('myneoname.time'))+":  "),_c('span',{staticClass:"ff6"},[_vm._v(_vm._s(_vm.$t('myneoname.expired')))]),_vm._v(" )")]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"btn-right"},[_c('button',{staticClass:"btn btn-nel btn-bid",on:{"click":function($event){_vm.onShowEdit(item)}}},[_vm._v(_vm._s(_vm.$t('btn.edit')))])])]):_vm._e()}),_vm._v(" "),(_vm.isShowEdit)?_c('div',{staticClass:"edit-wrap"},[_c('div',{staticClass:"edit-box"},[_c('div',{staticClass:"edit-title"},[_vm._v(_vm._s(_vm.$t('myneoname.edittitle')))]),_vm._v(" "),_c('div',{staticClass:"edit-tips"},[_vm._v(_vm._s(_vm.$t('myneoname.tips')))]),_vm._v(" "),_c('div',{staticClass:"edit-content"},[_c('div',{staticClass:"edit-name"},[_vm._v(_vm._s(_vm.$t('myneoname.neoname'))+": "+_vm._s(_vm.domainInfo.domain))]),_vm._v(" "),_c('div',{staticClass:"edit-input"},[_c('div',{staticClass:"input-msg"},[_vm._v("\n                    "+_vm._s(_vm.$t('myneoname.resolver'))+":\n                    "),(_vm.resolverState==1)?_c('button',{staticClass:"btn btn-nel btn-input-reset",on:{"click":_vm.resetresolve}},[_vm._v(_vm._s(_vm.$t('btn.reset')))]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"input-box"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.set_contract),expression:"set_contract"}],staticClass:"readonly-input",attrs:{"type":"text","readonly":"readonly","autocomplete":"off"},domProps:{"value":(_vm.set_contract)},on:{"input":function($event){if($event.target.composing){ return; }_vm.set_contract=$event.target.value}}}),_vm._v(" "),(_vm.resolverState==0)?_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.setresolve}},[_vm._v(_vm._s(_vm.$t('btn.confirm')))]):_vm._e(),_vm._v(" "),(_vm.resolverState==2)?_c('spinner-wrap',{staticStyle:{"margin-left":"20px"}}):_vm._e(),_vm._v(" "),(_vm.resolverState==1)?_c('div',{staticClass:"ok-img"},[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}})]):_vm._e()],1)]),_vm._v(" "),_c('div',{staticClass:"edit-input"},[_c('div',{staticClass:"input-msg"},[_vm._v("\n                    "+_vm._s(_vm.$t('myneoname.mapping'))+":\n                    "),(_vm.mappingState==1)?_c('button',{staticClass:"btn btn-nel btn-input-reset",on:{"click":_vm.resetmappingData}},[_vm._v(_vm._s(_vm.$t('btn.reset')))]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"input-box"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.resolverAddress),expression:"resolverAddress"}],attrs:{"type":"text","autocomplete":"off"},domProps:{"value":(_vm.resolverAddress)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.resolverAddress=$event.target.value},_vm.verifyMapping]}}),_vm._v(" "),(_vm.mappingState==0)?_c('button',{staticClass:"btn btn-nel btn-big",class:{'btn-disable':_vm.resolverState!=1 || !_vm.mappingistrue},attrs:{"disabled":_vm.resolverState!=1 || !_vm.mappingistrue},on:{"click":_vm.mappingData}},[_vm._v(_vm._s(_vm.$t('btn.confirm')))]):_vm._e(),_vm._v(" "),(_vm.mappingState==2)?_c('spinner-wrap',{staticStyle:{"margin-left":"20px"}}):_vm._e(),_vm._v(" "),(_vm.mappingState==1)?_c('div',{staticClass:"ok-img"},[_c('img',{attrs:{"src":__webpack_require__("wtuE"),"alt":""}})]):_vm._e()],1)]),_vm._v(" "),_c('div',{staticClass:"edit-input"},[_c('div',{staticClass:"input-msg"},[_vm._v("\n                    "+_vm._s(_vm.$t('myneoname.time'))+":\n                ")]),_vm._v(" "),_c('div',{staticClass:"input-box"},[_c('input',{staticClass:"readonly-input",attrs:{"type":"text","readonly":"readonly"},domProps:{"value":_vm.domainInfo.expired?_vm.$t('myneoname.expired'):_vm.domainInfo.ttl}}),_vm._v(" "),(!_vm.domainInfo.expired&&!_vm.domainInfo.expiring &&!_vm.renewalWatting)?_c('button',{staticClass:"btn btn-nel btn-big",on:{"click":_vm.renewalDomain}},[_vm._v(_vm._s(_vm.$t('btn.renewal')))]):_vm._e(),_vm._v(" "),((_vm.domainInfo.expired||_vm.domainInfo.expiring) &&!_vm.renewalWatting)?_c('button',{staticClass:"btn btn-nel btn-big btn-disable",attrs:{"disabled":""}},[_vm._v(_vm._s(_vm.$t('btn.renewal')))]):_vm._e(),_vm._v(" "),(_vm.renewalWatting)?_c('spinner-wrap',{staticStyle:{"margin-left":"20px"}}):_vm._e()],1)])]),_vm._v(" "),_c('div',{staticClass:"edit-close"},[_c('span',{attrs:{"aria-hidden":"true"},on:{"click":function($event){_vm.isShowEdit=!_vm.isShowEdit}}},[_vm._v("×")])])])]):_vm._e()],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var bid_myneo = (esExports);
// CONCATENATED MODULE: ./src/pages/bid/myneo.vue
function injectStyle (ssrContext) {
  __webpack_require__("j5wB")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2690b044"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  myneo_default.a,
  bid_myneo,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_bid_myneo = __webpack_exports__["default"] = (Component.exports);


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
        cancel: "Cancel",
        openauction: "Open Auction",
        bid: "Bid",
        getdomain: "Claim domain",
        recoversgas: "Recover SGas",
        gettingdomain: "Claiming domain",
        recoveringsgas: "Recovering SGas",
        receivedsgas: "Received",
        receivednns: "Received",
        newbid: "New Bid",
        viewmore: "View more",
        edit: "Edit",
        renewal: "Renewal",
        exchange: "Exchange",
        withdraw: "Withdraw",
        topup: "Top up",
        getGas: "Request Gas"
    },
    toast: {
        msg1: "Loading ...",
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
        msg4: "Your GAS claim is successful!",
        tips: "You can click this button to request 10 Gas, it can only be clicked once a day.",
        errmsg1: "Operation failed ! And You can try it again the next day !",
        errmsg2: "Our stock is insufficient ! And You can try it again the next day !",
        successmsg: "Successful operation！"
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
    },
    nnsneo: {
        auction: "Neo Name Auction",
        myneoname: "Domain Management",
        bonus: "Bonus"
    },
    auction: {
        title1: "Neo Name Auction",
        title2: "My Auction",
        title3: "Auction Information",
        title4: "Raise my bid",
        title5: "Timeline",
        title6: "Claim domain",
        title7: "Recover SGas",
        entername: "type a name",
        checkavailable: "This name is available.",
        checkbeing: "This name is currently in auction. Click 'New Bid' to purchase this name.",
        checkformat: "Please enter the domain according to the format.",
        checkbuyer: "This name is unavailable.",
        sendingmsg: "We are currently opening the auction. Please wait.",
        searchmsg: "Search by domain",
        status: "Status",
        lastauctionprice: "Last auction price",
        currentbidder: "Current bidder",
        opentime: "Bid openting time",
        fixedperiod: "Auction period",
        randomperiod: "Overtime bidding",
        ended: "Ended",
        me: "Me",
        other: "Other people",
        buyer: "Buyer",
        hammerprice: "Hammer price",
        acutiontitle: "Auction",
        domain: "Domain",
        highest: "Highest bid price",
        raisebid: "Raise my bid",
        enterbid: "Enter a raise",
        yourbidmsg: "Your cumulative bid",
        mybidmsg: "My cumulative bid ",
        mywillbid: "My cumulative bid will be",
        price: "Price: ",
        tips1: "Tip: The minimum bid increment is 0.1 SGas. If your bid is lower than the current highest bid, your raise will be unsuccessful.",
        isAvailable: "is available",
        errmsg1: "Only",
        errmsg2: "SGas is available.",
        errmsg4: "Please enter the right format.",
        goback: "Go back",
        waitmsg1: "Waiting for confirmation",
        waitmsg2: "Your raise will be confirmed after a new block is generated. Please wait.",
        getdomaintips: "Tip: After successfully claiming your domain, you can modify its settings in Domain Management.",
        waitgetdomain: "Your operation will be confirmed after the new block is generated. Please wait patiently...",
        fee: "Fee",
        remainingsgas: "Remaining SGas",
        timetips1: "Tips : If nobody bids on the last day of the auction period, the auction period end time will be the end of the auction.",
        timetips2: "Tip: Once the auction moves into the overtime bidding, it may end at any time",
        timetips3: "Tips : The auction may end at any point during the overtime bidding, so it’s better to bid as early as possible.",
        bidstarttimemsg: "Bid start time",
        endtimemsg: "Auction period end time",
        randomtimemsg: "Overtime bidding start time",
        maxtimemsg: "Maximum end time of overtime bidding",
        tipsmsg1: "Tips: Before participating in an auction, you need to know the following:",
        tipsmsg2: "The asset used for auctions is SGas. You will need SGas in your Auction Account to place a bid.",
        tipsmsg3: 'GAS can be exchanged for SGas at the rate of 1:1 using the SGas Exchange page. Once you have SGas in your wallet, you can use top-up function below to deposit SGas into your Auction Account.',
        titleaccount: "Your Auction Account",
        withdraw: "Withdraw",
        topup: "Top up",
        from: "From: ",
        to: "To",
        topupamount: "Amount",
        withdrawamount: "Amount",
        amount: "Amount",
        asset: "Asset",
        errmsg3: "is available.",
        tipsmsg4: "Tips: When you are using Gas to recharge, before being recharged into your Auction Account, GAS will be automatically switched to SGas. The entire process takes two blocks of confirmation time. Please wait patiently. ",
        yourbalance: "Your Balance",
        waiting: "Waiting",
        successwithdraw: "Successesfully withdrawed !",
        successwithdraw2: "Sgas will be refunded to your address after one block !",
        successtop: "Successesfully toped up",
        successtopup: "Successesfully toped up ! ",
        successtopup2: " SGas will be in your auction account after 2 blocks are confirmed !",
        successtopup3: " SGas will be in your auction account after 1 blocks are confirmed !",
        failtopup: "Top up failed ! And your Gas has been exchanged into SGas",
        fail: "Operation failed !",
        auctionopen: "Auction Opened",
        domainname: "Domain name",
        successbid: "Raise succesful!",
        failbid: "Raise failed!",
        failbid2: "Its auction has ended. Your raise is not executed.",
        successbid1: "Your bid of ",
        successbid2: " SGas has been sent to the blockchain for confirmation.",
        successgetdomain: "Domain acquired",
        failgetdomain: "Please click again to acquire domain",
        tips: "Tips: ",
        statustips: "The auction period is the first stage of the auction and its duration is 3 days, during which all bids are valid. An overtime bidding of up to 2 days will be triggered when someone bids on the last day of the auction period. Otherwise the auction ends at the end of the auction period.",
        statustips2: "The overtime bidding is the second stage of the auction. Its maximum duration is 2 days. During this period, any bid may trigger the end of the bidding of this domain and the bid will be invalid. The latter one bids, the more likely it triggers the end of the bidding. So it's advised to place a bid as early as possible to avoid missing this domain. ",
        toptips: "Tips: You have successfully submited your SGas top up transaction. It will be confirmed and added to your Auction Account in the next block. Please be patient. ",
        withdrawtips: "Tips: You have successfully submited your SGas withdrawal transaction. It will be confirmed and added to your wallet in the next block. Please be patient. ",
        getall: "Get all"
    },
    exchange: {
        title: "SGas Exchange",
        tosgas: "Exchange Gas for SGas",
        togas: "Exchange SGas for Gas",
        tips: "Tips：SGAS is a NEP5 token，which is bound with NEO’s GAS at the ratio of 1:1 and they can be converted with each other freely. The exchange needs to be confirmed after one block. Please be patient. ",
        spend: "Amount you will spend : ",
        receive: "Amount you will receive : ",
        warnmsg: "Insufficient balance.",
        waittitle: "Waiting for transaction records",
        balance: "Balance",
        amount: "Amount"
    },
    myneoname: {
        title: "My Neo Name",
        resolver: "Address Resolver",
        mapping: "Address Mapping",
        time: "Expiration Time",
        expiring: "Expiring soon",
        edittitle: "Edit information",
        neoname: "Neo Name",
        notconfigure: "not configured",
        expired: "Expired",
        tips: "Tips : Address mapping can only be performed after the address resolver is confirmed by you. "
    },
    bonus: {
        title1: "Bonus",
        title2: "History",
        msg: "SGas available to claim",
        wait1: "Sending a transaction...",
        wait2: "Waiting for confirmation of transfer...",
        wait3: "SGas claiming...",
        wait4: "Your SGas claim is successful!"
    }
};


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
var importpack_1 = __webpack_require__("VKSY");
var entity_1 = __webpack_require__("6nHw");
var CoinTool = /** @class */ (function () {
    function CoinTool() {
    }
    /**
     * @method 初始化资产
     */
    CoinTool.initAllAsset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allassets, a, asset, names, id, name, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.api_getAllAssets()];
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
                            else if (id == CoinTool.id_SGAS.toString()) {
                                name = "SGAS";
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
     * @method 获得可用的utxo
     * @returns 筛选排序后的utxo
     */
    CoinTool.getassets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var height, utxos, olds, olds2, n, old, findutxo, i_1, utxo, assets, i, item, asset, utxo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
                    case 1:
                        height = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getUTXO(importpack_1.tools.storagetool.getStorage("current-address"))];
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
     * 构造并发送交易
     * @param {ThinNeo.Transaction} tran
     * @param {string} randomStr
     */
    CoinTool.signData = function (tran) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            return __generator(this, function (_a) {
                promise = new Promise(function (resolve, reject) {
                    if (!!entity_1.LoginInfo.info) {
                        var addr = entity_1.LoginInfo.getCurrentAddress();
                        var current = entity_1.LoginInfo.info;
                        var msg = tran.GetMessage().clone();
                        var pubkey = current.pubkey.clone();
                        var prekey = current.prikey.clone();
                        var signdata = ThinNeo.Helper.Sign(msg, prekey);
                        tran.AddWitness(signdata, pubkey, addr);
                        var data = tran.GetRawData();
                        resolve(data);
                    }
                    else {
                        var current_1 = JSON.parse(sessionStorage.getItem("login-info-arr"));
                        if (current_1.type == entity_1.LoginType.wif) {
                            var res = importpack_1.tools.neotool.wifDecode(current_1.msg['wif']);
                            if (res.err) {
                                reject("WIF is error");
                            }
                            else {
                                entity_1.LoginInfo.info = res.info;
                                resolve(data);
                                return;
                            }
                        }
                        if (current_1.type == entity_1.LoginType.nep2 || entity_1.LoginType.nep6) {
                            entity_1.alert.show("请输入密码", "password", "确认", function (passsword) {
                                var nep2 = current_1.msg[entity_1.LoginInfo.getCurrentAddress()];
                                importpack_1.tools.neotool.nep2ToWif(nep2, passsword)
                                    .then(function (res) {
                                    entity_1.LoginInfo.info = res.info;
                                    var addr = entity_1.LoginInfo.getCurrentAddress();
                                    var current = entity_1.LoginInfo.info;
                                    var msg = tran.GetMessage().clone();
                                    var pubkey = current.pubkey.clone();
                                    var prekey = current.prikey.clone();
                                    var signdata = ThinNeo.Helper.Sign(msg, prekey);
                                    tran.AddWitness(signdata, pubkey, addr);
                                    var data = tran.GetRawData();
                                    entity_1.alert.close();
                                    resolve(data);
                                })
                                    .catch(function (err) {
                                    // console.error(Error("password is error"));
                                    entity_1.alert.error("密码错误,请重新输入");
                                });
                            });
                        }
                        if (current_1.type == entity_1.LoginType.otcgo) {
                            entity_1.alert.show("请输入密码", "password", "确认", function (password) {
                                var json = current_1.msg;
                                var otcgo = new entity_1.WalletOtcgo();
                                otcgo.fromJsonStr(JSON.stringify(json));
                                otcgo.otcgoDecrypt(password);
                                var result = otcgo.doValidatePwd();
                                if (result) {
                                    var info = new entity_1.LoginInfo();
                                    info.address = otcgo.address;
                                    info.prikey = otcgo.prikey;
                                    info.pubkey = otcgo.pubkey;
                                    var signdata = ThinNeo.Helper.Sign(msg, prekey);
                                    tran.AddWitness(signdata, pubkey, info.address);
                                    var data = tran.GetRawData();
                                    entity_1.alert.close();
                                    resolve(data);
                                }
                                else {
                                    entity_1.alert.error("密码错误,请重新输入");
                                }
                            });
                        }
                    }
                });
                return [2 /*return*/, promise];
            });
        });
    };
    /**
     * utxo转账方法
     * @param targetaddr 转入的地址
     * @param asset 资产
     * @param count 金额
     */
    CoinTool.rawTransaction = function (targetaddr, asset, count) {
        return __awaiter(this, void 0, void 0, function () {
            var arr, add, n, _count, utxos, tranres, tran, txid, data, res, height, result, olds, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arr = importpack_1.tools.storagetool.getLoginArr();
                        add = importpack_1.tools.storagetool.getStorage("current-address");
                        n = arr.findIndex(function (login) { return login.address == add; });
                        _count = Neo.Fixed8.parse(count + "");
                        return [4 /*yield*/, CoinTool.getassets()];
                    case 1:
                        utxos = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        tranres = CoinTool.makeTran(utxos, targetaddr, asset, _count);
                        tran = tranres.info['tran'];
                        if (tran.witnesses == null)
                            tran.witnesses = [];
                        txid = tran.GetHash().clone().reverse().toHexString();
                        return [4 /*yield*/, this.signData(tran)];
                    case 3:
                        data = _a.sent();
                        res = new entity_1.Result();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
                    case 4:
                        height = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_postRawTransaction(data)];
                    case 5:
                        result = _a.sent();
                        if (result["sendrawtransactionresult"]) {
                            res.err = !result;
                            res.info = result['txid'];
                            olds = tranres.info['oldarr'];
                            olds.map(function (old) { return old.height = height; });
                            entity_1.OldUTXO.oldutxosPush(olds);
                        }
                        return [2 /*return*/, res];
                    case 6:
                        error_1 = _a.sent();
                        throw error_1;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 领取gas
     */
    CoinTool.claimgas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var claimtxhex, tran, buf, data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.api_getclaimtxhex(entity_1.LoginInfo.getCurrentAddress())];
                    case 1:
                        claimtxhex = _a.sent();
                        tran = new ThinNeo.Transaction();
                        buf = claimtxhex.hexToBytes();
                        tran.Deserialize(new Neo.IO.BinaryReader(new Neo.IO.MemoryStream(buf.buffer, 0, buf.byteLength)));
                        return [4 /*yield*/, this.signData(tran)];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_postRawTransaction(data)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    CoinTool.claimGas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var address, claimsstr, claims, sum, tran, i, claim, input, output, data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        address = entity_1.LoginInfo.getCurrentAddress();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getclaimgas(address, 0)];
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
                        output.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(address);
                        output.value = Neo.Fixed8.parse(sum);
                        tran.outputs = [];
                        tran.outputs.push(output);
                        return [4 /*yield*/, this.signData(tran)];
                    case 2:
                        data = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_postRawTransaction(data)];
                    case 3:
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
            var addr, tran, data, res, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addr = entity_1.LoginInfo.getCurrentAddress();
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
                        return [4 /*yield*/, this.signData(tran)];
                    case 1:
                        data = _a.sent();
                        res = new entity_1.Result();
                        console.log(data.toHexString());
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_postRawTransaction(data)];
                    case 2:
                        result = _a.sent();
                        res.err = !result["sendrawtransactionresult"];
                        res.info = result["txid"];
                        console.log(res.info);
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
            var addr, assetid, utxos, tranmsg, tran, data, res, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addr = entity_1.LoginInfo.getCurrentAddress();
                        assetid = CoinTool.id_GAS;
                        return [4 /*yield*/, CoinTool.getassets()];
                    case 1:
                        utxos = _a.sent();
                        tranmsg = CoinTool.makeTran(utxos, addr, assetid, Neo.Fixed8.Zero);
                        tran = tranmsg.info['tran'];
                        tran.type = ThinNeo.TransactionType.InvocationTransaction;
                        tran.extdata = new ThinNeo.InvokeTransData();
                        //塞入脚本
                        tran.extdata.script = script;
                        // (tran.extdata as ThinNeo.InvokeTransData).gas = Neo.Fixed8.fromNumber(1.0);
                        if (tran.witnesses == null)
                            tran.witnesses = [];
                        return [4 /*yield*/, this.signData(tran)];
                    case 2:
                        data = _a.sent();
                        res = new entity_1.Result();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_postRawTransaction(data)];
                    case 3:
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
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.getNep5Asset(asset)];
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
    /**
     * @method 获得Sgas账户下的utxo
     */
    CoinTool.getsgasAssets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var height, scriptHash, utxos, olds, olds2, n, old, findutxo, i_2, utxo, assets, i, item, asset, utxo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
                    case 1:
                        height = _a.sent();
                        scriptHash = ThinNeo.Helper.GetAddressFromScriptHash(this.id_SGAS);
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getUTXO(scriptHash)];
                    case 2:
                        utxos = _a.sent();
                        olds = entity_1.OldUTXO.getOldutxos();
                        olds2 = new Array();
                        for (n = 0; n < olds.length; n++) {
                            old = olds[n];
                            findutxo = false;
                            for (i_2 = 0; i_2 < utxos.length; i_2++) {
                                utxo = utxos[i_2];
                                if (utxo.txid == old.txid && old.n == utxo.n && height - old.height <= 2) {
                                    findutxo = true;
                                    utxos.splice(i_2, 1);
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
                        return [2 /*return*/, assets];
                }
            });
        });
    };
    CoinTool.id_GAS = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
    CoinTool.id_NEO = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    CoinTool.id_SGAS = Neo.Uint160.parse('2761020e5e6dfcd8d37fdd50ff98fa0f93bccf54');
    CoinTool.dapp_nnc = Neo.Uint160.parse("12329843449f29a66fb05974c2fb77713eb1689a");
    CoinTool.assetID2name = {};
    CoinTool.name2assetID = {};
    return CoinTool;
}());
exports.CoinTool = CoinTool;


/***/ }),

/***/ "pp3u":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,DQo8c3ZnIHdpZHRoPSIxNXB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNSAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5ICg1MTAwMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+PC9kZWZzPg0KICAgIDxnIGlkPSLmtY/op4jlmag0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9ImJsb2Nrcy1oYW5nb3ZlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTY1OC4wMDAwMDAsIC0xMTY1LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPg0KICAgICAgICAgICAgPGcgaWQ9InN3dGljaCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTkwLjAwMDAwMCwgMTE1NC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTEuMDAwMDAwLCAwLjAwMDAwMCkiPg0KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUuMjc2MzkzMiwxMi4xNzEwMzk0IEwzMS42NTgzNTkyLDI0LjkzNDk3MTUgQzMxLjkwNTM0ODUsMjUuNDI4OTUgMzEuNzA1MTI0MSwyNi4wMjk2MjMgMzEuMjExMTQ1NiwyNi4yNzY2MTIzIEMzMS4wNzIyOTAyLDI2LjM0NjA0IDMwLjkxOTE3NzEsMjYuMzgyMTg1MSAzMC43NjM5MzIsMjYuMzgyMTg1MSBMMTgsMjYuMzgyMTg1MSBDMTcuNDQ3NzE1MywyNi4zODIxODUxIDE3LDI1LjkzNDQ2OTggMTcsMjUuMzgyMTg1MSBDMTcsMjUuMjI2OTQgMTcuMDM2MTQ1MSwyNS4wNzM4MjY5IDE3LjEwNTU3MjgsMjQuOTM0OTcxNSBMMjMuNDg3NTM4OCwxMi4xNzEwMzk0IEMyMy43MzQ1MjgxLDExLjY3NzA2MSAyNC4zMzUyMDExLDExLjQ3NjgzNjYgMjQuODI5MTc5NiwxMS43MjM4MjU5IEMyNS4wMjI3MDcsMTEuODIwNTg5NiAyNS4xNzk2Mjk1LDExLjk3NzUxMiAyNS4yNzYzOTMyLDEyLjE3MTAzOTQgWiIgaWQ9IlRyaWFuZ2xlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNC4zODIwNzYsIDE5LjAwMDExMCkgcm90YXRlKDkwLjAwMDAwMCkgdHJhbnNsYXRlKC0yNC4zODIwNzYsIC0xOS4wMDAxMTApICI+PC9wYXRoPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg=="

/***/ }),

/***/ "qrTz":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABP1JREFUaAXlm01oE0EUxydtbUSUIuJHKSgeJHqoB4vWYk2bi1AQigcP9exVKbYnDwoeelFRVATRg4ooelBEQe3BlFRorVTQIlIQRKG0VLRKRE1tG///dSfNJpvtZjPZXTYPXmZ3ZvfN+83Mzs7HJiTKJOl0egVMt0KboBFdNyBcpSsCkdR1CuG4rqMIX4RCoV8I/S2AXAfthiagKahT4b20QVvrfEcNp6LQR9C/UNVCm7Qd9RwcTsSgg1C3hHm1uw6OTOuht92iNMmHede7Ao6MOqDfTZxwO4o+dJQVGhn0QOfdJrPIj770KIeG0TD0ukXGXifRt7Ad8NBSF8HQWlzzENqy1LUepw8h/068v79Y+WEJrJdaHAb8DisZCR0DdEpG5IZVuRE551dwrhx2fj4tqGUQ+kqfC0rBGkbtsjM4U/BOBwkfPyVF3/m34vXYV+3uHY1rxPHu7WLzJo42lUovavmsmUVTYMCyu38MXaoFmNk0jRt6NS2OHh8Wf1LzhvTl4WpxoW+3aNmpdAS5gEz2A/qJITOc5AEDth7x76F1uRc7PSfsEcCmcmClvTCgL6qH/gH72wA9KfNhaFaDbAquwdIJFgQLhAWjUMiQ16wNNYzabcdF7JWVSWJoKq8ZFzLO5h1t4QxSqcRQywPSYi7wIBI4hw2ScG69VwJlmjRqtw2RQYMlZ6vOpjFngHHWq8UE8yfDpjVplADfCRPQmmDyijlwNaBpT0vAQ6ph+wdYfmpkY8NKsXVLSS8OcpLxvKzhBE4yD7YKNxujD1SY0Wwoek8PooajVWjOXF1sdurdzI9Zp7favk/Re7qZrOy02DPX2s4960IOFE5fGsuKKd+hAmgythK4yYmbcrg4O2scGzuxZfceBdBNBI7YzVBeJ2HpgNtSInSkaGAvYWXhlgAdYXdte/DK+azVrEc6xPDsqV3Zp0qOb979IN68+6bZIjSnm/euxYqZT28gsO3ZNyfvdpvxvvYGJZDZRvrjEwBejOHcmj5dPbdnMdL6aBWbtC1gLsnIlQprm+6m0qcilos0YHc99Dg31nDSjg/V1SHBNSi/CX2ibzYlyWeYwLZIuOB28HDc8BxPTf8WKsfN0nE7fQAXDOhTEZIMYbjFtdzddm9y67U0ljiQ51LvyRHxDB0XxeH4ephNelyzYPOHq4tccGOGXolDWLo7XjQw7/ISugTYDPAoj4oVL6Bra0tezh3lM8zp4QzU8YzJ7uirmEI1e4Y5FV1d58hNZs157OoqTIp/4eAlY5yImzVdAizRXpKVryXKfajjFQ9C37rcJj5P/NSM+fSHjP+3WtCsK2YRj720QFVzj+MpjwMqT3VGw97S6YDCEivDZhiEomkHfqslFziG0niusqb9tpkme2mNEe08jlq+g5MuVdDLaqrEsRMjhgmHmW05gjJLKyHuDpgGsu831DATAFxZG+IokUlws4b52YASsRqccIpXht1/+t6lsxgY8mpYpqKme3AcuI9aJJ9pCOiyfH03N7eQppZJrpvC6JEFa5jpcCiMoHI+TMMzkAJwJ3QI6nehj/z0kD4XFG1oWTAVCTDAbxf5fr5hdZ3HafQtpvuqzhU08cr4fDi7yABdOR+IS3BAV85fACQ0Q4C3Q4P/J49saB28DeDl/hsPvyPzlwB6PdTXf9SyHHiUUpwA52oovx9pgkZ05V40dyvljiW3eaiu/RXvHyWavvSXYzwJAAAAAElFTkSuQmCC"

/***/ }),

/***/ "s6Yv":
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
var importpack_1 = __webpack_require__("VKSY");
var entity_1 = __webpack_require__("6nHw");
var NNSSell = /** @class */ (function () {
    function NNSSell() {
    }
    /**
     * 获得竞拍域名详情
     * @param domain 域名
     */
    NNSSell.getSellingStateByDomain = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var domainarr, nnshash, data, result, domainInfo, info, state, rest, stackarr, stack, parenthash, domain_1, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        domainarr = domain.split('.');
                        nnshash = importpack_1.tools.nnstool.nameHashArray(domainarr);
                        data = importpack_1.tools.contract.buildScript(importpack_1.tools.nnstool.root_neo.register, "getSellingStateByFullhash", ["(hex256)" + nnshash.toString()]);
                        return [4 /*yield*/, importpack_1.tools.wwwtool.rpc_getInvokescript(data)];
                    case 1:
                        result = _b.sent();
                        return [4 /*yield*/, importpack_1.tools.nnstool.getOwnerInfo(nnshash, entity_1.Consts.baseContract)];
                    case 2:
                        domainInfo = _b.sent();
                        info = new entity_1.SellDomainInfo();
                        info.copyDomainInfoToThis(domainInfo);
                        info.domain = domain;
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 6, , 7]);
                        state = result.state;
                        // info2.textContent = "";
                        if (state.includes("FAULT, BREAK")) {
                            throw "FAULT, BREAK";
                        }
                        rest = new entity_1.NNSResult();
                        rest.textInfo = result;
                        stackarr = result["stack"];
                        stack = entity_1.ResultItem.FromJson(entity_1.DataType.Array, stackarr).subItem[0].subItem;
                        info.id = stack[0].AsHash256();
                        parenthash = stack[1].AsHash256();
                        domain_1 = stack[2].AsString();
                        info.startBlockSelling = stack[4].AsInteger();
                        info.endBlock = stack[5].AsInteger();
                        info.maxPrice = stack[6].AsInteger();
                        info.maxBuyer = stack[7].AsHash160();
                        info.lastBlock = stack[8].AsInteger();
                        if (!!!info.id) return [3 /*break*/, 5];
                        _a = info;
                        return [4 /*yield*/, this.getBalanceOfBid(info.id)];
                    case 4:
                        _a.balanceOfSelling = _b.sent();
                        _b.label = 5;
                    case 5: return [2 /*return*/, info];
                    case 6:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 获得
     * @param id 竞拍id
     */
    NNSSell.getBalanceOfBid = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var addr, who, res, stackarr, stack, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addr = entity_1.LoginInfo.getCurrentAddress();
                        who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
                        return [4 /*yield*/, importpack_1.tools.contract.contractInvokeScript(importpack_1.tools.nnstool.root_neo.register, "balanceOfBid", "(hex160)" + who.toString(), "(hex256)" + id.toString())];
                    case 1:
                        res = _a.sent();
                        stackarr = res["stack"];
                        stack = entity_1.ResultItem.FromJson(entity_1.DataType.Array, stackarr).subItem[0];
                        balance = stack.AsInteger();
                        return [2 /*return*/, balance];
                }
            });
        });
    };
    /**
     * 获得
     * @param id 竞拍id
     */
    NNSSell.getBalanceOfSelingArray = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var addr, who, sb, index, id, res, stackarr, stack, obj, i, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addr = entity_1.LoginInfo.getCurrentAddress();
                        who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
                        sb = new ThinNeo.ScriptBuilder();
                        for (index in ids) {
                            if (ids.hasOwnProperty(index)) {
                                id = ids[index];
                                sb.EmitParamJson([
                                    "(hex160)" + who.toString(),
                                    "(hex256)" + id
                                ]); //第二个参数是个数组
                                sb.EmitPushString("balanceOfSelling");
                                sb.EmitAppCall(importpack_1.tools.nnstool.root_neo.register);
                            }
                        }
                        return [4 /*yield*/, importpack_1.tools.wwwtool.rpc_getInvokescript(sb.ToArray())];
                    case 1:
                        res = _a.sent();
                        stackarr = res["stack"];
                        stack = entity_1.ResultItem.FromJson(entity_1.DataType.Array, stackarr);
                        obj = {};
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            obj[id] = stack.subItem[i].AsInteger();
                        }
                        return [2 /*return*/, obj];
                }
            });
        });
    };
    NNSSell.gasToRecharge = function (transcount) {
        return __awaiter(this, void 0, void 0, function () {
            var script, sgasaddr, data1, data2, res, height, txid, olds, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        script = importpack_1.tools.contract.buildScript(importpack_1.tools.coinTool.id_SGAS, "mintTokens", []);
                        sgasaddr = ThinNeo.Helper.GetAddressFromScriptHash(importpack_1.tools.coinTool.id_SGAS);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, importpack_1.tools.contract.buildInvokeTransData(script, sgasaddr, importpack_1.tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(transcount))];
                    case 2:
                        data1 = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.nnssell.rechargeReg(transcount.toFixed(8))];
                    case 3:
                        data2 = _a.sent();
                        return [4 /*yield*/, importpack_1.tools.wwwtool.rechargeandtransfer(data1.data, data2)];
                    case 4:
                        res = _a.sent();
                        if (!(res['errCode'] == '0000')) return [3 /*break*/, 6];
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getHeight()];
                    case 5:
                        height = _a.sent();
                        txid = res['txid'];
                        olds = data1.tranmsg.info['oldarr'];
                        olds.map(function (old) { return old.height = height; });
                        entity_1.OldUTXO.oldutxosPush(olds);
                        return [2 /*return*/, txid];
                    case 6: return [2 /*return*/, undefined];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        throw error_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 注册器充值
     * @param amount 充值金额
     */
    NNSSell.rechargeReg = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var addressto, address, sb, random_uint8, random_int, script, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addressto = ThinNeo.Helper.GetAddressFromScriptHash(importpack_1.tools.nnstool.root_neo.register);
                        address = entity_1.LoginInfo.getCurrentAddress();
                        sb = new ThinNeo.ScriptBuilder();
                        random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues(new Uint8Array(32));
                        random_int = Neo.BigInteger.fromUint8Array(random_uint8);
                        //塞入随机数
                        sb.EmitPushNumber(random_int);
                        sb.Emit(ThinNeo.OpCode.DROP);
                        sb.EmitParamJson([
                            "(addr)" + address,
                            "(addr)" + addressto,
                            "(int)" + amount.replace(".", "") //value
                        ]); //参数倒序入
                        sb.EmitPushString("transfer"); //参数倒序入
                        sb.EmitAppCall(importpack_1.tools.coinTool.id_SGAS); //nep5脚本
                        ////这个方法是为了在同一笔交易中转账并充值
                        ////当然你也可以分为两笔交易
                        ////插入下述两条语句，能得到txid
                        sb.EmitSysCall("System.ExecutionEngine.GetScriptContainer");
                        sb.EmitSysCall("Neo.Transaction.GetHash");
                        //把TXID包进Array里
                        sb.EmitPushNumber(Neo.BigInteger.fromString("1"));
                        sb.Emit(ThinNeo.OpCode.PACK);
                        sb.EmitPushString("setmoneyin");
                        sb.EmitAppCall(importpack_1.tools.nnstool.root_neo.register);
                        script = sb.ToArray();
                        return [4 /*yield*/, importpack_1.tools.contract.buildInvokeTransData_attributes(script)];
                    case 1:
                        res = _a.sent();
                        // console.log(res);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * 域名开标
     */
    NNSSell.openbid = function (subname) {
        return __awaiter(this, void 0, void 0, function () {
            var addr, who, register, param, data, res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        addr = entity_1.LoginInfo.getCurrentAddress();
                        who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
                        register = importpack_1.tools.nnstool.root_neo.register;
                        param = [
                            '(hex160)' + who.toString(),
                            "(hex256)" + importpack_1.tools.nnstool.root_neo.roothash.toString(),
                            "(str)" + subname
                        ];
                        data = importpack_1.tools.contract.buildScript_random(register, "openbid", param);
                        return [4 /*yield*/, importpack_1.tools.contract.contractInvokeTrans_attributes(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 竞标加价
     * @param domain 域名
     */
    NNSSell.raise = function (domain, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var info, who, data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSellingStateByDomain(domain)];
                    case 1:
                        info = _a.sent();
                        who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(entity_1.LoginInfo.getCurrentAddress()).buffer);
                        data = importpack_1.tools.contract.buildScript_random(importpack_1.tools.nnstool.root_neo.register, "raise", ["(hex160)" + who.toString(), "(hex256)" + info.id.toString(), "(int)" + amount]);
                        return [4 /*yield*/, importpack_1.tools.contract.contractInvokeTrans_attributes(data)];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     *
     * @param time
     * @returns state(0:竞拍结束,1:正在竞拍, 2:随机时间)
     */
    NNSSell.compareTime = function (time) {
        var currentTime = new Date().getTime();
        var res = currentTime - time;
        var state = res > 1500000 ? (res < 109500000 ? 0 : 3) : res < 900000 ? 1 : 2;
        return state;
    };
    /**
     * 判断域名状态
     * @param info 域名详情
     */
    NNSSell.getMyAuctionState = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var myauction, startTime, sellstate, currentTime, dtime, lastTime, dlast, time, subtime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        myauction = new entity_1.MyAuction();
                        if (!info.id) {
                            return [2 /*return*/, myauction];
                        }
                        myauction.id = info.id.toString();
                        myauction.domain = info.domain;
                        myauction.endBlock = parseInt(info.endBlock.toString());
                        myauction.maxBuyer = !info.maxBuyer ? "" : ThinNeo.Helper.GetAddressFromScriptHash(info.maxBuyer);
                        myauction.maxPrice = !info.maxPrice ? "" : accDiv(info.maxPrice.toString(), 100000000).toString();
                        myauction.owner = info.owner ? ThinNeo.Helper.GetAddressFromScriptHash(info.owner) : "";
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getBlockInfo(parseInt(info.startBlockSelling.toString()))];
                    case 1:
                        startTime = _a.sent();
                        myauction.startAuctionTime = startTime * 1000;
                        myauction.startTimeStr = importpack_1.tools.timetool.getTime(startTime);
                        sellstate = (info.startBlockSelling.compareTo(Neo.BigInteger.Zero));
                        if (sellstate == 0) {
                            myauction.domainstate = entity_1.DomainState.open;
                            return [2 /*return*/, myauction];
                        }
                        currentTime = new Date().getTime();
                        dtime = currentTime - startTime * 1000;
                        //如果超过随机期
                        if (dtime > 109500000)
                            myauction.expire = true;
                        else
                            myauction.expire = false;
                        if (!(dtime > 900000)) return [3 /*break*/, 5];
                        if (info.maxPrice.compareTo(Neo.BigInteger.Zero) == 0) {
                            myauction.domainstate = entity_1.DomainState.pass;
                            return [2 /*return*/, myauction];
                        }
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getBlockInfo(parseInt(info.lastBlock.toString()))];
                    case 2:
                        lastTime = _a.sent();
                        dlast = lastTime - startTime;
                        if (dlast < 600) {
                            myauction.domainstate = entity_1.DomainState.end2;
                            myauction.endTime = accAdd(accMul(startTime, 1000), 900000);
                            myauction.auctionState = "0";
                            return [2 /*return*/, myauction];
                        }
                        if (!(info.endBlock.compareTo(Neo.BigInteger.Zero) > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, importpack_1.tools.wwwtool.api_getBlockInfo(parseInt(info.endBlock.toString()))];
                    case 3:
                        time = _a.sent();
                        subtime = time - startTime;
                        myauction.endTime = subtime < 1500 ? accMul(time, 1000) : accAdd(accMul(startTime, 1000), 1500000);
                        myauction.domainstate = entity_1.DomainState.end1;
                        myauction.auctionState = "0";
                        return [2 /*return*/, myauction];
                    case 4:
                        if (dtime < 1500000) {
                            myauction.domainstate = entity_1.DomainState.random;
                            myauction.auctionState = "2";
                            return [2 /*return*/, myauction];
                        }
                        else {
                            myauction.domainstate = entity_1.DomainState.end1;
                            myauction.endTime = accAdd(accMul(startTime, 1000), 1500000);
                            myauction.auctionState = "0";
                            return [2 /*return*/, myauction];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        myauction.domainstate = entity_1.DomainState.fixed;
                        myauction.auctionState = "1";
                        return [2 /*return*/, myauction];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 结束竞拍
     * @param domain 域名
     */
    NNSSell.bidSettlement = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var addr, who, script, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addr = entity_1.LoginInfo.getCurrentAddress();
                        who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
                        script = importpack_1.tools.contract.buildScript_random(importpack_1.tools.nnstool.root_neo.register, "bidSettlement", [
                            "(hex160)" + who.toString(),
                            "(hex256)" + id
                        ]);
                        return [4 /*yield*/, importpack_1.tools.contract.buildInvokeTransData_attributes(script)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * 获得领取域名
     * @param domain 域名
     */
    NNSSell.collectDomain = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var addr, who, script, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addr = entity_1.LoginInfo.getCurrentAddress();
                        who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
                        script = importpack_1.tools.contract.buildScript_random(importpack_1.tools.nnstool.root_neo.register, "collectDomain", [
                            "(hex160)" + who.toString(),
                            "(hex256)" + id
                        ]);
                        return [4 /*yield*/, importpack_1.tools.contract.buildInvokeTransData_attributes(script)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    NNSSell.getMySellingDomain = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var info, data1, addr, who, script, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, importpack_1.tools.nnssell.getSellingStateByDomain(domain)];
                    case 1:
                        info = _a.sent();
                        if (info.endBlock.compareTo(Neo.BigInteger.Zero)) {
                            data1 = this.bidSettlement(domain);
                        }
                        addr = entity_1.LoginInfo.getCurrentAddress();
                        who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
                        script = importpack_1.tools.contract.buildScript_random(importpack_1.tools.nnstool.root_neo.register, "getSellingDomain", [
                            "(hex160)" + who.toString(),
                            "(hex256)" + info.id.toString()
                        ]);
                        res = importpack_1.tools.contract.contractInvokeTrans_attributes(script);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    NNSSell.getBalanceOf = function () {
        return __awaiter(this, void 0, void 0, function () {
            var addr, who, info, stackarr, stack, num, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addr = entity_1.LoginInfo.getCurrentAddress();
                        who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
                        return [4 /*yield*/, importpack_1.tools.contract.contractInvokeScript(importpack_1.tools.nnstool.root_neo.register, "balanceOf", "(hex160)" + who.toString())];
                    case 1:
                        info = _a.sent();
                        stackarr = info["stack"];
                        stack = entity_1.ResultItem.FromJson(entity_1.DataType.Array, stackarr);
                        num = stack.subItem[0].AsInteger();
                        res = accDiv(num.toString(), 100000000);
                        return [2 /*return*/, res.toString()];
                }
            });
        });
    };
    /**
     * 取回存储器下的sgas
     */
    NNSSell.getMoneyBack = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var addr, transcount, data, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addr = entity_1.LoginInfo.getCurrentAddress();
                        transcount = amount.toFixed(8).replace(".", "");
                        data = importpack_1.tools.contract.buildScript_random(importpack_1.tools.nnstool.root_neo.register, "getmoneyback", ["(addr)" + addr, "(int)" + transcount]);
                        return [4 /*yield*/, importpack_1.tools.contract.contractInvokeTrans_attributes(data)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    NNSSell.renewDomain = function (domain) {
        return __awaiter(this, void 0, void 0, function () {
            var addr, who, domainarr, str, roothash, data, res, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addr = entity_1.LoginInfo.getCurrentAddress();
                        who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
                        domainarr = domain.split(".").reverse();
                        str = domainarr[1];
                        roothash = importpack_1.tools.nnstool.nameHash(domainarr[0]);
                        data = importpack_1.tools.contract.buildScript_random(importpack_1.tools.nnstool.root_neo.register, "renewDomain", [
                            "(hex160)" + who.toString(),
                            "(hex256)" + roothash.toString(),
                            "(str)" + str
                        ]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, importpack_1.tools.contract.contractInvokeTrans_attributes(data)];
                    case 2:
                        res = _a.sent();
                        if (!res.err) {
                            return [2 /*return*/, res.info];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return NNSSell;
}());
exports.default = NNSSell;


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

/***/ "tt5S":
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,DQo8c3ZnIHdpZHRoPSIxNXB4IiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCAxNSAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4NCiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5ICg1MTAwMikgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+DQogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+DQogICAgPGRlZnM+PC9kZWZzPg0KICAgIDxnIGlkPSLmtY/op4jlmag0IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPGcgaWQ9ImJsb2Nrcy1oYW5nb3ZlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTYwOC4wMDAwMDAsIC0xMTY1LjAwMDAwMCkiIGZpbGw9IiNGRkZGRkYiPg0KICAgICAgICAgICAgPGcgaWQ9InN3dGljaCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTkwLjAwMDAwMCwgMTE1NC4wMDAwMDApIj4NCiAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAiPg0KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUuODk0NDI3MiwxMi43ODg4NTQ0IEwzMi4yNzYzOTMyLDI1LjU1Mjc4NjQgQzMyLjUyMzM4MjUsMjYuMDQ2NzY0OSAzMi4zMjMxNTgxLDI2LjY0NzQzNzkgMzEuODI5MTc5NiwyNi44OTQ0MjcyIEMzMS42OTAzMjQyLDI2Ljk2Mzg1NDkgMzEuNTM3MjExMSwyNyAzMS4zODE5NjYsMjcgTDE4LjYxODAzNCwyNyBDMTguMDY1NzQ5MiwyNyAxNy42MTgwMzQsMjYuNTUyMjg0NyAxNy42MTgwMzQsMjYgQzE3LjYxODAzNCwyNS44NDQ3NTQ5IDE3LjY1NDE3OTEsMjUuNjkxNjQxOCAxNy43MjM2MDY4LDI1LjU1Mjc4NjQgTDI0LjEwNTU3MjgsMTIuNzg4ODU0NCBDMjQuMzUyNTYyMSwxMi4yOTQ4NzU5IDI0Ljk1MzIzNTEsMTIuMDk0NjUxNSAyNS40NDcyMTM2LDEyLjM0MTY0MDggQzI1LjY0MDc0MSwxMi40Mzg0MDQ1IDI1Ljc5NzY2MzUsMTIuNTk1MzI3IDI1Ljg5NDQyNzIsMTIuNzg4ODU0NCBaIiBpZD0iVHJpYW5nbGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1LjAwMDAwMCwgMTkuMDAwMDAwKSBzY2FsZSgtMSwgMSkgcm90YXRlKDkwLjAwMDAwMCkgdHJhbnNsYXRlKC0yNS4wMDAwMDAsIC0xOS4wMDAwMDApICI+PC9wYXRoPg0KICAgICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgIDwvZz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvc3ZnPg=="

/***/ }),

/***/ "v8qo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/ts-loader!./src/pages/balance/balance.ts
var balance = __webpack_require__("5smL");
var balance_default = /*#__PURE__*/__webpack_require__.n(balance);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-35fa50d8","hasScoped":true,"transformToRequire":{"video":"src","source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/balance/balance.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('wallet-layout',[_c('div',{staticClass:"container"},[_c('div',{staticClass:"title",staticStyle:{"padding-bottom":"28px"}},[_c('span',[_vm._v(_vm._s(_vm.$t('balance.title1')))]),_vm._v(" "),_c('div',{staticStyle:{"float":"right"}},[_c('span',{staticClass:"user-select-ok",staticStyle:{"margin-right":"11px","color":"#fff"}},[_vm._v(_vm._s(_vm.$t('balance.title2'))+"："+_vm._s(_vm.currentAddress))]),_vm._v(" "),(_vm.chooseAddressarr &&_vm.chooseAddressarr.length>1)?_c('button',{staticClass:"btn",attrs:{"data-toggle":"modal","data-target":"#selectAddr"}},[_vm._v(_vm._s(_vm.$t('btn.switch')))]):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"neobalance",staticStyle:{"background":"#454F60","border-radius":"5px"}},[_c('div',[_c('div',{staticStyle:{"padding":"30px","padding-bottom":"40px"}},[_c('span',{staticClass:"balance-type"},[_vm._v("NEO ")]),_vm._v(" "),_c('span',{staticClass:"balance-amount"},[_vm._v(_vm._s(_vm.neoasset.neo))])]),_vm._v(" "),_c('div',{staticStyle:{"padding-left":"30px","padding-bottom":"30px"}},[_c('span',{staticClass:"balance-type"},[_vm._v("GAS ")]),_vm._v(" "),_c('span',{staticClass:"balance-amount"},[_vm._v(_vm._s(_vm.neoasset.gas))]),_vm._v(" "),_c('span',{staticStyle:{"vertical-align":"super","margin-left":"10px"}},[(_vm.gettingGas)?_c('button',{staticClass:"btn btn-nel",class:{'btn-disabled':_vm.isgetGas},attrs:{"disabled":_vm.isgetGas},on:{"click":_vm.getTestGas}},[_vm._v(_vm._s(_vm.$t('btn.getGas')))]):_vm._e(),_vm._v(" "),(!_vm.gettingGas)?_c('span',[_c('spinner-wrap',{attrs:{"isbig":false}})],1):_vm._e(),_vm._v(" "),_c('v-hint',[_c('div',{staticClass:"hint-img"},[_c('img',{staticStyle:{"width":"20px","height":"20px"},attrs:{"src":__webpack_require__("0rEL"),"alt":""}})]),_vm._v(" "),_c('div',{staticClass:"hint-content hint-otherwidth"},[_vm._v("\n                  "+_vm._s(_vm.$t('balance.tips'))+"\n              ")])])],1),_vm._v(" "),_c('v-toast',{ref:"toast"})],1),_vm._v(" "),_c('div',{staticClass:"claim",staticStyle:{"padding":"30px","padding-left":"2.3%"}},[_c('span',{staticStyle:{"margin-right":"17px"}},[_vm._v(_vm._s(_vm.$t('balance.title3'))+" : "+_vm._s(_vm.neoasset.claim))]),_vm._v(" "),(_vm.neoasset.claim!='0'&&_vm.claimbtn)?_c('button',{staticClass:"btn btn-nel",on:{"click":_vm.toClaimGas}},[_vm._v(_vm._s(_vm.$t('btn.claim')))]):_vm._e(),_vm._v(" "),(!_vm.claimbtn)?_c('span',[_c('spinner-wrap',{attrs:{"isbig":false}})],1):_vm._e(),_vm._v(" "),_c('span',{staticClass:"loadmsg"},[_vm._v(" "+_vm._s(_vm.loadmsg))])])])]),_vm._v(" "),(_vm.balances.length)?_c('div',{staticClass:"balance-asset"},[_c('div',{staticClass:"title"},[_c('span',[_vm._v(_vm._s(_vm.$t('balance.title4')))])]),_vm._v(" "),_vm._l((_vm.balances),function(balance){return _c('div',{key:balance.asset,staticClass:"assetrow"},[_c('div',{staticClass:"row"},[_c('div',{staticClass:"col-sm-2 info"},[_c('span',[_vm._v(_vm._s(balance.names))])]),_vm._v(" "),_c('div',{staticClass:"col-sm-8 info"},[_c('span',[_vm._v(" "+_vm._s(balance.balance))])]),_vm._v(" "),_c('div',{staticClass:"col-sm-2 transfer-btn"},[_c('span',{staticClass:"btn btn-transfer",on:{"click":function($event){_vm.toTransfer(balance.asset)}}},[_vm._v(_vm._s(_vm.$t('btn.transfer')))])])])])})],2):_vm._e(),_vm._v(" "),_c('div',{staticStyle:{"height":"30px"}})]),_vm._v(" "),_c('div',{staticClass:"modal fade",attrs:{"id":"selectAddr","tabindex":"-1"}},[_c('div',{staticClass:"modal-dialog",attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"modal-header"},[_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]),_vm._v(" "),_c('h4',{staticClass:"modal-title",attrs:{"id":"exampleModalLabel"}},[_vm._v(_vm._s(_vm.$t('balance.title5')))])]),_vm._v(" "),_c('div',{staticClass:"modal-body"},[_c('form',[_c('div',{staticClass:"form-group"},[_c('label',{attrs:{"for":"exampleInputFile"}},[_vm._v(_vm._s(_vm.$t('balance.title6'))+":")]),_vm._v(" "),_c('div',{staticClass:"radio",attrs:{"id":"selectAddress"}},_vm._l((_vm.chooseAddressarr),function(item){return _c('label',{key:item.address},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.chooseAddress),expression:"chooseAddress"}],attrs:{"type":"radio","autocomplete":"off"},domProps:{"value":item.address,"checked":_vm._q(_vm.chooseAddress,item.address)},on:{"change":function($event){_vm.chooseAddress=item.address}}}),_vm._v(_vm._s(item.address)+"\n                ")])}))])])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-default",attrs:{"type":"button","data-dismiss":"modal"}},[_vm._v(_vm._s(_vm.$t('btn.close')))]),_vm._v(" "),_c('button',{staticClass:"btn btn-primary",attrs:{"type":"button","data-dismiss":"modal"},on:{"click":function($event){_vm.addressSwitch()}}},[_vm._v(_vm._s(_vm.$t('btn.confirm')))])])])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var balance_balance = (esExports);
// CONCATENATED MODULE: ./src/pages/balance/balance.vue
function injectStyle (ssrContext) {
  __webpack_require__("d1Rh")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-35fa50d8"
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

/***/ "vcAA":
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
var Toast = /** @class */ (function (_super) {
    __extends(Toast, _super);
    function Toast() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.msg = "";
        _this.type = "";
        _this.isshow = false;
        return _this;
    }
    /**
     * @method 显示弹框
     * @param type 类型('success','error','')空则不显示
     * @param msg 显示内容
     * @param time 停留时间(单位:毫秒)5秒=5000
     */
    Toast.prototype.isShow = function (type, msg, time) {
        var _this = this;
        this.isshow = true;
        this.type = type;
        this.msg = msg;
        setTimeout(function () {
            _this.isshow = false;
            _this.type = "";
            _this.msg = "";
        }, time);
    };
    __decorate([
        vue_property_decorator_1.Watch("opneToast"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, Number]),
        __metadata("design:returntype", void 0)
    ], Toast.prototype, "isShow", null);
    Toast = __decorate([
        vue_property_decorator_1.Component
    ], Toast);
    return Toast;
}(vue_1.default));
exports.default = Toast;


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
        openauction: "开标",
        bid: "竞标",
        getdomain: "领取域名",
        recoversgas: "领回竞拍金",
        gettingdomain: "域名领取中...",
        recoveringsgas: "竞拍金领回中...",
        receivedsgas: "已退回余额",
        receivednns: "已领取域名",
        newbid: "参加竞拍",
        viewmore: "查看更多",
        edit: "编辑",
        renewal: "续约",
        exchange: "兑换",
        withdraw: "提取",
        topup: "充值",
        getGas: "索取Gas"
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
        msg4: "Gas提取成功!",
        tips: "您可以通过点击此按钮来获取10Gas, 该按钮每天只能点击一次。",
        errmsg1: "操作失败！请您明天再进行尝试！",
        errmsg2: "库存不足！请您明天再进行尝试！",
        successmsg: "操作成功！"
    },
    transfer: {
        transfer: "转账",
        title1: "资产",
        title2: "地址",
        title3: "金额",
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
    },
    nnsneo: {
        auction: "域名竞拍",
        myneoname: "我的域名管理",
        bonus: "我的分红"
    },
    auction: {
        title1: "域名竞拍",
        title2: "我的竞拍",
        title3: "竞拍信息",
        title4: "我的加价",
        title5: "竞拍进度",
        title6: "领取域名",
        title7: "领回竞拍金",
        entername: "请输入您想要的域名",
        checkavailable: "此域名可以进行竞拍。",
        checkbeing: "此域名正在进行竞拍。",
        checkformat: "请输入正确的域名格式",
        checkbuyer: "此域名已经被其他人竞拍了。",
        sendingmsg: "正在发送交易，请耐心等待...",
        searchmsg: "按域名搜索",
        status: "状态",
        lastauctionprice: "当前最高价",
        currentbidder: "当前竞标人",
        opentime: "开标时间",
        fixedperiod: "确定期",
        randomperiod: "随机期",
        ended: "已结束",
        me: "我",
        other: "他人",
        buyer: "中标人",
        hammerprice: "成交价",
        acutiontitle: "竞拍",
        domain: "域名",
        highest: "当前最高价",
        raisebid: "加价",
        enterbid: "请输入您的价格",
        yourbidmsg: "您的累积竞价",
        mybidmsg: "我的累积竞价 ",
        mywillbid: "我的累积竞价 ",
        price: "竞拍价: ",
        tips1: "注意 : 每次加价的最小值为 0.1 SGas. 当您的累积竞价小于当前最高价时，该次出价不成功。",
        isAvailable: "可用",
        errmsg1: "您当前拥有",
        errmsg2: "SGas.",
        errmsg4: "请输入正确的格式。",
        goback: "返回",
        waitmsg1: "未确认",
        waitmsg2: "您的加价将会在新区块生成之后被确认，请耐心等待...",
        getdomaintips: "注意 : 当您成功领取域名后，您可以在“我的域名管理”中进行编辑。",
        waitgetdomain: "您的操作将会在新区块生成之后被确认，请耐心等待...",
        fee: "手续费 ",
        remainingsgas: "可以领回的竞拍金 ",
        timetips1: "注意 : 如果确定期最后一天无人竞拍, 则确定期结束时间为该次竞拍的结束时间。",
        timetips2: "注意 : 竞拍即将进入随机期, 在随机期竞拍结束时间是不确定的，请尽早出价。",
        timetips3: "注意 : 在随机期竞拍结束时间是不确定的，请尽早出价。",
        bidstarttimemsg: "开标时间",
        endtimemsg: "确定期结束时间",
        randomtimemsg: "随机期开始时间",
        maxtimemsg: "随机期最大结束时间",
        tipsmsg1: "注意：竞拍开始之前，你需要知道2件事:",
        tipsmsg2: "竞拍所使用的资产是SGas，并且您需要将SGas充值进您的“竞拍账户”才能使用。",
        tipsmsg3: 'SGas需要在“SGas兑换”页面中用Gas1:1兑换获得, 然后使用“竞拍账户”中的充值功能，将SGas充值进您的竞拍账户',
        titleaccount: "您的竞拍账户",
        withdraw: "提取",
        topup: "充值",
        from: "充值源: ",
        to: "提取到",
        topupamount: "充值金额",
        withdrawamount: "提取金额",
        amount: "金额",
        asset: "资产",
        errmsg3: "是可用的",
        tipsmsg4: "注意：当你在使用Gas进行充值时，充值进你的“拍卖账户”之前，他会自动转换成SGas，整个过程需要两个区块的确认时间，请耐心等待...",
        yourbalance: "您的钱包账户",
        waiting: "等待",
        successwithdraw: "提取成功",
        successtop: "充值成功",
        successtopup: "充值成功!您的 ",
        successtopup2: " 个Sgas将会在2个区块被确认后进入您的竞拍账户!",
        successtopup3: " 个Sgas将会在1个区块被确认后进入您的竞拍账户!",
        successwithdraw2: " 个Sgas将会在1个区块后退回到您的地址!",
        failtopup: "充值失败 !你的Gas被转换成了SGas",
        fail: "操作失败 !",
        auctionopen: "开标",
        domainname: "域名",
        successbid: "加价成功",
        failbid: "加价失败",
        failbid2: "此域名竞拍结束，本次加价未执行",
        successbid1: "您加价了 ",
        successbid2: " SGas ，请等待区块确认。",
        successgetdomain: "域名领取成功",
        failgetdomain: "域名领取失败",
        tips: "注意: ",
        statustips: "确定期为竞拍第一阶段，时长为3天，此期间所有的出价都有效。当确定期最后一天有人出价时将触发最大时长为2天的随机期。否则竞拍即在确定期结束。",
        statustips2: "随机期为竞拍第二阶段，最大时长为2天，此期间任意一个出价都有可能触发该域名竞拍的结束从而出价无效，越靠后的出价触发结束的可能性越大，因此请尽早出价以免错失该域名。 ",
        toptips: "注意: 当系统提示您充值成功之后，仍需要一个区块的时间来确认这笔操作，请耐心等待。",
        withdrawtips: "注意: 当系统提示您提取成功之后，仍需要一个区块的时间来确认这笔操作，请耐心等待。",
        getall: "全部"
    },
    exchange: {
        title: "SGas兑换",
        tosgas: "兑换SGas",
        togas: "兑换Gas",
        tips: "注意 : SGAS是一种NEP5资产，与NEO的GAS按照1：1比例绑定，它们之间可自由兑换。兑换需要一个区块的确认时间，请耐心等待。",
        spend: "我将花费 : ",
        receive: "我将获得 : ",
        warnmsg: "余额不足",
        waittitle: "交易记录",
        balance: "余额",
        amount: "金额"
    },
    myneoname: {
        title: "我的域名管理",
        resolver: "地址解析器",
        mapping: "地址映射",
        time: "域名到期时间",
        expiring: "即将过期",
        edittitle: "编辑信息",
        neoname: "域名",
        notconfigure: "未配置",
        expired: "已过期",
        tips: "注意 : 您需要在成功确认地址解析器之后，才能进行地址映射。"
    },
    bonus: {
        title1: "我的分红",
        title2: "历史",
        msg: "未领取的SGas",
        wait1: "发送请求...",
        wait2: "等待确认...",
        wait3: "SGas 领取...",
        wait4: "领取成功!"
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
var exchange_vue_1 = __webpack_require__("eL9F");
var nnsneo_vue_1 = __webpack_require__("C0Cu");
var nns_vue_1 = __webpack_require__("RN/i");
var settings_vue_1 = __webpack_require__("hZlE");
var importpack_1 = __webpack_require__("VKSY");
var taskmanager_1 = __webpack_require__("XfB5");
var index_1 = __webpack_require__("OrGm");
vue_1.default.use(vue_i18n_1.default);
vue_1.default.use(index_1.default);
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
    components: index_1.default,
    computed: {
        ViewComponent: function () {
            var routeArray = this.currentRoute.replace("#", "").split("/");
            var route = routeArray[0];
            var subroute = routeArray.length > 1 ? routeArray[1] : undefined;
            switch (route) {
                case "balance":
                    return balance_vue_1.default;
                case "login":
                    return login_vue_1.default;
                case "transfer":
                    return transfer_vue_1.default;
                case "exchange":
                    return exchange_vue_1.default;
                case "nnsneo":
                    //由于。。。。子路由的页面都嵌套进了NNSNeo.vue里进行切换，此处的二级路由跳转部分。等于没用。路由跳转部分在NNSNeo.ts里做控制
                    // switch (subroute)
                    // {
                    //     case "auction":
                    //         return NNSNeo;
                    //     case "exchange":
                    //         return NNSNeo;
                    //     case "myneoname":
                    //         return NNSNeo;
                    //     case "bonus":
                    //         return NNSNeo;
                    // }
                    return nnsneo_vue_1.default;
                case "nns":
                    return nns_vue_1.default;
                case "settings":
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
setInterval(function () {
    var oldBlock = new importpack_1.tools.sessionstoretool("block");
    importpack_1.tools.wwwtool.api_getHeight()
        .then(function (data) {
        var oldHeight = oldBlock.select("height");
        if (oldHeight) {
            if (data > oldHeight) {
                taskmanager_1.TaskManager.update();
                oldBlock.put("height", data);
            }
        }
        else {
            oldBlock.put("height", data);
        }
    });
}, 15000);


/***/ }),

/***/ "zH9E":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABKpJREFUaAXtmUmPTUEYhl1TG9ocaUMMbSZEiCHYIGIMC3/AGBuWgj+ABRvzhlhgIXojIoJEEDFFLEydRjohtI4miG4z7Xk79151v3vO7TMSSX/Jk1Pj+1XVOVW3qm67dm3WNgKxRiATqzaVm5ub2/MYCZNgPAyGXiDtRqiHx3AfajKZzBee/95o+AjYAtehEVqzbxS4D7th6j/rAc6HwR54C1HtCxVPwbS/2hEcroc6SMqaENoB3aJ2JNAcwEE5DvbCmlYcNZD/Ct7DL+gBA6ECOoCfXSFjLfOj1q9A5HQa3xfOg59Vk7ET5kIFdMo5I9wB+sB02Aw3wM8ek6GFIDlDsBwu+HiUw7WgUQ5klO0IS+AaeFktiaMDibVWCKEMHAUvO0xi/9Y0/PKpWwbbQJPZ2m0StAzHM0TWWWXiP2FLPOU/tdFaAe/A2qE/pSKEUBsC9VaVeGKNzzULTX1SWo1c+0FkQa5M6CeV97pq2fCR0EIBK6C/0cOf5kl+QQgo1bI1GE5F+1qfkNYvsEjIgmi3hzNgbWlIqZYObLUqxFeHFgpZAR9T4LPxXRVKhspat28akRri3UMJRSyMnyrjW9uVQaXktJN0rZKI/TGp4heyyS2UYvi40e5LfKZJK4jaDkwm192XNBM/X1Aj3ch15LUdcS1UB7Sfd+0NkWo3IeWwGl9jfNg2FWTbN6DDiGt1RN65CWmG+VT1xu2GbgDzwHfTaTvQ0zTwA6I/TFraUb1117SAdHYT3LDtgI1rS/y3zfr0HX01zDZYZ1jXtBu1Zdz8NMK9jehn4t9NWj5qG6cDuGs6jNjPys1PIzzMiL7hM7ZvJV/EdsCuABWUHJEvnXKAt63BGmfc6EbD12wH7lHSfV0dic/zrZ18hm4r7Ep4J7AbRqALPATXtLVQR1I3/BxyHRPWNntUKMdU2GVEdIhZHEokQmF8DAV7VXOJNPuVlFanwmT4Cq7pMO67FpdWDJaL/n7XYTa8KlhtU4rKdlcovW2mWGJRtBeBHTTtggNfGBQ0horam38C13QAX15QMIEImmPhuesoG442+rk2IbLdQ1QntfCnpJyoeaI1Dh55+DlHWryFA4HucNVDXCvDJij5E2/aWhSlvg7zz8DaSxKS+e1BqBJ0Hvay0ySGvpyljs7c+0C31dY+krCgqLdxEhCcCE+tp2xc80K3zCthgJ8f8nrDPDgIr8HL1PiV0uDZFdTRMj/NXHqgzwAhXfcdg1Kno9xhRPt5bYm1f9HGbDiMgaHgZy/I0OXuRXzNIXwAKkHbiE2k3+IZzxDWKB4AXTolaWcRa/m15al598CI1xOfHa/1Tm3EFsJl4yRKVKvPashfuxPWnLNXKyS13BIm2gndMi+Dk9AAQU3fubYHanjRjxRp+vbvgpe9IrGoE4HmgPMCioKIavc4I4sO4JrM5SBtHUY0N56AdpU3+Z71Xfsaeppnp0FbeWs6r8xHo9pmJBqnEWVZwm3Esq2g7izQt+9l+9zGRnLgCniFGaGvWXxPUl71cmnUvUFYS6o9IaqIDvn/hzH8s8H9U1H7s7lu62PPAVcsjTANnoDuBtDIn+DtXObZZm0jkNQI/AaeFfcaT01x6QAAAABJRU5ErkJggg=="

/***/ })

},["x35b"]);