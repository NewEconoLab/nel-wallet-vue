import Vue from "vue";
import Component from "vue-class-component";
import WalletLayout from "../layouts/wallet.vue";
import { NNSTool } from "../tools/nnstool";

declare const mui;
@Component({
  components: {
    "wallet-layout": WalletLayout    
  }
})
export default class Nnsmanage extends Vue 
{
    network:string;
    nnsstr:string;
    domainerr:boolean;
    constructor() 
    {
        super();     
        this.network = ".test";
        this.nnsstr = "";
        this.domainerr = false;
    }

    async mounted()
    { 
        await NNSTool.initRootDomain()
    }

    async nnsRegister(){
        let domains = await NNSTool.queryDomainInfo(this.nnsstr)
        if (domains)
        {
            this.domainerr = true;
            alert(this.domainerr);
            mui.toast("The current domain name is registered : " + domains,{ duration:'long', type:'div' });
        } else
        {
            alert("此域名为空!!!");
        }
    }
}