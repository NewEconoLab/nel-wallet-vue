import { tools } from "./importpack";
import Buffer from "buffer";

export interface currentInfo
{
    type: LoginType;
    msg: {};
}

export enum LoginType
{
    wif,
    nep2,
    nep6,
    otcgo
}

export class alert
{

    static alert = document.getElementById("alertview") as HTMLDivElement;
    static title = document.getElementById("alert-title") as HTMLDivElement;
    static alertBox = document.getElementById("alert-box") as HTMLDivElement;
    static alertError = document.getElementById("alert-error") as HTMLDivElement;
    static btn_close = document.getElementById("alert-close") as HTMLButtonElement;
    static input = document.getElementById("alert-input") as HTMLInputElement;
    static btn_confirm = document.getElementById("alert-confirm") as HTMLButtonElement;
    constructor()
    {

    }
    static show(title: string, inputType: string, btnText: string, call)
    {
        // btn btn-nel btn-big
        this.btn_confirm.classList.add("btn", "btn-nel", "btn-big");
        this.btn_confirm.textContent = btnText;
        this.input.type = inputType;
        this.title.innerText = title;
        this.alertError.textContent = "";
        this.alert.hidden = false;
        this.btn_confirm.onclick = () =>
        {
            call(this.input.value);
        }
        this.btn_close.onclick = () =>
        {
            this.alert.hidden = true;
            return;
        }
    }
    static close()
    {
        this.alert.hidden = true;
        this.input.textContent = "";
        this.input.value = "";
    }
    static error(msg: string)
    {
        this.alertError.textContent = msg;
    }
}

export class LoginInfo
{
    pubkey: Uint8Array;
    prikey: Uint8Array;
    address: string;
    static info: LoginInfo;

    static async deblocking()
    {
        let msg_title = "";
        let msg_btn = "";
        let msg_error = "";
        let language = sessionStorage.getItem("language");
        if (!language || language == 'en')
        {
            msg_title = "Please enter your password ";
            msg_btn = "confirm";
            msg_error = "Password error ";
        } else
        {
            msg_title = "请输入您的密码 ";
            msg_btn = "确认";
            msg_error = "密码错误 ";
        }
        let promise: Promise<LoginInfo> = new Promise((resolve, reject) =>
        {
            if (!!LoginInfo.info)
            {
                let current = LoginInfo.info
                resolve(current);
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
                        resolve(LoginInfo.info);
                        return;
                    }
                }
                if (current.type == LoginType.nep2 || LoginType.nep6)
                {
                    alert.show(msg_title, "password", msg_btn, passsword =>
                    {
                        let nep2 = current.msg[ LoginInfo.getCurrentAddress() ];
                        tools.neotool.nep2ToWif(nep2, passsword)
                            .then((res) =>
                            {
                                LoginInfo.info = res.info as LoginInfo;
                                alert.close();
                                resolve(LoginInfo.info);
                            })
                            .catch(err =>
                            {
                                alert.error(msg_error)
                            })
                    })
                } if (current.type == LoginType.otcgo)
                {
                    alert.show(msg_title, "password", msg_btn, password =>
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
                            LoginInfo.info = info;
                            alert.close();
                            resolve(info);
                        } else
                        {
                            alert.error(msg_error)
                        }
                    })
                }
            }

        })
        return promise;
    }

    static alert(call)
    {
        // btn btn-nel btn-big
        let alert = document.getElementById("alertview") as HTMLDivElement;
        let title = document.getElementById("alert-title") as HTMLDivElement;
        let alertBox = document.getElementById("alert-box") as HTMLDivElement;
        let close = document.getElementById("alert-close") as HTMLButtonElement;
        let input = document.getElementById("alert-input") as HTMLInputElement;
        let btn = document.getElementById("alert-confirm") as HTMLButtonElement;
        btn.classList.add("btn", "btn-nel", "btn-big");
        btn.textContent = "确认";
        input.type = "password";
        title.innerText = "请输入密码";
        alert.hidden = false;
        btn.onclick = () =>
        {
            call(input.value);
        }
        close.onclick = () =>
        {
            alert.hidden = true;
            return;
        }
    }

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
        var arr: LoginInfo[] = tools.storagetool.getLoginArr();
        var n: number = arr.findIndex(info => info.address == address);
        return arr[ n ];
    }
    static getCurrentAddress(): string
    {
        return tools.storagetool.getStorage("current-address");
    }
    static setCurrentAddress(str: string)
    {
        tools.storagetool.setStorage("current-address", str);
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

    static getBalancesByArr(balances, nep5balances, height: number)
    {
        let balancearr: BalanceInfo[] = [];
        if (balances) //余额不唯空
        {
            balances.map(
                (item) =>
                {
                    item.names = tools.coinTool.assetID2name[ item.asset ];
                    let a = tools.storagetool.getStorage(item.asset);
                    if (a)
                    {
                        let obj = JSON.parse(a)
                        let h = obj[ "height" ];
                        height - h > 1 ? tools.storagetool.delStorage(item.asset) : item.balance = obj[ "balance" ][ "balance" ];
                    }
                }
            ); //将列表的余额资产名称赋值
            balancearr = balances; //塞入页面modual
        }
        if (nep5balances)
        {
            for (let index = 0; index < nep5balances.length; index++)
            {
                const nep5 = nep5balances[ index ];
                var nep5b: BalanceInfo = new BalanceInfo();
                let id = nep5.assetid.replace("0x", "");
                id = id.substring(0, 4) + '...' + id.substring(id.length - 4);
                nep5b.asset = nep5.assetid;
                nep5b.balance = nep5.balance;
                nep5b.names = nep5.symbol + "(" + id + ")";
                nep5b.type = "nep5";
                balancearr.push(nep5b);
            }
        }
        return balancearr;
    }

    static setBalanceSotre(balance: BalanceInfo, height: number)
    {
        tools.storagetool.setStorage(balance.asset, JSON.stringify({ height, balance }))
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
        tools.storagetool.setStorage("old-utxos", JSON.stringify(arr.concat(olds)));
    }

    static setOldutxos(olds: OldUTXO[])
    {
        // let arr: OldUTXO[] = this.getOldutxos();
        tools.storagetool.setStorage("old-utxos", JSON.stringify(olds));
    }

    static getOldutxos()
    {
        var arr: OldUTXO[] = new Array<OldUTXO>();
        var str = tools.storagetool.getStorage("old-utxos");
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
    // static baseContract = "0x2172f8d5b17c2d45fa3ff58dee8e8a4c3f51ef72";0x954f285a93eed7b4aed9396a7806a5812f1a5950;0x537758fbe85505801faa7d7d7b75b37686ad7e2d;
    static readonly baseContract = Neo.Uint160.parse("77e193f1af44a61ed3613e6e3442a0fc809bb4b8");
    static readonly registerContract = Neo.Uint160.parse("d6a5e965f67b0c3e5bec1f04f028edb9cb9e3f7c");
    // static domainContract = '954f285a93eed7b4aed9396a7806a5812f1a5950';
}

export class DomainInfo
{
    owner: Neo.Uint160//所有者
    register: Neo.Uint160//注册器
    resolver: Neo.Uint160//解析器
    ttl: string//到期时间
}

/**
 * 竞拍合约域名
 * @param startBlockSelling 开始竞标高度
 * @param endBlock 拍卖结束
 * @param lastBlock 最后出价高度
 * @param maxPrice 最大出价
 * @param maxBuyer 最大出价者(地址)
 */
export class SellDomainInfo extends DomainInfo
{
    id: Neo.Uint256;
    domain: string;
    startBlockSelling: Neo.BigInteger;
    endBlock: Neo.BigInteger;
    maxPrice: Neo.BigInteger;
    lastBlock: Neo.BigInteger;
    maxBuyer: Neo.Uint160;
    balanceOf: Neo.BigInteger;
    balanceOfSelling: Neo.BigInteger;
    constructor()
    {
        super();
    }
    copyDomainInfoToThis(info: DomainInfo)
    {
        this.owner = info.owner;
        this.ttl = info.ttl;
        this.register = info.register;
        this.resolver = info.resolver;
    }
}

export class RootDomainInfo extends DomainInfo
{
    rootname: string;
    roothash: Neo.Uint256;
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
    time: string;
    txid: string;

    static setHistoryStore(history: History, height: number)
    {
        let arr = this.getHistoryStore();
        arr.push({ height, history })
        tools.storagetool.setStorage("history-txs", JSON.stringify(arr));
    }

    static getHistoryStore(): Array<any>
    {
        let str = tools.storagetool.getStorage("history-txs");
        let arr = !!str ? JSON.parse(str) : [];
        return arr;
    }

    static delHistoryStoreByHeight(height: number)
    {
        let arr = this.getHistoryStore();
        if (arr.length > 0)
        {
            let newarr = [];
            arr.map(his =>
            {
                let h = parseInt(his.height);
                if (height - h < 2)
                {
                    newarr.push(his);
                }
            });
            tools.storagetool.setStorage("history-txs", JSON.stringify(newarr));
        }
    }
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

export class Domainmsg
{
    domainname: string;
    resolver: string;
    mapping: string;
    time: string;
    isExpiration: boolean;
    await_resolver: boolean;
    await_mapping: boolean;
    await_register: boolean;
}

export class DomainStatus
{
    domainname: string;
    resolver: string;
    mapping: string;
    await_mapping: boolean;
    await_register: boolean;
    await_resolver: boolean;

    static setStatus(domain: DomainStatus)
    {
        let str = sessionStorage.getItem("domain-status")
        var arr = {};
        if (str)
        {
            arr = JSON.parse(str);
            let msg = arr[ domain.domainname ] as DomainStatus;
            msg ? msg : msg = new DomainStatus();
            domain.await_mapping ? msg[ "await_mapping" ] = domain.await_mapping : "";
            domain.await_register ? msg[ "await_register" ] = domain.await_register : "";
            domain.await_resolver ? msg[ "await_resolver" ] = domain.await_resolver : "";
            domain.mapping ? msg[ "mapping" ] = domain.mapping : "";
            domain.resolver ? msg[ "resolver" ] = domain.resolver.replace("0x", "") : "";
            arr[ domain.domainname ] = msg;
        } else
        {
            arr[ domain.domainname ] = domain;
        }
        sessionStorage.setItem("domain-status", JSON.stringify(arr));
    }
    static getStatus()
    {
        let str = sessionStorage.getItem("domain-status");
        let obj = {};
        str ? obj = JSON.parse(sessionStorage.getItem("domain-status")) : {};
        return obj;
    }
}

export class WalletOtcgo
{
    address: string;
    publicKey: string;
    privatekey: string;
    publicKeyCompressed: string;
    privateKeyEncrypted: string;
    pubkey: Uint8Array;
    prikey: Uint8Array;

    fromJsonStr(str: string)
    {
        let json = JSON.parse(str);
        let otcgo: WalletOtcgo = new WalletOtcgo();
        this.address = json[ "address" ];
        this.publicKey = json[ "publicKey" ];
        this.publicKeyCompressed = json[ "publicKeyCompressed" ];
        this.privateKeyEncrypted = json[ "privateKeyEncrypted" ];
    }

    toJson()
    {
        let json = {};
        json[ 'address' ] = this.address;
        json[ 'publicKey' ] = this.publicKey;
        json[ 'publicKeyCompressed' ] = this.publicKeyCompressed;
        json[ "privateKeyEncrypted" ] = this.privateKeyEncrypted;
        return json;
    }

    otcgoDecrypt(pwd: string)
    {
        try
        {
            this.privatekey = CryptoJS.AES.decrypt(this.privateKeyEncrypted, pwd).toString(CryptoJS.enc.Utf8);
            this.prikey = this.privatekey.hexToBytes();
            this.pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(this.prikey);
        } catch (error)
        {
            console.error(error);
        }
    }
    // 签名
    doSign(prvkey, msg)
    {
        const sig = new KJUR.crypto.Signature({ 'alg': 'SHA256withECDSA' })
        sig.initSign({
            'ecprvhex': prvkey,
            'eccurvename': 'secp256r1'
        })
        sig.updateString(msg)
        return sig.sign()
    }

    doVerify(pubkey, msg, sigval)
    {
        const sig = new KJUR.crypto.Signature({
            'alg': 'SHA256withECDSA',
            'prov': 'cryptojs/jsrsa'
        })
        sig.initVerifyByPublicKey({
            'ecpubhex': pubkey,
            'eccurvename': 'secp256r1'
        })
        sig.updateString(msg)
        return sig.verify(sigval)
    }

    doValidatePwd()
    {
        if (this.prikey.length === 0) return false
        const msg = 'aaa';
        const sigval = this.doSign(this.privatekey, msg)
        return this.doVerify(this.publicKey, msg, sigval)
    }

}
export class MyAuction
{
    id: string;
    auctionSpentTime: string;
    auctionState: string;
    endedState: number;
    endTime: number;
    endBlock: number;
    expire: boolean;
    domainstate: DomainState;
    blockindex: string;
    domain: string;
    maxBuyer: string;
    maxPrice: string;
    owner: string;
    startAuctionTime: number;
    startTimeStr: string;
    balanceOfSelling: string;
    bidListSession: Object;
    receivedState: number;

    constructor()
    {
        this.id = "";
        this.auctionSpentTime = "";
        this.auctionState = "";
        this.expire = false;
        this.blockindex = "";
        this.maxBuyer = "";
        this.maxPrice = "";
        this.owner = "";
        this.endedState = 0;
        this.endTime = 0;
        this.startAuctionTime = 0;
        this.startTimeStr = "";
    }

    async initSelling(info: SellDomainInfo)
    {
        this.id = info.id.toString();
        this.domain = info.domain;
        this.endBlock = parseInt(info.endBlock.toString());
        this.maxBuyer = ThinNeo.Helper.GetAddressFromScriptHash(info.maxBuyer);
        this.maxPrice = info.maxPrice.toString();
        this.owner = info.owner ? ThinNeo.Helper.GetAddressFromScriptHash(info.owner) : "";
    }
}
export class DataType
{
    public static Array = 'Array';
    public static ByteArray = 'ByteArray';
    public static Integer = 'Integer';
    public static Boolean = 'Boolean';
    public static String = 'String';
}

export class ResultItem
{
    public data: Uint8Array;
    public subItem: ResultItem[];

    public static FromJson(type: string, value: any): ResultItem
    {
        let item: ResultItem = new ResultItem();
        if (type === DataType.Array)
        {
            item.subItem = []//new ResultItem[(value as Array<any>).length];
            for (let i = 0; i < (value as any[]).length; i++)
            {
                let subjson = ((value as any)[ i ] as Map<string, any>);
                let subtype = (subjson[ "type" ] as string);
                item.subItem.push(ResultItem.FromJson(subtype, subjson[ "value" ]));
            }
        }
        else if (type === DataType.ByteArray)
        {
            item.data = (value as string).hexToBytes()
        }
        else if (type === DataType.Integer)
        {
            item.data = Neo.BigInteger.parse(value as string).toUint8Array();
        }
        else if (type === DataType.Boolean)
        {
            if ((value as number) != 0)
                item.data = new Uint8Array(0x01);
            else
                item.data = new Uint8Array(0x00);
        }
        else if (type === DataType.String)
        {
            item.data = new Buffer(value as string);
        }
        else
        {
            console.log("not support type:" + type);
        }
        return item;
    }


    public AsHexString(): string
    {
        return (this.data).toHexString();
    }
    public AsHashString(): string
    {
        return "0x" + this.data.reverse().toHexString();
    }
    public AsString(): string
    {
        return String.fromCharCode.apply(null, this.data);
    }
    public AsHash160(): Neo.Uint160
    {
        if (this.data.length === 0)
            return null;
        return new Neo.Uint160(this.data.buffer);
    }

    public AsHash256(): Neo.Uint256
    {
        if (this.data.length === 0)
            return null;
        return new Neo.Uint256(this.data.buffer)
    }
    public AsBoolean(): boolean
    {
        if (this.data.length === 0 || this.data[ 0 ] === 0)
            return false;
        return true;
    }

    public AsInteger(): Neo.BigInteger
    {
        return new Neo.BigInteger(this.data);
    }
}

export class NNSResult
{
    public textInfo: string;
    public value: any; //不管什么类型统一转byte[]
}

export class PageUtil
{
    private _currentPage: number;// 当前页
    private _pageSize: number;// 每页大小
    private _totalCount: number;// 总记录数
    private _totalPage: number;// 总页数

    /**
     * 
     * @param total 总记录数
     * @param pageSize 每页条数
     */
    constructor(total: number, pageSize: number)
    {
        this._currentPage = 1;
        this._totalCount = total;
        this._pageSize = pageSize;
        this._totalPage = total % pageSize == 0 ? total / pageSize : Math.ceil((total / pageSize));
    };
    /**
     * currentPage 返回当前页码
     */
    public get currentPage()
    {
        this._totalPage = this.totalCount % this.pageSize == 0 ? this.totalCount / this.pageSize : Math.ceil((this.totalCount / this.pageSize));
        return this._currentPage;
    }
    /**
     * 
     */
    public set currentPage(currentPage: number)
    {
        this._currentPage = currentPage;
    }
    /**
     * pageSize 每页条数
     */
    public get pageSize()
    {
        return this._pageSize;
    }
    /**
     * set count
     */
    public set pageSize(pageSize: number)
    {
        this._pageSize = pageSize;
    }
    /**
     * pageSize 每页条数
     */
    public get totalCount()
    {
        return this._totalCount;
    }
    /**
     * set count
     */
    public set totalCount(totalCount: number)
    {
        this._totalCount = totalCount;
    }
    /**
 * pageSize 总页数
 */
    public get totalPage()
    {
        this._totalPage = this._totalCount % this._pageSize == 0 ? this._totalCount / this._pageSize : Math.ceil(this._totalCount / this._pageSize);
        return this._totalPage;
    }
}

export class Task
{
    height: number;
    confirm: number;
    type: ConfirmType;
    txid?: string = "";
    state: TaskState;
    constructor(
        height: number,
        type: ConfirmType,
        txid?: string
    )
    {
        this.height = height;
        this.type = type;
        this.confirm = 0;
        this.txid = txid;
        this.state = TaskState.watting;
    }
    toString()
    {
        return JSON.stringify(this);
    }
}

export class Process
{
    timearr: Array<{
        msg: string;
        date: string;
        time: string;
    }>;
    state: string;
    startTime: number;
    width: number;
    date: string;
    time: string;

    constructor(start: number | string)
    {
        this.timearr = [];
        this.startTime = typeof start == "string" ? new Date(start as string).getTime() : start as number;
        this.date = tools.timetool.dateFtt("yyyy/MM/dd", new Date(this.startTime));
        this.time = tools.timetool.dateFtt("hh:mm:ss", new Date(this.startTime));
        this.width = 0;
        this.state = "";
        for (let i = 1; i <= 5; i++)
        {
            let element = { msg: "", date: "", time: "" };
            switch (i)
            {
                case 1:
                    element.msg = "1"
                    break;
                case 3:
                    element.msg = "2"
                    break;
                case 5:
                    element.msg = "3"
                    break;
                default:
                    break;
            }
            let time = this.startTime + 300000 * i;

            let date = tools.timetool.dateFtt("yyyy/MM/dd", new Date(time));
            let times = tools.timetool.dateFtt("hh:mm:ss", new Date(time));
            element.date = date;
            element.time = times;
            this.timearr.push(element);
        }

    }
}

export class NeoAuction_TopUp
{
    input: string;
    watting: boolean;
    isShow: boolean;
    error: boolean;
    constructor()
    {
        this.input = "";
        this.watting = false;
        this.isShow = false;
        this.error = false;
    }
}
export class NeoAuction_Withdraw
{
    input: string;
    watting: boolean;
    isShow: boolean;
    error: boolean;
    constructor()
    {
        this.input = "";
        this.watting = false;
        this.isShow = false;
        this.error = false;
    }
}

/**
 * 任务状态
 */
export enum TaskState
{
    watting,
    success,
    fail,
}

/**
 * 任务类型
 */
export enum TaskType
{
    tranfer,// 交易确认 需要签名的任务，涉及资产变动
    openAuction,//开标
    addPrice,// 资产更新 在tx交易成功后添加资产更新任务，资产更新立即执行
    topup,//充值
    withdraw,//退款
    getGasTest,//测试网领取gas
}

/**
 * 确认的操作类型
 */
export enum ConfirmType
{
    tranfer,    // 确认交易是否成功
    contract,   // 确认合约是否成功，等待notify
}

/**
 * @param open 开标或者重新开标
 * @param fixed 确定期
 * @param random 随机期
 * @param end 结束
 */
export enum DomainState
{
    open,
    fixed,
    random,
    end1,   //第三天结束
    end2,
    expire,
    pass,
}