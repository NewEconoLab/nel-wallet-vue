import Vue from "vue";
import Component from "vue-class-component";
import WalletLayout from "../layouts/wallet.vue";
import { NNSTool } from "../tools/nnstool";
import { WWW } from "../tools/wwwtool";
import { LoginInfo, Domainmsg, DomainInfo, Consts, DomainStatus } from "../tools/entity";
import Valert from "../components/Valert.vue";
import Spinner from "../components/Spinner.vue";
import Bubble from "../components/bubble.vue";
import { StorageTool } from "../tools/storagetool";
import { DateTool } from "../tools/timetool";
import { neotools } from "../tools/neotools";

declare const mui;
@Component({
    components: {
        "wallet-layout": WalletLayout,
        "v-alert": Valert,
        "spinner-wrap": Spinner,
        "bubble-wrap": Bubble
    }
})
export default class NNS extends Vue 
{
    network: string;
    nnsstr: string;
    domainerr: boolean;
    errmsg: string;
    domainarr: Domainmsg[];
    verifyDomainNumber: number;
    mapping_err: string;
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
    receive_disable: boolean;

    constructor() 
    {
        super();
        this.network = ".test";
        this.nnsstr = "";
        this.domainerr = false;
        this.receive_disable = true;
        this.mapping_err = "";
        this.errmsg = "";
        this.btn_register = true;
        this.verifyDomainNumber = 0;
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
        await NNSTool.initRootDomain();
        NNSTool.initStatus();
        this.getDomainsByAddr();
        this.awaitHeight();
    }

    /**
     * 校验域名
     */
    async verifyDomain()
    {
        this.nnsstr = this.nnsstr.toLowerCase();
        this.nnsstr = this.nnsstr.trim();
        let verify = /^[a-zA-Z0-9]{1,32}$/;
        if (verify.test(this.nnsstr))
        {

            let domains = await NNSTool.queryDomainInfo(this.nnsstr + ".test")
            if (domains.register && domains.ttl)
            {
                var timestamp = new Date().getTime();
                let copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(domains.ttl).multiply(1000));
                if (copare < 0)
                {
                    // console.log('域名已到期');
                    this.errmsg = "The domain name has been registered ";
                    this.domainerr = true;
                } else
                {
                    this.errmsg = "";
                    this.domainerr = false;
                    // mui.toast("The current domain name is registered : ");
                }
            } else
            {
                this.domainerr = false;
                this.errmsg = "";
            }
        } else
        {
            //验证输入的字符串是否符合规则 
            this.domainerr = true;
            this.errmsg = "Please enter a domain name in the correct format ";
            return;
        }
    }

    verifyMappingAddress()
    {
        let res = neotools.verifyAddress(this.alert_addr);
        res ? this.mapping_err = "0" : this.mapping_err = "1";
        return res;
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
                    let state = new DomainStatus();
                    state.await_register = true;
                    state.domainname = this.nnsstr + ".test";
                    DomainStatus.setStatus(state);
                    let delres = await WWW.delnnsinfo(this.nnsstr + ".test");
                    if (delres == "suc")
                    {
                        let res = await WWW.setnnsinfo(LoginInfo.getCurrentAddress(), this.nnsstr + ".test", 0);
                        if (res == "suc")
                        {
                            this.getDomainsByAddr();
                            this.btn_register = true;
                        }
                    }
                }
            } catch (error)
            {
                mui.alert(error.message);
            }
        }
    }

    /**
     * 获得域名列表
     */
    async getDomainsByAddr()
    {
        let res = await WWW.getnnsinfo(LoginInfo.getCurrentAddress());
        let arr = new Array<Domainmsg>();
        let state = DomainStatus.getStatus();
        for (const i in res)
        {
            if (res.hasOwnProperty(i))
            {
                const n = parseInt(i)
                const domain = res[ n ];
                let a = state[ domain[ "name" ] ] ? state[ domain[ "name" ] ] as DomainStatus : new DomainStatus();
                let msg = await this.queryDomainInfo(domain[ "name" ]);
                if (a.await_resolver)
                {
                    if (a.resolver == msg.resolver)
                    {
                        a.await_resolver = false;
                        msg.await_resolver = false;
                    } else
                    {
                        msg.await_resolver = true;
                    }
                }
                if (a.await_mapping)
                {
                    if (a.mapping == msg.mapping)
                    {
                        a.await_mapping = false;
                        msg.await_mapping = false;
                    } else
                    {
                        msg.await_mapping = true;
                    }
                }
                arr.push(msg);
            }
        }
        sessionStorage.setItem("domain-status", JSON.stringify(state ? state : {}));
        this.domainarr = arr.reverse();
        if (this.alert_domain)
        {
            arr.map((dom) =>
            {
                if (dom.domainname == this.alert_domain)
                {
                    dom.await_resolver ? this.alert_resolver_state = 1 : !!dom.resolver ? this.alert_resolver_state = 2 : this.alert_resolver_state = 0;
                    dom.await_mapping ? this.alert_config_state = 1 : (!!dom.mapping ? this.alert_config_state = 2 : this.alert_config_state = 0);
                }
            });
            // if (!!state[ this.alert_domain ])
            // {
            //     let isMappingAwait = !!state[ this.alert_domain ][ "await_mapping" ];
            //     let isMapping = !!state[ this.alert_domain ][ "mapping" ];
            //     let isResolverAwait = !!state[ this.alert_domain ][ "await_resolver" ];
            //     let isResolver = !!state[ this.alert_domain ][ "resolver" ];
            //     isResolverAwait ? this.alert_resolver_state = 1 : isResolver ? this.alert_resolver_state = 2 : this.alert_resolver_state = 0;
            //     isMappingAwait ? this.alert_config_state = 1 : (isMapping ? this.alert_config_state = 2 : this.alert_config_state = 0);
            // }
        }
    }

    /**
     * 
     * @param domain 查询域名信息
     */
    async queryDomainInfo(domain: string)
    {
        let dommsg = new Domainmsg();
        dommsg.domainname = domain;
        let msg = await NNSTool.queryDomainInfo(domain);
        if (msg.ttl)
        {
            this.receive_disable = false;
            let timestamp = new Date().getTime();
            let copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(msg.ttl).multiply(1000));
            copare < 0 ? dommsg.isExpiration = false : dommsg.isExpiration = true;
            dommsg.time = DateTool.dateFtt("yyyy-MM-dd hh:mm:ss", new Date(parseInt(msg.ttl + "000")));
            dommsg.await_resolver = false;
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
            dommsg.await_register = true;
            dommsg.isExpiration = false;
        }
        return dommsg;
    }

    /**
     * 
     * @param msg 信息详情
     */
    async resolve(msg: Domainmsg)
    {
        this.alert_domainmsg = msg;
        let name = this.alert_domainmsg.domainname;
        this.alert_domain = name;
        this.alert_addr = this.alert_domainmsg.mapping;
        this.mapping_err = "";

        if (!!msg)
        {
            let isMappingAwait = !!msg[ "await_mapping" ];
            let isMapping = !!msg[ "mapping" ];
            let isResolverAwait = !!msg[ "await_resolver" ];
            let isResolver = !!msg[ "resolver" ];
            isResolverAwait ? this.alert_resolver_state = 1 : isResolver ? this.alert_resolver_state = 2 : this.alert_resolver_state = 0;
            isMappingAwait ? this.alert_config_state = 1 : (isMapping ? this.alert_config_state = 2 : this.alert_config_state = 0);
        }

        this.$refs[ "alert" ][ "show" ] = true;
        // await this.awaitHeight("resolve");
    }

    /**
     * 注册解析器
     */
    async setresolve()
    {
        this.alert_resolve = false;
        this.alert_resolver_state = 1;
        let arr = this.alert_domain.split(".");
        let nnshash: Uint8Array = NNSTool.nameHashArray(arr);
        let contract = this.alert_contract.hexToBytes().reverse();
        let res = await NNSTool.setResolve(nnshash, contract);
        let state = new DomainStatus();
        state.await_resolver = true;
        state.domainname = this.alert_domain;
        state.resolver = this.alert_contract.hexToBytes().reverse().toHexString();
        DomainStatus.setStatus(state);
        this.getDomainsByAddr();
        // await this.awaitHeight("resolve");
    }

    /**
     * 设置解析地址
     */
    async configResolve()
    {
        if (this.verifyMappingAddress())
        {
            let arr = this.alert_domain.split(".");
            let nnshash: Uint8Array = NNSTool.nameHashArray(arr);
            // this.alert_addr = this.alert_addr ? this.alert_addr : LoginInfo.getCurrentAddress();
            let res = await NNSTool.setResolveData(nnshash, this.alert_addr, this.alert_domainmsg.resolver);
            this.alert_config_state = 1;
            let state = new DomainStatus();
            state.await_mapping = true;
            state.domainname = this.alert_domain;
            state.mapping = this.alert_addr;
            DomainStatus.setStatus(state);
            this.getDomainsByAddr();
        }
        // await this.awaitHeight("setResolve");
    }

    async awaitHeight()
    {
        let str = StorageTool.getStorage("current-height");
        let currentheight = await WWW.api_getHeight();
        let oldheight = currentheight;
        str ? oldheight = parseInt(str) : StorageTool.setStorage("current-height", currentheight + "");
        if (oldheight < currentheight)
        {
            this.getDomainsByAddr();
            oldheight++;
            StorageTool.setStorage("current-height", oldheight + "");
        }
        await setTimeout(() =>
        {
            this.awaitHeight();
        }, 5000);
    }


}

