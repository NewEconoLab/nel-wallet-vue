import { tools } from "./importpack";
import { LoginInfo, Result, OldUTXO } from "./entity";
import { CoinTool } from "./cointool";
export default class Contract
{
    constructor() { }

    /**
     * @method buildScript 构建script
     * @param appCall 合约地址
     * @param method 方法名
     * @param param 参数
     */
    static buildScript(appCall: Neo.Uint160, method: string, param: string[]): Uint8Array
    {
        var sb = new ThinNeo.ScriptBuilder();

        sb.EmitParamJson(param);//第二个参数是个数组
        sb.EmitPushString(method);
        sb.EmitAppCall(appCall);
        return sb.ToArray();
    }

    /**
     * @method buildScript 构建script
     * @param appCall 合约地址
     * @param method 方法名
     * @param param 参数
     */
    static buildScript_random(appCall: Neo.Uint160, method: string, param: any[]): Uint8Array
    {
        var sb = new ThinNeo.ScriptBuilder();
        //生成随机数
        let random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(new Uint8Array(32));
        let random_int = Neo.BigInteger.fromUint8Array(random_uint8);
        //塞入随机数
        sb.EmitPushNumber(random_int);
        sb.Emit(ThinNeo.OpCode.DROP);
        sb.EmitParamJson(param);//第二个参数是个数组
        sb.EmitPushString(method);
        sb.EmitAppCall(appCall);
        return sb.ToArray();
    }


    /**
     * @method buildScript 构建script
     * @param appCall 合约地址
     * @param method 方法名
     * @param param 参数
     */
    static buildScript_random_array(sbarr: ScriptEntity[]): Uint8Array
    {
        var sb = new ThinNeo.ScriptBuilder();
        //生成随机数
        let random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(new Uint8Array(32));
        let random_int = Neo.BigInteger.fromUint8Array(random_uint8);
        //塞入随机数
        sb.EmitPushNumber(random_int);
        sb.Emit(ThinNeo.OpCode.DROP);
        for (const script of sbarr)
        {
            sb.EmitParamJson(script.param);//第二个参数是个数组
            sb.EmitPushString(script.method);
            sb.EmitAppCall(script.appCall);
        }
        return sb.ToArray();
    }


    static async buildInvokeTransData_attributes(script: Uint8Array)
    {
        // let script = this.buildScript(appCall, method, param);
        var addr = LoginInfo.getCurrentAddress();
        var tran: ThinNeo.Transaction = new ThinNeo.Transaction();
        //合约类型
        tran.inputs = [];
        tran.outputs = [];
        tran.type = ThinNeo.TransactionType.InvocationTransaction;
        tran.extdata = new ThinNeo.InvokeTransData();
        //塞入脚本
        (tran.extdata as ThinNeo.InvokeTransData).script = script;
        tran.attributes = new Array<ThinNeo.Attribute>(1);
        tran.attributes[0] = new ThinNeo.Attribute();
        tran.attributes[0].usage = ThinNeo.TransactionAttributeUsage.Script;
        tran.attributes[0].data = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);

        if (tran.witnesses == null)
            tran.witnesses = [];
        let data = await CoinTool.signData(tran);
        return data
    }

    /**
     * invokeTrans 调用合约，允许转账
     * @param param[0]:script
     * @param param[1]:address
     * @param param[2]:assetid
     * @param param[3]:count
     */
    static async buildInvokeTransData(...param: any[])
    {
        let address = LoginInfo.getCurrentAddress()
        let script = param[0];
        let have: boolean = param.length > 1;
        //地址，资产id，交易数量。如果有指则用传值没有值则用默认值
        let addr = have ? param[1] : address;
        let assetid = have ? param[2] : tools.coinTool.id_GAS;
        let count = have ? param[3] : Neo.Fixed8.Zero;
        //获得utxo,构造交易
        var utxos = await tools.coinTool.getassets();
        let tranmsg = tools.coinTool.makeTran(utxos, addr, assetid, count);
        let tran: ThinNeo.Transaction = tranmsg.info['tran'];
        //Parameter inversion 
        tran.type = ThinNeo.TransactionType.InvocationTransaction;
        tran.extdata = new ThinNeo.InvokeTransData();
        //塞入脚本
        (tran.extdata as ThinNeo.InvokeTransData).script = script;
        (tran.extdata as ThinNeo.InvokeTransData).gas = Neo.Fixed8.fromNumber(1.0);

        let data = await CoinTool.signData(tran);
        return { data, tranmsg };
    }

    static async contractInvokeScript(appCall: Neo.Uint160, method: string, ...param: string[])
    {
        let data = this.buildScript(appCall, method, param);
        return await tools.wwwtool.rpc_getInvokescript(data);
    }

    /**
     * invokeTrans 方式调用合约塞入attributes
     * @param script 合约的script
     */
    static async contractInvokeTrans_attributes(script: Uint8Array)
    {
        var utxos = await CoinTool.getassets();
        var gass = utxos[tools.coinTool.id_GAS];
        var addr = LoginInfo.getCurrentAddress()
        var tran: ThinNeo.Transaction = new ThinNeo.Transaction();
        //合约类型
        tran.inputs = [];
        tran.outputs = [];
        tran.type = ThinNeo.TransactionType.InvocationTransaction;
        tran.extdata = new ThinNeo.InvokeTransData();
        //塞入脚本
        (tran.extdata as ThinNeo.InvokeTransData).script = script;
        tran.attributes = new Array<ThinNeo.Attribute>(1);
        tran.attributes[0] = new ThinNeo.Attribute();
        tran.attributes[0].usage = ThinNeo.TransactionAttributeUsage.Script;
        tran.attributes[0].data = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);
        let feeres: {
            inputs: ThinNeo.TransactionInput[];
            outputs: ThinNeo.TransactionOutput[];
            oldutxo: OldUTXO[];
        };
        if (gass && LoginInfo.info.payfee)
        {
            feeres = tools.coinTool.creatInuptAndOutup(gass, Neo.Fixed8.parse("0.001"));
            tran.inputs = feeres.inputs.map(input =>
            {
                input.hash = input.hash.reverse();
                return input
            });
            tran.outputs = feeres.outputs;
        }

        if (tran.witnesses == null)
            tran.witnesses = [];
        let data = await CoinTool.signData(tran);
        let txid = tran.GetTxid();
        var res: Result = new Result();
        try
        {
            var result = await tools.wwwtool.api_postRawTransaction(data);
            res.err = !result["sendrawtransactionresult"];
            res.info = txid;
        } catch (error)
        {
            res.err = true;
            res.info = txid
        }

        if (feeres && feeres.oldutxo)
        {
            OldUTXO.oldutxosPush(feeres.oldutxo);
        }
        return res;
    }

    /**
     * invokeTrans 调用合约，允许转账
     * @param param[0]:script
     * @param param[1]:address
     * @param param[2]:assetid
     * @param param[3]:count
     */
    static async contractInvokeTrans(...param: any[])
    {
        let address = LoginInfo.getCurrentAddress()
        let script = param[0];
        let have: boolean = param.length > 1;
        //地址，资产id，交易数量。如果有指则用传值没有值则用默认值
        let addr = have ? param[1] : address;
        let assetid = have ? param[2] : tools.coinTool.id_GAS;
        let count = have ? param[3] : Neo.Fixed8.Zero;
        //获得utxo,构造交易
        var utxos = await tools.coinTool.getassets();
        let tranmsg = tools.coinTool.makeTran(utxos, addr, assetid, count);
        let tran: ThinNeo.Transaction = tranmsg.info['tran'];
        //Parameter inversion 
        tran.type = ThinNeo.TransactionType.InvocationTransaction;
        tran.extdata = new ThinNeo.InvokeTransData();
        //塞入脚本
        (tran.extdata as ThinNeo.InvokeTransData).script = script;
        (tran.extdata as ThinNeo.InvokeTransData).gas = Neo.Fixed8.fromNumber(0);
        try
        {
            let data = await CoinTool.signData(tran);
            var height = await tools.wwwtool.api_getHeight();
            var result = await tools.wwwtool.api_postRawTransaction(data);
            if (result["sendrawtransactionresult"])
            {
                let olds = tranmsg.info['oldarr'] as OldUTXO[];
                olds.map(old => old.height = height);
                OldUTXO.oldutxosPush(olds);
                return result["txid"];
            } else
            {
                throw "Transaction send failure";

            }

        } catch (error)
        {

        }
    }

    /**
     * 获得notify通知出去的名称
     * @param txid 交易id
     */
    static async  getNotifyNames(txid: string): Promise<string[]>
    {
        let res = await tools.wwwtool.getNotify(txid);
        let notifications = res["notifications"] as Array<{ contract: string, state: { type: string, value: Array<{ type: string, value: string }> } }>;
        let methodnames = [];
        for (let index = 0; index < notifications.length; index++)
        {
            const value = notifications[index].state.value[0].value;
            methodnames.push(ThinNeo.Helper.Bytes2String(value.hexToBytes()));
        }
        return methodnames;
    }

}

export class ScriptEntity
{
    constructor(appCall: Neo.Uint160, method: string, param: any[])
    {
        this.appCall = appCall;
        this.param = param;
        this.method = method;
    }
    appCall: Neo.Uint160
    method: string
    param: any[]
}