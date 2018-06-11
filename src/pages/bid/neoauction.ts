import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Spinner from "../../components/Spinner.vue";
import AuctionInfo from "./auctioninfo.vue";
import { tools } from "../../tools/importpack";
import { MyAuction } from "../../tools/entity";
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
    address: string;
    myAuctionList: MyAuction[] = [];
    domainInfo: MyAuction[] = [];
    domain: string;
    constructor()
    {
        super();
        this.auctionShow = false;
        this.auctionPage = false;
        this.myAuctionList = [];
        this.domainInfo = [];
        this.domain = "";
        // this.address = tools.storagetool.getStorage("current-address");
        this.address = 'AeYiwwjiy2nKXoGLDafoTXc1tGvfkTYQcM';
        this.getBidList(this.address);
    }

    async getBidList(address)
    {
        let res = await tools.wwwtool.api_getBidListByAddress(address);
        if (res)
        {
            for (let i in res)
            {
                res[ i ].startAuctionTime = tools.timetool.dateFtt("yyyy/MM/dd hh:mm:ss", new Date(res[ i ].startAuctionTime * 1000));
            }
            this.myAuctionList = res;
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

    openAuction()
    {
        tools.nnssell.getSellingStateByDomain(this.domain + ".neo");
        this.auctionShow = !this.auctionShow;
    }
}