
/// <reference path="../../tools/number.d.ts"/>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Toast from "../../components/toast.vue";
import Spinner from "../../components/Spinner.vue";
import { tools } from "../../tools/importpack";
import { LocalStoreTool } from "../../tools/storagetool";
import { Process, LoginInfo, MyAuction } from "../../tools/entity";
@Component({
    components: {
        "v-alert": Valert,
        "v-toast": Toast,
        "spinner-wrap": Spinner
    }
})
export default class AuctionInfo extends Vue
{
    domainAuctionInfo: MyAuction;
    address: string;
    myBidPrice: string;
    balanceOf: string;
    fee: number;
    remaining: number;
    session_bid: LocalStoreTool;
    session_recover: LocalStoreTool;
    session_getdomain: LocalStoreTool;
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
        this.session_bid = new LocalStoreTool("bidSession");
        this.session_recover = new LocalStoreTool("recoverSession");
        this.session_getdomain = new LocalStoreTool("getDomainSession");
        this.fee = 0
        this.remaining = 0;
        this.balanceOf = '';
        this.bidState = 0;
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
        this.session_bid = new LocalStoreTool("bidSession");
        this.session_recover = new LocalStoreTool("recoverSession");
        this.session_getdomain = new LocalStoreTool("getDomainSession");
        let domain = auctionMsg.select("domain");
        await tools.nnstool.initRootDomain("neo");
        await this.initAuctionInfo(domain);
        this.balanceOf = await tools.nnssell.getBalanceOf();
        await this.getSessionBidDetail(domain);

        this.fee = accMul(this.myBidPrice, 0.10);

        this.remaining = accSub(this.myBidPrice, this.fee);
        this.initProcess();

        await this.getBidDetail(domain, this.currentpage, this.pagesize);
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

    /**
     * 初始化时间轴
     */
    initProcess()
    {
        this.process = new Process(this.domainAuctionInfo.startAuctionTime);
        let currenttime = 0;
        if (this.domainAuctionInfo.endBlock > 0)
        {
            currenttime = accMul(this.domainAuctionInfo.endTime, 1000);
        } else
        {
            currenttime = new Date().getTime();
        }
        let time = new Date(this.domainAuctionInfo.startAuctionTime).getTime();
        switch (this.domainAuctionInfo.auctionState)
        {
            case "0":
                this.process.state = "" + this.$t('auction.ended');
                break;
            case "1":
                this.process.state = "" + this.$t('auction.fixedperiod');
                break;
            case "2":
                this.process.state = "" + this.$t('auction.randomperiod');
                break;
            default:
                break;
        }
        let oldtime = accSub(currenttime, time);
        let a = accDiv(oldtime, 5 * 5 * 60 * 1000);
        let width = a >= 1 ? 100 : accMul(a, 100);
        this.width = parseInt(width.toString());
    }

    /**
     * 初始化竞拍域名的详情状态信息
     */
    async initAuctionInfo(domain: string)
    {
        let info = await tools.nnssell.getSellingStateByDomain(domain);
        this.domainAuctionInfo.domain = domain
        this.domainAuctionInfo.id = info.id.toString();
        this.domainAuctionInfo.maxBuyer = !info.maxBuyer ? "" : ThinNeo.Helper.GetAddressFromScriptHash(info.maxBuyer);
        this.domainAuctionInfo.maxPrice = !info.maxPrice ? "" : accDiv(info.maxPrice.toString(), 100000000).toString();
        this.domainAuctionInfo.owner = !info.owner ? null : ThinNeo.Helper.GetAddressFromScriptHash(info.owner);
        //根据开标的区块高度获得开标的时间
        let startTime = await tools.wwwtool.api_getBlockInfo(parseInt(info.startBlockSelling.toString()));
        this.domainAuctionInfo.startAuctionTime = tools.timetool.dateFtt("yyyy/MM/dd hh:mm:ss", new Date(accMul(startTime, 1000)));
        let balance = await tools.nnssell.getBalanceOfSeling(info.id);
        this.domainAuctionInfo.balanceOfSelling = accDiv(balance.toString(), 100000000).toString();
        this.domainAuctionInfo.endBlock = parseInt(info.endBlock.toString())
        //判断是否已有结束竞拍的区块高度。如果结束区块大于零则状态为结束
        if (info.endBlock.compareTo(Neo.BigInteger.Zero) > 0)
        {
            this.domainAuctionInfo.auctionState = "0";
            this.domainAuctionInfo.endTime = await tools.wwwtool.api_getBlockInfo(parseInt(info.endBlock.toString()));
        } else
        { //对比时间获得状态 0:竞拍结束，1：正在竞拍，2:随机时间
            this.domainAuctionInfo.endTime = parseInt(info.startBlockSelling.multiply(1000).add(1500000).toString());
            let state = tools.nnssell.compareTime(startTime * 1000);
            switch (state)
            {
                case 0:
                    this.domainAuctionInfo.auctionState = "0"
                    break;
                case 1:
                    this.domainAuctionInfo.auctionState = "1";
                    break;
                case 2:
                    this.domainAuctionInfo.auctionState = "2";
                    break;
                default:
                    break;
            }
        }
        this.myBidPrice = this.domainAuctionInfo.balanceOfSelling;

        //判断竞拍是否结束
        if (this.domainAuctionInfo.auctionState == "0")
        {
            let stateMsg = await tools.wwwtool.getDomainState(this.address, domain);
            this.myBidPrice = stateMsg[ "mybidprice" ];

            //判断在该域名下的竞拍金额是否大于零
            let compare = Neo.Fixed8.parse(this.domainAuctionInfo.balanceOfSelling).compareTo(Neo.Fixed8.Zero);
            this.domainAuctionInfo.receivedState = compare < 0 ? 0 : 1;
            if (compare > 0)
            {
                this.state_getDomain = 0;
                this.state_recover = 0;
            } else
            {
                this.state_getDomain = 2;
                this.state_recover = 2;
            }
        }
    }

    /**
     * 加价验证
     */
    myBidInput()
    {
        let res = this.checkInput(this.bidPrice);
        if (res)
        {
            let mybidprice = !!this.myBidPrice && this.myBidPrice != '' ? this.myBidPrice : 0;
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
        } else
        {
            this.bidPrice = parseFloat((parseFloat(this.bidPrice)).toFixed(1)).toString();
        }

    }

    /**
     * 判断金额格式是否正确
     * @param price 加价金额
     */
    checkInput(price)
    {
        let reg = /^[0-9]+(.[0-9]{1})?$/;
        if (!reg.test(price))
        {
            return false;
        }
        return true;
    }

    async getDomain()
    {
        this.state_getDomain = 1;
        let info = await tools.nnssell.getSellingStateByDomain(this.domainAuctionInfo.domain);
        if (!!info.balanceOfSelling && info.balanceOfSelling.compareTo(Neo.BigInteger.Zero) > 0)
        {
            let data1 = tools.nnssell.endSelling(info.id.toString());
            let data2 = tools.nnssell.getsellingdomain(info.id.toString());
            let res = await tools.wwwtool.rechargeandtransfer(data1, data2);
            let txid = res[ "txid" ];
            this.session_getdomain.put(this.domainAuctionInfo.domain, { txid, method: 1 });
            this.rechargConfirm(txid, 1, this.domainAuctionInfo.domain);
        } else
        {
            if (!!info.owner && info.owner.toString() == this.address)
            {
                this.state_getDomain = 2;
                return;
            } else
            {
                let data = await tools.nnssell.getsellingdomain(info.id.toString());
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
            console.log(arr);
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
                res[ 0 ].list[ i ].addPriceTime = tools.timetool.dateFtt("yyyy/MM/dd hh:mm:ss", new Date(res[ 0 ].list[ i ].addPriceTime * 1000));
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
            let count = Neo.Fixed8.parse(this.bidPrice).getData().toNumber();
            let res = await tools.nnssell.addprice(this.domainAuctionInfo.domain, count);
            let txid = res.info;
            let amount = this.bidPrice;
            this.session_bid.put(this.domainAuctionInfo.domain, { txid, amount }, txid);
            this.openToast("success", "" + this.$t("auction.waitmsg2"), 3000);
            this.bid_confirm(txid, this.domainAuctionInfo.domain);
        } catch (error)
        {
            console.log(error);

        }

    }

    async recoverSgas()
    {
        this.state_recover = 1;
        let id = this.domainAuctionInfo.id;
        let data = tools.nnssell.endSelling(id);
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
        this.openToast = this.$refs.toast[ "isShow" ];
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