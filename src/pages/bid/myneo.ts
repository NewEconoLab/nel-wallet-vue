import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Spinner from "../../components/Spinner.vue";
import { tools } from "../../tools/importpack";
import { LoginInfo, Domainmsg, DomainInfo, DomainStatus } from "../../tools/entity";
@Component({
    components: {
        "v-alert": Valert,
        "spinner-wrap": Spinner
    }
})
export default class MyNeo extends Vue
{
    isShowEdit: boolean;
    currentAddress: string = "";   //获取当前地址
    neonameList: any;
    domainInfo: any;
    set_contract: string;

    constructor()
    {
        super();
        this.isShowEdit = false;
        // this.currentAddress = LoginInfo.getCurrentAddress();
        this.currentAddress = 'AHDV7M54NHukq8f76QQtBTbrCqKJrBH9UF';
        this.neonameList = null;
        this.set_contract = "0xabb0f1f3f035dd7ad80ca805fce58d62c517cc6b";
    }
    mounted()
    {
        this.getAllNeoName(this.currentAddress);
    }
    async getAllNeoName(address)
    {
        let res = await tools.wwwtool.getnnsinfo(address, '.neo');
        console.log(res);
        let arrdomain = res ? res.map(dom => { return dom[ "domain" ] }) : [];
        console.log("arrdomain");
        console.log(arrdomain);
        let arr = new Array<Domainmsg>();
        //从缓存取状态数据
        let state = DomainStatus.getStatus() as DomainStatus;
        console.log("state----------");
        console.log(state)
        // state = JSON.parse(JSON.stringify(state));
        if (state)
        {
            for (let key in state)
            {
                if (state.hasOwnProperty(key))
                {
                    let inculde = arrdomain.includes(key);
                    inculde ? "" : arrdomain.push(key);
                }
            }
        }
        for (const i in arrdomain)
        {
            console.log(arrdomain[ i ]);
            if (arrdomain.hasOwnProperty(i))
            {
                const n = parseInt(i)
                const domain = arrdomain[ n ];
                let a = state[ domain ] ? state[ domain ] as DomainStatus : new DomainStatus();
                console.log("a-----------")
                console.log(a);
                if (a.await_resolver)
                {
                    //与缓存进行对比
                    // if (a.resolver == msg.resolver)
                    // { 
                    //     a.await_resolver = false;
                    //     msg.await_resolver = false;
                    // } else
                    // {
                    //     msg.await_resolver = true;
                    // }
                }
                if (a.await_mapping)
                {
                    // if (a.mapping == msg.mapping)
                    // {
                    //     a.await_mapping = false;
                    //     msg.await_mapping = false;
                    // } else
                    // {
                    //     msg.await_mapping = true;
                    // }
                }
                // arr.push(msg);
            }
        }
        // sessionStorage.setItem("domain-status", JSON.stringify(state ? state : {}));
        // this.domainarr = arr.reverse();
        // if (this.alert_domain)
        // {
        //     arr.map((dom) =>
        //     {
        //         if (dom.domainname == this.alert_domain)
        //         {
        //             dom.await_resolver ? this.alert_resolver_state = 1 : !!dom.resolver ? this.alert_resolver_state = 2 : this.alert_resolver_state = 0;
        //             dom.await_mapping ? this.alert_config_state = 1 : (!!dom.mapping ? this.alert_config_state = 2 : this.alert_config_state = 0);
        //         }
        //     });
        // }
        let list = res;
        if (list.length)
        {
            for (let i in list)
            {
                let isshow = await this.checkExpiration(list[ i ]);
                console.log(isshow);
                if (!isshow)//未到期
                {
                    list[ i ][ "expiring" ] = isshow;
                    let expired = await this.checkExpirationSoon(list[ i ]);
                    list[ i ][ "expired" ] = expired;
                } else
                {
                    list[ i ][ "expiring" ] = false;
                    list[ i ][ "expired" ] = true;
                }
                list[ i ][ "ttl" ] = tools.timetool.dateFtt("yyyy/MM/dd hh:mm:ss", new Date(res[ i ][ "ttl" ] * 1000));
            }
            console.log(list);
            this.neonameList = list;
        }
    }

    async checkExpiration(domain: string)
    {
        let timestamp = new Date().getTime();
        let copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(domain[ "ttl" ]).multiply(1000));
        console.log(copare);
        return copare < 0 ? false : true;    //小于0未过期false，大于0已过期true
    }
    async checkExpirationSoon(domain: string)
    {
        let timestamp = new Date().getTime();
        let copare = new Neo.BigInteger(domain[ "ttl" ]).compareTo(new Neo.BigInteger(timestamp).multiply(1000));
        console.log(copare);
        let threeMonth = (5 * 60 * 1000) * 90
        return copare < threeMonth ? false : true;    //小于threeMonth即将过期false
    }

    onShowEdit(item)
    {
        this.isShowEdit = !this.isShowEdit;
        this.domainInfo = item;
    }

    /**
     * 注册解析器
     */
    async setresolve()
    {
        let contract = this.set_contract.hexToBytes().reverse();
        let res = await tools.nnstool.setResolve(this.domainInfo[ "domain" ], contract);
        console.log(res);
    }
}