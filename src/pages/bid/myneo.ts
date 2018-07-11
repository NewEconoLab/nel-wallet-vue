import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Valert from "../../components/Valert.vue";
import Spinner from "../../components/Spinner.vue";
import { tools } from "../../tools/importpack";
import { LoginInfo, Domainmsg, DomainInfo, DomainStatus } from "../../tools/entity";
import { LocalStoreTool } from "../../tools/storagetool";
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
    resolverAddress: string;
    mappingState: number;
    resolverState: number;
    resolverSession: LocalStoreTool;
    mappingSession: LocalStoreTool;
    renewalWatting: boolean;

    constructor()
    {
        super();
        this.isShowEdit = false;
        this.currentAddress = LoginInfo.getCurrentAddress();
        this.neonameList = null;
        this.set_contract = "cf0d21eaa1803f63704ddb06c373c22d815b7ca2";
        this.resolverSession = new LocalStoreTool("resolverSession");
        this.mappingSession = new LocalStoreTool("mappingSession");
        this.renewalWatting = false;
        this.resolverAddress = "";
        this.mappingState = 0;
        this.resolverState = 0;
    }
    mounted()
    {
        this.getAllNeoName(this.currentAddress);
    }
    async getAllNeoName(address)
    {
        let res = await tools.wwwtool.getnnsinfo(address, '.neo');
        let arrdomain = res ? res.map(dom => { return dom[ "domain" ] }) : [];
        let arr = new Array<Domainmsg>();
        //从缓存取状态数据
        let state = DomainStatus.getStatus() as DomainStatus;
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
            if (arrdomain.hasOwnProperty(i))
            {
                const n = parseInt(i)
                const domain = arrdomain[ n ];
                let a = state[ domain ] ? state[ domain ] as DomainStatus : new DomainStatus();
                if (!a.await_resolver)
                {
                    if (!a.await_mapping)
                    {

                    }
                }
            }
        }
        let list = res;
        if (list && list.length)
        {
            for (let i in list)
            {
                let isshow = await this.checkExpiration(list[ i ]);
                console.log(isshow);
                if (!isshow)//未到期
                {
                    let expired = await this.checkExpirationSoon(list[ i ]);
                    list[ i ][ "expired" ] = isshow;
                    list[ i ][ "expiring" ] = expired;
                } else
                {
                    list[ i ][ "expiring" ] = false;
                    list[ i ][ "expired" ] = true;
                }
                if (list[ i ][ "resolver" ])
                {

                    let mapping = await tools.nnstool.resolveData(list[ i ][ 'domain' ]);
                    list[ i ][ "resolverAddress" ] = mapping;
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
        let copare = (new Neo.BigInteger(domain[ "ttl" ]).multiply(1000)).subtract(new Neo.BigInteger(timestamp));
        console.log(copare);
        let threeMonth = (5 * 60 * 1000) * 90;
        return copare.compareTo(threeMonth) < 0 ? false : true;    //小于threeMonth即将过期false
    }

    onShowEdit(item)
    {
        this.domainInfo = item;
        this.resolverAddress = item.resolverAddress;
        let sessionMap = this.mappingSession.select(item.domain);
        let sessionRes = this.resolverSession.select(item.domain);
        this.mappingState = this.domainInfo.resolverAddress ? 1 : 0;
        this.resolverState = this.domainInfo.resolver ? 1 : 0;
        if (sessionMap && sessionMap[ "txid" ])
        {
            let txid = sessionMap[ "txid" ];
            let value = sessionMap[ "value" ];
            this.resolverAddress = value;
            this.setConfirm(txid, 2, item.domain);
        }
        if (sessionRes && sessionRes[ "txid" ])
        {
            let txid = sessionRes[ "txid" ];
            this.setConfirm(txid, 1, item.domain);
        }
        this.isShowEdit = !this.isShowEdit;
    }

    async setConfirm(txid: string, medth: number, domain: string)
    {
        let res = await tools.wwwtool.getrawtransaction(txid);
        if (!!res)
        {
            if (medth == 1)
            {
                this.resolverState = 1;
                this.resolverSession.delete(domain)
            }
            if (medth == 2)
            {
                this.mappingState = 1;
                this.mappingSession.delete(domain)
            }
        } else
        {
            if (medth == 1)
            {
                this.resolverState = 2;
            } if (medth == 2)
            {
                this.mappingState = 2;
            }
            setTimeout(() =>
            {
                this.setConfirm(txid, medth, domain);
            }, 5000);
        }
    }

    /**
     * 注册解析器
     */
    async setresolve()
    {
        this.resolverState = 2;
        let contract = this.set_contract.hexToBytes().reverse();
        let res = await tools.nnstool.setResolve(this.domainInfo[ "domain" ], contract);
        if (!res.err)
        {
            let txid = res.info;
            this.resolverSession.put(this.domainInfo.domain, { txid, value: this.set_contract });
            this.setConfirm(txid, 1, this.domainInfo.domain);
        }
    }

    /**
     * 映射地址
     */
    async mappingData()
    {
        this.mappingState = 2;
        let res = await tools.nnstool.setResolveData(this.domainInfo.domain, this.resolverAddress, this.domainInfo.resolver);
        if (!res.err)
        {
            let txid = res.info;
            this.mappingSession.put(this.domainInfo.domain, { txid, value: this.resolverAddress });
            this.setConfirm(txid, 2, this.domainInfo.domain);
        }

    }

    async renewalDomain()
    {
        let renewalsession = new tools.localstoretool("renewalsession");
        let domain = this.domainInfo.domain;
        let res = await tools.nnssell.renewDomain(domain);
        if (res)
        {
            let txid = res[ "txid" ];
            console.log("--------------------------------------renewalDomain--------------------------------");
            console.log(txid);

            renewalsession.put(domain, { txid });
            this.renewalConfirm(txid, domain);
        }

    }

    async renewalConfirm(txid: string, domain: string)
    {
        let renewalsession = new tools.localstoretool("renewalsession");
        let res = await tools.wwwtool.getrawtransaction(txid)
        if (!!res)
        {
            let session = renewalsession.select(domain);
            if (session)
            {
                renewalsession.delete(domain);
            }
        } else
        {
            this.renewalWatting = true;
            setTimeout(() =>
            {
                this.renewalConfirm(txid, domain);
            }, 5000);
        }
    }
}