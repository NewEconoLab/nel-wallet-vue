webpackJsonp([13],{bnm1:function(t,e,n){"use strict";function i(t){n("hFaK")}Object.defineProperty(e,"__esModule",{value:!0});var o=n("brqA"),a=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);var r=n("vw2b"),d=n("VU/8"),l=i,c=d(a.a,r.a,!1,l,"data-v-1696d4c0",null);e.default=c.exports},brqA:function(t,e,n){"use strict";var i=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}(),o=this&&this.__decorate||function(t,e,n,i){var o,a=arguments.length,s=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,n,i);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(s=(a<3?o(s):a>3?o(e,n,s):o(e,n))||s);return a>3&&s&&Object.defineProperty(e,n,s),s},a=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},s=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))(function(o,a){function s(t){try{d(i.next(t))}catch(t){a(t)}}function r(t){try{d(i.throw(t))}catch(t){a(t)}}function d(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(s,r)}d((i=i.apply(t,e||[])).next())})},r=this&&this.__generator||function(t,e){function n(t){return function(e){return i([t,e])}}function i(n){if(o)throw new TypeError("Generator is already executing.");for(;d;)try{if(o=1,a&&(s=2&n[0]?a.return:n[0]?a.throw||((s=a.return)&&s.call(a),0):a.next)&&!(s=s.call(a,n[1])).done)return s;switch(a=0,s&&(n=[2&n[0],s.value]),n[0]){case 0:case 1:s=n;break;case 4:return d.label++,{value:n[1],done:!1};case 5:d.label++,a=n[1],n=[0];continue;case 7:n=d.ops.pop(),d.trys.pop();continue;default:if(s=d.trys,!(s=s.length>0&&s[s.length-1])&&(6===n[0]||2===n[0])){d=0;continue}if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){d.label=n[1];break}if(6===n[0]&&d.label<s[1]){d.label=s[1],s=n;break}if(s&&d.label<s[2]){d.label=s[2],d.ops.push(n);break}s[2]&&d.ops.pop(),d.trys.pop();continue}n=e.call(t,d)}catch(t){n=[6,t],a=0}finally{o=s=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,a,s,r,d={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return r={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r};Object.defineProperty(e,"__esModule",{value:!0});var d=n("/5sW"),l=n("443i"),c=n("VKSY"),p=n("6nHw"),m=n("5LD5"),u=n("XfB5"),v=function(t){function e(){var e=t.call(this)||this;return e.currentAddress="",e.isShowEdit=!1,e.currentAddress=p.LoginInfo.getCurrentAddress(),e.neonameList=null,e.set_contract="0x6e2aea28af9c5febea0774759b1b76398e3167f1",e.domainEdit=new m.sessionStoreTool("domain-edit"),e.renewalWatting=!1,e.resolverAddress="",e.mappingState=0,e.resolverState=0,e.mappingistrue=!1,e.currentdomain="",e}return i(e,t),e.prototype.mounted=function(){c.tools.nnstool.initRootDomain("neo"),this.getAllNeoName(this.currentAddress),p.TaskFunction.domainResovle=this.resolverTask,p.TaskFunction.domainMapping=this.mappingTask,p.TaskFunction.domainRenewal=this.renewalTask},e.prototype.verifyMapping=function(){if(!this.resolverAddress)return void(this.mappingistrue=!1);var t=c.tools.neotool.verifyAddress(this.resolverAddress);this.mappingistrue=t},e.prototype.getAllNeoName=function(t){return s(this,void 0,void 0,function(){var e,n,i,o,a,s,d,l,p;return r(this,function(r){switch(r.label){case 0:return[4,c.tools.wwwtool.getnnsinfo(t,".test")];case 1:if(e=r.sent(),!(n=e)||!n.length)return[3,11];i=[];for(o in n)i.push(o);a=0,r.label=2;case 2:return a<i.length?(s=i[a],[4,this.checkExpiration(n[s])]):[3,10];case 3:return d=r.sent(),d?[3,5]:[4,this.checkExpirationSoon(n[s])];case 4:return l=r.sent(),n[s].expired=d,n[s].expiring=l,[3,6];case 5:n[s].expiring=!1,n[s].expired=!0,r.label=6;case 6:return n[s].resolver?[4,c.tools.nnstool.resolveData(n[s].domain)]:[3,8];case 7:p=r.sent(),n[s].resolverAddress=p,r.label=8;case 8:n[s].ttl=c.tools.timetool.getTime(e[s].ttl),r.label=9;case 9:return a++,[3,2];case 10:this.neonameList=n,r.label=11;case 11:return[2]}})})},e.prototype.checkExpiration=function(t){var e=(new Date).getTime();return!(new Neo.BigInteger(e).compareTo(new Neo.BigInteger(t.ttl).multiply(1e3))<0)},e.prototype.checkExpirationSoon=function(t){var e=(new Date).getTime();return!(new Neo.BigInteger(t.ttl).multiply(1e3).subtract(new Neo.BigInteger(e)).compareTo(27e6)<0)},e.prototype.resetresolve=function(){this.resolverState=0,this.resolverAddress="",this.mappingState=0,this.mappingistrue=!1},e.prototype.resetmappingData=function(){this.resolverAddress="",this.mappingState=0},e.prototype.onShowEdit=function(t){this.domainInfo=t,this.resolverAddress=t.resolverAddress,this.mappingistrue=c.tools.neotool.verifyAddress(this.resolverAddress),this.mappingState=this.domainInfo.resolverAddress?1:0,this.resolverState=this.domainInfo.resolver?1:0,this.renewalWatting=!1,this.isShowEdit=!this.isShowEdit,this.currentdomain=t.domain;var e=this.domainEdit.select(t.domain);e&&(e.resolver&&"watting"==e.resolver&&(this.resolverState=2),e.mapping&&e.mapping.state&&"watting"==e.mapping.state&&(this.mappingState=2,this.resolverAddress=e.mapping.address),e.renewal&&"watting"==e.renewal&&(this.renewalWatting=!0))},e.prototype.setresolve=function(){return s(this,void 0,void 0,function(){var t,e,n;return r(this,function(i){switch(i.label){case 0:return t=this.set_contract.hexToBytes().reverse(),[4,c.tools.nnstool.setResolve(this.domainInfo.domain,t)];case 1:return e=i.sent(),e.err||(this.resolverState=2,n=e.info,u.TaskManager.addTask(new p.Task(p.ConfirmType.contract,n,{domain:this.domainInfo.domain,contract:this.set_contract}),p.TaskType.domainResovle),this.domainEdit.put(this.domainInfo.domain,"watting","resolver")),[2]}})})},e.prototype.mappingData=function(){return s(this,void 0,void 0,function(){var t,e;return r(this,function(n){switch(n.label){case 0:return[4,c.tools.nnstool.setResolveData(this.domainInfo.domain,this.resolverAddress,this.domainInfo.resolver)];case 1:return t=n.sent(),t.err||(this.mappingState=2,e=t.info,u.TaskManager.addTask(new p.Task(p.ConfirmType.contract,e,{domain:this.domainInfo.domain,address:this.resolverAddress}),p.TaskType.domainMapping),this.domainEdit.put(this.domainInfo.domain,{state:"watting",address:this.resolverAddress},"mapping")),[2]}})})},e.prototype.renewalDomain=function(){return s(this,void 0,void 0,function(){var t,e,n,i;return r(this,function(o){switch(o.label){case 0:return[4,c.tools.nnstool.getRootInfo("neo")];case 1:return t=o.sent(),e=this.domainInfo.domain,[4,c.tools.nnssell.renewDomain(e,t.register)];case 2:return n=o.sent(),n.err||(this.renewalWatting=!0,i=n.info,u.TaskManager.addTask(new p.Task(p.ConfirmType.contract,i,{domain:e}),p.TaskType.domainRenewal),this.domainEdit.put(this.domainInfo.domain,"watting","renewal")),[2]}})})},e.prototype.renewalTask=function(t){t==this.currentdomain&&(this.renewalWatting=!1),this.getAllNeoName(this.currentAddress)},e.prototype.mappingTask=function(t,e){this.getAllNeoName(this.currentAddress),this.currentdomain==t&&(this.mappingState=1,e&&(this.resolverAddress=e))},e.prototype.resolverTask=function(t){this.currentdomain==t&&(this.resolverState=1),this.getAllNeoName(this.currentAddress)},e=o([l.Component({components:{}}),a("design:paramtypes",[])],e)}(d.default);e.default=v},"cFQ/":function(t,e,n){e=t.exports=n("FZ+f")(!1),e.push([t.i,"\n.myneo-box .ff6[data-v-1696d4c0] {\n  color: #ff6a6a;\n}\n.myneo-box .form-box[data-v-1696d4c0] {\n  background: #454f60;\n  border-radius: 5px;\n  padding: 20px 50px 10px 50px;\n  font-size: 14px;\n  margin-bottom: 20px;\n  position: relative;\n}\n.myneo-box .form-box .neoname[data-v-1696d4c0] {\n  font-size: 16px;\n}\n.myneo-box .form-box .neoname[data-v-1696d4c0],\n.myneo-box .form-box .addr-resolver[data-v-1696d4c0],\n.myneo-box .form-box .addr-mapping[data-v-1696d4c0],\n.myneo-box .form-box .time-msg[data-v-1696d4c0] {\n  margin-bottom: 10px;\n}\n.myneo-box .form-box .btn-right[data-v-1696d4c0] {\n  position: absolute;\n  top: 50%;\n  right: 30px;\n  margin-top: -19px;\n}\n.myneo-box .form-box .btn-right .btn-bid[data-v-1696d4c0] {\n  padding: 0;\n  font-size: 18px;\n  width: 110px;\n  height: 38px;\n}\n.myneo-box .form-box .btn-right .btn-bid.btn-disable[data-v-1696d4c0] {\n  font-size: 14px;\n}\n.myneo-box .edit-wrap[data-v-1696d4c0] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  height: 100%;\n  z-index: 1030;\n}\n.myneo-box .edit-wrap .edit-box[data-v-1696d4c0] {\n  background: #454f60;\n  padding: 30px 50px 50px 50px;\n  width: 80%;\n  color: #fff;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -moz-transform: translate(-50%, -50%);\n  -webkit-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  border-radius: 5px;\n  font-size: 16px;\n}\n.myneo-box .edit-wrap .edit-box .edit-title[data-v-1696d4c0] {\n  font-size: 20px;\n}\n.myneo-box .edit-wrap .edit-box .edit-tips[data-v-1696d4c0] {\n  font-size: 14px;\n  color: #c5c5c5;\n  margin-top: 20px;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-name[data-v-1696d4c0] {\n  margin-top: 50px;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input[data-v-1696d4c0] {\n  margin-top: 50px;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-msg .btn-input-reset[data-v-1696d4c0] {\n  width: 80px;\n  height: 30px;\n  font-size: 14px;\n  padding: 0;\n  line-height: 30px;\n  text-align: center;\n  margin-left: 15px;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box[data-v-1696d4c0] {\n  margin-top: 20px;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box input[data-v-1696d4c0] {\n  width: 68%;\n  height: 56px;\n  background: none;\n  border: 1px solid #b2b2b2;\n  border-radius: 5px;\n  vertical-align: middle;\n  margin-bottom: 0;\n  color: #c5c5c5;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box input.readonly-input[data-v-1696d4c0] {\n  background: #6d7480;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box button[data-v-1696d4c0] {\n  vertical-align: middle;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box button.btn-disable[data-v-1696d4c0] {\n  background: #77bcf6;\n  opacity: 1;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box .ok-img[data-v-1696d4c0] {\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 20px;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box .ok-img img[data-v-1696d4c0] {\n  width: 24px;\n  height: 24px;\n}\n.myneo-box .edit-wrap .edit-box .edit-close[data-v-1696d4c0] {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  width: 30px;\n  height: 30px;\n  font-size: 30px;\n}\n",""])},hFaK:function(t,e,n){var i=n("cFQ/");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("1126f154",i,!0,{})},vw2b:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"myneo-box"},[i("div",{staticClass:"title"},[i("span",[t._v(t._s(t.$t("myneoname.title")))])]),t._v(" "),t._l(t.neonameList,function(e,n){return t.neonameList?i("div",{key:n,staticClass:"form-box"},[i("div",{staticClass:"neoname"},[t._v("\n            "+t._s(e.domain)+"\n        ")]),t._v(" "),i("div",{staticClass:"addr-resolver"},[t._v("( "+t._s(t.$t("myneoname.resolver"))+": "+t._s(e.resolver?e.resolver:t.$t("myneoname.notconfigure"))+" )")]),t._v(" "),i("div",{staticClass:"addr-mapping"},[t._v("( "+t._s(t.$t("myneoname.mapping"))+": "+t._s(e.resolverAddress?e.resolverAddress:t.$t("myneoname.notconfigure"))+" )")]),t._v(" "),e.expired?t._e():i("div",{staticClass:"time-msg"},[t._v("( "+t._s(t.$t("myneoname.time"))+": "+t._s(e.ttl)+" "),e.expiring?t._e():i("span",{staticClass:"ff6"},[t._v(t._s(t.$t("myneoname.expiring")))]),t._v(" )")]),t._v(" "),e.expired?i("div",{staticClass:"time-msg"},[t._v("( "+t._s(t.$t("myneoname.time"))+":  "),i("span",{staticClass:"ff6"},[t._v(t._s(t.$t("myneoname.expired")))]),t._v(" )")]):t._e(),t._v(" "),i("div",{staticClass:"btn-right"},[i("button",{staticClass:"btn btn-nel btn-bid",on:{click:function(n){t.onShowEdit(e)}}},[t._v(t._s(t.$t("btn.edit")))])])]):t._e()}),t._v(" "),t.isShowEdit?i("div",{staticClass:"edit-wrap"},[i("div",{staticClass:"edit-box"},[i("div",{staticClass:"edit-title"},[t._v(t._s(t.$t("myneoname.edittitle")))]),t._v(" "),i("div",{staticClass:"edit-tips"},[t._v(t._s(t.$t("myneoname.tips")))]),t._v(" "),i("div",{staticClass:"edit-content"},[i("div",{staticClass:"edit-name"},[t._v(t._s(t.$t("myneoname.neoname"))+": "+t._s(t.domainInfo.domain))]),t._v(" "),i("div",{staticClass:"edit-input"},[i("div",{staticClass:"input-msg"},[t._v("\n                    "+t._s(t.$t("myneoname.resolver"))+":\n                    "),1==t.resolverState?i("button",{staticClass:"btn btn-nel btn-input-reset",on:{click:t.resetresolve}},[t._v(t._s(t.$t("btn.reset")))]):t._e()]),t._v(" "),i("div",{staticClass:"input-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.set_contract,expression:"set_contract"}],staticClass:"readonly-input",attrs:{type:"text",readonly:"readonly",autocomplete:"off"},domProps:{value:t.set_contract},on:{input:function(e){e.target.composing||(t.set_contract=e.target.value)}}}),t._v(" "),0==t.resolverState?i("button",{staticClass:"btn btn-nel btn-big",on:{click:t.setresolve}},[t._v(t._s(t.$t("btn.confirm")))]):t._e(),t._v(" "),2==t.resolverState?i("button",{staticClass:"btn btn-nel btn-big btn-disable",attrs:{disabled:""}},[t._v(t._s(t.$t("btn.confirming")))]):t._e(),t._v(" "),1==t.resolverState?i("div",{staticClass:"ok-img"},[i("img",{attrs:{src:n("wtuE"),alt:""}})]):t._e()])]),t._v(" "),i("div",{staticClass:"edit-input"},[i("div",{staticClass:"input-msg"},[t._v("\n                    "+t._s(t.$t("myneoname.mapping"))+":\n                    "),1==t.mappingState?i("button",{staticClass:"btn btn-nel btn-input-reset",on:{click:t.resetmappingData}},[t._v(t._s(t.$t("btn.reset")))]):t._e()]),t._v(" "),i("div",{staticClass:"input-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.resolverAddress,expression:"resolverAddress"}],attrs:{type:"text",autocomplete:"off"},domProps:{value:t.resolverAddress},on:{input:[function(e){e.target.composing||(t.resolverAddress=e.target.value)},t.verifyMapping]}}),t._v(" "),0==t.mappingState?i("button",{staticClass:"btn btn-nel btn-big",class:{"btn-disable":1!=t.resolverState||!t.mappingistrue},attrs:{disabled:1!=t.resolverState||!t.mappingistrue},on:{click:t.mappingData}},[t._v(t._s(t.$t("btn.confirm")))]):t._e(),t._v(" "),2==t.mappingState?i("button",{staticClass:"btn btn-nel btn-big btn-disable",attrs:{disabled:""}},[t._v(t._s(t.$t("btn.confirming")))]):t._e(),t._v(" "),1==t.mappingState?i("div",{staticClass:"ok-img"},[i("img",{attrs:{src:n("wtuE"),alt:""}})]):t._e()])]),t._v(" "),i("div",{staticClass:"edit-input"},[i("div",{staticClass:"input-msg"},[t._v("\n                    "+t._s(t.$t("myneoname.time"))+":\n                ")]),t._v(" "),i("div",{staticClass:"input-box"},[i("input",{staticClass:"readonly-input",attrs:{type:"text",readonly:"readonly"},domProps:{value:t.domainInfo.expired?t.$t("myneoname.expired"):t.domainInfo.ttl}}),t._v(" "),t.domainInfo.expired||t.domainInfo.expiring||t.renewalWatting?t._e():i("button",{staticClass:"btn btn-nel btn-big",on:{click:t.renewalDomain}},[t._v(t._s(t.$t("btn.renewal")))]),t._v(" "),!t.domainInfo.expired&&!t.domainInfo.expiring||t.renewalWatting?t._e():i("button",{staticClass:"btn btn-nel btn-big btn-disable",attrs:{disabled:""}},[t._v(t._s(t.$t("btn.renewal")))]),t._v(" "),t.renewalWatting?i("button",{staticClass:"btn btn-nel btn-big btn-disable",attrs:{disabled:""}},[t._v(t._s(t.$t("btn.renewaling")))]):t._e()])])]),t._v(" "),i("div",{staticClass:"edit-close"},[i("span",{attrs:{"aria-hidden":"true"},on:{click:function(e){t.isShowEdit=!t.isShowEdit}}},[t._v("×")])])])]):t._e()],2)},o=[],a={render:i,staticRenderFns:o};e.a=a}});