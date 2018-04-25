import { StorageTool } from "./storagetool";

export class LoginInfo
{
    pubkey: Uint8Array;
    prikey: Uint8Array;
    address: string;
    static ArrayToString(array: LoginInfo[]): string
    {
        var obj = [];
        for (var i = 0; i < array.length; i++)
        {
            obj.push({});
            obj[ i ].pubkey = array[ i ].pubkey.toHexString();
            obj[ i ].prikey = array[ i ].prikey.toHexString();
            obj[ i ].address = array[ i ].address;
        }
        return JSON.stringify(obj);
    }
    static StringToArray(str: string): LoginInfo[]
    {
        var obj = JSON.parse(str);
        var arr: LoginInfo[] = [];
        for (var i = 0; i < obj.length; i++)
        {
            arr.push(new LoginInfo());
            var str: string = obj[ i ].prikey;
            var str2: string = obj[ i ].pubkey;
            arr[ i ].prikey = str.hexToBytes();
            arr[ i ].pubkey = str2.hexToBytes();
            arr[ i ].address = obj[ i ].address;
        }
        return arr;
    }
    static getCurrentLogin(): LoginInfo
    {
        var address: string = LoginInfo.getCurrentAddress();
        var arr: LoginInfo[] = StorageTool.getLoginArr();
        var n: number = arr.findIndex(info => info.address == address);
        return arr[ n ];
    }
    static getCurrentAddress(): string
    {
        return StorageTool.getStorage("current-address");
    }
    static setCurrentAddress(str: string)
    {
        StorageTool.setStorage("current-address", str);
    }
}

export class BalanceInfo
{
    balance: number;
    asset: string;
    name: { lang: string, name: string }[];
    names: string;
    type: string;

    static jsonToArray(json: {}[])
    {
        let arr = new Array<BalanceInfo>();
        for (const i in json)
        {
            if (json.hasOwnProperty(i))
            {
                const element = json[ i ];
                let balance = new BalanceInfo();
                balance.asset = element[ "asset" ];
                balance.balance = element[ "balance" ];
                balance.name = element[ "balance" ];
                balance.names = element[ "names" ];
                balance.type = element[ "type" ];
                arr.push(balance);
            }
        }
        return arr;

    }
}

export class Nep5Balance
{
    assetid: string;
    symbol: string;
    balance: number;
}

export class Result
{
    err: boolean;
    info: any;
}

export enum AssetEnum
{
    NEO = '0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
    GAS = '0x602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7',
}

export class NeoAsset
{
    neo: number;
    gas: number;
    claim: string;
}

export class OldUTXO
{
    height: number;
    txid: string;
    n: number;
    constructor(txid: string, n: number)
    {
        this.n = n;
        this.txid = txid;
    }

    static oldutxosPush(olds: OldUTXO[])
    {
        let arr: OldUTXO[] = this.getOldutxos();
        StorageTool.setStorage("old-utxos", JSON.stringify(arr.concat(olds)));
    }

    static setOldutxos(olds: OldUTXO[])
    {
        // let arr: OldUTXO[] = this.getOldutxos();
        StorageTool.setStorage("old-utxos", JSON.stringify(olds));
    }

    static getOldutxos()
    {
        var arr: OldUTXO[] = new Array<OldUTXO>();
        var str = StorageTool.getStorage("old-utxos");
        if (str)
            arr = JSON.parse(str) as OldUTXO[];
        return arr;
    }

    compareUtxo(utxo: UTXO)
    {
        return this.txid == utxo.txid && this.n == utxo.n;
    }
}

export class UTXO
{
    addr: string;
    txid: string;
    n: number;
    asset: string;
    count: Neo.Fixed8;

    static ArrayToString(utxos: UTXO[]): Array<any>
    {
        var str = "";
        var obj = [];
        for (var i = 0; i < utxos.length; i++)
        {
            obj.push({});
            obj[ i ].n = utxos[ i ].n;
            obj[ i ].addr = utxos[ i ].addr;
            obj[ i ].txid = utxos[ i ].txid;
            obj[ i ].asset = utxos[ i ].asset;
            obj[ i ].count = utxos[ i ].count.toString();
        }
        return obj
    }
    static StringToArray(obj: Array<any>): UTXO[]
    {
        var utxos: Array<UTXO> = new Array<UTXO>();
        for (var i = 0; i < obj.length; i++)
        {
            utxos.push(new UTXO);
            var str: string = obj[ i ].count;
            utxos[ i ].n = obj[ i ].n;
            utxos[ i ].addr = obj[ i ].addr;
            utxos[ i ].txid = obj[ i ].txid;
            utxos[ i ].asset = obj[ i ].asset;
            utxos[ i ].count = Neo.Fixed8.parse(str);
        }
        return utxos;
    }

    static setAssets(assets: { [ id: string ]: UTXO[] })
    {
        var obj = {}
        for (var asset in assets)
        {
            let arr = UTXO.ArrayToString(assets[ asset ]);
            obj[ asset ] = arr;
        }
        sessionStorage.setItem("current-assets-utxos", JSON.stringify(obj));
    }
    static getAssets()  
    {
        let assets = null;
        var str = sessionStorage.getItem("current-assets-utxos");
        if (str !== null && str != undefined && str != '')
        {
            assets = JSON.parse(str);
            for (const asset in assets)
            {
                assets[ asset ] = UTXO.StringToArray(assets[ asset ]);
            }
        }
        return assets;
    }
}

export class Consts
{
    // static baseContract = "0x2172f8d5b17c2d45fa3ff58dee8e8a4c3f51ef72";
    static baseContract = "954f285a93eed7b4aed9396a7806a5812f1a5950";
    static registerContract = "d6a5e965f67b0c3e5bec1f04f028edb9cb9e3f7c";
    // static domainContract = '954f285a93eed7b4aed9396a7806a5812f1a5950';
}

export class DomainInfo
{
    owner: Uint8Array//所有者
    register: Uint8Array//注册器
    resolver: Uint8Array//解析器
    ttl: string//到期时间
}

export class RootDomainInfo extends DomainInfo
{
    rootname: string;
    roothash: Uint8Array;
    constructor()
    {
        super();
    }
}

export class Transactionforaddr
{
    addr: string;
    blockindex: number;
    blocktime: { $date: number }
    txid: string;
}
export interface Transaction
{
    txid: string;
    type: string;
    vin: { txid: string, vout: number }[];
    vout: { n: number, asset: string, value: string, address: string }[];
}
export class History
{
    n: number;
    asset: string;
    value: string;
    address: string;
    assetname: string;
    txtype: string;
    time: string; txid: string;
}
export class Claim
{
    addr: string;//"ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s"
    asset: string;//"0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b"
    claimed: boolean;//""
    createHeight: number;//1365554
    n: number;//0
    txid: string;//"0x90800a9dde3f00b61e16a387aa4a2ea15e4c7a4711a51aa9751da224d9178c64"
    useHeight: number;//1373557
    used: string;//"0x47bf58edae75796b1ba4fd5085e5012c3661109e2e82ad9b84666740e561c795"
    value: number;//"1"

    constructor(json: {})
    {
        this.addr = json[ 'addr' ];
        this.asset = json[ 'asset' ];
        this.claimed = json[ 'claimed' ];
        this.createHeight = json[ 'createHeight' ];
        this.n = json[ 'n' ];
        this.txid = json[ 'txid' ];
        this.useHeight = json[ 'useHeight' ];
        this.used = json[ 'used' ];
        this.value = json[ 'value' ];
    }
    static strToClaimArray(arr: {}[]): Claim[]
    {
        let claimarr = new Array<Claim>();
        for (const i in arr)
        {
            if (arr.hasOwnProperty(i))
            {
                claimarr.push(new Claim(arr[ i ]));
            }
        }
        return claimarr;
    }
}