webpackJsonp([13],{NXVv:function(t,n,e){"use strict";var a=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])};return function(n,e){function a(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(a.prototype=e.prototype,new a)}}(),i=this&&this.__decorate||function(t,n,e,a){var i,o=arguments.length,s=o<3?n:null===a?a=Object.getOwnPropertyDescriptor(n,e):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,n,e,a);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(s=(o<3?i(s):o>3?i(n,e,s):i(n,e))||s);return o>3&&s&&Object.defineProperty(n,e,s),s},o=this&&this.__metadata||function(t,n){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,n)},s=this&&this.__awaiter||function(t,n,e,a){return new(e||(e=Promise))(function(i,o){function s(t){try{l(a.next(t))}catch(t){o(t)}}function r(t){try{l(a.throw(t))}catch(t){o(t)}}function l(t){t.done?i(t.value):new e(function(n){n(t.value)}).then(s,r)}l((a=a.apply(t,n||[])).next())})},r=this&&this.__generator||function(t,n){function e(t){return function(n){return a([t,n])}}function a(e){if(i)throw new TypeError("Generator is already executing.");for(;l;)try{if(i=1,o&&(s=2&e[0]?o.return:e[0]?o.throw||((s=o.return)&&s.call(o),0):o.next)&&!(s=s.call(o,e[1])).done)return s;switch(o=0,s&&(e=[2&e[0],s.value]),e[0]){case 0:case 1:s=e;break;case 4:return l.label++,{value:e[1],done:!1};case 5:l.label++,o=e[1],e=[0];continue;case 7:e=l.ops.pop(),l.trys.pop();continue;default:if(s=l.trys,!(s=s.length>0&&s[s.length-1])&&(6===e[0]||2===e[0])){l=0;continue}if(3===e[0]&&(!s||e[1]>s[0]&&e[1]<s[3])){l.label=e[1];break}if(6===e[0]&&l.label<s[1]){l.label=s[1],s=e;break}if(s&&l.label<s[2]){l.label=s[2],l.ops.push(e);break}s[2]&&l.ops.pop(),l.trys.pop();continue}e=n.call(t,l)}catch(t){e=[6,t],o=0}finally{i=s=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}var i,o,s,r,l={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return r={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r};Object.defineProperty(n,"__esModule",{value:!0});var l=e("/5sW"),d=e("443i"),c=e("VKSY"),p=e("6nHw"),m=e("5LD5"),u=e("XfB5"),h=function(t){function n(){var n=t.call(this)||this;return n.currentAddress="",n.inputSalePage="",n.inputMyneoPage="",n.isUnSaleBox=!1,n.unSaleDomain="",n.onUnSaleState=0,n.sellStatus="all",n.onInputMyneoPageChange=function(t){var e=parseInt(""+t.target.value,10);return(!t.target.value||!isNaN(t.target.value))&&(e<=0?(n.inputMyneoPage="",!1):!(e>n.myDomainListPage.totalPage)&&(n.inputMyneoPage=t.target.value,!0))},n.onInputSalePageChange=function(t){var e=parseInt(""+t.target.value,10);return(!t.target.value||!isNaN(t.target.value))&&(e<=0?(n.inputSalePage="",!1):!(e>n.salePage.totalPage)&&(n.inputSalePage=t.target.value,!0))},n.isShowEdit=!1,n.currentAddress=p.LoginInfo.getCurrentAddress(),n.neonameList=null,n.showMydomainList=null,n.set_contract="0x6e2aea28af9c5febea0774759b1b76398e3167f1",n.domainEdit=new m.sessionStoreTool("domain-edit"),n.renewalWatting=!1,n.resolverAddress="",n.mappingState=0,n.resolverState=0,n.mappingistrue=!1,n.currentdomain="",n.ownerState=3,n.ownerAddress="",n.alertMessage="",n.alertShow=!1,n.openToast=null,n.isShowSaleBox=!1,n.domainSalePrice="",n.isOKSale=!1,n.onSaleState=0,n.saleOutDomainList=[],n.salePage=new p.PageUtil(0,5),n.myDomainListPage=new p.PageUtil(0,5),n}return a(n,t),n.prototype.mounted=function(){c.tools.nnstool.initRootDomain("neo"),this.getAllNeoName(this.currentAddress),p.TaskFunction.domainResovle=this.resolverTask,p.TaskFunction.domainMapping=this.mappingTask,p.TaskFunction.domainRenewal=this.renewalTask,p.TaskFunction.domainTransfer=this.domainTransferTask,p.TaskFunction.domainSale=this.domainSaleTask,p.TaskFunction.domainUnSale=this.domainUnSaleTask,this.openToast=this.$refs.toast.isShow,this.getSaleDomainList(this.currentAddress,!0,this.salePage)},n.prototype.domainUnSaleTask=function(t){t==this.currentdomain&&(this.onUnSaleState=0),this.getAllNeoName(this.currentAddress)},n.prototype.domainSaleTask=function(t){t==this.currentdomain&&(this.onSaleState=0),this.getAllNeoName(this.currentAddress)},n.prototype.domainTransferTask=function(t){t==this.currentdomain&&(this.ownerTransfer=!1),this.getAllNeoName(this.currentAddress)},n.prototype.verifyMapping=function(){if(!this.resolverAddress)return void(this.mappingistrue=!1);var t=c.tools.neotool.verifyAddress(this.resolverAddress);this.mappingistrue=t},n.prototype.verifySetOwner=function(t){var n=this.domainEdit.select(t);if(n&&n.domain_transfer&&"watting"===n.domain_transfer)this.ownerState=2;else{var e=c.tools.neotool.verifyAddress(this.ownerAddress);this.ownerState=e?1:3}},n.prototype.getAllNeoName=function(t){return s(this,void 0,void 0,function(){var n,e,a,i,o,s,l,d,p;return r(this,function(r){switch(r.label){case 0:return[4,c.tools.wwwtool.getnnsinfo(t,".neo")];case 1:if(n=r.sent(),!(e=n)||!e.length)return[3,11];a=[];for(i in e)a.push(i);o=0,r.label=2;case 2:return o<a.length?(s=a[o],[4,this.checkExpiration(e[s])]):[3,10];case 3:return l=r.sent(),l?[3,5]:[4,this.checkExpirationSoon(e[s])];case 4:return d=r.sent(),e[s].expired=l,e[s].expiring=d,[3,6];case 5:e[s].expiring=!1,e[s].expired=!0,r.label=6;case 6:return e[s].resolver?[4,c.tools.nnstool.resolveData(e[s].domain)]:[3,8];case 7:p=r.sent(),e[s].resolverAddress=p,r.label=8;case 8:e[s].ttl=c.tools.timetool.getTime(n[s].ttl),r.label=9;case 9:return o++,[3,2];case 10:this.neonameList=e,this.myDomainListPage.totalCount=e.length,this.showMydomainList=this.mydomainListByPage(e),r.label=11;case 11:return[2]}})})},n.prototype.checkExpiration=function(t){var n=(new Date).getTime();return!(new Neo.BigInteger(n).compareTo(new Neo.BigInteger(t.ttl).multiply(1e3))<0)},n.prototype.checkExpirationSoon=function(t){var n=(new Date).getTime();return!(new Neo.BigInteger(t.ttl).multiply(1e3).subtract(new Neo.BigInteger(n)).compareTo(7776e6)<0)},n.prototype.resetresolve=function(){this.resolverState=0,this.resolverAddress="",this.mappingState=0,this.mappingistrue=!1},n.prototype.resetmappingData=function(){this.resolverAddress="",this.mappingState=0},n.prototype.onShowEdit=function(t){this.domainInfo=t,this.resolverAddress=t.resolverAddress,this.mappingistrue=c.tools.neotool.verifyAddress(this.resolverAddress),this.mappingState=this.domainInfo.resolverAddress?1:0,this.resolverState=this.domainInfo.resolver?1:0,this.renewalWatting=!1,this.isShowEdit=!this.isShowEdit,this.currentdomain=t.domain,this.verifySetOwner(this.currentdomain);var n=this.domainEdit.select(t.domain);n&&(n.resolver&&"watting"===n.resolver&&(this.resolverState=2),n.mapping&&n.mapping.state&&"watting"===n.mapping.state&&(this.mappingState=2,this.resolverAddress=n.mapping.address),n.renewal&&"watting"===n.renewal&&(this.renewalWatting=!0),n.owner&&"watting"===n.owner&&(this.renewalWatting=!0),n.unsale&&"watting"===n.unsale&&(this.onUnSaleState=1))},n.prototype.showTranferDomain=function(t){this.domainInfo=t,this.ownerAddress="",this.ownerState=3,this.alertShow=!0},n.prototype.closeTranferDomain=function(){this.ownerAddress="",this.alertShow=!1},n.prototype.setowner=function(){return s(this,void 0,void 0,function(){var t,n,e,a;return r(this,function(i){switch(i.label){case 0:this.openToast=this.$refs.toast.isShow,t=this.ownerState,i.label=1;case 1:return i.trys.push([1,5,,6]),""==this.resolverAddress||0==this.mappingState?[3,3]:(this.resetmappingData(),[4,this.mappingData()]);case 2:i.sent(),i.label=3;case 3:return p.LoginInfo.info=null,this.ownerState=2,[4,c.tools.nnstool.setOwner(this.domainInfo.domain,this.ownerAddress)];case 4:if(n=i.sent(),n.err)throw this.ownerState=t,this.openToast("error",""+this.$t("errormsg.interface"),3e3),new Error("Transaction send failed");return e=n.info,u.TaskManager.addTask(new p.Task(p.ConfirmType.contract,e,{domain:this.domainInfo.domain,address:this.ownerAddress}),p.TaskType.domainTransfer),this.domainEdit.put(this.domainInfo.domain,"watting","domain_transfer"),this.closeTranferDomain(),this.openToast("success",""+this.$t("myneoname.waitmsg2"),5e3),[3,6];case 5:return a=i.sent(),this.ownerState=t,this.closeTranferDomain(),[3,6];case 6:return[2]}})})},n.prototype.setresolve=function(){return s(this,void 0,void 0,function(){var t,n,e,a,i;return r(this,function(o){switch(o.label){case 0:t=this.resolverState,o.label=1;case 1:return o.trys.push([1,3,,4]),this.resolverState=2,n=this.set_contract.hexToBytes().reverse(),[4,c.tools.nnstool.setResolve(this.domainInfo.domain,n)];case 2:return e=o.sent(),e.err||(a=e.info,u.TaskManager.addTask(new p.Task(p.ConfirmType.contract,a,{domain:this.domainInfo.domain,contract:this.set_contract}),p.TaskType.domainResovle),this.domainEdit.put(this.domainInfo.domain,"watting","resolver")),[3,4];case 3:return i=o.sent(),this.resolverState=t,[3,4];case 4:return[2]}})})},n.prototype.mappingData=function(){return s(this,void 0,void 0,function(){var t,n,e,a;return r(this,function(i){switch(i.label){case 0:t=this.mappingState,i.label=1;case 1:return i.trys.push([1,3,,4]),this.mappingState=2,[4,c.tools.nnstool.setResolveData(this.domainInfo.domain,this.resolverAddress,this.domainInfo.resolver)];case 2:if(n=i.sent(),n.err)throw this.mappingState=t,new Error("Transaction send failed");return e=n.info,u.TaskManager.addTask(new p.Task(p.ConfirmType.contract,e,{domain:this.domainInfo.domain,address:this.resolverAddress}),p.TaskType.domainMapping),this.domainEdit.put(this.domainInfo.domain,{state:"watting",address:this.resolverAddress},"mapping"),[3,4];case 3:throw a=i.sent(),this.mappingState=t,a;case 4:return[2]}})})},n.prototype.renewalDomain=function(){return s(this,void 0,void 0,function(){var t,n,e,a;return r(this,function(i){switch(i.label){case 0:return[4,c.tools.nnstool.getRootInfo("neo")];case 1:return t=i.sent(),n=this.domainInfo.domain,[4,c.tools.nnssell.renewDomain(n,t.register)];case 2:return e=i.sent(),e.err||(this.renewalWatting=!0,a=e.info,u.TaskManager.addTask(new p.Task(p.ConfirmType.contract,a,{domain:n}),p.TaskType.domainRenewal),this.domainEdit.put(this.domainInfo.domain,"watting","renewal")),[2]}})})},n.prototype.renewalTask=function(t){t==this.currentdomain&&(this.renewalWatting=!1),this.getAllNeoName(this.currentAddress)},n.prototype.mappingTask=function(t,n){this.getAllNeoName(this.currentAddress),this.currentdomain==t&&(this.mappingState=1,n&&(this.resolverAddress=n))},n.prototype.resolverTask=function(t){this.currentdomain==t&&(this.resolverState=1),this.getAllNeoName(this.currentAddress)},n.prototype.selectSellDomain=function(){var t=this;if(this.myDomainListPage.currentPage=1,"all"==this.sellStatus)this.myDomainListPage.totalCount=this.neonameList.length,this.showMydomainList=this.mydomainListByPage(this.neonameList);else if("0901"==this.sellStatus){var n=[];Object.keys(this.neonameList).filter(function(e){return"0901"==t.neonameList[e].state&&(n.push(t.neonameList[e]),!0)}),this.myDomainListPage.totalCount=n.length,this.showMydomainList=this.mydomainListByPage(n)}else{var e=[];Object.keys(this.neonameList).filter(function(n){return"0901"!=t.neonameList[n].state&&(e.push(t.neonameList[n]),!0)}),this.myDomainListPage.totalCount=e.length,this.showMydomainList=this.mydomainListByPage(e)}},n.prototype.mydomainListByPage=function(t){var n=this.myDomainListPage.pageSize*(this.myDomainListPage.currentPage-1);return t.slice().slice(n,n+this.myDomainListPage.pageSize)},n.prototype.myDomainPrevious=function(){this.myDomainListPage.currentPage-1<=0||(this.myDomainListPage.currentPage--,this.showMydomainList=this.mydomainListByPage(this.neonameList))},n.prototype.myDomainNext=function(){this.myDomainListPage.currentPage+1>this.myDomainListPage.totalPage||(this.myDomainListPage.currentPage++,this.showMydomainList=this.mydomainListByPage(this.neonameList))},n.prototype.goMyneoPage=function(){""!=this.inputMyneoPage&&"0"!=this.inputMyneoPage&&this.pageToMyneo(this.inputMyneoPage)},n.prototype.pageToMyneo=function(t){var n=parseInt(""+t,10);n<0||n>this.myDomainListPage.totalPage||n!=this.myDomainListPage.currentPage&&(this.myDomainListPage.currentPage=n,this.showMydomainList=this.mydomainListByPage(this.neonameList))},n.prototype.onInputMyneoKeyDown=function(t){13===t.keyCode&&this.pageToMyneo(this.inputMyneoPage)},n.prototype.onShowSaleDialog=function(t){this.domainInfo=t,this.isShowSaleBox=!this.isShowSaleBox,this.currentdomain=t.domain;var n=this.domainEdit.select(t.domain);this.domainSalePrice="",n?n.sale&&"watting"===n.sale&&(this.onSaleState=1):this.onSaleState=0},n.prototype.closeSaleDialog=function(){this.domainSalePrice="",this.isShowSaleBox=!this.isShowSaleBox},n.prototype.verifySalePrice=function(){return parseFloat(this.domainSalePrice)<=0||""==this.domainSalePrice?(this.isOKSale=!1,!1):/\./.test(this.domainSalePrice)&&this.domainSalePrice.split(".")[1].length>1?(this.domainSalePrice=this.domainSalePrice.substr(0,this.domainSalePrice.toString().indexOf(".")+2),!1):void(this.isOKSale=!0)},n.prototype.toSaleDomain=function(){return s(this,void 0,void 0,function(){var t,n,e;return r(this,function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,c.tools.nnstool.saleDomain(this.domainInfo.domain,this.domainSalePrice)];case 1:return t=a.sent(),t.err||(n=t.info,u.TaskManager.addTask(new p.Task(p.ConfirmType.contract,n,{domain:this.domainInfo.domain,amount:this.domainSalePrice}),p.TaskType.saleDomain),this.domainEdit.put(this.domainInfo.domain,"watting","sale"),this.closeSaleDialog(),this.openToast("success",""+this.$t("myneoname.waitmsg3"),5e3)),[3,3];case 2:return e=a.sent(),[3,3];case 3:return[2]}})})},n.prototype.toUnSellDomain=function(){return s(this,void 0,void 0,function(){var t,n,e;return r(this,function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,c.tools.nnstool.unSaleDomain(this.domainInfo.domain)];case 1:return t=a.sent(),t.err||(n=t.info,u.TaskManager.addTask(new p.Task(p.ConfirmType.contract,n,{domain:this.domainInfo.domain}),p.TaskType.unSaleDomain),this.domainEdit.put(this.domainInfo.domain,"watting","unsale"),this.closeUnSaleDialog(),this.openToast("success",""+this.$t("myneoname.waitmsg4"),5e3)),[3,3];case 2:return e=a.sent(),[3,3];case 3:return[2]}})})},n.prototype.onShowUnSaleDialog=function(t){this.domainInfo=t,this.isUnSaleBox=!this.isUnSaleBox,this.currentdomain=t.domain},n.prototype.closeUnSaleDialog=function(){this.isUnSaleBox=!this.isUnSaleBox,this.onUnSaleState=1},n.prototype.getSaleDomainList=function(t,n,e){return s(this,void 0,void 0,function(){var t;return r(this,function(a){switch(a.label){case 0:return t=null,n?[4,c.tools.wwwtool.getHasBuyListByAddress("ASBhJFN3XiDu38EdEQyMY3N2XwGh1gd5WW","test",1,1)]:[3,2];case 1:return t=a.sent(),[3,4];case 2:return[4,c.tools.wwwtool.getHasBuyListByAddress("ASBhJFN3XiDu38EdEQyMY3N2XwGh1gd5WW","test",e.currentPage,e.pageSize)];case 3:t=a.sent(),a.label=4;case 4:return t?(n&&(this.salePage=new p.PageUtil(t[0].count,1)),this.saleOutDomainList=t[0].list.map(function(t){return{blockindex:t.blockindex,fullDomain:t.fullDomain,price:t.price,blocktime:c.tools.timetool.getTime(t.blocktime)}})):this.salePage=new p.PageUtil(0,0),[2]}})})},n.prototype.mySaleDomainPrevious=function(){this.salePage.currentPage-1<=0||(this.salePage.currentPage--,this.getSaleDomainList(this.currentAddress,!1,this.salePage))},n.prototype.mySaleDomainNext=function(){this.salePage.currentPage+1>this.salePage.totalPage||(this.salePage.currentPage++,this.getSaleDomainList(this.currentAddress,!1,this.salePage))},n.prototype.goSalePage=function(){""!=this.inputSalePage&&"0"!=this.inputSalePage&&this.pageTo(this.inputSalePage)},n.prototype.pageTo=function(t){var n=parseInt(""+t,10);n<0||n>this.salePage.totalPage||n!=this.salePage.currentPage&&(this.salePage.currentPage=n,this.getSaleDomainList(this.currentAddress,!1,this.salePage))},n.prototype.onInputSaleKeyDown=function(t){13===t.keyCode&&this.pageTo(this.inputSalePage)},n=i([d.Component({components:{}}),o("design:paramtypes",[])],n)}(l.default);n.default=h},PzDt:function(t,n,e){var a=e("mnFd");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("rjj0")("7a1b6bf6",a,!0,{})},il4B:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"myneo-box"},[a("div",{staticClass:"title"},[a("span",[t._v(t._s(t.$t("myneoname.title")))])]),t._v(" "),t._l(t.showMydomainList,function(n,e){return t.neonameList?a("div",{key:e,staticClass:"form-box"},[a("div",{staticClass:"neoname"},[t._v("\n            "+t._s(n.domain)+"\n        ")]),t._v(" "),a("div",{staticClass:"addr-resolver"},[t._v("( "+t._s(t.$t("myneoname.resolver"))+": "+t._s(n.resolver?n.resolver:t.$t("myneoname.notconfigure"))+" )")]),t._v(" "),a("div",{staticClass:"addr-mapping"},[t._v("( "+t._s(t.$t("myneoname.mapping"))+": "+t._s(n.resolverAddress?n.resolverAddress:t.$t("myneoname.notconfigure"))+" )")]),t._v(" "),n.expired?t._e():a("div",{staticClass:"time-msg"},[t._v("( "+t._s(t.$t("myneoname.time"))+": "+t._s(n.ttl)+" "),n.expiring?t._e():a("span",{staticClass:"ff6"},[t._v(t._s(t.$t("myneoname.expiring")))]),t._v(" )")]),t._v(" "),n.expired?a("div",{staticClass:"time-msg"},[t._v("( "+t._s(t.$t("myneoname.time"))+":  "),a("span",{staticClass:"ff6"},[t._v(t._s(t.$t("myneoname.expired")))]),t._v(" )")]):t._e(),t._v(" "),n.expired?t._e():a("div",{staticClass:"btn-right"},[a("button",{staticClass:"btn btn-nel btn-bid",on:{click:function(e){t.onShowEdit(n)}}},[t._v(t._s(t.$t("btn.edit")))]),t._v(" "),2===t.verifySetOwner(n.domain)?a("button",{staticClass:"btn btn-nel btn-bid",attrs:{disabled:"true"}},[t._v(t._s(t.$t("myneoname.transferring")))]):a("button",{staticClass:"btn btn-nel btn-bid",on:{click:function(e){t.showTranferDomain(n)}}},[t._v(t._s(t.$t("myneoname.transfer")))])])]):t._e()}),t._v(" "),a("div",{staticClass:"mydomain-page"},[a("div",{staticClass:"page-msg"},[t._v("第"+t._s(t.myDomainListPage.currentPage)+"页，共"+t._s(t.myDomainListPage.totalPage)+"页")]),t._v(" "),a("div",{staticClass:"page"},[a("div",{staticClass:"page-previous",class:{notallow:1==t.myDomainListPage.currentPage},on:{click:t.myDomainPrevious}},[a("img",{attrs:{src:e("tt5S"),alt:""}})]),t._v(" "),a("div",{staticStyle:{width:"1px"}}),t._v(" "),a("div",{staticClass:"page-next",class:{notallow:t.myDomainListPage.currentPage==t.myDomainListPage.totalPage},on:{click:t.myDomainNext}},[a("img",{attrs:{src:e("pp3u"),alt:""}})]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.inputMyneoPage,expression:"inputMyneoPage"}],staticClass:"input-wrapper",attrs:{type:"text"},domProps:{value:t.inputMyneoPage},on:{input:[function(n){n.target.composing||(t.inputMyneoPage=n.target.value)},t.onInputMyneoPageChange],keydown:t.onInputMyneoKeyDown}}),t._v(" "),a("div",{staticClass:"gopage",on:{click:t.goMyneoPage}},[t._v("Go")])])]),t._v(" "),a("v-toast",{ref:"toast"}),t._v(" "),t.isShowEdit?a("div",{staticClass:"edit-wrap"},[a("div",{staticClass:"edit-box"},[a("div",{staticClass:"edit-title"},[t._v(t._s(t.$t("myneoname.edittitle")))]),t._v(" "),a("div",{staticClass:"edit-tips"},[t._v(t._s(t.$t("myneoname.tips")))]),t._v(" "),a("div",{staticClass:"edit-content"},[a("div",{staticClass:"edit-name"},[t._v(t._s(t.$t("myneoname.neoname"))+": "+t._s(t.domainInfo.domain))]),t._v(" "),a("div",{staticClass:"edit-input"},[a("div",{staticClass:"input-msg"},[t._v("\n                    "+t._s(t.$t("myneoname.resolver"))+":\n                    "),1==t.resolverState?a("button",{staticClass:"btn btn-nel btn-input-reset",on:{click:t.resetresolve}},[t._v(t._s(t.$t("btn.reset")))]):t._e()]),t._v(" "),a("div",{staticClass:"input-box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.set_contract,expression:"set_contract"}],staticClass:"readonly-input",attrs:{type:"text",readonly:"readonly",autocomplete:"off"},domProps:{value:t.set_contract},on:{input:function(n){n.target.composing||(t.set_contract=n.target.value)}}}),t._v(" "),0==t.resolverState?a("button",{staticClass:"btn btn-nel btn-big",on:{click:t.setresolve}},[t._v(t._s(t.$t("btn.confirm")))]):t._e(),t._v(" "),2==t.resolverState?a("button",{staticClass:"btn btn-nel btn-big btn-disable",attrs:{disabled:""}},[t._v(t._s(t.$t("btn.confirming")))]):t._e(),t._v(" "),1==t.resolverState?a("div",{staticClass:"ok-img"},[a("img",{attrs:{src:e("wtuE"),alt:""}})]):t._e()])]),t._v(" "),a("div",{staticClass:"edit-input"},[a("div",{staticClass:"input-msg"},[t._v("\n                    "+t._s(t.$t("myneoname.mapping"))+":\n                    "),1==t.mappingState?a("button",{staticClass:"btn btn-nel btn-input-reset",on:{click:t.resetmappingData}},[t._v(t._s(t.$t("btn.reset")))]):t._e()]),t._v(" "),a("div",{staticClass:"input-box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.resolverAddress,expression:"resolverAddress"}],attrs:{type:"text",autocomplete:"off"},domProps:{value:t.resolverAddress},on:{input:[function(n){n.target.composing||(t.resolverAddress=n.target.value)},t.verifyMapping]}}),t._v(" "),0==t.mappingState?a("button",{staticClass:"btn btn-nel btn-big",class:{"btn-disable":1!=t.resolverState||!t.mappingistrue},attrs:{disabled:1!=t.resolverState||!t.mappingistrue},on:{click:t.mappingData}},[t._v(t._s(t.$t("btn.confirm")))]):t._e(),t._v(" "),2==t.mappingState?a("button",{staticClass:"btn btn-nel btn-big btn-disable",attrs:{disabled:""}},[t._v(t._s(t.$t("btn.confirming")))]):t._e(),t._v(" "),1==t.mappingState?a("div",{staticClass:"ok-img"},[a("img",{attrs:{src:e("wtuE"),alt:""}})]):t._e()])]),t._v(" "),a("div",{staticClass:"edit-input"},[a("div",{staticClass:"input-msg"},[t._v("\n                    "+t._s(t.$t("myneoname.time"))+":\n                ")]),t._v(" "),a("div",{staticClass:"input-box"},[a("input",{staticClass:"readonly-input",attrs:{type:"text",readonly:"readonly"},domProps:{value:t.domainInfo.expired?t.$t("myneoname.expired"):t.domainInfo.ttl}}),t._v(" "),t.domainInfo.expired||t.domainInfo.expiring||t.renewalWatting?t._e():a("button",{staticClass:"btn btn-nel btn-big",on:{click:t.renewalDomain}},[t._v(t._s(t.$t("btn.renewal")))]),t._v(" "),!t.domainInfo.expired&&!t.domainInfo.expiring||t.renewalWatting?t._e():a("button",{staticClass:"btn btn-nel btn-big btn-disable",attrs:{disabled:""}},[t._v(t._s(t.$t("btn.renewal")))]),t._v(" "),t.renewalWatting?a("button",{staticClass:"btn btn-nel btn-big btn-disable",attrs:{disabled:""}},[t._v(t._s(t.$t("btn.renewaling")))]):t._e()])])]),t._v(" "),a("div",{staticClass:"edit-close"},[a("span",{attrs:{"aria-hidden":"true"},on:{click:function(n){t.isShowEdit=!t.isShowEdit}}},[t._v("×")])])])]):t._e(),t._v(" "),t.alertShow?a("div",{staticClass:"alert-wrap",attrs:{id:"alertview-domaintranfer"}},[a("div",{staticClass:"alert-box"},[a("div",{staticClass:"alert-title",attrs:{id:"alert-title"}},[t._v("\n          "+t._s(t.$t("myneoname.domaintransfer"))+"\n        ")]),t._v(" "),a("div",{staticClass:"line-wrap"},[a("div",{staticClass:"line-msg"},[t._v("\n            "+t._s(t.$t("auction.domain")+" : "+t.domainInfo.domain)+"\n          ")]),t._v(" "),a("div",{staticClass:"line-msg"},[t._v("\n          "+t._s(t.$t("myneoname.transferto")+" :")+"\n          ")]),t._v(" "),a("div",{staticClass:"line-box",attrs:{id:"alert-box"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.ownerAddress,expression:"ownerAddress"}],attrs:{id:"alert-input",type:"text",autocomplete:"off"},domProps:{value:t.ownerAddress},on:{input:[function(n){n.target.composing||(t.ownerAddress=n.target.value)},t.verifySetOwner]}}),t._v(" "),1==t.ownerState?a("button",{staticClass:"btn btn-nel btn-big",attrs:{id:"alert-confirm"},on:{click:t.setowner}},[t._v("\n              "+t._s(t.$t("myneoname.transfer"))+"\n            ")]):3==t.ownerState?a("button",{staticClass:"btn btn-nel btn-big",attrs:{id:"alert-confirm",disabled:"true"}},[t._v("\n              "+t._s(t.$t("myneoname.transfer"))+"\n            ")]):t._e()]),t._v(" "),a("div",{staticClass:"err-msg",attrs:{id:"alert-error"}})]),t._v(" "),a("div",{staticClass:"alert-tips"}),t._v(" "),a("div",{staticClass:"alert-close",attrs:{id:"alert-close"},on:{click:function(n){t.alertShow=!1}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])]):t._e(),t._v(" "),t.isShowSaleBox?a("div",{staticClass:"sale-wrapper"},[a("div",{staticClass:"sale-box"},[t._m(0),t._v(" "),a("div",{staticClass:"sale-domain"},[a("span",[t._v("域名 : "+t._s(t.domainInfo.domain))])]),t._v(" "),a("div",{staticClass:"sale-smallbox"},[a("div",{staticClass:"smallbox-label"},[t._v("\n            域名到期时间 :\n          ")]),t._v(" "),a("div",{staticClass:"smallbox-div"},[t._v(t._s(t.domainInfo.ttl))])]),t._v(" "),a("div",{staticClass:"sale-smallbox"},[a("div",{staticClass:"smallbox-label"},[t._v("\n            设置出售价格（NNC） : \n          ")]),t._v(" "),a("div",{staticClass:"smallbox-input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.domainSalePrice,expression:"domainSalePrice"}],staticClass:"sale-input",attrs:{type:"number"},domProps:{value:t.domainSalePrice},on:{input:[function(n){n.target.composing||(t.domainSalePrice=n.target.value)},t.verifySalePrice]}}),t._v(" "),0==t.onSaleState?a("button",{staticClass:"btn btn-nel btn-big",class:{"btn-disable":!t.isOKSale},attrs:{disabled:!t.isOKSale},on:{click:t.toSaleDomain}},[t._v("上架")]):t._e(),t._v(" "),1==t.onSaleState?a("button",{staticClass:"btn btn-nel btn-big btn-disable",attrs:{disabled:""}},[t._v("上架中")]):t._e()])]),t._v(" "),a("div",{staticClass:"sale-close"},[a("span",{attrs:{"aria-hidden":"true"},on:{click:function(n){t.isShowSaleBox=!t.isShowSaleBox}}},[t._v("×")])])])]):t._e(),t._v(" "),t.isUnSaleBox?a("div",{staticClass:"sale-wrapper"},[a("div",{staticClass:"sale-box"},[a("div",{staticClass:"unsale-tips"},[a("span",[t._v('您确定要将 " '+t._s(t.domainInfo.domain)+' " 下架吗？')])]),t._v(" "),a("div",{staticClass:"unsale-btn"},[a("button",{staticClass:"btn btn-nel btn-big",on:{click:t.toUnSellDomain}},[t._v("确定")])]),t._v(" "),a("div",{staticClass:"sale-close"},[a("span",{attrs:{"aria-hidden":"true"},on:{click:function(n){t.isUnSaleBox=!t.isUnSaleBox}}},[t._v("×")])])])]):t._e()],2)},i=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"sale-title"},[e("h4",[t._v("域名出售")]),t._v(" "),e("p",[t._v("注意 : 出售中的域名将会在域名过期后自动下架，请注意对快到期的域名进行下架并续约，以免错失域名。")])])}],o={render:a,staticRenderFns:i};n.a=o},mnFd:function(t,n,e){n=t.exports=e("FZ+f")(!1),n.push([t.i,"\n.myneo-box .ff6[data-v-453d652c] {\n  color: #ff6a6a;\n}\n.myneo-box .title .search-domain[data-v-453d652c] {\n  display: inline-block;\n}\n.myneo-box .title .search-domain .seach-box[data-v-453d652c] {\n  background: none;\n  border: 1px solid #ffffff;\n  border-radius: 5px;\n  display: inline-block;\n  width: 230px;\n  height: 38px;\n  margin-left: 20px;\n  position: relative;\n}\n.myneo-box .title .search-domain .seach-box input[data-v-453d652c] {\n  background: none;\n  text-align: left;\n  width: 210px;\n}\n.myneo-box .title .search-domain .seach-box input[data-v-453d652c]::-webkit-input-placeholder {\n  font-size: 14px;\n  color: #b2b2b2;\n  line-height: 14px;\n}\n.myneo-box .title .search-domain .seach-box img[data-v-453d652c] {\n  width: 24px;\n  height: 24px;\n  position: absolute;\n  top: 6px;\n  right: 6px;\n}\n.myneo-box .title .search-domain .select-box[data-v-453d652c] {\n  margin-left: 20px;\n  display: inline-block;\n}\n.myneo-box .title .search-domain .select-box label[data-v-453d652c] {\n  margin-right: 10px;\n}\n.myneo-box .title .search-domain .select-box select[data-v-453d652c] {\n  width: 80px;\n  display: inline-block;\n}\n.myneo-box .btn[data-v-453d652c] {\n  margin-bottom: 20px;\n}\n.myneo-box .btn[data-v-453d652c]:last-child {\n  margin-bottom: 0;\n}\n.myneo-box .btn.btn-disable[data-v-453d652c] {\n  background: #77bcf6;\n  opacity: 1;\n}\n.myneo-box .btn-bid[data-v-453d652c] {\n  display: block;\n  padding: 0;\n  font-size: 18px;\n  width: 110px;\n  height: 38px;\n}\n.myneo-box .mydomain-tips[data-v-453d652c] {\n  font-size: 14px;\n  color: #c5c5c5;\n  padding: 0 20px 20px 20px;\n}\n.myneo-box .form-box[data-v-453d652c] {\n  background: #454f60;\n  border-radius: 5px;\n  padding: 20px 50px 10px 50px;\n  font-size: 14px;\n  margin-bottom: 20px;\n  position: relative;\n}\n.myneo-box .form-box .nnc-wrap[data-v-453d652c] {\n  padding: 15px 0;\n}\n.myneo-box .form-box .nnc-wrap strong[data-v-453d652c] {\n  font-size: 20px;\n  font-weight: 500;\n}\n.myneo-box .form-box .nnc-wrap strong span[data-v-453d652c] {\n  font-size: 30px;\n}\n.myneo-box .form-box .nnc-wrap p[data-v-453d652c] {\n  font-size: 14px;\n  color: #c5c5c5;\n  margin-top: 20px;\n}\n.myneo-box .form-box .neoname[data-v-453d652c] {\n  font-size: 16px;\n  margin-top: 25px;\n}\n.myneo-box .form-box .neoname[data-v-453d652c],\n.myneo-box .form-box .addr-resolver[data-v-453d652c],\n.myneo-box .form-box .addr-mapping[data-v-453d652c] {\n  margin-bottom: 10px;\n}\n.myneo-box .form-box .time-msg[data-v-453d652c] {\n  margin-bottom: 45px;\n}\n.myneo-box .form-box .btn-right[data-v-453d652c] {\n  position: absolute;\n  top: 50%;\n  right: 30px;\n  -webkit-transform: translateY(-50%);\n  -moz-transform: translateY(-50%);\n  -ms-transform: translateY(-50%);\n  -o-transform: translateY(-50%);\n  transform: translateY(-50%);\n}\n.myneo-box .form-box .btn-right .status-text[data-v-453d652c] {\n  font-size: 18px;\n  color: #ffffff;\n  text-align: center;\n  margin-bottom: 30px;\n}\n.myneo-box .form-box .sale-list-wraper[data-v-453d652c] {\n  padding: 10px;\n}\n.myneo-box .form-box .sale-list-wraper .sale-content[data-v-453d652c] {\n  border: 1px solid #b2b2b2;\n  border-radius: 5px;\n  padding: 15px 15px 10px 15px;\n  margin-bottom: 20px;\n}\n.myneo-box .form-box .sale-list-wraper .sale-content[data-v-453d652c]:last-child {\n  margin-bottom: 0;\n}\n.myneo-box .form-box .sale-list-wraper .sale-content .sale-domainname[data-v-453d652c] {\n  font-size: 20px;\n  font-weight: 500;\n  border-bottom: 1px solid #f2f2f2;\n  padding-bottom: 15px;\n}\n.myneo-box .form-box .sale-list-wraper .sale-content p[data-v-453d652c] {\n  font-size: 12px;\n  margin-top: 10px;\n  color: #fff;\n  margin-bottom: 0;\n}\n.myneo-box .form-box .sale-list-wraper .sale-content p .sale-time[data-v-453d652c] {\n  margin-right: 30px;\n}\n.myneo-box .page .page-previous[data-v-453d652c],\n.myneo-box .page .page-next[data-v-453d652c] {\n  background: #55637b;\n  cursor: pointer;\n}\n.myneo-box .page .page-previous.notallow[data-v-453d652c],\n.myneo-box .page .page-next.notallow[data-v-453d652c] {\n  background: #33393d;\n  cursor: not-allowed;\n}\n.myneo-box .page .input-wrapper[data-v-453d652c] {\n  width: 50px;\n  background: #ffffff;\n  border-radius: 5px;\n  margin-left: 10px;\n  margin-right: 10px;\n  padding: 5px;\n  height: 38px;\n  color: #333;\n  font-size: 16px;\n}\n.myneo-box .page .gopage[data-v-453d652c] {\n  width: 50px;\n  height: 38px;\n  line-height: 38px;\n  font-size: 16px;\n  color: #ffffff;\n  text-align: center;\n  background: #55637b;\n  border-radius: 5px;\n  cursor: pointer;\n}\n.myneo-box .page .gopage.donot[data-v-453d652c] {\n  background: #33393d;\n  cursor: not-allowed;\n}\n.myneo-box .edit-wrap[data-v-453d652c] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  height: 100%;\n  z-index: 1030;\n}\n.myneo-box .edit-wrap .edit-box[data-v-453d652c] {\n  background: #454f60;\n  padding: 30px 50px 50px 50px;\n  width: 80%;\n  color: #fff;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -moz-transform: translate(-50%, -50%);\n  -webkit-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  border-radius: 5px;\n  font-size: 16px;\n}\n.myneo-box .edit-wrap .edit-box .edit-title[data-v-453d652c] {\n  font-size: 20px;\n}\n.myneo-box .edit-wrap .edit-box .edit-tips[data-v-453d652c] {\n  font-size: 14px;\n  color: #c5c5c5;\n  margin-top: 20px;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-name[data-v-453d652c] {\n  margin-top: 50px;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input[data-v-453d652c] {\n  margin-top: 50px;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-msg .btn-input-reset[data-v-453d652c] {\n  width: 80px;\n  height: 30px;\n  font-size: 14px;\n  padding: 0;\n  line-height: 30px;\n  text-align: center;\n  margin-left: 15px;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box[data-v-453d652c] {\n  margin-top: 20px;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box input[data-v-453d652c] {\n  width: 68%;\n  height: 56px;\n  background: none;\n  border: 1px solid #b2b2b2;\n  border-radius: 5px;\n  vertical-align: middle;\n  margin-bottom: 0;\n  color: #c5c5c5;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box input.readonly-input[data-v-453d652c] {\n  background: #6d7480;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box button[data-v-453d652c] {\n  vertical-align: middle;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box button.btn-disable[data-v-453d652c] {\n  background: #77bcf6;\n  opacity: 1;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box .ok-img[data-v-453d652c] {\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 20px;\n}\n.myneo-box .edit-wrap .edit-box .edit-content .edit-input .input-box .ok-img img[data-v-453d652c] {\n  width: 24px;\n  height: 24px;\n}\n.myneo-box .edit-wrap .edit-box .edit-close[data-v-453d652c] {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  width: 30px;\n  height: 30px;\n  font-size: 30px;\n}\n.myneo-box .sale-wrapper[data-v-453d652c] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  background: rgba(0, 0, 0, 0.5);\n  height: 100%;\n  z-index: 1030;\n}\n.myneo-box .sale-wrapper .sale-box[data-v-453d652c] {\n  background: #454f60;\n  padding: 30px 50px 50px 50px;\n  width: 80%;\n  color: #fff;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -moz-transform: translate(-50%, -50%);\n  -webkit-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  border-radius: 5px;\n  font-size: 16px;\n}\n.myneo-box .sale-wrapper .sale-box .sale-title h4[data-v-453d652c] {\n  font-size: 20px;\n}\n.myneo-box .sale-wrapper .sale-box .sale-domain[data-v-453d652c] {\n  font-size: 16px;\n  color: #ffffff;\n  margin-top: 50px;\n}\n.myneo-box .sale-wrapper .sale-box .sale-smallbox[data-v-453d652c] {\n  margin-top: 50px;\n}\n.myneo-box .sale-wrapper .sale-box .sale-smallbox .smallbox-label[data-v-453d652c] {\n  margin-bottom: 20px;\n  font-size: 16px;\n}\n.myneo-box .sale-wrapper .sale-box .sale-smallbox .smallbox-div[data-v-453d652c] {\n  width: 68%;\n  height: 56px;\n  line-height: 56px;\n  background: #6d7480;\n  border: 1px solid #b2b2b2;\n  border-radius: 5px;\n  font-size: 16px;\n  color: #c5c5c5;\n  padding-left: 20px;\n}\n.myneo-box .sale-wrapper .sale-box .sale-smallbox .smallbox-input[data-v-453d652c] {\n  width: 100%;\n}\n.myneo-box .sale-wrapper .sale-box .sale-smallbox .smallbox-input .sale-input[data-v-453d652c] {\n  width: 68%;\n  height: 56px;\n  line-height: 56px;\n  background: none;\n  border: 1px solid #b2b2b2;\n  border-radius: 5px;\n  font-size: 16px;\n  color: #fff;\n  display: inline-block;\n}\n.myneo-box .sale-wrapper .sale-box .sale-close[data-v-453d652c] {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  width: 30px;\n  height: 30px;\n  font-size: 30px;\n}\n.myneo-box .sale-wrapper .sale-box .unsale-tips[data-v-453d652c] {\n  text-align: center;\n  margin-top: 80px;\n  margin-bottom: 50px;\n  font-size: 16px;\n  color: #ffffff;\n}\n.myneo-box .sale-wrapper .sale-box .unsale-btn[data-v-453d652c] {\n  text-align: center;\n}\n",""])},ogHy:function(t,n,e){"use strict";function a(t){e("PzDt")}Object.defineProperty(n,"__esModule",{value:!0});var i=e("NXVv"),o=e.n(i);for(var s in i)"default"!==s&&function(t){e.d(n,t,function(){return i[t]})}(s);var r=e("il4B"),l=e("VU/8"),d=a,c=l(o.a,r.a,!1,d,"data-v-453d652c",null);n.default=c.exports}});