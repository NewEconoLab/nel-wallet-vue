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
    network: string;
    nnsstr: string;
    domainerr: boolean;
    errmsg: string;
    constructor() 
    {
        super();
        this.network = ".test";
        this.nnsstr = "";
        this.domainerr = false;
        this.errmsg = "";
    }

    async mounted()
    {
        await NNSTool.initRootDomain()
    }

    async verifyDomain()
    {
        this.nnsstr = this.nnsstr.trim();
        var regStr = "^([a-zA-Z0-9-])";
        var re = new RegExp(regStr); //创建正则表达式对象 
        //var re=/^([a-zA-Z0-9-]+\\.){1,}(com|net|edu|miz|biz|cn|cc)$/; 
        if (!re.exec(this.nnsstr))
        { //验证输入的字符串是否符合规则 
            this.domainerr = true;
            return;
        } else
        {
            let domains = await NNSTool.queryDomainInfo(this.nnsstr)
            if (domains)
            {
                this.domainerr = true;
                mui.toast("The current domain name is registered : " + domains);
            } else
            {
                this.domainerr = false;
            }
        }
    }

    async nnsRegister()
    {
        if (!this.domainerr)
        {
            NNSTool.registerDomain(this.nnsstr);
        }
    }
}