import { Result } from './entity';
///<reference path="./neo-ts.d.ts"/>
    export class neotools
    {
        constructor() { }
        /**
         * verifyPublicKey 验证公钥
         * @param publicKey 公钥
         */
        public static verifyPublicKey(publicKey: string)
        {
            var array: Uint8Array = Neo.Cryptography.Base58.decode(publicKey);
            //var hexstr = array.toHexString();
            //var salt = array.subarray(0, 1);
            //var hash = array.subarray(1, 1 + 20);
            var check = array.subarray(21, 21 + 4); //

            var checkdata = array.subarray(0, 21);//
            var hashd = Neo.Cryptography.Sha256.computeHash(checkdata);//
            hashd = Neo.Cryptography.Sha256.computeHash(hashd);//
            var hashd = hashd.slice(0, 4);//
            var checked = new Uint8Array(hashd);//

            var error = false;
            for (var i = 0; i < 4; i++)
            {
                if (checked[i] != check[i])
                {
                    error = true;
                    break;
                }
            }
            return !error;
        }
        /**
         * wifDecode wif解码
         * @param wif wif私钥
         */
        public static wifDecode(wif: string)
        {
            let result: Result = new Result();

            var prikey: Uint8Array;
            var pubkey: Uint8Array;
            var address: string;
            try
            {
                prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
                var hexstr = prikey.toHexString();
                result.info.prikey = hexstr;
            }
            catch (e)
            {
                result.err = true;
                result.info = e.message;
                return result
            }
            try
            {
                pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
                var hexstr = pubkey.toHexString();
                result.info.pubkey = hexstr;
            }
            catch (e)
            {
                result.err = true;
                result.info = e.message;
                return result
            }
            try
            {
                address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                result.info.address = address;
            }
            catch (e)
            {
                result.err = true;
                result.info = e.message;
                return result
            }
            return result;
        }
        /**
         * nep2FromWif
         */
        public static nep2FromWif(wif: string, password: string): Result
        {
            var prikey: Uint8Array;
            var pubkey: Uint8Array;
            var address: string;
            let res: Result = new Result();
            try
            {
                prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
                var n = 16384;
                var r = 8;
                var p = 8
                ThinNeo.Helper.GetNep2FromPrivateKey(prikey, password, n, r, p, (info, result) =>
                {
                    res.err = false;
                    res.info.nep2 = result;
                    pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
                    var hexstr = pubkey.toHexString();
                    address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                    res.info.address = address
                    return res;
                });
            }
            catch (e)
            {
                res.err = true;
                res.info = e.message;
                return res;
            }
        }

        /**
         * nep2TOWif
         */
        public static async nep2ToWif(nep2: string, password: string): Promise<Result>
        {
            var prikey: Uint8Array;
            var pubkey: Uint8Array;
            var address: string;
            var res = new Result();
            let promise: Promise<Result> = new Promise((resolve, reject) =>
            {
                let n: number = 16384;
                var r: number = 8;
                var p: number = 8
                ThinNeo.Helper.GetPrivateKeyFromNep2(nep2, password, n, r, p, (info, result) =>
                {
                    //spanNep2.textContent = "info=" + info + " result=" + result;
                    console.log("result=" + "info=" + info + " result=" + result);
                    prikey = result as Uint8Array;
                    if (prikey != null)
                    {
                        var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
                        var address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                        var wif = ThinNeo.Helper.GetWifFromPrivateKey(prikey);
                        res.err = false;
                        res.info = {pubkey,address,prikey};
                        resolve(res);
                    }
                    else
                    {
                        // spanWif.textContent = "result=" + "info=" + info + " result=" + result;
                        reject(res);
                    }
                });
            });
            return promise;
        }

        /**
         * nep6Load
         */
        public static async nep6Load(wallet: ThinNeo.nep6wallet, password: string):Promise<Result>
        {
            try
            {
                //getPrivateKey 是异步方法，且同时只能执行一个
                var istart = 0;
                let res = new Result();
                let arr: any[] = new Array<any>();
                // getkey = async (keyindex: number) => {
                for (let keyindex = 0; keyindex < wallet.accounts.length; keyindex++)
                {
                    let account = wallet.accounts[keyindex];
                    if (account.nep2key == null)
                    {
                        continue;
                    }
                    try
                    {
                        let result: Result = await neotools.getPriKeyfromAccount(wallet.scrypt, password, account);
                        console.log("getpkformacc:"+result);
                        arr.push(result.info);
                    } catch (error)
                    {
                        console.error(error);
                        res.err=true;
                        res.info=error;
                        return res;
                    }
                }
                res.err=false;
                res.info=arr;
                return res;
            }
            catch (e)
            {
                console.error(e);
            }
            // });
            // return promise;
        }

        /**
         * getPriKeyform
         */
        public static async getPriKeyfromAccount(scrypt: ThinNeo.nep6ScryptParameters, password: string, account: ThinNeo.nep6account): Promise<Result>
        {
            let res = new Result();
            let promise: Promise<Result> =
                new Promise((resolve, reject) =>
                {
                    account.getPrivateKey(scrypt, password, (info, result) =>
                    {
                        if (info == "finish")
                        {
                            var pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(result as Uint8Array);
                            var address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                            var wif = ThinNeo.Helper.GetWifFromPrivateKey(result as Uint8Array);
                            var hexkey = (result as Uint8Array).toHexString();
                            console.log(info + "|" + address + " wif=" + wif);
                            res.err=false;
                            res.info={ pubkey: pubkey, address: address, prikey: result as Uint8Array };
                            resolve(res);
                        }
                        else
                        {
                            // info2.textContent += info + "|" + result;
                            reject({ err: true, result: result });
                        }

                    });
                })
            return promise;
        }

    }