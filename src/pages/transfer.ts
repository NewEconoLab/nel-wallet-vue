import { LoginInfo, BlanaceInfo, Result, NeoAsset } from './../tools/entity';
import { StorageTool } from './../tools/storagetool';
import WalletLayout from "../layouts/wallet.vue";
import axios from "axios"
import { WWW } from '../tools/wwwtool';
import Vue from "vue";
import Component from "vue-class-component";

let vm = new Vue();
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
    constructor() {
        super();
        this.targetaddr = "";
        this.amount = 0;
    }
    mounted() { 
            
    vm.$on('txasset', (arg) => { 
        this.asset= arg; // 接收
        alert(arg);
    });
    }

    send(){
        alert(this.targetaddr);
    }
}