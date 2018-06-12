import { tools } from "./importpack";
import { Domainmsg, DomainInfo, SellDomainInfo, NNSResult, ResultItem, DataType, LoginInfo } from "./entity";
import { VM } from "./const";
export default class NNSSell
{
    /**
     * 获得竞拍域名详情
     * @param domain 域名
     */
    static async getSellingStateByDomain(domain: string)
    {
        // tools.nnstool.initRootDomain(domainarr.reverse[ 0 ]);
        await tools.nnstool.initRootDomain("neo");
        var domainarr: string[] = domain.split('.');
        var nnshash: Neo.Uint256 = tools.nnstool.nameHashArray(domainarr);
        let data = tools.contract.buildScript(tools.nnstool.root_neo.register, "getSellingStateByFullhash", [ "(hex256)" + nnshash.toString() ]);

        let result = await tools.wwwtool.rpc_getInvokescript(data);
        let info = new SellDomainInfo();

        try
        {
            var state = result.state as string;
            // info2.textContent = "";
            if (!state.includes("HALT, BREAK"))
            {
                throw "error";
            }
            let rest = new NNSResult();
            rest.textInfo = result;
            var stackarr = result[ "stack" ] as any[];
            let stack = ResultItem.FromJson(DataType.Array, stackarr).subItem[ 0 ].subItem;

            if (stack.length >= 8)
            {
                // var stack = stackarr[ 0 ].value as any[];
                info.owner = stack[ 0 ].AsHash160();
                info.register = stack[ 1 ].AsHash160();
                info.resolver = stack[ 2 ].AsHash160();
                info.ttl = stack[ 3 ].AsInteger().toString();
                info.startBlockSelling = stack[ 4 ].AsInteger();
                info.endBlock = stack[ 5 ].AsInteger();
                info.maxPrice = stack[ 6 ].AsInteger();
                info.maxBuyer = stack[ 7 ].AsHash160();
                info.lastBlock = stack[ 8 ].AsInteger();
            }
            return info;

        }
        catch (e)
        {
            console.error(e);

        }
    }

    /**
     * 注册器充值
     * @param amount 充值金额
     */
    static async rechargeReg(amount: Neo.Fixed8)
    {
        let addressto = ThinNeo.Helper.GetAddressFromScriptHash(tools.nnstool.root_neo.register);
        let address = LoginInfo.getCurrentAddress();

        let sb = new ThinNeo.ScriptBuilder()
        sb.EmitParamJson([
            "(addr)" + address,//from
            "(addr)" + addressto,//to
            "(int)" + amount.toString()//value
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
        sb.Emit(VM.OpCode.PACK);
        sb.EmitPushString("setmoneyin");
        sb.EmitAppCall(tools.nnstool.root_neo.register);
        let script = sb.ToArray();
        let res = tools.contract.contractInvokeTrans_attributes(script)
        console.log(res);

    }

    /**
     * 欲购买
     */
    static async wantbuy()
    {
        try
        {
            let register = tools.nnstool.root_neo.register;
            let data = tools.contract.buildScript(register, "getOwnerInfo", [ '(hex256)' + tools.nnstool.root_neo.roothash.toString() ]);
            let res = await tools.wwwtool.rpc_getInvokescript(data);
            console.log(res);
        } catch (error)
        {
            throw error;
        }

    }

    /**
     * 竞标加价
     * @param domain 域名
     */
    static async addprice(domain)
    {
        let addressto = ThinNeo.Helper.GetAddressFromScriptHash(tools.nnstool.root_neo.register);
        let address = LoginInfo.getCurrentAddress();
    }
}