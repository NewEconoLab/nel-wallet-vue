import { tools } from "./importpack";
import { LoginInfo, Result, UTXO } from "./entity";

export default class SgasTool
{

    /**
     * gas -> sgas
     * @param wallet_transcount 兑换的数量
     */
    static async makeMintTokenTransaction(wallet_transcount)
    {

        var login = LoginInfo.getCurrentLogin();

        var utxos_assets = await tools.coinTool.getassets();

        var nepAddress = ThinNeo.Helper.GetAddressFromScriptHash(tools.coinTool.id_SGAS.toArray());
        console.log(nepAddress);


        try
        {
            var makeTranRes: Result = tools.coinTool.makeTran(utxos_assets, nepAddress, tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(wallet_transcount));
        }
        catch (e)
        {
            // this.showError("NEOGAS余额不足")
            return;
        }

        var tran: any = makeTranRes.info.tran;


        var sb = new ThinNeo.ScriptBuilder();
        //Parameter inversion 
        sb.EmitParamJson([]);//Parameter list 
        sb.EmitPushString("mintTokens");//Method
        sb.EmitAppCall(tools.coinTool.id_SGAS.toArray());  //Asset contract 

        tran.type = ThinNeo.TransactionType.InvocationTransaction;
        tran.extdata = new ThinNeo.InvokeTransData();
        // (tran.extdata).script = tools.contract.buildScript(tools.coinTool.id_SGAS, "mintTokens", []);  
        (tran.extdata).script = sb.ToArray();
        (tran.extdata).gas = Neo.Fixed8.fromNumber(1.0);

        var msg = tran.GetMessage();
        var signdata = ThinNeo.Helper.Sign(msg, login.prikey);
        tran.AddWitness(signdata, login.pubkey, login.address);
        var data = tran.GetRawData();
        var r = await tools.wwwtool.api_postRawTransaction(data);

        if (r)
        {
            if (r[ 'txid' ])
            {
                console.log("成功");
                return r[ 'txid' ];
            }
            else
            {
                throw "交易出错";
            }

        }
        else
        {
            throw "交易出错";
        }
    }


    /**
     * sgas -> gas
     * @param wallet_transcount 兑换数量
     */
    static async makeRefundTransaction(wallet_transcount)
    {
        // 查询SGAS余额
        // this.makeRefundTransaction_info(1);

        var res: Result = new Result();
        var postobj = { cmd: "makeRefundTransactionRes", data: res };

        var scriptaddress = tools.coinTool.id_SGAS;

        var login = LoginInfo.getCurrentLogin();

        //获取sgas合约地址的资产列表
        var utxos_assets = await tools.coinTool.getsgasAssets();
        var us = utxos_assets[ tools.coinTool.id_GAS ];
        if (us == undefined)
        {
            return;
        }

        //检查sgas地址拥有的gas的utxo是否有被标记过
        for (var i = us.length - 1; i >= 0; i--)
        {
            if (us[ i ].n > 0)
            {
                continue;
            }

            let script = null;

            var sb = new ThinNeo.ScriptBuilder();
            sb.EmitParamJson([ "(hex256)" + us[ i ].txid.toString() ]);
            sb.EmitPushString("getRefundTarget");
            sb.EmitAppCall(scriptaddress);

            script = sb.ToArray();

            var data = sb.ToArray();
            var r = await tools.wwwtool.rpc_getInvokescript(data);
            if (r)
            {
                // console.log('[gameplay][makeRefundTransaction][ ' + eventId + ' ]getRefundTarget.r ===========> ', r)
                var stack = r[ 'stack' ];
                var value = stack[ 0 ][ "value" ].toString();
                if (value.length > 0)
                {
                    // console.log('[gameplay][makeRefundTransaction][ ' + eventId + ' ]getRefundTarget.r.delete.i ============> ', i);
                    delete us[ i ];
                }
            }
        }
        //sgas 自己给自己转账   用来生成一个utxo  合约会把这个utxo标记给发起的地址使用
        try
        {
            var nepAddress = ThinNeo.Helper.GetAddressFromScriptHash(new Uint8Array(tools.coinTool.id_SGAS.bits.buffer));
            var makeTranRes: Result = tools.coinTool.makeTran(utxos_assets, nepAddress, tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(wallet_transcount));
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

            var scriptHash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(login.address)

            var sb = new ThinNeo.ScriptBuilder();
            sb.EmitParamJson([ "(bytes)" + scriptHash.toHexString() ]);
            sb.EmitPushString("refund");
            sb.EmitAppCall(scriptaddress);

            var tran: any = makeTranRes.info.tran;


            // console.log('[pay][makeRefundTransaction]getcontractstate, makeTranRes.tran =============> ', tran);

            tran.type = ThinNeo.TransactionType.InvocationTransaction;
            tran.extdata = new ThinNeo.InvokeTransData();
            (tran.extdata).script = sb.ToArray();

            //附加鉴证
            tran.attributes = new Array<ThinNeo.Attribute>(1);
            tran.attributes[ 0 ] = new ThinNeo.Attribute();
            tran.attributes[ 0 ].usage = ThinNeo.TransactionAttributeUsage.Script;
            tran.attributes[ 0 ].data = scriptHash; // ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);

            sb = new ThinNeo.ScriptBuilder();
            sb.EmitPushString("whatever")
            sb.EmitPushNumber(new Neo.BigInteger(250));
            tran.AddWitnessScript(sgasScript, sb.ToArray());

            //做提款人的签名
            var signdata = ThinNeo.Helper.Sign(tran.GetMessage(), login.prikey);
            tran.AddWitness(signdata, login.pubkey, login.address);

            var txid = tran.GetHash().clone().reverse().toHexString();
            var trandata = tran.GetRawData();

            // 发送交易请求
            // this.makeRefundTransaction_info(3)

            r = await tools.wwwtool.api_postRawTransaction(trandata);

            if (r)
            {
                if (r.txid)
                {

                    //ApiTool.addUserWalletLog(this.user.info.uid, this.user.info.token, r.txid, this.user.info.wallet, CoinTool.id_SGAS)

                    // 等待交易确认
                    // this.makeRefundTransaction_info(4)

                    // this.makeRefundTransaction_confirm(r.txid)
                }
                else
                {
                    // this.makeRefundTransaction_error("提取合约执行失败！")
                }

                console.log("[pay][makeRefundTransaction]提取请求结果 =============> ", r);
            }
            else
            {
                // this.makeRefundTransaction_error("发送提取交易失败！请检查网络，稍候重试！")
            }

        }
        else
        {
            // this.makeRefundTransaction_error("获取提取合约失败！")
        }


    }


    /**
     * 
     * @param txid 兑换gas的交易id
     * @param wallet_transcount 兑换数量 
     */
    private async makeRefundTransaction_confirm(txid, wallet_transcount)
    {
        var r = await tools.wwwtool.getrawtransaction(txid);
        if (r)
        {
            // 已经确认
            //tx的第一个utxo就是给自己的
            var utxo: UTXO = new UTXO();
            utxo.addr = LoginInfo.getCurrentAddress();
            utxo.txid = txid;
            utxo.asset = tools.coinTool.id_GAS;
            let transcount = wallet_transcount.toString()
            utxo.count = Neo.Fixed8.parse(transcount);
            utxo.n = 0;

            //把这个txid里的utxo[0]的value转给自己
            this.makeRefundTransaction_tranGas(utxo, transcount)

        }
        else
        {
            // 未确认, 5s后再执行
            setTimeout(() =>
            {
                this.makeRefundTransaction_confirm(txid, wallet_transcount)
            }, 3000)
        }
    }


    private async makeRefundTransaction_toGas_confirm(txid)
    {
        var r = await tools.wwwtool.getrawtransaction(txid);
        if (r)
        {
            // 已经确认
            // 转换成功
            // this.makeRefundTransaction_toGas_confirm_ok()
        }
        else
        {
            // 未确认, 5s后再执行
            setTimeout(() =>
            {
                this.makeRefundTransaction_toGas_confirm(txid)
            }, 3000)
        }
    }

    /**
     * 
     * @param utxo 兑换gas的utxo
     * @param wallet_transcount 兑换的数量
     */
    private async makeRefundTransaction_tranGas(utxo, wallet_transcount)
    {
        // 生成转换请求
        // this.makeRefundTransaction_info(4)

        // var res: Result = new Result();
        // var postobj = { cmd: "makeRefundTransactionRes", data: res };

        var utxos_assets = {}
        utxos_assets[ tools.coinTool.id_GAS ] = [];
        utxos_assets[ tools.coinTool.id_GAS ].push(utxo);

        console.log('[pay][makeRefundTransaction_tranGas]utxos_assets =============> ', utxos_assets)

        try
        {
            let addr = LoginInfo.getCurrentAddress();
            var makeTranRes: Result = tools.coinTool.makeTran(utxos_assets, addr, tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(wallet_transcount));
        }
        catch (e)
        {
            // this.makeRefundTransaction_error("生成转换请求失败")
            return
        }

        var tran: any = makeTranRes.info.tran;
        tran.type = ThinNeo.TransactionType.ContractTransaction;
        tran.version = 0;

        //sign and broadcast
        //做智能合约的签名
        var r = await tools.wwwtool.api_getcontractstate(tools.coinTool.id_SGAS.toString())

        // console.log('[gameplay][makeRefundTransaction][ ' + eventId + ' ]tranGas, api_getcontractstate.r =============> ', r)


        if (r && r[ 'script' ])
        {
            var sgasScript = r[ 'script' ].hexToBytes();

            var sb = new ThinNeo.ScriptBuilder();
            sb.EmitPushNumber(new Neo.BigInteger(0));
            sb.EmitPushNumber(new Neo.BigInteger(0));
            tran.AddWitnessScript(sgasScript, sb.ToArray());

            var txid = tran.GetHash().clone().reverse().toHexString();
            var trandata = tran.GetRawData();

            // 发送转换请求
            // this.makeRefundTransaction_info(6)


            r = await tools.wwwtool.api_postRawTransaction(trandata);
            if (r)
            {
                console.log('[pay][makeRefundTransaction_tranGas]api_postRawTransaction.r =============> ', r)

                // 成功

                // 确认转换请求
                // this.makeRefundTransaction_info(7)
                this.makeRefundTransaction_toGas_confirm(r.txid)
            }
            else
            {
                // this.makeRefundTransaction_error("发送转换请求失败！")
            }
        }
        else
        {
            // this.makeRefundTransaction_error("获取转换合约失败！")
        }

    }
}