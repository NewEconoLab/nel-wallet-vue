
/// <reference path="../../tools/number.d.ts"/>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { tools } from "../../tools/importpack";
import { sessionStoreTool } from "../../tools/storagetool";
import { Process, LoginInfo, MyAuction, TaskType, ConfirmType, Task, DomainState, TaskFunction } from "../../tools/entity";
import { TaskManager } from "../../tools/taskmanager";
import Store from "../../tools/StorageMap";
import { NeoaucionData } from "../../tools/datamodel/neoauctionDataModel";
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
    bidState: number;
    bidPrice: string;
    updatePrice: string;
    inputErrorCode: number;
    bidDetailList: any;
    currentpage: number;
    pagesize: number;
    isReceived: boolean;
    isGetDomainWait: boolean;
    isRecoverWait: boolean;
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
        this.fee = 0
        this.remaining = 0;
        this.balanceOf = '';
        this.bidState = 2;
        this.btnShowmore = false;
        this.fee = 0
        this.remaining = 0
        this.process = new Process(new Date().getTime());
        this.width = 0;
        this.bidPrice = "";
        this.isReceived = false;
        this.isGetDomainWait = false;
        this.isRecoverWait = false;

    }

    async mounted()
    {
        await this.init();
        if (this.domainAuctionInfo.auctionState != "0")
        {
            TaskManager.functionList = [];
            TaskManager.functionList.push(this.init);
        }
        TaskFunction.auctionStateUpdate = this.init;
    }

    async init()
    {
        let auctionMsg = new tools.sessionstoretool("auctionPage");
        let domain = auctionMsg.select("domain");
        await tools.nnstool.initRootDomain("neo");
        await this.initAuctionInfo(domain);
        this.balanceOf = await tools.nnssell.getBalanceOf();

        this.fee = accMul(this.myBidPrice, 0.10);

        this.remaining = accSub(this.myBidPrice, this.fee);
        this.initProcess();

        this.bidDetailList = [];
        await this.getSessionBidDetail(domain);
        this.currentpage = 1;
        await this.getBidDetail(this.domainAuctionInfo.id, this.currentpage, 5);
        let waitstate = Store.auctionInfo.select(domain);
        this.isGetDomainWait = !!waitstate && !!waitstate[ "isGetDomainWait" ];
        this.isRecoverWait = !!waitstate && !!waitstate[ "isRecoverWait" ];

    }

    /**
     * 初始化时间轴
     */
    initProcess()
    {
        this.process = new Process(this.domainAuctionInfo.startAuctionTime);
        let currenttime = this.domainAuctionInfo.endTime > 0 ? this.domainAuctionInfo.endTime : new Date().getTime();
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
            if (compare == 0 && this.domainAuctionInfo.owner == this.address)
            {
                this.isReceived = true;
            } else
            {
                this.isReceived = false;
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
        let height = Store.blockheight.select("height");
        let info = await tools.nnssell.getSellingStateByDomain(this.domainAuctionInfo.domain);
        if (!!info.balanceOfSelling && info.balanceOfSelling.compareTo(Neo.BigInteger.Zero) > 0)
        {
            let data1 = await tools.nnssell.bidSettlement(info.id.toString());
            let data2 = await tools.nnssell.collectDomain(info.id.toString());
            let res = await tools.wwwtool.rechargeandtransfer(data1, data2);
            let txid = res[ "txid" ];
            this.isGetDomainWait = true;
            Store.auctionInfo.put(this.domainAuctionInfo.domain, true, "isGetDomainWait");
            TaskManager.addTask(
                new Task(height, ConfirmType.recharge, txid, { domain: this.domainAuctionInfo.domain }),
                TaskType.getDomain
            )
        } else
        {
            if (!!info.owner && ThinNeo.Helper.GetAddressFromScriptHash(info.owner) == this.address)
            {
                this.isReceived = true;
                this.isGetDomainWait = false;
                return;
            } else
            {
                let data = await tools.nnssell.collectDomain(info.id.toString());
                if (!data)
                {
                    return;
                }
                let res = await tools.wwwtool.api_postRawTransaction(data);
                let txid = res[ "txid" ];
                Store.auctionInfo.put(this.domainAuctionInfo.domain, true, "isGetDomainWait");
                TaskManager.addTask(
                    new Task(height, ConfirmType.contract, txid, { domain: this.domainAuctionInfo.domain }),
                    TaskType.getDomain
                )
            }
        }

    }

    async getSessionBidDetail(domain)
    {
        let session_bid = new sessionStoreTool("bidSession");
        let bidlist = session_bid.select(domain);
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
                if (!txid)
                    break;
                let txmsg = await tools.wwwtool.getrawtransaction(txid);
                if (txmsg)
                {
                    session_bid.delete(domain, txid);
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
     * @param currentpage 当前页数
     * @param pagesize 分页条数
     */
    async getBidDetail(id, currentpage, pagesize)
    {
        let res = await tools.wwwtool.api_getBidDetail(id, currentpage, pagesize);
        if (res)
        {
            if (res[ 0 ].count < pagesize)
            {
                this.btnShowmore = false;
            } else
            {
                this.btnShowmore = true;
            }
            if (res[ 0 ].list.length < pagesize)
            {
                this.btnShowmore = false;
            } else
            {
                this.btnShowmore = true;
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
            let count = Neo.Fixed8.parse(this.bidPrice).getData().toNumber();
            let res = await tools.nnssell.raise(this.domainAuctionInfo.domain, count);
            if (!res.err)
                this.openToast("success", "" + this.$t("auction.waitmsg2"), 3000);
            let txid = res.info;
            let amount = this.bidPrice;
            NeoaucionData.setBidSession(this.domainAuctionInfo, this.bidPrice, txid);
            let height = Store.blockheight.select('height');
            let task = new Task(
                height, ConfirmType.contract, res.info, { domain: this.domainAuctionInfo.domain, amount }
            )
            tools.taskManager.addTask(task, TaskType.addPrice);
            this.bidPrice = "";
            this.bidState = 2;

            await this.getSessionBidDetail(this.domainAuctionInfo.domain);
        } catch (error)
        {
            console.log(error);
        }

    }

    async recoverSgas()
    {
        let id = this.domainAuctionInfo.id;
        let data = await tools.nnssell.bidSettlement(id);
        if (!data)
            return;
        try
        {
            let height = Store.blockheight.select("height")
            let res = await tools.wwwtool.api_postRawTransaction(data);
            if (res[ "txid" ])
            {
                this.isRecoverWait = true;
                let txid = res[ "txid" ];
                TaskManager.addTask(
                    new Task(height, ConfirmType.tranfer, txid, { domain: this.domainAuctionInfo.domain, amount: this.myBidPrice }),
                    TaskType.recoverSgas
                );
                Store.auctionInfo.put(this.domainAuctionInfo.domain, true, "isRecoverWait");
            }
        } catch (error)
        {

        }
    }

    getMoreBidDetail()
    {
        this.currentpage += 1;
        this.getBidDetail(this.domainAuctionInfo.id, this.currentpage, this.pagesize);
    }
    onBack()
    {
        this.$emit('onBack');
    }
}