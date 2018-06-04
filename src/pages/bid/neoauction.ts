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
    constructor()
    {
        super();
        this.auctionShow = false;
        this.auctionPage = false;
        this.myAuctionList = [];
        this.domainInfo = [];
        this.address = tools.storagetool.getStorage("current-address");
        console.log(this.address)
        this.getBidList('AeYiwwjiy2nKXoGLDafoTXc1tGvfkTYQcM');
    }

    async getBidList(address)
    {
        let res = await tools.wwwtool.api_getBidListByAddress(address);
        console.log(res)
        if (res)
        {
            for (let i in res)
            {
                res[ i ].startAuctionTime = tools.timetool.dateFtt("yyyy/MM/dd hh:mm:ss", new Date(res[ i ].startAuctionTime * 1000));;
                console.log(res[ i ].startAuctionTime)
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
}