import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { tools } from "../../tools/importpack";
import { LoginInfo, Domainmsg, DomainInfo, DomainStatus, Consts, TaskFunction, Task, TaskType, ConfirmType } from "../../tools/entity";
import { sessionStoreTool } from "../../tools/storagetool";
import { TaskManager } from "../../tools/taskmanager";
@Component({
    components: {}
})
export default class MyNeo extends Vue
{
    isShowEdit: boolean;
    currentAddress: string = "";   //获取当前地址
    neonameList: any;
    domainInfo: any;
    set_contract: string;
    resolverAddress: string;
    ownerAddress: string;
    mappingistrue: boolean;
    mappingState: number;
    resolverState: number;
    ownerState: number;
    domainEdit: sessionStoreTool;
    renewalWatting: boolean;
    ownerTransfer: boolean;
    currentdomain: string;

    constructor()
    {
        super();
        this.isShowEdit = false;
        this.currentAddress = LoginInfo.getCurrentAddress();
        this.neonameList = null;
        this.set_contract = "0x6e2aea28af9c5febea0774759b1b76398e3167f1";
        this.domainEdit = new sessionStoreTool("domain-edit");
        this.renewalWatting = false;
        this.resolverAddress = "";
        this.mappingState = 0;
        this.resolverState = 0;
        this.mappingistrue = false;
        this.currentdomain = "";
        this.ownerState = 3
        this.ownerAddress = "";
    }

    mounted()
    {
        tools.nnstool.initRootDomain("test");
        this.getAllNeoName(this.currentAddress);
        //初始化 任务管理器的执行机制
        TaskFunction.domainResovle = this.resolverTask;
        TaskFunction.domainMapping = this.mappingTask;
        TaskFunction.domainRenewal = this.renewalTask;
        TaskFunction.domainTransfer = this.domainTransferTask;
    }


    domainTransferTask(domain)
    {
        if (domain == this.currentdomain)
        {
            this.ownerTransfer = false;
        }
        this.getAllNeoName(this.currentAddress);
    }

    verifyMapping()
    {
        if (!this.resolverAddress)
        {
            this.mappingistrue = false;
            return;
        }
        let res = tools.neotool.verifyAddress(this.resolverAddress);
        this.mappingistrue = res;
    }

    verifySetOwner()
    {
        const domain = this.domainEdit.select(this.currentdomain);
        if (domain && domain[ `domain_transfer` ] && domain[ `domain_transfer` ] === "watting")
        {
            this.ownerState = 2;
        }
        else if (!this.ownerAddress)
        {
            this.ownerState = 3;
        }
        else
        {
            const res = tools.neotool.verifyAddress(this.ownerAddress);
            this.ownerState = res ? 1 : 3;
            console.log(this.ownerState);

        }
    }

    async getAllNeoName(address)
    {
        let res = await tools.wwwtool.getnnsinfo(address, '.test');
        //从缓存取状态数据
        let list = res;
        if (list && list.length)
        {
            for (let i in list)
            {
                let isshow = await this.checkExpiration(list[ i ]);
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
                list[ i ][ "ttl" ] = tools.timetool.getTime(res[ i ][ "ttl" ])
            }
            this.neonameList = list;
        }
    }

    checkExpiration(domain: string)
    {
        let timestamp = new Date().getTime();
        let copare = new Neo.BigInteger(timestamp).compareTo(new Neo.BigInteger(domain[ "ttl" ]).multiply(1000));
        return copare < 0 ? false : true;    //小于0未过期false，大于0已过期true
    }
    checkExpirationSoon(domain: string)
    {
        let timestamp = new Date().getTime();
        let copare = (new Neo.BigInteger(domain[ "ttl" ]).multiply(1000)).subtract(new Neo.BigInteger(timestamp));
        let threeMonth = (5 * 60 * 1000) * 90;
        return copare.compareTo(threeMonth) < 0 ? false : true;    //小于threeMonth即将过期false
    }

    resetresolve()
    {
        this.resolverState = 0;
        this.resolverAddress = "";
        this.mappingState = 0;
        this.mappingistrue = false;
    }

    resetmappingData()
    {
        this.resolverAddress = "";
        this.mappingState = 0;
    }

    /**
     * 打开编辑域名
     * @param item 传入窗口的域名对象
     */
    onShowEdit(item)
    {
        this.domainInfo = item;
        this.resolverAddress = item.resolverAddress;
        this.mappingistrue = tools.neotool.verifyAddress(this.resolverAddress);
        this.mappingState = this.domainInfo.resolverAddress ? 1 : 0;
        this.resolverState = this.domainInfo.resolver ? 1 : 0;
        this.renewalWatting = false;
        this.isShowEdit = !this.isShowEdit;
        this.currentdomain = item.domain;
        this.verifySetOwner();

        let domain = this.domainEdit.select(item.domain);
        if (domain)
        {
            if (domain[ 'resolver' ] && domain[ 'resolver' ] === 'watting')
            {
                this.resolverState = 2;
            }
            if (domain[ 'mapping' ] && domain[ 'mapping' ][ 'state' ] && domain[ 'mapping' ][ 'state' ] === 'watting')
            {
                this.mappingState = 2;
                this.resolverAddress = domain[ 'mapping' ][ 'address' ];
            }
            if (domain[ 'renewal' ] && domain[ 'renewal' ] === 'watting')
            {
                this.renewalWatting = true;
            }
            if (domain[ 'owner' ] && domain[ 'owner' ] === 'watting')
            {
                this.renewalWatting = true;
            }
        }
    }

    /**
     * 设置所有者 转让域名
     */
    async setowner()
    {
        const oldstate = this.ownerState;
        try
        {
            if (this.resolverAddress != "" && this.mappingState != 0)
            {
                this.resetmappingData()
                await this.mappingData();
            }
            LoginInfo.info = null;
            this.ownerState = 2;
            const res = await tools.nnstool.setOwner(this.domainInfo[ "domain" ], this.ownerAddress);
            if (!res.err)
            {
                const txid = res.info;
                TaskManager.addTask(
                    new Task(ConfirmType.contract, txid, { domain: this.domainInfo[ 'domain' ], contract: this.set_contract }),
                    TaskType.domainTransfer);
                this.domainEdit.put(this.domainInfo.domain, "watting", "domain_transfer");
            } else
            {
                this.ownerState = oldstate;
                throw new Error("Transaction send failed");
            }
        } catch (error)
        {
            console.log("ERROR!!");
            this.ownerState = oldstate;
        }
    }

    /**
     * 注册解析器
     */
    async setresolve()
    {
        let oldstate = this.resolverState;
        try
        {
            this.resolverState = 2;
            let contract = this.set_contract.hexToBytes().reverse();
            let res = await tools.nnstool.setResolve(this.domainInfo[ "domain" ], contract);
            if (!res.err)
            {
                let txid = res.info;
                TaskManager.addTask(
                    new Task(ConfirmType.contract, txid, { domain: this.domainInfo[ 'domain' ], contract: this.set_contract }),
                    TaskType.domainResovle);
                this.domainEdit.put(this.domainInfo.domain, "watting", "resolver");
            }
        } catch (error)
        {
            this.resolverState = oldstate;
        }
    }

    /**
     * 映射地址
     */
    async mappingData()
    {
        let oldstate = this.mappingState;
        try
        {
            this.mappingState = 2;
            let res = await tools.nnstool.setResolveData(this.domainInfo.domain, this.resolverAddress, this.domainInfo.resolver);
            if (!res.err)
            {
                let txid = res.info;
                TaskManager.addTask(
                    new Task(ConfirmType.contract, txid, { domain: this.domainInfo.domain, address: this.resolverAddress }),
                    TaskType.domainMapping);
                this.domainEdit.put(this.domainInfo.domain, { state: "watting", address: this.resolverAddress }, "mapping");
            } else
            {
                this.mappingState = oldstate;
                throw new Error("Transaction send failed");
            }
        } catch (error)
        {
            this.mappingState = oldstate;
            throw error;
        }
    }

    /**
     * 域名续约
     */
    async renewalDomain()
    {
        let root = await tools.nnstool.getRootInfo("test");
        let domain = this.domainInfo.domain;
        let res = await
            tools.nnssell.renewDomain(domain, root.register);
        if (!res.err)
        {
            this.renewalWatting = true;
            let txid = res.info;
            TaskManager.addTask(
                new Task(ConfirmType.contract, txid, { domain }),
                TaskType.domainRenewal);
            this.domainEdit.put(this.domainInfo.domain, "watting", "renewal");
        }
    }

    /**
     * 续约状态效果
     * @param domain 域名
     */
    renewalTask(domain)
    {
        if (domain == this.currentdomain)
        {
            this.renewalWatting = false;
        }
        this.getAllNeoName(this.currentAddress);
    }

    /**
     * 映射状态效果
     * @param domain 域名
     */
    mappingTask(domain, address)
    {
        this.getAllNeoName(this.currentAddress);
        if (this.currentdomain == domain)
        {
            this.mappingState = 1;
            if (address)
            {
                this.resolverAddress = address;
            }
        }
    }

    /**
     * 合约状态改变效果
     * @param domain 域名
     */
    resolverTask(domain)
    {
        if (this.currentdomain == domain)
        {
            this.resolverState = 1;
        }
        this.getAllNeoName(this.currentAddress);
    }

}