import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Spinner from "../../components/Spinner.vue";
import AuctionInfo from "./auctioninfo.vue";
import { tools } from "../../tools/importpack";
import { MyAuction, SellDomainInfo, LoginInfo } from "../../tools/entity";
@Component({
    components: {
        "v-alert": Valert,
        "spinner-wrap": Spinner,
        "auction-info": AuctionInfo
    }
})
export default class NeoAuction extends Vue
{
    auctionShow: boolean; //竞拍弹框
    auctionPage: boolean;//竞拍查看详情，默认
    auctionMsg_alert: MyAuction;
    address: string;
    myAuctionList: MyAuction[] = [];
    domainInfo: MyAuction[] = [];
    domain: string;
    btn_start: number;
    constructor()
    {
        super();
        this.btn_start = 1;
        this.auctionShow = false;
        this.auctionPage = false;
        this.myAuctionList = [];
        this.domainInfo = [];
        this.domain = "";
        this.address = LoginInfo.getCurrentAddress();
        this.getBidList(this.address);

    }

    async mounted()
    {
        await tools.nnstool.initRootDomain("neo");
    }

    async getBidList(address)
    {
        let res = await tools.wwwtool.api_getBidListByAddress(address);
        let list = res[ 0 ][ "list" ];
        if (res)
        {
            for (let i in list)
            {
                list[ i ].startAuctionTime = tools.timetool.dateFtt("yyyy/MM/dd hh:mm:ss", new Date(list[ i ].startAuctionTime * 1000));
            }
            this.myAuctionList = list;
            console.log(this.myAuctionList);
        }
    }

    onGoBidInfo(item)
    {
        this.auctionPage = !this.auctionPage
        this.domainInfo = item;
    }

    onBack()
    {
        this.auctionPage = false;
    }

    async addBid()
    {
        let msg = await tools.nnssell.getSellingStateByDomain(this.domain + ".neo");
        let auction = new MyAuction();
        let time = await tools.wwwtool.api_getBlockInfo(msg.startBlockSelling.toInt32());
        auction.startAuctionTime = tools.timetool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(time * 1000));
        auction.maxBuyer = msg.maxBuyer.toString();
        auction.maxPrice = msg.maxPrice.toString();
        auction.domain = this.domain + ".neo";
        this.auctionMsg_alert = auction;
        this.auctionShow = !this.auctionShow;
    }

    async openAuction()
    {
        this.btn_start = 0;
        let res = await tools.nnssell.wantbuy(this.domain);
        let auction = new MyAuction();
        auction.domain = this.domain + ".neo";

        auction.startAuctionTime = tools.timetool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
        auction.auctionState = "watting";
        auction.maxPrice = "0";
        this.myAuctionList.unshift(auction)
        await this.openAuction_confirm(res[ "info" ]);
        // this.auctionShow = !this.auctionShow;
    }

    async openAuction_confirm(txid: string)
    {
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (!!res)
        {
            this.btn_start = 2;
            this.auctionShow = !this.auctionShow;
            return;
        }
        else
        {
            setTimeout(() =>
            {
                this.openAuction_confirm(txid);
            }, 5000)
        }
    }

    async queryDomainState()
    {
        let state: SellDomainInfo = await tools.nnssell.getSellingStateByDomain(this.domain + ".neo");
        let sellstate = (state.startBlockSelling.compareTo(Neo.BigInteger.Zero));
        let endstate = state.endBlock.compareTo(Neo.BigInteger.Zero);
        sellstate ? (endstate ? this.btn_start = 3 : this.btn_start = 2) : this.btn_start = 1;
    }

}