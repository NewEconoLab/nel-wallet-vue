webpackJsonp([8],{"6M52":function(t,e,n){"use strict";function i(t){n("7H1e")}Object.defineProperty(e,"__esModule",{value:!0});var s=n("DaUf"),a=n.n(s),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"bonus-wrap"},[i("div",{staticClass:"title"},[i("span",[t._v(t._s(t.$t("bonus.title")))])]),t._v(" "),t._l(t.historyList,function(e,n){return i("div",{key:n,staticClass:"form-box"},[i("div",{staticClass:"mybonus"},[t._v("\n        "+t._s(t.$t("bonus.mydividend"))),i("span",{staticClass:"dde"},[t._v(t._s(e.addrBonus))]),t._v(" CGAS\n       ")]),t._v(" "),i("div",[t._v(t._s(t.$t("bonus.distribution"))+t._s(e.totalValue)+" CGas")]),t._v(" "),i("div",[t._v(t._s(t.$t("bonus.mytotal"))+t._s(e.balance)+" NNC")]),t._v(" "),i("div",[t._v(t._s(t.$t("bonus.snapshot"))+" "+t._s(e.blocktime))])])}),t._v(" "),i("div",{staticClass:"page-msg"},[t._v(t._s(t.pageMsg))]),t._v(" "),t.isPage?i("div",{staticClass:"page"},[i("div",{staticClass:"page-previous",on:{click:t.previous}},[i("img",{attrs:{src:n("tt5S"),alt:""}})]),t._v(" "),i("div",{staticStyle:{width:"1px"}}),t._v(" "),i("div",{staticClass:"page-next",on:{click:t.next}},[i("img",{attrs:{src:n("pp3u"),alt:""}})])]):t._e()],2)},r=[],c={render:o,staticRenderFns:r},l=c,u=n("VU/8"),p=i,f=u(a.a,l,!1,p,"data-v-7ed451c7",null);e.default=f.exports},"7H1e":function(t,e,n){var i=n("II2K");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("b3b3b0de",i,!0)},DaUf:function(t,e,n){"use strict";var i=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}}(),s=this&&this.__decorate||function(t,e,n,i){var s,a=arguments.length,o=a<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,n,i);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(o=(a<3?s(o):a>3?s(e,n,o):s(e,n))||o);return a>3&&o&&Object.defineProperty(e,n,o),o},a=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},o=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))(function(s,a){function o(t){try{c(i.next(t))}catch(t){a(t)}}function r(t){try{c(i.throw(t))}catch(t){a(t)}}function c(t){t.done?s(t.value):new n(function(e){e(t.value)}).then(o,r)}c((i=i.apply(t,e||[])).next())})},r=this&&this.__generator||function(t,e){function n(t){return function(e){return i([t,e])}}function i(n){if(s)throw new TypeError("Generator is already executing.");for(;c;)try{if(s=1,a&&(o=a[2&n[0]?"return":n[0]?"throw":"next"])&&!(o=o.call(a,n[1])).done)return o;switch(a=0,o&&(n=[0,o.value]),n[0]){case 0:case 1:o=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,a=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(o=c.trys,!(o=o.length>0&&o[o.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!o||n[1]>o[0]&&n[1]<o[3])){c.label=n[1];break}if(6===n[0]&&c.label<o[1]){c.label=o[1],o=n;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(n);break}o[2]&&c.ops.pop(),c.trys.pop();continue}n=e.call(t,c)}catch(t){n=[6,t],a=0}finally{s=o=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var s,a,o,r,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return r={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r};Object.defineProperty(e,"__esModule",{value:!0});var c=n("/5sW"),l=n("EOM2"),u=n("VKSY"),p=n("6nHw"),f=function(t){function e(){var e=t.call(this)||this;return e.firstLoad=!0,e.currentAddress=p.LoginInfo.getCurrentAddress(),e.historyList=null,e.isPage=!1,e.pageMsg="",e.initHistory(e.currentAddress,e.firstLoad),e}return i(e,t),e.prototype.initHistory=function(t,e){return o(this,void 0,void 0,function(){var n,i,s,a,o,c,l;return r(this,function(r){switch(r.label){case 0:return n=null,e?[3,2]:[4,u.tools.wwwtool.getbonushistbyaddress(t,this.pageUtil.currentPage,this.pageUtil.pageSize)];case 1:return n=r.sent(),[3,4];case 2:return[4,u.tools.wwwtool.getbonushistbyaddress(t,1,5)];case 3:n=r.sent(),n&&(this.pageUtil=new p.PageUtil(n.count,5),this.firstLoad=!1),r.label=4;case 4:if(i=n.list,i.length){for(s in i)i[s].blocktime=u.tools.timetool.getTime(i[s].blocktime?i[s].blocktime:"0");this.historyList=i,a=n.count,this.isPage=!0,a>this.pageUtil.pageSize?this.isPage=!0:this.isPage=!1,o=this.pageUtil.currentPage*this.pageUtil.pageSize-this.pageUtil.pageSize,c=this.pageUtil.totalCount,l=c-o,l>this.pageUtil.pageSize&&(c=this.pageUtil.currentPage*this.pageUtil.pageSize),this.pageMsg="History "+(o+1)+" to "+c+" of "+this.pageUtil.totalCount}return[2]}})})},e.prototype.next=function(){this.pageUtil.currentPage==this.pageUtil.totalPage?this.pageUtil.currentPage=this.pageUtil.totalPage:(this.pageUtil.currentPage+=1,this.initHistory(this.currentAddress,this.firstLoad))},e.prototype.previous=function(){this.pageUtil.currentPage<=1?this.pageUtil.currentPage=1:(this.pageUtil.currentPage-=1,this.initHistory(this.currentAddress,this.firstLoad))},e=s([l.Component({components:{}}),a("design:paramtypes",[])],e)}(c.default);e.default=f},II2K:function(t,e,n){e=t.exports=n("FZ+f")(!1),e.push([t.i,"\n.bonus-wrap .dde[data-v-7ed451c7] {\n  color: #2dde4f;\n}\n.bonus-wrap .form-box[data-v-7ed451c7] {\n  background: #454f60;\n  border-radius: 5px;\n  padding: 20px 50px;\n  margin-bottom: 20px;\n  color: #ffffff;\n}\n.bonus-wrap .form-box div[data-v-7ed451c7] {\n  margin-bottom: 10px;\n  font-size: 14px;\n}\n.bonus-wrap .form-box div[data-v-7ed451c7]:last-child {\n  margin-bottom: 0;\n}\n.bonus-wrap .form-box .mybonus[data-v-7ed451c7] {\n  font-size: 20px;\n}\n.bonus-wrap .page .page-previous[data-v-7ed451c7],\n.bonus-wrap .page .page-next[data-v-7ed451c7] {\n  background: #55637b;\n}\n",""])}});