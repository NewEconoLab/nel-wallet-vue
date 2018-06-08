import { tools } from "./importpack";
import { LoginInfo, Result, UTXO } from "./entity";

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
        var login = LoginInfo.getCurrentLogin();
        let script = tools.contract.buildScript(tools.coinTool.id_SGAS, "mintTokens", []);
        //获得sgas的合约地址
        var sgasaddr = ThinNeo.Helper.GetAddressFromScriptHash(tools.coinTool.id_SGAS);
        try
        {
            let txid = tools.contract.contractInvokeTrans(script, sgasaddr, tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(transcount));
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
        var login = LoginInfo.getCurrentLogin();

        //获取sgas合约地址的资产列表
        var utxos_assets = await tools.coinTool.getsgasAssets();
        //筛选出sgas合约地址的gas的utxo
        var us = utxos_assets[ tools.coinTool.id_GAS ];
        if (us == undefined)
        {
            return;
        }

        //接口等待提供
        //检查sgas地址拥有的gas的utxo是否有被标记过
        for (var i = us.length - 1; i >= 0; i--)
        {
            if (us[ i ].n > 0)
            {
                continue;
            }

            let script = tools.contract.buildScript(tools.coinTool.id_SGAS, "getRefundTarget", [ "(hex256)" + us[ i ].txid.toString() ]);
            var r = await tools.wwwtool.rpc_getInvokescript(script);
            if (r)
            {
                var stack = r[ 'stack' ];
                var value = stack[ 0 ][ "value" ].toString();
                if (value.length > 0)
                {
                    delete us[ i ];
                }
            }
        }
        //sgas 自己给自己转账   用来生成一个utxo  合约会把这个utxo标记给发起的地址使用
        try
        {
            var nepAddress = ThinNeo.Helper.GetAddressFromScriptHash(tools.coinTool.id_SGAS);
            var makeTranRes: Result = tools.coinTool.makeTran(utxos_assets, nepAddress, tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(transcount));
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

            var tran: any = makeTranRes.info.tran;
            tran.type = ThinNeo.TransactionType.InvocationTransaction;
            tran.extdata = new ThinNeo.InvokeTransData();
            (tran.extdata).script = tools.contract.buildScript(tools.coinTool.id_SGAS, "refund", [ "(bytes)" + scriptHash.toHexString() ]);

            //附加鉴证
            tran.attributes = new Array<ThinNeo.Attribute>(1);
            tran.attributes[ 0 ] = new ThinNeo.Attribute();
            tran.attributes[ 0 ].usage = ThinNeo.TransactionAttributeUsage.Script;
            tran.attributes[ 0 ].data = scriptHash; // ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);

            let sb = new ThinNeo.ScriptBuilder();
            sb.EmitPushString("whatever")
            sb.EmitPushNumber(new Neo.BigInteger(250));
            tran.AddWitnessScript(sgasScript, sb.ToArray());

            //做提款人的签名
            var signdata = ThinNeo.Helper.Sign(tran.GetMessage(), login.prikey);
            tran.AddWitness(signdata, login.pubkey, login.address);
            var trandata = tran.GetRawData();

            // 发送交易请求
            r = await tools.wwwtool.api_postRawTransaction(trandata);

            if (!!r && r[ "txid" ])
            {
                SgasTool.makeRefundTransaction_confirm(r[ 'txid' ], transcount)
                return r[ "txid" ];
            }
            else
            {
                throw "Transaction send failed";
            }

        }
        else
        {
            throw "Contract acquisition failure";
        }


    }


    /**
     * 
     * @param txid 兑换gas的交易id
     * @param transcount 兑换数量 
     */
    static async makeRefundTransaction_confirm(txid, transcount)
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
            utxo.count = Neo.Fixed8.parse(transcount.toString());
            utxo.n = 0;

            //把这个txid里的utxo[0]的value转给自己
            this.makeRefundTransaction_tranGas(utxo, transcount.toString())

        }
        else
        {
            // 未确认, 5s后再执行
            setTimeout(() =>
            {
                this.makeRefundTransaction_confirm(txid, transcount)
            }, 3000)
        }
    }


    static async makeRefundTransaction_toGas_confirm(txid)
    {
        var r = await tools.wwwtool.getrawtransaction(txid);
        if (r)
        {
            // 已经确认
            // 转换成功
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

        var tran: any = makeTranRes.info.tran;
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

            // 发送转换请求
            r = await tools.wwwtool.api_postRawTransaction(trandata);
            if (!!r && !!r[ "txid" ])
            {
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