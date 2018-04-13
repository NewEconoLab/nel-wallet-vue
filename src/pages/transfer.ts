import { CoinTool } from './../tools/cointool';
import { neotools } from './../tools/neotools';
import { LoginInfo, BalanceInfo, Result, NeoAsset } from './../tools/entity';
import { StorageTool } from './../tools/storagetool';
import WalletLayout from "../layouts/wallet.vue";
import axios from "axios"
import { WWW } from '../tools/wwwtool';
import Vue from "vue";
import Component from "vue-class-component";

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
    constructor() 
    {
        super();
        this.targetaddr = "";
        this.amount = "";
        this.asset = "";
    }
    mounted() 
    {
        var str = StorageTool.getStorage("balances_asset");
        if (str == null)
            this.balances = new Array<BalanceInfo>();
        else
        {
            this.balances = JSON.parse(str) as BalanceInfo[];
            var choose = StorageTool.getStorage("transfer_choose");
            this.asset = (choose == null ? this.balances[ 0 ].asset : choose);
            var n: number = this.balances.findIndex(b => b.asset == this.asset);
            this.balance = this.balances[ n ];
            this.history();
        }
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
        var res = await WWW.api_getAddressTxs(LoginInfo.getCurrentAddress(), 20, 1);
        console.log(res);
    }
}