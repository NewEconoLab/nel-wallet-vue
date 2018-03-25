export class LoginInfo
{
    pubkey: Uint8Array;
    prikey: Uint8Array;
    address: string;
}

export class BlanaceInfo
{
    balance:number;
    asset:string;
    name:{lang:string,name:string}[];
    names:string;
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
    neo:number;
    gas:number;
    claim:number;
}