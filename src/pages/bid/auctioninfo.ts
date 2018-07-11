
/// <reference path="../../tools/number.d.ts"/>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Toast from "../../components/toast.vue";
import Spinner from "../../components/Spinner.vue";
import { tools } from "../../tools/importpack";
import { LocalStoreTool } from "../../tools/storagetool";
import { Process } from "../../tools/entity";
@Component({
    components: {
        "v-alert": Valert,
        "v-toast": Toast,
        "spinner-wrap": Spinner
    }
})
export default class AuctionInfo extends Vue
{
    address: string;
    myBidPrice: string;
    bidPrice: string;
    updatePrice: string;
    bidDetailList: any;
    currentpage: number;
    pagesize: number;
    state_getDomain: number;
    state_recover: number;
    session_bid: LocalStoreTool;
    session_recover: LocalStoreTool;
    session_getdomain: LocalStoreTool;
    btnShowmore: boolean;
    balanceOfSelling: number;
    balanceOf: string;
    fee: number;
    remaining: number;
    bidState: number;
    openToast: Function;
    process: Process;
    process_state: string;
    process_date: string;
    process_time: string;
    width: number;
    process_arr: Array<any>;
    @Prop() item: any;
    constructor()
    {
        super();
        this.address = tools.storagetool.getStorage("current-address");
        this.myBidPrice = "";
        this.updatePrice = !this.item.mybidprice ? 0 : this.item.mybidprice;
        this.bidDetailList = [];
        this.currentpage = 1;
        this.pagesize = 5;
        this.session_bid = new LocalStoreTool("bidSession");
        this.session_recover = new LocalStoreTool("recoverSession");
        this.session_getdomain = new LocalStoreTool("getDomainSession");
        this.fee = 0
        this.remaining = 0;
        this.balanceOfSelling = 0;
        this.balanceOf = '';
        this.bidState = 0;
        if (this.item.receivedState)
        {
            this.state_getDomain = 2;
            this.state_recover = 2;
        } else
        {
            this.state_getDomain = 0;
            this.state_recover = 0;
        }
        this.btnShowmore = true;
        this.fee = accMul(this.balanceOfSelling, 0.05);
        this.remaining = accSub(this.balanceOfSelling, this.fee);
        this.process = new Process(this.item.startAuctionTime);
        this.width = 0;
        this.process_state = "";
        this.process_date = "";
        this.process_time = "";
        this.process_arr = this.process.timearr;
        console.log(this.process_arr);

    }

    async mounted()
    {
        this.session_bid = new LocalStoreTool("bidSession");
        this.session_recover = new LocalStoreTool("recoverSession");
        this.session_getdomain = new LocalStoreTool("getDomainSession");
        this.getSessionBidDetail(this.item.domain);
        let stateMsg = {};
        try
        {
            let stateMsg = await tools.wwwtool.getDomainState(this.address, this.item.domain);
        } catch (error)
        {

        }
        this.balanceOf = await tools.nnssell.getBalanceOf();
        this.balanceOf = !!this.balanceOf && this.balanceOf != '' ? this.balanceOf : '0';
        this.item.maxBuyer = stateMsg[ "maxBuyer" ];
        this.item.maxPrice = stateMsg[ "maxPrice" ];
        this.balanceOfSelling = stateMsg[ "mybidprice" ];
        this.item.mybidprice = stateMsg[ "mybidprice" ];
        this.fee = accMul(this.balanceOfSelling, 0.10);
        this.remaining = accSub(this.balanceOfSelling, this.fee);
        if (!!this.item.startAuctionTime && this.item.startAuctionTime != '')
        {
            this.process = new Process(this.item.startAuctionTime);
            this.process_date = this.process.date;
            this.process_time = this.process.time;
            this.process_arr = this.process.timearr;
            if (this.item[ 'endblock' ] && this.item[ 'endblock' ] != '')
            {
                let currenttime = await tools.wwwtool.api_getBlockInfo(this.item.endblock);
                let time = new Date(this.item.startAuctionTime).getTime();
                let oldtime = accSub(currenttime, time);
                let a = accDiv(oldtime, 5 * 5 * 60 * 1000);
                let width = a >= 1 ? 100 : accMul(a, 100);
                this.width = width;
                this.process_state = "" + this.$t('auction.ended');
            } else
            {
                let currenttime = new Date().getTime()
                let time = new Date(this.item.startAuctionTime).getTime();
                let state = tools.nnssell.compareTime(time);
                console.log(this.process);

                this.process_state = state == 0 ? "" + this.$t('auction.ended') : state == 1 ? "" + this.$t('auction.fixedperiod') : "" + this.$t('auction.randomperiod');
                let oldtime = accSub(currenttime, time);
                let a = accDiv(parseFloat(oldtime), 5 * 5 * 60 * 1000);
                let width = a >= 1 ? 100 : accMul(parseFloat(a), 100);
                this.width = parseInt(width);
            }
        }

        await this.getBidDetail(this.item.domain, this.currentpage, this.pagesize);
        let confirm_getDomain = this.session_getdomain.select(this.item.domain);
        let confirm_recover = this.session_recover.select(this.item.domain);
        let confirm_bid = this.session_bid.select(this.item.domain);
        if (confirm_recover)
        {
            let txid = confirm_recover[ "txid" ];
            let res = await tools.wwwtool.getrawtransaction(txid);
            if (!!res)
            {
                if (this.balanceOfSelling == 0)
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
            this.rechargConfirm(txid, method, this.item.domain);
        }
        if (confirm_bid)
        {
            let txid = confirm_bid[ "txid" ];
            this.bid_confirm(txid, this.item.domain);
        }
    }

    myBidInput($event)
    {
        let price = $event.target.value;
        this.bidPrice = price;
        let res = this.checkInput(price);
        if (res)
        {
            let mybidprice = !!this.item.mybidprice && this.item.mybidprice != '' ? this.item.mybidprice : 0;
            let bidPrice = Neo.Fixed8.parse(mybidprice + "");
            let balance = Neo.Fixed8.parse(!!this.balanceOf && this.balanceOf != '' ? this.balanceOf : '0');
            let sum = bidPrice.add(Neo.Fixed8.parse(price + ""));
            this.updatePrice = sum.toString();

            let result = balance.compareTo(sum);
            if (result < 0)
            {
                this.bidState = 2;
            } else
            {
                this.bidState = 0;
            }
            //this.myBidPrice = ((parseFloat(this.item.mybidprice) + parseFloat(price)) * 10) /3 10;
            console.log(bidPrice + "+" + Neo.Fixed8.parse(price + ""));
            console.log(this.updatePrice)
        }

    }

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
        let info = await tools.nnssell.getSellingStateByDomain(this.item.domain);
        if (!!info.balanceOfSelling && info.balanceOfSelling.compareTo(Neo.BigInteger.Zero) > 0)
        {
            let data1 = tools.nnssell.endSelling(info.id.toString());
            let data2 = tools.nnssell.getsellingdomain(info.id.toString());
            let res = await tools.wwwtool.rechargeandtransfer(data1, data2);
            let txid = res[ "txid" ];
            this.session_getdomain.put(this.item.domain, { txid, method: 1 });
            this.rechargConfirm(txid, 1, this.item.domain);
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
                this.session_getdomain.put(this.item.domain, { txid, method: 2 });
                this.rechargConfirm(txid, 2, this.item.domain);
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

    async  getSessionBidDetail(domain)
    {

        this.session_bid = new LocalStoreTool("bidSession");
        let bidlist = this.session_bid.select(domain);
        if (bidlist && Object.keys(bidlist).length > 0)
        {
            console.log("-------------------------------排序前---------------------");
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
                    bidmsg.maxPrice = accAdd(parseFloat(amount), parseFloat(this.item.mybidprice ? this.item.mybidprice : 0));
                }
            }
        }
    }

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

    async bidDomain()
    {
        this.openToast = this.$refs.toast[ "isShow" ];
        try
        {
            // this.bidState = 1;
            let count = Neo.Fixed8.parse(this.bidPrice).getData().toNumber();
            let res = await tools.nnssell.addprice(this.item.domain, count);
            let txid = res.info;
            let amount = this.bidPrice;
            this.session_bid.put(this.item.domain, { txid, amount }, txid);
            this.openToast("success", "" + this.$t("auction.waitmsg2"), 3000);
            this.bid_confirm(txid, this.item.domain);
        } catch (error)
        {
            console.log(error);

        }

    }

    async recoverSgas()
    {
        this.state_recover = 1;
        let id = this.item.id;
        let data = tools.nnssell.endSelling(id);
        this.state_recover = 1;
        try
        {
            let res = await tools.wwwtool.api_postRawTransaction(data);
            if (res[ "txid" ])
            {
                let txid = res[ "txid" ];
                this.session_recover.put(this.item.domain, { txid });
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
        this.getBidDetail(this.item.domain, this.currentpage, this.pagesize);
    }
    onBack()
    {
        this.$emit('onBack');
    }
}