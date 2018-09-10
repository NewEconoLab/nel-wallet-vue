
/// <reference path="../../tools/number.d.ts"/>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { tools } from "../../tools/importpack";
import { LoginInfo, TaskType, ConfirmType, Task, TaskFunction, RootDomainInfo } from "../../tools/entity";
import { TaskManager } from "../../tools/taskmanager";
import Store from "../../tools/StorageMap";
import { AuctionInfoView, AuctionState, auctionBtnState } from "../../entity/AuctionEntitys";
import { services } from "../../services/index";
import { store } from "../../store/index";
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
    rootInfo: RootDomainInfo
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
        if (services.auctionInfo_neo.auctionId)
        {
            this.auctionId = services.auctionInfo_neo.auctionId;
            this.auctionInfo = services.auctionInfo_neo.getAuctionInfo();
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
    }

    async mounted()
    {
        this.rootInfo = await tools.nnstool.getRootInfo("neo");
        this.init();
        if
        (
            this.auctionInfo.btnState != auctionBtnState.receivedname
            &&
            this.auctionInfo.btnState != auctionBtnState.receivedsgas
        )
        {
            TaskFunction.auctionStateUpdate = this.init;
        }
    }

    async init()
    {
        if (services.auctionInfo_neo.auctionId)
        {
            this.auctionId = services.auctionInfo_neo.auctionId;
            this.auctionInfo = services.auctionInfo_neo.getAuctionInfo();
        }
        this.balanceOf = await tools.nnssell.getBalanceOf(this.address, this.rootInfo.register);
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
        if (Neo.Fixed8.parse(this.updatePrice).compareTo(Neo.Fixed8.parse((this.auctionInfo.maxPrice ? this.auctionInfo.maxPrice : 0) + '')) <= 0)
        {
            this.bidState = 2;
        }
        else
        {
            let result = balance.compareTo(Neo.Fixed8.parse(this.bidPrice + ""));
            if (result < 0)
            {
                this.bidState = 2;
                this.inputErrorCode = 1;
            }
            else
            {
                this.bidState = 0;
                this.inputErrorCode = 0;
            }
        }
    }

    /**
     * 领取域名
     */
    async getDomain()
    {
        if (this.auctionInfo.addwho.accountTime && this.auctionInfo.addwho.accountTime.blockindex > 0)
        {
            let data = await tools.nnssell.collectDomain(this.auctionInfo.id.toString(), this.rootInfo.register);
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
        else
        {
            let data1 = await tools.nnssell.bidSettlement(this.auctionInfo.id.toString(), this.rootInfo.register);
            let data2 = await tools.nnssell.collectDomain(this.auctionInfo.id.toString(), this.rootInfo.register);
            let res = await tools.wwwtool.rechargeandtransfer(data1, data2);
            let txid = res[ "txid" ];
            this.isGetDomainWait = true;
            Store.auctionInfo.put(this.auctionInfo.domain, true, "isGetDomainWait");
            TaskManager.addTask(
                new Task(ConfirmType.recharge, txid, { domain: this.auctionInfo.domain }),
                TaskType.getDomain
            )
        }
    }


    /**
     * 11·
     */
    async bidDomain()
    {
        this.openToast = this.$refs.toast[ "isShow" ];
        try
        {
            let count = parseFloat(this.bidPrice)
            let res = await services.auction_neo.auctionRaise(this.auctionInfo.id, this.auctionInfo.domain, count, this.rootInfo.register);
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

    /**
     * 退回sgas
     */
    async recoverSgas()
    {
        let id = this.auctionId;
        let data = await tools.nnssell.bidSettlement(id, this.rootInfo.register);
        if (!data)
            return;
        try
        {
            let res = await tools.wwwtool.api_postRawTransaction(data);
            if (res[ "txid" ])
            {
                this.isRecoverWait = true;
                let txid = res[ "txid" ];
                TaskManager.addTask(
                    new Task(ConfirmType.tranfer, txid, { domain: this.auctionInfo.domain, amount: this.auctionInfo.addwho.totalValue }),
                    TaskType.recoverSgas
                );
                Store.auctionInfo.put(this.auctionInfo.domain, true, "isRecoverWait");
            }
        }
        catch (error)
        {

        }
    }

    onBack()
    {
        this.$emit('onBack');
    }
}