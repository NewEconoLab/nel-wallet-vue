import { CoinTool } from './../tools/cointool';
import { neotools } from './../tools/neotools';
import { LoginInfo,BalanceInfo, Result, NeoAsset } from './../tools/entity';
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

    targetaddr:string="";
    amount:number=0;
    asset:string="";
    balances:BalanceInfo[] = [];
    constructor() 
    {
        super();
        this.targetaddr = "";
        this.amount = 0;    
    }
    mounted() 
    {
        var choose = StorageTool.getStorage("transfer_choose");
        var str = StorageTool.getStorage("balances_asset");
        this.balances = JSON.parse(str) as BalanceInfo[];
        this.asset = choose;
    }
    choose()
    {
        StorageTool.setStorage("transfer_choose",this.asset);
    }
    verify_addr()
    {
        if(neotools.verifyPublicKey(this.targetaddr))
            alert("地址正确");
        else
            alert("错误地址");
    }
    verify_Amount()
    {

    }
    async send()
    {
        var res:Result = await CoinTool.rawTransaction(this.targetaddr,this.asset,this.amount+"");
        if(!res.err)
        mui.alert(res.info);
    }
}