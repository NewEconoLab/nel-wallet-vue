webpackJsonp([13],{"6M52":function(t,n,s){"use strict";function e(t){s("kjZz")}Object.defineProperty(n,"__esModule",{value:!0});var o=s("DaUf"),a=s.n(o);for(var i in o)"default"!==i&&function(t){s.d(n,t,function(){return o[t]})}(i);var r=s("SekO"),u=s("VU/8"),l=e,p=u(a.a,r.a,!1,l,"data-v-24ed8750",null);n.default=p.exports},DaUf:function(t,n,s){"use strict";var e=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var s in n)n.hasOwnProperty(s)&&(t[s]=n[s])};return function(n,s){function e(){this.constructor=n}t(n,s),n.prototype=null===s?Object.create(s):(e.prototype=s.prototype,new e)}}(),o=this&&this.__decorate||function(t,n,s,e){var o,a=arguments.length,i=a<3?n:null===e?e=Object.getOwnPropertyDescriptor(n,s):e;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,n,s,e);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(i=(a<3?o(i):a>3?o(n,s,i):o(n,s))||i);return a>3&&i&&Object.defineProperty(n,s,i),i},a=this&&this.__metadata||function(t,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,n)},i=this&&this.__awaiter||function(t,n,s,e){return new(s||(s=Promise))(function(o,a){function i(t){try{u(e.next(t))}catch(t){a(t)}}function r(t){try{u(e.throw(t))}catch(t){a(t)}}function u(t){t.done?o(t.value):new s(function(n){n(t.value)}).then(i,r)}u((e=e.apply(t,n||[])).next())})},r=this&&this.__generator||function(t,n){function s(t){return function(n){return e([t,n])}}function e(s){if(o)throw new TypeError("Generator is already executing.");for(;u;)try{if(o=1,a&&(i=2&s[0]?a.return:s[0]?a.throw||((i=a.return)&&i.call(a),0):a.next)&&!(i=i.call(a,s[1])).done)return i;switch(a=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return u.label++,{value:s[1],done:!1};case 5:u.label++,a=s[1],s=[0];continue;case 7:s=u.ops.pop(),u.trys.pop();continue;default:if(i=u.trys,!(i=i.length>0&&i[i.length-1])&&(6===s[0]||2===s[0])){u=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){u.label=s[1];break}if(6===s[0]&&u.label<i[1]){u.label=i[1],i=s;break}if(i&&u.label<i[2]){u.label=i[2],u.ops.push(s);break}i[2]&&u.ops.pop(),u.trys.pop();continue}s=n.call(t,u)}catch(t){s=[6,t],a=0}finally{o=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}var o,a,i,r,u={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r};Object.defineProperty(n,"__esModule",{value:!0});var u=s("/5sW"),l=s("443i"),p=s("VKSY"),c=s("6nHw"),d=function(t){function n(){var n=t.call(this)||this;return n.totalSend="0",n.blocktime="",n.mybalance="0",n.currentAddress=c.LoginInfo.getCurrentAddress(),n.bonusList=null,n.isPage=!1,n.myBonusPageUtil=new c.PageUtil(0,5),n.isBonusPage=!1,n.myBonus="0",n.isApplyBonus=0,n.openToast=null,n.initMyBonus(n.currentAddress),n.initBonusHistory(n.currentAddress,!0),n}return e(n,t),n.prototype.initMyBonus=function(t){return i(this,void 0,void 0,function(){var n,s;return r(this,function(e){switch(e.label){case 0:return[4,p.tools.wwwtool.getcurrentbonus(t)];case 1:if(n=e.sent()){if(this.myBonus=0!=parseFloat(n.send)?n.send:"0",this.totalSend=n.totalSend,this.mybalance=n.balance,s=parseInt(n.blocktime),this.blocktime=p.tools.timetool.getTime(s||0),"0"==this.myBonus)return this.isApplyBonus=0,[2];""!=n.txid?(this.myBonus="0",this.isApplyBonus=3):n.applied?this.isApplyBonus=2:this.isApplyBonus=1}return[2]}})})},n.prototype.toApplyBonus=function(){return i(this,void 0,void 0,function(){var t;return r(this,function(n){switch(n.label){case 0:return[4,p.tools.wwwtool.applybonus(this.currentAddress)];case 1:return t=n.sent(),t.result?(this.isApplyBonus=2,this.openToast=this.$refs.toast.isShow,this.openToast("success",""+this.$t("bonus.waiting"),5e3)):this.isApplyBonus=1,[2]}})})},n.prototype.initBonusHistory=function(t,n){return i(this,void 0,void 0,function(){var s,e,o,a;return r(this,function(i){switch(i.label){case 0:return s=null,n?[3,2]:[4,p.tools.wwwtool.getbonusbyaddress(t,this.myBonusPageUtil.currentPage,this.myBonusPageUtil.pageSize)];case 1:return s=i.sent(),[3,4];case 2:return[4,p.tools.wwwtool.getbonusbyaddress(t,1,5)];case 3:s=i.sent(),s&&(this.myBonusPageUtil=new c.PageUtil(s.count,5)),i.label=4;case 4:if(e=s.list,e.length){for(o in e)e[o].blocktime=p.tools.timetool.getTime(e[o].blocktime?e[o].blocktime:"0");this.bonusList=e,a=s.count,this.isBonusPage=!0,a>this.myBonusPageUtil.pageSize?this.isPage=!0:this.isPage=!1}return[2]}})})},n.prototype.nextBonus=function(){this.myBonusPageUtil.currentPage==this.myBonusPageUtil.totalPage?this.myBonusPageUtil.currentPage=this.myBonusPageUtil.totalPage:(this.myBonusPageUtil.currentPage+=1,this.initBonusHistory(this.currentAddress,!1))},n.prototype.previousBonus=function(){this.myBonusPageUtil.currentPage<=1?this.myBonusPageUtil.currentPage=1:(this.myBonusPageUtil.currentPage-=1,this.initBonusHistory(this.currentAddress,!1))},n=o([l.Component({components:{}}),a("design:paramtypes",[])],n)}(u.default);n.default=d},SekO:function(t,n,s){"use strict";var e=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"bonus-wrap"},[e("div",{staticClass:"bonus-tips"},[t._v(t._s(t.$t("bonus.tips")))]),t._v(" "),e("div",{staticClass:"title"},[e("span",[t._v(t._s(t.$t("bonus.title")))])]),t._v(" "),e("div",{staticClass:"form-box"},[e("div",{staticClass:"nnc-wrap"},[e("strong",[t._v("\n        "+t._s(t.$t("bonus.mydividend"))+"\n        "),e("span",{staticClass:"dde"},[t._v(t._s(t.myBonus))]),t._v(" CGAS\n      ")]),t._v(" "),e("p",[t._v(t._s(t.$t("bonus.distribution"))+t._s(t.totalSend)+" CGas")]),t._v(" "),e("p",[t._v(t._s(t.$t("bonus.mytotal"))+t._s(t.mybalance)+" NNC")]),t._v(" "),e("p",[t._v(t._s(t.$t("bonus.snapshot"))+t._s(t.blocktime))])]),t._v(" "),e("div",{staticClass:"btn-right"},[2==t.isApplyBonus?e("button",{staticClass:"btn btn-nel btn-bid btn-disable"},[t._v(t._s(t.$t("btn.applying")))]):3==t.isApplyBonus?e("button",{staticClass:"btn btn-nel btn-bid btn-disable"},[t._v(t._s(t.$t("btn.applyed")))]):e("button",{staticClass:"btn btn-nel btn-bid",class:{"btn-disable":0==t.isApplyBonus},attrs:{disabled:0==t.isApplyBonus},on:{click:t.toApplyBonus}},[t._v(t._s(t.$t("btn.apply")))])])]),t._v(" "),0!=t.myBonusPageUtil.totalCount?e("div",{staticClass:"title"},[e("span",[t._v(t._s(t.$t("bonus.title2")))])]):t._e(),t._v(" "),0!=t.myBonusPageUtil.totalCount?e("div",{staticClass:"form-box"},[t._l(t.bonusList,function(n,s){return e("div",{key:s,staticClass:"mybonus-wrap"},[e("div",{staticClass:"linetop-text mybonus-text"},[e("span",{staticClass:"dde"},[t._v("+"+t._s(n.send))]),t._v(" CGas\n      ")]),t._v(" "),e("hr"),t._v(" "),e("div",{staticClass:"linedown-text"},[t._v(t._s(n.blocktime))])])}),t._v(" "),t.isBonusPage?e("div",{staticClass:"page-msg"},[t._v(t._s(t.$t("page.page"))+t._s(t.myBonusPageUtil.currentPage)+t._s(t.$t("page.total1"))+t._s(t.myBonusPageUtil.totalPage)+t._s(t.$t("page.total2")))]):t._e(),t._v(" "),t.isBonusPage?e("div",{staticClass:"page"},[e("div",{staticClass:"page-previous",on:{click:t.previousBonus}},[e("img",{attrs:{src:s("tt5S"),alt:""}})]),t._v(" "),e("div",{staticStyle:{width:"1px"}}),t._v(" "),e("div",{staticClass:"page-next",on:{click:t.nextBonus}},[e("img",{attrs:{src:s("pp3u"),alt:""}})])]):t._e()],2):t._e(),t._v(" "),e("v-toast",{ref:"toast"})],1)},o=[],a={render:e,staticRenderFns:o};n.a=a},kjZz:function(t,n,s){var e=s("ptl9");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);s("rjj0")("31f721a4",e,!0,{})},ptl9:function(t,n,s){n=t.exports=s("FZ+f")(!1),n.push([t.i,"\n.bonus-wrap .dde[data-v-24ed8750] {\n  color: #2dde4f;\n}\n.bonus-wrap .bonus-tips[data-v-24ed8750] {\n  font-size: 14px;\n  color: #c5c5c5;\n  margin-top: 50px;\n}\n.bonus-wrap .btn[data-v-24ed8750] {\n  margin-bottom: 20px;\n}\n.bonus-wrap .btn[data-v-24ed8750]:last-child {\n  margin-bottom: 0;\n}\n.bonus-wrap .btn.btn-disable[data-v-24ed8750] {\n  background: #77bcf6;\n  opacity: 1;\n}\n.bonus-wrap .form-box[data-v-24ed8750] {\n  background: #454f60;\n  border-radius: 5px;\n  padding: 30px 50px;\n  margin-bottom: 20px;\n  color: #ffffff;\n  position: relative;\n}\n.bonus-wrap .form-box .nnc-wrap strong[data-v-24ed8750] {\n  font-size: 20px;\n  font-weight: 500;\n}\n.bonus-wrap .form-box .nnc-wrap strong span[data-v-24ed8750] {\n  font-size: 30px;\n}\n.bonus-wrap .form-box .nnc-wrap p[data-v-24ed8750] {\n  font-size: 14px;\n  color: #ffffff;\n  margin-bottom: 5px;\n}\n.bonus-wrap .form-box .mybonus-wrap[data-v-24ed8750] {\n  border: 1px solid #b2b2b2;\n  border-radius: 5px;\n  padding: 20px 15px 10px 15px;\n  margin-bottom: 20px;\n}\n.bonus-wrap .form-box .mybonus-wrap .linetop-text[data-v-24ed8750] {\n  font-size: 14px;\n  color: #ffffff;\n  margin-bottom: 15px;\n}\n.bonus-wrap .form-box .mybonus-wrap .linetop-text.mybonus-text[data-v-24ed8750] {\n  font-size: 20px;\n}\n.bonus-wrap .form-box .mybonus-wrap hr[data-v-24ed8750] {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\n.bonus-wrap .form-box .mybonus-wrap .linedown-text[data-v-24ed8750] {\n  font-size: 12px;\n  color: #ffffff;\n}\n.bonus-wrap .form-box .btn-right[data-v-24ed8750] {\n  position: absolute;\n  top: 50%;\n  right: 30px;\n  -webkit-transform: translateY(-50%);\n  -moz-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  -o-transform: translateY(-50%);\n  transform: translateY(-50%);\n}\n.bonus-wrap .form-box .btn-right .status-text[data-v-24ed8750] {\n  font-size: 18px;\n  color: #ffffff;\n  text-align: center;\n  margin-bottom: 30px;\n}\n.bonus-wrap .page .page-previous[data-v-24ed8750],\n.bonus-wrap .page .page-next[data-v-24ed8750] {\n  background: #55637b;\n  cursor: pointer;\n}\n.bonus-wrap .page .page-previous.notallow[data-v-24ed8750],\n.bonus-wrap .page .page-next.notallow[data-v-24ed8750] {\n  background: #33393d;\n  cursor: not-allowed;\n}\n",""])}});