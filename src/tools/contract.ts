import { tools } from "./importpack";
import { LoginInfo, Result, OldUTXO } from "./entity";
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
     * invokeTrans 方式调用合约塞入attributes
     * @param script 合约的script
     */
    static async contractInvokeTrans_attributes(appCall: Neo.Uint160, method: string, param: string[])
    {
        let script = this.buildScript(appCall, method, param);
        let current: LoginInfo = LoginInfo.getCurrentLogin();
        var addr = current.address;
        var tran: ThinNeo.Transaction = new ThinNeo.Transaction();
        //合约类型
        tran.inputs = [];
        tran.outputs = [];
        tran.type = ThinNeo.TransactionType.InvocationTransaction;
        tran.extdata = new ThinNeo.InvokeTransData();
        //塞入脚本
        (tran.extdata as ThinNeo.InvokeTransData).script = script;
        tran.attributes = new Array<ThinNeo.Attribute>(1);
        tran.attributes[ 0 ] = new ThinNeo.Attribute();
        tran.attributes[ 0 ].usage = ThinNeo.TransactionAttributeUsage.Script;
        tran.attributes[ 0 ].data = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);

        if (tran.witnesses == null)
            tran.witnesses = [];
        var msg = tran.GetMessage().clone();
        var pubkey = current.pubkey.clone();
        var prekey = current.prikey.clone();
        var signdata = ThinNeo.Helper.Sign(msg, prekey);
        tran.AddWitness(signdata, pubkey, addr);
        var data: Uint8Array = tran.GetRawData();

        var res: Result = new Result();
        var result = await tools.wwwtool.api_postRawTransaction(data);
        res.err = !result[ "sendrawtransactionresult" ];
        res.info = result[ "txid" ];
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
        let current = LoginInfo.getCurrentLogin();
        let script = param[ 0 ];
        let have: boolean = param.length > 1;
        //地址，资产id，交易数量。如果有指则用传值没有值则用默认值
        let addr = have ? param[ 1 ] : current.address;
        let assetid = have ? param[ 2 ] : tools.coinTool.id_GAS;
        let count = have ? param[ 3 ] : Neo.Fixed8.Zero;
        //获得utxo,构造交易
        var utxos = await tools.coinTool.getassets();
        let tranmsg = tools.coinTool.makeTran(utxos, addr, assetid, count);
        let tran: ThinNeo.Transaction = tranmsg.info[ 'tran' ];
        //Parameter inversion 
        tran.type = ThinNeo.TransactionType.InvocationTransaction;
        tran.extdata = new ThinNeo.InvokeTransData();
        //塞入脚本
        (tran.extdata as ThinNeo.InvokeTransData).script = script;
        (tran.extdata as ThinNeo.InvokeTransData).gas = Neo.Fixed8.fromNumber(1.0);

        var msg = tran.GetMessage();
        var signdata = ThinNeo.Helper.Sign(msg, current.prikey);
        tran.AddWitness(signdata, current.pubkey, current.address);
        var data = tran.GetRawData();
        var height = await tools.wwwtool.api_getHeight();
        var result = await tools.wwwtool.api_postRawTransaction(data);

        if (result[ "sendrawtransactionresult" ])
        {
            let olds = tranmsg.info[ 'oldarr' ] as OldUTXO[];
            olds.map(old => old.height = height);
            OldUTXO.oldutxosPush(olds);
            return result[ "txid" ];
        } else
        {
            throw "Transaction send failure";

        }
    }

}