import { tools } from "./importpack";
import { LoginInfo, Result, UTXO, ResultItem } from "./entity";

/**
 * @name Sgas兑换Gas工具类
 */
export default class SgasTool
{

    /**
     * gas -> sgas
     * @param transcount 兑换的数量
     */
    static async makeMintTokenTransaction(transcount)
    {
        //获得登陆信息
        let script = tools.contract.buildScript(tools.coinTool.id_SGAS, "mintTokens", []);
        //获得sgas的合约地址
        var sgasaddr = ThinNeo.Helper.GetAddressFromScriptHash(tools.coinTool.id_SGAS);
        try
        {
            let txid = await tools.contract.contractInvokeTrans(script, sgasaddr, tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(transcount));
            return txid;
        } catch (error)
        {
            throw error;
        }
    }


    /**
     * sgas -> gas
     * @param transcount 兑换数量
     */
    static async makeRefundTransaction(transcount)
    {
        //获取sgas合约地址的资产列表
        let utxos_current = await tools.coinTool.getassets();
        let utxos_cgas = await tools.wwwtool.getavailableutxos(LoginInfo.getCurrentAddress(), transcount);
        var nepAddress = ThinNeo.Helper.GetAddressFromScriptHash(tools.coinTool.id_SGAS);
        let gass: UTXO[] = utxos_current[ tools.coinTool.id_GAS ];
        var cgass: UTXO[] = []
        for (var i in utxos_cgas)
        {
            var item = utxos_cgas[ i ];
            let utxo = new UTXO();
            utxo.addr = nepAddress;
            utxo.asset = tools.coinTool.id_GAS;
            utxo.n = item.n;
            utxo.txid = item.txid;
            utxo.count = Neo.Fixed8.parse(item.value);
            cgass.push(utxo);
        }
        var tran: ThinNeo.Transaction = new ThinNeo.Transaction();
        //合约类型
        tran.inputs = [];
        tran.outputs = [];
        tran.type = ThinNeo.TransactionType.InvocationTransaction;
        tran.extdata = new ThinNeo.InvokeTransData();

        //sgas 自己给自己转账   用来生成一个utxo  合约会把这个utxo标记给发起的地址使用
        try
        {
            let cgasRes = tools.coinTool.creatInuptAndOutup(cgass, Neo.Fixed8.fromNumber(transcount), nepAddress);
            let feeRes = tools.coinTool.creatInuptAndOutup(gass, Neo.Fixed8.fromNumber(0.00000001));
            tran.inputs = cgasRes.inputs;
            tran.outputs = cgasRes.outputs;
            if (feeRes)
            {
                tran.inputs = tran.inputs.concat(feeRes.inputs);
                tran.outputs = tran.outputs.concat(feeRes.outputs);
            }
            for (const i in tran.inputs)
            {
                tran.inputs[ i ].hash = tran.inputs[ i ].hash.reverse();
            }
        }
        catch (e)
        {
            throw "";
        }

        var r = await tools.wwwtool.api_getcontractstate(tools.coinTool.id_SGAS.toString())
        if (r && r[ 'script' ])
        {
            var sgasScript = r[ 'script' ].hexToBytes();

            var scriptHash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(LoginInfo.getCurrentAddress())

            tran.type = ThinNeo.TransactionType.InvocationTransaction;
            (tran.extdata as ThinNeo.InvokeTransData).script
                = tools.contract.buildScript(tools.coinTool.id_SGAS, "refund", [ "(bytes)" + scriptHash.toHexString() ]);

            //附加鉴证
            tran.attributes = new Array<ThinNeo.Attribute>(1);
            tran.attributes[ 0 ] = new ThinNeo.Attribute();
            tran.attributes[ 0 ].usage = ThinNeo.TransactionAttributeUsage.Script;
            tran.attributes[ 0 ].data = scriptHash;
            //构建一个script
            let sb = new ThinNeo.ScriptBuilder();
            sb.EmitPushString("whatever")
            sb.EmitPushNumber(new Neo.BigInteger(250));
            tran.AddWitnessScript(sgasScript, sb.ToArray());

            let txid = tran.GetTxid();
            //做提款人的签名
            var data = await tools.coinTool.signData(tran);
            return { txid, data };
        }
        else
        {
            throw "Contract acquisition failure";
        }


    }

    /**
     * 
     * @param utxo 兑换gas的utxo
     * @param transcount 兑换的数量
     */
    static async makeRefundTransaction_tranGas(utxo, transcount)
    {
        var tran: ThinNeo.Transaction = new ThinNeo.Transaction();
        //合约类型
        tran.inputs = [];
        tran.outputs = [];
        tran.type = ThinNeo.TransactionType.ContractTransaction;
        tran.version = 0;
        tran.extdata = null;
        tran.attributes = []

        try
        {
            let fee = Neo.Fixed8.fromNumber(0.00000001);                //网络费用
            let sendcount = transcount.subtract(fee);    //由于转账使用的utxo和需要转换的金额一样大所以输入只需要塞入减去交易费的金额，utxo也足够使用交易费
            let tranRes = tools.coinTool.creatInuptAndOutup([ utxo ], sendcount, LoginInfo.getCurrentAddress());   //创建交易
            tran.inputs = tranRes.inputs;
            tran.outputs = tranRes.outputs;
            tran.outputs.length = 1;  //去掉找零的部分，只保留一个转账位
            for (const n in tran.inputs)
            {
                tran.inputs[ n ].hash = tran.inputs[ n ].hash.reverse();
            }
        } catch (error)
        {

        }
        //sign and broadcast
        //做智能合约的签名
        var r = await tools.wwwtool.api_getcontractstate(tools.coinTool.id_SGAS.toString())

        if (r && r[ 'script' ])
        {
            var sgasScript = r[ 'script' ].hexToBytes();
            var sb = new ThinNeo.ScriptBuilder();
            sb.EmitPushNumber(new Neo.BigInteger(0));
            sb.EmitPushNumber(new Neo.BigInteger(0));
            tran.AddWitnessScript(sgasScript, sb.ToArray());
            var trandata = tran.GetRawData();

            return trandata;
        }
        else
        {
            // this.makeRefundTransaction_error("获取转换合约失败！")
        }

    }

    static async canClaimCount()
    {
        // let addr = LoginInfo.getCurrentAddress();
        // let script = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);
        // let scriptHash = ThinNeo.Helper.Bytes2String(script);

        let who = new Neo.Uint160(
            ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress
                (
                LoginInfo.getCurrentAddress()
                ).buffer
        );
        let data = tools.contract.buildScript(tools.coinTool.dapp_nnc, "canClaimCount", [ "(hex160)" + who.toString() ]);
        let res = await tools.wwwtool.rpc_getInvokescript(data);
        let stack = res[ "stack" ][ 0 ]
        let amount = ResultItem.FromJson(stack[ "type" ], stack[ "value" ]);
        //console.log(amount.AsInteger().toString());

        return amount.AsInteger().toString();
    }
}