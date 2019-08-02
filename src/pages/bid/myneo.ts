import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tools } from "../../tools/importpack";
import { LoginInfo, TaskFunction, Task, TaskType, ConfirmType, SaleDomainList, PageUtil } from "../../tools/entity";
import { sessionStoreTool } from "../../tools/storagetool";
import { TaskManager } from "../../tools/taskmanager";
@Component({
    components: {}
})
export default class MyNeo extends Vue
{
    isShowEdit: boolean;
    currentAddress: string = "";   //获取当前地址
    neonameList: any;
    showMydomainList: any;
    domainInfo: any;
    set_contract: string;
    resolverAddr: string;
    ownerAddress: string;
    mappingistrue: boolean;
    mappingState: number;
    resolverState: number;
    ownerState: number; // 转让状态 1为可转让，2为正在转让，3为不可转让
    domainEdit: sessionStoreTool;
    renewalWatting: boolean;
    ownerTransfer: boolean;
    currentdomain: string;
    alertMessage: string;
    alertShow: boolean;
    openToast: Function;
    isShowSaleBox: boolean; // 显示出价弹筐
    domainSalePrice: string; // 出售价格
    isOKSale: boolean;  // 是否上架
    onSaleState: number; // 上架状态 0为可上架，1为正在上架，2为不可上架
    saleOutDomainList: SaleDomainList[]; // 出售成功的列表    
    salePage: PageUtil; //域名成功出售的分页
    myDomainListPage: PageUtil; //我的域名列表的分页    
    inputSalePage: string = '';//出售记录的翻页
    inputMyneoPage: string = '';//域名列表的翻页
    isUnSaleBox: boolean = false;//下架弹筐
    unSaleDomain: string = '';//下架域名
    onUnSaleState: number = 0;//下架状态，0为可下架，1为正在下架
    sellStatus: string = "all";//筛选出售状态，默认all为全部，0901为出售，空为未出售
    nncGet: sessionStoreTool;
    myNNCBalance: string; // 我的NNC
    isCanGetNNC: number // 是否获取NNC 0为不可提取，1为可提取，2为正在提取
    inputDomainName: string = '';// 搜索域名
    domainAddress: string = '';// 转让的域名映射地址
    domainExpire: string = '';// 域名的过期日期
    showListType: string = 'sell';// 我的交易记录显示类型
    isFirstFlag: boolean = true;//初始调用交易记录
    tranConfirm: Function;
    bindDomainName: string;// 绑定的域名
    bindDomainTime: string;// 绑定的域名的过期时间
    showBindBox: number; // 绑定功能的弹窗，0为不弹，1为绑定
    wantBindDomain: string;// 想要绑定或取消绑定的域名
    wantBindTime: string;// 想要绑定的域名的过期时间
    onBinding: number; // 0默认无状态，1为正在绑定，2为正在解除绑定
    constructor()
    {
        super();
        this.isShowEdit = false;
        this.currentAddress = LoginInfo.getCurrentAddress();
        this.neonameList = null;
        this.showMydomainList = null;
        this.set_contract = "0x6e2aea28af9c5febea0774759b1b76398e3167f1";
        this.domainEdit = new sessionStoreTool("domain-edit");
        this.renewalWatting = false;
        this.resolverAddr = "";
        this.mappingState = 0;
        this.resolverState = 0;
        this.mappingistrue = false;
        this.currentdomain = "";
        this.ownerState = 3
        this.ownerAddress = "";
        this.alertMessage = "";
        this.alertShow = false;
        this.openToast = null;
        this.isShowSaleBox = false;
        this.domainSalePrice = '';
        this.isOKSale = false;
        this.onSaleState = 0;
        this.saleOutDomainList = [];
        this.salePage = new PageUtil(0, 5);
        this.myDomainListPage = new PageUtil(0, 5);
        this.nncGet = new sessionStoreTool("getnnc");
        this.myNNCBalance = '0';
        this.isCanGetNNC = 0;
        this.showBindBox = 0;
        this.bindDomainName = '';
        this.bindDomainTime = '';
        this.wantBindDomain = '';
        this.wantBindTime = '';
        this.onBinding = 0;
    }

    mounted()
    {
        this.tranConfirm = this.$refs.tranConfirm["open"];
        tools.nnstool.initRootDomain("neo");
        this.initPage();
        //初始化 任务管理器的执行机制
        TaskFunction.domainResovle = this.resolverTask;
        TaskFunction.domainMapping = this.mappingTask;
        TaskFunction.domainRenewal = this.renewalTask;
        TaskFunction.domainTransfer = this.domainTransferTask;
        TaskFunction.domainSale = this.domainSaleTask;
        TaskFunction.domainUnSale = this.domainUnSaleTask;
        TaskFunction.getNNC = this.getMyNNC;
        tools.taskManager.functionList.push(this.initPage);
        this.openToast = this.$refs.toast["isShow"];
    }
    initPage()
    {
        this.getMyNNC();
        // this.getAllNeoName();
        this.getBindDomain();
        // this.getMyDomainList(true);
        if (this.isFirstFlag)
        {
            this.getMyDomainList(true);
            this.getSaleDomainList(this.currentAddress, true, this.salePage);
            this.isFirstFlag = false;
        } else
        {
            this.getMyDomainList(false);
            this.getSaleDomainList(this.currentAddress, false, this.salePage);
        }
    }

    async getBindDomain()
    {
        let res = await tools.nnstool.getBindDomain(this.currentAddress);
        if (res)
        {
            this.bindDomainName = res.domain;
            this.bindDomainTime = tools.timetool.getTime(parseFloat(res.ttl));
        }
    }
    async getMyNNC()
    {
        let res = await tools.wwwtool.getNNCFromSellingHash(this.currentAddress);
        if (res)
        {
            this.myNNCBalance = parseFloat(res["balance"]) === 0 ? '0' : res["balance"];
        }
        const isDoing = this.nncGet.select('getnnc');
        if (isDoing)
        {
            this.isCanGetNNC = 2;
            return
        }
        this.isCanGetNNC = 1;
        if (parseFloat(this.myNNCBalance) == 0)
        {
            this.isCanGetNNC = 0;
        }
    }
    domainUnSaleTask(domain)
    {
        if (domain == this.currentdomain)
        {
            this.onUnSaleState = 0;
        }
        this.getMyDomainList(false);
    }
    domainSaleTask(domain)
    {
        if (domain == this.currentdomain)
        {
            this.onSaleState = 0;
        }
        this.getMyDomainList(false);
    }
    domainTransferTask(domain)
    {
        if (domain == this.currentdomain)
        {
            this.ownerState = 0;
            this.ownerTransfer = false;
        }
        this.getMyDomainList(false);
    }

    verifyMapping()
    {
        if (!this.resolverAddr)
        {
            this.mappingistrue = false;
            return;
        }
        let res = tools.neotool.verifyAddress(this.resolverAddr);
        this.mappingistrue = res;
    }

    verifyDomain(domain)
    {
        //check domain valid
        var reg = /^(.+\.)(test|TEST|neo|NEO[a-z][a-z])$/;
        if (!reg.test(domain))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    verifySetOwner()
    {
        if (this.ownerState == 2)
        {
            return false;
        }
        let isDomain = this.verifyDomain(this.ownerAddress);
        if (!isDomain)
        {
            const res = tools.neotool.verifyAddress(this.ownerAddress);
            this.ownerState = res ? 1 : 3;
            this.domainAddress = "";
            this.domainExpire = "";
        } else
        {
            const domainName = this.ownerAddress.toLowerCase();
            this.getDomainAddress(domainName);
        }
    }
    /**
     * 获取域名映射的地址
     * @param domainName 域名
     */
    async getDomainAddress(domainName: string)
    {
        let res = await tools.wwwtool.getresolvedaddress(domainName);
        if (res)
        {
            this.domainAddress = res.data != '' ? res.data : '' + this.$t("transfer.errdomain");
            let time = tools.timetool.getTime(res.TTL);
            this.domainExpire = "" + this.$t("transfer.timeMsg") + time;
            this.ownerState = res.data != '' ? 1 : 3;
            return true;
        }
        else
        {
            this.domainAddress = "";
            this.domainExpire = "";
            this.ownerState = 3;
            return false;
        }
    }
    async getMyDomainList(isFirst: boolean)
    {
        let res = [];
        if (isFirst)
        {
            res = await tools.wwwtool.getnnsinfo(this.currentAddress, '.neo', this.sellStatus, 1, this.myDomainListPage.pageSize, this.inputDomainName);
            if (res)
            {
                this.myDomainListPage = new PageUtil(res[0].count, 5);
            }
        } else
        {
            res = await tools.wwwtool.getnnsinfo(this.currentAddress, '.neo', this.sellStatus, this.myDomainListPage.currentPage, this.myDomainListPage.pageSize, this.inputDomainName);
        }
        if (!res)
        {
            this.neonameList = null;
            return false;
        }
        this.initListData(res[0].list);
    }

    // async getAllNeoName()
    // {
    //     // 
    //     let res = await tools.wwwtool.getnnsinfo(this.currentAddress, '.neo');
    //     await this.initListData(res);

    // }
    async initListData(res: any)
    {
        //从缓存取状态数据
        let list: string[] = res;
        if (list && list.length)
        {
            for (let i in list)
            {
                if (isNaN(list[i]["ttl"]))
                {
                    list[i]["ttl"] = new Date(list[i]["ttl"]).getTime() / 1000;
                }
                let isshow = await this.checkExpiration(list[i]);
                if (!isshow)//未到期
                {
                    let expired = await this.checkExpirationSoon(list[i]);
                    list[i]["expired"] = isshow;
                    list[i]["expiring"] = expired;
                    list[i]["isEdit"] = false; // （域名可编辑时为false,反之为true）
                    list[i]['selling'] = false; // 初始状态（域名正在出售待确认时为true）
                    list[i]['transfering'] = false;// 初始状态（域名正在转让待确认时为true）
                    list[i]['delist'] = false;// 初始状态（域名正在下架待确认时为true）
                    let domain = this.domainEdit.select(list[i]['domain']);
                    if (domain)
                    {
                        // 域名在转让确认中
                        if (domain['domain_transfer'] && domain['domain_transfer'] === 'watting')
                        {
                            list[i]["isEdit"] = true; // 域名不可编辑
                            list[i]['selling'] = true; // （域名不可出售为true）
                            list[i]['transfering'] = true;// （域名不可转让为true）
                        }
                        // 域名出售确认中
                        else if (domain['sale'] && domain['sale'] === 'watting')
                        {
                            list[i]["isEdit"] = true; // 域名不可编辑
                            list[i]['selling'] = true; // （域名不可出售为true）
                            list[i]['transfering'] = true;// （域名不可转让为true）
                        }
                        // 域名下架确认中
                        else if (domain['unsale'] && domain['unsale'] === 'watting')
                        {
                            list[i]['delist'] = true;// （域名不可下架为true）
                        }
                        // 域名绑定确认中
                        else if (domain['bind'] && domain['bind'] === 'watting')
                        {
                            list[i]['bind'] = true;
                        }
                    }
                } else
                {
                    list[i]["expiring"] = false;
                    list[i]["expired"] = true;
                    list[i]["isEdit"] = false;
                    list[i]['selling'] = false;
                    list[i]['transfering'] = false;
                    list[i]['delist'] = false;
                    list[i]['bind'] = false;
                }
                list[i]["ttl"] = tools.timetool.getTime(res[i]["ttl"])
            }
            this.neonameList = list;
        }
    }

    checkExpiration(domain: string)
    {
        let timestamp = new Date().getTime();
        let copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(domain["ttl"]).multiply(1000));
        return copare < 0 ? false : true;    //小于0未过期false，大于0已过期true
    }
    checkExpirationSoon(domain: string)
    {
        let timestamp = new Date().getTime();
        let copare = (new Neo.BigInteger(domain["ttl"]).multiply(1000)).subtract(new Neo.BigInteger(timestamp));
        let threeMonth = (24 * 60 * 60 * 1000) * 90;
        return copare.compareTo(threeMonth) < 0 ? false : true;    //小于threeMonth即将过期false
    }

    resetresolve()
    {
        this.resolverState = 0;
        this.resolverAddr = "";
        this.mappingState = 0;
        this.mappingistrue = false;
    }

    resetmappingData()
    {
        this.resolverAddr = "";
        this.mappingState = 0;
    }
    /**
     * 取消绑定
     * @param item 
     */
    async onCancelBind()
    {
        this.openToast = this.$refs.toast["isShow"];
        let msgs = [
            { title: this.$t("confirm.addr"), value: this.currentAddress },
            { title: this.$t("confirm.unbind"), value: this.bindDomainName }
        ]
        let confirmres = await this.tranConfirm(this.$t("confirm.unbindtitle"), msgs);
        if (confirmres)
        {
            try
            {
                const res = await tools.nnstool.cancalBindDomain(this.currentAddress);
                if (!res.err)
                {
                    const txid = res.info;
                    TaskManager.addTask(
                        new Task(ConfirmType.contract, txid, { domain: this.bindDomainName, address: this.currentAddress }),
                        TaskType.delBindDomain);
                    this.domainEdit.put(this.bindDomainName, "watting", "unbind");

                    this.openToast("success", "" + this.$t("myneoname.waidunbind"), 5000);
                    this.initListData(this.neonameList);
                } else
                {
                    this.openToast("error", "" + this.$t("errormsg.msg3"), 3000);
                    throw new Error("Delete Bind failed");
                }
            } catch (error)
            {
                console.log("ERROR!!");
            }
        }
    }
    /**
     * 绑定域名
     * @param item 
     */
    onBindDomain(item)
    {
        this.showBindBox = 1;
        this.wantBindDomain = item.domain;
        this.wantBindTime = item.ttl;
    }
    /**
     * 再次确认绑定域名
     * @param item 
     */
    async onCheckBindDomain()
    {
        // this.showBindBox = 2;
        this.openToast = this.$refs.toast["isShow"];
        let msgs = [
            { title: this.$t("confirm.addr"), value: this.currentAddress },
            { title: this.$t("confirm.bind"), value: this.wantBindDomain },
            { title: this.$t("confirm.expirationTime"), value: this.wantBindTime }
        ]
        let confirmres = await this.tranConfirm(this.$t("confirm.bindtitle"), msgs);
        if (confirmres)
        {
            try
            {
                const res = await tools.nnstool.bindDomain(this.wantBindDomain, this.currentAddress);
                if (!res.err)
                {
                    const txid = res.info;
                    TaskManager.addTask(
                        new Task(ConfirmType.contract, txid, { domain: this.wantBindDomain, address: this.currentAddress }),
                        TaskType.bindDomain);
                    this.domainEdit.put(this.wantBindDomain, "watting", "bind");
                    this.onCloseBindDomain();
                    this.openToast("success", "" + this.$t("myneoname.waitbind"), 5000);
                    this.initListData(this.neonameList);
                } else
                {
                    this.onCloseBindDomain();
                    this.openToast("error", "" + this.$t("errormsg.msg3"), 3000);
                    throw new Error("Bind failed");
                }
            } catch (error)
            {
                console.log("ERROR!!");
                this.onCloseBindDomain()
            }
        }
    }

    /**
     * 关闭绑定窗口
     */
    onCloseBindDomain()
    {
        this.showBindBox = 0;
        this.wantBindDomain = '';
        this.wantBindTime = '';
    }

    /**
     * 打开编辑域名
     * @param item 传入窗口的域名对象
     */
    onShowEdit(item)
    {
        this.domainInfo = item;
        this.resolverAddr = item.resolverAddr;
        this.mappingistrue = tools.neotool.verifyAddress(this.resolverAddr);
        this.mappingState = this.domainInfo.resolverAddr ? 1 : 0;
        this.resolverState = this.domainInfo.resolver ? 1 : 0;
        this.renewalWatting = false;
        this.isShowEdit = !this.isShowEdit;
        this.currentdomain = item.domain;
        // this.verifySetOwner(this.currentdomain);
        let domain = this.domainEdit.select(item.domain);
        if (domain)
        {
            if (domain['resolver'] && domain['resolver'] === 'watting')
            {
                this.resolverState = 2;
            }
            if (domain['mapping'] && domain['mapping']['state'] && domain['mapping']['state'] === 'watting')
            {
                this.mappingState = 2;
                this.resolverAddr = domain['mapping']['address'];
            }
            if (domain['renewal'] && domain['renewal'] === 'watting')
            {
                this.renewalWatting = true;
            }
        }
    }

    /**
     * 设置所有者 转让域名
     */
    showTranferDomain(item)
    {
        this.domainInfo = item;
        this.ownerAddress = "";
        this.ownerState = 3;
        this.domainAddress = '';
        this.domainExpire = '';
        this.alertShow = true;
        this.currentdomain = item.domain;
        let domain = this.domainEdit.select(item.domain);
        if (domain)
        {
            if (domain['domain_transfer'] && domain['domain_transfer'] === 'watting')
            {
                this.ownerState = 2;
            }
        } else
        {
            this.ownerState = 1;
        }
    }
    closeTranferDomain()
    {
        this.ownerAddress = "";
        this.alertShow = false;
    }
    async setowner()
    {
        this.openToast = this.$refs.toast["isShow"];
        const oldstate = this.ownerState;
        let msgs = [
            { title: this.$t("confirm.domain"), value: this.domainInfo.domain },
            { title: this.$t("confirm.domainTransferTo"), value: this.ownerAddress }
        ]
        let confirmres = await this.tranConfirm(this.$t("confirm.domainTransferConfirm"), msgs);
        if (confirmres)
        {
            try
            {
                if (this.resolverAddr != "" && this.mappingState != 0)
                {
                    this.resetmappingData()
                    await this.mappingData();
                }
                this.ownerState = 2;
                let transferAddress = this.ownerAddress;
                if (this.domainAddress != '')
                {
                    transferAddress = this.domainAddress;
                }

                const res = await tools.nnstool.setOwner(this.domainInfo["domain"], transferAddress);
                if (!res.err)
                {
                    const txid = res.info;
                    TaskManager.addTask(
                        new Task(ConfirmType.contract, txid, { domain: this.domainInfo['domain'], address: transferAddress }),
                        TaskType.domainTransfer);
                    this.domainEdit.put(this.domainInfo.domain, "watting", "domain_transfer");
                    this.closeTranferDomain();
                    this.openToast("success", "" + this.$t("myneoname.waitmsg2"), 5000);
                    this.initListData(this.neonameList);
                } else
                {
                    this.ownerState = oldstate;
                    this.openToast("error", "" + this.$t("errormsg.msg3"), 3000);
                    throw new Error("Transaction send failed");
                }
            } catch (error)
            {
                console.log("ERROR!!");
                this.ownerState = oldstate;
                this.closeTranferDomain()
            }
        }
        else
        {
            this.ownerState = oldstate;
            this.closeTranferDomain()
        }
    }

    /**
     * 注册解析器
     */
    async setresolve()
    {
        let oldstate = this.resolverState;
        try
        {
            let msgs = [
                { title: this.$t("confirm.domain"), value: this.domainInfo.domain },
                { title: this.$t("confirm.addrresolver"), value: this.set_contract }
            ]
            let confirmres = await this.tranConfirm(this.$t("confirm.addrResolverConfirm"), msgs);
            if (confirmres)
            {
                this.resolverState = 2;
                let contract = this.set_contract.hexToBytes().reverse();
                let res = await tools.nnstool.setResolve(this.domainInfo["domain"], contract);
                if (!res.err)
                {
                    let txid = res.info;
                    TaskManager.addTask(
                        new Task(ConfirmType.contract, txid, { domain: this.domainInfo['domain'], contract: this.set_contract }),
                        TaskType.domainResovle);
                    this.domainEdit.put(this.domainInfo.domain, "watting", "resolver");
                }
            }
            else
            {
                this.resolverState = oldstate;
            }
        } catch (error)
        {
            this.resolverState = oldstate;
        }
    }

    /**
     * 映射地址
     */
    async mappingData()
    {
        let oldstate = this.mappingState;
        try
        {
            let msgs = [
                { title: this.$t("confirm.domain"), value: this.domainInfo.domain },
                { title: this.$t("confirm.addrmapping"), value: this.resolverAddr }
            ]
            let confirmres = await this.tranConfirm(this.$t("confirm.addrMappingConfirm"), msgs);
            if (confirmres)
            {
                this.mappingState = 2;
                let res = await tools.nnstool.setResolveData(this.domainInfo.domain, this.resolverAddr, this.set_contract);
                if (!res.err)
                {
                    let txid = res.info;
                    TaskManager.addTask(
                        new Task(ConfirmType.contract, txid, { domain: this.domainInfo.domain, address: this.resolverAddr }),
                        TaskType.domainMapping);
                    this.domainEdit.put(this.domainInfo.domain, { state: "watting", address: this.resolverAddr }, "mapping");
                } else
                {
                    this.mappingState = oldstate;
                    throw new Error("Transaction send failed");
                }
            }
            else
            {
                this.mappingState = oldstate;
            }
        } catch (error)
        {
            this.mappingState = oldstate;
            throw error;
        }
    }

    /**
     * 域名续约
     */
    async renewalDomain()
    {
        let root = await tools.nnstool.getRootInfo("neo");
        let domain = this.domainInfo.domain;
        let ttl = (new Date(this.domainInfo.ttl).getTime()) + 24 * 60 * 60 * 1000 * 365;
        let time = tools.timetool.getTime(ttl);
        let msgs = [
            { title: this.$t("confirm.domain"), value: this.domainInfo.domain },
            { title: this.$t("confirm.renewalto"), value: time }
        ]
        let confirmres = await this.tranConfirm(this.$t("confirm.renewalConfirm"), msgs);
        if (confirmres)
        {
            let res = await
                tools.nnssell.renewDomain(domain, root.register);
            if (!res.err)
            {
                this.renewalWatting = true;
                let txid = res.info;
                TaskManager.addTask(
                    new Task(ConfirmType.contract, txid, { domain }),
                    TaskType.domainRenewal);
                this.domainEdit.put(this.domainInfo.domain, "watting", "renewal");
            }
        }
    }

    /**
     * 续约状态效果
     * @param domain 域名
     */
    renewalTask(domain)
    {
        if (domain == this.currentdomain)
        {
            this.renewalWatting = false;
        }
        this.getMyDomainList(false);
    }

    /**
     * 映射状态效果
     * @param domain 域名
     */
    mappingTask(domain, address)
    {
        this.getMyDomainList(false);
        if (this.currentdomain == domain)
        {
            this.mappingState = 1;
            if (address)
            {
                this.resolverAddr = address;
            }
        }
    }

    /**
     * 合约状态改变效果
     * @param domain 域名
     */
    resolverTask(domain)
    {
        if (this.currentdomain == domain)
        {
            this.resolverState = 1;
        }
        this.getMyDomainList(false);
    }
    /**
     * 筛选功能
     */
    selectSellDomain()
    {
        this.myDomainListPage.currentPage = 1;
        this.inputDomainName = '';
        if (this.sellStatus == 'all')
        {
            // this.myDomainListPage.totalCount = this.neonameList.length;
            // this.showMydomainList = this.mydomainListByPage(this.neonameList);
            this.getMyDomainList(true);
        } else if (this.sellStatus == 'selling')
        {
            this.getMyDomainList(true);
            // let newList = [];
            // Object.keys(this.neonameList).filter((keys: string) =>
            // {
            //     if (this.neonameList[ keys ].state == '0901')
            //     {
            //         newList.push(this.neonameList[ keys ]);
            //         return true;
            //     }
            //     return false;
            // })
            // this.myDomainListPage.totalCount = newList.length;
            // this.showMydomainList = this.mydomainListByPage(newList);
        } else
        {
            this.getMyDomainList(true);
            // let newList = [];
            // Object.keys(this.neonameList).filter((keys: string) =>
            // {
            //     if (this.neonameList[ keys ].state != '0901')
            //     {
            //         newList.push(this.neonameList[ keys ]);
            //         return true;
            //     }
            //     return false;
            // })
            // this.myDomainListPage.totalCount = newList.length;
            // this.showMydomainList = this.mydomainListByPage(newList);
        }
    }
    /**
     * 查询域名的输入框
     */
    async searchMyDomainInput()
    {
        if (this.inputDomainName.length === 0)
        {
            this.getMyDomainList(true);
        }
    }
    /**
     * 输入查询功能
     */
    toSearchDomain()
    {
        this.sellStatus = 'all';
        this.getMyDomainList(true);
        // this.myDomainListPage.totalCount = newList.length;
        // this.showMydomainList = this.mydomainListByPage(newList);
    }
    /**
     * 域名列表分页功能
     */
    // mydomainListByPage(arrlist)
    // {
    //     const startNum = this.myDomainListPage.pageSize * (this.myDomainListPage.currentPage - 1);
    //     const list = [...arrlist];
    //     const result = list.slice(startNum, startNum + this.myDomainListPage.pageSize);
    //     return result;
    // }
    /**
     * 域名列表上一页
     */
    myDomainPrevious()
    {

        const current = this.myDomainListPage.currentPage;
        if (current - 1 <= 0)
        {
            return;
        }
        this.myDomainListPage.currentPage--;
        // this.showMydomainList = this.mydomainListByPage(this.neonameList);
        this.getMyDomainList(false);
    }
    /**
     * 域名列表下一页
     */
    myDomainNext()
    {
        const current = this.myDomainListPage.currentPage;
        if (current + 1 > this.myDomainListPage.totalPage)
        {
            return;
        }
        this.myDomainListPage.currentPage++;
        // this.showMydomainList = this.mydomainListByPage(this.neonameList);
        this.getMyDomainList(false);
    }
    /**
     * 域名列表跳转输入
     */
    onInputMyneoPageChange = (event: any) =>
    {
        const value = parseInt('' + event.target.value, 10);
        if (event.target.value && isNaN(event.target.value))
        {
            return false;
        }
        // const num = parseInt(event.target.value, 10);
        // 如果跳转页码小于0或者跳转页码大于页面总数，则中断
        if (value <= 0)
        {
            this.inputMyneoPage = '';
            return false;
        }
        // 如果跳转页码小于0或者跳转页码大于页面总数，则中断
        if (value > this.myDomainListPage.totalPage)
        {
            return false
        }
        this.inputMyneoPage = event.target.value;
        return true;
    }
    /**
     * 域名列表翻页
     */
    goMyneoPage()
    {
        if (this.inputMyneoPage != '' && this.inputMyneoPage != '0')
        {
            this.pageToMyneo(this.inputMyneoPage);
        }
    }
    // 翻页跳转
    pageToMyneo(page: string)
    {
        let current = parseInt('' + page, 10);

        // 如果跳转页码小于0或者跳转页码大于页面总数，则中断
        if (current < 0 || current > this.myDomainListPage.totalPage)
        {
            return;
        }
        // 如果跳转页码等于当前页码，则中断
        if (current == this.myDomainListPage.currentPage)
        {
            return;
        }
        this.myDomainListPage.currentPage = current
        // this.showMydomainList = this.mydomainListByPage(this.neonameList);
        this.getMyDomainList(false);
    }
    // 域名列表回车翻页
    onInputMyneoKeyDown(event: any)
    {
        if (event.keyCode === 13)
        {
            this.pageToMyneo(this.inputMyneoPage);
        }
    }

    /**
     * 打开出售模块
     * @param item 域名详情
     */
    onShowSaleDialog(item)
    {
        this.onSaleState = 0;
        this.domainInfo = item;
        this.isShowSaleBox = !this.isShowSaleBox;
        this.currentdomain = item.domain;
        let domain = this.domainEdit.select(item.domain);
        this.domainSalePrice = '';
        if (domain)
        {
            if (domain['sale'] && domain['sale'] === 'watting')
            {
                this.onSaleState = 1;
            }
        }
    }
    /**
     * 关闭出售模块
     */
    closeSaleDialog()
    {
        this.domainSalePrice = '';
        this.isOKSale = false;
        this.isShowSaleBox = !this.isShowSaleBox;
    }
    // 判断输入金额是否正确
    verifySalePrice()
    {
        if (parseFloat(this.domainSalePrice) <= 0 || this.domainSalePrice == '')
        {
            this.isOKSale = false;
            return false;
        }
        if (/\./.test(this.domainSalePrice) && this.domainSalePrice.split('.')[1].length > 1)
        {
            this.domainSalePrice = this.domainSalePrice.substr(0, (this.domainSalePrice.toString().indexOf(".")) + 2);
            return false;
        }
        this.isOKSale = true;
    }
    /**
     * 出售
     */
    async toSaleDomain()
    {
        // this.domainEdit.put(this.domainInfo.domain, { state: "watting", price: this.salePrice }, "sale");
        try
        {
            let msgs = [
                { title: this.$t("confirm.domain"), value: this.domainInfo.domain },
                { title: this.$t("confirm.price"), value: this.domainSalePrice + " NNC" },
                { title: this.$t("confirm.expirationTime"), value: this.domainInfo.ttl }
            ]
            let confirmres = await this.tranConfirm(this.$t("confirm.listingConfirm"), msgs);
            if (confirmres)
            {
                let res = await tools.nnstool.saleDomain(this.domainInfo["domain"], this.domainSalePrice);
                if (!res.err)
                {
                    let txid = res.info;
                    TaskManager.addTask(
                        new Task(ConfirmType.contract, txid, { domain: this.domainInfo['domain'], amount: this.domainSalePrice }),
                        TaskType.saleDomain);
                    this.domainEdit.put(this.domainInfo.domain, "watting", "sale");
                    this.closeSaleDialog();
                    this.openToast("success", "" + this.$t("myneoname.waitmsg3"), 5000);
                    await this.initListData(this.neonameList);
                }
            }
        } catch (error)
        {
            // this.resolverState = oldstate;
        }
    }
    /**
     * 下架
     */
    async toUnSellDomain()
    {
        try
        {
            let msgs = [
                { title: this.$t("confirm.domain"), value: this.currentdomain }
            ]
            let confirmres = await this.tranConfirm(this.$t("confirm.delistingConfirm"), msgs);
            if (confirmres)
            {
                let res = await tools.nnstool.unSaleDomain(this.domainInfo["domain"]);
                if (!res.err)
                {
                    let txid = res.info;
                    TaskManager.addTask(
                        new Task(ConfirmType.contract, txid, { domain: this.domainInfo['domain'] }),
                        TaskType.unSaleDomain);
                    this.domainEdit.put(this.domainInfo.domain, "watting", "unsale");
                    this.closeUnSaleDialog();
                    this.openToast("success", "" + this.$t("myneoname.waitmsg4"), 5000);
                    await this.initListData(this.neonameList);
                }

            }
        } catch (error)
        {
            // this.resolverState = oldstate;
        }
    }
    /**
     * 打开下架窗口
     * @param item 域名信息
     */
    onShowUnSaleDialog(item)
    {
        this.onUnSaleState = 0;
        this.domainInfo = item;
        this.isUnSaleBox = !this.isUnSaleBox;
        this.currentdomain = item.domain;
        let domain = this.domainEdit.select(item.domain);
        this.domainSalePrice = '';
        if (domain)
        {
            if (domain['unsale'] && domain['unsale'] === 'watting')
            {
                this.onUnSaleState = 1;
            }
        }
    }
    /**
     * 关闭出售模块
     */
    closeUnSaleDialog()
    {
        this.isUnSaleBox = !this.isUnSaleBox;
    }
    /**
     * 筛选显示出售列表或者购买列表
     */
    selectSellOrBuy()
    {
        this.salePage.currentPage = 1;
        if (this.showListType == 'sell')
        {
            this.getSaleDomainList(this.currentAddress, true, this.salePage);
        } else if (this.showListType == 'buy')
        {
            this.getSaleDomainList(this.currentAddress, true, this.salePage);
        }
    }
    /**
     * 获取域名已出售成功的列表
     * @param address 当前地址
     */
    async getSaleDomainList(address: string, first: boolean, pageUtil: PageUtil)
    {
        let res = null;
        this.saleOutDomainList = [];
        if (first)
        {
            res = await tools.wwwtool.getSaleOrBuyList(address, '.neo', this.showListType, 1, 5);
        } else
        {
            res = await tools.wwwtool.getSaleOrBuyList(address, '.neo', this.showListType, pageUtil.currentPage, pageUtil.pageSize);
        }
        if (res)
        {
            if (first)
            {
                this.salePage = new PageUtil(res[0].count, 5);
            }
            this.saleOutDomainList = res[0].list.map((key) =>
            {
                const newObj = {
                    fullDomain: key.fullDomain,
                    price: key.price,
                    blocktime: tools.timetool.getTime(key.time)
                }
                return newObj;
            });
        } else
        {
            this.salePage = new PageUtil(0, 5);
        }
    }
    /**
     * 域名出售列表上一页
     */
    mySaleDomainPrevious()
    {
        const current = this.salePage.currentPage;
        if (current - 1 <= 0)
        {
            return;
        }
        this.salePage.currentPage--;
        this.getSaleDomainList(this.currentAddress, false, this.salePage);
    }
    /**
     * 域名出售列表下一页
     */
    mySaleDomainNext()
    {
        const current = this.salePage.currentPage;
        if (current + 1 > this.salePage.totalPage)
        {
            return;
        }
        this.salePage.currentPage++;
        this.getSaleDomainList(this.currentAddress, false, this.salePage)
    }
    /**
     * 出售列表跳转输入
     */
    onInputSalePageChange = (event: any) =>
    {
        const value = parseInt('' + event.target.value, 10);
        if (event.target.value && isNaN(event.target.value))
        {
            return false;
        }
        // const num = parseInt(event.target.value, 10);
        // 如果跳转页码小于0或者跳转页码大于页面总数，则中断
        if (value <= 0)
        {
            this.inputSalePage = '';
            return false;
        }
        // 如果跳转页码小于0或者跳转页码大于页面总数，则中断
        if (value > this.salePage.totalPage)
        {
            return false
        }
        this.inputSalePage = event.target.value;
        return true;
    }
    /**
     * 页面跳转
     */
    goSalePage()
    {

        if (this.inputSalePage != '' && this.inputSalePage != '0')
        {
            this.pageTo(this.inputSalePage);
        }
    }
    pageTo(page: string)
    {
        let current = parseInt('' + page, 10);

        // 如果跳转页码小于0或者跳转页码大于页面总数，则中断
        if (current < 0 || current > this.salePage.totalPage)
        {
            return;
        }
        // 如果跳转页码等于当前页码，则中断
        if (current == this.salePage.currentPage)
        {
            return;
        }
        this.salePage.currentPage = current


        this.getSaleDomainList(this.currentAddress, false, this.salePage);
    }
    // 回车跳转页
    onInputSaleKeyDown(event: any) 
    {
        if (event.keyCode === 13)
        {
            this.pageTo(this.inputSalePage);
        }
    }
    /**
     * 提取我的nnc
     */
    async toGetMyNNC()
    {
        this.isCanGetNNC = 2;
        try
        {
            let msgs = [
                { title: this.$t("confirm.claimto").toString(), value: this.$t("confirm.yourbalance").toString() },
                { title: this.$t("confirm.claimAmount").toString(), value: this.myNNCBalance + " NNC" }
            ]
            let confirmres = await this.tranConfirm(this.$t("confirm.nncClaimConfirm").toString(), msgs);
            if (confirmres)
            {
                let res = await tools.nnstool.getAllMyNNC();
                if (!res.err)
                {
                    let txid = res.info;
                    TaskManager.addTask(
                        new Task(ConfirmType.contract, txid, { amount: this.myNNCBalance }),
                        TaskType.getMyNNC);
                    this.nncGet.put("getnnc", true);
                    this.openToast("success", "" + this.$t("balance.successmsg"), 5000);
                }
            }
            else
            {
                this.getMyNNC();
            }
        } catch (error)
        {
            this.getMyNNC();
            this.openToast("error", "" + this.$t("balance.errmsg1"), 5000);
        }
    }
}