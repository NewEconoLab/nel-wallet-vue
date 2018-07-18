import { tools } from "./importpack";
import { Domainmsg, DomainInfo, SellDomainInfo, NNSResult, ResultItem, DataType, LoginInfo, OldUTXO, Consts } from "./entity";
export default class NNSSell
{
    constructor()
    {
    }
    /**
     * 获得竞拍域名详情
     * @param domain 域名
     */
    static async getSellingStateByDomain(domain: string)
    {
        // tools.nnstool.initRootDomain(domainarr.reverse[ 0 ]);
        var domainarr: string[] = domain.split('.');
        var nnshash: Neo.Uint256 = tools.nnstool.nameHashArray(domainarr);
        let data = tools.contract.buildScript(tools.nnstool.root_neo.register, "getSellingStateByFullhash", [ "(hex256)" + nnshash.toString() ]);
        let result = await tools.wwwtool.rpc_getInvokescript(data);
        let domainInfo: DomainInfo = await tools.nnstool.getOwnerInfo(nnshash, Consts.baseContract);
        let info = new SellDomainInfo();
        info.copyDomainInfoToThis(domainInfo);
        try
        {
            var state = result.state as string;
            // info2.textContent = "";
            if (state.includes("FAULT, BREAK"))
            {
                throw "FAULT, BREAK";
            }
            let rest = new NNSResult();
            rest.textInfo = result;
            var stackarr = result[ "stack" ] as any[];
            let stack = ResultItem.FromJson(DataType.Array, stackarr).subItem[ 0 ].subItem
            info.id = stack[ 0 ].AsHash256();
            let parenthash = stack[ 1 ].AsHash256();
            let domain = stack[ 2 ].AsString();
            info.startBlockSelling = stack[ 4 ].AsInteger();
            info.endBlock = stack[ 5 ].AsInteger();
            info.maxPrice = stack[ 6 ].AsInteger();
            info.maxBuyer = stack[ 7 ].AsHash160();
            info.lastBlock = stack[ 8 ].AsInteger();
            if (!!info.id)
            {   //竞拍id不为空则查询域名下的余额
                info.balanceOfSelling = await this.getBalanceOfSeling(info.id);
            }

            return info;
        }
        catch (e)
        {
            console.error(e);

        }
    }

    /**
     * 获得
     * @param id 竞拍id
     */
    static async getBalanceOfSeling(id: Neo.Uint256)
    {
        let addr = LoginInfo.getCurrentAddress();
        let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);

        let res = await tools.contract.contractInvokeScript(
            tools.nnstool.root_neo.register,
            "balanceOfSelling",
            "(hex160)" + who.toString(),
            "(hex256)" + id.toString()
        );
        var stackarr = res[ "stack" ] as any[];
        let stack = ResultItem.FromJson(DataType.Array, stackarr).subItem[ 0 ];
        let balance = stack.AsInteger();
        return balance;
    }

    static async gasToRecharge(transcount: number)
    {
        let script = tools.contract.buildScript(tools.coinTool.id_SGAS, "mintTokens", []);
        //获得sgas的合约地址
        var sgasaddr = ThinNeo.Helper.GetAddressFromScriptHash(tools.coinTool.id_SGAS);
        try
        {
            let data1 = await tools.contract.buildInvokeTransData(script, sgasaddr, tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(transcount));
            let data2 = tools.nnssell.rechargeReg(transcount.toFixed(8));
            let res = await tools.wwwtool.rechargeandtransfer(data1.data, data2);
            if (res[ 'errCode' ] == '0000')
            {
                var height = await tools.wwwtool.api_getHeight();
                let txid = res[ 'txid' ];
                let olds = data1.tranmsg.info[ 'oldarr' ] as OldUTXO[];
                olds.map(old => old.height = height);
                OldUTXO.oldutxosPush(olds);
                return txid;
            } else
            {
                return undefined;
            }
        } catch (error)
        {
            throw error;
        }
    }

    /**
     * 注册器充值
     * @param amount 充值金额
     */
    static rechargeReg(amount: string)
    {
        let addressto = ThinNeo.Helper.GetAddressFromScriptHash(tools.nnstool.root_neo.register);
        let address = LoginInfo.getCurrentAddress();

        let sb = new ThinNeo.ScriptBuilder()
        //生成随机数
        let random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(new Uint8Array(32));
        let random_int = Neo.BigInteger.fromUint8Array(random_uint8);
        //塞入随机数
        sb.EmitPushNumber(random_int);
        sb.Emit(ThinNeo.OpCode.DROP);
        sb.EmitParamJson([
            "(addr)" + address,//from
            "(addr)" + addressto,//to
            "(int)" + amount.replace(".", "")//value
        ]);//参数倒序入
        sb.EmitPushString("transfer");//参数倒序入
        sb.EmitAppCall(tools.coinTool.id_SGAS);//nep5脚本

        ////这个方法是为了在同一笔交易中转账并充值
        ////当然你也可以分为两笔交易
        ////插入下述两条语句，能得到txid
        sb.EmitSysCall("System.ExecutionEngine.GetScriptContainer");
        sb.EmitSysCall("Neo.Transaction.GetHash");
        //把TXID包进Array里
        sb.EmitPushNumber(Neo.BigInteger.fromString("1"));
        sb.Emit(ThinNeo.OpCode.PACK);
        sb.EmitPushString("setmoneyin");
        sb.EmitAppCall(tools.nnstool.root_neo.register);
        let script = sb.ToArray();
        let res = tools.contract.buildInvokeTransData_attributes(script);
        // console.log(res);
        return res;
    }

    /**
     * 欲购买
     */
    static async wantbuy(subname: string)
    {
        try
        {
            let addr = LoginInfo.getCurrentAddress();
            let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);

            let register = tools.nnstool.root_neo.register;
            let param = [
                '(hex160)' + who.toString(),
                "(hex256)" + tools.nnstool.root_neo.roothash.toString(),
                "(str)" + subname
            ];

            let data = tools.contract.buildScript_random(register, "wantBuy", param);
            let res = await tools.contract.contractInvokeTrans_attributes(data);
            return res
        } catch (error)
        {
            throw error;
        }

    }

    /**
     * 竞标加价
     * @param domain 域名
     */
    static async addprice(domain: string, amount: number)
    {
        let info = await this.getSellingStateByDomain(domain);
        let who = new Neo.Uint160(
            ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress
                (
                LoginInfo.getCurrentAddress()
                ).buffer
        );

        let data = tools.contract.buildScript_random(
            tools.nnstool.root_neo.register,
            "addPrice",
            [ "(hex160)" + who.toString(), "(hex256)" + info.id.toString(), "(int)" + amount ]
        );
        let res = await tools.contract.contractInvokeTrans_attributes(data);
        return res;
    }

    /**
     * 
     * @param time 
     * @returns state(0:竞拍结束,1:正在竞拍, 2:随机时间)
     */
    static compareTime(time: number)
    {
        let currentTime = new Date().getTime();
        let res = currentTime - time
        let state: number = res > 1500000 ? (res < 109500000 ? 0 : 3) : res < 900000 ? 1 : 2;
        return state;
    }

    /**
     * 判断域名状态
     * @param info 域名详情
     */
    static compareState(info: SellDomainInfo)
    {
    }

    /**
     * 结束竞拍
     * @param domain 域名
     */
    static endSelling(id: string)
    {
        let addr = LoginInfo.getCurrentAddress();
        let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
        let script = tools.contract.buildScript_random(
            tools.nnstool.root_neo.register,
            "endSelling",
            [
                "(hex160)" + who.toString(),
                "(hex256)" + id
            ]
        );
        let res = tools.contract.buildInvokeTransData_attributes(script);
        return res;
    }

    /**
     * 获得领取域名
     * @param domain 域名
     */
    static getsellingdomain(id: string)
    {
        let addr = LoginInfo.getCurrentAddress();
        let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
        let script = tools.contract.buildScript_random(
            tools.nnstool.root_neo.register,
            "getSellingDomain",
            [
                "(hex160)" + who.toString(),
                "(hex256)" + id
            ]
        );
        let res = tools.contract.buildInvokeTransData_attributes(script);
        return res;
    }

    static async getMySellingDomain(domain)
    {
        let info = await tools.nnssell.getSellingStateByDomain(domain);
        if (info.endBlock.compareTo(Neo.BigInteger.Zero))
        {
            let data1 = this.endSelling(domain);
        }
        let addr = LoginInfo.getCurrentAddress();
        let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
        let script = tools.contract.buildScript_random(
            tools.nnstool.root_neo.register,
            "getSellingDomain",
            [
                "(hex160)" + who.toString(),
                "(hex256)" + info.id.toString()
            ]
        );
        let res = tools.contract.contractInvokeTrans_attributes(script);
        return res;
    }

    static async getBalanceOf()
    {
        let addr = LoginInfo.getCurrentAddress();
        let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
        let info = await tools.contract.contractInvokeScript(
            tools.nnstool.root_neo.register, "balanceOf", "(hex160)" + who.toString()
        );

        var stackarr = info[ "stack" ] as any[];
        let stack = ResultItem.FromJson(DataType.Array, stackarr);
        let num = stack.subItem[ 0 ].AsInteger();
        let res = parseFloat(num.toString()) / 100000000;
        // let res = num.divide(100000000).toString();
        // new Neo.Fixed8(num)
        // let number = (Neo.Fixed8.parse(num.toString()).getData().toNumber()) / 100000000;
        // console.log(res);
        return res.toString();
    }

    /**
     * 取回存储器下的sgas
     */
    static async getMoneyBack(amount: number)
    {
        let addr = LoginInfo.getCurrentAddress()
        let transcount = amount.toFixed(8).replace(".", "");
        let data = tools.contract.buildScript_random(
            tools.nnstool.root_neo.register,
            "getmoneyback",
            [ "(addr)" + addr, "(int)" + transcount ]
        )
        let res = await tools.contract.contractInvokeTrans_attributes(data)
        return res;
    }

    static async renewDomain(domain: string)
    {
        let addr = LoginInfo.getCurrentAddress();
        let who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr).buffer);
        let domainarr = domain.split(".").reverse();
        let str = domainarr[ 1 ];
        let roothash = tools.nnstool.nameHash(domainarr[ 0 ]);
        let data = tools.contract.buildScript_random(
            tools.nnstool.root_neo.register,
            "renewDomain", [
                "(hex160)" + who.toString(),
                "(hex256)" + roothash.toString(),
                "(str)" + str
            ]);
        try
        {
            let res = await tools.contract.contractInvokeTrans_attributes(data);
            if (!res.err)
            {
                return res.info;
            }
        } catch (error)
        {

        }

    }

}