import Vue from "vue";
import Component from "vue-class-component";
import WalletLayout from "../layouts/wallet.vue";
import { NNSTool } from "../tools/nnstool";
import { WWW } from "../tools/wwwtool";
import { LoginInfo, Domainmsg, DomainInfo, Consts } from "../tools/entity";
import Valert from "../components/Valert.vue";

declare const mui;
@Component({
    components: {
        "wallet-layout": WalletLayout,
        "v-alert": Valert
    }
})
export default class Nnsmanage extends Vue 
{
    network: string;
    nnsstr: string;
    domainerr: boolean;
    errmsg: string;
    domainarr: Domainmsg[]
    constructor() 
    {
        super();
        this.network = ".test";
        this.nnsstr = "";
        this.domainerr = false;
        this.errmsg = "";
        this.domainarr = new Array<Domainmsg>();
    }

    async mounted()
    {
        await NNSTool.initRootDomain()
        this.getDomainsByAddr();
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
            this.errmsg = "Please enter a domain name in the correct format ";
            return;
        } else
        {
            let domains = await NNSTool.queryDomainInfo(this.nnsstr + ".test")
            if (domains.valueOf() == DomainInfo)
            {
                this.domainerr = true;
                mui.toast("The current domain name is registered : ");
            } else
            {
                this.domainerr = false;
                this.errmsg = "";
            }
        }
    }

    async nnsRegister()
    {
        if (!this.domainerr)
        {
            let res = await NNSTool.registerDomain(this.nnsstr);
            if (res.err)
            {
                console.error(res.info);
            } else
            {
                let res = await WWW.setnnsinfo(LoginInfo.getCurrentAddress(), this.nnsstr + ".test", 0);
                if (res == "suc")
                {
                    mui.alert("Domain name registration contract has been issued, please see ")
                }
                // var res = await WWW.setnnsinfo();
                // mui.toast(res.info);
            }
        }
    }

    async getDomainsByAddr()
    {
        let res = await WWW.getnnsinfo(LoginInfo.getCurrentAddress());
        for (const i in res)
        {
            if (res.hasOwnProperty(i))
            {
                const n = parseInt(i)
                const domain = res[ n ];
                this.domainarr.push(new Domainmsg);
                this.domainarr[ n ].domainname = domain[ "name" ];
                let msg = await NNSTool.queryDomainInfo(domain[ 'name' ]);
                if (msg)
                {
                    if (msg[ "resolver" ])
                    {
                        let resolver = msg[ "resolver" ];
                        let addr = await NNSTool.resolveData(domain[ "name" ], resolver);
                        this.domainarr[ n ].reslove = { mapping: msg[ "address" ] };
                    } else
                    {
                        this.domainarr[ n ].reslove = false;
                    }
                }
            }
        }
    }
    async resolve(domain: string)
    {

        // let arr = domain.split(".");
        // let nnshash: Uint8Array = NNSTool.nameHashArray(arr);
        // let contract = "0xabb0f1f3f035dd7ad80ca805fce58d62c517cc6b".hexToBytes().reverse();
        // await NNSTool.setResolve(nnshash, contract);

        this.$refs[ "alert" ][ "domainname" ] = domain;
        this.$refs[ "alert" ][ "contractaddr" ] = "0xabb0f1f3f035dd7ad80ca805fce58d62c517cc6b";
        this.$refs[ "alert" ][ "address" ] = LoginInfo.getCurrentAddress();
        this.$refs[ "alert" ][ "show" ] = true;
        // let arr = domain.split('.');
        // let nnshash: Uint8Array = NNSTool.nameHashArray(arr);
        // NNSTool.resolve("address", nnshash, "");
    }
}