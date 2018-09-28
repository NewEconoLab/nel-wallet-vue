import { tools } from "../tools/importpack";
import { LoginInfo, OldUTXO, UTXO, Result } from "../tools/entity";

export class ExchangeService
{
    /**
     * Gas兑换CGas
     * @param count 兑换数量
     */
    async exchangeCGas(count: number)
    {
        //获得登陆信息
        let script = tools.contract.buildScript(tools.coinTool.id_SGAS, "mintTokens", []);
        //获得sgas的合约地址
        var cgasaddr = ThinNeo.Helper.GetAddressFromScriptHash(tools.coinTool.id_SGAS);

        let res = new Result();
        try
        {
            let utxos = await tools.coinTool.getassets();
            let tranmsg = tools.coinTool.makeTran(utxos, cgasaddr, tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(count));
            let tran: ThinNeo.Transaction = tranmsg.info[ 'tran' ];
            if (!tranmsg.err)
            {
                if (tran.inputs.length + tran.outputs.length > 60)
                {
                    res.err = true;
                    res.info = { code: "1006", msg: "" }
                    return res;
                }
                else
                {
                    //Parameter inversion 
                    tran.type = ThinNeo.TransactionType.InvocationTransaction;
                    tran.extdata = new ThinNeo.InvokeTransData();
                    //塞入脚本
                    (tran.extdata as ThinNeo.InvokeTransData).script = script;
                    (tran.extdata as ThinNeo.InvokeTransData).gas = Neo.Fixed8.fromNumber(0);
                    let data = await tools.coinTool.signData(tran);
                    let result = await tools.wwwtool.api_postRawTransaction(data);
                    res.err = !result[ "sendrawtransactionresult" ];
                    if (res.err)
                        res.info = { code: "-100", msg: "" };
                    else
                        res.info = result[ "txid" ];

                    return res;
                }
            }

            // return txid;
        } catch (error)
        {
            throw error;
        }
    }

    async exchangeGas() { }

    /**
     * 自己使用的 切分 utxo
     */
    async splitUtxo()
    {
        let utxos = await tools.coinTool.getassets();
        let gass = utxos[ tools.coinTool.id_GAS ];
        let tran = new ThinNeo.Transaction();

        tran.type = ThinNeo.TransactionType.ContractTransaction;
        tran.version = 0;//0 or 1
        tran.extdata = null;
        tran.attributes = [];
        tran.inputs = [];
        tran.outputs = [];
        tran.witnesses = tran.witnesses == null ? [] : tran.witnesses;

        let count = Neo.Fixed8.Zero;
        for (const i in gass)
        {
            const gas = gass[ i ];
            let input = new ThinNeo.TransactionInput();
            input.hash = gas.txid.hexToBytes().reverse();
            input.index = gas.n;
            tran.inputs.push(input);
            count = count.add(gas.count);
            if (count.compareTo(Neo.Fixed8.fromNumber(60)) > 1)
            {
                break;
            }
        }

        for (let index = 0; index < 600; index++)
        {
            let output = new ThinNeo.TransactionOutput();
            output.assetId = tools.coinTool.id_GAS.hexToBytes().reverse();;
            output.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(LoginInfo.getCurrentAddress());
            output.value = Neo.Fixed8.fromNumber(0.1);
            tran.outputs.push(output);
        }

        let sub = count.subtract(Neo.Fixed8.fromNumber(61));
        let change = new ThinNeo.TransactionOutput();
        change.assetId = tools.coinTool.id_GAS.hexToBytes().reverse();
        change.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(LoginInfo.getCurrentAddress());
        change.value = sub;
        tran.outputs.push(change);

        let data = await tools.coinTool.signData(tran);

        let res = await tools.wwwtool.api_postRawTransaction(data);
        console.log(res);


    }

}