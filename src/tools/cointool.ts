import { WWW } from './wwwtool';
import { UTXO, Result, LoginInfo } from './entity';
import { StorageTool } from './storagetool';
///<reference path="./neo-ts.d.ts"/>

export class CoinTool
{
    static readonly id_GAS: string = "0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
    static readonly id_NEO: string = "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    static assetID2name: { [ id: string ]: string } = {};
    static name2assetID: { [ id: string ]: string } = {};
    static async initAllAsset()
    {
        var allassets = await WWW.api_getAllAssets();
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
        var assets = UTXO.getAssets();
        if (assets == null)
        {
            assets = {};
            var utxos = await WWW.api_getUTXO(StorageTool.getStorage("current-address"));
            for (var i in utxos)
            {
                var item = utxos[ i ];
                var txid = item.txid;
                var n = item.n;
                var asset = item.asset;
                var count = item.value;
                if (assets[ asset ] == undefined || assets[ asset ] == null)
                {
                    assets[ asset ] = [];
                }
                var utxo = new UTXO();
                utxo.addr = item.addr;
                utxo.asset = asset;
                utxo.n = n;
                utxo.txid = txid;
                utxo.count = Neo.Fixed8.parse(count);
                assets[ asset ].push(utxo);
            }
        }
        return assets;
    }

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
            res.info = { "tran": tran, "clonearr": clonearr };
        }
        else
        {
            throw new Error("no enough money.");
        }
        return res;
    }

    static async rawTransaction(targetaddr: string, asset: string, count: string): Promise<Result>
    {

        var arr = StorageTool.getLoginArr();
        var add = StorageTool.getStorage("current-address")
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
            var result = await WWW.api_postRawTransaction(data);
            if (result[ "sendrawtransactionresult" ])
            {
                res.err = !result;
                res.info = txid;
                let us = tranres.info[ 'clonearr' ] as UTXO[];
                if (us.length)
                    utxos[ asset ] = us;
                else
                    delete utxos[ asset ];
                UTXO.setAssets(utxos);
            }
            return res;
        } catch (error)
        {
            throw error;
        }
    }


    static async contractTransaction(script: Uint8Array)
    {
        // var utxo = await CoinTool.getassets();
        let current: LoginInfo = LoginInfo.getCurrentLogin();
        let assetid = CoinTool.id_GAS;
        //let _count = Neo.Fixed8.Zero;   //十个gas内都不要钱滴
        // var tranres = CoinTool.makeTran(utxo, targeraddr, assetid, Neo.Fixed8.Zero);  //获得tran和改变后的utxo
        var tran: ThinNeo.Transaction = new ThinNeo.Transaction();
        //合约类型
        tran.type = ThinNeo.TransactionType.InvocationTransaction;
        tran.extdata = new ThinNeo.InvokeTransData();
        //塞入脚本
        (tran.extdata as ThinNeo.InvokeTransData).script = script;
        var addr = current.address;
        tran.attributes = new ThinNeo.Attribute[ 1 ];
        tran.attributes[ 0 ] = new ThinNeo.Attribute();
        tran.attributes[ 0 ].usage = ThinNeo.TransactionAttributeUsage.Script;
        tran.attributes[ 0 ].data = addr.hexToBytes();
        //估计一个gas用量
        //如果估计gas用量少了，智能合约执行会失败。
        //如果估计gas用量>10,交易必须丢弃gas，否则智能合约执行会失败
        // (tran.extdata as ThinNeo.InvokeTransData).gas = Neo.Fixed8.fromNumber(1.0);
        // if (tran.witnesses == null)
        //     tran.witnesses = [];
        let txid = tran.GetHash().clone().reverse().toHexString();
        var msg = tran.GetMessage().clone();
        var pubkey = current.pubkey.clone();
        var prekey = current.prikey.clone();
        var addr = current.address;
        var signdata = ThinNeo.Helper.Sign(msg, prekey);
        tran.AddWitness(signdata, pubkey, addr);
        var data: Uint8Array = tran.GetRawData();

        var res: Result = new Result();
        var result = await WWW.api_postRawTransaction(data);
        res.err = !result;
        res.info = txid;
        return res;
    }

    static async nep5Transaction(address: string, tatgeraddr, asset: string, amount: string)
    {
        let res = await WWW.getNep5Asset(asset);
        var decimals = res[ "decimals" ] as number;
        var numarr = amount.split(".");
        decimals -= (numarr.length == 1 ? 0 : numarr[ 1 ].length);

        var v = 1;
        for (var i = 0; i < decimals; i++)
        {
            v *= 10;
        }
        var bnum = new Neo.BigInteger(amount.replace(".", ""));
        var intv = bnum.multiply(v).toString();

        var sb = new ThinNeo.ScriptBuilder();
        var scriptaddress = asset.hexToBytes().reverse();
        sb.EmitParamJson([ "(address)" + address, "(address)" + tatgeraddr, "(integer)" + amount ]);//第二个参数是个数组
        sb.EmitPushString("transfer");//第一个参数
        sb.EmitAppCall(scriptaddress);  //资产合约
    }


}