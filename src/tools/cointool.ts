import { tools } from "./importpack";
import { RootDomainInfo, Consts, LoginInfo, DomainInfo, DomainStatus, Result, UTXO, OldUTXO, Claim, currentInfo, alert, LoginType, WalletOtcgo } from "./entity";

declare const mui;
export class CoinTool
{
    static readonly id_GAS: string = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
    static readonly id_NEO: string = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    static readonly id_SGAS: Neo.Uint160 = Neo.Uint160.parse('74f2dc36a68fdc4682034178eb2220729231db76');
    static readonly dapp_nnc: Neo.Uint160 = Neo.Uint160.parse("fc732edee1efdf968c23c20a9628eaa5a6ccb934");
    static assetID2name: { [ id: string ]: string } = {};
    static name2assetID: { [ id: string ]: string } = {};

    /**
     * @method 初始化资产
     */
    static async initAllAsset()
    {
        var allassets = await tools.wwwtool.api_getAllAssets();
        for (var a in allassets)
        {
            var asset = allassets[ a ];
            var names = asset.name;
            var id = asset.id;
            var name: string = "";
            if (id == CoinTool.id_GAS)
            {
                name = "GAS";
            }
            else if (id == CoinTool.id_NEO)
            {
                name = "NEO";
            }
            else if (id == CoinTool.id_SGAS.toString())
            {
                name = "CGAS";
            }
            else
            {
                for (var i in names)
                {
                    name = names[ i ].name;
                    if (names[ i ].lang == "en")
                        break;
                }
            }
            CoinTool.assetID2name[ id ] = name;
            CoinTool.name2assetID[ name ] = id;
        }
    }

    /**
     * @method 获得可用的utxo
     * @returns 筛选排序后的utxo
     */
    static async getassets(): Promise<{ [ id: string ]: UTXO[] }>
    {
        //获得高度
        var height = await tools.wwwtool.api_getHeight();
        var utxos = await tools.wwwtool.api_getUTXO(tools.storagetool.getStorage("current-address"));   //获得utxo
        var olds = OldUTXO.getOldutxos();       //获得以标记的utxo(交易过的utxo 存储在本地的标记)
        var olds2 = new Array<OldUTXO>();       //
        for (let n = 0; n < olds.length; n++)
        {
            const old = olds[ n ];
            let findutxo = false;
            for (let i = 0; i < utxos.length; i++)
            {
                let utxo = utxos[ i ];
                if (utxo.txid == old.txid)
                {
                    console.log(old);
                    console.log(utxo);
                    console.log(height - old.height);

                }
                if (utxo.txid == old.txid && old.n == utxo.n && height - old.height < 3)
                {
                    findutxo = true;
                    utxos.splice(i, 1);
                }
            }
            if (findutxo)
            {
                olds2.push(old);
            }
        }
        OldUTXO.setOldutxos(olds2);
        var assets = {};        //对utxo进行归类，并且将count由string转换成 Neo.Fixed8
        for (var i in utxos)
        {
            var item = utxos[ i ];
            var asset = item.asset;
            if (assets[ asset ] == undefined || assets[ asset ] == null)
            {
                assets[ asset ] = [];
            }
            let utxo = new UTXO();
            utxo.addr = item.addr;
            utxo.asset = item.asset;
            utxo.n = item.n;
            utxo.txid = item.txid;
            utxo.count = Neo.Fixed8.parse(item.value);
            assets[ asset ].push(utxo);
        }
        // }
        return assets;
    }

    /**
     * @method 创建交易对象 ThinNeo.Transaction
     * @param utxos utxo列表
     * @param targetaddr 对方地址
     * @param assetid 资产id
     * @param sendcount 金额
     */
    static makeTran(utxos: { [ id: string ]: UTXO[] }, targetaddr: string, assetid: string, sendcount: Neo.Fixed8): Result
    {
        var res = new Result();
        var us = utxos[ assetid ];
        var gasutxos = utxos[ tools.coinTool.id_GAS ];
        if (us == undefined)
        {
            throw new Error("no enough money.");
        }

        var tran = new ThinNeo.Transaction();
        tran.type = ThinNeo.TransactionType.ContractTransaction;
        tran.version = 0;//0 or 1
        tran.extdata = null;

        tran.attributes = [];
        utxos[ assetid ].sort((a, b) =>
        {
            return b.count.compareTo(a.count);
        });
        var old: OldUTXO[] = []
        tran.outputs = [];
        tran.inputs = [];

        let fee = Neo.Fixed8.parse('0.00000001');
        let sumcount = Neo.Fixed8.Zero; //初始化
        for (let i = 0; i < gasutxos.length; i++) //循环塞入utxo用于判断总数是否足够
        {
            sumcount.add(gasutxos[ i ].count);
        }
        if (tools.coinTool.id_GAS == assetid)   //如果转账的金额是gas
        {
            // let addcount = sendcount.add(fee);
            let tranRes = this.creatInuptAndOutup(gasutxos, sendcount, targetaddr);
            tran.inputs = tranRes.inputs;
            tran.outputs = tranRes.outputs;
            if (tran.outputs && tran.outputs.length > 1)
            {
                tran.outputs[ 1 ].value = tran.outputs[ 1 ].value.subtract(fee);
            }
        } else
        {
            // 创建 fee的输入输出
            let feeRes = this.creatInuptAndOutup(gasutxos, fee);
            tran.inputs = tran.inputs.concat(feeRes.inputs);
            tran.outputs = tran.outputs.concat(feeRes.outputs);

            //构造原本想要交易的输入输出
            let tranRes = this.creatInuptAndOutup(us, sendcount, targetaddr);
            tran.inputs = tran.inputs.concat(tranRes.inputs);
            tran.outputs = tran.outputs.concat(tranRes.outputs);
        }
        if (tran.witnesses == null)
            tran.witnesses = [];

        for (const i in tran.inputs)
        {
            const input = tran.inputs[ i ];
            old.push(new OldUTXO(input.hash.reverse().toHexString(), input.index))
        }
        res.err = false;
        res.info = { "tran": tran, "oldarr": old };

        return res;
    }

    /**
     * 创建一个交易中的输入和输出
     * @param utxos 资产的utxo 
     * @param sendcount 输出总数
     * @param target 对方地址
     * @returns res:{ inputs: ThinNeo.TransactionInput[], outputs: ThinNeo.TransactionOutput[] }
     */
    static creatInuptAndOutup(utxos: UTXO[], sendcount: Neo.Fixed8, target?: string)
    {
        let count = Neo.Fixed8.Zero;
        let res = {} as { inputs: ThinNeo.TransactionInput[], outputs: ThinNeo.TransactionOutput[], oldutxo: OldUTXO[] };
        res[ "inputs" ] = [];
        res[ "outputs" ] = [];
        res[ "oldutxo" ] = [];
        let scraddr = "";
        let assetId: Uint8Array;
        for (var i = 0; i < utxos.length; i++)
        {
            var input = new ThinNeo.TransactionInput();
            input.hash = utxos[ i ].txid.hexToBytes();
            input.index = utxos[ i ].n;
            input[ "_addr" ] = utxos[ i ].addr;//利用js的隨意性，臨時傳個值
            res.inputs.push(input);        //将utxo塞入input
            count = count.add(utxos[ i ].count);//添加至count中
            scraddr = utxos[ i ].addr;
            assetId = utxos[ i ].asset.hexToBytes().reverse();
            let old = new OldUTXO(utxos[ i ].txid, utxos[ i ].n);
            res.oldutxo.push(old);
            if (count.compareTo(sendcount) > 0) //判断输入是否足够
            {
                break;      //如果足够则跳出循环
            }
        }
        if (count.compareTo(sendcount) >= 0)
        {
            //输出
            if (target)
            {
                if (sendcount.compareTo(Neo.Fixed8.Zero) > 0)
                {
                    var output = new ThinNeo.TransactionOutput();
                    output.assetId = assetId
                    output.value = sendcount;
                    output.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(target);
                    res.outputs.push(output);
                }
            }
            let change = count.subtract(sendcount); //应该找零的值
            if (change.compareTo(Neo.Fixed8.Zero) > 0)
            {
                var outputchange = new ThinNeo.TransactionOutput();
                outputchange.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(scraddr);
                outputchange.value = change;
                outputchange.assetId = assetId
                res.outputs.push(outputchange);
            }
            return res;
        }
        else
        {
            throw "You don't have enough utxo;";

        }
    }

    /**
     * 构造并发送交易
     * @param {ThinNeo.Transaction} tran 
     * @param {string} randomStr
     */
    static async signData(tran: ThinNeo.Transaction): Promise<Uint8Array>
    {
        try
        {
            let info = await LoginInfo.deblocking();
            let addr = LoginInfo.getCurrentAddress();
            let current = LoginInfo.info
            var msg = tran.GetMessage().clone();
            var pubkey = current.pubkey.clone();
            var prekey = current.prikey.clone();
            var signdata = ThinNeo.Helper.Sign(msg, prekey);
            tran.AddWitness(signdata, pubkey, addr);
            var data: Uint8Array = tran.GetRawData();
            return data;
        } catch (error)
        {
            throw "Signature interrupt";
        }

    }

    /**
     * utxo转账方法
     * @param targetaddr 转入的地址
     * @param asset 资产
     * @param count 金额
     */
    static async rawTransaction(targetaddr: string, asset: string, count: string): Promise<Result>
    {

        var arr = tools.storagetool.getLoginArr();
        var add = tools.storagetool.getStorage("current-address")
        var n = arr.findIndex(login => login.address == add);
        var _count = Neo.Fixed8.parse(count + "");
        var utxos = await CoinTool.getassets();
        try
        {
            var tranres = CoinTool.makeTran(utxos, targetaddr, asset, _count);  //获得tran和改变后的utxo
            var tran: ThinNeo.Transaction = tranres.info[ 'tran' ];
            if (tran.witnesses == null)
                tran.witnesses = [];
            let txid = tran.GetHash().clone().reverse().toHexString();
            let data;
            try
            {
                data = await this.signData(tran);
                var res: Result = new Result();
                var height = await tools.wwwtool.api_getHeight();
                var result = await tools.wwwtool.api_postRawTransaction(data);
                if (result[ "sendrawtransactionresult" ])
                {
                    res.err = !result;
                    res.info = result[ 'txid' ];
                    let olds = tranres.info[ 'oldarr' ] as OldUTXO[];
                    olds.map(old => old.height = height);
                    OldUTXO.oldutxosPush(olds);
                }
                return res;
            } catch (error)
            {
                console.log(error);
                throw error;

            }
        } catch (error) 
        {
            console.log("error  input");

            throw error;
        }
    }

    /**
     * 从api中得到claim的交易体发送 Claim交易
     */
    static async claimgas()
    {
        let claimtxhex: string = await tools.wwwtool.api_getclaimtxhex(LoginInfo.getCurrentAddress());

        //对象化交易体
        var tran = new ThinNeo.Transaction();
        var buf = claimtxhex.hexToBytes();
        tran.Deserialize(new Neo.IO.BinaryReader(new Neo.IO.MemoryStream(buf.buffer, 0, buf.byteLength)));
        let data = await this.signData(tran);

        var result = await tools.wwwtool.api_postRawTransaction(data);
        return result
    }

    /**
     * 自己构造 claim交易
     */
    static async claimGas()
    {
        var address = LoginInfo.getCurrentAddress();
        let claimsstr = await tools.wwwtool.api_getclaimgas(address, 0);
        let claims = claimsstr[ "claims" ] as Claim[];
        let sum = claimsstr[ "gas" ].toFixed(8);

        var tran = new ThinNeo.Transaction();
        //交易类型为合约交易
        tran.type = ThinNeo.TransactionType.ClaimTransaction;
        tran.version = 0;//0 or 1
        tran.extdata = new ThinNeo.ClaimTransData(); //JSON.parse(JSON.stringify(claims));
        (tran.extdata as ThinNeo.ClaimTransData).claims = []
        tran.attributes = [];
        tran.inputs = [];
        for (let i in claims)
        {
            let claim = (claims[ i ] as Claim);
            var input = new ThinNeo.TransactionInput();
            input.hash = (claim.txid).hexToBytes().reverse();
            input.index = claim.n;
            input[ "_addr" ] = claim.addr;
            (tran.extdata as ThinNeo.ClaimTransData).claims.push(input);
        }
        var output = new ThinNeo.TransactionOutput();
        output.assetId = (CoinTool.id_GAS).hexToBytes().reverse();
        output.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(address)
        output.value = Neo.Fixed8.parse(sum);
        tran.outputs = [];
        tran.outputs.push(output);
        let data = await this.signData(tran);
        var result = await tools.wwwtool.api_postRawTransaction(data);
        result[ 'amount' ] = sum;
        return result
    }

    /**
     * invokeTrans 方式调用合约塞入attributes
     * @param script 合约的script
     */
    static async contractInvokeTrans_attributes(script: Uint8Array)
    {
        var addr = LoginInfo.getCurrentAddress()
        var utxos = await CoinTool.getassets();
        var gass = utxos[ tools.coinTool.id_GAS ];
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
        let feeres = tools.coinTool.creatInuptAndOutup(gass, Neo.Fixed8.parse("0.00000001"));
        tran.inputs = feeres.inputs.map(input =>
        {
            input.hash = input.hash.reverse();
            return input
        });
        tran.outputs = feeres.outputs;

        if (tran.witnesses == null)
            tran.witnesses = [];
        let data = await this.signData(tran);
        var res: Result = new Result();
        var result = await tools.wwwtool.api_postRawTransaction(data);
        res.err = !result[ "sendrawtransactionresult" ];
        res.info = result[ "txid" ];

        return res;
    }

    /**
     * invokeTrans 方式调用合约塞入attributes
     * @param script 合约的script
     */
    static async contractInvokeTrans(script: Uint8Array)
    {
        var addr = LoginInfo.getCurrentAddress();
        let assetid = CoinTool.id_GAS;
        //let _count = Neo.Fixed8.Zero;   //十个gas内都不要钱滴
        var utxos = await CoinTool.getassets();
        let tranmsg = CoinTool.makeTran(utxos, addr, assetid, Neo.Fixed8.Zero);
        let tran: ThinNeo.Transaction = tranmsg.info[ 'tran' ];
        tran.type = ThinNeo.TransactionType.InvocationTransaction;
        tran.extdata = new ThinNeo.InvokeTransData();
        //塞入脚本
        (tran.extdata as ThinNeo.InvokeTransData).script = script;
        // (tran.extdata as ThinNeo.InvokeTransData).gas = Neo.Fixed8.fromNumber(1.0);

        if (tran.witnesses == null)
            tran.witnesses = [];
        let data = await this.signData(tran);
        var res: Result = new Result();
        var result = await tools.wwwtool.api_postRawTransaction(data);
        res.err = !result;
        res.info = "成功";
        return res;
    }

    /**
     * nep5转账
     * @param address 自己的地址
     * @param tatgeraddr 转账的地址
     * @param asset nep5资产id
     * @param amount 转账数额
     */
    static async nep5Transaction(address: string, tatgeraddr, asset: string, amount: number)
    {
        let res = await tools.wwwtool.getNep5Asset(asset);
        var decimals = res[ "decimals" ] as number;
        let intv = amount.toFixed(decimals).replace(".", "")
        var sb = new ThinNeo.ScriptBuilder();
        var scriptaddress = asset.hexToBytes().reverse();
        //生成随机数
        let random_uint8 = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(new Uint8Array(32));
        let random_int = Neo.BigInteger.fromUint8Array(random_uint8);
        //塞入随机数
        sb.EmitPushNumber(random_int);
        sb.Emit(ThinNeo.OpCode.DROP);
        //塞值
        sb.EmitParamJson([ "(address)" + address, "(address)" + tatgeraddr, "(integer)" + intv ]);//第二个参数是个数组
        sb.EmitPushString("transfer");
        sb.EmitAppCall(scriptaddress);
        var result = await tools.contract.contractInvokeTrans_attributes(sb.ToArray())
        return result;
    }

    /**
     * @method 获得Sgas账户下的utxo
     */
    static async getavailableutxos(count: number): Promise<{ [ id: string ]: UTXO[] }>
    {
        let currentaddr = LoginInfo.getCurrentAddress();
        let utxos = await tools.wwwtool.getavailableutxos(currentaddr, count);
        var assets = {};        //对utxo进行归类，并且将count由string转换成 Neo.Fixed8
        var addr = ThinNeo.Helper.GetAddressFromScriptHash(tools.coinTool.id_SGAS);
        var asset = tools.coinTool.id_GAS;
        assets[ asset ] = [];
        for (var i in utxos)
        {
            var item = utxos[ i ];
            let utxo = new UTXO();
            utxo.addr = addr;
            utxo.asset = asset;
            utxo.n = item.n;
            utxo.txid = item.txid;
            utxo.count = Neo.Fixed8.parse(item.value);
            assets[ asset ].push(utxo);
        }

        return assets;
    }



}