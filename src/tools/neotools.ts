///<reference path="../../static/js/neo-ts.d.ts"/>
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
            let result: result = { err: false, result: { pubkey: Uint8Array, prikey: Uint8Array, address: "" } };

            var prikey: Uint8Array;
            var pubkey: Uint8Array;
            var address: string;
            try
            {
                prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
                var hexstr = prikey.toHexString();
                result.result.prikey = hexstr;
            }
            catch (e)
            {
                result.err = true;
                result.result = e.message;
                return result
            }
            try
            {
                pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
                var hexstr = pubkey.toHexString();
                result.result.pubkey = hexstr;
            }
            catch (e)
            {
                result.err = true;
                result.result = e.message;
                return result
            }
            try
            {
                address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                result.result.address = address;
            }
            catch (e)
            {
                result.err = true;
                result.result = e.message;
                return result
            }
            return result;
        }
        /**
         * nep2FromWif
         */
        public static nep2FromWif(wif: string, password: string): result
        {
            var prikey: Uint8Array;
            var pubkey: Uint8Array;
            var address: string;
            let res: result = { err: false, result: { address: "", nep2: "" } };
            try
            {
                prikey = ThinNeo.Helper.GetPrivateKeyFromWIF(wif);
                var n = 16384;
                var r = 8;
                var p = 8
                ThinNeo.Helper.GetNep2FromPrivateKey(prikey, password, n, r, p, (info, result) =>
                {
                    res.err = false;
                    res.result.nep2 = result;
                    pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey);
                    var hexstr = pubkey.toHexString();
                    address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
                    res.result.address = address
                    return res;
                });
            }
            catch (e)
            {
                res.err = true;
                res.result = e.message;
                return res;
            }
        }

        /**
         * nep2TOWif
         */
        public static async nep2ToWif(nep2: string, password: string): Promise<result>
        {
            var prikey: Uint8Array;
            var pubkey: Uint8Array;
            var address: string;
            let promise: Promise<result> = new Promise((resolve, reject) =>
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
                        console.log('1:' + address);
                        resolve({ err: false, result: { pubkey, address, prikey } });
                    }
                    else
                    {
                        // spanWif.textContent = "result=" + "info=" + info + " result=" + result;
                        reject({ err: false, result: result });
                    }
                });
            });
            return promise;
        }

        /**
         * nep6Load
         */
        public static async nep6Load(wallet: ThinNeo.nep6wallet, password: string):Promise<result>
        {
            try
            {
                //getPrivateKey 是异步方法，且同时只能执行一个
                var istart = 0;
                let res = new result();
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
                        let result: result = await neotools.getPriKeyfromAccount(wallet.scrypt, password, account);
                        console.log("getpkformacc:"+result);
                        arr.push(result.result);
                    } catch (error)
                    {
                        console.error(error);
                        res.err=true;
                        res.result=error;
                        return res;
                    }
                }
                res.err=false;
                res.result=arr;
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
        public static async getPriKeyfromAccount(scrypt: ThinNeo.nep6ScryptParameters, password: string, account: ThinNeo.nep6account): Promise<result>
        {
            let res = new result();
            let promise: Promise<result> =
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
                            res.result={ pubkey: pubkey, address: address, prikey: result as Uint8Array };
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

    export class result
    {
        err: boolean;
        result: any;
    }
