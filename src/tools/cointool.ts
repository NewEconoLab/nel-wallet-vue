import { tools } from "./importpack";
import { RootDomainInfo, Consts, LoginInfo, DomainInfo, DomainStatus, Result, UTXO, OldUTXO, Claim, currentInfo, alert, LoginType, WalletOtcgo } from "./entity";

declare const mui;
export class CoinTool
{
    static readonly id_GAS: string = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
    static readonly id_NEO: string = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    static readonly id_SGAS: Neo.Uint160 = Neo.Uint160.parse('2761020e5e6dfcd8d37fdd50ff98fa0f93bccf54');
    static readonly dapp_nnc: Neo.Uint160 = Neo.Uint160.parse("12329843449f29a66fb05974c2fb77713eb1689a");
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
     * 构造并发送交易
     * @param {ThinNeo.Transaction} tran 
     * @param {string} randomStr
     */
    static async signData(tran: ThinNeo.Transaction): Promise<Uint8Array>
    {

        let promise: Promise<Uint8Array> = new Promise((resolve, reject) =>
        {
            if (!!LoginInfo.info)
            {
                let addr = LoginInfo.getCurrentAddress();
                let current = LoginInfo.info
                var msg = tran.GetMessage().clone();
                var pubkey = current.pubkey.clone();
                var prekey = current.prikey.clone();
                var signdata = ThinNeo.Helper.Sign(msg, prekey);
                tran.AddWitness(signdata, pubkey, addr);
                var data: Uint8Array = tran.GetRawData();
                resolve(data);
            } else
            {
                let current = JSON.parse(sessionStorage.getItem("login-info-arr")) as currentInfo;
                if (current.type == LoginType.wif)
                {
                    var res = tools.neotool.wifDecode(current.msg[ 'wif' ]);
                    if (res.err)
                    {
                        reject("WIF is error");
                    }
                    else
                    {
                        LoginInfo.info = res.info as LoginInfo;
                        resolve(data);
                        return;
                    }
                }
                if (current.type == LoginType.nep2 || LoginType.nep6)
                {
                    alert.show("请输入密码", "password", "确认", passsword =>
                    {
                        let nep2 = current.msg[ LoginInfo.getCurrentAddress() ];
                        tools.neotool.nep2ToWif(nep2, passsword)
                            .then((res) =>
                            {
                                LoginInfo.info = res.info as LoginInfo;
                                let addr = LoginInfo.getCurrentAddress();
                                let current = LoginInfo.info
                                var msg = tran.GetMessage().clone();
                                var pubkey = current.pubkey.clone();
                                var prekey = current.prikey.clone();
                                var signdata = ThinNeo.Helper.Sign(msg, prekey);
                                tran.AddWitness(signdata, pubkey, addr);
                                var data: Uint8Array = tran.GetRawData();
                                alert.close();
                                resolve(data);
                            })
                            .catch(err =>
                            {
                                // console.error(Error("password is error"));
                                alert.error("密码错误,请重新输入")
                            })
                    })
                } if (current.type == LoginType.otcgo)
                {
                    alert.show("请输入密码", "password", "确认", password =>
                    {
                        let json = current.msg;
                        let otcgo = new WalletOtcgo();
                        otcgo.fromJsonStr(JSON.stringify(json));
                        otcgo.otcgoDecrypt(password);
                        const result = otcgo.doValidatePwd();
                        if (result)
                        {
                            var info: LoginInfo = new LoginInfo();
                            info.address = otcgo.address;
                            info.prikey = otcgo.prikey;
                            info.pubkey = otcgo.pubkey;
                            var signdata = ThinNeo.Helper.Sign(msg, prekey);
                            tran.AddWitness(signdata, pubkey, info.address);
                            var data: Uint8Array = tran.GetRawData();
                            alert.close();
                            resolve(data);
                        } else
                        {
                            alert.error("密码错误,请重新输入")
                        }
                    })
                }
            }

        })
        return promise;
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
            let data = await this.signData(tran);

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
        let data = await this.signData(tran);

        var result = await tools.wwwtool.api_postRawTransaction(data);
        return result
    }

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
        return result
    }

    /**
     * invokeTrans 方式调用合约塞入attributes
     * @param script 合约的script
     */
    static async contractInvokeTrans_attributes(script: Uint8Array)
    {
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
        tran.attributes[ 0 ] = new ThinNeo.Attribute();
        tran.attributes[ 0 ].usage = ThinNeo.TransactionAttributeUsage.Script;
        tran.attributes[ 0 ].data = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(addr);

        if (tran.witnesses == null)
            tran.witnesses = [];
        let data = await this.signData(tran);

        var res: Result = new Result();

        console.log(data.toHexString())
        var result = await tools.wwwtool.api_postRawTransaction(data);
        res.err = !result[ "sendrawtransactionresult" ];
        res.info = result[ "txid" ];
        console.log(res.info);

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
     * @method 获得Sgas账户下的utxo
     */
    static async getsgasAssets(): Promise<{ [ id: string ]: UTXO[] }>
    {
        //获得高度
        var height = await tools.wwwtool.api_getHeight();
        var scriptHash = ThinNeo.Helper.GetAddressFromScriptHash(this.id_SGAS);
        var utxos = await tools.wwwtool.api_getUTXO(scriptHash);   //获得utxo

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

        return assets;
    }



}