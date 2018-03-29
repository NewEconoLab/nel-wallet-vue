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
            obj[i].pubkey = array[i].pubkey.toHexString();
            obj[i].prikey = array[i].prikey.toHexString();
            obj[i].address = array[i].address;
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
            var str: string = obj[i].prikey;
            var str2: string = obj[i].pubkey;
            arr[i].prikey = str.hexToBytes();
            arr[i].pubkey = str2.hexToBytes();
            arr[i].address = obj[i].address;
        }
        return arr;
    }
}

export class BalanceInfo
{
    balance: number;
    asset: string;
    name: { lang: string, name: string }[];
    names: string;
    type: string;
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
    claim: number;
}

export class UTXO
{
    addr: string;
    txid: string;
    n: number;
    asset: string;
    count: Neo.Fixed8;
}

export class Consts
{
    static baseContract = "0xdffbdd534a41dd4c56ba5ccba9dfaaf4f84e1362";
    static registerContract = "d6a5e965f67b0c3e5bec1f04f028edb9cb9e3f7c";
}

export class DomainInfo
{
    owner: Uint8Array//所有者
    register: Uint8Array//注册器
    resolver: Uint8Array//解析器
    ttl: Neo.BigInteger//到期时间
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