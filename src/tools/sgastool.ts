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
        // 查询SGAS余额
        // var login = LoginInfo.getCurrentLogin();

        //获取sgas合约地址的资产列表
        var utxos_assets = await tools.coinTool.getavailableutxos(transcount);

        //sgas 自己给自己转账   用来生成一个utxo  合约会把这个utxo标记给发起的地址使用
        try
        {
            var nepAddress = ThinNeo.Helper.GetAddressFromScriptHash(tools.coinTool.id_SGAS);
            let count = Neo.Fixed8.fromNumber(transcount).subtract(Neo.Fixed8.fromNumber(0.00000001));
            var makeTranRes: Result = tools.coinTool.makeTran(utxos_assets, nepAddress, tools.coinTool.id_GAS, count);
        }
        catch (e)
        {
            // this.makeRefundTransaction_error("SGAS余额不足")
            return;
        }

        var r = await tools.wwwtool.api_getcontractstate(tools.coinTool.id_SGAS.toString())
        if (r && r[ 'script' ])
        {
            var sgasScript = r[ 'script' ].hexToBytes();

            var scriptHash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(LoginInfo.getCurrentAddress())

            var tran: any = makeTranRes.info.tran;
            tran.type = ThinNeo.TransactionType.InvocationTransaction;
            tran.extdata = new ThinNeo.InvokeTransData();
            (tran.extdata).script = tools.contract.buildScript(tools.coinTool.id_SGAS, "refund", [ "(bytes)" + scriptHash.toHexString() ]);

            //附加鉴证
            tran.attributes = new Array<ThinNeo.Attribute>(1);
            tran.attributes[ 0 ] = new ThinNeo.Attribute();
            tran.attributes[ 0 ].usage = ThinNeo.TransactionAttributeUsage.Script;
            tran.attributes[ 0 ].data = scriptHash;

            let sb = new ThinNeo.ScriptBuilder();
            sb.EmitPushString("whatever")
            sb.EmitPushNumber(new Neo.BigInteger(250));
            tran.AddWitnessScript(sgasScript, sb.ToArray());

            let txid = tran.GetHash().clone().reverse().toHexString();
            //做提款人的签名
            var data = await tools.coinTool.signData(tran);
            return { txid, data };

            // 发送交易请求
            // r = await tools.wwwtool.api_postRawTransaction(data);
            // throw "Transaction send failed";

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
        // 生成转换请求
        var utxos_assets = {}
        utxos_assets[ tools.coinTool.id_GAS ] = [];
        utxos_assets[ tools.coinTool.id_GAS ].push(utxo);

        try
        {
            let addr = LoginInfo.getCurrentAddress();
            var makeTranRes: Result = tools.coinTool.makeTran(utxos_assets, addr, tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(transcount));
        }
        catch (e)
        {
            return
        }

        var tran: ThinNeo.Transaction = makeTranRes.info.tran;
        tran.type = ThinNeo.TransactionType.ContractTransaction;
        tran.version = 0;

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

    static async claim()
    {
        let who = new Neo.Uint160(
            ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress
                (
                LoginInfo.getCurrentAddress()
                ).buffer
        );
        let data = tools.contract.buildScript(tools.coinTool.dapp_nnc, "claim", [ "(hex160)" + who.toString() ]);
        let res = await tools.contract.contractInvokeTrans(data);
        console.log(res);
        return res;
        //prikey,Config.dapp_nnc, "claim", "(bytes)" + strhash
    }
}