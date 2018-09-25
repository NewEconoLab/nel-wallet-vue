import { tools } from "../tools/importpack";
import { LoginInfo, OldUTXO, UTXO } from "../tools/entity";

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
        try
        {
            let utxos = await tools.coinTool.getassets();
            let tranmsg = tools.coinTool.makeTran(utxos, cgasaddr, tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(count));
            let tran: ThinNeo.Transaction = tranmsg.info[ 'tran' ];
            if (!tranmsg.err)
            {

            }
            if (tran.inputs.length + tran.outputs.length > 60)
            {
                let trancount = Neo.Fixed8.fromNumber(count);
                //创建个 utxo 共自己使用
                let msg = tools.coinTool.makeTran(utxos, LoginInfo.getCurrentAddress(), tools.coinTool.id_GAS, trancount)
                let tran1 = msg.info[ "tran" ] as ThinNeo.Transaction;
                let data1 = await tools.coinTool.signData(tran1);
                let oldarr = msg.info[ "oldarr" ]
                OldUTXO.setOldutxos(oldarr);
                let txid = tran1.GetHash().clone().reverse().toHexString();
                //筛选已使用过的utxo
                utxos = await tools.coinTool.getassets();
                //构建一个 utxo
                let utxo: UTXO = new UTXO();
                utxo.addr = LoginInfo.getCurrentAddress();
                utxo.asset = tools.coinTool.id_GAS;
                utxo.count = trancount;
                utxo.n = 0;
                utxo.txid = txid;
                utxos[ tools.coinTool.id_GAS ] = [ utxo ].concat(utxos[ tools.coinTool.id_GAS ]);

                //创建 第二笔交易
                let tranmsg = tools.coinTool.makeTran(utxos, LoginInfo.getCurrentAddress(), tools.coinTool.id_GAS, trancount);
                tran = tranmsg.info[ 'tran' ];
                //Parameter inversion 
                tran.type = ThinNeo.TransactionType.InvocationTransaction;
                tran.extdata = new ThinNeo.InvokeTransData();
                //塞入脚本
                (tran.extdata as ThinNeo.InvokeTransData).script = script;
                (tran.extdata as ThinNeo.InvokeTransData).gas = Neo.Fixed8.fromNumber(0);

                let data2 = await tools.coinTool.signData(tran);

                let res = await tools.wwwtool.rechargeandtransfer(data1, data2);
            } else
            {

                //Parameter inversion 
                tran.type = ThinNeo.TransactionType.InvocationTransaction;
                tran.extdata = new ThinNeo.InvokeTransData();
                //塞入脚本
                (tran.extdata as ThinNeo.InvokeTransData).script = script;
                (tran.extdata as ThinNeo.InvokeTransData).gas = Neo.Fixed8.fromNumber(0);
                let data = await tools.coinTool.signData(tran);
                let res = await tools.wwwtool.api_postRawTransaction(data);
            }

            // return txid;
        } catch (error)
        {
            throw error;
        }
    }

    async exchangeGas() { }
}