import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Spinner from "../../components/Spinner.vue";
import AuctionInfo from "./auctioninfo.vue";
import { tools } from "../../tools/importpack";
import { MyAuction, SellDomainInfo, LoginInfo, ResultItem, DataType } from "../../tools/entity";
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
    alert_myBid: string;
    address: string;
    myAuctionList: MyAuction[] = [];
    domainInfo: MyAuction[] = [];
    domain: string;
    btn_start: number;
    isWithdraw: boolean;//退款
    isTopUp: boolean;//充值
    constructor()
    {
        super();
        this.btn_start = 1;
        this.auctionShow = false;
        this.auctionPage = false;
        this.auctionMsg_alert = new MyAuction();
        this.myAuctionList = [];
        this.domainInfo = [];
        this.domain = "";
        this.alert_myBid = "";
        this.address = LoginInfo.getCurrentAddress();
        this.getBidList(this.address);
        this.isWithdraw = false;
        this.isTopUp = false;
    }

    async mounted()
    {
        await tools.nnstool.initRootDomain("neo");
    }

    async getBidList(address)
    {
        let res = await tools.wwwtool.api_getBidListByAddress(address);
        let arr = [];
        let str = tools.storagetool.getStorage("auction-await");
        arr = !!str ? JSON.parse(str) as Array<MyAuction> : [];

        for (const key in arr)
        {
            if (arr.hasOwnProperty(key))
            {
                const element = arr[ key ];
                // var ret1 = list.find((value, index, arr) =>
                // {
                //     return value.domain == element.domain;
                // })
                // if (ret1)
                // {
                // }
                let domain = element[ "domain" ];
                let state = await tools.nnssell.getSellingStateByDomain(domain);
                if (state.startBlockSelling.toInt32())
                {
                    let time = await tools.wwwtool.api_getBlockInfo(state.startBlockSelling.toInt32());
                    arr[ key ].startAuctionTime = tools.timetool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(time * 1000));
                    arr[ key ].maxBuyer = state.maxBuyer ? ThinNeo.Helper.GetAddressFromScriptHash(state.maxBuyer) : null;
                    arr[ key ].maxPrice = state.maxPrice.toString();
                    arr[ key ].owner = state.owner ? state.owner.toString() : null;
                    let startTime = await tools.wwwtool.api_getBlockInfo(state.startBlockSelling.toInt32());
                    arr[ key ].auctionState = tools.nnssell.compareTime(startTime * 1000);

                    arr[ key ].auctionState = tools.nnssell.compareTime(arr[ key ].startAuctionTime * 1000);
                    if (arr[ key ].auctionState == 0)
                    {
                        arr[ key ][ "endedState" ] = arr[ key ].maxBuyer == this.address ? 1 : 2;
                    }
                    // arr[ key ].auctionState = status == 0 ? "Ended" : status == 1 ? "Fixed period" : "Random period";
                    // let sellstate = (state.startBlockSelling.compareTo(Neo.BigInteger.Zero));
                    // let endstate = state.endBlock.compareTo(Neo.BigInteger.Zero);

                }
                // arr[key].auctionState = 
            }
        }
        if (res)
        {
            let list = res[ 0 ][ "list" ] as Array<MyAuction>;
            for (let i in list)
            {
                list[ i ].auctionState = tools.nnssell.compareTime(list[ i ].startAuctionTime * 1000);
                list[ i ].startAuctionTime = tools.timetool.dateFtt("yyyy/MM/dd hh:mm:ss", new Date(list[ i ].startAuctionTime * 1000));
                if (list[ i ].auctionState == 0)
                {
                    list[ i ][ "endedState" ] = list[ i ].maxBuyer == this.address ? 1 : 2;
                }
                // list[ i ].auctionState = status == 0 ? "Ended" : status == 1 ? "Fixed period" : "Random period";
            }
            this.myAuctionList = arr.concat(list);

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
        auction.maxBuyer = msg.maxBuyer ? msg.maxBuyer.toString() : "";
        auction.maxPrice = msg.maxPrice.toString();
        auction.domain = this.domain + ".neo";
        let script2 = tools.contract.buildScript(
            tools.nnstool.root_neo.register,
            "balanceOfSelling",
            [ "(addr)" + this.address, "(hex256)" + msg.id.toString() ]
        );
        let res2 = await tools.wwwtool.rpc_getInvokescript(script2);
        let stack2 = ResultItem.FromJson(DataType.Array, res2[ "stack" ]).subItem[ 0 ];
        auction.balanceOfSelling = stack2.AsInteger().toString()

        this.auctionMsg_alert = auction;
        this.auctionShow = !this.auctionShow;
    }

    async bidDomain()
    {
        let res = await tools.nnssell.rechargeReg(this.alert_myBid);
        this.recharg_confirm(res.info);
    }

    async openAuction()
    {
        this.btn_start = 0;
        let res = await tools.nnssell.wantbuy(this.domain);
        let auction = new MyAuction();
        auction.domain = this.domain + ".neo";

        auction.startAuctionTime = tools.timetool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
        auction.auctionState = 3;
        auction.maxPrice = "0";
        this.myAuctionList.unshift(auction);
        console.log(JSON.stringify(auction));
        tools.storagetool.storageArrayPush("auction-await", auction);
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

    async recharg_confirm(txid: string)
    {
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (!!res)
        {
            console.log(res);

            tools.nnssell.addprice(this.auctionMsg_alert.domain, Neo.Fixed8.parse(this.alert_myBid).getData().toNumber());
            return;
        }
        else
        {
            setTimeout(() =>
            {
                this.recharg_confirm(txid);
            }, 5000)
        }
    }

    async queryDomainState()
    {
        let state: SellDomainInfo = await tools.nnssell.getSellingStateByDomain(this.domain + ".neo");
        let sellstate = (state.startBlockSelling.compareTo(Neo.BigInteger.Zero));
        let endstate = state.endBlock.compareTo(Neo.BigInteger.Zero);
        let startBlock = state.startBlockSelling.toString()
        let startTime = await tools.wwwtool.api_getBlockInfo(parseInt(startBlock));
        let currentTime = new Date().getTime();
        let num = currentTime - startTime * 1000;
        sellstate ? (endstate ? this.btn_start = 3 : (num > 1500000 ? this.btn_start = 3 : this.btn_start = 2)) : this.btn_start = 1;

    }

}