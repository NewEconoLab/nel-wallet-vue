import { tools } from "./importpack";
import Buffer from "buffer";
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
        console.log(tools.storagetool.getStorage(balance.asset));
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
    static readonly baseContract = Neo.Uint160.parse("537758fbe85505801faa7d7d7b75b37686ad7e2d");
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
    startBlockSelling: Neo.BigInteger;
    endBlock: Neo.BigInteger;
    maxPrice: Neo.BigInteger;
    lastBlock: Neo.BigInteger;
    maxBuyer: Neo.Uint160;
    constructor()
    {
        super();
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

    otcgoDecrypt(pwd: string)
    {
        try
        {
            this.privatekey = CryptoJS.AES.decrypt(this.privateKeyEncrypted, pwd).toString(CryptoJS.enc.Utf8);
            this.prikey = this.privatekey.hexToBytes();
            this.pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(this.prikey);
        } catch (error)
        {
            console.log(error)
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
    auctionSpentTime: string;
    auctionState: string;
    blockindex: string;
    domain: string;
    maxBuyer: string;
    maxPrice: string;
    owner: string;
    startAuctionTime: number;
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
        console.log(value);
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
            item.data = (value as string).hexToBytes();
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
        return new Neo.Uint256(this.data.buffer);
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

export class OpCode
{
    // Constants
    PUSH0 = 0x00 // An empty array of bytes is pushed onto the stack.
    PUSHF = 0x00
    PUSHBYTES1 = 0x01 // 0x01-0x4B The next opcode bytes is data to be pushed onto the stack
    PUSHBYTES75 = 0x4B
    PUSHDATA1 = 0x4C // The next byte contains the number of bytes to be pushed onto the stack.
    PUSHDATA2 = 0x4D // The next two bytes contain the number of bytes to be pushed onto the stack.
    PUSHDATA4 = 0x4E // The next four bytes contain the number of bytes to be pushed onto the stack.
    PUSHM1 = 0x4F // The number -1 is pushed onto the stack.
    PUSH1 = 0x51 // The number 1 is pushed onto the stack.
    PUSH2 = 0x52 // The number 2 is pushed onto the stack.
    PUSH3 = 0x53 // The number 3 is pushed onto the stack.
    PUSH4 = 0x54 // The number 4 is pushed onto the stack.
    PUSH5 = 0x55 // The number 5 is pushed onto the stack.
    PUSH6 = 0x56 // The number 6 is pushed onto the stack.
    PUSH7 = 0x57 // The number 7 is pushed onto the stack.
    PUSH8 = 0x58 // The number 8 is pushed onto the stack.
    PUSH9 = 0x59 // The number 9 is pushed onto the stack.
    PUSH10 = 0x5A // The number 10 is pushed onto the stack.
    PUSH11 = 0x5B // The number 11 is pushed onto the stack.
    PUSH12 = 0x5C // The number 12 is pushed onto the stack.
    PUSH13 = 0x5D // The number 13 is pushed onto the stack.
    PUSH14 = 0x5E // The number 14 is pushed onto the stack.
    PUSH15 = 0x5F // The number 15 is pushed onto the stack.
    PUSH16 = 0x60 // The number 16 is pushed onto the stack.


    // Flow control
    NOP = 0x61 // Does nothing.
    JMP = 0x62
    JMPIF = 0x63
    JMPIFNOT = 0x64
    CALL = 0x65
    RET = 0x66
    APPCALL = 0x67
    SYSCALL = 0x68
    TAILCALL = 0x69


    // Stack
    DUPFROMALTSTACK = 0x6
    TOALTSTACK = 0x6 // Puts the input onto the top of the alt stack. Removes it from the main stack.
    FROMALTSTACK = 0x6 // Puts the input onto the top of the main stack. Removes it from the alt stack.
    XDROP = 0x6
    XSWAP = 0x7
    XTUCK = 0x7
    DEPTH = 0x7 // Puts the number of stack items onto the stack.
    DROP = 0x7 // Removes the top stack item.
    DUP = 0x7 // Duplicates the top stack item.
    NIP = 0x7 // Removes the second-to-top stack item.
    OVER = 0x7 // Copies the second-to-top stack item to the top.
    PICK = 0x7 // The item n back in the stack is copied to the top.
    ROLL = 0x7 // The item n back in the stack is moved to the top.
    ROT = 0x7 // The top three items on the stack are rotated to the left.
    SWAP = 0x7 // The top two items on the stack are swapped.
    TUCK = 0x7 // The item at the top of the stack is copied and inserted before the second-to-top item.


    // Splice
    CAT = 0x7 // Concatenates two strings.
    SUBSTR = 0x7 // Returns a section of a string.
    LEFT = 0x8 // Keeps only characters left of the specified point in a string.
    RIGHT = 0x8 // Keeps only characters right of the specified point in a string.
    SIZE = 0x8 // Returns the length of the input string.


    // Bitwise logic
    INVERT = 0x8 // Flips all of the bits in the input.
    AND = 0x8 // Boolean and between each bit in the inputs.
    OR = 0x8 // Boolean or between each bit in the inputs.
    XOR = 0x8 // Boolean exclusive or between each bit in the inputs.
    EQUAL = 0x8 // Returns 1 if the inputs are exactly equal, 0 otherwise.
    //OP_EQUALVERIFY = 0x88, // Same as OP_EQUAL, but runs OP_VERIFY afterward.
    //OP_RESERVED1 = 0x89, // Transaction is invalid unless occuring in an unexecuted OP_IF branch
    //OP_RESERVED2 = 0x8A, // Transaction is invalid unless occuring in an unexecuted OP_IF branch


    // Arithmetic
    // Note: Arithmetic inputs are limited to signed 32-bit integers, but may overflow their output.
    INC = 0x8 // 1 is added to the input.
    DEC = 0x8 // 1 is subtracted from the input.
    SIGN = 0x8
    NEGATE = 0x8 // The sign of the input is flipped.
    ABS = 0x9 // The input is made positive.
    NOT = 0x9 // If the input is 0 or 1, it is flipped. Otherwise the output will be 0.
    NZ = 0x9 // Returns 0 if the input is 0. 1 otherwise.
    ADD = 0x9 // a is added to b.
    SUB = 0x9 // b is subtracted from a.
    MUL = 0x9 // a is multiplied by b.
    DIV = 0x9 // a is divided by b.
    MOD = 0x9 // Returns the remainder after dividing a by b.
    SHL = 0x9 // Shifts a left b bits, preserving sign.
    SHR = 0x9 // Shifts a right b bits, preserving sign.
    BOOLAND = 0x9 // If both a and b are not 0, the output is 1. Otherwise 0.
    BOOLOR = 0x9 // If a or b is not 0, the output is 1. Otherwise 0.
    NUMEQUAL = 0x9 // Returns 1 if the numbers are equal, 0 otherwise.
    NUMNOTEQUAL = 0x9 // Returns 1 if the numbers are not equal, 0 otherwise.
    LT = 0x9 // Returns 1 if a is less than b, 0 otherwise.
    GT = 0xA // Returns 1 if a is greater than b, 0 otherwise.
    LTE = 0xA // Returns 1 if a is less than or equal to b, 0 otherwise.
    GTE = 0xA // Returns 1 if a is greater than or equal to b, 0 otherwise.
    MIN = 0xA // Returns the smaller of a and b.
    MAX = 0xA // Returns the larger of a and b.
    WITHIN = 0xA // Returns 1 if x is within the specified range (left-inclusive), 0 otherwise.


    // Crypto
    //RIPEMD160 = 0xA6, // The input is hashed using RIPEMD-160.
    SHA1 = 0xA7 // The input is hashed using SHA-1.
    SHA256 = 0xA8 // The input is hashed using SHA-256.
    HASH160 = 0xA9
    HASH256 = 0xAA
    //因为这个hash函数可能仅仅是csharp 编译时专用的
    CSHARPSTRHASH32 = 0xAB
    //这个是JAVA专用的
    JAVAHASH32 = 0xAD

    CHECKSIG = 0xAC
    CHECKMULTISIG = 0xAE


    // Array
    ARRAYSIZE = 0xC0
    PACK = 0xC1
    UNPACK = 0xC2
    PICKITEM = 0xC3
    SETITEM = 0xC4
    NEWARRAY = 0xC5 //用作引用類型
    NEWSTRUCT = 0xC6 //用作值類型

    SWITCH = 0xD0

    // Exceptions
    THROW = 0xF0
    THROWIFNOT = 0xF1
}

