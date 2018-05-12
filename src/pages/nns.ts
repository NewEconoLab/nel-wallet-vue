import Vue from "vue";
import Component from "vue-class-component";
import WalletLayout from "../layouts/wallet.vue";
import { NNSTool } from "../tools/nnstool";
import { WWW } from "../tools/wwwtool";
import { LoginInfo, Domainmsg, DomainInfo, Consts } from "../tools/entity";
import Valert from "../components/Valert.vue";
import Spinner from "../components/Spinner.vue";
import { StorageTool } from "../tools/storagetool";
import { DateTool } from "../tools/timetool";

declare const mui;
@Component({
    components: {
        "wallet-layout": WalletLayout,
        "v-alert": Valert,
        "spinner-wrap": Spinner
    }
})
export default class Nnsmanage extends Vue 
{
    network: string;
    nnsstr: string;
    domainerr: boolean;
    errmsg: string;
    domainarr: Domainmsg[];
    alert_domain: string;
    alert_addr: string;
    alert_contract: string;
    alert_resolve: boolean;
    alert_domainmsg: Domainmsg;
    alert_resolver_disable: boolean;
    alert_mapping_disable: boolean;
    alert_resolver_state: number;
    alert_config_state: number;
    btn_register: boolean;

    constructor() 
    {
        super();
        this.network = ".test";
        this.nnsstr = "";
        this.domainerr = false;
        this.errmsg = "";
        this.btn_register = true;
        this.alert_addr = "";
        this.alert_domain = "";
        this.alert_contract = "0xabb0f1f3f035dd7ad80ca805fce58d62c517cc6b";
        this.alert_resolve = true;
        this.alert_resolver_disable = false;
        this.alert_mapping_disable = false;
        this.alert_config_state = 0;
        this.alert_resolver_state = 0;
        this.domainarr = new Array<Domainmsg>();
        Neo.Cryptography.RandomNumberGenerator.startCollectors();
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
            if (domains.register && domains.ttl)
            {
                var timestamp = new Date().getTime();
                let copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(domains.ttl).multiply(1000));
                // let copare: number = new Neo.BigInteger(timestamp).compareTo(doamininfo.ttl.multiply(1000));
                if (copare < 0)
                {
                    // console.log('域名已到期');
                    this.domainerr = true;
                } else
                {
                    // mui.toast("The current domain name is registered : ");
                }
            } else
            {
                this.domainerr = false;
                this.errmsg = "";
            }
        }
    }

    async nnsRegister()
    {
        this.verifyDomain();
        if (!this.domainerr)
        {
            try
            {
                let res = await NNSTool.registerDomain(this.nnsstr);
                if (res.err)
                {
                    console.error(res.info);
                } else
                {
                    this.btn_register = false;
                    let delres = await WWW.delnnsinfo(this.nnsstr + ".test");
                    if (delres == "suc")
                    {
                        let res = await WWW.setnnsinfo(LoginInfo.getCurrentAddress(), this.nnsstr + ".test", 0);
                        if (res == "suc")
                        {
                            // mui.alert("Domain name registration contract has been issued, please see ")
                            let height = await WWW.api_getHeight();
                            StorageTool.setStorage("current-height", height.toString());

                            // StorageTool.setStorage("await-register", JSON.stringify({ height: this.nnsstr + ".test" }));
                            await this.awaitHeight("register");
                        }
                    }
                }
            } catch (error)
            {
                mui.alert(error.message);
            }
        }
    }

    //获得域名列表
    async getDomainsByAddr()
    {
        let res = await WWW.getnnsinfo(LoginInfo.getCurrentAddress());
        let arr = new Array<Domainmsg>();
        for (const i in res)
        {
            if (res.hasOwnProperty(i))
            {
                const n = parseInt(i)
                const domain = res[ n ];
                let msg = await this.queryDomainInfo(domain[ "name" ]);
                arr.push(msg);
            }
        }
        this.domainarr = arr.reverse();
    }

    async queryDomainInfo(domain: string)
    {

        let dommsg = new Domainmsg();
        dommsg.domainname = domain;
        let msg = await NNSTool.queryDomainInfo(domain);
        if (msg.ttl)
        {
            let timestamp = new Date().getTime();
            let copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(msg.ttl).multiply(1000));
            dommsg.time = DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(parseInt(msg.ttl + "000")));
            dommsg.await = false;
            if (msg[ "resolver" ])
            {
                let resolver: Uint8Array = msg[ "resolver" ] as Uint8Array;
                let resolver_str = resolver.toHexString();
                let addr = await NNSTool.resolveData(domain);
                dommsg.mapping = addr;
                dommsg.resolver = resolver_str;
            } else
            {
                dommsg.resolver = "";
                dommsg.mapping = "";
            }
        } else
        {
            dommsg.await = true;
        }
        return dommsg;
    }

    async resolve(msg)
    {
        this.alert_domainmsg = msg;
        if (this.alert_domainmsg.resolver) { this.alert_resolver_state = 2 }
        else { this.alert_resolver_state = 0 }
        this.alert_config_state = 0;
        let name = this.alert_domainmsg.domainname;
        this.alert_domain = name;
        this.alert_addr = this.alert_domainmsg.mapping;
        this.$refs[ "alert" ][ "show" ] = true;
        // await this.awaitHeight("resolve");
    }

    async setresolve()
    {
        this.alert_resolve = false;
        let arr = this.alert_domain.split(".");
        let nnshash: Uint8Array = NNSTool.nameHashArray(arr);
        let contract = this.alert_contract.hexToBytes().reverse();
        let res = await NNSTool.setResolve(nnshash, contract);
        this.alert_resolver_state = 1;
        await this.awaitHeight("resolve");
    }

    async configResolve()
    {
        let arr = this.alert_domain.split(".");
        let nnshash: Uint8Array = NNSTool.nameHashArray(arr);
        // this.alert_addr = this.alert_addr ? this.alert_addr : LoginInfo.getCurrentAddress();
        let res = await NNSTool.setResolveData(nnshash, this.alert_addr, this.alert_domainmsg.resolver);
        this.alert_config_state = 1;
        await this.awaitHeight("setResolve");
    }

    async awaitHeight(type: string)
    {
        let str = StorageTool.getStorage("current-height");
        let currentheight = await WWW.api_getHeight();
        let oldheight = currentheight;
        str ? oldheight = parseInt(str) : StorageTool.setStorage("current-height", currentheight + "");
        if (oldheight < currentheight)
        {
            if (type == "resolve")
            {
                this.alert_resolver_state = 2;
            }
            if (type == "setResolve")
            {
                this.alert_config_state = 2;
            }
            if (type == "register")
            {
                let msg = await this.queryDomainInfo(this.nnsstr + ".test")
                if (msg.await)
                    this.awaitHeight(type);
                this.btn_register = true;
            }
            sessionStorage.removeItem("current-height");
            await this.getDomainsByAddr();
            return;
        }
        await setTimeout(() =>
        {
            this.awaitHeight(type);
        }, 5000);
    }

}