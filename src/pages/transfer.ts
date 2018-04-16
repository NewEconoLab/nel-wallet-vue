import { WWW } from '../tools/wwwtool';
import { CoinTool } from '../tools/cointool';
import { neotools } from '../tools/neotools';
import { LoginInfo, BalanceInfo, Result, NeoAsset, Transactionforaddr, Transaction, History } from './../tools/entity';
import { StorageTool } from '../tools/storagetool';
import WalletLayout from "../layouts/wallet.vue";
import axios from "axios"
import Vue from "vue";
import Component from "vue-class-component";
import { DateTool } from '../tools/timetool';

declare const mui;
@Component({
    components: {
        "wallet-layout": WalletLayout
    }
})
export default class transfer extends Vue 
{
    targetaddr: string;
    amount: string;
    asset: string;
    balances: BalanceInfo[] = [];
    balance: BalanceInfo = new BalanceInfo();
    addrerr: string = "";
    amounterr: string = "";
    txs: History[] = [];
    constructor() 
    {
        super();
        this.targetaddr = "";
        this.amount = "";
        this.asset = "";
        CoinTool.initAllAsset();
    }
    mounted() 
    {
        // var str = StorageTool.getStorage("balances_asset");
        // if (str == null)
        //     this.balances = new Array<BalanceInfo>();
        // else
        // {
        //     this.balances = JSON.parse(str) as BalanceInfo[];
        //     var choose = StorageTool.getStorage("transfer_choose");
        //     this.asset = (choose == null ? this.balances[ 0 ].asset : choose);
        //     var n: number = this.balances.findIndex(b => b.asset == this.asset);
        //     this.balance = this.balances[ n ];
        //     this.history();
        // }
        this.history();
    }
    choose(assetid: string)
    {
        this.asset = assetid
        StorageTool.setStorage("transfer_choose", assetid);
        var n: number = this.balances.findIndex(b => b.asset == this.asset);
        this.balance = this.balances[ n ];
    }
    verify_addr()
    {
        if (neotools.verifyPublicKey(this.targetaddr)) this.addrerr = 'false';
        else this.addrerr = 'true';
    }
    verify_Amount()
    {

    }
    async send()
    {
        try
        {
            var res: Result = await CoinTool.rawTransaction(this.targetaddr, this.asset, this.amount);
            mui.toast(res.info);
        } catch (error)
        {
            mui.alert("-_-!!!You don't have enough change, you have to wait for the block height to change before you can make the next transaction ");
        }
    }
    async history()
    {
        var address = "ARFe4mTKRTETerRoMsyzBXoPt2EKBvBXFX";
        var res = await WWW.api_getAddressTxs("ARFe4mTKRTETerRoMsyzBXoPt2EKBvBXFX", 20, 1) as Transactionforaddr[];
        console.log(res);
        var showtxs: Array<History> = [];

        for (let index = 0; index < res.length; index++)
        {
            const element = res[ index ];
            var txid = element.txid;
            var time = element.blocktime.$date;
            let tx = await WWW.getrawtransaction(element.txid) as Transaction;
            for (let index = 0; index < tx.vout.length; index++)
            {
                const element = tx.vout[ index ];
                if (element.address != address)
                {
                    element[ "time" ] = time;
                    element[ "txid" ] = txid;
                    element[ "assetname" ] = CoinTool.assetID2name[ element.asset ];
                    var history: History = new History();
                    history.time = DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(time));
                    history.txid = txid;
                    history.assetname = CoinTool.assetID2name[ element.asset ];
                    history.address = element.address;
                    history.n = element.n;
                    history.value = element.value;
                    history.asset = element.asset;

                    showtxs.push(history);
                }
            }
        }
        this.txs = showtxs;

    }
}