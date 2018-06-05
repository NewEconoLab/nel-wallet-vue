import { tools } from "./importpack";
import { RootDomainInfo, Consts, LoginInfo, DomainInfo, DomainStatus, Result, UTXO, OldUTXO, Claim } from "./entity";

export class CoinTool
{
    static readonly id_GAS: string = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
    static readonly id_NEO: string = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    static readonly id_SGAS: string = "0xe52a08c20986332ad8dccf9ded38cc493878064a";
    static assetID2name: { [ id: string ]: string } = {};
    static name2assetID: { [ id: string ]: string } = {};
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
            else if (id == CoinTool.id_SGAS)
            {
                name = "SGAS";
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
     * 获得utxos
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
                if (utxo.txid == old.txid && old.n == utxo.n && height - old.height <= 2)
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
        //if (sendcount.compareTo(Neo.Fixed8.Zero) <= 0)
        //    throw new Error("can not send zero.");
        var res = new Result();
        var us = utxos[ assetid ];
        if (us == undefined)
        {
            // res.err = true;
            // res.info = "no enough money.";
            throw new Error("no enough money.");
        }

        var tran = new ThinNeo.Transaction();
        tran.type = ThinNeo.TransactionType.ContractTransaction;
        tran.version = 0;//0 or 1
        tran.extdata = null;

        tran.attributes = [];

        tran.inputs = [];
        var scraddr: string = "";
        utxos[ assetid ].sort((a, b) =>
        {
            return a.count.compareTo(b.count);
        });
        var count: Neo.Fixed8 = Neo.Fixed8.Zero;
        var clonearr = [].concat(us);       //用于返回剩余可用的utxo
        var old: OldUTXO[] = []
        for (var i = 0; i < us.length; i++)
        {
            var input = new ThinNeo.TransactionInput();
            input.hash = us[ i ].txid.hexToBytes().reverse();
            input.index = us[ i ].n;
            input[ "_addr" ] = us[ i ].addr;//利用js的隨意性，臨時傳個值
            tran.inputs.push(input);        //将utxo塞入input
            count = count.add(us[ i ].count);//添加至count中
            scraddr = us[ i ].addr;
            clonearr.shift();               //删除已塞入的utxo
            old.push(new OldUTXO(us[ i ].txid, us[ i ].n));
            if (count.compareTo(sendcount) > 0) //判断输入是否足够
            {
                break;      //如果足够则跳出循环
            }
        }


        if (count.compareTo(sendcount) >= 0)//输入大于等于输出
        {
            tran.outputs = [];
            //输出
            if (sendcount.compareTo(Neo.Fixed8.Zero) > 0)
            {
                var output = new ThinNeo.TransactionOutput();
                output.assetId = assetid.hexToBytes().reverse();
                output.value = sendcount;
                output.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(targetaddr);
                tran.outputs.push(output);
            }

            //找零
            var change = count.subtract(sendcount);
            if (change.compareTo(Neo.Fixed8.Zero) > 0)
            {
                var outputchange = new ThinNeo.TransactionOutput();
                outputchange.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(scraddr);
                outputchange.value = change;
                outputchange.assetId = assetid.hexToBytes().reverse();
                tran.outputs.push(outputchange);

            }
            res.err = false;
            res.info = { "tran": tran, "oldarr": old };
        }
        else
        {
            throw new Error("no enough money.");
        }
        return res;
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
            var msg = tran.GetMessage().clone();
            var pubkey = arr[ n ].pubkey.clone();
            var prekey = arr[ n ].prikey.clone();
            var addr = arr[ n ].address;
            var signdata = ThinNeo.Helper.Sign(msg, prekey);
            tran.AddWitness(signdata, pubkey, addr);

            var data: Uint8Array = tran.GetRawData();

            var res: Result = new Result();
            var height = await tools.wwwtool.api_getHeight();
            var result = await tools.wwwtool.api_postRawTransaction(data);
            if (result[ "sendrawtransactionresult" ])
            {
                res.err = !result;
                res.info = txid;
                let olds = tranres.info[ 'oldarr' ] as OldUTXO[];
                olds.map(old => old.height = height);
                OldUTXO.oldutxosPush(olds);
            }
            return res;
        } catch (error) 
        {
            throw error;
        }
    }

    /**
     * 领取gas
     */
    static async claimgas()
    {
        let claimtxhex: string = await tools.wwwtool.api_getclaimtxhex(LoginInfo.getCurrentAddress());

        //对象化交易体
        var tran = new ThinNeo.Transaction();
        var buf = claimtxhex.hexToBytes();
        tran.Deserialize(new Neo.IO.BinaryReader(new Neo.IO.MemoryStream(buf.buffer, 0, buf.byteLength)));
        var current = LoginInfo.getCurrentLogin();
        var msg = tran.GetMessage().clone();
        var signdata = ThinNeo.Helper.Sign(msg, current.prikey);
        tran.AddWitness(signdata, current.pubkey, current.address);

        var data: Uint8Array = tran.GetRawData();

        var result = await tools.wwwtool.api_postRawTransaction(data);
        return result
    }

    static async claimGas()
    {
        var current = LoginInfo.getCurrentLogin();
        let claimsstr = await tools.wwwtool.api_getclaimgas(current.address, 0);
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
        output.toAddress = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(current.address)
        output.value = Neo.Fixed8.parse(sum);
        tran.outputs = [];
        tran.outputs.push(output);
        var msg = tran.GetMessage().clone();
        var signdata = ThinNeo.Helper.Sign(msg, current.prikey);
        tran.AddWitness(signdata, current.pubkey, current.address);

        var data: Uint8Array = tran.GetRawData();
        var result = await tools.wwwtool.api_postRawTransaction(data);
        return result
    }

    /**
     * invokeTrans 方式调用合约塞入attributes
     * @param script 合约的script
     */
    static async contractInvokeTrans_attributes(script: Uint8Array)
    {
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
     * invokeTrans 方式调用合约塞入attributes
     * @param script 合约的script
     */
    static async contractInvokeTrans(script: Uint8Array)
    {
        let current: LoginInfo = LoginInfo.getCurrentLogin();
        var addr = current.address;
        let assetid = CoinTool.id_GAS;
        //let _count = Neo.Fixed8.Zero;   //十个gas内都不要钱滴
        var utxos = await CoinTool.getassets();
        let tranmsg = CoinTool.makeTran(utxos, current.address, assetid, Neo.Fixed8.Zero);
        let tran: ThinNeo.Transaction = tranmsg.info[ 'tran' ];
        tran.type = ThinNeo.TransactionType.InvocationTransaction;
        tran.extdata = new ThinNeo.InvokeTransData();
        //塞入脚本
        (tran.extdata as ThinNeo.InvokeTransData).script = script;
        // (tran.extdata as ThinNeo.InvokeTransData).gas = Neo.Fixed8.fromNumber(1.0);

        if (tran.witnesses == null)
            tran.witnesses = [];
        var msg = tran.GetMessage().clone();
        var pubkey = current.pubkey.clone();
        var prekey = current.prikey.clone();
        var signdata = ThinNeo.Helper.Sign(msg, prekey);
        tran.AddWitness(signdata, pubkey, addr);
        var data: Uint8Array = tran.GetRawData();
        console.log(data);
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
    static async nep5Transaction(address: string, tatgeraddr, asset: string, amount: string)
    {
        let res = await tools.wwwtool.getNep5Asset(asset);
        var decimals = res[ "decimals" ] as number;
        var numarr = amount.split(".");
        decimals -= (numarr.length == 1 ? 0 : numarr[ 1 ].length);

        var v = 1;
        for (var i = 0; i < decimals; i++)
            v *= 10;
        var bnum = new Neo.BigInteger(amount.replace(".", ""));
        var intv = bnum.multiply(v).toString();

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
        var result = await CoinTool.contractInvokeTrans_attributes(sb.ToArray())
        return result;
    }

    /**
     * 获得utxos
     */
    static async getsgasAssets(): Promise<{ [ id: string ]: UTXO[] }>
    {
        //获得高度
        var height = await tools.wwwtool.api_getHeight();
        var scriptHash = ThinNeo.Helper.GetAddressFromScriptHash(this.id_SGAS.hexToBytes().reverse())
        var utxos = await tools.wwwtool.api_getUTXO(scriptHash);   //获得utxo

        // console.log('getsgasAssets.utxos')
        // console.log(utxos)

        var olds = OldUTXO.getOldutxos();       //获得以标记的utxo(交易过的utxo 存储在本地的标记)
        var olds2 = new Array<OldUTXO>();       //
        for (let n = 0; n < olds.length; n++)
        {
            const old = olds[ n ];
            let findutxo = false;
            for (let i = 0; i < utxos.length; i++)
            {
                let utxo = utxos[ i ];
                if (utxo.txid == old.txid && old.n == utxo.n && height - old.height <= 2)
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

        // console.log('getsgasAssets.assets')
        // console.log(assets)

        return assets;
    }

    /**
     * gas -> sgas
     * @param wallet_transcount 兑换的数量
     */
    private async makeMintTokenTransaction(wallet_transcount)
    {
        // View.showWaiting('充值请求处理中 ... ')

        // var res: Result = new Result();
        // var postobj = { cmd: "makeMintTokenTransactionRes", data: res };

        var login = LoginInfo.getCurrentLogin();

        var utxos_assets = await tools.coinTool.getassets();

        var scriptaddress = tools.coinTool.id_SGAS.hexToBytes().reverse();
        var nepAddress = ThinNeo.Helper.GetAddressFromScriptHash(scriptaddress);

        console.log('[pay][makeMintTokenTransaction]this.wallet_transcount =============> ', wallet_transcount)

        try
        {
            var makeTranRes: Result = tools.coinTool.makeTran(utxos_assets, nepAddress, tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(wallet_transcount));
        }
        catch (e)
        {
            // this.showError("NEOGAS余额不足")
            return;
        }


        var sb = new ThinNeo.ScriptBuilder();
        //Parameter inversion 
        sb.EmitParamJson([]);//Parameter list 
        sb.EmitPushString("mintTokens");//Method
        sb.EmitAppCall(scriptaddress);  //Asset contract 

        var tran: any = makeTranRes.info.tran;

        tran.type = ThinNeo.TransactionType.InvocationTransaction;
        tran.extdata = new ThinNeo.InvokeTransData();
        (tran.extdata).script = sb.ToArray();
        (tran.extdata).gas = Neo.Fixed8.fromNumber(1.0);

        var msg = tran.GetMessage();
        var signdata = ThinNeo.Helper.Sign(msg, login.prikey);
        tran.AddWitness(signdata, login.pubkey, login.address);

        var txid = tran.GetHash().clone().reverse().toHexString();

        var data = tran.GetRawData();
        var r = await tools.wwwtool.api_postRawTransaction(data);

        if (r)
        {
            if (r[ 'txid' ])
            {
                // 成功

                // 上报钱包操作记录
                // ApiTool.addUserWalletLog(this.user.info.uid, this.user.info.token, txid, this.user.info.wallet, CoinTool.id_SGAS)

                // View.closeWaiting()
                // View.showWaiting("充值确认中 ...\r\n时间较长，请耐心等候 ... ")
                // this.makeMintTokenTransaction_confirm(txid)
                // mui.toast('充值成功！请稍候查询交易状态！')
            }
            else
            {
                // 失败
                // View.closeWaiting()
                // mui.alert('充值[' + this.wallet_transcount + ']sgas失败！' + "\r\n充值合约执行失败！")
            }

        }
        else
        {
            // 失败
            // View.closeWaiting()
            // mui.alert('充值[' + this.wallet_transcount + ']sgas失败！' + "\r\n发送充值请求失败！请检查网络，稍候重试！")
        }
    }


    /**
     * sgas -> gas
     * @param wallet_transcount 兑换数量
     */
    private async makeRefundTransaction(wallet_transcount)
    {
        // 查询SGAS余额
        // this.makeRefundTransaction_info(1);

        var res: Result = new Result();
        var postobj = { cmd: "makeRefundTransactionRes", data: res };

        var scriptaddress = tools.coinTool.id_SGAS.hexToBytes().reverse();

        var login = LoginInfo.getCurrentLogin();

        //获取sgas合约地址的资产列表
        var utxos_assets = await tools.coinTool.getsgasAssets();
        var us = utxos_assets[ tools.coinTool.id_GAS ];
        if (us == undefined)
        {
            // this.makeRefundTransaction_error("SGAS余额不足")

            // res.err = true;
            // res.info = "no enough money.";
            //throw new Error("no enough sgas.");
            return;
        }

        // console.log('[gameplay][makeRefundTransaction][ ' + eventId + ' ]utxos_assets =============> ', utxos_assets)

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

        // 生成交易请求
        // this.makeRefundTransaction_info(2)

        // console.log('[gameplay][makeRefundTransaction][ ' + eventId + ' ]utxos_assets, after deleted ===========> ', utxos_assets)

        //sgas 自己给自己转账   用来生成一个utxo  合约会把这个utxo标记给发起的地址使用
        try
        {
            var nepAddress = ThinNeo.Helper.GetAddressFromScriptHash(scriptaddress);
            var makeTranRes: Result = tools.coinTool.makeTran(utxos_assets, nepAddress, tools.coinTool.id_GAS, Neo.Fixed8.fromNumber(wallet_transcount));
        }
        catch (e)
        {
            // this.makeRefundTransaction_error("SGAS余额不足")
            return;
        }


        var r = await tools.wwwtool.api_getcontractstate(tools.coinTool.id_SGAS)
        if (r && r[ 'script' ])
        {
            var sgasScript = r[ 'script' ].hexToBytes();

            var scriptHash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(login.address)

            var sb = new ThinNeo.ScriptBuilder();
            sb.EmitParamJson([ "(bytes)" + scriptHash.toHexString() ]);
            sb.EmitPushString("refund");
            sb.EmitAppCall(scriptaddress);

            // console.log('[gameplay][makeRefundTransaction][ ' + eventId + ' ]getcontractstate, scriptaddress.toHexString =============> ', scriptaddress.toHexString())
            // console.log('[gameplay][makeRefundTransaction][ ' + eventId + ' ]getcontractstate, sgasScript.toHexString =============> ', sgasScript)

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

            console.log('[pay][makeRefundTransaction]trandata =============> ', trandata)

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
        var r = await tools.wwwtool.api_getcontractstate(tools.coinTool.id_SGAS)

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