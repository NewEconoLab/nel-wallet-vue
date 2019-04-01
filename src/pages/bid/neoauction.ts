import Vue from "vue";
import { Component, Prop } from "vue-property-decorator"
import AuctionInfo from "./auctioninfo.vue";
import { tools } from "../../tools/importpack";
import { MyAuction, SellDomainInfo, LoginInfo, ResultItem, DataType, NeoAuction_Withdraw, NeoAuction_TopUp, Task, ConfirmType, TaskType, DomainState, TaskFunction, RootDomainInfo, DomainSaleInfo, PageUtil } from "../../tools/entity";
import { LocalStoreTool, sessionStoreTool } from "../../tools/storagetool";
import { TaskManager } from "../../tools/taskmanager";
import { Auction, AuctionView, AuctionState } from "../../entity/AuctionEntitys";
import { services } from "../../services/index";
import { ScrollTools } from "../../tools/documentTools";
@Component({
    components: {
        "auction-info": AuctionInfo
    }
})
export default class NeoAuction extends Vue
{
    auctionShow: boolean; //竞拍弹框
    auctionPage: boolean;//竞拍查看详情，默认false
    auctionMsg_alert: MyAuction;
    alert_myBid: string;
    address: string;
    domain: string;
    btn_start: number;
    isshowToast: boolean;//是否显示toast
    regBalance: string;
    selectList: Object;
    alert_available: string;
    sgasAvailable: number;
    alert_selection: string;
    alert_withdraw: NeoAuction_Withdraw;
    alert_TopUp: NeoAuction_TopUp;
    isTopup: boolean = false;//是否可充值
    isWithdraw: boolean = false;//是否可提取
    sessionWatting: sessionStoreTool;
    auctionPageSession: sessionStoreTool;
    raiseAuction: Auction;   //加价弹框使用的域名信息
    myBalanceOfSelling: string;
    canAdded: boolean;
    checkState: number;
    openToast: Function;
    isSearchTime: boolean;//是否为查询状态 false为未查询
    searchDomain: string;//查询域名
    searchAuctionList: MyAuction[] = [];
    auctionlist: AuctionView[];
    myAuctionPage: PageUtil;
    inputMyBidPage: string = '';//竞拍列表的翻页
    currentpage: number = 1;
    rootInfo: RootDomainInfo;
    checkBid: boolean = false;//检测账户是否有余额
    isShowSaleBox: boolean = false; // 是否显示购买弹筐
    saleDomainInfo: DomainSaleInfo; // 出售域名的详情
    isOKSale: boolean = true;//是否具备购买资格
    // nncAssetid: string = '0xfc732edee1efdf968c23c20a9628eaa5a6ccb934';//nnc资产id
    domainEdit: sessionStoreTool;
    isUnSaleBox: boolean = false;//下架弹筐
    tranConfirm: Function;
    itemList: Auction[];

    constructor()
    {
        super();
        this.btn_start = 4;
        this.auctionShow = false;
        this.auctionPage = false;
        this.auctionMsg_alert = new MyAuction();
        this.domain = "";
        this.alert_myBid = "";
        this.address = LoginInfo.getCurrentAddress();
        this.regBalance = '0';
        let SGas = tools.coinTool.id_SGAS.toString();
        let Gas = tools.coinTool.id_GAS;
        this.selectList = {}
        this.selectList[Gas] = "Gas"
        this.selectList[SGas] = "CGAS";
        this.alert_available = "";
        this.checkState = 0;
        this.alert_withdraw = new NeoAuction_Withdraw();
        this.alert_TopUp = new NeoAuction_TopUp();
        this.sessionWatting = new tools.sessionstoretool("session_watting");
        this.auctionPageSession = new tools.sessionstoretool("auctionPage");
        this.saleDomainInfo = null;

        if (services.auctionInfo_neo.auctionId)
        {
            this.auctionPage = true;
        } else
        {
            this.auctionPage = false;
        }
        this.canAdded = false;
        this.myBalanceOfSelling = "";
        this.isSearchTime = false;
        this.searchDomain = "";
        this.searchAuctionList = [];
        this.auctionlist = [];
        this.myAuctionPage = new PageUtil(0, 5);
        this.domainEdit = new sessionStoreTool("domain-edit");
        this.itemList = [];
    }

    async mounted()
    {
        this.tranConfirm = this.$refs.tranConfirm["open"];
        this.rootInfo = await tools.nnstool.getRootInfo("neo");
        this.regBalance = await tools.nnssell.getBalanceOf(this.address, this.rootInfo.register);
        this.openToast = this.$refs.toast["isShow"];
        this.getBidList(true);
        let nep5 = await tools.wwwtool.getnep5balanceofaddress(tools.coinTool.id_SGAS.toString(), LoginInfo.getCurrentAddress());
        this.sgasAvailable = nep5["nep5balance"];
        this.alert_available = this.sgasAvailable.toString() + " CGAS";
        TaskManager.functionList = [];
        TaskManager.functionList.push(this.refreshPage);
        TaskFunction.topup = this.topupStateRefresh;
        TaskFunction.withdraw = this.withdrawRefresh;
        // let scroll = new ScrollTools();
        // scroll.onScroll(bheight =>
        // {
        //     if (bheight < 20)
        //     {
        //         this.getBidList(this.address, this.currentpage++)
        //     }
        // })
    }
    async getBidList(isFirst: boolean)
    {
        let res = [];
        if (isFirst)
        {
            res = await tools.wwwtool.getauctioninfobyaddress(this.address, 1, this.myAuctionPage.pageSize, ".neo", this.searchDomain);
            if (res)
            {
                this.myAuctionPage = new PageUtil(res[0].count, 5);
            }
        } else
        {
            res = await tools.wwwtool.getauctioninfobyaddress(this.address, this.myAuctionPage.currentPage, this.myAuctionPage.pageSize, ".neo", this.searchDomain);
        }
        if (!res)
        {
            this.auctionlist = null;
            return false;
        }
        this.initListData(res[0].list);
    }

    async refreshPage()
    {
        this.regBalance = await tools.nnssell.getBalanceOf(this.address, this.rootInfo.register);
        let nep5 = await tools.wwwtool.getnep5balanceofaddress(tools.coinTool.id_SGAS.toString(), LoginInfo.getCurrentAddress());
        this.sgasAvailable = nep5["nep5balance"];
        await services.auction_neo.updateAuctionList(this.address);
        this.getBidList(false);
    }

    /**
     * 获得参与过竞拍的域名列表
     * @param address 地址
     */
    // async getBidList(address, page)
    // {
    //     this.auctionlist = await services.auction_neo.getMyAuctionList(address, page, 5);
    // }
    async initListData(res: any)
    {
        this.itemList = res;
        this.auctionlist = [];
        for (let index = 0; index < this.itemList.length; index++)
        {
            const auction = this.itemList[index];
            if (auction.auctionState != AuctionState.open)
            {
                if (auction.auctionState == AuctionState.end)
                {
                    if (auction.addwholist)
                    {
                        for (let i = 0; i < auction.addwholist.length; i++)
                        {
                            let who = auction.addwholist[i];
                            if (who.address == this.address)
                            {
                                auction.addWho = who;
                            }
                        }
                    }
                    if (auction.addWho)
                    {
                        let view = new AuctionView(auction);
                        this.auctionlist.push(view);
                    }
                }
                else
                {
                    let view = new AuctionView(auction);
                    this.auctionlist.push(view);
                }
            }
        }
    }
    /**
     * 竞拍列表上一页
     */
    myBidPrevious()
    {

        const current = this.myAuctionPage.currentPage;
        if (current - 1 <= 0)
        {
            return;
        }
        this.myAuctionPage.currentPage--;
        // this.showMydomainList = this.mydomainListByPage(this.neonameList);
        this.getBidList(false);
    }
    /**
     * 竞拍列表下一页
     */
    myBidNext()
    {
        const current = this.myAuctionPage.currentPage;
        if (current + 1 > this.myAuctionPage.totalPage)
        {
            return;
        }
        this.myAuctionPage.currentPage++;
        // this.showMydomainList = this.mydomainListByPage(this.neonameList);
        this.getBidList(false);
    }
    /**
     * 竞拍列表跳转输入
     */
    onInputMyBidPageChange = (event: any) =>
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
            this.inputMyBidPage = '';
            return false;
        }
        // 如果跳转页码小于0或者跳转页码大于页面总数，则中断
        if (value > this.myAuctionPage.totalPage)
        {
            return false
        }
        this.inputMyBidPage = event.target.value;
        return true;
    }
    /**
     * 竞拍列表翻页
     */
    goMyneoPage()
    {

        if (this.inputMyBidPage != '' && this.inputMyBidPage != '0')
        {
            this.pageToMyBid(this.inputMyBidPage);
        }
    }
    // 翻页跳转
    pageToMyBid(page: string)
    {
        let current = parseInt('' + page, 10);

        // 如果跳转页码小于0或者跳转页码大于页面总数，则中断
        if (current < 0 || current > this.myAuctionPage.totalPage)
        {
            return;
        }
        // 如果跳转页码等于当前页码，则中断
        if (current == this.myAuctionPage.currentPage)
        {
            return;
        }
        this.myAuctionPage.currentPage = current
        // this.showMydomainList = this.mydomainListByPage(this.neonameList);
        this.getBidList(false);
    }
    // 竞拍列表回车翻页
    onInputMyBidKeyDown(event: any)
    {
        if (event.keyCode === 13)
        {
            this.pageToMyBid(this.inputMyBidPage);
        }
    }
    async topupStateRefresh()
    {
        this.alert_TopUp.watting = false;
        this.sessionWatting.put("topup", false);
        let nep5 = await tools.wwwtool.getnep5balanceofaddress(tools.coinTool.id_SGAS.toString(), LoginInfo.getCurrentAddress());
        this.sgasAvailable = nep5["nep5balance"];
        this.alert_available = this.sgasAvailable + " CGAS";
    }

    async withdrawRefresh()
    {
        this.alert_withdraw.watting = false;
        this.sessionWatting.put("withdraw", false);
        let nep5 = await tools.wwwtool.getnep5balanceofaddress(tools.coinTool.id_SGAS.toString(), LoginInfo.getCurrentAddress());
        this.sgasAvailable = nep5["nep5balance"];
        this.alert_available = this.sgasAvailable + " CGAS";
    }

    /**
     * 显示竞拍详情
     * @param item 域名的竞拍信息
     */
    onGoBidInfo(item: AuctionView)
    {
        services.auctionInfo_neo.auctionId = item.id;
        let infoItem = this.itemList.filter((keys: Auction) =>
        {

            if (keys.auctionId == item.id)
            {
                return keys;
            }
            return false;
        })
        if (infoItem)
        {
            services.auctionInfo_neo.auctionInfo = infoItem[0];
        }
        this.auctionPage = true;
    }

    /**
     * 控制详情页的显示
     */
    onBack()
    {
        TaskManager.functionList = [];
        TaskManager.functionList.push(this.refreshPage);
        this.refreshPage()
        this.auctionPageSession.put('show', false);
        services.auctionInfo_neo.auctionInfo = null;
        services.auctionInfo_neo.auctionId = null;
        this.auctionPage = false;
    }

    /**
     * 验证充值金额
     */
    verifToupAmount()
    {
        if (parseFloat(this.alert_TopUp.input) > 0)
        {
            this.isTopup = true;
        }
        else
        {
            this.isTopup = false;
        }
        if (/\./.test(this.alert_TopUp.input))
        {
            this.alert_TopUp.input = this.alert_TopUp.input.toString().substr(0, (this.alert_TopUp.input.toString().indexOf(".")) + 9);
        }
        let amount = Neo.Fixed8.parse(this.alert_TopUp.input);
        let balance = Neo.Fixed8.parse(this.sgasAvailable + "");

        if (balance.compareTo(amount) <= 0)
        {
            this.alert_TopUp.input = balance.toString();
            this.alert_TopUp.error = true;
        }
        else
        {
            this.alert_TopUp.error = false;
        }
    }

    /**
     * 验证退款金额是否合法
     */
    verifWithdraw()
    {
        if (parseFloat(this.alert_withdraw.input) > 0)
        {
            this.isWithdraw = true;
        }
        else
        {
            this.isWithdraw = false;
        }
        if (/\./.test(this.alert_withdraw.input))
        {
            this.alert_withdraw.input = this.alert_withdraw.input.toString().substr(0, (this.alert_withdraw.input.toString().indexOf(".")) + 9);
        }
        let amount = Neo.Fixed8.parse(this.alert_withdraw.input);
        let balance = Neo.Fixed8.parse(this.regBalance);

        if (balance.compareTo(amount) <= 0)
        {
            this.alert_withdraw.input = balance.toString();
            this.alert_withdraw.error = true;
        }
        else
        {
            this.alert_withdraw.error = false;
        }
    }

    /**
     * 充值到注册器
     */
    async openTopUp()
    {
        let nep5 = await tools.wwwtool.getnep5balanceofaddress(tools.coinTool.id_SGAS.toString(), LoginInfo.getCurrentAddress());
        this.sgasAvailable = nep5["nep5balance"];
        this.alert_available = this.sgasAvailable + " CGAS";
        this.alert_TopUp.watting = this.sessionWatting.select("topup") ? true : false;
        this.alert_TopUp.isShow = true;
        this.alert_TopUp.input = "";
        this.alert_TopUp.error = false;
    }
    //获取所有可充值金额
    getAllTopup()
    {
        this.alert_TopUp.input = this.sgasAvailable.toString();
        if (this.sgasAvailable != 0)
        {
            this.isTopup = true;
        }
        else
        {
            this.isTopup = false;
        }
    }

    /**
     * 从注册器退币
     */
    async openWithdraw()
    {
        let nep5 = await tools.wwwtool.getnep5balanceofaddress(tools.coinTool.id_SGAS.toString(), LoginInfo.getCurrentAddress());
        this.sgasAvailable = nep5["nep5balance"];
        this.alert_available = this.sgasAvailable + " CGAS";
        this.alert_withdraw.watting = this.sessionWatting.select("withdraw") ? true : false;
        this.alert_withdraw.isShow = true;
        this.alert_withdraw.input = "";
        this.alert_withdraw.error = false;
    }
    //获取所有可提取金额
    getAllWithdraw()
    {
        this.alert_withdraw.input = this.regBalance;
        if (this.regBalance != "0")
        {
            this.isWithdraw = true;
        }
        else
        {
            this.isWithdraw = false;
        }
    }

    /**
     * 退回sgas
     */
    async withdraw()
    {
        let msgs = [
            { title: this.$t("confirm.withdrawTo"), value: this.$t("confirm.yourbalance") },
            { title: this.$t("confirm.withdrawAmount"), value: this.alert_withdraw.input + " CGAS" }
        ]
        let confirmres = await this.tranConfirm(this.$t("confirm.withdrawConfirm"), msgs);
        if (confirmres)
        {
            let amount = parseFloat(this.alert_withdraw.input);
            this.alert_withdraw.watting = true;
            let res = await tools.nnssell.getMoneyBack(amount, this.rootInfo.register);
            if (!res.err)
            {
                this.openToast("success", amount + "" + this.$t("auction.successwithdraw2"), 4000);
                this.sessionWatting.put("withdraw", true);
                this.alert_withdraw.isShow = false;

                //任务管理器
                let task = new Task(ConfirmType.tranfer, res.info, { amount })
                tools.taskManager.addTask(task, TaskType.withdraw);
            }
        }
    }

    /**
     * gas->sgas->充值注册器
     */
    async toRecharge()
    {
        let amount = this.alert_TopUp.input;
        try
        {
            let msgs = [
                { title: this.$t("confirm.topupTo"), value: this.$t("confirm.auctionAccount") },
                { title: this.$t("confirm.topupAmount"), value: amount + " CGAS" }
            ]
            let confirmres = await this.tranConfirm(this.$t("confirm.topupConfrim"), msgs);
            if (confirmres)
            {
                let data = await tools.nnssell.rechargeReg(parseFloat(this.alert_TopUp.input).toFixed(8), this.rootInfo.register);
                let res = await tools.wwwtool.api_postRawTransaction(data);
                this.alert_TopUp.watting = true;
                let txid = res["txid"];
                this.sessionWatting.put("topup", true);
                //任务管理器
                let task = new Task(ConfirmType.tranfer, txid, { amount })
                tools.taskManager.addTask(task, TaskType.topup);

                this.openToast("success", "" + this.$t("auction.successtopup") + amount + "" + this.$t("auction.successtopup3"), 4000);
                this.alert_TopUp.isShow = false;
            }
            else
            {
                return;
            }
        }
        catch (error)
        {
            this.openToast("error", "" + this.$t("auction.fail"), 4000);
        }
    }

    /**
     * 显示加价弹框
     */
    async addBid()
    {
        let msg = await tools.nnssell.getSellingStateByDomain(this.domain, this.rootInfo);
        this.raiseAuction = await tools.nnssell.getAuctionByStateInfo(msg);
        this.myBalanceOfSelling = (this.raiseAuction.addWho && this.raiseAuction.addWho.totalValue) ? this.raiseAuction.addWho.totalValue.toString() : "0";
        this.auctionShow = !this.auctionShow;
        this.alert_myBid = "";
    }

    verifBidAmount()
    {
        this.checkBid = false;
        if (!!this.alert_myBid)
        {
            if (/\./.test(this.alert_myBid))
            {
                this.alert_myBid = this.alert_myBid.toString().substr(0, (this.alert_myBid.toString().indexOf(".")) + 2);
            }
        }
        let myBid = !!this.alert_myBid ? parseFloat(this.alert_myBid) : 0;

        if (parseFloat(this.regBalance) < myBid)
        {
            this.canAdded = false;
            this.alert_myBid = this.regBalance;
            myBid = parseFloat(this.regBalance);
        }
        if (this.regBalance == '0')
        {
            this.checkBid = true;
            return false
        }
        let amount = accAdd(this.raiseAuction.addWho.totalValue, myBid);
        this.myBalanceOfSelling = amount.toString();
        if (amount > this.raiseAuction.maxPrice)
        {
            this.canAdded = true;
        }
        else
        { this.canAdded = false; }
    }

    /**
     * 加价
     */
    async bidDomain()
    {
        if (this.canAdded)
        {
            this.canAdded = false;
            if (this.alert_myBid == "")
            {
                return false;
            }
            try
            {
                let msgs = [
                    { title: this.$t("confirm.domain"), value: this.raiseAuction.fulldomain },
                    { title: this.$t("confirm.bidPrice"), value: this.alert_myBid + " CGAS" }
                ]
                let confirmres = await this.tranConfirm(this.$t("confirm.bidConfirm"), msgs);
                if (confirmres)
                {
                    let res = await services.auction_neo.auctionRaise(
                        this.raiseAuction.auctionId,
                        this.raiseAuction.fulldomain,
                        parseFloat(this.alert_myBid),
                        this.rootInfo.register);
                    if (!res.err)
                    {
                        this.canAdded = true;
                        this.openToast("success", this.alert_myBid + this.$t("auction.successbid2"), 3000);
                        this.auctionShow = !this.auctionShow;
                        this.alert_myBid = "";
                    }
                    else
                    {
                        this.canAdded = true;
                    }
                }
                else
                {
                    this.canAdded = true;
                }

            } catch (error)
            {
                this.canAdded = true;
            }
        }
    }

    /**
     * 开标
     */
    async openAuction()
    {
        if (!this.domain || !this.domain.length)
        {
            this.btn_start = 4;
            this.checkState = 0;
            return;
        } else
        {

            let msgs = [
                { title: this.$t("confirm.domain"), value: this.domain + "." + this.rootInfo.rootname },
            ]
            let confirmres = await this.tranConfirm(this.$t("confirm.startAuctionConfirm"), msgs);
            if (confirmres)
            {
                this.btn_start = 0;
                let res = await services.auction_neo.startAuction(this.domain);
                this.btn_start = 1;
                this.domain = "";
                this.checkState = 0;
                if (!res)
                {
                    return false;
                }
                this.openToast("success", "" + this.$t("auction.sendingmsg"), 3000);

            }
        }
    }

    /**
     * 查询域名状态
     */
    async queryDomainState()
    {
        //返回加载列表
        this.searchDomain = "";
        this.isSearchTime = false;

        if (!this.domain || !this.domain.length)
        {
            this.btn_start = 4;
            this.checkState = 0;
            return;
        }
        this.domain = this.domain.toLowerCase();
        this.domain = this.domain.trim();
        let verify = /^[a-zA-Z0-9]{2,32}$/;
        if (!verify.test(this.domain))
        {
            this.checkState = this.btn_start = 4;
            return;
        }
        const domainName = this.domain + ".neo"
        let searchResult = await tools.wwwtool.searchDomainStatus(domainName);

        if (!searchResult)
        {
            this.btn_start = 1;
            this.checkState = 1;
            return false;
        }
        // btn_start 0为开标中，1为可开标，2为可加价，3为结束期，4为输入域名错误，5为上架状态
        switch (searchResult[0].state)
        {
            case AuctionState.pass:
                this.checkState = this.btn_start = 1;
                break;
            case AuctionState.expire:
                this.checkState = this.btn_start = 1;
                break;
            case AuctionState.end:
                this.checkState = this.btn_start = 3;
                break;
            case AuctionState.random:
                this.checkState = this.btn_start = 2;
                break;
            case AuctionState.fixed:
                this.checkState = this.btn_start = 2;
                break;
            case AuctionState.old:
                this.checkState = this.btn_start = 1;
                break;
            case AuctionState.sale:
                this.checkState = this.btn_start = 5;
                break;
            case AuctionState.open:
                this.checkState = this.btn_start = 1;
                break;
            case AuctionState.watting:
                this.checkState = this.btn_start = 0;
                break;
            default:
                break;
        }
    }

    /**
     * 查询域名的输入框
     */
    async searchDomainInput()
    {
        if (this.searchDomain.length === 0)
        {
            this.isSearchTime = false;
            this.getBidList(true);
        }
    }
    /**
     * 查询域名
     */
    async doSearchDomain()
    {
        if (this.searchDomain.length)
        {
            this.isSearchTime = true;
            this.getBidList(true);
        }
        else
        {
            this.isSearchTime = false;
        }
    }
    /**
     * 获取域名购买信息
     */
    async toShowSaleBox()
    {
        this.isShowSaleBox = !this.isShowSaleBox;
        let domainName = this.domain + '.neo';
        let res = await tools.wwwtool.getSaleDomainInfo(domainName);
        if (res)
        {
            this.saleDomainInfo = {
                domain: res.domain,
                owner: res.owner,
                ttl: tools.timetool.getTime(res.ttl),
                price: res.price,
                state: res.state
            }
        }
        this.getNNCAmount();

    }
    /**
     * 获取地址nnc余额
     */
    async getNNCAmount()
    {
        let res = await tools.wwwtool.getnep5balanceofaddress(tools.coinTool.id_NNC.toString(), this.address);
        if (res)
        {
            // this.nncAmount = res.nep5balance;
            const salePrice = parseFloat(this.saleDomainInfo.price);
            const nnc = parseFloat(res.nep5balance);
            if (salePrice > nnc)
            {
                this.isOKSale = false;
            } else
            {
                this.isOKSale = true;
            }

        }
        else
        {
            this.isOKSale = false;
        }
    }
    /**
     * 购买域名
     */
    async toBuyDomain()
    {
        try
        {
            let msgs = [
                { title: this.$t('confirm.domain'), value: this.saleDomainInfo.domain },
                { title: this.$t('confirm.price'), value: this.saleDomainInfo.price + " NNC" },
                { title: this.$t('confirm.expirationTime'), value: this.saleDomainInfo.ttl }
            ]
            let confirmres = await this.tranConfirm(this.$t("confirm.purchaseConfirm"), msgs);
            if (confirmres)
            {
                this.isShowSaleBox = false;
                this.domain = '';
                this.checkState = this.btn_start = 1;
                let res = await services.buyAuction_neo.domainBuy(this.saleDomainInfo.domain, this.saleDomainInfo.price);
                if (res)
                {
                    this.openToast("success", "" + this.$t("auction.waitmsg3"), 5000);
                } else
                {
                    this.openToast("error", "" + this.$t("auction.waitmsg3"), 5000);
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
        this.domain = '';
        this.checkState = this.btn_start = 1;
        try
        {
            let msgs = [
                { title: this.$t("confirm.domain"), value: this.saleDomainInfo.domain }
            ]
            let confirmres = await this.tranConfirm(this.$t("confirm.delistingConfirm"), msgs);
            if (confirmres)
            {
                let res = await tools.nnstool.unSaleDomain(this.saleDomainInfo.domain);
                if (!res.err)
                {
                    let txid = res.info;
                    TaskManager.addTask(
                        new Task(ConfirmType.contract, txid, { domain: this.saleDomainInfo.domain }),
                        TaskType.unSaleDomain);
                    this.domainEdit.put(this.saleDomainInfo.domain, "watting", "unsale");
                    this.isShowSaleBox = !this.isShowSaleBox;
                    this.isUnSaleBox = !this.isUnSaleBox;
                    this.openToast("success", "" + this.$t("myneoname.waitmsg4"), 5000);
                }
            }
        } catch (error)
        {
            // this.resolverState = oldstate;
        }
    }
}