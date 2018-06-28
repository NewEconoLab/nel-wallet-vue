import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Spinner from "../../components/Spinner.vue";
import Selected from "../../components/Selected.vue";
import AuctionInfo from "./auctioninfo.vue";
import Toast from "../../components/toast.vue";
import { tools } from "../../tools/importpack";
import { MyAuction, SellDomainInfo, LoginInfo, ResultItem, DataType } from "../../tools/entity";
import { NeoaucionData } from "../../tools/datamodel/neoauctionDataModel";
@Component({
    components: {
        "v-alert": Valert,
        "spinner-wrap": Spinner,
        "auction-info": AuctionInfo,
        "v-toast": Toast,
        "v-selected": Selected
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
    isshowToast: boolean;//是否显示toast
    regBalance: string;
    selectList: Object;
    alert_available: string;
    assetlist: object;
    alert_input: string;
    alert_selection: string;
    alert_toup_wait: number;
    openToast: Function;

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
        this.regBalance = '0';
        let SGas = tools.coinTool.id_SGAS.toString();
        let Gas = tools.coinTool.id_GAS;
        this.selectList = {}
        this.selectList[ Gas ] = "Gas"
        this.selectList[ SGas ] = "SGas";
        this.alert_available = "";
        this.assetlist = {};
        this.alert_input = "";
        this.alert_toup_wait = 0;

    }

    async mounted()
    {
        await tools.nnstool.initRootDomain("neo");
        this.regBalance = await tools.nnssell.getBalanceOf();
        this.assetlist = await NeoaucionData.getAssetBalance();
        this.openToast = this.$refs.toast[ "isShow" ];
    }

    async getBidList(address)
    {
        this.myAuctionList = await NeoaucionData.getBidList(address);
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

    async onSelect(key)
    {
        let str = (key == tools.coinTool.id_GAS ? this.assetlist[ key ] + " Gas" : this.assetlist[ key ] + " SGas");
        this.alert_available = str;
        this.alert_selection = key
    }

    verifToupAmount()
    {
        let amount = Neo.Fixed8.parse(this.alert_input);
        let balance = Neo.Fixed8.parse(this.assetlist[ this.alert_selection ] + "");
        if (balance.compareTo(amount) < 0)
        {
            this.alert_input = balance.toString();
        }
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
        // let data1 = tools.nnssell.rechargeReg(this.alert_myBid);
        let res = await tools.nnssell.addprice(this.auctionMsg_alert.domain, Neo.Fixed8.parse(this.alert_myBid).getData().toNumber());
        // let res = await tools.wwwtool.rechargeandtransfer(data1, data2);
        if (!res.err)
        {
            NeoaucionData.setBidSession(this.auctionMsg_alert, this.alert_myBid, res.info);
            // this.recharg_confirm(res[ "txid" ], this.auctionMsg_alert.domain);
        }
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
        NeoaucionData.setOpenSession(auction);
        await this.openAuction_confirm(res[ "info" ]);
        this.openToast("success", "开标成功请等待", 5000);
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
        let startBlock = state.startBlockSelling.toString()
        let startTime = await tools.wwwtool.api_getBlockInfo(parseInt(startBlock));
        let currentTime = new Date().getTime();
        let num = currentTime - startTime * 1000;
        sellstate ? (endstate ? this.btn_start = 3 : (num > 1500000 ? this.btn_start = 3 : this.btn_start = 2)) : this.btn_start = 1;

    }

    async gasToRecharge()
    {
        let session_gas = new tools.localstoretool("recharge-gas");
        let session_sgas = new tools.localstoretool("recharge-sas");
        let amount = this.alert_input;
        if (this.alert_selection == tools.coinTool.id_GAS)
        {
            let txid = await tools.nnssell.gasToRecharge(parseFloat(this.alert_input));
            session_gas.put(txid, amount);
            this.confirmRecharge(txid);
            if (txid)
            {
            }
            this.openToast("success", "Successesfully toped up ! 100 SGas will be in your auction account after 2 blocks are confirmed !", 4000);
            this.isTopUp = false;
        } else
        {
            try
            {
                let data = await tools.nnssell.rechargeReg(parseFloat(this.alert_input).toFixed(8));
                let res = await tools.wwwtool.api_postRawTransaction(data);
                let txid = res[ "txid" ];
                session_sgas.put(txid, amount);
                this.confirmRecharge_sgas(txid)
                this.openToast("success", "Successesfully toped up ! 100 SGas will be in your auction account after a block is confirmed !", 4000);
                this.isTopUp = false;
            } catch (error)
            {
                this.openToast("error", "Successesfully toped up ! 100 SGas will be in your auction account after a block is confirmed !", 4000);
            }
        }
    }


    async confirmRecharge(txid: string)
    {
        let res = await tools.wwwtool.getrechargeandtransfer(txid);
        if (res[ 'errCode' ] == '3003')
        {
            setTimeout(() =>
            {
                this.confirmRecharge(txid);
            }, 50000)
        } else
        {

        }
        console.log(res);
    }

    async confirmRecharge_sgas(txid: string)
    {
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (res)
        {

        } else
        {
            setTimeout(() =>
            {
                this.confirmRecharge(txid);
            }, 5000)
        }
        console.log(res);
    }


    // async recharg_confirm(txid: string, domain: string)
    // {
    //     /**
    //      * code:
    //      * 0000:成功
    //      * 3001:失败
    //      * 3002:中断
    //      * 3003:等待
    //      * 3004:Not find data
    //      */
    //     let res = await tools.wwwtool.getrechargeandtransfer(txid);
    //     let bidsession = new tools.localstoretool("bidInfo-" + domain);
    //     switch (res[ 'errCode' ])
    //     {
    //         case "0000":
    //             bidsession.delete(txid);
    //             break;
    //         case "3001":

    //             break;
    //         case "3002":

    //             break;
    //         case "3003":

    //             setTimeout(() =>
    //             {
    //                 this.recharg_confirm(txid, domain);
    //             }, 5000);

    //             break;
    //         default:
    //             break;
    //     }
    // }
}