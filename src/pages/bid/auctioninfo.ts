
/// <reference path="../../tools/number.d.ts"/>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Toast from "../../components/toast.vue";
import Spinner from "../../components/Spinner.vue";
import { tools } from "../../tools/importpack";
import { LocalStoreTool } from "../../tools/storagetool";
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
    session_bid: LocalStoreTool
    btnShowmore: boolean;
    balanceOfSelling: number;
    fee: number;
    remaining: number;
    bidState: number;
    openToast: Function;
    @Prop() item: any;
    constructor()
    {
        super();
        this.address = tools.storagetool.getStorage("current-address");
        this.myBidPrice = "";
        this.updatePrice = "";
        this.bidDetailList = [];
        this.currentpage = 1;
        this.pagesize = 5;
        this.session_bid = new LocalStoreTool("bidSession");
        this.fee = 0
        this.remaining = 0;
        this.balanceOfSelling = 0;
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
        this.balanceOfSelling = this.item.mybidprice;
        this.fee = accMul(this.balanceOfSelling, 0.05);
        this.remaining = accSub(this.balanceOfSelling, this.fee);
        this.getBidDetail(this.item.domain, this.currentpage, this.pagesize);

    }

    mounted()
    {
        this.openToast = this.$refs.toast[ "isShow" ];
    }

    myBidInput($event)
    {
        let price = $event.target.value;
        this.bidPrice = price;
        let res = this.checkInput(price);
        if (res)
        {
            let bidPrice = Neo.Fixed8.parse(this.myBidPrice + "");

            let sum = bidPrice.add(Neo.Fixed8.parse(price + ""));
            this.updatePrice = sum.toString();
            //this.myBidPrice = ((parseFloat(this.item.mybidprice) + parseFloat(price)) * 10) / 10;
            console.log(bidPrice + "+" + Neo.Fixed8.parse(price + ""))
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
            this.rechargConfirm(res[ 'txid' ], 1)
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
                this.rechargConfirm(res[ "txid" ], 2);
            }
        }

    }


    async rechargConfirm(txid: string, method: number)
    {
        let res = null;
        if (method == 1)
        {
            res = await tools.wwwtool.getrechargeandtransfer(txid)
            let code = res[ 'errCode' ];
            switch (code)
            {
                case '0000':
                    this.openToast("success", "域名获取成功", 3000);
                    this.state_getDomain = 2;
                    return;
                case '3001':
                    this.state_getDomain = 1;
                    return;
                case '3002':
                    this.state_getDomain = 1;
                    return;
            }
        }
        if (method == 2)
        {
            res = await tools.wwwtool.getrawtransaction(txid);
            if (!!res)
            {
                this.openToast("success", "域名获取成功", 3000);
                this.state_getDomain = 2;
                return
            }
        }
        setTimeout(() =>
        {
            this.rechargConfirm(txid, method);
        }, 5000)
        return;
    }

    async getBidDetail(domain, currentpage, pagesize)
    {
        this.session_bid = new LocalStoreTool("bidSession");
        if (this.session_bid)
        {
            let bidlist = this.session_bid.select(domain);
            if (bidlist && Object.keys(bidlist).length > 0)
            {
                for (const index in bidlist)
                {
                    let i = parseInt(index);
                    const amount = bidlist[ i ][ "amount" ];
                    const txid = bidlist[ i ][ "txid" ];
                    let txmsg = await tools.wwwtool.getrawtransaction(txid);
                    if (txmsg)
                    {
                        this.session_bid.delete(domain, i);
                    } else
                    {
                        let nextBid = i == 0 ? parseFloat(this.bidDetailList[ i - 1 ][ 'maxPrice' ]) : 0;
                        let bidmsg = { addPriceTime: 'Waiting for confirmation', maxBuyer: '', maxPrice: '' };
                        this.bidDetailList.push(bidmsg)
                        bidmsg.maxBuyer = this.address;
                        bidmsg.maxPrice = (parseFloat(amount) + parseFloat(this.item.maxPrice) + nextBid).toString();

                    }
                }
            }
        }
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
        try
        {
            let count = Neo.Fixed8.parse(this.bidPrice).getData().toNumber();
            let res = await tools.nnssell.addprice(this.item.domain, count);
            let txid = res.info;
            let amount = this.bidPrice;
            this.session_bid.push(this.item.domain, { txid, amount });
            this.bid_confirm(txid);
        } catch (error)
        {
            console.log(error);

        }

    }

    async recoverSgas()
    {
        this.bidState = 1;
        let id = this.item.id;
        let data = tools.nnssell.endSelling(id);
        this.state_recover = 1;
        let res = await tools.wwwtool.api_postRawTransaction(data);
    }


    async bid_confirm(txid: string)
    {
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (!!res)
        {
            this.bidState = 0;
            return;
        }
        else
        {
            setTimeout(() =>
            {
                this.bid_confirm(txid);
            }, 5000)
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