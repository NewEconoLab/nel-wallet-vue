
/// <reference path="../../tools/number.d.ts"/>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { tools } from "../../tools/importpack";
import { sessionStoreTool } from "../../tools/storagetool";
import { Process, LoginInfo, MyAuction, TaskType, ConfirmType, Task, DomainState, TaskFunction } from "../../tools/entity";
import { TaskManager } from "../../tools/taskmanager";
import Store from "../../tools/StorageMap";
import { NeoaucionData } from "../../tools/datamodel/neoauctionDataModel";
import { AuctionInfoView, auctionBtnState, Auction } from "../../entity/AuctionEntitys";
import { services } from "../../services/index";
@Component({
    components: {}
})
export default class AuctionInfo extends Vue
{
    auctionId: string;
    auctionInfo: AuctionInfoView;
    address: string;
    myBidPrice: string;
    balanceOf: string;
    fee: number;
    remaining: number;
    bidState: number;
    bidPrice: string;
    updatePrice: string;
    inputErrorCode: number;
    isReceived: boolean;
    isGetDomainWait: boolean;
    isRecoverWait: boolean;
    openToast: Function;

    constructor()
    {
        super();
        let auctionMsg = new tools.sessionstoretool("auctionPage");
        let id = auctionMsg.select("id");
        if (id)
        {
            this.auctionId = id;
            services.auctionInfo.auctionId = id;
            this.auctionInfo = services.auctionInfo.getAuctionInfo();
        }
        this.address = LoginInfo.getCurrentAddress();
        this.myBidPrice = "";
        this.updatePrice = "0";
        this.inputErrorCode = 0;
        this.fee = 0;
        this.remaining = 0;
        this.balanceOf = '';
        this.bidState = 2;
        this.fee = 0;
        this.remaining = 0;
        this.bidPrice = "";
        this.isReceived = false;
        this.isGetDomainWait = false;
        this.isRecoverWait = false;
        this.init()
    }

    async mounted()
    {
    }

    async init()
    {
        this.balanceOf = await tools.nnssell.getBalanceOf();
        this.fee = accMul(this.auctionInfo.addwho.totalValue, 0.10);
        this.remaining = accSub(this.auctionInfo.addwho.totalValue, this.fee);
        let waitstate = Store.auctionInfo.select(this.auctionInfo.domain);
        this.isGetDomainWait = !!waitstate && !!waitstate[ "isGetDomainWait" ];
        this.isRecoverWait = !!waitstate && !!waitstate[ "isRecoverWait" ];

    }

    /**
     * 加价验证
     */
    myBidInput()
    {
        let mybidprice = !!this.auctionInfo.addwho.totalValue ? this.auctionInfo.addwho.totalValue : 0;
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
        if (Neo.Fixed8.parse(this.updatePrice).compareTo(Neo.Fixed8.parse(this.auctionInfo.maxPrice + '')) <= 0)
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
        let info = await tools.nnssell.getSellingStateByDomain(this.auctionInfo.domain);
        if (!!info.balanceOfSelling && info.balanceOfSelling.compareTo(Neo.BigInteger.Zero) > 0)
        {
            let data1 = await tools.nnssell.bidSettlement(info.id.toString());
            let data2 = await tools.nnssell.collectDomain(info.id.toString());
            let res = await tools.wwwtool.rechargeandtransfer(data1, data2);
            let txid = res[ "txid" ];
            this.isGetDomainWait = true;
            Store.auctionInfo.put(this.auctionInfo.domain, true, "isGetDomainWait");
            TaskManager.addTask(
                new Task(ConfirmType.recharge, txid, { domain: this.auctionInfo.domain }),
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
                Store.auctionInfo.put(this.auctionInfo.domain, true, "isGetDomainWait");
                TaskManager.addTask(
                    new Task(ConfirmType.contract, txid, { domain: this.auctionInfo.domain }),
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
                    // this.bidDetailList.push(bidmsg)
                    bidmsg.maxBuyer = this.address;
                    bidmsg.maxPrice = accAdd(parseFloat(amount), parseFloat(this.myBidPrice ? this.myBidPrice : "0")).toString();
                }
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
            let count = parseFloat(this.bidPrice)
            let res = await services.auction.auctionRaise(this.auctionInfo.id, this.auctionInfo.domain, count);
            if (!res.err)
                this.openToast("success", "" + this.$t("auction.waitmsg2"), 3000);
            this.bidPrice = "";
            this.bidState = 2;
            // await this.getSessionBidDetail(this.auctionInfo.domain);
        } catch (error)
        {
            console.log(error);
        }

    }

    async recoverSgas()
    {
        let id = this.auctionId;
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
                    new Task(ConfirmType.tranfer, txid, { domain: this.auctionInfo.domain, amount: this.myBidPrice }),
                    TaskType.recoverSgas
                );
                Store.auctionInfo.put(this.auctionInfo.domain, true, "isRecoverWait");
            }
        } catch (error)
        {

        }
    }

    // getMoreBidDetail()
    // {
    //     this.currentpage += 1;
    //     this.getBidDetail(this.domainAuctionInfo.id, this.currentpage, this.pagesize);
    // }
    onBack()
    {
        this.$emit('onBack');
    }
}