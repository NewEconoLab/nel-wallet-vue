
/// <reference path="../../tools/number.d.ts"/>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { tools } from "../../tools/importpack";
import { LocalStoreTool, sessionStoreTool } from "../../tools/storagetool";
import { Process, LoginInfo, MyAuction, TaskType, ConfirmType, Task, DomainState } from "../../tools/entity";
import { TaskManager } from "../../tools/taskmanager";
@Component({
    components: {}
})
export default class AuctionInfo extends Vue
{
    domainAuctionInfo: MyAuction;
    address: string;
    myBidPrice: string;
    balanceOf: string;
    fee: number;
    remaining: number;
    session_bid: sessionStoreTool;
    session_recover: sessionStoreTool;
    session_getdomain: sessionStoreTool;
    refresh: sessionStoreTool;
    bidState: number;
    bidPrice: string;
    updatePrice: string;
    inputErrorCode: number;
    bidDetailList: any;
    currentpage: number;
    pagesize: number;
    state_getDomain: number;
    state_recover: number;
    btnShowmore: boolean;
    openToast: Function;
    process: Process;
    width: number;
    constructor()
    {
        super();
        this.address = LoginInfo.getCurrentAddress();
        this.domainAuctionInfo = new MyAuction();
        this.myBidPrice = "";
        this.updatePrice = "0";
        this.bidDetailList = [];
        this.currentpage = 1;
        this.pagesize = 5;
        this.inputErrorCode = 0;
        this.session_bid = new sessionStoreTool("bidSession");
        this.session_recover = new sessionStoreTool("recoverSession");
        this.session_getdomain = new sessionStoreTool("getDomainSession");
        this.fee = 0
        this.remaining = 0;
        this.balanceOf = '';
        this.bidState = 2;
        this.btnShowmore = true;
        this.fee = 0
        this.remaining = 0
        this.process = new Process(new Date().getTime());
        this.width = 0;
        this.state_getDomain = 0;
        this.state_recover = 0;
        this.bidPrice = "";

    }

    async mounted()
    {
        let auctionMsg = new tools.sessionstoretool("auctionPage");
        this.session_bid = new sessionStoreTool("bidSession");
        this.session_recover = new sessionStoreTool("recoverSession");
        this.session_getdomain = new sessionStoreTool("getDomainSession");
        this.refresh = new tools.sessionstoretool("refresh_auction");
        let domain = auctionMsg.select("domain");
        await this.init(domain);
        if (!this.domainAuctionInfo.endTime)
        {
            setInterval(() =>
            {
                this.refreshPage()
            }, 10000);
        }
    }

    async init(domain)
    {
        await tools.nnstool.initRootDomain("neo");
        await this.initAuctionInfo(domain);
        this.balanceOf = await tools.nnssell.getBalanceOf();

        this.fee = accMul(this.myBidPrice, 0.10);

        this.remaining = accSub(this.myBidPrice, this.fee);
        this.initProcess();

        this.bidDetailList = [];
        await this.getSessionBidDetail(domain);
        await this.getBidDetail(domain, 1, 5);
        let confirm_getDomain = this.session_getdomain.select(domain);
        let confirm_recover = this.session_recover.select(domain);
        let confirm_bid = this.session_bid.select(domain);
        if (confirm_recover)
        {
            let txid = confirm_recover[ "txid" ];
            let res = await tools.wwwtool.getrawtransaction(txid);
            if (!!res)
            {
                if (parseFloat(this.domainAuctionInfo.balanceOfSelling) == 0)
                {
                    this.state_recover = 2;
                }
            } else
            {
                this.state_recover = 1;
            }
        }
        if (confirm_getDomain)
        {
            let txid = confirm_getDomain[ "txid" ];
            let method = confirm_getDomain[ "method" ];
            this.rechargConfirm(txid, method, domain);
        }
        if (confirm_bid)
        {
            let txid = confirm_bid[ "txid" ];
            this.bid_confirm(txid, domain);
        }
    }

    async refreshPage()
    {
        let oldheight = this.refresh.select("height");
        let height = TaskManager.oldBlock.select('height');
        let bidlist = this.refresh.select("bidlist");
        let withdraw = this.refresh.select("withdraw");
        let topup = this.refresh.select("topup");

        if (oldheight)
        {
            if (oldheight < height)
            {
                setTimeout(() =>
                {
                    this.init(this.domainAuctionInfo.domain);
                    this.refresh.put("bidlist", false);
                    this.refresh.put("height", height);
                }, 8000);
            }
        } else
        {
            this.refresh.put("height", height);
        }

        if (bidlist)
        {
            await this.init(this.domainAuctionInfo.domain);
            this.refresh.put("bidlist", false);

        }
    }

    /**
     * 初始化时间轴
     */
    initProcess()
    {
        this.process = new Process(this.domainAuctionInfo.startAuctionTime);
        let currenttime = this.domainAuctionInfo.endTime > 0 ? this.domainAuctionInfo.endTime : new Date().getTime();
        let time = new Date(this.domainAuctionInfo.startAuctionTime).getTime();
        let oldtime = accSub(currenttime, this.domainAuctionInfo.startAuctionTime);
        let a: number = 0;
        switch (this.domainAuctionInfo.domainstate)
        {
            case DomainState.end1:  //第五天结束或者随机期结束
                this.process.state = "" + this.$t('auction.ended');
                a = accDiv(oldtime, 5 * 5 * 60 * 1000);
                break;
            case DomainState.end2:  //第三天结束
                this.process.state = "" + this.$t('auction.ended');
                a = accDiv(oldtime, 5 * 3 * 60 * 1000);
                this.process.timearr.length = 3;
                break;
            case DomainState.fixed:
                this.process.state = "" + this.$t('auction.fixedperiod');
                a = accDiv(oldtime, 5 * 3 * 60 * 1000);
                this.process.timearr.length = 3;
                break;
            case DomainState.random:
                this.process.state = "" + this.$t('auction.randomperiod');
                a = accDiv(oldtime, 5 * 5 * 60 * 1000);
                this.process.timearr.length = 5;
                break;
            default:
                break;
        }
        let width = a >= 1 ? 100 : accMul(a, 100);
        this.width = parseInt(width.toString());
    }

    /**
     * 初始化竞拍域名的详情状态信息
     */
    async initAuctionInfo(domain: string)
    {
        let info = await tools.nnssell.getSellingStateByDomain(domain);
        //获取状态
        let myauction = await tools.nnssell.getMyAuctionState(info);
        this.domainAuctionInfo = myauction;
        let balance = await tools.nnssell.getBalanceOfBid(info.id);
        this.domainAuctionInfo.balanceOfSelling = accDiv(balance.toString(), 100000000).toString();
        this.myBidPrice = this.domainAuctionInfo.balanceOfSelling;

        //判断竞拍是否结束
        if (this.domainAuctionInfo.auctionState == "0")
        {
            let stateMsg = undefined;
            try
            {
                let stateMsg = await tools.wwwtool.getDomainState(this.address, "0x" + this.domainAuctionInfo.id);
                this.myBidPrice = stateMsg[ "mybidprice" ];
            } catch (error)
            {
                this.myBidPrice = "0";
            }

            //判断在该域名下的竞拍金额是否大于零
            let compare = Neo.Fixed8.parse(this.domainAuctionInfo.balanceOfSelling).compareTo(Neo.Fixed8.Zero);
            this.domainAuctionInfo.receivedState = compare < 0 ? 0 : 1;
            this.state_getDomain = 0;
            this.state_recover = 0;
            if (compare == 0 && this.domainAuctionInfo.owner == this.address)
            {
                this.state_getDomain = 2;
                this.state_recover = 2;
            }
        }

        let mybidprice = !!this.myBidPrice && this.myBidPrice != '' ? this.myBidPrice : 0;
        this.updatePrice = mybidprice.toString();
    }

    /**
     * 加价验证
     */
    myBidInput()
    {
        let mybidprice = !!this.myBidPrice && this.myBidPrice != '' ? this.myBidPrice : 0;
        if (!!this.bidPrice)
        {
            if (/\./.test(this.bidPrice))
            {
                this.bidPrice = this.bidPrice.toString().substr(0, (this.bidPrice.toString().indexOf(".")) + 2);
            }
        }
        else   //校验失败
        {
            this.updatePrice = mybidprice.toString();
            this.bidState = 2;
            this.inputErrorCode = 2;
            return;
        }
        let bidPrice = Neo.Fixed8.parse(mybidprice + "");
        let balance = Neo.Fixed8.parse(!!this.balanceOf && this.balanceOf != '' ? this.balanceOf : '0');
        let sum = bidPrice.add(Neo.Fixed8.parse(this.bidPrice + ""));
        this.updatePrice = sum.toString();
        if (Neo.Fixed8.parse(this.updatePrice).compareTo(Neo.Fixed8.parse(this.domainAuctionInfo.maxPrice)) <= 0)
        {
            this.bidState = 2;
            // this.inputErrorCode = 1;
        } else
        {
            let result = balance.compareTo(sum);
            if (result < 0)
            {
                this.bidState = 2;
                this.inputErrorCode = 1;
            } else
            {
                this.bidState = 0;
                this.inputErrorCode = 0;
            }
        }
    }

    async getDomain()
    {
        this.state_getDomain = 1;
        let info = await tools.nnssell.getSellingStateByDomain(this.domainAuctionInfo.domain);
        if (!!info.balanceOfSelling && info.balanceOfSelling.compareTo(Neo.BigInteger.Zero) > 0)
        {
            let data1 = await tools.nnssell.bidSettlement(info.id.toString());
            let data2 = await tools.nnssell.collectDomain(info.id.toString());
            let res = await tools.wwwtool.rechargeandtransfer(data1, data2);
            let txid = res[ "txid" ];
            this.session_getdomain.put(this.domainAuctionInfo.domain, { txid, method: 1 });
            this.rechargConfirm(txid, 1, this.domainAuctionInfo.domain);
        } else
        {
            if (!!info.owner && ThinNeo.Helper.GetAddressFromScriptHash(info.owner) == this.address)
            {
                this.state_getDomain = 2;
                return;
            } else
            {
                let data = await tools.nnssell.collectDomain(info.id.toString());
                let res = await tools.wwwtool.api_postRawTransaction(data);
                let txid = res[ "txid" ];
                this.session_getdomain.put(this.domainAuctionInfo.domain, { txid, method: 2 });
                this.rechargConfirm(txid, 2, this.domainAuctionInfo.domain);
            }
        }

    }


    async rechargConfirm(txid: string, method: number, domain: string)
    {
        this.openToast = this.$refs.toast[ "isShow" ];
        let res = null;
        if (method == 1)
        {
            res = await tools.wwwtool.getrechargeandtransfer(txid)
            let code = res[ 'errCode' ];
            switch (code)
            {
                case '0000':
                    this.openToast("success", "" + this.$t("auction.successgetdomain"), 3000);
                    this.state_getDomain = 2;
                    this.session_getdomain.delete(domain);
                    return;
                case '3001':
                    this.openToast("error", "" + this.$t("auction.failgetdomain"), 3000);
                    this.state_getDomain = 1;
                    this.session_getdomain.delete(domain);
                    return;
                case '3002':
                    this.openToast("error", "" + this.$t("auction.failgetdomain"), 3000);
                    this.state_getDomain = 1;
                    this.session_getdomain.delete(domain);
                    return;
            }
            this.state_getDomain = 1;
        }
        if (method == 2)
        {
            res = await tools.wwwtool.getrawtransaction(txid);
            if (!!res)
            {
                this.openToast("success", "" + this.$t("auction.successgetdomain"), 3000);
                this.state_getDomain = 2;
                this.session_getdomain.delete(domain);
                return
            }
            this.state_getDomain = 1;
        }
        setTimeout(() =>
        {
            this.rechargConfirm(txid, method, domain);
        }, 5000)
        return;
    }

    async getSessionBidDetail(domain)
    {
        this.session_bid = new LocalStoreTool("bidSession");
        let bidlist = this.session_bid.select(domain);
        if (bidlist && Object.keys(bidlist).length > 0)
        {
            let arr = [];
            for (const key in bidlist)
            {
                if (bidlist.hasOwnProperty(key))
                {
                    const element = bidlist[ key ];
                    arr.push(element);
                }
            }
            // arr = arr.reverse();
            for (let n = 0; n < arr.length; n++)
            {
                if (n > 0)
                {
                    arr[ n ].amount = accAdd(parseFloat(arr[ n ].amount), parseFloat(arr[ n - 1 ].amount));
                }
            }
            arr = arr.reverse();
            for (const index in arr)
            {
                let i = parseInt(index);
                const amount = arr[ i ][ "amount" ];
                const txid = arr[ i ][ "txid" ];
                let txmsg = await tools.wwwtool.getrawtransaction(txid);
                if (txmsg)
                {
                    this.session_bid.delete(domain, txid);
                } else
                {
                    let bidmsg = { addPriceTime: "" + this.$t("auction.waitmsg1"), maxBuyer: '', maxPrice: '' };
                    this.bidDetailList.push(bidmsg)
                    bidmsg.maxBuyer = this.address;
                    bidmsg.maxPrice = accAdd(parseFloat(amount), parseFloat(this.myBidPrice ? this.myBidPrice : "0")).toString();
                }
            }
        }
    }

    /**
     * 时间轴列表
     * @param domain 域名
     * @param currentpage 当前地址
     * @param pagesize 分页条数
     */
    async getBidDetail(domain, currentpage, pagesize)
    {
        let res = await tools.wwwtool.api_getBidDetail(domain, currentpage, pagesize);
        if (res)
        {
            if (res[ 0 ].count < pagesize)
            {
                this.btnShowmore = false;
            }
            if (res[ 0 ].list.length < pagesize)
            {
                this.btnShowmore = false;
            }
            for (let i in res[ 0 ].list)
            {
                res[ 0 ].list[ i ].addPriceTime = tools.timetool.getTime(res[ 0 ].list[ i ].addPriceTime);
                this.bidDetailList.push(res[ 0 ].list[ i ]);
            }

        }
    }

    /**
     * 
     */
    async bidDomain()
    {
        this.openToast = this.$refs.toast[ "isShow" ];
        try
        {
            // this.bidState = 1;
            this.openToast("success", "" + this.$t("auction.waitmsg2"), 3000);
            let count = Neo.Fixed8.parse(this.bidPrice).getData().toNumber();
            let res = await tools.nnssell.raise(this.domainAuctionInfo.domain, count);
            let txid = res.info;
            let amount = this.bidPrice;
            this.session_bid.put(this.domainAuctionInfo.domain, { txid, amount }, txid);

            let oldBlock = new tools.sessionstoretool("block");
            let height = oldBlock.select('height');
            let task = new Task(
                height, ConfirmType.tranfer, res.info
            )
            tools.taskManager.addTask(task, TaskType.addPrice);
            this.bidPrice = "";
            this.bidState = 2;

            await this.getSessionBidDetail(this.domainAuctionInfo.domain);
            // this.bid_confirm(txid, this.domainAuctionInfo.domain);
        } catch (error)
        {
            console.log(error);

        }

    }

    async recoverSgas()
    {
        this.state_recover = 1;
        let id = this.domainAuctionInfo.id;
        let data = await tools.nnssell.bidSettlement(id);
        this.state_recover = 1;
        try
        {
            let res = await tools.wwwtool.api_postRawTransaction(data);
            if (res[ "txid" ])
            {
                let txid = res[ "txid" ];
                this.session_recover.put(this.domainAuctionInfo.domain, { txid });
                this.recoverConfirm(txid);
            }
        } catch (error)
        {

        }
    }

    async recoverConfirm(txid: string)
    {
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (!!res)
        {
            this.state_recover = 2;
        } else
        {
            this.state_recover = 1;
        }
    }

    /**
     * 加价信息确认
     * @param txid 交易id
     * @param domain 域名
     */
    async bid_confirm(txid: string, domain: string)
    {
        // this.openToast = this.$refs.toast[ "isShow" ];
        let session_bid = new tools.localstoretool("bidSession");
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (!!res)
        {
            session_bid.delete(domain, txid);
            let names = await tools.contract.getNotifyNames(txid);
            let have = names.includes("addprice");
            if (have)
            {
                this.openToast("success", "" + this.$t("auction.domainname") + domain + " ：" + "" + this.$t("auction.successbid"), 3000);
                return;
            }
            if (names.length == 0)
            {
                this.openToast("error", "" + this.$t("auction.domainname") + domain + " ：" + "" + this.$t("auction.failbid"), 3000);
                return;
            }
            if (names.includes("domainstate"))
            {
                this.openToast("error", "" + this.$t("auction.domainname") + domain + " ：" + "" + this.$t("auction.failbid2"), 3000);
            }
        } else
        {
            setTimeout(() =>
            {
                this.bid_confirm(txid, domain)
            }, 5000);
        }
    }


    getMoreBidDetail()
    {
        this.currentpage += 1;
        this.getBidDetail(this.domainAuctionInfo.domain, this.currentpage, this.pagesize);
    }
    onBack()
    {
        this.$emit('onBack');
    }
}