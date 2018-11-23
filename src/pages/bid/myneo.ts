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
    resolverAddress: string;
    ownerAddress: string;
    mappingistrue: boolean;
    mappingState: number;
    resolverState: number;
    ownerState: number;
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
        this.resolverAddress = "";
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
    }

    mounted()
    {
        tools.nnstool.initRootDomain("neo");
        this.getAllNeoName(this.currentAddress);
        //初始化 任务管理器的执行机制
        TaskFunction.domainResovle = this.resolverTask;
        TaskFunction.domainMapping = this.mappingTask;
        TaskFunction.domainRenewal = this.renewalTask;
        TaskFunction.domainTransfer = this.domainTransferTask;
        TaskFunction.domainSale = this.domainSaleTask;
        TaskFunction.domainUnSale = this.domainUnSaleTask;
        this.openToast = this.$refs.toast[ "isShow" ];
        this.getSaleDomainList(this.currentAddress, true, this.salePage);
    }
    domainUnSaleTask(domain)
    {
        if (domain == this.currentdomain)
        {
            this.onUnSaleState = 0;
        }
        this.getAllNeoName(this.currentAddress);
    }
    domainSaleTask(domain)
    {
        if (domain == this.currentdomain)
        {
            this.onSaleState = 0;
        }
        this.getAllNeoName(this.currentAddress);
    }

    domainTransferTask(domain)
    {
        if (domain == this.currentdomain)
        {
            this.ownerTransfer = false;
        }
        this.getAllNeoName(this.currentAddress);
    }

    verifyMapping()
    {
        if (!this.resolverAddress)
        {
            this.mappingistrue = false;
            return;
        }
        let res = tools.neotool.verifyAddress(this.resolverAddress);
        this.mappingistrue = res;
    }


    verifySetOwner(currentdomain: string)
    {
        const domain = this.domainEdit.select(currentdomain);
        if (domain && domain[ `domain_transfer` ] && domain[ `domain_transfer` ] === "watting")
        {
            this.ownerState = 2;
        }
        // else if (this.domainInfo.expired || !this.ownerAddress)
        // {
        //     this.ownerState = 3;
        // }
        else
        {
            const res = tools.neotool.verifyAddress(this.ownerAddress);
            this.ownerState = res ? 1 : 3;
        }
    }

    async getAllNeoName(address)
    {
        let res = await tools.wwwtool.getnnsinfo(address, '.neo');

        //从缓存取状态数据
        let list = res;
        if (list && list.length)
        {
            for (let i in list)
            {
                let isshow = await this.checkExpiration(list[ i ]);
                if (!isshow)//未到期
                {
                    let expired = await this.checkExpirationSoon(list[ i ]);
                    list[ i ][ "expired" ] = isshow;
                    list[ i ][ "expiring" ] = expired;
                } else
                {
                    list[ i ][ "expiring" ] = false;
                    list[ i ][ "expired" ] = true;
                }
                if (list[ i ][ "resolver" ])
                {
                    let mapping = await tools.nnstool.resolveData(list[ i ][ 'domain' ]);
                    list[ i ][ "resolverAddress" ] = mapping;
                }
                list[ i ][ "ttl" ] = tools.timetool.getTime(res[ i ][ "ttl" ])
            }
            this.neonameList = list;
            this.myDomainListPage.totalCount = list.length;
            this.showMydomainList = this.mydomainListByPage(list);
        }
    }

    checkExpiration(domain: string)
    {
        let timestamp = new Date().getTime();
        let copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(domain[ "ttl" ]).multiply(1000));
        return copare < 0 ? false : true;    //小于0未过期false，大于0已过期true
    }
    checkExpirationSoon(domain: string)
    {
        let timestamp = new Date().getTime();
        let copare = (new Neo.BigInteger(domain[ "ttl" ]).multiply(1000)).subtract(new Neo.BigInteger(timestamp));
        let threeMonth = (24 * 60 * 60 * 1000) * 90;
        return copare.compareTo(threeMonth) < 0 ? false : true;    //小于threeMonth即将过期false
    }

    resetresolve()
    {
        this.resolverState = 0;
        this.resolverAddress = "";
        this.mappingState = 0;
        this.mappingistrue = false;
    }

    resetmappingData()
    {
        this.resolverAddress = "";
        this.mappingState = 0;
    }

    /**
     * 打开编辑域名
     * @param item 传入窗口的域名对象
     */
    onShowEdit(item)
    {
        this.domainInfo = item;
        this.resolverAddress = item.resolverAddress;
        this.mappingistrue = tools.neotool.verifyAddress(this.resolverAddress);
        this.mappingState = this.domainInfo.resolverAddress ? 1 : 0;
        this.resolverState = this.domainInfo.resolver ? 1 : 0;
        this.renewalWatting = false;
        this.isShowEdit = !this.isShowEdit;
        this.currentdomain = item.domain;
        this.verifySetOwner(this.currentdomain);

        let domain = this.domainEdit.select(item.domain);
        if (domain)
        {
            if (domain[ 'resolver' ] && domain[ 'resolver' ] === 'watting')
            {
                this.resolverState = 2;
            }
            if (domain[ 'mapping' ] && domain[ 'mapping' ][ 'state' ] && domain[ 'mapping' ][ 'state' ] === 'watting')
            {
                this.mappingState = 2;
                this.resolverAddress = domain[ 'mapping' ][ 'address' ];
            }
            if (domain[ 'renewal' ] && domain[ 'renewal' ] === 'watting')
            {
                this.renewalWatting = true;
            }
            if (domain[ 'owner' ] && domain[ 'owner' ] === 'watting')
            {
                this.renewalWatting = true;
            }
            if (domain[ 'unsale' ] && domain[ 'unsale' ] === 'watting')
            {
                this.onUnSaleState = 1;
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
        this.alertShow = true;
    }
    closeTranferDomain()
    {
        this.ownerAddress = "";
        this.alertShow = false;
    }
    async setowner()
    {
        this.openToast = this.$refs.toast[ "isShow" ];
        const oldstate = this.ownerState;
        try
        {
            if (this.resolverAddress != "" && this.mappingState != 0)
            {
                this.resetmappingData()
                await this.mappingData();
            }
            LoginInfo.info = null;
            this.ownerState = 2;
            const res = await tools.nnstool.setOwner(this.domainInfo[ "domain" ], this.ownerAddress);
            if (!res.err)
            {
                const txid = res.info;
                TaskManager.addTask(
                    new Task(ConfirmType.contract, txid, { domain: this.domainInfo[ 'domain' ], address: this.ownerAddress }),
                    TaskType.domainTransfer);
                this.domainEdit.put(this.domainInfo.domain, "watting", "domain_transfer");
                this.closeTranferDomain();
                this.openToast("success", "" + this.$t("myneoname.waitmsg2"), 5000);
            } else
            {
                this.ownerState = oldstate;
                this.openToast("error", "" + this.$t("errormsg.interface"), 3000);
                throw new Error("Transaction send failed");
            }
        } catch (error)
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
            this.resolverState = 2;
            let contract = this.set_contract.hexToBytes().reverse();
            let res = await tools.nnstool.setResolve(this.domainInfo[ "domain" ], contract);
            if (!res.err)
            {
                let txid = res.info;
                TaskManager.addTask(
                    new Task(ConfirmType.contract, txid, { domain: this.domainInfo[ 'domain' ], contract: this.set_contract }),
                    TaskType.domainResovle);
                this.domainEdit.put(this.domainInfo.domain, "watting", "resolver");
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
            this.mappingState = 2;
            let res = await tools.nnstool.setResolveData(this.domainInfo.domain, this.resolverAddress, this.domainInfo.resolver);
            if (!res.err)
            {
                let txid = res.info;
                TaskManager.addTask(
                    new Task(ConfirmType.contract, txid, { domain: this.domainInfo.domain, address: this.resolverAddress }),
                    TaskType.domainMapping);
                this.domainEdit.put(this.domainInfo.domain, { state: "watting", address: this.resolverAddress }, "mapping");
            } else
            {
                this.mappingState = oldstate;
                throw new Error("Transaction send failed");
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
        this.getAllNeoName(this.currentAddress);
    }

    /**
     * 映射状态效果
     * @param domain 域名
     */
    mappingTask(domain, address)
    {
        this.getAllNeoName(this.currentAddress);
        if (this.currentdomain == domain)
        {
            this.mappingState = 1;
            if (address)
            {
                this.resolverAddress = address;
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
        this.getAllNeoName(this.currentAddress);
    }
    /**
     * 筛选功能
     */
    selectSellDomain()
    {
        this.myDomainListPage.currentPage = 1;
        if (this.sellStatus == 'all')
        {
            this.myDomainListPage.totalCount = this.neonameList.length;
            this.showMydomainList = this.mydomainListByPage(this.neonameList);
        } else if (this.sellStatus == '0901')
        {
            let newList = [];
            Object.keys(this.neonameList).filter((keys: string) =>
            {
                if (this.neonameList[ keys ].state == '0901')
                {
                    newList.push(this.neonameList[ keys ]);
                    return true;
                }
                return false;
            })
            this.myDomainListPage.totalCount = newList.length;
            this.showMydomainList = this.mydomainListByPage(newList);
        } else
        {
            let newList = [];
            Object.keys(this.neonameList).filter((keys: string) =>
            {
                if (this.neonameList[ keys ].state != '0901')
                {
                    newList.push(this.neonameList[ keys ]);
                    return true;
                }
                return false;
            })
            this.myDomainListPage.totalCount = newList.length;
            this.showMydomainList = this.mydomainListByPage(newList);
        }
    }
    /**
     * 域名列表分页功能
     */
    mydomainListByPage(arrlist)
    {
        const startNum = this.myDomainListPage.pageSize * (this.myDomainListPage.currentPage - 1);
        const list = [ ...arrlist ];
        const result = list.slice(startNum, startNum + this.myDomainListPage.pageSize);
        return result;
    }
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
        this.showMydomainList = this.mydomainListByPage(this.neonameList);
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
        this.showMydomainList = this.mydomainListByPage(this.neonameList);
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
        this.showMydomainList = this.mydomainListByPage(this.neonameList);
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
        this.domainInfo = item;
        this.isShowSaleBox = !this.isShowSaleBox;
        this.currentdomain = item.domain;
        let domain = this.domainEdit.select(item.domain);
        this.domainSalePrice = '';
        if (domain)
        {
            if (domain[ 'sale' ] && domain[ 'sale' ] === 'watting')
            {
                this.onSaleState = 1;
            }
        } else
        {
            this.onSaleState = 0;
        }
    }
    /**
     * 关闭出售模块
     */
    closeSaleDialog()
    {
        this.domainSalePrice = "";
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
        if (/\./.test(this.domainSalePrice) && this.domainSalePrice.split('.')[ 1 ].length > 1)
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
            // this.resolverState = 2;
            let res = await tools.nnstool.saleDomain(this.domainInfo[ "domain" ], this.domainSalePrice);
            if (!res.err)
            {
                let txid = res.info;
                TaskManager.addTask(
                    new Task(ConfirmType.contract, txid, { domain: this.domainInfo[ 'domain' ], amount: this.domainSalePrice }),
                    TaskType.saleDomain);
                this.domainEdit.put(this.domainInfo.domain, "watting", "sale");
                this.closeSaleDialog();
                this.openToast("success", "" + this.$t("myneoname.waitmsg3"), 5000);
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
            let res = await tools.nnstool.unSaleDomain(this.domainInfo[ "domain" ]);
            if (!res.err)
            {
                let txid = res.info;
                TaskManager.addTask(
                    new Task(ConfirmType.contract, txid, { domain: this.domainInfo[ 'domain' ] }),
                    TaskType.unSaleDomain);
                this.domainEdit.put(this.domainInfo.domain, "watting", "unsale");
                this.closeUnSaleDialog();
                this.openToast("success", "" + this.$t("myneoname.waitmsg4"), 5000);
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
        this.domainInfo = item;
        this.isUnSaleBox = !this.isUnSaleBox;
        this.currentdomain = item.domain;
    }
    /**
     * 关闭出售模块
     */
    closeUnSaleDialog()
    {
        this.isUnSaleBox = !this.isUnSaleBox;
        this.onUnSaleState = 1;
    }
    /**
     * 获取域名已出售成功的列表
     * @param address 当前地址
     */
    async getSaleDomainList(address: string, first: boolean, pageUtil: PageUtil)
    {
        let res = null;
        if (first)
        {
            res = await tools.wwwtool.getHasBuyListByAddress("ASBhJFN3XiDu38EdEQyMY3N2XwGh1gd5WW", 'test', 1, 1);
        } else
        {
            res = await tools.wwwtool.getHasBuyListByAddress("ASBhJFN3XiDu38EdEQyMY3N2XwGh1gd5WW", 'test', pageUtil.currentPage, pageUtil.pageSize);
        }
        if (res)
        {
            if (first)
            {
                this.salePage = new PageUtil(res[ 0 ].count, 1)
            }
            this.saleOutDomainList = res[ 0 ].list.map((key) =>
            {
                const newObj = {
                    blockindex: key.blockindex,
                    fullDomain: key.fullDomain,
                    price: key.price,
                    blocktime: tools.timetool.getTime(key.blocktime)
                }
                return newObj;
            });
        } else
        {
            this.salePage = new PageUtil(0, 0);
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
}